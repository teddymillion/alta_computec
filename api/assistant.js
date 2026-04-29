async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const KNOWLEDGE_SECTIONS = [
  `COMPANY: Alta Computec PLC founded 1994 Addis Ababa Ethiopia. Ethiopia's ONLY Dell Platinum Partner. USD $25M revenue, 470+ enterprise clients, 640+ projects, 130+ certified engineers. Zero subcontracting.`,

  `CONTACT: Phone +251-115-50-29-28. Email info@altacomputec.com. Address: Mexico Road, Chad Street, ALTA Building, Addis Ababa. Hours Mon-Fri 8AM-6PM EAT.`,

  `PARTNERS: Dell Platinum (Ethiopia's ONLY), Cisco Premier, Oracle Gold, Kaspersky Platinum, HP Authorized, Microsoft Partner, IBM Authorized, Fortinet Authorized, SHARP Exclusive Ethiopia, Diebold Nixdorf Exclusive Ethiopia. Also: Huawei, Lenovo, Eaton, Vertiv, Jabra, Poly, Epson, Backbase, Symantec.`,

  `LEADERSHIP: Managing Director Abduilkader Abdella. General Manager Cherinet G/Giorgis. Software & AI Division Head Kirubel Gebrehiwot. Business Strategy Head Araya Belete.`,

  `CLIENTS: Commercial Bank of Ethiopia (CBE), Development Bank of Ethiopia (DBE), Awash Bank, 150+ banking clients, 120+ ATMs deployed 99.9% uptime. Ethio Telecom data centre. Government ministries, education, energy, manufacturing.`,

  `HARDWARE PRODUCTS: Desktops: Dell OptiPlex 7090, HP EliteDesk 800 G9, Lenovo ThinkCentre. Laptops: Dell Latitude 5540, HP EliteBook 840 G10, Lenovo ThinkPad T14. Servers: Dell PowerEdge R750, HP ProLiant DL380 Gen11, IBM Power S1022. Storage: Dell PowerVault ME5, IBM FlashSystem 5200. Switches: Cisco Catalyst 9300, Huawei CloudEngine. Firewalls: Fortinet FortiGate 200F, Cisco Firepower 1140. UPS: Eaton 9SX, Vertiv Liebert GXT5. ATMs: Diebold Nixdorf DN Series, NCR SelfServ 80, GRG Banking H68N. POS: Ingenico Desk 3500, Verifone P200 Plus. Smart Screens: Samsung Flip Pro 85in, LG CreateBoard 75in, BenQ Board 86in. Video: Jabra PanaCast 50, Poly Studio X70. Software: Oracle Fusion ERP, Microsoft 365, Kaspersky Endpoint Security, Backbase Digital Banking.`,

  `SOLUTIONS: IT Infrastructure (data centers, LAN/WAN, 200+ projects, Dell+Cisco, 24/7 SLA). Banking ATM (exclusive Diebold Nixdorf, 99.9% uptime). Cloud (VMware, Azure, IBM, RTO under 4hrs). Cybersecurity (Kaspersky Platinum, Fortinet, SIEM, SOC, pen testing, 500+ endpoints). Enterprise Software & AI (Oracle ERP, 80+ deployments, 2000+ trained users). Smart Office (SHARP exclusive, 40+ deployments). Consulting (IT strategy, digital transformation). Data Center (Dell, Cisco, VMware, Fortinet). Technical Support (AMC, 4-hour SLA, 24/7 NOC).`,

  `SOFTWARE & AI DIVISION (NEW) Head Kirubel Gebrehiwot: 1) AI as a Service: LLM integration, predictive analytics, process automation, computer vision. 2) ERP Solutions: SAP, Odoo, Oracle implementation. 3) Web & App Development: enterprise web, mobile apps. 4) Database Design & Management: architecture, optimisation, migration. 5) Cybersecurity: threat assessment, pen testing, SOC, compliance. 6) Custom Software Development: bespoke solutions.`,

  `ICT TRAINING CENTER at Ethiopian ICT Park Addis Ababa. Hands-on by active practitioners. Track 01: AI & ML 12 weeks Professional AI Practitioner. Track 02: Cybersecurity 10 weeks Certified Security Analyst. Track 03: Database Admin 8 weeks Certified DBA. Track 04: Full Stack Dev 16 weeks Full Stack Engineer. Track 05: ERP Implementation 10 weeks ERP Solutions Specialist. Custom corporate training available.`,

  `RFQ PROCESS: Use Product Configurator on Products page, submit, team responds within 24 hours. Or submit RFQ form with name, organisation, email, phone, product category, quantity. Direct: +251-115-50-29-28 or info@altacomputec.com. No commitment required, free consultation included.`,
];

const SYSTEM_PROMPT = `You are the official AI assistant of Alta Computec PLC, Ethiopia's only Dell Platinum Partner with over 30 years of experience in the ICT industry.

You assist website visitors professionally and helpfully. You answer questions about Alta Computec's hardware products, software and AI division services, ICT training center, company background, procurement and RFQ process, and contact information.

Tone: Professional, warm, concise. You represent a premium Ethiopian technology company.
Never answer questions unrelated to Alta Computec, technology products, or IT services.
If you don't know a specific detail, say: "Please contact our team directly for accurate information on this — we'd be happy to help."

FORMATTING RULES:
- Write in short paragraphs. Never produce a wall of text.
- Use bullet points ONLY when listing 3 or more distinct items.
- Never use markdown headers — plain text only.
- Keep responses under 120 words unless the question genuinely requires more detail.
- End every response with one relevant follow-up offer, e.g. "Would you like me to help you request a quote?" or "Shall I connect you with our team for more details?"

ALTA COMPUTEC KNOWLEDGE BASE:
${KNOWLEDGE_SECTIONS.join('\n\n')}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY missing from environment');
    return res.status(500).json({ reply: 'AI assistant is not configured. Please contact our team directly.' });
  }

  let body;
  try {
    const raw = await getRawBody(req);
    body = JSON.parse(raw);
  } catch {
    return res.status(400).json({ reply: 'Invalid request.' });
  }

  const { messages = [] } = body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ reply: 'Invalid messages format.' });
  }

  const pageCtx = messages[0] ?? null;
  const history = messages.slice(1).slice(-10);
  const trimmed = pageCtx ? [pageCtx, ...history] : history;

  // Strip any extra fields (e.g. time) — Groq only accepts role + content
  const groqMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...trimmed.map(({ role, content }) => ({ role, content })),
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: groqMessages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API error:', response.status, err);
      return res.status(502).json({ reply: 'Our AI assistant is temporarily unavailable. Please contact us at +251 11 550 2928.' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ reply: 'No response received. Please try again or contact our team directly.' });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Assistant handler error:', err);
    return res.status(500).json({ reply: 'Something went wrong. Please contact our team at +251 11 550 2928 or info@altacomputec.com.' });
  }
}
