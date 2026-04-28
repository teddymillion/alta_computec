import { useState, useEffect, useRef } from 'react';
import { Server, CreditCard, Cloud, ShieldCheck, Code, Monitor, LayoutDashboard, Lightbulb, CheckCircle2, ArrowRight, X, Search, PenTool, Package, Zap, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import PartnerLogo from '../components/PartnerLogo';

const TABS = [
  { id: 'infrastructure', label: 'IT Infrastructure' },
  { id: 'banking', label: 'Banking & ATM' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'software', label: 'Software & AI' },
  { id: 'smartoffice', label: 'Smart Office' },
  { id: 'enterprise', label: 'Enterprise Apps' },
  { id: 'consulting', label: 'Consulting' },
];

const SOLUTIONS = [
  {
    id: 'infrastructure', icon: Server, label: 'Infrastructure',
    title: 'IT Infrastructure & Networking',
    p1: 'ALTA designs and deploys enterprise-grade data centers, structured cabling, LAN/WAN networks, and server infrastructure for Ethiopia\'s most demanding institutions. As Ethiopia\'s only Dell Platinum Partner, we source and deploy the highest-tier hardware at exclusive pricing.',
    p2: 'Our infrastructure team has delivered 200+ projects across banking, government, and telecom sectors — from single-server deployments to full-scale data center builds with redundant power, cooling, and networking.',
    benefits: ['Dell PowerEdge server deployment & configuration', 'Cisco enterprise networking & SD-WAN', '24/7 infrastructure monitoring & SLA support', 'On-site engineering response across Ethiopia'],
    tags: ['Banking', 'Government', 'Telecom', 'Energy'],
    stats: [{ v: '200+', l: 'Infrastructure Projects' }, { v: 'Dell Platinum', l: 'Certified' }, { v: '24/7', l: 'SLA Support' }],
    partnerNames: ['Dell', 'Cisco', 'HP'],
    bg: 'bg-white',
  },
  {
    id: 'banking', icon: CreditCard, label: 'Banking Tech',
    title: 'Banking Automation & ATM',
    p1: 'ALTA is the exclusive Diebold Nixdorf partner in Ethiopia, providing end-to-end ATM lifecycle management — from procurement and site preparation to deployment, integration with core banking systems, and ongoing maintenance.',
    p2: 'We have deployed 120+ ATMs across Ethiopia\'s leading banks, with a 99.9% uptime SLA and 24/7 cash management support. Our banking automation solutions also include cash recyclers, teller automation, and digital branch technology.',
    benefits: ['Diebold Nixdorf ATM deployment & integration', 'Core banking system connectivity', 'Cash management & reconciliation automation', '24/7 ATM monitoring & first-line maintenance'],
    tags: ['Banking', 'Financial Services', 'MFIs'],
    stats: [{ v: '150+', l: 'Banking Clients' }, { v: 'Diebold Nixdorf', l: 'Exclusive Partner' }, { v: '99.9%', l: 'ATM Uptime' }],
    partnerNames: ['Diebold Nixdorf', 'Oracle', 'Kaspersky'],
    bg: 'bg-white dark:bg-navy-950',
  },
  {
    id: 'cloud', icon: Cloud, label: 'Cloud',
    title: 'Cloud & Virtualization',
    p1: 'ALTA designs and deploys private and hybrid cloud environments tailored to Ethiopian enterprise requirements — including regulatory compliance, connectivity constraints, and data sovereignty considerations.',
    p2: 'Our cloud team is certified in VMware, Microsoft Azure, and IBM Cloud. We deliver cloud migration strategies, backup and disaster recovery solutions, and ongoing cloud management services with RTO targets under 4 hours.',
    benefits: ['Private cloud architecture & deployment', 'VMware virtualization & vSphere management', 'Hybrid cloud migration strategy & execution', 'Backup, DR, and business continuity planning'],
    tags: ['All Sectors', 'Government', 'Education'],
    stats: [{ v: '50+', l: 'Cloud Deployments' }, { v: 'VMware', l: 'Certified' }, { v: '<4 hrs', l: 'RTO Target' }],
    partnerNames: ['Microsoft', 'IBM', 'Dell'],
    bg: 'bg-white',
  },
  {
    id: 'cybersecurity', icon: ShieldCheck, label: 'Security',
    title: 'Cybersecurity',
    p1: 'As a Kaspersky Platinum Partner and Fortinet authorized partner, ALTA delivers comprehensive cybersecurity solutions for Ethiopian enterprises — from endpoint protection and firewall deployment to SIEM, penetration testing, and staff awareness training.',
    p2: 'Our security team has secured 500+ endpoints across banking, government, and telecom clients with zero post-deployment critical incidents. We provide compliance auditing aligned to Ethiopian financial sector regulations and international standards.',
    benefits: ['Kaspersky endpoint security deployment & management', 'Fortinet NGFW & SD-WAN security', 'SIEM implementation & 24/7 SOC services', 'Penetration testing & compliance auditing'],
    tags: ['Banking', 'Government', 'Telecom'],
    stats: [{ v: 'Kaspersky Platinum', l: 'Partner' }, { v: '0', l: 'Post-Deployment Breaches' }, { v: '500+', l: 'Endpoints Secured' }],
    partnerNames: ['Kaspersky', 'Fortinet', 'Cisco'],
    bg: 'bg-white dark:bg-navy-950',
  },
  {
    id: 'software', icon: Code, label: 'Software & AI',
    title: 'Custom Software & AI',
    p1: 'ALTA develops bespoke enterprise software solutions — ERP systems, CRM platforms, AML compliance tools, mobile applications, and AI-powered analytics — built with Ethiopian regulatory requirements and local business processes in mind.',
    p2: 'As an Oracle Gold Partner, we implement Oracle Fusion ERP, HCM, and analytics platforms. Our development team also builds custom REST APIs, system integrations, and AI-powered dashboards for data-driven decision making.',
    benefits: ['Oracle ERP & HCM implementation', 'Custom application development (web & mobile)', 'AI-powered analytics & business intelligence', 'System integration & REST API development'],
    tags: ['All Sectors', 'Banking', 'Government'],
    stats: [{ v: '100+', l: 'Software Projects' }, { v: 'Oracle Gold', l: 'Partner' }, { v: 'AI-Ready', l: 'Architecture' }],
    partnerNames: ['Oracle', 'Microsoft', 'IBM'],
    bg: 'bg-white',
  },
  {
    id: 'smartoffice', icon: Monitor, label: 'Collaboration',
    title: 'Smart Office & Collaboration',
    p1: 'ALTA is the exclusive SHARP partner in Ethiopia, providing interactive displays, projectors, and smart office technology for corporate, education, and government environments. We design and deploy complete collaboration ecosystems.',
    p2: 'Our smart office solutions include SHARP AQUOS BOARD interactive displays, Jabra and Poly video conferencing systems, structured cabling for collaboration spaces, and AV system integration — all installed and supported by our certified team.',
    benefits: ['SHARP interactive display deployment & training', 'Jabra & Poly video conferencing systems', 'AV system design & integration', 'Smart classroom & boardroom setup'],
    tags: ['Education', 'Corporate', 'Government'],
    stats: [{ v: 'SHARP', l: 'Exclusive Ethiopia Partner' }, { v: '40+', l: 'Smart Office Deployments' }, { v: 'Jabra & Poly', l: 'Certified' }],
    partnerNames: ['SHARP', 'Jabra', 'Poly'],
    bg: 'bg-white dark:bg-navy-950',
  },
  {
    id: 'enterprise', icon: LayoutDashboard, label: 'Enterprise Apps',
    title: 'Enterprise Applications',
    p1: 'As an Oracle Gold Partner, ALTA implements and supports Oracle Fusion ERP, HCM, Finance, Supply Chain, and Business Intelligence platforms for Ethiopian enterprises. We provide full implementation, data migration, training, and ongoing support.',
    p2: 'Our enterprise applications team has trained 2,000+ users across 80+ ERP deployments. We also implement Microsoft Dynamics 365, Backbase digital banking platforms, and custom enterprise portals tailored to Ethiopian business requirements.',
    benefits: ['Oracle Fusion ERP full implementation', 'Microsoft Dynamics 365 deployment', 'Backbase digital banking platform', 'User training & change management'],
    tags: ['Manufacturing', 'Finance', 'Government'],
    stats: [{ v: 'Oracle Gold', l: 'Partner' }, { v: '80+', l: 'ERP Deployments' }, { v: '2,000+', l: 'Trained Users' }],
    partnerNames: ['Oracle', 'Microsoft', 'Backbase'],
    bg: 'bg-white',
  },
  {
    id: 'consulting', icon: Lightbulb, label: 'Consulting',
    title: 'Consulting & Integration',
    p1: 'ALTA\'s consulting practice provides technology-agnostic IT strategy, digital transformation roadmaps, vendor selection advisory, and system integration services. With 30 years of Ethiopian market experience, we understand the unique challenges facing local enterprises.',
    p2: 'Our consultants have guided 640+ projects from initial scoping through delivery and post-deployment support. We provide independent advice — recommending the best technology for each requirement, not the technology we\'re incentivized to sell.',
    benefits: ['IT strategy & digital transformation roadmaps', 'Vendor selection & procurement advisory', 'System integration & middleware development', 'Project management & delivery assurance'],
    tags: ['All Sectors'],
    stats: [{ v: '30 Yrs', l: 'Market Expertise' }, { v: 'Multi-Vendor', l: 'Certified' }, { v: '640+', l: 'Completed Projects' }],
    partnerNames: ['Dell', 'Cisco', 'Oracle'],
    bg: 'bg-white dark:bg-navy-950',
  },
];

const PROCESS_STEPS = [
  { icon: Search, num: '01', title: 'Discovery', desc: 'We audit your current environment and define project scope with your team.' },
  { icon: PenTool, num: '02', title: 'Architecture', desc: 'Our engineers design a solution blueprint aligned to your business objectives.' },
  { icon: Package, num: '03', title: 'Procurement', desc: 'Certified products sourced directly from global vendors at Platinum partner pricing.' },
  { icon: Zap, num: '04', title: 'Deployment', desc: 'Phased rollout with zero-downtime methodology and continuous progress reporting.' },
  { icon: Headphones, num: '05', title: 'Support', desc: 'Post-deployment SLA support, staff training, and ongoing managed services.' },
];

const INDUSTRY_MAP = {
  Banking: ['Banking Automation & ATM', 'Cybersecurity'],
  Government: ['IT Infrastructure & Networking', 'Consulting & Integration'],
  Telecom: ['IT Infrastructure & Networking', 'Cybersecurity'],
  Education: ['Smart Office & Collaboration', 'Cloud & Virtualization'],
  Energy: ['IT Infrastructure & Networking', 'Enterprise Applications'],
  Manufacturing: ['Enterprise Applications', 'Custom Software & AI'],
  SME: ['Cloud & Virtualization', 'Smart Office & Collaboration'],
  Other: ['IT Infrastructure & Networking', 'Consulting & Integration'],
};

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('infrastructure');
  const [showFinder, setShowFinder] = useState(false);
  const [finderIndustry, setFinderIndustry] = useState('');
  const [finderChallenge, setFinderChallenge] = useState('');
  const [finderScale, setFinderScale] = useState('');
  const [finderResult, setFinderResult] = useState(null);

  const scrollTo = (id) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFinder = (e) => {
    e.preventDefault();
    setFinderResult(INDUSTRY_MAP[finderIndustry] || ['IT Infrastructure & Networking', 'Consulting & Integration']);
  };

  return (
    <PageLayout>
      <PageHero
        breadcrumb="Solutions"
        title="End-to-End IT Solutions for Africa's Leading Enterprises"
        subtitle="From network infrastructure to AI-powered software — ALTA delivers complete technology transformation."
        ctaPrimary={{ label: 'Request a Custom Solution', to: '/contact' }}
        ctaSecondary={{ label: 'Talk to an Engineer', to: '/contact' }}
      />

      {/* Sticky Tab Nav */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-slate-200 shadow-sm overflow-x-auto scrollbar-hide">
        <div className="section-container">
          <div className="flex items-center gap-0 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={`px-4 py-4 text-[13px] font-medium whitespace-nowrap transition-all duration-150 border-b-2 focus-visible:outline-none ${
                  activeTab === tab.id
                    ? 'border-alta-green text-navy-900 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Sections */}
      {SOLUTIONS.map((s, idx) => {
        const Icon = s.icon;
        const isEven = idx % 2 === 0;
        return (
          <section key={s.id} id={s.id} className={`section-padding ${s.bg}`}>
            <div className="section-container">
              <div className={`grid lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`flex flex-col gap-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <p className="overline-tag mb-3">{s.label}</p>
                    <h2 className="section-heading">{s.title}</h2>
                  </div>
                  <p className="text-[14px] text-slate-600 leading-[1.75]">{s.p1}</p>
                  <p className="text-[14px] text-slate-600 leading-[1.75]">{s.p2}</p>
                  <ul className="flex flex-col gap-2.5">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                        <CheckCircle2 size={16} className="text-alta-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{t}</span>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-ghost self-start">
                    Request This Solution <ArrowRight size={14} />
                  </Link>
                </div>

                <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="rounded-2xl p-6 flex flex-col gap-6 border-2 bg-white dark:bg-navy-900" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                    <div className="w-12 h-12 rounded-xl bg-alta-blue/15 border border-alta-blue/20 flex items-center justify-center">
                      <Icon size={24} className="text-alta-blue" aria-hidden="true" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {s.stats.map((st) => (
                        <div key={st.l} className="flex flex-col gap-1 text-center">
                          <span className="text-[15px] font-black text-alta-blue dark:text-alta-green-light leading-tight">{st.v}</span>
                          <span className="text-[10px] text-slate-500 font-medium leading-tight">{st.l}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-4">Key Partners</p>
                      <div className="flex items-center gap-5 flex-wrap">
                        {s.partnerNames.map((name) => (
                          <div key={name} className="flex flex-col items-center gap-1.5 group cursor-default">
                            <PartnerLogo name={name} size={52} className="object-contain group-hover:scale-110 transition-transform duration-200" />
                            <span className="text-[10px] text-slate-500 font-medium">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* How We Deliver */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Our Process</p>
            <h2 className="section-heading">How We Deliver Every Project</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px border-t-2 border-dashed border-slate-200" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {PROCESS_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex flex-col items-center gap-4 text-center relative">
                    <div className="w-16 h-16 rounded-full bg-alta-green flex items-center justify-center flex-shrink-0 shadow-md z-10">
                      <span className="text-white font-black text-[13px]">{step.num}</span>
                    </div>
                    <Icon size={20} className="text-alta-blue" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-navy-900 text-[14px] mb-1">{step.title}</p>
                      <p className="text-[12px] text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Finder */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10 text-center">
          <h2 className="section-heading-light mb-3">Not sure which solution fits your needs?</h2>
          <p className="section-subheading-light mx-auto text-center mb-8">Answer 3 quick questions and we'll recommend the right solution for your organisation.</p>
          <button onClick={() => setShowFinder(true)} className="btn-primary text-[15px] px-8 py-4">
            Find My Solution <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Solution Finder Modal */}
      {showFinder && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Solution Finder">
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={() => { setShowFinder(false); setFinderResult(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] p-8 z-10">
            <button onClick={() => { setShowFinder(false); setFinderResult(null); }} className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue" aria-label="Close">
              <X size={16} />
            </button>
            <h3 className="text-[18px] font-bold text-navy-900 mb-6">ALTA Solution Finder</h3>
            {!finderResult ? (
              <form onSubmit={handleFinder} className="flex flex-col gap-4">
                <div>
                  <label className="form-label">Your Industry</label>
                  <select className="form-input" value={finderIndustry} onChange={(e) => setFinderIndustry(e.target.value)} required>
                    <option value="">Select your industry</option>
                    {Object.keys(INDUSTRY_MAP).map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Primary Challenge</label>
                  <select className="form-input" value={finderChallenge} onChange={(e) => setFinderChallenge(e.target.value)} required>
                    <option value="">Select your challenge</option>
                    {['Infrastructure', 'Security', 'Software', 'Connectivity', 'Compliance', 'Cost Reduction'].map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Project Scale</label>
                  <select className="form-input" value={finderScale} onChange={(e) => setFinderScale(e.target.value)} required>
                    <option value="">Select project scale</option>
                    {['Under $50K', '$50K–$200K', '$200K+'].map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-2">
                  See Recommended Solutions <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-5">
                <p className="text-[14px] text-slate-600">Based on your answers, we recommend:</p>
                <div className="flex flex-wrap gap-2">
                  {finderResult.map((r) => (
                    <span key={r} className="px-3 py-1.5 rounded-full bg-alta-green/10 text-alta-green font-semibold text-[13px] border border-alta-green/20">{r}</span>
                  ))}
                </div>
                <Link to="/contact" onClick={() => setShowFinder(false)} className="btn-primary w-full justify-center">
                  Request a Proposal <ArrowRight size={15} />
                </Link>
                <button onClick={() => setFinderResult(null)} className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors text-center">
                  ← Start over
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
