import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PARTNERS = [
  { name: 'Dell Technologies',  tier: 'PLATINUM',   tierColor: '#F59E0B' },
  { name: 'Cisco Systems',      tier: 'PREMIER',     tierColor: '#38BDF8' },
  { name: 'Oracle Corporation', tier: 'GOLD',        tierColor: '#F59E0B' },
  { name: 'Kaspersky',          tier: 'PLATINUM',    tierColor: '#22C55E' },
  { name: 'Microsoft',          tier: 'CERTIFIED',   tierColor: '#818CF8' },
  { name: 'HP Enterprise',      tier: 'ENTERPRISE',  tierColor: '#A78BFA' },
  { name: 'Fortinet',           tier: 'PARTNER',     tierColor: '#34D399' },
  { name: 'IBM',                tier: 'BUSINESS',    tierColor: '#60A5FA' },
  { name: 'Huawei Enterprise',  tier: 'ENTERPRISE',  tierColor: '#34D399' },
  { name: 'Lenovo',             tier: 'GOLD',        tierColor: '#F59E0B' },
  { name: 'Eaton Power',        tier: 'PARTNER',     tierColor: '#C084FC' },
  { name: 'Vertiv',             tier: 'CERTIFIED',   tierColor: '#60A5FA' },
  { name: 'Sharp',              tier: 'AUTHORIZED',  tierColor: '#F87171' },
  { name: 'Jabra',              tier: 'PARTNER',     tierColor: '#34D399' },
];

const ACHIEVEMENTS = [
  { value: '640+',     label: 'Enterprise Projects Delivered'        },
  { value: '470+',     label: 'Enterprise Clients Served'            },
  { value: '30+',      label: 'Years of IT Excellence in Ethiopia'   },
  { value: '130+',     label: 'Certified Engineers On-Staff'         },
  { value: '$25M+',    label: 'Annual Revenue'                       },
  { value: '#1',       label: "Ethiopia's Top Enterprise IT Partner" },
  { value: '1994',     label: 'Founded in Addis Ababa'               },
  { value: '24 / 7',   label: 'Enterprise Support Coverage'          },
  { value: '99.9%',    label: 'Uptime SLA Guarantee'                 },
  { value: '10+',      label: 'Global Technology Brands'             },
  { value: 'ISO 9001', label: 'Quality Management Certified'         },
  { value: 'WCAG 2.1', label: 'Accessibility AA Compliant'          },
];

const D_PARTNERS    = [...PARTNERS,      ...PARTNERS];
const D_ACHIEVEMENTS = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

export default function TickerBar() {
  return (
    <div
      className="relative w-full select-none"
      style={{
        background: 'linear-gradient(180deg, #020709 0%, #060D1A 100%)',
        borderTop:    '1px solid rgba(27,79,216,0.22)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
      aria-label="Partner network and company achievements"
    >
      <style>{`
        @keyframes alta-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes alta-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .alta-ticker-ltr {
          display: flex;
          width: max-content;
          animation: alta-ltr 55s linear infinite;
          will-change: transform;
        }
        .alta-ticker-rtl {
          display: flex;
          width: max-content;
          animation: alta-rtl 72s linear infinite;
          will-change: transform;
        }
        .alta-ticker-wrap:hover .alta-ticker-ltr,
        .alta-ticker-wrap:hover .alta-ticker-rtl {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top glow rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #1B4FD8 20%, #22C55E 80%, transparent 100%)', opacity: 0.65 }}
        aria-hidden="true"
      />

      {/* Left label panel */}
      <div
        className="absolute left-0 inset-y-0 z-20 hidden lg:flex flex-col items-center justify-center gap-0.5 px-3"
        style={{
          width: '108px',
          borderRight: '1px solid rgba(27,79,216,0.14)',
          background: 'linear-gradient(to right, #020709 60%, transparent)',
        }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#22C55E', boxShadow: '0 0 8px #22C55E, 0 0 16px rgba(34,197,94,0.4)' }}
          />
          <span className="text-[8px] font-black tracking-[0.16em] uppercase text-slate-500">Live</span>
        </div>
        <span className="text-[8.5px] font-black tracking-[0.14em] uppercase text-slate-600 leading-tight text-center">Partner</span>
        <span className="text-[8.5px] font-black tracking-[0.14em] uppercase text-slate-600 leading-tight text-center">Network</span>
      </div>

      {/* Right CTA panel */}
      <div
        className="absolute right-0 inset-y-0 z-20 hidden lg:flex items-center justify-center"
        style={{
          width: '108px',
          borderLeft: '1px solid rgba(27,79,216,0.14)',
          background: 'linear-gradient(to left, #020709 60%, transparent)',
        }}
      >
        <Link
          to="/contact"
          className="flex items-center gap-1 text-[10.5px] font-bold tracking-wide transition-colors duration-150 whitespace-nowrap"
          style={{ color: '#60A5FA', textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#60A5FA'; }}
        >
          Get a Quote <ArrowRight size={9} />
        </Link>
      </div>

      {/* Left + right edge fade overlays */}
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none lg:hidden"
        style={{ width: '48px', background: 'linear-gradient(to right, #020709, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-[108px] z-10 pointer-events-none hidden lg:block"
        style={{ width: '48px', background: 'linear-gradient(to right, #020709, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none lg:hidden"
        style={{ width: '48px', background: 'linear-gradient(to left, #020709, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-[108px] z-10 pointer-events-none hidden lg:block"
        style={{ width: '48px', background: 'linear-gradient(to left, #020709, transparent)' }}
        aria-hidden="true"
      />

      {/* Scrolling area */}
      <div className="overflow-hidden alta-ticker-wrap lg:px-[108px]">

        {/* Row 1 — Partners, scrolls left → */}
        <div
          className="overflow-hidden flex items-center"
          style={{ height: '42px', borderBottom: '1px solid rgba(255,255,255,0.045)' }}
          aria-hidden="true"
        >
          <div className="alta-ticker-ltr">
            {D_PARTNERS.map((p, i) => (
              <span key={i} className="flex items-center gap-2.5 px-5" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(255,255,255,0.13)', fontSize: '7px' }}>◆</span>
                <span style={{ color: 'rgba(255,255,255,0.84)', fontSize: '12.5px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {p.name}
                </span>
                <span style={{
                  fontSize: '8px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '5px',
                  color: p.tierColor,
                  background: `${p.tierColor}1C`,
                  border: `1px solid ${p.tierColor}38`,
                  lineHeight: 1.5,
                }}>
                  {p.tier}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — Achievements, scrolls right ← */}
        <div
          className="overflow-hidden flex items-center"
          style={{ height: '42px' }}
          aria-hidden="true"
        >
          <div className="alta-ticker-rtl">
            {D_ACHIEVEMENTS.map((a, i) => (
              <span key={i} className="flex items-center gap-2.5 px-6" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '7px' }}>◆</span>
                <span style={{
                  color: '#60A5FA',
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '-0.015em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {a.value}
                </span>
                <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 500 }}>
                  {a.label}
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
