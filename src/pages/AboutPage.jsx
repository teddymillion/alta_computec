import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Trophy, Shield, Layers, Users, Building2, Globe, ShieldCheck, Star, Zap, Handshake, MapPin, TrendingUp, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import CTABanner from '../components/CTABanner';
import PartnerLogo from '../components/PartnerLogo';

const MILESTONES = [
  { year: '1994', label: 'Founded', detail: 'Established in Addis Ababa with ETB 100,000 capital', active: false },
  { year: '2000', label: 'First Banking Client', detail: 'First major banking infrastructure deployment', active: false },
  { year: '2005', label: 'Dell Authorized', detail: 'Became an authorized Dell partner', active: false },
  { year: '2010', label: 'Cisco Premier', detail: 'Achieved Cisco Premier Partner status', active: false },
  { year: '2015', label: '100+ Clients', detail: 'Surpassed 100 enterprise clients milestone', active: false },
  { year: '2020', label: 'Oracle Gold', detail: 'Awarded Oracle Gold Partner designation', active: false },
  { year: '2024', label: 'Dell Platinum', detail: "Ethiopia's first and only Dell Platinum Partner", active: false },
  { year: '2026', label: 'USD $25M Revenue', detail: '470+ clients, 640+ projects, 130+ engineers', active: true },
];

const DIFFERENTIATORS = [
  { title: "Ethiopia's Only Dell Platinum Partner", body: "The highest tier in Dell's global partner program — awarded exclusively to ALTA Computec PLC in Ethiopia. No competitor holds this designation.", accent: 'text-amber-500', dot: 'bg-amber-400' },
  { title: '30 Years of Uninterrupted Operation', body: 'Continuous operation since 1994 — through every phase of Ethiopia\'s technology evolution. No other Ethiopian IT company matches this track record.', accent: 'text-alta-blue', dot: 'bg-alta-blue' },
  { title: '470+ Enterprise Clients Across All Sectors', body: 'Banks, government ministries, telecoms, universities, and energy companies trust ALTA for their most critical infrastructure.', accent: 'text-alta-indigo', dot: 'bg-alta-indigo' },
  { title: 'End-to-End IT Partner — No Subcontracting', body: 'From hardware procurement to software development, deployment, and 24/7 support — all delivered by our 130+ in-house certified engineers.', accent: 'text-amber-500', dot: 'bg-amber-400' },
];

const DIFFERENTIATOR_CARDS = [
  { icon: Trophy, title: "Ethiopia's Only Dell Platinum Partner", desc: "The highest tier in Dell's global partner program. No other Ethiopian company holds this status.", accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)' },
  { icon: Shield, title: '30-Year Local Track Record', desc: 'Continuous operation since 1994 — through every phase of Ethiopia\'s technology evolution.', accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)', accentBorder: 'rgba(22,163,74,0.35)' },
  { icon: Layers, title: 'End-to-End IT Partnership', desc: 'From hardware procurement to software, deployment, and 24/7 support — all under one roof.', accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)', accentBorder: 'rgba(27,79,216,0.35)' },
  { icon: Users, title: '130+ Certified Engineers', desc: 'Dell, Cisco, Oracle, and Kaspersky certified professionals on staff — no subcontracting.', accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)' },
  { icon: Building2, title: 'Government & Banking Trust', desc: "Trusted by Ethiopia's banks, ministries, and telecoms for mission-critical infrastructure.", accent: '#0EA5E9', accentLight: 'rgba(14,165,233,0.12)', accentBorder: 'rgba(14,165,233,0.35)' },
  { icon: Globe, title: 'Global Brands, Local Service', desc: 'International vendor partnerships with on-the-ground Addis Ababa support and response.', accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)' },
];

const TEAM = [
  { name: 'Abduilkader Abdella', title: 'Managing Director', initials: 'AA' },
  { name: 'Cherinet G/Giorgis', title: 'General Manager', initials: 'CG' },
  { name: 'Kirubel Gebrehiwot', title: 'Software, AI and Cybersecurity Division Head', initials: 'KG' },
  { name: 'Araya Belete', title: 'Business Strategy & Development Division Head', initials: 'AB' },
  { name: 'Ashenafi Kebede', title: 'Human Resource Department Manager', initials: 'AK' },
  { name: 'Getachew Mulatu', title: 'Import and Logistics Manager', initials: 'GM' },
  { name: 'Lueye Abdulkadir', title: 'Mgr., Business Strategy & Development', initials: 'LA' },
   { name: 'Amir Abdulkadir', title: 'Consultant-Business Process Optimization', initials: 'AM' },
];

const VALUES = [
  { icon: ShieldCheck, name: 'Integrity', desc: 'We deliver on every promise to every client.', color: 'bg-alta-blue/15 text-alta-blue' },
  { icon: Star, name: 'Excellence', desc: 'World-class standards in every project we touch.', color: 'bg-alta-green/15 text-alta-green' },
  { icon: Zap, name: 'Innovation', desc: 'Continuously adopting emerging technologies for Ethiopian enterprises.', color: 'bg-alta-indigo/15 text-alta-indigo' },
  { icon: Handshake, name: 'Partnership', desc: 'Long-term relationships, not transactional contracts.', color: 'bg-amber-500/15 text-amber-400' },
  { icon: MapPin, name: 'Local Impact', desc: "Committed to Ethiopia's digital and economic growth.", color: 'bg-alta-sky/15 text-alta-sky' },
  { icon: TrendingUp, name: 'Long-Term Thinking', desc: 'Building infrastructure that scales for the next 30 years.', color: 'bg-alta-green/15 text-alta-green' },
];

const STATS = [
  { value: 30, suffix: '+', label: 'Years of Operation', color: 'text-alta-blue' },
  { value: 640, suffix: '+', label: 'Projects Delivered', color: 'text-alta-green-light' },
  { value: 470, suffix: '+', label: 'Enterprise Clients', color: 'text-alta-blue' },
  { value: 130, suffix: '+', label: 'Professionals', color: 'text-amber-400' },
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

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-100 dark:border-white/6 last:border-0">
      <button className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded-lg px-1 group" onClick={onToggle} aria-expanded={isOpen}>
        <div className="flex items-center gap-3 pr-4">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot} ${isOpen ? 'opacity-100' : 'opacity-40'} transition-opacity duration-200`} aria-hidden="true" />
          <span className={`font-semibold text-[14px] transition-colors duration-150 ${isOpen ? item.accent : 'text-navy-900 dark:text-slate-200 group-hover:text-alta-blue'}`}>{item.title}</span>
        </div>
        <ChevronDown size={15} className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="pb-4 pl-5 pr-1">
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.body}</p>
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimate(true); observer.disconnect(); } }, { threshold: 0.2 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout>
      <PageHero breadcrumb="About Us" title="30 Years of Technology Excellence in Africa" subtitle="From a ETB 100,000 startup in 1994 to a USD $25 million enterprise — ALTA Computec is Ethiopia's most trusted IT partner." />

      {/* Section 1 — Company Story */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
            <div className="flex flex-col gap-8">
              <div>
                <p className="overline-tag mb-3">Our Story</p>
                <h2 className="section-heading">Built in Ethiopia. Trusted Across Africa.</h2>
              </div>
              <div className="flex flex-col gap-4 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.75]">
                <p>ALTA Computec PLC was founded in 1994 in Addis Ababa with a single conviction: that Ethiopian enterprises deserve world-class technology infrastructure, delivered by people who understand the local context. Starting with ETB 100,000 in capital and a small team of engineers, we built the company project by project, client by client.</p>
                <p>Over three decades, we have grown into Ethiopia's most decorated enterprise IT company — the country's only Dell Platinum Partner, a Cisco Premier Partner, Oracle Gold Partner, and Kaspersky Platinum Partner. Our 130+ engineers have delivered 640+ projects across banking, government, telecom, education, and energy sectors.</p>
                <p>Our mission has never changed: to be the strategic technology partner that Ethiopian institutions trust with their most critical infrastructure — not just for a project, but for decades. Today, with USD $25 million in annual revenue and 470+ enterprise clients, we are proud to be the backbone of Ethiopia's digital economy.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-4">Why Choose ALTA?</p>
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/8 overflow-hidden divide-y divide-slate-100 dark:divide-white/6 bg-white dark:bg-navy-900" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  {DIFFERENTIATORS.map((item, i) => (
                    <div key={item.title} className="px-4">
                      <AccordionItem item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 rounded-2xl border-2 bg-white dark:bg-navy-900" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-6">Company Timeline</p>
              <div className="relative">
                <div className="absolute left-[19px] top-5 bottom-5 w-px" style={{ background: 'linear-gradient(180deg, #1B4FD8, #22C55E)' }} aria-hidden="true" />
                <div className="flex flex-col gap-5">
                  {MILESTONES.map((m) => (
                    <div key={m.year} className="flex items-start gap-4 relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${m.active ? 'bg-alta-green border-alta-green' : 'bg-slate-100 dark:bg-navy-800 border-alta-blue/50'}`}
                        style={m.active ? { boxShadow: '0 0 0 4px rgba(22,163,74,0.2), 0 0 16px rgba(22,163,74,0.35)' } : {}}
                      >
                        <span className={`text-[10px] font-black ${m.active ? 'text-white' : 'text-alta-blue'}`}>{m.year.slice(2)}</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-bold text-slate-400">{m.year}</span>
                          <span className={`text-[13px] font-bold ${m.active ? 'text-alta-green' : 'text-navy-900 dark:text-white'}`}>{m.label}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">{m.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Stats Strip */}
      <section className="py-16 bg-dark-section relative" ref={statsRef}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => <StatItem key={s.label} stat={s} animate={animate} />)}
          </div>
        </div>
      </section>

      {/* Section 2b — ALTA Building */}
      <section className="section-padding bg-white dark:bg-navy-950 overflow-hidden" aria-label="ALTA Computec headquarters">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — rich image frame */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl" style={{ background: 'linear-gradient(135deg, #1B4FD8 0%, #22C55E 100%)' }} aria-hidden="true" />

              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(27,79,216,0.12)' }}>

                {/* The building photo */}
                <img
                  src="/Alta-Building.jpeg"
                  alt="ALTA Computec PLC Headquarters — Mexico Road, Addis Ababa"
                  className="w-full object-cover"
                  style={{ height: 480, objectPosition: 'center center' }}
                  loading="lazy"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,15,0.75) 0%, rgba(3,8,15,0.2) 45%, transparent 100%)' }} aria-hidden="true" />

                {/* Top-left: Since badge */}
                <div
                  className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{ background: 'rgba(3,8,15,0.65)', border: '1px solid rgba(27,79,216,0.4)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-alta-green-light animate-ping-slow" aria-hidden="true" />
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase">Est. 1994 · Addis Ababa</span>
                </div>

                {/* Top-right: Dell Platinum badge */}
                <div
                  className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.45)' }}
                >
                  <span className="text-amber-400 text-[11px] font-black">★</span>
                  <span className="text-[11px] font-bold text-amber-300 tracking-wide">Dell Platinum Partner</span>
                </div>

                {/* Bottom overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-white font-black text-[18px] leading-tight">ALTA Computec PLC</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin size={12} className="text-alta-blue flex-shrink-0" aria-hidden="true" />
                        <span className="text-[12px] text-slate-300">Mexico Road, Chad St., Addis Ababa</span>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Mexico+Square+Addis+Ababa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold text-white transition-all duration-150 hover:bg-white/20 flex-shrink-0 backdrop-blur-sm"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      <MapPin size={12} aria-hidden="true" /> View on Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating stat card — bottom-left */}
              <div
                className="absolute -bottom-5 -left-5 flex flex-col gap-1 px-4 py-3 rounded-2xl backdrop-blur-md shadow-xl"
                style={{ background: 'rgba(10,22,40,0.92)', border: '1px solid rgba(27,79,216,0.35)' }}
              >
                <span className="text-[28px] font-black text-alta-blue leading-none">30+</span>
                <span className="text-[11px] text-slate-400 font-medium">Years at this address</span>
              </div>

              {/* Floating stat card — top-right offset */}
              <div
                className="absolute -top-5 -right-5 flex flex-col gap-1 px-4 py-3 rounded-2xl backdrop-blur-md shadow-xl"
                style={{ background: 'rgba(10,22,40,0.92)', border: '1px solid rgba(34,197,94,0.35)' }}
              >
                <span className="text-[28px] font-black text-alta-green-light leading-none">470+</span>
                <span className="text-[11px] text-slate-400 font-medium">Enterprise clients</span>
              </div>
            </div>

            {/* Right — copy */}
            <div className="flex flex-col gap-7">
              <div>
                <p className="overline-tag mb-3">Our Home</p>
                <h2 className="section-heading">One Building.<br />Ethiopia's IT Backbone.</h2>
              </div>

              <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-[1.75]">
                From this building on Mexico Road in Addis Ababa, ALTA Computec has been engineering Ethiopia's most critical technology infrastructure for over 30 years — serving banks, government ministries, telecoms, and enterprises across the country.
              </p>

              {/* Fact tiles */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Headquarters', value: 'Mexico Road, Addis Ababa', icon: '🏢' },
                  { label: 'In Operation Since', value: '1994 — 30+ years', icon: '📅' },
                  { label: 'Engineers On-Site', value: '130+ certified staff', icon: '👷' },
                  { label: 'ICT Park Presence', value: 'Training center inside', icon: '🎓' },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col gap-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-white/8"
                  >
                    <span className="text-[18px] leading-none">{f.icon}</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">{f.label}</span>
                    <span className="text-[13px] font-semibold text-navy-900 dark:text-white leading-snug">{f.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.google.com/?q=Mexico+Square+Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline self-start"
              >
                <MapPin size={15} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Differentiators */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Our Differentiators</p>
            <h2 className="section-heading">What Sets Us Apart</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIATOR_CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl border-2 bg-white dark:bg-navy-900 transition-all duration-250 hover:-translate-y-1 overflow-hidden"
                  style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.accent;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${c.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${c.accentBorder}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250" style={{ background: `linear-gradient(90deg, ${c.accent}, ${c.accent}88)` }} aria-hidden="true" />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-250" style={{ background: c.accentLight, border: `1px solid ${c.accentBorder}` }}>
                    <Icon size={20} style={{ color: c.accent }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-navy-900 dark:text-white mb-1.5">{c.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — Leadership */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Our Team</p>
            <h2 className="section-heading">The People Behind ALTA</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member, i) => {
              const gradients = [
                'from-blue-600 to-alta-indigo',
                'from-alta-green to-alta-sky',
                'from-purple-600 to-blue-600',
                'from-amber-500 to-orange-500',
                'from-sky-500 to-blue-700',
                'from-emerald-500 to-teal-600',
                'from-red-500 to-rose-600',
                'from-violet-600 to-purple-700',
              ];
              const accentColors = ['#1B4FD8','#16A34A','#6366F1','#F59E0B','#0EA5E9','#22C55E','#EF4444','#8B5CF6'];
              const accent = accentColors[i % accentColors.length];
              return (
              <div
                key={member.name}
                className="group relative flex flex-col items-center gap-4 text-center p-6 rounded-2xl border-2 bg-white dark:bg-navy-900 transition-all duration-250 hover:-translate-y-1 overflow-hidden"
                style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px ${accent}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}
              >
                <div className={`w-[72px] h-[72px] rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-black text-xl">{member.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-[15px]">{member.name}</p>
                  <p className="text-[13px] text-slate-500 mt-0.5">{member.title}</p>
                </div>
                <a href="#" className="flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-alta-blue transition-colors duration-150" aria-label={`${member.name} on LinkedIn`}>
                  <Linkedin size={14} aria-hidden="true" /> LinkedIn
                </a>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Core Values */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center text-alta-blue mb-3">Our Values</p>
            <h2 className="section-heading-light">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.name} className="card-dark flex flex-col gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${v.color}`} style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-[15px] mb-1">{v.name}</p>
                    <p className="text-[13px] text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6 — Partners Strip */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="overline-tag justify-center mb-3">Official Certifications</p>
            <h2 className="section-heading">Certified by the World's Leading Technology Brands</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-14">
            {[
              { name: 'Dell', badge: 'Platinum' },
              { name: 'Cisco', badge: 'Premier' },
              { name: 'Oracle', badge: 'Gold' },
              { name: 'Kaspersky', badge: 'Platinum' },
              { name: 'HP', badge: 'Authorized' },
              { name: 'Microsoft', badge: 'Partner' },
              { name: 'IBM', badge: 'Authorized' },
              { name: 'Fortinet', badge: 'Authorized' },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2.5 group cursor-default">
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ width: 112, height: 64 }}>
                  <PartnerLogo name={p.name} size={64} className="object-contain" />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
