import { getSupabase } from '../src/lib/supabase.js';
import { newsletterSchema } from '../src/lib/schemas.js';
import { sendNewsletterWelcome } from '../src/lib/email.js';

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

  const result = newsletterSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.flatten().fieldErrors });
  }

  const { email } = result.data;
  try {
    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      if (existing.is_active) {
        return res.status(200).json({ success: true, alreadySubscribed: true });
      }
      await supabase
        .from('newsletter_subscribers')
        .update({ is_active: true, unsubscribed_at: null })
        .eq('id', existing.id);
    } else {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });
      if (error) throw error;
    }

    await sendNewsletterWelcome(email);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ success: false, message: 'Subscription failed. Please try again.' });
  }
}
