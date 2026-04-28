import { getSupabase } from '../src/lib/supabase.js';
import { quoteSchema } from '../src/lib/schemas.js';
import { sendQuoteNotification, sendQuoteAutoReply } from '../src/lib/email.js';

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

  const result = quoteSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });
  }

  const d = result.data;
  try {
    const supabase = getSupabase();
    const { data: row, error } = await supabase
      .from('inquiries')
      .insert({
        type: 'quote',
        first_name: d.firstName,
        last_name: d.lastName,
        email: d.email,
        phone: d.phone || null,
        product_subcategory: d.subcategory,
        product_specs: d.specs,
      })
      .select('id')
      .single();

    if (error) throw error;

    await Promise.all([
      sendQuoteNotification(d),
      sendQuoteAutoReply(d),
    ]);

    return res.status(200).json({ success: true, id: row.id });
  } catch (err) {
    console.error('Quote error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please call us directly.' });
  }
}
