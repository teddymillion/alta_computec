import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Globe, CheckCircle, ExternalLink, ArrowRight, Coffee, Star, Leaf, Award } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const COFFEE_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=90&auto=format&fit=crop';
const BEANS_IMG  = 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=85&auto=format&fit=crop';
const FARM_IMG   = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85&auto=format&fit=crop';
const CUP_IMG    = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85&auto=format&fit=crop';

const LATA_LINKS = [
  { label: 'About LATA',        href: 'https://coffeelata.com/about' },
  { label: 'Coffee Types',      href: 'https://coffeelata.com/coffee' },
  { label: 'Quality Assurance', href: 'https://coffeelata.com/quality' },
  { label: 'Visit Website',     href: 'https://coffeelata.com/' },
];

const ORIGINS = [
  { name: 'Sidamo', note: 'Washed & Unwashed', desc: 'Bright citrus, floral notes, wine-like complexity from the highlands of southern Ethiopia.' },
  { name: 'Limmu',  note: 'Ethiopia Washed',   desc: 'Spiced, winey, full-bodied. One of the most sought-after specialty grades in the world.' },
];

const MARKETS = ['🇺🇸 USA', '🇩🇪 Europe', '🇯🇵 Japan', '🇰🇷 South Korea', '🇸🇦 Middle East'];

const SHARED_VALUES = [
  { icon: MapPin,  color: 'text-alta-green',  bg: 'bg-green-50',  title: 'One Address',  desc: 'ALTA Building, Mexico Square, Addis Ababa — both companies, one roof.' },
  { icon: Shield,  color: 'text-alta-blue',   bg: 'bg-blue-50',   title: 'One Standard', desc: '"Professional Service, Best Quality, Timely Delivery" — the motto that defines both brands.' },
  { icon: Globe,   color: 'text-amber-600',   bg: 'bg-amber-50',  title: 'Global Reach', desc: 'Enterprise IT across Ethiopia. Ethiopian coffee across four continents.' },
];

export default function GroupPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PageLayout>

      {/* ── HERO — Full-bleed cinematic coffee banner ── */}
      <section className="relative h-screen min-h-[600px] max-h-[820px] overflow-hidden flex items-end" aria-label="ALTA Group hero">
        {/* Background image */}
        <img
          src={COFFEE_IMG}
          alt="Ethiopian coffee farm"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 60%' }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,15,0.95) 0%, rgba(3,8,15,0.55) 45%, rgba(3,8,15,0.15) 100%)' }} aria-hidden="true" />
        {/* Subtle warm tint */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.25) 0%, transparent 60%)' }} aria-hidden="true" />

        <div className="relative z-10 section-container pb-16 lg:pb-24 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase" style={{ background: 'rgba(180,83,9,0.3)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
                <Coffee size={11} /> Ethiopian Coffee Export
              </span>
              <span className="text-[11px] text-amber-400/70 font-medium">Est. 1994 · Addis Ababa</span>
            </div>

            {/* Headline */}
            <h1 className="text-[48px] sm:text-[60px] lg:text-[72px] font-black text-white leading-[1.02] tracking-[-0.03em] mb-6">
              LATA<br />
              <span style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Agri Export
              </span>
            </h1>

            <p className="text-[18px] text-slate-300 leading-relaxed max-w-xl mb-8">
              Ethiopia's finest green coffee — Sidamo and Limmu specialty grades — exported to the world's most discerning buyers across five continents.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://coffeelata.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)', boxShadow: '0 4px 20px rgba(180,83,9,0.4)' }}
              >
                Visit coffeelata.com <ExternalLink size={15} />
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              >
                Explore ALTA Computec <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40" aria-hidden="true">
          <div className="w-px h-12 bg-white/50" />
          <span className="text-[10px] text-white tracking-widest uppercase rotate-90 origin-center translate-y-4">Scroll</span>
        </div>
      </section>

      {/* ── LATA Identity Strip ── */}
      <section className="py-10 border-b border-amber-900/20" style={{ background: 'linear-gradient(135deg, #1c0a00 0%, #2d1200 100%)' }}>
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(180,83,9,0.3)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <Coffee size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white font-black text-[18px] tracking-tight leading-none">LATA Agri Export</p>
                <p className="text-amber-400/70 text-[12px] mt-0.5">Sister company of ALTA Computec PLC</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {MARKETS.map((m) => (
                <span key={m} className="text-[13px] font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(251,191,36,0.85)' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Coffee Origins — Artistic 2-col ── */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #0f0500 0%, #1a0800 100%)' }}>
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-4 flex items-center justify-center gap-2">
              <Leaf size={12} /> Single Origin · Specialty Grade
            </p>
            <h2 className="text-[40px] sm:text-[52px] font-black text-white leading-tight tracking-tight">
              From Ethiopia's<br />
              <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Most Celebrated Regions
              </span>
            </h2>
            <p className="text-slate-400 text-[16px] mt-4 max-w-xl mx-auto leading-relaxed">
              Two of the world's most prized coffee origins — grown at altitude, processed with precision, exported with pride.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {ORIGINS.map((o, i) => (
              <div
                key={o.name}
                className="relative overflow-hidden rounded-3xl group"
                style={{ minHeight: 360 }}
              >
                <img
                  src={i === 0 ? BEANS_IMG : FARM_IMG}
                  alt={`${o.name} coffee`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }} aria-hidden="true" />
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: 'rgba(180,83,9,0.4)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
                      {o.note}
                    </span>
                  </div>
                  <h3 className="text-[36px] font-black text-white tracking-tight leading-none mb-3">{o.name}</h3>
                  <p className="text-slate-300 text-[14px] leading-relaxed max-w-sm">{o.desc}</p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} className="text-amber-400 fill-amber-400" aria-hidden="true" />)}
                    <span className="text-amber-400/70 text-[12px] ml-2 font-medium">Specialty Grade</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-bleed cup image with quote ── */}
      <section className="relative overflow-hidden" style={{ height: 480 }}>
        <img src={CUP_IMG} alt="Ethiopian coffee cup" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)' }} aria-hidden="true" />
        <div className="relative z-10 h-full flex items-center section-container">
          <div className="max-w-2xl">
            <div className="w-12 h-0.5 bg-amber-400 mb-6" aria-hidden="true" />
            <blockquote className="text-[28px] sm:text-[36px] font-black text-white leading-tight tracking-tight mb-6">
              "Professional Service. Best Quality. Timely Delivery. Responsiveness."
            </blockquote>
            <p className="text-amber-400 font-semibold text-[14px] tracking-wider uppercase">LATA Agri Export — coffeelata.com</p>
          </div>
        </div>
      </section>

      {/* ── Export Markets + Links ── */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #1a0800 0%, #0f0500 100%)' }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-4">Global Reach</p>
              <h2 className="text-[40px] font-black text-white leading-tight tracking-tight mb-6">
                Exported to<br />Five Continents
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
                From the highlands of southern Ethiopia to the finest roasters in the USA, Europe, Japan, South Korea, and the Middle East — LATA delivers Ethiopian coffee at its absolute best.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {MARKETS.map((m) => (
                  <div key={m} className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="text-[14px] font-semibold text-white">{m}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://coffeelata.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #b45309 0%, #92400e 100%)', boxShadow: '0 4px 20px rgba(180,83,9,0.35)' }}
              >
                Visit coffeelata.com <ExternalLink size={15} />
              </a>
            </div>

            {/* Links card */}
            <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-8 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(180,83,9,0.15)' }}>
                <p className="text-[11px] font-bold tracking-widest uppercase text-amber-500 mb-1">Sister Company</p>
                <p className="text-white font-black text-[22px] tracking-tight">coffeelata.com</p>
              </div>
              <div className="p-6 flex flex-col gap-2">
                {LATA_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-150 group"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,83,9,0.2)'; e.currentTarget.style.borderColor = 'rgba(251,191,36,0.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                  >
                    <span className="text-[14px] font-medium text-slate-300 group-hover:text-white transition-colors duration-150">{label}</span>
                    <ExternalLink size={13} className="text-slate-600 group-hover:text-amber-400 transition-colors duration-150" />
                  </a>
                ))}
              </div>
              <div className="px-6 pb-6">
                <a
                  href="https://coffeelata.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-[14px] text-white transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #b45309, #92400e)' }}
                >
                  Explore Full Website <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shared Identity ── */}
      <section className="section-padding bg-white border-t border-slate-100">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">The ALTA Group</p>
            <h2 className="section-heading">Two Companies. One Building.<br className="hidden sm:block" /> One Standard.</h2>
            <p className="section-subheading mx-auto text-center">
              ALTA Computec and LATA Agri Export — founded together in 1994, operating from the same address in Addis Ababa.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {SHARED_VALUES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="card-light flex flex-col gap-4 p-7">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={24} className={color} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-navy-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two company cards side by side */}
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl p-6 flex items-center gap-5 border border-blue-100" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f8faff 100%)' }}>
              <div className="w-14 h-14 rounded-2xl bg-alta-blue flex items-center justify-center flex-shrink-0 shadow-md">
                <Award size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-navy-900 text-[16px] leading-tight">ALTA Computec PLC</p>
                <p className="text-slate-500 text-[13px] mt-0.5">Ethiopia's #1 Enterprise IT Partner · Dell Platinum</p>
              </div>
              <Link to="/" className="btn-outline !text-[13px] !px-4 !py-2 flex-shrink-0" style={{ minHeight: 38 }}>
                Explore <ArrowRight size={13} />
              </Link>
            </div>
            <div className="rounded-2xl p-6 flex items-center gap-5 border border-amber-200" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fefce8 100%)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg, #b45309, #92400e)' }}>
                <Coffee size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-navy-900 text-[16px] leading-tight">LATA Agri Export</p>
                <p className="text-slate-500 text-[13px] mt-0.5">Ethiopian Specialty Coffee · 5 Export Markets</p>
              </div>
              <a href="https://coffeelata.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold px-4 py-2 rounded-xl text-white flex-shrink-0 transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #b45309, #92400e)', minHeight: 38 }}>
                Visit <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden py-24" style={{ background: 'linear-gradient(135deg, #0f0500 0%, #1a0800 50%, #0A1628 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-20" aria-hidden="true" />
        <div className="section-container relative z-10 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-4">Get in Touch</p>
          <h2 className="text-[40px] font-black text-white leading-tight tracking-tight mb-4">
            Interested in the ALTA Group?
          </h2>
          <p className="text-slate-400 text-[16px] mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you need enterprise IT infrastructure or premium Ethiopian specialty coffee — we're here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary text-[15px] px-8 py-4">
              Contact ALTA Computec <ArrowRight size={15} />
            </Link>
            <a href="https://coffeelata.com/contact-us/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #b45309, #92400e)', boxShadow: '0 4px 20px rgba(180,83,9,0.3)' }}>
              Contact LATA <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

    </PageLayout>
  );
}
