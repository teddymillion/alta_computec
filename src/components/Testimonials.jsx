import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "ALTA Computec delivered our entire data center infrastructure on time and within budget. Their team's technical depth — from Dell server configuration to Cisco network design — is unmatched in Ethiopia. We've been working with them for over a decade.",
    name: 'Tadesse Bekele',
    title: 'Chief Information Officer',
    company: 'Commercial Bank of Ethiopia',
    initials: 'CB',
    color: 'from-blue-600 to-blue-800',
  },
  {
    quote: "When we needed to connect 47 regional offices on a secure government network, ALTA was the only vendor with the technical capability and local knowledge to execute. The project was delivered ahead of schedule with zero security incidents.",
    name: 'Dawit Haile',
    title: 'Director of IT Infrastructure',
    company: 'Ministry of Finance, Ethiopia',
    initials: 'MF',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    quote: "ALTA's cybersecurity team transformed our security posture completely. Their Kaspersky Platinum partnership gave us access to enterprise-grade protection that we couldn't have sourced elsewhere in Ethiopia. Eighteen months, zero critical incidents.",
    name: 'Selamawit Girma',
    title: 'Head of Network Security',
    company: 'Ethio Telecom',
    initials: 'ET',
    color: 'from-purple-600 to-purple-800',
  },
  {
    quote: "As a university, we needed a technology partner who understood both budget constraints and enterprise-grade requirements. ALTA delivered a complete campus network and smart classroom infrastructure that has transformed how we teach.",
    name: 'Prof. Abebe Worku',
    title: 'Vice President, Technology',
    company: 'Addis Ababa University',
    initials: 'AA',
    color: 'from-amber-600 to-amber-800',
  },
  {
    quote: "ALTA's Oracle ERP implementation was the most complex IT project our organization had undertaken. Their project management, technical expertise, and post-deployment support made the difference between success and failure.",
    name: 'Mekdes Alemu',
    title: 'Chief Financial Officer',
    company: 'Ethiopian Electric Power',
    initials: 'EE',
    color: 'from-red-600 to-red-800',
  },
];

const CLIENT_LOGOS = [
  'Commercial Bank of Ethiopia',
  'Ministry of Finance',
  'Ethio Telecom',
  'Addis Ababa University',
  'Ethiopian Electric Power',
  'Development Bank of Ethiopia',
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 star rating">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="text-amber-400 fill-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, featured }) {
  return (
    <article className={`flex flex-col gap-5 p-6 rounded-2xl border transition-all duration-300 ${
      featured
        ? 'bg-white border-slate-200/80 shadow-xl'
        : 'border-white/6 hover:border-white/10'
    }`}
    style={!featured ? { background: 'rgba(13,30,56,0.6)', backdropFilter: 'blur(8px)' } : {}}
    >
      <div className="flex items-start justify-between gap-3">
        <Stars />
        <Quote size={18} className={featured ? 'text-slate-200' : 'text-white/10'} aria-hidden="true" />
      </div>

      <blockquote className={`text-[13.5px] leading-[1.7] flex-1 ${featured ? 'text-slate-700' : 'text-slate-400'}`}>
        "{t.quote}"
      </blockquote>

      <div className={`flex items-center gap-3 pt-4 border-t ${featured ? 'border-slate-100' : 'border-white/8'}`}>
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
          <span className="text-white font-bold text-[11px]">{t.initials}</span>
        </div>
        <div className="min-w-0">
          <p className={`font-bold text-[13px] truncate ${featured ? 'text-navy-900' : 'text-white'}`}>{t.name}</p>
          <p className={`text-[11px] truncate ${featured ? 'text-slate-500' : 'text-slate-500'}`}>{t.title}</p>
          <p className={`text-[11px] font-semibold truncate ${featured ? 'text-alta-blue' : 'text-alta-blue/70'}`}>{t.company}</p>
        </div>
      </div>

      <a
        href="#contact"
        className={`text-[12px] font-semibold flex items-center gap-1 transition-colors duration-150 hover:underline underline-offset-2 ${featured ? 'text-alta-blue' : 'text-slate-600 hover:text-slate-400'}`}
      >
        Read Case Study <ArrowRight size={11} />
      </a>
    </article>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const len = TESTIMONIALS.length;
  const prev = () => setCurrent((c) => (c === 0 ? len - 1 : c - 1));
  const next = () => setCurrent((c) => (c === len - 1 ? 0 : c + 1));
  const visible = [TESTIMONIALS[current], TESTIMONIALS[(current + 1) % len], TESTIMONIALS[(current + 2) % len]];

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #03080F 0%, #0A1628 100%)' }}
      aria-label="Client testimonials"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-alta-blue/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="text-center mb-14">
          <p className="overline-tag justify-center text-alta-blue mb-3">Client Voices</p>
          <h2 className="section-heading-light">Trusted by Ethiopia's<br className="hidden sm:block" /> Leading Organizations</h2>
          <p className="section-subheading-light mx-auto text-center">
            Enterprise decision-makers across banking, government, and telecom share their experience.
          </p>
        </div>

        {/* Desktop 3-up */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mb-8">
          {visible.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} featured={i === 0} />
          ))}
        </div>

        {/* Mobile single */}
        <div className="lg:hidden mb-8">
          <TestimonialCard t={TESTIMONIALS[current]} featured />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pagination">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  i === current ? 'w-6 h-2 bg-alta-green-light' : 'w-2 h-2 bg-white/15 hover:bg-white/25'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-selected={i === current}
                role="tab"
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
            aria-label="Next testimonial"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        {/* Client trust bar */}
        <div className="mt-14 pt-8 border-t border-white/6">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-700 mb-6 text-center">
            Trusted By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {CLIENT_LOGOS.map((name) => (
              <span key={name} className="text-slate-700 font-semibold text-[12px] tracking-wide hover:text-slate-500 transition-colors duration-150 cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
