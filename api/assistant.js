async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// ─── Alta Computec knowledge base ────────────────────────────────────────────
// Sections ordered by priority: company → contact → products → software → training → rfq
const KNOWLEDGE_SECTIONS = [
  `## COMPANY OVERVIEW
Alta Computec PLC was founded in 1994 in Addis Ababa, Ethiopia. It is Ethiopia's #1 enterprise IT partner and the country's ONLY Dell Platinum Partner — the highest tier in Dell's global partner program. USD $25M annual revenue, 470+ enterprise clients, 640+ projects delivered, 130+ certified in-house engineers. Zero subcontracting.`,

  `## CONTACT INFORMATION
Phone: +251-115-50-29-28 | Email: info@altacomputec.com
Address: Mexico Road, Chad Street, ALTA Building, Addis Ababa, Ethiopia
Hours: Monday–Friday, 8:00 AM – 6:00 PM EAT`,

  `## PARTNER CERTIFICATIONS
Dell: Platinum Partner (Ethiopia's ONLY) | Cisco: Premier Partner | Oracle: Gold Partner | Kaspersky: Platinum Partner | HP: Authorized | Microsoft: Partner | IBM: Authorized | Fortinet: Authorized | SHARP: Exclusive Ethiopia Partner | Diebold Nixdorf: Exclusive Ethiopia Partner
Also authorized: Huawei, Lenovo, Eaton, Vertiv, Jabra, Poly, Epson, Backbase, Symantec`,

  `## LEADERSHIP
Managing Director: Abduilkader Abdella | General Manager: Cherinet G/Giorgis | Software & AI Division Head: Kirubel Gebrehiwot | Business Strategy Head: Araya Belete`,

  `## KEY CLIENTS & SECTORS
Banking: Commercial Bank of Ethiopia (CBE), Development Bank of Ethiopia (DBE), Awash Bank, 150+ banking clients, 120+ ATMs deployed, 99.9% uptime SLA.
Telecom: Ethio Telecom data centre infrastructure.
Also serves: Government ministries, education, energy, manufacturing.`,

  `## HARDWARE PRODUCTS
Client Products: Dell OptiPlex 7090, HP EliteDesk 800 G9, Lenovo ThinkCentre (Desktops); Dell Latitude 5540, HP EliteBook 840 G10, Lenovo ThinkPad T14 (Laptops); HP/Canon copiers & printers; Epson/BenQ projectors; accessories, spare parts.
Enterprise: Dell PowerEdge R750, HP ProLiant DL380 Gen11, IBM Power S1022 (Servers); Dell PowerVault ME5, IBM FlashSystem 5200 (Storage); Cisco Catalyst 9300, Huawei CloudEngine (Switches); Fortinet FortiGate 200F, Cisco Firepower 1140 (Firewalls); APC/Rittal server racks; Dell EMC/HPe backup devices.
Power Quality: Eaton 9SX, Vertiv Liebert GXT5 (UPS); APC/Tripp Lite surge protectors.
Banking Automation: Diebold Nixdorf DN Series, NCR SelfServ 80, GRG Banking H68N (ATMs); Ingenico Desk 3500, Verifone P200 Plus (POS).
Collaboration: Samsung Flip Pro 85", LG CreateBoard 75", BenQ Board 86", ViewSonic ViewBoard 86" (Smart Screens); Jabra PanaCast 50, Poly Studio X70, Jabra Evolve2 85 (Video/Headsets).
Software: Oracle Fusion ERP, Microsoft 365 Enterprise, Kaspersky Endpoint Security, Backbase Digital Banking Platform.`,

  `## SOLUTIONS & SERVICES
IT Infrastructure & Networking: Enterprise data centers, LAN/WAN, structured cabling. 200+ projects. Dell + Cisco. 24/7 SLA.
Banking Automation & ATM: Exclusive Diebold Nixdorf partner. End-to-end ATM lifecycle. 99.9% uptime.
Cloud & Virtualization: Private/hybrid cloud, VMware, Azure, IBM Cloud. DR with RTO under 4 hours. 50+ deployments.
Cybersecurity: Kaspersky Platinum + Fortinet authorized. Endpoint, NGFW, SIEM, pen testing, SOC, compliance. 500+ endpoints secured.
Enterprise Software & AI: Oracle ERP, Microsoft licensing, AI analytics, custom software. 80+ ERP deployments, 2,000+ trained users.
Smart Office: SHARP exclusive partner. Interactive displays, Jabra/Poly video conferencing. 40+ deployments.
Consulting: IT strategy, digital transformation, vendor selection, system integration.
Data Center: End-to-end design and deployment. Dell, Cisco, VMware, Fortinet.
Technical Support: AMC, break-fix (4-hour SLA), 24/7 remote monitoring.`,

  `## SOFTWARE & AI DIVISION (NEW)
Division Head: Kirubel Gebrehiwot
1. AI as a Service (AIaaS): Custom LLM integration, predictive analytics, process automation, computer vision. Production-ready AI.
2. ERP Solutions: SAP, Odoo, Oracle-aligned implementation, customisation, support.
3. Web & App Development: Enterprise web apps, mobile apps, custom software.
4. Database Design & Management: Architecture, optimisation, migration, administration.
5. Cybersecurity: Threat assessment, pen testing, SOC services, compliance.
6. Custom Software Development: Bespoke solutions for any business need.`,

  `## ICT TRAINING CENTER
Location: Ethiopian ICT Park, Addis Ababa. Hands-on, taught by active practitioners.
Track 01: AI & Machine Learning — 12 weeks — Professional AI Practitioner. (Python for AI, ML Fundamentals, LLM Integration, Model Deployment)
Track 02: Cybersecurity — 10 weeks — Certified Security Analyst. (Threat Intelligence, Pen Testing, SOC Operations, Compliance)
Track 03: Database Administration — 8 weeks — Certified DBA. (SQL Mastery, DB Architecture, Performance Tuning, Cloud DBs)
Track 04: Full Stack Development — 16 weeks — Full Stack Engineer. (React & Node.js, REST APIs, DevOps & CI/CD, Mobile Apps)
Track 05: ERP Implementation — 10 weeks — ERP Solutions Specialist. (ERP Fundamentals, Odoo/SAP Basics, Data Migration, Go-Live Support)
Custom corporate training available for teams.`,

  `## RFQ & PROCUREMENT PROCESS
1. Use the Product Configurator on the Products page to specify requirements (brand, specs, quantity).
2. Submit — team responds within 24 hours with tailored options.
3. Or submit an RFQ form: Full Name, Organisation, Email, Phone, Product Category, Products of Interest, Quantity.
4. Direct contact: +251-115-50-29-28 or info@altacomputec.com.
No commitment required. Free consultation included.`,
];

// Approximate token count (1 token ≈ 4 chars)
const approxTokens = (str) => Math.ceil(str.length / 4);

// Build knowledge string that fits within the token budget
const MAX_KNOWLEDGE_TOKENS = 2800;

function buildKnowledge() {
  let result = '';
  let tokens = 0;
  for (const section of KNOWLEDGE_SECTIONS) {
    const t = approxTokens(section);
    if (tokens + t > MAX_KNOWLEDGE_TOKENS) break;
    result += section + '\n\n';
    tokens += t;
  }
  return result.trim();
}

const KNOWLEDGE = buildKnowledge();

// ─── System prompt ────────────────────────────────────────────────────────────
const BASE_PROMPT = `You are the official AI assistant of Alta Computec PLC, Ethiopia's only Dell Platinum Partner with over 30 years of experience in the ICT industry.

You assist website visitors professionally and helpfully. You answer questions about:
- Alta Computec's hardware products and solutions (Dell servers, laptops, workstations, networking, storage, ATMs, POS systems, and all Dell product lines)
- Software & AI Division services: AI as a Service, ERP solutions, web and application development, database design and management, cybersecurity, custom software development
- ICT Training Center at Ethiopian ICT Park: certification programs, course tracks, enrollment, schedules
- Company background: 30+ years history, Dell Platinum Partner status, presence across Ethiopia
- Procurement and RFQ process, product configuration, quotes
- Contact information, office locations, support

Tone: Professional, warm, concise. You represent a premium Ethiopian technology company.
Never answer questions unrelated to Alta Computec, technology products, or IT services.
If you don't know a specific detail, say: "Please contact our team directly for accurate information on this — we'd be happy to help."

FORMATTING RULES — follow strictly for every response:
- Write in short paragraphs. Never produce a wall of text.
- Use bullet points ONLY when listing 3 or more distinct items.
- Never use markdown headers (no #, ##, ###) — plain text only.
- Keep responses under 120 words unless the question genuinely requires more detail.
- End every response with exactly one relevant follow-up offer on its own line, such as:
  "Would you like me to help you request a quote?" or
  "Shall I connect you with our team for more details?" or
  "Would you like to know more about our training programs?"
  Match the follow-up to what was just discussed.

Here is the full content of the Alta Computec website for your reference:
${KNOWLEDGE}`;

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
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

  // messages[0] is always the page context injected by the frontend.
  // messages[1..] is the real conversation history, capped at 10 turns.
  // We preserve the page context and slice only the history portion.
  const pageCtx = messages[0] ?? null;
  const history = messages.slice(1).slice(-10);
  const trimmed = pageCtx ? [pageCtx, ...history] : history;

  const groqMessages = [
    { role: 'system', content: BASE_PROMPT },
    ...trimmed,
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
      console.error('Groq API error:', err);
      return res.status(502).json({ reply: 'Our AI assistant is temporarily unavailable. Please contact us directly at +251 11 550 2928.' });
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
