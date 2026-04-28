import { getSupabase } from '../src/lib/supabase.js';
import { contactSchema } from '../src/lib/schemas.js';
import { sendContactNotification, sendContactAutoReply } from '../src/lib/email.js';

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body;
  try {
    const raw = await getRawBody(req);
    body = JSON.parse(raw);
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid JSON body' });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });
  }

  const d = result.data;
  try {
    const supabase = getSupabase();
    const { data: row, error } = await supabase
      .from('inquiries')
      .insert({
        type: 'contact',
        first_name: d.firstName,
        last_name: d.lastName,
        email: d.email,
        organisation: d.organisation || null,
        job_title: d.jobTitle || null,
        industry: d.industry || null,
        sector: d.sector || null,
        solution_interest: d.solutionInterest || null,
        message: d.message || null,
        hear_about_us: d.hearAboutUs || null,
      })
      .select('id')
      .single();

    if (error) throw error;

    await Promise.all([
      sendContactNotification(d),
      sendContactAutoReply(d),
    ]);

    return res.status(200).json({ success: true, id: row.id });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please call us directly.' });
  }
}
