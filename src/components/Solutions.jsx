import { ArrowRight, Server, CreditCard, Cloud, ShieldCheck, Brain, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOLUTIONS = [
  {
    icon: Server,
    category: 'Infrastructure',
    title: 'IT Infrastructure & Networking',
    description: 'Enterprise-grade data centers, structured cabling, LAN/WAN design, and server deployment for mission-critical operations.',
    tags: ['Banking', 'Government', 'Telecom'],
    accentColor: 'rgba(27,79,216,0.6)',
    iconBg: 'rgba(27,79,216,0.12)',
    iconBorder: 'rgba(27,79,216,0.2)',
  },
  {
    icon: CreditCard,
    category: 'Banking Tech',
    title: 'Banking Automation & ATM',
    description: 'End-to-end ATM deployment, cash management systems, and banking automation solutions for Ethiopia\'s financial sector.',
    tags: ['Banking', 'Financial Services'],
    accentColor: 'rgba(14,165,233,0.6)',
    iconBg: 'rgba(14,165,233,0.12)',
    iconBorder: 'rgba(14,165,233,0.2)',
  },
  {
    icon: Cloud,
    category: 'Cloud',
    title: 'Cloud & Virtualization',
    description: 'Private cloud architecture, VMware virtualization, hybrid cloud migrations, and cloud-native infrastructure design.',
    tags: ['Enterprise', 'Government', 'Education'],
    accentColor: 'rgba(99,102,241,0.6)',
    iconBg: 'rgba(99,102,241,0.12)',
    iconBorder: 'rgba(99,102,241,0.2)',
  },
  {
    icon: ShieldCheck,
    category: 'Security',
    title: 'Cybersecurity',
    description: 'Comprehensive security posture management, endpoint protection, network security, and SOC services powered by Kaspersky and Fortinet.',
    tags: ['Banking', 'Telecom', 'Government'],
    accentColor: 'rgba(22,163,74,0.6)',
    iconBg: 'rgba(22,163,74,0.12)',
    iconBorder: 'rgba(22,163,74,0.2)',
  },
  {
    icon: Brain,
    category: 'Software & AI',
    title: 'Enterprise Software & AI',
    description: 'Oracle ERP implementations, Microsoft enterprise licensing, AI-powered analytics, and custom software integration.',
    tags: ['Enterprise', 'Government'],
    accentColor: 'rgba(245,158,11,0.6)',
    iconBg: 'rgba(245,158,11,0.1)',
    iconBorder: 'rgba(245,158,11,0.2)',
  },
  {
    icon: Monitor,
    category: 'Collaboration',
    title: 'Smart Office & Collaboration',
    description: 'SHARP display systems, unified communications, video conferencing, and intelligent workspace technology for modern enterprises.',
    tags: ['Corporate', 'Education', 'Government'],
    accentColor: 'rgba(14,165,233,0.6)',
    iconBg: 'rgba(14,165,233,0.1)',
    iconBorder: 'rgba(14,165,233,0.2)',
  },
];

function SolutionCard({ solution, index }) {
  const Icon = solution.icon;
  return (
    <article
      className="group relative flex flex-col gap-5 p-6 rounded-2xl overflow-hidden transition-all duration-250 ease-out cursor-default"
      style={{
        background: 'rgba(13, 30, 56, 0.6)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(18, 36, 68, 0.8)';
        e.currentTarget.style.borderColor = `${solution.accentColor.replace('0.6', '0.3')}`;
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(13, 30, 56, 0.6)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Card number */}
      <span className="absolute top-4 right-4 text-[11px] font-black text-white/10 tabular-nums" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ background: 'linear-gradient(180deg, #1B4FD8, #22C55E)' }}
        aria-hidden="true"
      />

      {/* Icon + category */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-250 group-hover:scale-110"
          style={{ background: solution.iconBg, border: `1px solid ${solution.iconBorder}` }}
        >
          <Icon size={19} style={{ color: solution.accentColor.replace('0.6', '1') }} aria-hidden="true" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">
          {solution.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 flex-1">
        <h3 className="text-[15px] font-bold text-white leading-snug group-hover:text-white transition-colors duration-200">
          {solution.title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-3 group-hover:text-slate-400 transition-colors duration-200">
          {solution.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {solution.tags.map((tag) => (
          <span key={tag} className="industry-tag">{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/solutions"
        className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 group-hover:text-white transition-all duration-200 mt-auto"
        aria-label={`Explore ${solution.title}`}
      >
        Explore Solution
        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </article>
  );
}

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}
      aria-label="Solutions showcase"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-50" aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="overline-tag text-alta-blue mb-4">What We Build</p>
            <h2 className="section-heading-light">
              Solutions Built for<br />Enterprise Scale
            </h2>
            <p className="section-subheading-light mt-3">
              From infrastructure to intelligence — every solution engineered for Ethiopia's most demanding institutions.
            </p>
            <p className="text-[13px] text-slate-500 mt-4">
              Delivering across 6 solution domains to 470+ enterprise clients.
            </p>
          </div>
          <Link to="/contact" className="btn-primary flex-shrink-0 self-start lg:self-auto">
            Request a Proposal <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOLUTIONS.map((solution, i) => (
            <SolutionCard key={solution.title} solution={solution} index={i} />
          ))}
        </div>

        {/* Bottom trust note */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/6">
          {[
            'All solutions delivered by certified in-house engineers',
            'No subcontracting — full accountability',
            'Post-deployment support included',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-slate-500 text-[13px]">
              <div className="w-1 h-1 rounded-full bg-alta-green-light flex-shrink-0" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
