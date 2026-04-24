import { ArrowRight, TrendingUp, Building2, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

const CASE_STUDIES = [
  {
    sector: 'Banking & Financial Services',
    sectorColor: 'bg-blue-100 text-blue-700',
    icon: Building2,
    client: 'Commercial Bank of Ethiopia',
    headline: 'Enterprise Data Center — 200-Node Infrastructure',
    outcome: '99.9% uptime achieved across 200 server nodes',
    metrics: [
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Server Nodes', value: '200+' },
      { label: 'Deployment', value: '14 Wks' },
    ],
    description: 'Designed and deployed a full-scale enterprise data center including Dell PowerEdge servers, Cisco networking fabric, and Eaton UPS infrastructure for uninterrupted banking operations.',
    headerGradient: 'linear-gradient(135deg, #1e3a8a 0%, #0A1628 100%)',
    accentColor: '#3B82F6',
  },
  {
    sector: 'Government & Public Sector',
    sectorColor: 'bg-emerald-100 text-emerald-700',
    icon: TrendingUp,
    client: 'Ministry of Finance, Ethiopia',
    headline: 'Nationwide Network Infrastructure Rollout',
    outcome: '47 regional offices connected on secure WAN',
    metrics: [
      { label: 'Offices', value: '47' },
      { label: 'Uptime', value: '99.7%' },
      { label: 'Security', value: 'A+' },
    ],
    description: 'Architected and deployed a secure wide-area network connecting 47 regional Ministry offices, with Cisco Meraki SD-WAN, centralized monitoring, and Fortinet firewall protection.',
    headerGradient: 'linear-gradient(135deg, #064e3b 0%, #0A1628 100%)',
    accentColor: '#10B981',
  },
  {
    sector: 'Telecom & ISP',
    sectorColor: 'bg-purple-100 text-purple-700',
    icon: Wifi,
    client: 'Ethio Telecom',
    headline: 'Enterprise Cybersecurity Posture Overhaul',
    outcome: 'Zero critical incidents in 18 months post-deployment',
    metrics: [
      { label: 'Endpoints', value: '1,200+' },
      { label: 'Incidents', value: '0' },
      { label: 'Response', value: '<15 min' },
    ],
    description: 'Deployed Kaspersky Enterprise Security across 1,200+ endpoints, implemented a 24/7 SOC monitoring framework, and established incident response protocols for Ethiopia\'s largest telecom.',
    headerGradient: 'linear-gradient(135deg, #4c1d95 0%, #0A1628 100%)',
    accentColor: '#8B5CF6',
  },
];

const FILTERS = ['All Sectors', 'Banking', 'Government', 'Telecom', 'Education'];

function CaseStudyCard({ study }) {
  const Icon = study.icon;
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      {/* Header image area */}
      <div className="relative h-44 overflow-hidden" style={{ background: study.headerGradient }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        {/* Accent line */}
        <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: study.accentColor }} aria-hidden="true" />
        <div className="relative h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${study.sectorColor}`}>
              {study.sector}
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
              <Icon size={15} className="text-white" aria-hidden="true" />
            </div>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium mb-1">{study.client}</p>
            <h3 className="text-white font-bold text-[14px] leading-snug">{study.headline}</h3>
          </div>
        </div>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        {study.metrics.map((m) => (
          <div key={m.label} className="flex flex-col items-center py-3 px-2 text-center">
            <span className="text-[15px] font-black text-navy-900">{m.value}</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div className="flex items-start gap-2.5">
          <div className="w-0.5 min-h-[36px] rounded-full flex-shrink-0 mt-0.5" style={{ background: study.accentColor }} aria-hidden="true" />
          <p className="text-[12px] font-semibold italic leading-relaxed" style={{ color: study.accentColor }}>
            "{study.outcome}"
          </p>
        </div>
        <p className="text-[13px] text-slate-500 leading-relaxed flex-1">{study.description}</p>
        <a
          href="#contact"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-alta-blue hover:text-navy-900 transition-colors duration-150 mt-auto group-hover:underline underline-offset-2"
          aria-label={`Read full case study: ${study.headline}`}
        >
          Read Full Case Study
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-150" />
        </a>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section-padding bg-slate-50/80" aria-label="Case studies">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="overline-tag mb-3">Proven Results</p>
            <h2 className="section-heading">Real Projects.<br className="hidden sm:block" /> Measurable Results.</h2>
            <p className="section-subheading mt-3">Evidence of 640+ delivered projects across Ethiopia's most critical institutions.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  i === 0
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-alta-blue hover:text-alta-blue'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.headline} study={study} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/case-studies" className="btn-outline inline-flex">
            View All 640+ Projects <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
