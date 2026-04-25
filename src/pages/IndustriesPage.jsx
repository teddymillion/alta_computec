import { Landmark, Building2, Signal, GraduationCap, Zap, Factory, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import CTABanner from '../components/CTABanner';

const INDUSTRIES = [
  {
    id: 'banking', icon: Landmark, name: 'Banking & Financial Services', color: 'text-alta-blue', bg: 'bg-blue-50', border: 'border-blue-200',
    challenge: "Ethiopian banks demand regulatory-compliant, high-availability IT infrastructure with zero downtime. With digital banking adoption accelerating, financial institutions face growing cybersecurity threats and the need for modern ATM networks.",
    solutions: ['ATM deployment & lifecycle management', 'Core banking infrastructure & servers', 'Cybersecurity & AML compliance systems', '24/7 IT support SLA & monitoring'],
    stats: [{ v: '150+', l: 'Banking Clients' }, { v: '120+', l: 'ATMs Deployed' }, { v: '99.9%', l: 'Uptime SLA' }],
    partners: ['/diebold.png', '/oracle.png', '/kaspersky.png'], partnerNames: ['Diebold Nixdorf', 'Oracle', 'Kaspersky'],
    typical: 'Full ATM network rollout with core banking integration',
    sectionBg: 'bg-white',
  },
  {
    id: 'government', icon: Building2, name: 'Government & Public Sector', color: 'text-alta-indigo', bg: 'bg-indigo-50', border: 'border-indigo-200',
    challenge: "Government institutions require secure, scalable infrastructure that meets public procurement standards and serves millions of citizens. Data sovereignty, compliance, and multi-site connectivity are critical requirements.",
    solutions: ['Secure data center design & deployment', 'WAN/LAN across regional offices', 'ERP for public administration', 'Fortinet cybersecurity & compliance'],
    stats: [{ v: '80+', l: 'Government Clients' }, { v: '12', l: 'Ministries Served' }, { v: 'ISO-Aligned', l: 'Deployments' }],
    partners: ['/cisco.png', '/dell.png', '/fortinet.png'], partnerNames: ['Cisco', 'Dell', 'Fortinet'],
    typical: 'Ministry-wide network upgrade across 12 regional offices',
    sectionBg: 'bg-slate-50/80',
  },
  {
    id: 'telecom', icon: Signal, name: 'Telecom & ISP', color: 'text-alta-sky', bg: 'bg-sky-50', border: 'border-sky-200',
    challenge: "Telecom operators need enterprise-grade networking and compute infrastructure to deliver reliable connectivity across Ethiopia. High-throughput routing, redundant core networks, and scalable data centers are essential.",
    solutions: ['Core network infrastructure design', 'Cisco routing & switching deployment', 'Huawei enterprise equipment supply', 'Hardware supply & logistics management'],
    stats: [{ v: '20+', l: 'Telecom Clients' }, { v: 'Cisco Premier', l: 'Certified' }, { v: 'Huawei', l: 'Authorized' }],
    partners: ['/cisco.png', '/huawei.jpg', '/hp.png'], partnerNames: ['Cisco', 'Huawei', 'HP'],
    typical: 'ISP data center buildout with redundant core routing',
    sectionBg: 'bg-white',
  },
  {
    id: 'education', icon: GraduationCap, name: 'Education & NGO', color: 'text-alta-green', bg: 'bg-green-50', border: 'border-green-200',
    challenge: "Schools, universities, and NGOs need modern, affordable IT that maximises impact on limited budgets. Smart classrooms, campus Wi-Fi, and digital learning tools are transforming Ethiopian education.",
    solutions: ['Smart classroom deployment & training', 'SHARP interactive display installation', 'Campus Wi-Fi 6 infrastructure', 'IT lab setup & ongoing management'],
    stats: [{ v: '50+', l: 'Education Clients' }, { v: '40', l: 'Smart Classrooms' }, { v: 'SHARP', l: 'Exclusive Partner' }],
    partners: ['/sharp.png', '/dell.png', '/lenovo.png'], partnerNames: ['SHARP', 'Dell', 'Lenovo'],
    typical: 'University campus-wide Wi-Fi 6 and smart classroom rollout',
    sectionBg: 'bg-slate-50/80',
  },
  {
    id: 'energy', icon: Zap, name: 'Energy & Utilities', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200',
    challenge: "Power and utility companies require ruggedised, always-on infrastructure with high availability and rapid failover. UPS systems, precision cooling, and redundant networking are non-negotiable.",
    solutions: ['Eaton UPS systems & power infrastructure', 'Vertiv precision cooling & power', 'Server room design & deployment', 'Redundant networking & failover'],
    stats: [{ v: '30+', l: 'Energy Clients' }, { v: 'Eaton & Vertiv', l: 'Certified' }, { v: '99.99%', l: 'Power Availability' }],
    partners: ['/eaton.png', '/vertive.png', '/dell.png'], partnerNames: ['Eaton', 'Vertiv', 'Dell'],
    typical: 'UPS and power infrastructure for utility company data center',
    sectionBg: 'bg-white',
  },
  {
    id: 'manufacturing', icon: Factory, name: 'Manufacturing & Retail', color: 'text-alta-indigo', bg: 'bg-indigo-50', border: 'border-indigo-200',
    challenge: "Manufacturers and retailers need integrated ERP, POS, and supply chain systems to compete in Ethiopia's growing market. Oracle and Microsoft implementations with local compliance are key.",
    solutions: ['Oracle ERP implementation & support', 'Microsoft 365 & Dynamics deployment', 'POS systems & retail technology', 'Supply chain software & integration'],
    stats: [{ v: '40+', l: 'Manufacturing Clients' }, { v: 'Oracle Gold', l: 'Partner' }, { v: '200+', l: 'ERP Users Trained' }],
    partners: ['/oracle.png', '/microsoft.png', '/ibm.png'], partnerNames: ['Oracle', 'Microsoft', 'IBM'],
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
      <section className="section-padding bg-white">
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
                  className={`group card-light flex flex-col gap-4 cursor-pointer border-2 border-transparent hover:border-current transition-all duration-200 ${ind.color}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${ind.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={20} className={ind.color} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-navy-900 mb-1">{ind.name}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">{ind.challenge.split('.')[0]}.</p>
                  </div>
                  <span className="text-[13px] font-semibold flex items-center gap-1 mt-auto">
                    View Solutions <ArrowRight size={13} />
                  </span>
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
        return (
          <section key={ind.id} id={ind.id} className={`section-padding ${ind.sectionBg}`}>
            <div className="section-container">
              <div className={`grid lg:grid-cols-[60%_40%] gap-10 lg:gap-16 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`flex flex-col gap-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <p className={`overline-tag mb-3 ${ind.color}`}>{ind.name}</p>
                    <h2 className="section-heading">{ind.name}</h2>
                  </div>
                  <p className="text-[14px] text-slate-600 leading-[1.75]">{ind.challenge}</p>
                  <ul className="flex flex-col gap-2.5">
                    {ind.solutions.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                        <CheckCircle2 size={16} className={`${ind.color} flex-shrink-0 mt-0.5`} aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-outline self-start">
                    Request a {ind.name.split(' ')[0]} Solution <ArrowRight size={14} />
                  </Link>
                </div>

                <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="card-dark rounded-2xl p-6 flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-3">
                      {ind.stats.map((st) => (
                        <div key={st.l} className="flex flex-col gap-1 text-center">
                          <span className="text-[14px] font-black text-alta-green-light leading-tight">{st.v}</span>
                          <span className="text-[10px] text-slate-500 font-medium leading-tight">{st.l}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-4">Key Technology Partners</p>
                      <div className="flex items-center gap-5 flex-wrap">
                        {ind.partners.map((img, i) => (
                          <img key={i} src={img} alt={ind.partnerNames[i]}
                            style={{ height: 48, maxWidth: 96, width: 'auto', opacity: 1 }}
                            className="object-contain hover:opacity-100 transition-opacity duration-200"
                            loading="lazy" />
                        ))}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/8">
                      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-1">Typical Project</p>
                      <p className="text-[13px] text-slate-300 italic">"{ind.typical}"</p>
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
