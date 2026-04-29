import Busboy from 'busboy';
import path from 'path';
import { getSupabase } from '../src/lib/supabase.js';
import { applySchema } from '../src/lib/schemas.js';
import { sendApplicationNotification, sendApplicationAutoReply } from '../src/lib/email.js';

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: req.headers, limits: { fileSize: 5 * 1024 * 1024 } });
    const fields = {};
    let cvFile = null;

    bb.on('field', (name, val) => { fields[name] = val; });
    bb.on('file', (name, stream, info) => {
      if (name !== 'cvFile') { stream.resume(); return; }
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('limit', () => reject(new Error('FILE_TOO_LARGE')));
      stream.on('end', () => {
        cvFile = { buffer: Buffer.concat(chunks), filename: info.filename, mimetype: info.mimeType };
      });
    });
    bb.on('finish', () => resolve({ fields, cvFile }));
    bb.on('error', reject);
    req.pipe(bb);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let fields, cvFile;
  try {
    ({ fields, cvFile } = await parseForm(req));
  } catch (err) {
    if (err.message === 'FILE_TOO_LARGE')
      return res.status(400).json({ success: false, errors: { cvFile: ['File must be under 5MB'] } });
    return res.status(400).json({ success: false, message: 'Failed to parse form data' });
  }

  const result = applySchema.safeParse(fields);
  if (!result.success)
    return res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });

  if (!cvFile)
    return res.status(400).json({ success: false, errors: { cvFile: ['CV file is required'] } });

  const ext = path.extname(cvFile.filename || '').toLowerCase();
  if (!['.pdf', '.doc', '.docx'].includes(ext))
    return res.status(400).json({ success: false, errors: { cvFile: ['File must be PDF, DOC, or DOCX'] } });

  try {
    const supabase = getSupabase();
    const storagePath = `${Date.now()}-${fields.fullName.replace(/[^a-z0-9]/gi, '_')}${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(storagePath, cvFile.buffer, { contentType: cvFile.mimetype });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('cvs').getPublicUrl(storagePath);

    const { data: row, error: dbError } = await supabase
      .from('job_applications')
      .insert({
        job_title: fields.jobTitle,
        department: fields.department || null,
        full_name: fields.fullName,
        email: fields.email,
        cover_note: fields.coverNote || null,
        cv_file_url: publicUrl,
        cv_file_name: cvFile.filename,
      })
      .select('id')
      .single();

    if (dbError) throw dbError;

    await Promise.all([
      sendApplicationNotification(fields, publicUrl),
      sendApplicationAutoReply(fields),
    ]);

    return res.status(200).json({ success: true, id: row.id });
  } catch (err) {
    console.error('Apply error:', err);
    return res.status(500).json({
      success: false,
      message: 'Upload failed. Please email your CV directly to careers@altacomputec.com',
    });
  }
}
