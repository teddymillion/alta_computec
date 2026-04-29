import { Landmark, Building2, Signal, GraduationCap, Zap, Factory, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import CTABanner from '../components/CTABanner';
import PartnerLogo from '../components/PartnerLogo';

const INDUSTRIES = [
  {
    id: 'banking', icon: Landmark, name: 'Banking & Financial Services',
    accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)', accentBorder: 'rgba(27,79,216,0.35)',
    tag: 'Banking Tech',
    challenge: "Ethiopian banks demand regulatory-compliant, high-availability IT infrastructure with zero downtime. With digital banking adoption accelerating, financial institutions face growing cybersecurity threats and the need for modern ATM networks.",
    solutions: ['ATM deployment & lifecycle management', 'Core banking infrastructure & servers', 'Cybersecurity & AML compliance systems', '24/7 IT support SLA & monitoring'],
    stats: [{ v: '150+', l: 'Banking Clients' }, { v: '120+', l: 'ATMs Deployed' }, { v: '99.9%', l: 'Uptime SLA' }],
    partnerNames: ['Diebold Nixdorf', 'Oracle', 'Kaspersky'],
    typical: 'Full ATM network rollout with core banking integration',
    sectionBg: 'bg-white',
  },
  {
    id: 'government', icon: Building2, name: 'Government & Public Sector',
    accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)',
    tag: 'Public Sector',
    challenge: "Government institutions require secure, scalable infrastructure that meets public procurement standards and serves millions of citizens. Data sovereignty, compliance, and multi-site connectivity are critical requirements.",
    solutions: ['Secure data center design & deployment', 'WAN/LAN across regional offices', 'ERP for public administration', 'Fortinet cybersecurity & compliance'],
    stats: [{ v: '80+', l: 'Government Clients' }, { v: '12', l: 'Ministries Served' }, { v: 'ISO-Aligned', l: 'Deployments' }],
    partnerNames: ['Cisco', 'Dell', 'Fortinet'],
    typical: 'Ministry-wide network upgrade across 12 regional offices',
    sectionBg: 'bg-slate-50/80',
  },
  {
    id: 'telecom', icon: Signal, name: 'Telecom & ISP',
    accent: '#0EA5E9', accentLight: 'rgba(14,165,233,0.12)', accentBorder: 'rgba(14,165,233,0.35)',
    tag: 'Telecom',
    challenge: "Telecom operators need enterprise-grade networking and compute infrastructure to deliver reliable connectivity across Ethiopia. High-throughput routing, redundant core networks, and scalable data centers are essential.",
    solutions: ['Core network infrastructure design', 'Cisco routing & switching deployment', 'Huawei enterprise equipment supply', 'Hardware supply & logistics management'],
    stats: [{ v: '20+', l: 'Telecom Clients' }, { v: 'Cisco Premier', l: 'Certified' }, { v: 'Huawei', l: 'Authorized' }],
    partnerNames: ['Cisco', 'Huawei', 'HP'],
    typical: 'ISP data center buildout with redundant core routing',
    sectionBg: 'bg-white',
  },
  {
    id: 'education', icon: GraduationCap, name: 'Education & NGO',
    accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)', accentBorder: 'rgba(22,163,74,0.35)',
    tag: 'Education',
    challenge: "Schools, universities, and NGOs need modern, affordable IT that maximises impact on limited budgets. Smart classrooms, campus Wi-Fi, and digital learning tools are transforming Ethiopian education.",
    solutions: ['Smart classroom deployment & training', 'SHARP interactive display installation', 'Campus Wi-Fi 6 infrastructure', 'IT lab setup & ongoing management'],
    stats: [{ v: '50+', l: 'Education Clients' }, { v: '40', l: 'Smart Classrooms' }, { v: 'SHARP', l: 'Exclusive Partner' }],
    partnerNames: ['SHARP', 'Dell', 'Lenovo'],
    typical: 'University campus-wide Wi-Fi 6 and smart classroom rollout',
    sectionBg: 'bg-slate-50/80',
  },
  {
    id: 'energy', icon: Zap, name: 'Energy & Utilities',
    accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)',
    tag: 'Energy',
    challenge: "Power and utility companies require ruggedised, always-on infrastructure with high availability and rapid failover. UPS systems, precision cooling, and redundant networking are non-negotiable.",
    solutions: ['Eaton UPS systems & power infrastructure', 'Vertiv precision cooling & power', 'Server room design & deployment', 'Redundant networking & failover'],
    stats: [{ v: '30+', l: 'Energy Clients' }, { v: 'Eaton & Vertiv', l: 'Certified' }, { v: '99.99%', l: 'Power Availability' }],
    partnerNames: ['Eaton', 'Vertiv', 'Dell'],
    typical: 'UPS and power infrastructure for utility company data center',
    sectionBg: 'bg-white',
  },
  {
    id: 'manufacturing', icon: Factory, name: 'Manufacturing & Retail',
    accent: '#8B5CF6', accentLight: 'rgba(139,92,246,0.12)', accentBorder: 'rgba(139,92,246,0.35)',
    tag: 'Manufacturing',
    challenge: "Manufacturers and retailers need integrated ERP, POS, and supply chain systems to compete in Ethiopia's growing market. Oracle and Microsoft implementations with local compliance are key.",
    solutions: ['Oracle ERP implementation & support', 'Microsoft 365 & Dynamics deployment', 'POS systems & retail technology', 'Supply chain software & integration'],
    stats: [{ v: '40+', l: 'Manufacturing Clients' }, { v: 'Oracle Gold', l: 'Partner' }, { v: '200+', l: 'ERP Users Trained' }],
    partnerNames: ['Oracle', 'Microsoft', 'IBM'],
    typical: 'Full Oracle ERP deployment with custom Ethiopian tax compliance module',
    sectionBg: 'bg-slate-50/80',
  },
];

const TESTIMONIALS = [
  { quote: "ALTA has been our infrastructure partner for over a decade. Their response time and technical depth is unmatched in Ethiopia.", name: 'IT Director', org: 'Commercial Bank of Ethiopia', initials: 'CB', color: 'from-blue-600 to-blue-800' },
  { quote: "The ATM deployment project was delivered on time and on budget. Zero downtime during the transition.", name: 'Head of IT', org: 'Awash Bank', initials: 'AB', color: 'from-emerald-600 to-emerald-800' },
  { quote: "ALTA's team understood our government procurement requirements and delivered a fully compliant solution.", name: 'CTO', org: 'Ministry of Finance', initials: 'MF', color: 'from-indigo-600 to-indigo-800' },
];

export default function IndustriesPage() {
  return (
    <PageLayout>
      <PageHero breadcrumb="Industries" title="Deep Sector Expertise Across Ethiopia's Critical Industries" subtitle="30 years of delivering mission-critical IT to the institutions that power Ethiopia's economy." />

      {/* Industry Selector */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Industries We Serve</p>
            <h2 className="section-heading">Your Sector. Our Expertise.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <a
                  key={ind.id}
                  href={`#${ind.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(ind.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white dark:bg-navy-900 border-2 transition-all duration-250 hover:-translate-y-1 cursor-pointer overflow-hidden"
                  style={{
                    borderColor: 'rgba(226,232,240,0.8)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ind.accent;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${ind.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${ind.accentBorder}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                    style={{ background: `linear-gradient(90deg, ${ind.accent}, ${ind.accent}88)` }}
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-250"
                      style={{ background: ind.accentLight, border: `1px solid ${ind.accentBorder}` }}
                    >
                      <Icon size={22} style={{ color: ind.accent }} aria-hidden="true" />
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{ background: ind.accentLight, color: ind.accent, border: `1px solid ${ind.accentBorder}` }}
                    >
                      {ind.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold text-navy-900 dark:text-white mb-2 leading-snug">{ind.name}</h3>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{ind.challenge.split('.')[0]}.</p>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100 dark:border-white/6">
                    <span className="text-[13px] font-semibold text-navy-900 group-hover:text-current transition-colors" style={{ color: ind.accent }}>
                      View Solutions
                    </span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" style={{ color: ind.accent }} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

        {/* Industry Detail Sections */}
      {INDUSTRIES.map((ind, idx) => {
        const Icon = ind.icon;
        const isEven = idx % 2 === 0;
        const sectionBg = isEven ? 'bg-white dark:bg-navy-950' : 'bg-slate-50/80 dark:bg-navy-950';
        return (
          <section key={ind.id} id={ind.id} className={`section-padding ${sectionBg}`}>
            <div className="section-container">
              <div className={`grid lg:grid-cols-[60%_40%] gap-10 lg:gap-16 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`flex flex-col gap-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: ind.accentLight, border: `1px solid ${ind.accentBorder}` }}
                      >
                        <Icon size={20} style={{ color: ind.accent }} aria-hidden="true" />
                      </div>
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                        style={{ background: ind.accentLight, color: ind.accent, border: `1px solid ${ind.accentBorder}` }}
                      >
                        {ind.tag}
                      </span>
                    </div>
                    <h2 className="section-heading">{ind.name}</h2>
                  </div>
                  <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-[1.75]">{ind.challenge}</p>
                  <ul className="flex flex-col gap-2.5">
                    {ind.solutions.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-[14px] text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: ind.accent }} aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-primary self-start" style={{ background: `linear-gradient(135deg, ${ind.accent}, ${ind.accent}cc)` }}>
                    Request a {ind.name.split(' ')[0]} Solution <ArrowRight size={14} />
                  </Link>
                </div>

                <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'rgba(10,22,40,0.95)', border: `1px solid ${ind.accentBorder}` }}>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {ind.stats.map((st) => (
                        <div key={st.l} className="flex flex-col gap-1 text-center p-3 rounded-xl" style={{ background: ind.accentLight }}>
                          <span className="text-[15px] font-black leading-tight" style={{ color: ind.accent }}>{st.v}</span>
                          <span className="text-[10px] text-slate-400 font-medium leading-tight">{st.l}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-4">Key Technology Partners</p>
                      <div className="flex items-center gap-5 flex-wrap">
                        {ind.partnerNames.map((name) => (
                          <div key={name} className="flex flex-col items-center gap-1.5">
                            <PartnerLogo name={name} size={52} className="object-contain" />
                            <span className="text-[10px] text-slate-500 font-medium">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/8">
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-2">Typical Project</p>
                      <p className="text-[13px] text-slate-300 italic leading-relaxed">"{ind.typical}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Testimonials */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center text-alta-blue mb-3">Client Voices</p>
            <h2 className="section-heading-light">Trusted by Ethiopia's Leading Institutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.org} className="card-dark flex flex-col gap-4 p-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" aria-hidden="true" />)}
                </div>
                <blockquote className="text-[13.5px] text-slate-300 leading-relaxed flex-1">"{t.quote}"</blockquote>
                <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-[11px]">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-[13px]">{t.name}</p>
                    <p className="text-alta-blue/80 text-[11px] font-semibold">{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
