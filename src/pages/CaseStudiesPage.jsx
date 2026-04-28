import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Building2, TrendingUp, Wifi, GraduationCap, ShieldCheck, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const FILTERS = ['All', 'Banking', 'Government', 'Telecom', 'Software', 'Infrastructure', 'Smart Office'];

const CASE_STUDIES = [
  {
    sector: 'Banking', icon: Building2, client: 'Commercial Bank of Ethiopia',
    headline: 'ATM Network Deployment & Core Banking Integration',
    metrics: [{ v: '120+', l: 'ATMs Deployed' }, { v: '99.9%', l: 'Uptime' }, { v: '6 Months', l: 'Delivery' }],
    outcome: 'Nationwide ATM network live with zero downtime during cutover',
    accent: '#3B82F6', accentLight: 'rgba(59,130,246,0.12)', accentBorder: 'rgba(59,130,246,0.35)',
  },
  {
    sector: 'Government', icon: TrendingUp, client: 'Ministry of Finance, Ethiopia',
    headline: 'Nationwide Network Infrastructure Rollout — 47 Offices',
    metrics: [{ v: '47', l: 'Offices Connected' }, { v: '99.7%', l: 'Network Uptime' }, { v: 'A+', l: 'Security Score' }],
    outcome: '47 regional offices connected on secure WAN ahead of schedule',
    accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)',
  },
  {
    sector: 'Infrastructure', icon: GraduationCap, client: 'Addis Ababa University',
    headline: 'Smart Campus — Wi-Fi 6 & Interactive Classroom Rollout',
    metrics: [{ v: '40', l: 'Smart Classrooms' }, { v: '2,000+', l: 'Students Served' }, { v: '3 Months', l: 'Deployment' }],
    outcome: 'Full campus Wi-Fi 6 and SHARP smart classroom deployment completed',
    accent: '#22C55E', accentLight: 'rgba(34,197,94,0.12)', accentBorder: 'rgba(34,197,94,0.35)',
  },
  {
    sector: 'Banking', icon: ShieldCheck, client: 'Awash Bank',
    headline: 'Enterprise Cybersecurity Posture Overhaul',
    metrics: [{ v: '500+', l: 'Endpoints Secured' }, { v: '0', l: 'Post-Deploy Incidents' }, { v: 'Kaspersky Platinum', l: 'Deployed' }],
    outcome: 'Zero critical security incidents in 18 months post-deployment',
    accent: '#0EA5E9', accentLight: 'rgba(14,165,233,0.12)', accentBorder: 'rgba(14,165,233,0.35)',
  },
  {
    sector: 'Software', icon: TrendingUp, client: 'Ethiopian Manufacturing Co.',
    headline: 'Custom Oracle ERP with Ethiopian Tax Compliance Module',
    metrics: [{ v: '40%', l: 'Reporting Reduction' }, { v: 'IFRS', l: 'Compliant' }, { v: '200', l: 'Active Users' }],
    outcome: '40% reduction in financial reporting time with full IFRS compliance',
    accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)',
  },
  {
    sector: 'Smart Office', icon: Monitor, client: 'Regional Enterprise Group',
    headline: 'SHARP Interactive Display Rollout — 25 Offices',
    metrics: [{ v: '25', l: 'Offices Equipped' }, { v: 'SHARP', l: 'Exclusive Partner' }, { v: '3 Months', l: 'Deployment' }],
    outcome: '25 offices equipped with SHARP AQUOS BOARD interactive displays',
    accent: '#8B5CF6', accentLight: 'rgba(139,92,246,0.12)', accentBorder: 'rgba(139,92,246,0.35)',
  },
];

const STATS = [
  { value: 640, suffix: '+', label: 'Projects Delivered', color: 'text-alta-blue' },
  { value: 470, suffix: '+', label: 'Enterprise Clients', color: 'text-alta-green-light' },
  { value: 30, suffix: '+', label: 'Years Experience', color: 'text-alta-blue' },
  { value: 98, suffix: '%', label: 'Client Retention', color: 'text-amber-400' },
];

function useCountUp(target, duration = 900, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || !target) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, animate }) {
  const count = useCountUp(stat.value, 900, animate);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className={`text-[48px] font-black leading-none tracking-tight ${stat.color}`}>{count}{stat.suffix}</span>
      <span className="text-[13px] text-slate-400 font-medium">{stat.label}</span>
    </div>
  );
}

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animate, setAnimate] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimate(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'All' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.sector === activeFilter);

  return (
    <PageLayout>
      <PageHero breadcrumb="Case Studies" title="640+ Projects. Proven Results. Real Impact." subtitle="Explore how ALTA has transformed IT infrastructure for Ethiopia's banks, government institutions, and enterprises." />

      {/* Filter + Featured */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  activeFilter === f ? 'bg-alta-green text-white border-alta-green' : 'bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/20 hover:border-alta-green dark:hover:border-alta-green hover:text-alta-green dark:hover:text-alta-green'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className="group relative p-7 mb-10 rounded-2xl bg-white border-2 transition-all duration-250 hover:-translate-y-1 overflow-hidden" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#22C55E';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(34,197,94,0.25), 0 0 0 1px rgba(34,197,94,0.35)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}>
            <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250" style={{ background: 'linear-gradient(90deg, #22C55E, #22C55E88)' }} aria-hidden="true" />
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Banking</span>
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-alta-green/15 text-alta-green">Featured</span>
            </div>
            <h2 className="text-[22px] font-bold text-navy-900 mb-3 leading-snug">ATM Network Deployment & Integration — Commercial Bank of Ethiopia</h2>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-2"><strong>Challenge:</strong> CBE needed to deploy a nationwide ATM network with zero downtime and full core banking integration.</p>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-6"><strong>Solution:</strong> ALTA designed and deployed a complete Diebold Nixdorf ATM infrastructure with cash management integration, training, and a 24/7 support SLA.</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {[{ v: '120+ ATMs Deployed' }, { v: '99.9% Uptime' }, { v: '6-Month Delivery' }].map((m) => (
                <div key={m.v} className="px-4 py-2.5 rounded-xl bg-navy-900 text-alta-green-light font-bold text-[13px]">{m.v}</div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary inline-flex">
              Read Full Case Study <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((study) => {
              const Icon = study.icon;
              return (
                <a
                  key={study.headline}
                  href="#"
                  onClick={(e) => { e.preventDefault(); }}
                  className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white border-2 transition-all duration-250 hover:-translate-y-1 cursor-pointer overflow-hidden"
                  style={{
                    borderColor: 'rgba(226,232,240,0.8)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = study.accent;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${study.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${study.accentBorder}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                    style={{ background: `linear-gradient(90deg, ${study.accent}, ${study.accent}88)` }}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{ background: study.accentLight, color: study.accent, border: `1px solid ${study.accentBorder}` }}
                    >
                      {study.sector}
                    </span>
                    <Icon size={16} style={{ color: study.accent }} aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold text-navy-900 mb-2 leading-snug">{study.headline}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">{study.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((m) => (
                      <div key={m.l} className="flex flex-col items-center px-2 py-1 rounded-lg" style={{ background: study.accentLight }}>
                        <span className="text-[12px] font-black leading-tight" style={{ color: study.accent }}>{m.v}</span>
                        <span className="text-[9px] text-slate-500 font-medium leading-tight">{m.l}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                    <span className="text-[13px] font-semibold group-hover:text-current transition-colors" style={{ color: study.accent }}>
                      View Details
                    </span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" style={{ color: study.accent }} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative bg-white dark:bg-navy-950" ref={statsRef}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => <StatItem key={s.label} stat={s} animate={animate} />)}
          </div>
        </div>
      </section>

      {/* Process Teaser */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="overline-tag justify-center mb-3">How It Works</p>
            <h2 className="section-heading dark:section-heading-light">How does a typical ALTA project work?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { num: '01', title: 'Scoping', desc: 'We assess your requirements, environment, and objectives in a structured discovery session.' },
              { num: '02', title: 'Delivery', desc: 'Phased deployment with certified engineers, progress reporting, and zero-downtime methodology.' },
              { num: '03', title: 'Support', desc: 'Post-deployment SLA, staff training, and ongoing managed services to ensure long-term success.' },
            ].map((step) => (
              <div key={step.num} className="group relative flex flex-col gap-3 text-center items-center p-5 rounded-2xl bg-white border-2 transition-all duration-250 hover:-translate-y-1 overflow-hidden" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#16A34A';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(22,163,74,0.25), 0 0 0 1px rgba(22,163,74,0.35)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
              }}>
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250" style={{ background: 'linear-gradient(90deg, #16A34A, #16A34A88)' }} aria-hidden="true" />
                <div className="w-12 h-12 rounded-full bg-alta-green flex items-center justify-center group-hover:scale-110 transition-transform duration-250">
                  <span className="text-white font-black text-[13px]">{step.num}</span>
                </div>
                <p className="font-bold text-navy-900 text-[15px]">{step.title}</p>
                <p className="text-[13px] text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/contact" className="btn-primary inline-flex">
              Start Your Project <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
