const TIER1 = [
  {
    name: 'Dell',
    img: '/dell.png',
    tier: 'Platinum Partner',
    badge: 'tier-platinum',
    note: "Ethiopia's Only",
    fallback: 'DE',
    fallbackBg: 'from-blue-600 to-blue-800',
    glow: 'rgba(37,99,235,0.15)',
    accentFrom: '#2563EB',
    accentTo: '#1D4ED8',
  },
  {
    name: 'Cisco',
    img: '/cisco.png',
    tier: 'Premier Partner',
    badge: 'tier-premier',
    note: 'Certified',
    fallback: 'CS',
    fallbackBg: 'from-sky-600 to-sky-800',
    glow: 'rgba(2,132,199,0.15)',
    accentFrom: '#0284C7',
    accentTo: '#0369A1',
  },
  {
    name: 'Oracle',
    img: '/oracle.png',
    tier: 'Gold Partner',
    badge: 'tier-gold',
    note: 'Certified',
    fallback: 'OR',
    fallbackBg: 'from-red-600 to-red-800',
    glow: 'rgba(220,38,38,0.12)',
    accentFrom: '#DC2626',
    accentTo: '#B91C1C',
  },
  {
    name: 'Kaspersky',
    img: '/kaspersky.png',
    tier: 'Platinum Partner',
    badge: 'tier-platinum',
    note: 'Certified',
    fallback: 'KS',
    fallbackBg: 'from-green-600 to-green-800',
    glow: 'rgba(22,163,74,0.15)',
    accentFrom: '#16A34A',
    accentTo: '#15803D',
  },
];

const TIER2 = [
  { name: 'IBM',           img: '/ibm.png' },
  { name: 'Microsoft',     img: '/microsoft.png' },
  { name: 'HP',            img: '/hp.png' },
  { name: 'Huawei',        img: '/huawei.jpg' },
  { name: 'Fortinet',      img: '/fortinet.png' },
  { name: 'Lenovo',        img: '/lenovo.png' },
  { name: 'Eaton',         img: '/eaton.png' },
  { name: 'Vertiv',        img: '/vertive.png' },
  { name: 'SHARP',         img: '/sharp.png',    exclusive: true },
  { name: 'Diebold Nixdorf', img: '/diebold.png' },
  { name: 'Jabra',         img: '/jabra.png' },
  { name: 'Poly',          img: '/poly.png' },
  { name: 'Epson',         img: '/epson.png' },
  { name: 'Backbase',      img: '/backbase.png' },
  { name: 'Symantec',      img: '/symante.png' },
];

function PartnerLogo({ img, name, fallback, fallbackBg = 'from-slate-500 to-slate-700', size = 'md' }) {
  const dim = size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  if (img) {
    return (
      <img
        src={img}
        alt={`${name} logo`}
        className={`${dim} object-contain`}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
      />
    );
  }
  return (
    <div className={`${dim} rounded-xl bg-gradient-to-br ${fallbackBg} flex items-center justify-center`}>
      <span className="text-white font-black text-sm">{fallback || name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}

function Tier1Card({ p }) {
  return (
    <div
      className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 transition-all duration-250 ease-out hover:-translate-y-1 cursor-default overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px ${p.glow}, 0 4px 8px rgba(0,0,0,0.06)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-250"
        style={{ background: `linear-gradient(90deg, ${p.accentFrom}, ${p.accentTo})` }}
        aria-hidden="true"
      />

      {/* Logo */}
      <div className="w-20 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-250">
        {p.img ? (
          <img
            src={p.img}
            alt={`${p.name} logo`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.fallbackBg} flex items-center justify-center shadow-md`}>
            <span className="text-white font-black text-lg">{p.fallback}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-bold text-navy-900 text-[14px]">{p.name}</span>
        <span className={`tier-badge ${p.badge}`}>{p.tier}</span>
        {p.note && <span className="text-[10px] text-slate-400 font-medium">{p.note}</span>}
      </div>
    </div>
  );
}

function Tier2Item({ p }) {
  return (
    <div className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-default">
      <div className="w-12 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        {p.img ? (
          <img
            src={p.img}
            alt={`${p.name} logo`}
            className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-200"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="text-slate-500 font-bold text-[11px]">{(p.fallback || p.name).slice(0, 3).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-[12px] font-semibold text-slate-700">{p.name}</span>
        {p.exclusive && (
          <span className="text-[9px] font-bold tracking-wider uppercase text-amber-600">Exclusive Ethiopia</span>
        )}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners" className="section-padding bg-white" aria-label="Technology partners">
      <div className="section-container">

        <div className="text-center mb-14">
          <p className="overline-tag justify-center mb-3">Official Certifications</p>
          <h2 className="section-heading">
            Backed by the World's Leading<br className="hidden sm:block" /> Technology Brands
          </h2>
          <p className="section-subheading mx-auto text-center">
            Official certifications earned through demonstrated expertise and client outcomes — not just reseller agreements.
          </p>
        </div>

        {/* Tier 1 */}
        <div className="mb-12">
          <div className="divider-label mb-7">
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 whitespace-nowrap">
              Platinum & Premier Partners
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TIER1.map((p) => <Tier1Card key={p.name} p={p} />)}
          </div>
        </div>

        {/* Tier 2 */}
        <div className="mb-10">
          <div className="divider-label mb-6">
            <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 whitespace-nowrap">
              Authorized Partners
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-1">
            {TIER2.map((p) => <Tier2Item key={p.name} p={p} />)}
          </div>
        </div>

        {/* Dell exclusive callout */}
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 border border-navy-800 p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
          <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
            <span className="text-amber-400 font-black text-xl leading-none">★</span>
          </div>
          <div className="relative text-center sm:text-left">
            <p className="text-white font-bold text-[15px] mb-1">Ethiopia's Only Dell Platinum Partner</p>
            <p className="text-slate-400 text-[13px] leading-relaxed max-w-2xl">
              The highest tier in Dell's global partner program — exclusively held by ALTA Computec PLC. No other company in Ethiopia holds this designation. This means direct access to Dell's top-tier engineering support, pricing, and product roadmap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
