import formidable from 'formidable';
import { readFileSync } from 'fs';
import path from 'path';
import { getSupabase } from '../src/lib/supabase.js';
import { applySchema } from '../src/lib/schemas.js';
import { sendApplicationNotification, sendApplicationAutoReply } from '../src/lib/email.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ maxFileSize: 5 * 1024 * 1024 });
  const [fields, files] = await form.parse(req);

  const data = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );
  const cvFile = Array.isArray(files.cvFile) ? files.cvFile[0] : files.cvFile;

  const result = applySchema.safeParse(data);
  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });
  }

  if (!cvFile) {
    return res.status(400).json({ success: false, errors: { cvFile: ['CV file is required'] } });
  }
  const ext = path.extname(cvFile.originalFilename || '').toLowerCase();
  if (!['.pdf', '.doc', '.docx'].includes(ext)) {
    return res.status(400).json({ success: false, errors: { cvFile: ['File must be PDF, DOC, or DOCX'] } });
  }

  try {
    const supabase = getSupabase();
    const fileBuffer = readFileSync(cvFile.filepath);
    const storagePath = `${Date.now()}-${data.fullName.replace(/[^a-z0-9]/gi, '_')}${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(storagePath, fileBuffer, { contentType: cvFile.mimetype });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('cvs').getPublicUrl(storagePath);

    const { data: row, error: dbError } = await supabase
      .from('job_applications')
      .insert({
        job_title: data.jobTitle,
        department: data.department || null,
        full_name: data.fullName,
        email: data.email,
        cover_note: data.coverNote || null,
        cv_file_url: publicUrl,
        cv_file_name: cvFile.originalFilename,
      })
      .select('id')
      .single();

    if (dbError) throw dbError;

    await Promise.all([
      sendApplicationNotification(data, publicUrl),
      sendApplicationAutoReply(data),
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
