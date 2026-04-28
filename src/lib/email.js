import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured in environment variables.');
  return new Resend(key);
}

function from() {
  return process.env.EMAIL_FROM || 'ALTA Computec <noreply@altacomputec.com>';
}

const salesEmail   = () => process.env.EMAIL_TO_SALES    || 'info@altacomputec.com';
const careersEmail = () => process.env.EMAIL_TO_CAREERS  || 'careers@altacomputec.com';

const footer = `<p style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">ALTA Computec PLC | Mexico Road, Chad St., ALTA Building, Addis Ababa | +251-115-50-29-28</p>`;

function e(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function sendContactNotification(data) {
  await getResend().emails.send({
    from: from(),
    to: salesEmail(),
    subject: `New Consultation Request — ${e(data.firstName)} ${e(data.lastName)} from ${e(data.organisation) || 'Unknown'}`,
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">New Consultation Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Name:</td><td style="padding:8px 0;">${e(data.firstName)} ${e(data.lastName)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Email:</td><td style="padding:8px 0;">${e(data.email)}</td></tr>
        ${data.organisation ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Organisation:</td><td style="padding:8px 0;">${e(data.organisation)}</td></tr>` : ''}
        ${data.jobTitle ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Job Title:</td><td style="padding:8px 0;">${e(data.jobTitle)}</td></tr>` : ''}
        ${data.industry ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Industry:</td><td style="padding:8px 0;">${e(data.industry)}</td></tr>` : ''}
        ${data.sector ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Sector:</td><td style="padding:8px 0;">${e(data.sector)}</td></tr>` : ''}
        ${data.solutionInterest ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Solution Interest:</td><td style="padding:8px 0;">${e(data.solutionInterest)}</td></tr>` : ''}
        ${data.hearAboutUs ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Heard About Us:</td><td style="padding:8px 0;">${e(data.hearAboutUs)}</td></tr>` : ''}
      </table>
      ${data.message ? `<div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;"><strong style="color:#475569;">Message:</strong><p style="margin:8px 0 0;color:#64748b;white-space:pre-wrap;">${e(data.message)}</p></div>` : ''}
      ${footer}
    `,
  });
}

export async function sendContactAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your request — ALTA Computec PLC",
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">Thank you for contacting ALTA Computec</h2>
      <p style="color:#475569;line-height:1.6;">Dear ${e(data.firstName)},</p>
      <p style="color:#475569;line-height:1.6;">We've received your consultation request and our team will respond within 24 business hours.</p>
      <p style="color:#475569;line-height:1.6;">For urgent matters, please call us directly at <strong>+251-115-50-29-28</strong>.</p>
      ${footer}
    `,
  });
}

export async function sendQuoteNotification(data) {
  const specsHtml = Object.entries(data.specs)
    .filter(([k]) => !['firstName', 'lastName', 'email', 'phone'].includes(k))
    .map(([k, v]) => `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">${e(k)}:</td><td style="padding:8px 0;">${e(Array.isArray(v) ? v.join(', ') : v)}</td></tr>`)
    .join('');

  await getResend().emails.send({
    from: from(),
    to: salesEmail(),
    subject: `New ${e(data.subcategory)} Configuration Request — ${e(data.firstName)} ${e(data.lastName)}`,
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">New Product Configuration Request</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Product:</td><td style="padding:8px 0;">${e(data.subcategory)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Name:</td><td style="padding:8px 0;">${e(data.firstName)} ${e(data.lastName)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Email:</td><td style="padding:8px 0;">${e(data.email)}</td></tr>
        ${data.phone ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Phone:</td><td style="padding:8px 0;">${e(data.phone)}</td></tr>` : ''}
      </table>
      <h3 style="color:#0A1628;margin:16px 0 8px;">Configuration Details:</h3>
      <table style="width:100%;border-collapse:collapse;">${specsHtml}</table>
      ${footer}
    `,
  });
}

export async function sendQuoteAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your request — ALTA Computec PLC",
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">Thank you for your configuration request</h2>
      <p style="color:#475569;line-height:1.6;">Dear ${e(data.firstName)},</p>
      <p style="color:#475569;line-height:1.6;">We've received your ${e(data.subcategory)} configuration request and our sales team will respond with a detailed quotation within 24 business hours.</p>
      <p style="color:#475569;line-height:1.6;">For urgent matters, please call us directly at <strong>+251-115-50-29-28</strong>.</p>
      ${footer}
    `,
  });
}

export async function sendRFQNotification(data) {
  await getResend().emails.send({
    from: from(),
    to: salesEmail(),
    subject: `FORMAL RFQ — ${e(data.productCategory) || 'General'} — ${e(data.organisation)}`,
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">FORMAL RFQ RECEIVED</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Name:</td><td style="padding:8px 0;">${e(data.fullName)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Organisation:</td><td style="padding:8px 0;">${e(data.organisation)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Email:</td><td style="padding:8px 0;">${e(data.email)}</td></tr>
        ${data.phone ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Phone:</td><td style="padding:8px 0;">${e(data.phone)}</td></tr>` : ''}
        ${data.productCategory ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Category:</td><td style="padding:8px 0;">${e(data.productCategory)}</td></tr>` : ''}
        ${data.quantityEstimate ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Quantity:</td><td style="padding:8px 0;">${e(data.quantityEstimate)}</td></tr>` : ''}
      </table>
      ${data.productsOfInterest ? `<div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;"><strong style="color:#475569;">Products of Interest:</strong><p style="margin:8px 0 0;color:#64748b;white-space:pre-wrap;">${e(data.productsOfInterest)}</p></div>` : ''}
      ${data.additionalNotes ? `<div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;"><strong style="color:#475569;">Additional Notes:</strong><p style="margin:8px 0 0;color:#64748b;white-space:pre-wrap;">${e(data.additionalNotes)}</p></div>` : ''}
      ${footer}
    `,
  });
}

export async function sendRFQAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your request — ALTA Computec PLC",
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">Thank you for your RFQ</h2>
      <p style="color:#475569;line-height:1.6;">Dear ${e(data.fullName.split(' ')[0])},</p>
      <p style="color:#475569;line-height:1.6;">We've received your formal RFQ and our sales team will respond with a detailed quotation within 24 business hours.</p>
      <p style="color:#475569;line-height:1.6;">For urgent matters, please call us directly at <strong>+251-115-50-29-28</strong>.</p>
      ${footer}
    `,
  });
}

export async function sendApplicationNotification(data, cvUrl) {
  await getResend().emails.send({
    from: from(),
    to: careersEmail(),
    subject: `New Application — ${e(data.jobTitle)} — ${e(data.fullName)}`,
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">New Job Application</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Position:</td><td style="padding:8px 0;">${e(data.jobTitle)}</td></tr>
        ${data.department ? `<tr><td style="padding:8px 0;font-weight:600;color:#475569;">Department:</td><td style="padding:8px 0;">${e(data.department)}</td></tr>` : ''}
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Name:</td><td style="padding:8px 0;">${e(data.fullName)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600;color:#475569;">Email:</td><td style="padding:8px 0;">${e(data.email)}</td></tr>
      </table>
      ${data.coverNote ? `<div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;"><strong style="color:#475569;">Cover Note:</strong><p style="margin:8px 0 0;color:#64748b;white-space:pre-wrap;">${e(data.coverNote)}</p></div>` : ''}
      <div style="margin-top:16px;"><a href="${cvUrl}" style="display:inline-block;padding:12px 24px;background:#1B4FD8;color:white;text-decoration:none;border-radius:8px;font-weight:600;">Download CV</a></div>
      ${footer}
    `,
  });
}

export async function sendApplicationAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your request — ALTA Computec PLC",
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">Thank you for your application</h2>
      <p style="color:#475569;line-height:1.6;">Dear ${e(data.fullName.split(' ')[0])},</p>
      <p style="color:#475569;line-height:1.6;">We've received your application for the <strong>${e(data.jobTitle)}</strong> position. Our HR team will review your CV and contact you within 5 business days.</p>
      <p style="color:#475569;line-height:1.6;">For urgent matters, please call us directly at <strong>+251-115-50-29-28</strong>.</p>
      ${footer}
    `,
  });
}

export async function sendNewsletterWelcome(email) {
  await getResend().emails.send({
    from: from(),
    to: email,
    subject: 'Welcome to the ALTA Computec Tech Digest',
    html: `
      <h2 style="color:#0A1628;margin-bottom:16px;">Welcome to the ALTA Tech Digest</h2>
      <p style="color:#475569;line-height:1.6;">Thank you for subscribing to our weekly technology newsletter.</p>
      <p style="color:#475569;line-height:1.6;">You'll receive insights on enterprise IT trends, product guides, and industry analysis from Ethiopia's leading technology company.</p>
      ${footer}
    `,
  });
}
