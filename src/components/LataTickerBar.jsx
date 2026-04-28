const ORIGINS = [
  { name: 'Sidamo',       grade: 'GRADE 1',   gradeColor: '#F59E0B', note: 'Washed & Unwashed' },
  { name: 'Limmu',        grade: 'SPECIALTY', gradeColor: '#D97706', note: 'Ethiopia Washed'    },
  { name: 'Yirgacheffe',  grade: 'GRADE 1',   gradeColor: '#F59E0B', note: 'Washed · Floral'   },
  { name: 'Harrar',       grade: 'NATURAL',   gradeColor: '#B45309', note: 'Dry Processed'      },
  { name: 'Kaffa',        grade: 'FOREST',    gradeColor: '#92400E', note: 'Wild Grown'         },
  { name: 'Guji',         grade: 'MICRO-LOT', gradeColor: '#FBBF24', note: 'High Altitude'      },
  { name: 'Djimmah',      grade: 'ORGANIC',   gradeColor: '#22C55E', note: 'Natural Process'    },
  { name: 'Bench Maji',   grade: 'WASHED',    gradeColor: '#60A5FA', note: 'Single Farm'        },
  { name: 'Gimbi',        grade: 'SPECIALTY', gradeColor: '#D97706', note: 'Western Ethiopia'   },
  { name: 'Bale Mountain',grade: 'WILD',      gradeColor: '#34D399', note: 'Forest Coffee'      },
];

const FACTS = [
  { value: '30+',      label: 'Years of Export Excellence'       },
  { value: '5',        label: 'Export Destination Continents'    },
  { value: '1500m+',   label: 'Average Growing Altitude'         },
  { value: '100%',     label: 'Ethiopian Arabica Coffee'         },
  { value: 'Grade 1',  label: 'Specialty Export Standard'        },
  { value: '1994',     label: 'Founded in Addis Ababa'           },
  { value: '☕',        label: 'Birthplace of Coffee'             },
  { value: 'Washed',   label: 'Precision Wet Processing'         },
  { value: 'Natural',  label: 'Traditional Dry Processing'       },
  { value: 'USA',      label: 'North American Market'            },
  { value: 'Europe',   label: 'Premium European Buyers'          },
  { value: 'Japan',    label: 'Asia-Pacific Distribution'        },
];

const D_ORIGINS = [...ORIGINS, ...ORIGINS];
const D_FACTS   = [...FACTS,   ...FACTS];

export default function LataTickerBar() {
  return (
    <div
      className="relative w-full select-none"
      style={{
        background: 'linear-gradient(180deg, #0e0400 0%, #1a0800 100%)',
        borderTop:    '1px solid rgba(180,83,9,0.35)',
        borderBottom: '1px solid rgba(180,83,9,0.18)',
      }}
      aria-label="LATA Agri Export — coffee origins and achievements"
    >
      <style>{`
        @keyframes lata-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes lata-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .lata-ticker-ltr {
          display: flex;
          width: max-content;
          animation: lata-ltr 52s linear infinite;
          will-change: transform;
        }
        .lata-ticker-rtl {
          display: flex;
          width: max-content;
          animation: lata-rtl 68s linear infinite;
          will-change: transform;
        }
        .lata-ticker-wrap:hover .lata-ticker-ltr,
        .lata-ticker-wrap:hover .lata-ticker-rtl {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top amber glow rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #B45309 15%, #F59E0B 50%, #B45309 85%, transparent 100%)', opacity: 0.8 }}
        aria-hidden="true"
      />

      {/* Left label panel */}
      <div
        className="absolute left-0 inset-y-0 z-20 hidden lg:flex flex-col items-center justify-center gap-0.5 px-3"
        style={{
          width: '108px',
          borderRight: '1px solid rgba(180,83,9,0.25)',
          background: 'linear-gradient(to right, #0e0400 60%, transparent)',
        }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#F59E0B', boxShadow: '0 0 8px #F59E0B, 0 0 18px rgba(245,158,11,0.5)' }}
          />
          <span className="text-[8px] font-black tracking-[0.16em] uppercase" style={{ color: '#F59E0B' }}>Live</span>
        </div>
        <span className="text-[8.5px] font-black tracking-[0.14em] uppercase leading-tight text-center" style={{ color: 'rgba(251,191,36,0.55)' }}>LATA</span>
        <span className="text-[8.5px] font-black tracking-[0.14em] uppercase leading-tight text-center" style={{ color: 'rgba(251,191,36,0.55)' }}>Origins</span>
      </div>

      {/* Right CTA panel */}
      <div
        className="absolute right-0 inset-y-0 z-20 hidden lg:flex items-center justify-center"
        style={{
          width: '108px',
          borderLeft: '1px solid rgba(180,83,9,0.25)',
          background: 'linear-gradient(to left, #0e0400 60%, transparent)',
        }}
      >
        <a
          href="https://coffeelata.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10.5px] font-bold tracking-wide whitespace-nowrap transition-colors duration-150"
          style={{ color: '#F59E0B', textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FDE68A'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#F59E0B'; }}
        >
          coffeelata.com ↗
        </a>
      </div>

      {/* Edge fades — mobile */}
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none lg:hidden"
        style={{ width: '48px', background: 'linear-gradient(to right, #0e0400, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none lg:hidden"
        style={{ width: '48px', background: 'linear-gradient(to left, #0e0400, transparent)' }}
        aria-hidden="true"
      />
      {/* Edge fades — desktop (inside panels) */}
      <div
        className="absolute inset-y-0 left-[108px] z-10 pointer-events-none hidden lg:block"
        style={{ width: '48px', background: 'linear-gradient(to right, #0e0400, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-[108px] z-10 pointer-events-none hidden lg:block"
        style={{ width: '48px', background: 'linear-gradient(to left, #0e0400, transparent)' }}
        aria-hidden="true"
      />

      {/* Scrolling area */}
      <div className="overflow-hidden lata-ticker-wrap lg:px-[108px]">

        {/* Row 1 — Origins, scrolls left → */}
        <div
          className="overflow-hidden flex items-center"
          style={{ height: '42px', borderBottom: '1px solid rgba(180,83,9,0.15)' }}
          aria-hidden="true"
        >
          <div className="lata-ticker-ltr">
            {D_ORIGINS.map((o, i) => (
              <span key={i} className="flex items-center gap-2.5 px-5" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(251,191,36,0.18)', fontSize: '7px' }}>◆</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12.5px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {o.name}
                </span>
                <span style={{
                  fontSize: '8px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '5px',
                  color: o.gradeColor,
                  background: `${o.gradeColor}1C`,
                  border: `1px solid ${o.gradeColor}38`,
                  lineHeight: 1.5,
                }}>
                  {o.grade}
                </span>
                <span style={{ color: 'rgba(251,191,36,0.45)', fontSize: '11px', fontWeight: 400 }}>
                  {o.note}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — Facts, scrolls right ← */}
        <div
          className="overflow-hidden flex items-center"
          style={{ height: '42px' }}
          aria-hidden="true"
        >
          <div className="lata-ticker-rtl">
            {D_FACTS.map((f, i) => (
              <span key={i} className="flex items-center gap-2.5 px-6" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(251,191,36,0.15)', fontSize: '7px' }}>◆</span>
                <span style={{
                  color: '#F59E0B',
                  fontSize: '13px',
                  fontWeight: 900,
                  letterSpacing: '-0.01em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {f.value}
                </span>
                <span style={{ color: 'rgba(251,191,36,0.6)', fontSize: '12px', fontWeight: 500 }}>
                  {f.label}
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
