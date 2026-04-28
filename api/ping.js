export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    ts: Date.now(),
    env: {
      supabase: !!process.env.SUPABASE_URL,
      resend: !!process.env.RESEND_API_KEY,
      emailFrom: !!process.env.EMAIL_FROM,
      emailSales: !!process.env.EMAIL_TO_SALES,
      emailCareers: !!process.env.EMAIL_TO_CAREERS,
    },
  });
}
