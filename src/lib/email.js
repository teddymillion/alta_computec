import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured in environment variables.');
  return new Resend(key);
}

function from() {
  return process.env.EMAIL_FROM || 'ALTA Computec <noreply@altacomputec.com>';
}

const salesEmail   = () => process.env.EMAIL_TO_SALES   || 'info@altacomputec.com';
const careersEmail = () => process.env.EMAIL_TO_CAREERS || 'careers@altacomputec.com';
const appUrl = () => process.env.NEXT_PUBLIC_APP_URL || 'https://altacomputec.com';

function e(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ─── Shared layout ────────────────────────────────────────────────────────────

function layout(bodyContent) {
  const logoUrl = `${appUrl()}/alta_logo_horizontal_light.svg`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>ALTA Computec PLC</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:#0A1628;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${logoUrl}" alt="ALTA Computec PLC" height="36" style="display:block;height:36px;width:auto;" />
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.35);color:#F59E0B;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px;">Dell Platinum Partner</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#1B4FD8 0%,#22C55E 100%);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-radius:0;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0A1628;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">
                      <strong style="color:#94a3b8;">ALTA Computec PLC</strong><br/>
                      Mexico Road, Chad St., ALTA Building, Addis Ababa, Ethiopia<br/>
                      <a href="tel:+251115502928" style="color:#64748b;text-decoration:none;">+251-115-50-29-28</a>
                      &nbsp;·&nbsp;
                      <a href="mailto:info@altacomputec.com" style="color:#64748b;text-decoration:none;">info@altacomputec.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <p style="margin:0;font-size:11px;color:#334155;">
                      © ${new Date().getFullYear()} ALTA Computec PLC. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Reusable partials ────────────────────────────────────────────────────────

function heading(text) {
  return `<h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:#0A1628;line-height:1.3;">${text}</h1>`;
}

function sectionLabel(text) {
  return `<p style="margin:24px 0 8px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;">${text}</p>`;
}

function dataTable(rows) {
  const cells = rows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 16px 10px 0;font-size:13px;font-weight:600;color:#64748b;white-space:nowrap;vertical-align:top;width:38%;">${label}</td>
      <td style="padding:10px 0;font-size:13px;color:#0f172a;vertical-align:top;">${value}</td>
    </tr>`).join('');
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${cells}</table>`;
}

function noteBox(label, text) {
  return `
    <div style="margin-top:20px;background:#f8fafc;border-left:3px solid #1B4FD8;border-radius:0 8px 8px 0;padding:14px 16px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">${label}</p>
      <p style="margin:0;font-size:13px;color:#334155;line-height:1.7;white-space:pre-wrap;">${e(text)}</p>
    </div>`;
}

function ctaButton(label, href) {
  return `
    <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td style="background:#1B4FD8;border-radius:8px;">
          <a href="${href}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.01em;">${label}</a>
        </td>
      </tr>
    </table>`;
}

function divider() {
  return `<div style="margin:28px 0;height:1px;background:#e2e8f0;"></div>`;
}

function greeting(name) {
  return `<p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.6;">Dear <strong>${e(name)}</strong>,</p>`;
}

function bodyText(text) {
  return `<p style="margin:0 0 14px;font-size:14px;color:#475569;line-height:1.75;">${text}</p>`;
}

function urgentNote() {
  return `<p style="margin:20px 0 0;font-size:13px;color:#64748b;line-height:1.6;">For urgent matters, call us directly at <a href="tel:+251115502928" style="color:#1B4FD8;font-weight:600;text-decoration:none;">+251-115-50-29-28</a>.</p>`;
}

function badge(text, color = '#1B4FD8') {
  return `<span style="display:inline-block;background:${color}18;border:1px solid ${color}38;color:${color};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:3px 10px;border-radius:20px;">${text}</span>`;
}

// ─── Email senders ────────────────────────────────────────────────────────────

export async function sendContactNotification(data) {
  const rows = [
    ['Name', `${e(data.firstName)} ${e(data.lastName)}`],
    ['Email', `<a href="mailto:${e(data.email)}" style="color:#1B4FD8;text-decoration:none;">${e(data.email)}</a>`],
    ...(data.organisation ? [['Organisation', e(data.organisation)]] : []),
    ...(data.jobTitle     ? [['Job Title',    e(data.jobTitle)]]     : []),
    ...(data.industry     ? [['Industry',     e(data.industry)]]     : []),
    ...(data.sector       ? [['Sector',       e(data.sector)]]       : []),
    ...(data.solutionInterest ? [['Solution Interest', e(data.solutionInterest)]] : []),
    ...(data.hearAboutUs  ? [['Heard About Us', e(data.hearAboutUs)]] : []),
  ];

  await getResend().emails.send({
    from: from(),
    to: salesEmail(),
    subject: `New Consultation Request — ${e(data.firstName)} ${e(data.lastName)} from ${e(data.organisation) || 'Unknown'}`,
    html: layout(`
      ${heading('New Consultation Request')}
      ${badge('Consultation', '#1B4FD8')}
      ${sectionLabel('Contact Details')}
      ${dataTable(rows)}
      ${data.message ? noteBox('Project Brief', data.message) : ''}
    `),
  });
}

export async function sendContactAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your request — ALTA Computec PLC",
    html: layout(`
      ${heading("We've received your request")}
      ${greeting(data.firstName)}
      ${bodyText("Thank you for reaching out to ALTA Computec. We've received your consultation request and our team will respond within <strong>24 business hours</strong>.")}
      ${bodyText("In the meantime, feel free to explore our solutions and product portfolio on our website.")}
      ${divider()}
      ${urgentNote()}
    `),
  });
}

export async function sendQuoteNotification(data) {
  const specsRows = Object.entries(data.specs)
    .filter(([k]) => !['firstName', 'lastName', 'email', 'phone'].includes(k))
    .map(([k, v]) => [e(k), e(Array.isArray(v) ? v.join(', ') : v)]);

  const contactRows = [
    ['Product', e(data.subcategory)],
    ['Name', `${e(data.firstName)} ${e(data.lastName)}`],
    ['Email', `<a href="mailto:${e(data.email)}" style="color:#1B4FD8;text-decoration:none;">${e(data.email)}</a>`],
    ...(data.phone ? [['Phone', e(data.phone)]] : []),
  ];

  await getResend().emails.send({
    from: from(),
    to: salesEmail(),
    subject: `New ${e(data.subcategory)} Configuration Request — ${e(data.firstName)} ${e(data.lastName)}`,
    html: layout(`
      ${heading('New Product Configuration Request')}
      ${badge(e(data.subcategory), '#1B4FD8')}
      ${sectionLabel('Contact Details')}
      ${dataTable(contactRows)}
      ${specsRows.length ? sectionLabel('Configuration Details') : ''}
      ${specsRows.length ? dataTable(specsRows) : ''}
    `),
  });
}

export async function sendQuoteAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your configuration request — ALTA Computec PLC",
    html: layout(`
      ${heading("We've received your configuration request")}
      ${greeting(data.firstName)}
      ${bodyText(`Thank you for submitting your <strong>${e(data.subcategory)}</strong> configuration request. Our sales team will review your specifications and respond with a detailed quotation within <strong>24 business hours</strong>.`)}
      ${bodyText("We'll match your requirements with the best available options from our certified product portfolio.")}
      ${divider()}
      ${urgentNote()}
    `),
  });
}

export async function sendRFQNotification(data) {
  const rows = [
    ['Full Name', e(data.fullName)],
    ['Organisation', e(data.organisation)],
    ['Email', `<a href="mailto:${e(data.email)}" style="color:#1B4FD8;text-decoration:none;">${e(data.email)}</a>`],
    ...(data.phone           ? [['Phone',    e(data.phone)]]           : []),
    ...(data.productCategory ? [['Category', e(data.productCategory)]] : []),
    ...(data.quantityEstimate ? [['Quantity', e(data.quantityEstimate)]] : []),
  ];

  await getResend().emails.send({
    from: from(),
    to: salesEmail(),
    subject: `Formal RFQ — ${e(data.productCategory) || 'General'} — ${e(data.organisation)}`,
    html: layout(`
      ${heading('Formal RFQ Received')}
      ${badge('RFQ', '#F59E0B')}
      ${sectionLabel('Requester Details')}
      ${dataTable(rows)}
      ${data.productsOfInterest ? noteBox('Products of Interest', data.productsOfInterest) : ''}
      ${data.additionalNotes    ? noteBox('Additional Notes',     data.additionalNotes)    : ''}
    `),
  });
}

export async function sendRFQAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your RFQ — ALTA Computec PLC",
    html: layout(`
      ${heading("We've received your RFQ")}
      ${greeting(data.fullName.split(' ')[0])}
      ${bodyText("Thank you for submitting your formal Request for Quotation. Our sales team will review your requirements and respond with a detailed quotation within <strong>24 business hours</strong>.")}
      ${bodyText("ALTA Computec is Ethiopia's only Dell Platinum Partner and authorised reseller for 15+ global technology brands — we'll ensure you receive the most competitive pricing available.")}
      ${divider()}
      ${urgentNote()}
    `),
  });
}

export async function sendApplicationNotification(data, cvUrl) {
  const rows = [
    ['Position',   e(data.jobTitle)],
    ...(data.department ? [['Department', e(data.department)]] : []),
    ['Full Name',  e(data.fullName)],
    ['Email',      `<a href="mailto:${e(data.email)}" style="color:#1B4FD8;text-decoration:none;">${e(data.email)}</a>`],
  ];

  await getResend().emails.send({
    from: from(),
    to: careersEmail(),
    subject: `New Application — ${e(data.jobTitle)} — ${e(data.fullName)}`,
    html: layout(`
      ${heading('New Job Application')}
      ${badge(e(data.jobTitle), '#16A34A')}
      ${sectionLabel('Applicant Details')}
      ${dataTable(rows)}
      ${data.coverNote ? noteBox('Cover Note', data.coverNote) : ''}
      ${ctaButton('Download CV', cvUrl)}
    `),
  });
}

export async function sendApplicationAutoReply(data) {
  await getResend().emails.send({
    from: from(),
    to: data.email,
    subject: "We've received your application — ALTA Computec PLC",
    html: layout(`
      ${heading("We've received your application")}
      ${greeting(data.fullName.split(' ')[0])}
      ${bodyText(`Thank you for applying for the <strong>${e(data.jobTitle)}</strong> position at ALTA Computec. Our HR team will carefully review your CV and cover note.`)}
      ${bodyText("Shortlisted candidates will be contacted within <strong>5 business days</strong>. We appreciate your interest in joining our team of 130+ engineers and specialists.")}
      ${divider()}
      ${urgentNote()}
    `),
  });
}

export async function sendNewsletterWelcome(email) {
  await getResend().emails.send({
    from: from(),
    to: email,
    subject: 'Welcome to the ALTA Computec Tech Digest',
    html: layout(`
      ${heading('Welcome to the ALTA Tech Digest')}
      ${bodyText("You're now part of a community of <strong>2,000+ IT professionals</strong> across Ethiopia and East Africa.")}
      ${bodyText("Every week you'll receive curated insights on enterprise IT trends, product guides, cybersecurity updates, and industry analysis — directly from Ethiopia's leading technology company.")}
      <div style="margin:28px 0;background:#f8fafc;border-radius:10px;padding:20px 24px;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">What to expect</p>
        ${['Weekly enterprise IT insights', 'Product guides & configuration tips', 'Cybersecurity alerts & best practices', 'ALTA news & project highlights'].map(item =>
          `<p style="margin:0 0 8px;font-size:13px;color:#334155;line-height:1.6;">
            <span style="color:#22C55E;font-weight:700;margin-right:8px;">✓</span>${item}
          </p>`
        ).join('')}
      </div>
      ${divider()}
      <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">You're receiving this because you subscribed at altacomputec.com. To unsubscribe, reply with "unsubscribe" in the subject line.</p>
    `),
  });
}
