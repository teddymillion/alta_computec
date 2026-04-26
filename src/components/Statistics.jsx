import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Briefcase, Building2, Star } from 'lucide-react';

const STATS = [
  {
    value: 30,
    suffix: '+',
    label: 'Years of Operation',
    context: "Serving Ethiopia's most demanding enterprises since 1994",
    icon: TrendingUp,
    iconClass: 'icon-wrap-blue',
    numColor: '#1B4FD8',
    accentFrom: '#1B4FD8',
    accentTo: '#22C55E',
  },
  {
    value: 640,
    suffix: '+',
    label: 'Projects Delivered',
    context: 'Data centres, cloud migrations, ATM networks, and more',
    icon: Briefcase,
    iconClass: 'icon-wrap-green',
    numColor: '#16A34A',
    accentFrom: '#16A34A',
    accentTo: '#0EA5E9',
  },
  {
    value: 470,
    suffix: '+',
    label: 'Enterprise Clients',
    context: 'Banks, ministries, telecoms, universities, and NGOs',
    icon: Building2,
    iconClass: 'icon-wrap-blue',
    numColor: '#1B4FD8',
    accentFrom: '#1B4FD8',
    accentTo: '#6366F1',
  },
  {
    value: null,
    display: '#1',
    label: "Dell Platinum Partner",
    sublabel: "Ethiopia's Only",
    context: 'The highest tier Dell awards — held exclusively by ALTA Computec PLC',
    icon: Star,
    iconClass: 'icon-wrap-amber',
    numColor: '#F59E0B',
    accentFrom: '#F59E0B',
    accentTo: '#FB923C',
    isAmber: true,
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
  const Icon = stat.icon;

  return (
    <div
      className="relative flex flex-col gap-4 p-7 rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group"
      style={{
        boxShadow: stat.isAmber
          ? '0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(245,158,11,0.12), 0 0 20px rgba(245,158,11,0.06)'
          : '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Top accent gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${stat.accentFrom}, ${stat.accentTo})`,
        }}
        aria-hidden="true"
      />

      {/* Number */}
      <div className="flex items-end gap-1">
        <span
          className="text-[52px] font-black leading-none tracking-tight"
          style={{
            color: stat.numColor,
            textShadow: `0 2px 12px ${stat.numColor}33`,
          }}
        >
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
      <div className={`absolute bottom-5 right-5 icon-wrap ${stat.iconClass} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true">
        <Icon size={16} />
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
    <section id="statistics" className="section-padding section-depth-light" aria-label="Company statistics" ref={ref}>
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
        <p className="text-center text-[11px] text-slate-400 mt-8">
          All figures as of 2026. Independently verified.
        </p>
      </div>
    </section>
  );
}
