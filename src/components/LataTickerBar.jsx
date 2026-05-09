import { useEffect, useRef } from 'react';

const ORIGINS = [
  { name: 'Sidamo',        grade: 'GRADE 1',   gradeColor: '#F59E0B', note: 'Washed & Unwashed' },
  { name: 'Limmu',         grade: 'SPECIALTY', gradeColor: '#D97706', note: 'Ethiopia Washed'    },
  { name: 'Yirgacheffe',   grade: 'GRADE 1',   gradeColor: '#F59E0B', note: 'Washed · Floral'   },
  { name: 'Harrar',        grade: 'NATURAL',   gradeColor: '#B45309', note: 'Dry Processed'      },
  { name: 'Kaffa',         grade: 'FOREST',    gradeColor: '#92400E', note: 'Wild Grown'         },
  { name: 'Guji',          grade: 'MICRO-LOT', gradeColor: '#FBBF24', note: 'High Altitude'      },
  { name: 'Djimmah',       grade: 'ORGANIC',   gradeColor: '#22C55E', note: 'Natural Process'    },
  { name: 'Bench Maji',    grade: 'WASHED',    gradeColor: '#60A5FA', note: 'Single Farm'        },
  { name: 'Gimbi',         grade: 'SPECIALTY', gradeColor: '#D97706', note: 'Western Ethiopia'   },
  { name: 'Bale Mountain', grade: 'WILD',      gradeColor: '#34D399', note: 'Forest Coffee'      },
];

const FACTS = [
  { value: '30+',      label: 'Years of Export Excellence'    },
  { value: '5',        label: 'Export Destination Continents' },
  { value: '1500m+',   label: 'Average Growing Altitude'      },
  { value: '100%',     label: 'Ethiopian Arabica Coffee'      },
  { value: 'Grade 1',  label: 'Specialty Export Standard'     },
  { value: '1994',     label: 'Founded in Addis Ababa'        },
  { value: '☕',        label: 'Birthplace of Coffee'          },
  { value: 'Washed',   label: 'Precision Wet Processing'      },
  { value: 'Natural',  label: 'Traditional Dry Processing'    },
  { value: 'USA',      label: 'North American Market'         },
  { value: 'Europe',   label: 'Premium European Buyers'       },
  { value: 'Japan',    label: 'Asia-Pacific Distribution'     },
];

function useTicker(ref, speed, direction = 1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = direction === 1 ? 0 : -(el.scrollWidth / 2);
    let raf;
    const step = () => {
      x -= speed * direction;
      const half = el.scrollWidth / 2;
      if (direction === 1 && x <= -half) x = 0;
      if (direction === -1 && x >= 0) x = -half;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [ref, speed, direction]);
}

export default function LataTickerBar() {
  const row1 = useRef(null);
  const row2 = useRef(null);

  useTicker(row1, 0.4, 1);
  useTicker(row2, 0.3, -1);

  const D_ORIGINS = [...ORIGINS, ...ORIGINS];
  const D_FACTS   = [...FACTS,   ...FACTS];

  return (
    <div
      className="relative w-full select-none overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0e0400 0%, #1a0800 100%)',
        borderTop:    '1px solid rgba(180,83,9,0.35)',
        borderBottom: '1px solid rgba(180,83,9,0.18)',
      }}
      aria-label="LATA Agri Export — coffee origins and achievements"
    >
      {/* Top amber glow rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #B45309 15%, #F59E0B 50%, #B45309 85%, transparent 100%)', opacity: 0.8 }}
        aria-hidden="true"
      />

      {/* Left label panel — desktop only */}
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
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#F59E0B', boxShadow: '0 0 8px #F59E0B' }} />
          <span className="text-[8px] font-black tracking-[0.16em] uppercase" style={{ color: '#F59E0B' }}>Live</span>
        </div>
        <span className="text-[8.5px] font-black tracking-[0.14em] uppercase leading-tight text-center" style={{ color: 'rgba(251,191,36,0.55)' }}>LATA</span>
        <span className="text-[8.5px] font-black tracking-[0.14em] uppercase leading-tight text-center" style={{ color: 'rgba(251,191,36,0.55)' }}>Origins</span>
      </div>

      {/* Right CTA panel — desktop only */}
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
          className="flex items-center gap-1 text-[10.5px] font-bold tracking-wide whitespace-nowrap"
          style={{ color: '#F59E0B' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FDE68A'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#F59E0B'; }}
        >
          coffeelata.com ↗
        </a>
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 z-10 pointer-events-none lg:hidden" style={{ width: '40px', background: 'linear-gradient(to right, #0e0400, transparent)' }} aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 z-10 pointer-events-none lg:hidden" style={{ width: '40px', background: 'linear-gradient(to left, #0e0400, transparent)' }} aria-hidden="true" />
      <div className="absolute inset-y-0 left-[108px] z-10 pointer-events-none hidden lg:block" style={{ width: '48px', background: 'linear-gradient(to right, #0e0400, transparent)' }} aria-hidden="true" />
      <div className="absolute inset-y-0 right-[108px] z-10 pointer-events-none hidden lg:block" style={{ width: '48px', background: 'linear-gradient(to left, #0e0400, transparent)' }} aria-hidden="true" />

      {/* Scrolling rows */}
      <div className="lg:px-[108px]">

        {/* Row 1 — Origins */}
        <div className="overflow-hidden" style={{ height: '42px', borderBottom: '1px solid rgba(180,83,9,0.15)' }} aria-hidden="true">
          <div ref={row1} className="flex items-center h-full" style={{ width: 'max-content' }}>
            {D_ORIGINS.map((o, i) => (
              <span key={i} className="flex items-center gap-2.5 px-5" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(251,191,36,0.18)', fontSize: '7px' }}>◆</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12.5px', fontWeight: 600 }}>{o.name}</span>
                <span style={{
                  fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '2px 6px', borderRadius: '5px', lineHeight: 1.5,
                  color: o.gradeColor, background: `${o.gradeColor}1C`, border: `1px solid ${o.gradeColor}38`,
                }}>{o.grade}</span>
                <span style={{ color: 'rgba(251,191,36,0.45)', fontSize: '11px', fontWeight: 400 }}>{o.note}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — Facts */}
        <div className="overflow-hidden" style={{ height: '42px' }} aria-hidden="true">
          <div ref={row2} className="flex items-center h-full" style={{ width: 'max-content' }}>
            {D_FACTS.map((f, i) => (
              <span key={i} className="flex items-center gap-2.5 px-6" style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(251,191,36,0.15)', fontSize: '7px' }}>◆</span>
                <span style={{ color: '#F59E0B', fontSize: '13px', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>{f.value}</span>
                <span style={{ color: 'rgba(251,191,36,0.6)', fontSize: '12px', fontWeight: 500 }}>{f.label}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
