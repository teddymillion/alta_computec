import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight, ChevronRight, Brain, LayoutDashboard, Globe, Database, ShieldCheck, Code2, GraduationCap, Award, Star, Layers, MapPin, CheckCircle2, Zap, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ── SEO: imperatively manage <head> for this page ── */
function useSEO({ title, description, ogTitle, ogDescription, ogUrl }) {
  useEffect(() => {
    const prev = {
      title: document.title,
      desc:  document.querySelector('meta[name="description"]')?.getAttribute('content'),
      ogT:   document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
      ogD:   document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
      ogU:   document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
    };

    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };

    document.title = title;
    setMeta('meta[name="description"]',       'content', description);
    setMeta('meta[property="og:title"]',      'content', ogTitle);
    setMeta('meta[property="og:description"]','content', ogDescription);
    setMeta('meta[property="og:url"]',        'content', ogUrl);

    return () => {
      document.title = prev.title;
      if (prev.desc) setMeta('meta[name="description"]',       'content', prev.desc);
      if (prev.ogT)  setMeta('meta[property="og:title"]',      'content', prev.ogT);
      if (prev.ogD)  setMeta('meta[property="og:description"]','content', prev.ogD);
      if (prev.ogU)  setMeta('meta[property="og:url"]',        'content', prev.ogU);
      else           document.querySelector('meta[property="og:url"]')?.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogUrl]);
}

/* ── Animated circuit/particle SVG background ── */
function CircuitBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <style>{`
          @keyframes dash { to { stroke-dashoffset: -200; } }
          @keyframes pulse-dot { 0%,100%{opacity:.15} 50%{opacity:.7} }
          @keyframes travel {
            0%   { offset-distance: 0%;   opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          .circuit-line { animation: dash 6s linear infinite; }
          .circuit-line-slow { animation: dash 10s linear infinite; }
          .dot-pulse { animation: pulse-dot 3s ease-in-out infinite; }
          .dot-pulse-2 { animation: pulse-dot 3s ease-in-out infinite 1s; }
          .dot-pulse-3 { animation: pulse-dot 3s ease-in-out infinite 2s; }
        `}</style>
      </defs>

      {/* Horizontal traces */}
      <line x1="0" y1="30%" x2="100%" y2="30%" stroke="rgba(27,79,216,0.12)" strokeWidth="1" strokeDasharray="8 6" className="circuit-line" />
      <line x1="0" y1="60%" x2="100%" y2="60%" stroke="rgba(34,197,94,0.08)" strokeWidth="1" strokeDasharray="6 8" className="circuit-line-slow" />
      <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(27,79,216,0.07)" strokeWidth="1" strokeDasharray="4 10" className="circuit-line" />

      {/* Vertical traces */}
      <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(27,79,216,0.08)" strokeWidth="1" strokeDasharray="6 8" className="circuit-line-slow" />
      <line x1="55%" y1="0" x2="55%" y2="100%" stroke="rgba(99,102,241,0.07)" strokeWidth="1" strokeDasharray="8 6" className="circuit-line" />
      <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(34,197,94,0.06)" strokeWidth="1" strokeDasharray="5 9" className="circuit-line-slow" />

      {/* Corner nodes */}
      <circle cx="20%" cy="30%" r="3" fill="rgba(27,79,216,0.5)" className="dot-pulse" />
      <circle cx="55%" cy="30%" r="3" fill="rgba(99,102,241,0.5)" className="dot-pulse-2" />
      <circle cx="80%" cy="60%" r="3" fill="rgba(34,197,94,0.5)" className="dot-pulse-3" />
      <circle cx="20%" cy="60%" r="3" fill="rgba(14,165,233,0.5)" className="dot-pulse" />
      <circle cx="55%" cy="80%" r="3" fill="rgba(27,79,216,0.4)" className="dot-pulse-2" />
      <circle cx="80%" cy="30%" r="3" fill="rgba(34,197,94,0.4)" className="dot-pulse-3" />

      {/* Small scatter dots */}
      {[
        [10,15],[35,45],[65,25],[90,55],[15,70],[45,85],[72,10],[88,78],
        [30,20],[60,65],[5,50],[95,35],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={`${x}%`}
          cy={`${y}%`}
          r="1.5"
          fill="rgba(27,79,216,0.3)"
          style={{ animation: `pulse-dot ${2.5 + (i % 3) * 0.8}s ease-in-out infinite ${(i * 0.4) % 2}s` }}
        />
      ))}
    </svg>
  );
}

/* ── Services data ── */
const SERVICES = [
  {
    icon: Brain,
    id: 'ai',
    label: 'AI as a Service',
    desc: 'Custom LLM integration, predictive analytics, process automation, and intelligent data pipelines tailored to your business.',
    accent: '#6366F1',
    accentLight: 'rgba(99,102,241,0.12)',
    accentBorder: 'rgba(99,102,241,0.30)',
  },
  {
    icon: LayoutDashboard,
    id: 'erp',
    label: 'ERP Solutions',
    desc: 'End-to-end ERP implementation, customisation, and support — SAP, Odoo, and Oracle-aligned for Ethiopian enterprises.',
    accent: '#1B4FD8',
    accentLight: 'rgba(27,79,216,0.12)',
    accentBorder: 'rgba(27,79,216,0.30)',
  },
  {
    icon: Globe,
    id: 'webdev',
    label: 'Web & App Development',
    desc: 'Enterprise web applications, cross-platform mobile apps, and custom software built to scale with your organisation.',
    accent: '#0EA5E9',
    accentLight: 'rgba(14,165,233,0.12)',
    accentBorder: 'rgba(14,165,233,0.30)',
  },
  {
    icon: Database,
    id: 'database',
    label: 'Database Design & Management',
    desc: 'Architecture, performance optimisation, migration, and ongoing administration for mission-critical databases.',
    accent: '#16A34A',
    accentLight: 'rgba(22,163,74,0.12)',
    accentBorder: 'rgba(22,163,74,0.30)',
  },
  {
    icon: ShieldCheck,
    id: 'cyber',
    label: 'Cybersecurity',
    desc: 'Threat assessment, penetration testing, SOC services, and compliance frameworks to protect your digital assets.',
    accent: '#F59E0B',
    accentLight: 'rgba(245,158,11,0.12)',
    accentBorder: 'rgba(245,158,11,0.30)',
  },
  {
    icon: Code2,
    id: 'custom',
    label: 'Custom Software Development',
    desc: 'Bespoke solutions engineered from scratch — from workflow automation tools to full enterprise platforms.',
    accent: '#0EA5E9',
    accentLight: 'rgba(14,165,233,0.12)',
    accentBorder: 'rgba(14,165,233,0.30)',
  },
];

function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #03080F 0%, #0A1628 100%)' }}
      aria-label="Software division services"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="overline-tag text-alta-indigo mb-4">What We Deliver</p>
            <h2 className="section-heading-light">Six Disciplines.<br />One Division.</h2>
            <p className="section-subheading-light mt-3">
              Every service is delivered by in-house specialists — no subcontracting, full accountability.
            </p>
          </div>
          <Link to="/contact" className="btn-primary flex-shrink-0 self-start lg:self-auto">
            Request a Consultation <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <article
                key={svc.id}
                className="group relative flex flex-col gap-5 p-6 rounded-2xl overflow-hidden transition-all duration-250 ease-out cursor-default"
                style={{
                  background: 'rgba(13,30,56,0.6)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(18,36,68,0.85)';
                  e.currentTarget.style.border = `1px solid ${svc.accentBorder}`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px ${svc.accentBorder}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(13,30,56,0.6)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top accent bar on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                  style={{ background: `linear-gradient(90deg, ${svc.accent}, ${svc.accent}66)` }}
                  aria-hidden="true"
                />

                {/* Card number */}
                <span className="absolute top-4 right-4 text-[11px] font-black text-white/8 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-250 group-hover:scale-110"
                  style={{ background: svc.accentLight, border: `1px solid ${svc.accentBorder}` }}
                >
                  <Icon size={20} style={{ color: svc.accent }} aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-[15px] font-bold text-white leading-snug">{svc.label}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{svc.desc}</p>
                </div>

                {/* Learn more */}
                <a
                  href={`#${svc.id}`}
                  className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 mt-auto group-hover:translate-x-1"
                  style={{ color: svc.accent }}
                  aria-label={`Learn more about ${svc.label}`}
                >
                  Learn More <ArrowRight size={13} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Neural-net SVG animation ── */
function NeuralNet() {
  const nodes = [
    // layer 0 (input)
    { id: 0, x: 60,  y: 80  },
    { id: 1, x: 60,  y: 160 },
    { id: 2, x: 60,  y: 240 },
    // layer 1
    { id: 3, x: 180, y: 60  },
    { id: 4, x: 180, y: 140 },
    { id: 5, x: 180, y: 220 },
    { id: 6, x: 180, y: 300 },
    // layer 2
    { id: 7, x: 300, y: 100 },
    { id: 8, x: 300, y: 200 },
    { id: 9, x: 300, y: 280 },
    // output
    { id: 10, x: 400, y: 140 },
    { id: 11, x: 400, y: 220 },
  ];

  const edges = [
    [0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],
    [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,8],[6,9],
    [7,10],[7,11],[8,10],[8,11],[9,10],[9,11],
  ];

  return (
    <svg viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes nn-pulse { 0%,100%{opacity:.12} 50%{opacity:.45} }
          @keyframes nn-node  { 0%,100%{opacity:.5;r:5} 50%{opacity:1;r:7} }
          @keyframes nn-travel {
            0%   { stroke-dashoffset: 120; opacity: 0; }
            15%  { opacity: .8; }
            85%  { opacity: .8; }
            100% { stroke-dashoffset: 0;   opacity: 0; }
          }
          .nn-edge { animation: nn-pulse 4s ease-in-out infinite; }
          .nn-travel { stroke-dasharray: 20 100; animation: nn-travel 3s linear infinite; }
        `}</style>
        <radialGradient id="ng1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="ng2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        return (
          <g key={i}>
            <line
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(99,102,241,0.18)" strokeWidth="1"
              className="nn-edge"
              style={{ animationDelay: `${(i * 0.18) % 4}s` }}
            />
            {/* travelling signal dot */}
            {i % 4 === 0 && (
              <line
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="rgba(99,102,241,0.9)" strokeWidth="2"
                className="nn-travel"
                style={{ animationDelay: `${(i * 0.35) % 3}s` }}
              />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isOutput = n.x === 400;
        const isInput  = n.x === 60;
        return (
          <circle
            key={n.id}
            cx={n.x} cy={n.y} r="6"
            fill={isOutput ? 'url(#ng2)' : isInput ? 'rgba(14,165,233,0.8)' : 'url(#ng1)'}
            style={{
              animation: `nn-node ${2.5 + (i % 3) * 0.6}s ease-in-out infinite`,
              animationDelay: `${(i * 0.25) % 2.5}s`,
            }}
          />
        );
      })}

      {/* Layer labels */}
      {[{ x: 60, label: 'Input' }, { x: 180, label: 'Hidden' }, { x: 300, label: 'Hidden' }, { x: 400, label: 'Output' }]
        .map(({ x, label }) => (
          <text key={label + x} x={x} y="338" textAnchor="middle"
            fill="rgba(148,163,184,0.4)" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600"
            letterSpacing="0.08em">
            {label.toUpperCase()}
          </text>
        ))}
    </svg>
  );
}

const AI_CAPABILITIES = [
  { label: 'LLM Integration', desc: 'Deploy and fine-tune large language models on your proprietary data.' },
  { label: 'Predictive Analytics', desc: 'Forecast demand, detect anomalies, and surface actionable insights.' },
  { label: 'Process Automation', desc: 'Replace manual workflows with intelligent, self-improving pipelines.' },
  { label: 'Computer Vision', desc: 'Document processing, quality inspection, and visual intelligence at scale.' },
];

function AISpotlight() {
  return (
    <section
      id="ai"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #060D1A 0%, #0D1B2E 50%, #0A1628 100%)' }}
      aria-label="AI as a Service spotlight"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid-fine opacity-40" aria-hidden="true" />
      {/* Indigo glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)' }}
        aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* Featured label */}
        <div className="flex items-center gap-2 mb-10">
          <div className="h-px flex-1 max-w-[40px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6))' }} />
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-alta-indigo">Featured Service</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.6), transparent)' }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — neural net visual */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            {/* Glow behind SVG */}
            <div className="absolute inset-0 rounded-3xl blur-2xl"
              style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
              aria-hidden="true" />
            <div
              className="relative w-full max-w-[460px] aspect-[460/360] rounded-3xl p-6"
              style={{
                background: 'rgba(13,27,46,0.7)',
                border: '1px solid rgba(99,102,241,0.18)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <NeuralNet />
              {/* Floating stat chips */}
              <div
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl text-[11px] font-bold"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#A5B4FC' }}
              >
                LLM Ready
              </div>
              <div
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl text-[11px] font-bold"
                style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#86EFAC' }}
              >
                Real-time Inference
              </div>
            </div>
          </div>

          {/* Right — content */}
          <div className="flex flex-col gap-7 order-1 lg:order-2">
            <div>
              <p className="overline-tag mb-3" style={{ color: '#818CF8' }}>AI as a Service</p>
              <h2 className="text-[32px] sm:text-[38px] font-black text-white leading-[1.1] tracking-tight">
                Bring Intelligence<br />
                to Every{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #22C55E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Business Process.</span>
              </h2>
              <p className="text-[15px] text-slate-400 leading-relaxed mt-4">
                Alta Computec's AIaaS practice delivers production-ready AI — not prototypes. We integrate, train, and deploy models directly into your existing systems, with full local support.
              </p>
            </div>

            {/* Capabilities list */}
            <ul className="flex flex-col gap-4">
              {AI_CAPABILITIES.map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.35)' }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[14px] font-semibold text-white">{label}</span>
                    <span className="text-[13px] text-slate-500 ml-2">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to="/contact"
              className="btn-primary self-start text-[15px] px-7 py-3.5"
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.35), 0 0 0 1px rgba(99,102,241,0.4)',
              }}
            >
              Request AI Consultation <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Training Center ── */
const TRACKS = [
  {
    num: '01',
    title: 'AI & Machine Learning',
    cert: 'Professional AI Practitioner',
    duration: '12 weeks',
    modules: ['Python for AI', 'ML Fundamentals', 'LLM Integration', 'Model Deployment'],
    accent: '#6366F1',
    accentLight: 'rgba(99,102,241,0.12)',
    accentBorder: 'rgba(99,102,241,0.25)',
  },
  {
    num: '02',
    title: 'Cybersecurity',
    cert: 'Certified Security Analyst',
    duration: '10 weeks',
    modules: ['Threat Intelligence', 'Pen Testing', 'SOC Operations', 'Compliance'],
    accent: '#F59E0B',
    accentLight: 'rgba(245,158,11,0.12)',
    accentBorder: 'rgba(245,158,11,0.25)',
  },
  {
    num: '03',
    title: 'Database Administration',
    cert: 'Certified DBA',
    duration: '8 weeks',
    modules: ['SQL Mastery', 'DB Architecture', 'Performance Tuning', 'Cloud DBs'],
    accent: '#16A34A',
    accentLight: 'rgba(22,163,74,0.12)',
    accentBorder: 'rgba(22,163,74,0.25)',
  },
  {
    num: '04',
    title: 'Full Stack Development',
    cert: 'Full Stack Engineer',
    duration: '16 weeks',
    modules: ['React & Node.js', 'REST APIs', 'DevOps & CI/CD', 'Mobile Apps'],
    accent: '#0EA5E9',
    accentLight: 'rgba(14,165,233,0.12)',
    accentBorder: 'rgba(14,165,233,0.25)',
  },
  {
    num: '05',
    title: 'ERP Implementation',
    cert: 'ERP Solutions Specialist',
    duration: '10 weeks',
    modules: ['ERP Fundamentals', 'Odoo / SAP Basics', 'Data Migration', 'Go-Live Support'],
    accent: '#1B4FD8',
    accentLight: 'rgba(27,79,216,0.12)',
    accentBorder: 'rgba(27,79,216,0.25)',
  },
];

function TrainingCenter() {
  return (
    <section
      id="training"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #060D1A 100%)' }}
      aria-label="ICT Training Center"
    >
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-60" aria-hidden="true" />
      {/* Green glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(22,163,74,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)' }}
              >
                <GraduationCap size={18} className="text-alta-green" aria-hidden="true" />
              </div>
              <p className="overline-tag text-alta-green">Ethiopian ICT Park</p>
            </div>
            <h2 className="section-heading-light">
              Ethiopia's Premier<br />ICT Training Center
            </h2>
            <p className="section-subheading-light mt-3">
              Hands-on, certification-track training delivered by active practitioners — not just instructors. Located at Ethiopian ICT Park, Addis Ababa.
            </p>
          </div>
          <Link to="/contact" className="btn-primary flex-shrink-0 self-start lg:self-auto">
            View Training Programs <ArrowRight size={15} />
          </Link>
        </div>

        {/* Track grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRACKS.map((track) => (
            <div
              key={track.num}
              className="group relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-250"
              style={{
                background: 'rgba(13,27,46,0.7)',
                border: `1px solid ${track.accentBorder}`,
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${track.accentBorder}`;
                e.currentTarget.style.background = 'rgba(18,36,68,0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(13,27,46,0.7)';
              }}
            >
              {/* Track number + cert badge */}
              <div className="flex items-start justify-between">
                <span
                  className="text-[11px] font-black tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                  style={{ background: track.accentLight, color: track.accent, border: `1px solid ${track.accentBorder}` }}
                >
                  Track {track.num}
                </span>
                <div className="flex items-center gap-1" style={{ color: track.accent }}>
                  <Award size={12} aria-hidden="true" />
                  <span className="text-[10px] font-semibold">{track.duration}</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-[16px] font-bold text-white leading-snug">{track.title}</h3>
                <p className="text-[11px] font-semibold mt-1" style={{ color: track.accent }}>{track.cert}</p>
              </div>

              {/* Module pills */}
              <div className="flex flex-wrap gap-1.5">
                {track.modules.map((mod) => (
                  <span
                    key={mod}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full text-slate-400"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {mod}
                  </span>
                ))}
              </div>

              {/* Progress bar — decorative */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-600">Certification path</span>
                  <span className="text-[10px] font-semibold" style={{ color: track.accent }}>4 modules</span>
                </div>
                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '100%', background: `linear-gradient(90deg, ${track.accent}88, ${track.accent})` }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* "More tracks" card */}
          <div
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl text-center"
            style={{
              background: 'rgba(27,79,216,0.06)',
              border: '1px dashed rgba(27,79,216,0.25)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(27,79,216,0.12)', border: '1px solid rgba(27,79,216,0.25)' }}
            >
              <GraduationCap size={18} className="text-alta-blue" aria-hidden="true" />
            </div>
            <p className="text-[14px] font-semibold text-white">Custom Corporate Training</p>
            <p className="text-[12px] text-slate-500">Tailored programs for your team's specific technology stack and goals.</p>
            <Link to="/contact" className="text-[13px] font-semibold text-alta-blue hover:text-blue-400 transition-colors flex items-center gap-1">
              Enquire Now <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Bottom trust note */}
        <div className="mt-10 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-center gap-6">
          {[
            { icon: '📍', text: 'Ethiopian ICT Park, Addis Ababa' },
            { icon: '🏆', text: 'Industry-recognised certifications' },
            { icon: '👨‍💻', text: 'Taught by active practitioners' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-slate-500 text-[13px]">
              <span aria-hidden="true">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why Alta Computec ── */
const DIFFERENTIATORS = [
  {
    icon: Star,
    title: "Ethiopia's Only Dell Platinum Partner",
    desc: '30+ years of certified excellence — the highest tier of Dell partnership in the country, giving you exclusive pricing and priority support.',
    accent: '#F59E0B',
    accentLight: 'rgba(245,158,11,0.10)',
    accentBorder: 'rgba(245,158,11,0.22)',
  },
  {
    icon: Layers,
    title: 'Full Hardware + Software Provider',
    desc: 'Unique in the Ethiopian market — we deliver the server, the network, the software, and the AI layer. One partner, zero gaps.',
    accent: '#1B4FD8',
    accentLight: 'rgba(27,79,216,0.10)',
    accentBorder: 'rgba(27,79,216,0.22)',
  },
  {
    icon: MapPin,
    title: 'ICT Park Training Center',
    desc: "Located at Ethiopian ICT Park — the country's premier technology hub. Our training center puts your team at the centre of Ethiopia's digital ecosystem.",
    accent: '#16A34A',
    accentLight: 'rgba(22,163,74,0.10)',
    accentBorder: 'rgba(22,163,74,0.22)',
  },
  {
    icon: CheckCircle2,
    title: 'End-to-End Project Delivery',
    desc: 'From discovery and architecture through deployment and post-launch support — we own the full lifecycle with no handoffs to third parties.',
    accent: '#0EA5E9',
    accentLight: 'rgba(14,165,233,0.10)',
    accentBorder: 'rgba(14,165,233,0.22)',
  },
  {
    icon: Users,
    title: 'Local Expertise, Global Standards',
    desc: '130+ certified engineers who understand Ethiopian business, regulation, and infrastructure — delivering to international quality benchmarks.',
    accent: '#6366F1',
    accentLight: 'rgba(99,102,241,0.10)',
    accentBorder: 'rgba(99,102,241,0.22)',
  },
  {
    icon: Zap,
    title: '470+ Enterprise Clients Served',
    desc: 'CBE, Ethio Telecom, DBE, government ministries — the institutions that power Ethiopia trust Alta Computec to power them.',
    accent: '#22C55E',
    accentLight: 'rgba(34,197,94,0.10)',
    accentBorder: 'rgba(34,197,94,0.22)',
  },
];

function WhyAlta() {
  return (
    <section
      id="why-alta"
      className="section-padding relative overflow-hidden bg-white"
      aria-label="Why Alta Computec Software Division"
    >
      {/* Subtle light grid */}
      <div className="absolute inset-0 bg-grid-light opacity-60" aria-hidden="true" />
      {/* Blue glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(27,79,216,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="overline-tag justify-center mb-4">Why Choose Us</p>
          <h2 className="section-heading">
            Built Different.<br />Proven in Ethiopia.
          </h2>
          <p className="section-subheading mx-auto text-center mt-3">
            Six reasons why Ethiopia's most demanding organisations choose Alta Computec's Software &amp; AI Division.
          </p>
        </div>

        {/* Tiles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFERENTIATORS.map(({ icon: Icon, title, desc, accent, accentLight, accentBorder }) => (
            <div
              key={title}
              className="group relative flex gap-4 p-6 rounded-2xl bg-white transition-all duration-250 ease-out cursor-default"
              style={{
                border: `1px solid rgba(226,232,240,0.8)`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentBorder;
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px ${accentBorder}`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                style={{ background: accent }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-250 group-hover:scale-110"
                style={{ background: accentLight, border: `1px solid ${accentBorder}` }}
              >
                <Icon size={20} style={{ color: accent }} aria-hidden="true" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[14px] font-bold text-navy-900 leading-snug">{title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div
          className="mt-12 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
          style={{
            background: 'linear-gradient(135deg, #0A1628 0%, #0D1E38 100%)',
            border: '1px solid rgba(27,79,216,0.2)',
          }}
        >
          {[
            { value: '30+', label: 'Years in Business', color: '#F59E0B' },
            { value: '470+', label: 'Enterprise Clients', color: '#22C55E' },
            { value: '640+', label: 'Projects Delivered', color: '#60A5FA' },
            { value: '130+', label: 'Certified Engineers', color: '#A5B4FC' },
          ].map(({ value, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-[26px] font-black leading-none" style={{ color }}>{value}</span>
              <span className="text-[11px] text-slate-500 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bottom CTA Strip ── */
function CTAStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #03080F 0%, #0A1628 40%, #0D1E38 70%, #03080F 100%)' }}
      aria-label="Call to action"
    >
      {/* Top gradient separator */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(27,79,216,0.5) 30%, rgba(34,197,94,0.5) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Background layers */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-fine opacity-30" aria-hidden="true" />

      {/* Glow orbs */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(27,79,216,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-20 lg:py-24">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(27,79,216,0.12)',
              border: '1px solid rgba(27,79,216,0.3)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-alta-green-light animate-ping-slow" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-alta-blue">
              Software &amp; AI Division
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-3xl">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-black text-white leading-[1.08] tracking-tight">
              Ready to transform your business
              <br />
              <span className="text-gradient-green">with Alta Computec?</span>
            </h2>
          </div>

          {/* Sub-copy */}
          <p className="text-[16px] text-slate-400 max-w-xl leading-relaxed">
            From a free consultation to a full enterprise deployment — our team is ready to scope, design, and deliver your next technology project.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="btn-primary text-[15px] px-8 py-4">
              Get a Free Consultation <ArrowRight size={15} />
            </Link>
            <Link
              to="/products"
              className="btn-secondary text-[15px] px-8 py-4"
            >
              See All Solutions
            </Link>
          </div>

          {/* Trust micro-row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
            {[
              'No commitment required',
              'Response within 24 hours',
              '30+ years of expertise',
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-[12px] text-slate-500">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6l2.5 2.5L9.5 3" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(27,79,216,0.3) 50%, transparent 100%)' }}
        aria-hidden="true"
      />
    </section>
  );
}

export default function SoftwareDivisionPage() {
  useSEO({
    title: 'Software, AI & Cybersecurity Solutions | Alta Computec PLC Ethiopia',
    description:
      "Alta Computec's Software & AI Division delivers AI as a Service, ERP, cybersecurity, and custom software solutions in Ethiopia. Backed by 30 years of IT excellence.",
    ogTitle: 'Software, AI & Cybersecurity Solutions | Alta Computec PLC Ethiopia',
    ogDescription:
      "Alta Computec's Software & AI Division delivers AI as a Service, ERP, cybersecurity, and custom software solutions in Ethiopia. Backed by 30 years of IT excellence.",
    ogUrl: 'https://alta-computec-website.vercel.app/software-division',
  });

  return (
    <PageLayout>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #03080F 0%, #0A1628 45%, #0D1E38 75%, #0A1628 100%)' }}
        aria-label="Software & AI Division hero"
      >
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-fine" aria-hidden="true" />
        <CircuitBg />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-alta-blue/6 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-alta-indigo/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-alta-green/4 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        <div className="section-container relative z-10 pt-28 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-10" aria-label="Breadcrumb">
            <Link to="/" className="text-[12px] text-slate-500 hover:text-alta-blue transition-colors duration-150">Home</Link>
            <ChevronRight size={12} className="text-slate-600" aria-hidden="true" />
            <span className="text-[12px] font-semibold text-alta-blue">Software &amp; AI Division</span>
          </nav>

          <div className="max-w-4xl flex flex-col gap-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(27,79,216,0.10))',
                  border: '1px solid rgba(99,102,241,0.35)',
                  boxShadow: '0 0 12px rgba(99,102,241,0.12)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-alta-indigo animate-ping-slow" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-alta-indigo">
                  New Division — Now Live
                </span>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.30)' }}
              >
                <span className="text-amber-400 text-[10px] font-black">★</span>
                <span className="text-[11px] font-semibold text-amber-400/90">Dell Platinum Partner</span>
              </div>
            </div>

            {/* Division name */}
            <div>
              <p className="text-[13px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-3">
                Software, AI, Database &amp; Cybersecurity Division
              </p>
              <h1 className="text-[42px] sm:text-[54px] lg:text-[64px] font-black text-white leading-[1.04] tracking-[-0.025em]">
                Intelligence-Driven<br />
                Software for{' '}
                <span className="text-gradient-blue">Africa's</span>
                <br />
                <span className="text-gradient-green">Digital Future.</span>
              </h1>
            </div>

            {/* Value proposition */}
            <p className="text-[17px] text-slate-400 leading-[1.65] max-w-2xl">
              From AI as a Service to enterprise ERP, cybersecurity, and custom software — Alta Computec's new division brings world-class software capability to Ethiopia, backed by 30 years of IT excellence and the country's only Dell Platinum partnership.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href="#services" className="btn-primary text-[15px] px-7 py-3.5">
                Explore Our Services <ArrowRight size={15} />
              </a>
              <Link to="/contact" className="btn-secondary text-[15px] px-7 py-3.5">
                Contact the Division
              </Link>
            </div>

            {/* Trust micro-strip */}
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/6 mt-2">
              {[
                { label: '30+ Years', sub: 'Parent Company' },
                { label: 'Dell Platinum', sub: 'Only in Ethiopia' },
                { label: 'ICT Park', sub: 'Training Center' },
                { label: '470+ Clients', sub: 'Enterprise Trust' },
              ].map(({ label, sub }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-bold text-white">{label}</span>
                  <span className="text-[11px] text-slate-500">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-navy-950/60 to-transparent pointer-events-none" aria-hidden="true" />
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(27,79,216,0.4) 30%, rgba(34,197,94,0.4) 70%, transparent 100%)' }} aria-hidden="true" />
      </section>

      {/* ── SERVICES ── */}
      <ServicesSection />

      {/* ── AI SPOTLIGHT ── */}
      <AISpotlight />

      {/* ── TRAINING CENTER ── */}
      <TrainingCenter />

      {/* ── WHY ALTA ── */}
      <WhyAlta />

      {/* ── CTA STRIP ── */}
      <CTAStrip />
    </PageLayout>
  );
}
