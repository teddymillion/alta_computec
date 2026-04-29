import { ArrowRight, Server, CreditCard, Cloud, ShieldCheck, Brain, Monitor, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOLUTIONS = [
  {
    icon: Server,
    category: 'Infrastructure',
    title: 'IT Infrastructure & Networking',
    description: 'Enterprise-grade data centers, structured cabling, LAN/WAN design, and server deployment for mission-critical operations.',
    tags: ['Banking', 'Government', 'Telecom'],
    accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)', accentBorder: 'rgba(27,79,216,0.35)',
  },
  {
    icon: CreditCard,
    category: 'Banking Tech',
    title: 'Banking Automation & ATM',
    description: 'End-to-end ATM deployment, cash management systems, and banking automation solutions for Ethiopia\'s financial sector.',
    tags: ['Banking', 'Financial Services'],
    accent: '#0EA5E9', accentLight: 'rgba(14,165,233,0.12)', accentBorder: 'rgba(14,165,233,0.35)',
  },
  {
    icon: Cloud,
    category: 'Cloud',
    title: 'Cloud & Virtualization',
    description: 'Private cloud architecture, VMware virtualization, hybrid cloud migrations, and cloud-native infrastructure design.',
    tags: ['Enterprise', 'Government', 'Education'],
    accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)',
  },
  {
    icon: ShieldCheck,
    category: 'Security',
    title: 'Cybersecurity',
    description: 'Comprehensive security posture management, endpoint protection, network security, and SOC services powered by Kaspersky and Fortinet.',
    tags: ['Banking', 'Telecom', 'Government'],
    accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)', accentBorder: 'rgba(22,163,74,0.35)',
  },
  {
    icon: Brain,
    category: 'Software & AI',
    title: 'Enterprise Software & AI',
    description: 'Oracle ERP implementations, Microsoft enterprise licensing, AI-powered analytics, and custom software integration.',
    tags: ['Enterprise', 'Government'],
    accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)',
  },
  {
    icon: Monitor,
    category: 'Collaboration',
    title: 'Smart Office & Collaboration',
    description: 'SHARP display systems, unified communications, video conferencing, and intelligent workspace technology for modern enterprises.',
    tags: ['Corporate', 'Education', 'Government'],
    accent: '#0EA5E9', accentLight: 'rgba(14,165,233,0.12)', accentBorder: 'rgba(14,165,233,0.35)',
  },
];

function SolutionCard({ solution, index }) {
  const Icon = solution.icon;
  return (
    <article
      className="group relative flex flex-col gap-5 p-6 rounded-2xl overflow-hidden transition-all duration-250 ease-out cursor-default border-2 bg-white dark:bg-navy-900"
      style={{
        borderColor: 'rgba(226,232,240,0.8)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = solution.accent;
        e.currentTarget.style.boxShadow = `0 12px 32px ${solution.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${solution.accentBorder}`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ background: `linear-gradient(90deg, ${solution.accent}, ${solution.accent}88)` }}
        aria-hidden="true"
      />

      {/* Card number */}
      <span className="absolute top-4 right-4 text-[11px] font-black text-slate-200 dark:text-white/10 tabular-nums" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon + category */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-250 group-hover:scale-110"
          style={{ background: solution.accentLight, border: `1px solid ${solution.accentBorder}` }}
        >
          <Icon size={19} style={{ color: solution.accent }} aria-hidden="true" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: solution.accent }}>
          {solution.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 flex-1">
        <h3 className="text-[15px] font-bold text-navy-900 dark:text-white leading-snug group-hover:text-current transition-colors duration-200" style={{ color: solution.accent }}>
          {solution.title}
        </h3>
        <p className="text-[13px] text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-3 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors duration-200">
          {solution.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {solution.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: solution.accentLight, color: solution.accent, border: `1px solid ${solution.accentBorder}` }}>{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#"
        className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 mt-auto group-hover:translate-x-1"
        style={{ color: solution.accent }}
        aria-label={`Explore ${solution.title}`}
      >
        Explore Solution
        <ArrowRight size={13} />
      </a>
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

        {/* ── Software Solutions featured tile ── */}
        <Link
          to="/software-division"
          className="group mt-4 relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-2xl overflow-hidden transition-all duration-250 ease-out"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(27,79,216,0.08) 50%, rgba(34,197,94,0.06) 100%)',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid rgba(99,102,241,0.5)';
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(99,102,241,0.18), 0 0 0 1px rgba(99,102,241,0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid rgba(99,102,241,0.25)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          aria-label="Explore Software & AI Division"
        >
          {/* Animated glow orb */}
          <div
            className="absolute right-0 top-0 w-[300px] h-full rounded-2xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at right, rgba(99,102,241,0.10) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-250"
            style={{ background: 'linear-gradient(90deg, #6366F1, #22C55E)' }}
            aria-hidden="true"
          />

          {/* Icon cluster */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {[Brain, ShieldCheck, Monitor, Sparkles].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-250 group-hover:scale-110"
                style={{
                  background: ['rgba(99,102,241,0.15)', 'rgba(245,158,11,0.12)', 'rgba(14,165,233,0.12)', 'rgba(34,197,94,0.12)'][i],
                  border: `1px solid ${ ['rgba(99,102,241,0.3)', 'rgba(245,158,11,0.25)', 'rgba(14,165,233,0.25)', 'rgba(34,197,94,0.25)'][i]}`,
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                <Icon size={18} style={{ color: ['#818CF8', '#F59E0B', '#0EA5E9', '#22C55E'][i] }} aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(99,102,241,0.15)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.3)' }}
              >
                New Division
              </span>
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: '#818CF8' }}>
                Software, AI &amp; Cybersecurity
              </span>
            </div>
            <h3 className="text-[17px] font-bold text-white leading-snug">
              Software Solutions — AI, ERP, Cybersecurity &amp; More
            </h3>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              Alta Computec now delivers end-to-end software capability alongside hardware. AI as a Service, custom development, database management, and Ethiopia's best ICT training center.
            </p>
          </div>

          {/* CTA arrow */}
          <div
            className="flex items-center gap-2 text-[13px] font-semibold flex-shrink-0 transition-all duration-200 group-hover:translate-x-1"
            style={{ color: '#818CF8' }}
          >
            Explore Division <ArrowRight size={14} />
          </div>
        </Link>

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
