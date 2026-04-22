import { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const STATS = [
  {
    value: 30,
    suffix: '+',
    label: 'Years of Operation',
    context: 'From a single Addis Ababa office to Ethiopia\'s premier IT institution',
    accent: 'from-alta-blue to-alta-sky',
    iconBg: 'bg-blue-50',
    iconColor: 'text-alta-blue',
    numColor: 'text-alta-blue',
  },
  {
    value: 640,
    suffix: '+',
    label: 'Projects Delivered',
    context: 'Data centers, cloud migrations, banking automation, and more',
    accent: 'from-alta-green to-alta-sky',
    iconBg: 'bg-green-50',
    iconColor: 'text-alta-green',
    numColor: 'text-alta-green',
  },
  {
    value: 470,
    suffix: '+',
    label: 'Enterprise Clients',
    context: 'Banks, government ministries, telecoms, and universities',
    accent: 'from-alta-blue to-alta-indigo',
    iconBg: 'bg-blue-50',
    iconColor: 'text-alta-blue',
    numColor: 'text-alta-blue',
  },
  {
    value: null,
    display: '#1',
    label: "Dell Platinum Partner",
    sublabel: "Ethiopia's Only",
    context: 'The highest tier Dell awards — held exclusively by ALTA Computec PLC',
    accent: 'from-amber-400 to-orange-400',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    numColor: 'text-amber-500',
  },
];

function useCountUp(target, duration = 900, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === null) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, animate, index }) {
  const count = useCountUp(stat.value, 900, animate);

  return (
    <div
      className="relative flex flex-col gap-4 p-7 rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Top accent gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.accent} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

      {/* Number */}
      <div className="flex items-end gap-1">
        <span className={`text-[52px] font-black leading-none tracking-tight ${stat.numColor}`}>
          {stat.display ? stat.display : `${count}${stat.suffix}`}
        </span>
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        {stat.sublabel && (
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-amber-500">{stat.sublabel}</span>
        )}
        <p className="text-[15px] font-bold text-navy-900 leading-tight">{stat.label}</p>
        <p className="text-[13px] text-slate-500 leading-relaxed">{stat.context}</p>
      </div>

      {/* Bottom right icon */}
      <div className={`absolute bottom-5 right-5 w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true">
        <TrendingUp size={16} className={stat.iconColor} />
      </div>
    </div>
  );
}

export default function Statistics() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="statistics" className="section-padding bg-slate-50/80" aria-label="Company statistics" ref={ref}>
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="overline-tag justify-center mb-3">By The Numbers</p>
          <h2 className="section-heading">30 Years of Measurable Impact</h2>
          <p className="section-subheading mx-auto text-center">
            Every number represents a client served, a project delivered, and a partnership earned.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} animate={animate} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
