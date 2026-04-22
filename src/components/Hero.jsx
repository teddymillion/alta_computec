import { ArrowRight, Play, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

const PARTNERS = [
  { name: 'Dell',       img: '/dell.png',        tier: 'Platinum Partner', exclusive: true },
  { name: 'Cisco',      img: '/cisco.png',        tier: 'Premier Partner' },
  { name: 'Oracle',     img: '/oracle.png',       tier: 'Gold Partner' },
  { name: 'HP',         img: '/hp.png',           tier: 'Authorized' },
  { name: 'Microsoft',  img: '/microsoft.png',    tier: 'Partner' },
  { name: 'Kaspersky',  img: '/kaspersky.png',    tier: 'Platinum Partner' },
];

function ServerRackSVG() {
  return (
    <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Outer rings */}
      <circle cx="190" cy="190" r="170" stroke="rgba(27,79,216,0.08)" strokeWidth="1" />
      <circle cx="190" cy="190" r="140" stroke="rgba(27,79,216,0.06)" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="190" cy="190" r="108" stroke="rgba(27,79,216,0.05)" strokeWidth="1" strokeDasharray="2 6" />

      {/* Glow */}
      <circle cx="190" cy="190" r="90" fill="rgba(27,79,216,0.04)" />

      {/* Main server cabinet */}
      <rect x="110" y="90" width="160" height="200" rx="6" fill="#0D1E38" stroke="rgba(27,79,216,0.35)" strokeWidth="1.5" />
      {/* Cabinet top edge highlight */}
      <rect x="110" y="90" width="160" height="3" rx="1.5" fill="rgba(27,79,216,0.4)" />

      {/* Server units */}
      {[0,1,2,3,4,5,6,7,8].map((i) => {
        const y = 100 + i * 20;
        const isGreen = i % 4 === 0;
        return (
          <g key={i}>
            <rect x="118" y={y} width="144" height="15" rx="2" fill="rgba(27,79,216,0.1)" stroke="rgba(27,79,216,0.2)" strokeWidth="0.5" />
            {/* LEDs */}
            <circle cx="128" cy={y + 7.5} r="2.5" fill={isGreen ? '#22C55E' : '#1B4FD8'} opacity="0.9" />
            <circle cx="136" cy={y + 7.5} r="2.5" fill={i % 3 === 0 ? '#22C55E' : '#1B4FD8'} opacity="0.7" />
            {/* Drive bays */}
            <rect x="148" y={y + 3} width="44" height="9" rx="1.5" fill="rgba(27,79,216,0.18)" />
            <rect x="196" y={y + 3} width="44" height="9" rx="1.5" fill="rgba(27,79,216,0.18)" />
            {/* Drive bay dividers */}
            <line x1="170" y1={y + 3} x2="170" y2={y + 12} stroke="rgba(27,79,216,0.3)" strokeWidth="0.5" />
            <line x1="218" y1={y + 3} x2="218" y2={y + 12} stroke="rgba(27,79,216,0.3)" strokeWidth="0.5" />
          </g>
        );
      })}

      {/* Bottom storage unit */}
      <rect x="118" y="285" width="144" height="18" rx="2" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
      <circle cx="128" cy="294" r="3" fill="#22C55E" opacity="0.9" />
      <circle cx="137" cy="294" r="3" fill="#22C55E" opacity="0.7" />
      <rect x="148" y="288" width="100" height="12" rx="2" fill="rgba(34,197,94,0.15)" />

      {/* Connection lines */}
      <line x1="190" y1="90" x2="190" y2="48" stroke="rgba(27,79,216,0.25)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="110" y1="190" x2="60" y2="190" stroke="rgba(27,79,216,0.25)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="270" y1="190" x2="320" y2="190" stroke="rgba(34,197,94,0.25)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="190" y1="290" x2="190" y2="332" stroke="rgba(27,79,216,0.2)" strokeWidth="1" strokeDasharray="3 4" />

      {/* Network nodes */}
      <circle cx="190" cy="42" r="10" fill="rgba(27,79,216,0.15)" stroke="rgba(27,79,216,0.4)" strokeWidth="1.5" />
      <circle cx="190" cy="42" r="4" fill="#1B4FD8" />

      <circle cx="52" cy="190" r="10" fill="rgba(27,79,216,0.15)" stroke="rgba(27,79,216,0.4)" strokeWidth="1.5" />
      <circle cx="52" cy="190" r="4" fill="#1B4FD8" />

      <circle cx="328" cy="190" r="10" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" />
      <circle cx="328" cy="190" r="4" fill="#22C55E" />

      <circle cx="190" cy="338" r="10" fill="rgba(27,79,216,0.12)" stroke="rgba(27,79,216,0.3)" strokeWidth="1.5" />
      <circle cx="190" cy="338" r="4" fill="#1B4FD8" opacity="0.7" />

      {/* Floating metric cards */}
      <g>
        <rect x="14" y="68" width="88" height="44" rx="8" fill="#0D1E38" stroke="rgba(27,79,216,0.4)" strokeWidth="1" />
        <rect x="14" y="68" width="88" height="2" rx="1" fill="rgba(34,197,94,0.6)" />
        <text x="58" y="87" textAnchor="middle" fill="#22C55E" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif">99.9%</text>
        <text x="58" y="102" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="9" fontFamily="Inter, sans-serif">Uptime SLA</text>
      </g>

      <g>
        <rect x="278" y="68" width="88" height="44" rx="8" fill="#0D1E38" stroke="rgba(27,79,216,0.4)" strokeWidth="1" />
        <rect x="278" y="68" width="88" height="2" rx="1" fill="rgba(27,79,216,0.6)" />
        <text x="322" y="87" textAnchor="middle" fill="#60A5FA" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif">640+</text>
        <text x="322" y="102" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="9" fontFamily="Inter, sans-serif">Projects Done</text>
      </g>

      <g>
        <rect x="14" y="268" width="88" height="44" rx="8" fill="#0D1E38" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
        <rect x="14" y="268" width="88" height="2" rx="1" fill="rgba(34,197,94,0.5)" />
        <text x="58" y="287" textAnchor="middle" fill="#22C55E" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif">470+</text>
        <text x="58" y="302" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="9" fontFamily="Inter, sans-serif">Enterprise Clients</text>
      </g>

      <g>
        <rect x="278" y="268" width="88" height="44" rx="8" fill="#0D1E38" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
        <rect x="278" y="268" width="88" height="2" rx="1" fill="rgba(245,158,11,0.5)" />
        <text x="322" y="287" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="800" fontFamily="Inter, sans-serif">30+ Yrs</text>
        <text x="322" y="302" textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="9" fontFamily="Inter, sans-serif">In Operation</text>
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero"
      aria-label="Hero section"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-dot-pattern" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-fine" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[500px] bg-alta-blue/8 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-alta-green/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-alta-indigo/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 lg:gap-16 items-center">

          {/* ── Left: Content ── */}
          <div className="flex flex-col gap-7 lg:gap-8 max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-alta-blue/25 bg-alta-blue/8 backdrop-blur-sm">
                <Award size={11} className="text-alta-blue flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-alta-blue">
                  Ethiopia's #1 Enterprise IT Partner
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/8">
                <span className="text-amber-400 text-[10px] font-black">★</span>
                <span className="text-[11px] font-semibold text-amber-400/90">Dell Platinum Partner</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-[42px] sm:text-[52px] lg:text-[58px] font-black text-white leading-[1.06] tracking-[-0.025em]">
                Power Your Enterprise<br />
                With{' '}
                <span className="text-gradient-green">Africa's Most</span>
                <br />
                <span className="text-gradient-green">Trusted</span>{' '}
                <span className="text-white">IT Partner</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-[17px] text-slate-400 leading-[1.65] max-w-lg">
              640+ projects delivered. 470+ enterprise clients. Ethiopia's only Dell Platinum Partner — serving banks, government ministries, and telecoms since 1994.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#solutions" className="btn-primary text-[15px] px-7 py-3.5">
                Explore Our Solutions
                <ArrowRight size={15} />
              </a>
              <a href="#case-studies" className="btn-secondary text-[15px] px-7 py-3.5">
                <Play size={14} className="fill-current" />
                View Case Studies
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              {[
                { icon: ShieldCheck, text: 'Dell Platinum Partner', color: 'text-alta-green-light' },
                { icon: Users, text: '130+ Engineers', color: 'text-alta-sky' },
                { icon: Award, text: '30+ Years', color: 'text-amber-400' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={14} className={`${color} flex-shrink-0`} aria-hidden="true" />
                  <span className="text-[13px] text-slate-400 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Illustration ── */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-[460px] aspect-square">
              {/* Glow behind illustration */}
              <div className="absolute inset-8 rounded-full bg-alta-blue/10 blur-3xl" aria-hidden="true" />
              <ServerRackSVG />
              {/* Pulse dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-alta-green-light opacity-40 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-alta-green-light/60" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Partner Trust Bar ── */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-white/8">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-600 mb-7 text-center">
            Official Technology Partnerships
          </p>
          <div className="flex items-start justify-center gap-6 sm:gap-10 lg:gap-14 flex-wrap">
            {PARTNERS.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1.5 group cursor-default">
                <div className="h-7 flex items-center justify-center">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={`${p.name} logo`}
                      className="max-h-7 max-w-[72px] object-contain brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity duration-200"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-white/50 font-bold text-[13px] tracking-wide group-hover:text-white/80 transition-colors duration-200">
                      {p.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {p.exclusive && (
                    <span className="text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                      Exclusive
                    </span>
                  )}
                  <span className="text-[10px] text-slate-600 font-medium">{p.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50/8 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
