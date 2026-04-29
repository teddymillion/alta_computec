import { Link } from 'react-router-dom';
import { ArrowRight, Brain, ShieldCheck, Code2, Sparkles } from 'lucide-react';

const PILLS = [
  { icon: Brain,       label: 'AI as a Service',   color: '#818CF8' },
  { icon: Code2,       label: 'Custom Software',    color: '#0EA5E9' },
  { icon: ShieldCheck, label: 'Cybersecurity',      color: '#F59E0B' },
  { icon: Sparkles,    label: 'ERP Solutions',      color: '#22C55E' },
];

export default function DivisionAnnouncement() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="New Software & AI Division announcement"
    >
      {/* Full-width gradient band */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #060D1A 0%, #0D1B2E 40%, #0A1628 70%, #060D1A 100%)',
        }}
        aria-hidden="true"
      />
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
      {/* Indigo glow left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Green glow right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Top + bottom separator lines */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 30%, rgba(34,197,94,0.4) 70%, transparent 100%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(27,79,216,0.3) 50%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-14 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">

          {/* Left — text content */}
          <div className="flex flex-col gap-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(27,79,216,0.10))',
                  border: '1px solid rgba(99,102,241,0.35)',
                  boxShadow: '0 0 12px rgba(99,102,241,0.10)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#818CF8', boxShadow: '0 0 6px #818CF8', animation: 'pulse 2s ease-in-out infinite' }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: '#818CF8' }}>
                  New Division — Now Live
                </span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-black text-white leading-[1.1] tracking-tight">
                Introducing Alta Computec's{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #22C55E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Software &amp; AI Division
                </span>
              </h2>
              <p className="text-[15px] text-slate-400 mt-3 max-w-xl leading-relaxed">
                From hardware to AI — Ethiopia's most complete technology partner. AI as a Service, ERP, cybersecurity, custom software, and the country's best ICT training center.
              </p>
            </div>

            {/* Service pills */}
            <div className="flex flex-wrap gap-2">
              {PILLS.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    color,
                  }}
                >
                  <Icon size={12} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA card */}
          <div
            className="flex flex-col gap-4 p-6 rounded-2xl flex-shrink-0 lg:min-w-[260px]"
            style={{
              background: 'rgba(13,27,46,0.8)',
              border: '1px solid rgba(99,102,241,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Mini visual — animated rings */}
            <div className="flex items-center justify-center h-16" aria-hidden="true">
              <div className="relative w-12 h-12">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px solid rgba(99,102,241,0.3)', animation: 'ping 2.5s ease-in-out infinite' }}
                />
                <div
                  className="absolute inset-1 rounded-full"
                  style={{ border: '1px solid rgba(99,102,241,0.5)', animation: 'ping 2.5s ease-in-out infinite 0.5s' }}
                />
                <div
                  className="absolute inset-2 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)' }}
                >
                  <Brain size={16} style={{ color: '#818CF8' }} />
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[13px] font-bold text-white">Explore the Division</p>
              <p className="text-[11px] text-slate-500 mt-0.5">AI · ERP · Cyber · Training</p>
            </div>

            <Link
              to="/software-division"
              className="btn-primary w-full justify-center text-[13px]"
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
              }}
            >
              Discover Now <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
