import { getSupabase } from '../src/lib/supabase.js';
import { rfqSchema } from '../src/lib/schemas.js';
import { sendRFQNotification, sendRFQAutoReply } from '../src/lib/email.js';

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

  const result = rfqSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });
  }

  const d = result.data;
  const [first, ...rest] = d.fullName.trim().split(' ');
  const lastName = rest.join(' ') || '-';

  try {
    const supabase = getSupabase();
    const { data: row, error } = await supabase
      .from('inquiries')
      .insert({
        type: 'rfq',
        first_name: first,
        last_name: lastName,
        email: d.email,
        phone: d.phone || null,
        organisation: d.organisation,
        product_category: d.productCategory || null,
        products_of_interest: d.productsOfInterest || null,
        quantity_estimate: d.quantityEstimate || null,
        additional_notes: d.additionalNotes || null,
      })
      .select('id')
      .single();

    if (error) throw error;

    await Promise.all([
      sendRFQNotification(d),
      sendRFQAutoReply(d),
    ]);

    return res.status(200).json({ success: true, id: row.id });
  } catch (err) {
    console.error('RFQ error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please call us directly.' });
  }
}
