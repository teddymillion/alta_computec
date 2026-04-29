import { useState, useRef } from 'react';
import { ChevronDown, Play, ArrowRight, CheckCircle2 } from 'lucide-react';

function CompanyVideoPlayer() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-navy-950 aspect-video group"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(27,79,216,0.12)' }}
    >
      <video
        ref={videoRef}
        src="/Alta video.mp4"
        poster="/alta tumbnail.png"
        className="w-full h-full object-cover"
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        preload="metadata"
        playsInline
        controls={playing}
        aria-label="ALTA Computec Company Story video"
      />

      {!playing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-800/60 to-navy-950/85">
          <div className="absolute inset-0 bg-dot-pattern opacity-20" aria-hidden="true" />
          <button
            onClick={handlePlay}
            className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-alta-green/40 transition-transform duration-200 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #16A34A, #22C55E)',
              boxShadow: '0 0 0 8px rgba(34,197,94,0.12), 0 8px 32px rgba(22,163,74,0.4)',
            }}
            aria-label="Play ALTA Computec company story video"
          >
            <Play size={26} className="text-white fill-white ml-1.5" aria-hidden="true" />
          </button>
          <div className="relative z-10 text-center">
            <p className="text-white font-bold text-[15px] tracking-tight">ALTA Computec — Company Story</p>
            <p className="text-slate-400 text-[12px] mt-1">30 Years of Enterprise IT Excellence in Ethiopia</p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="text-[11px] font-semibold text-slate-400 bg-navy-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/5">Company Story</span>
            <span className="text-[11px] font-semibold text-alta-green bg-navy-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-alta-green/20">▶ Play Video</span>
          </div>
        </div>
      )}
    </div>
  );
}

const DIFFERENTIATORS = [
  {
    title: "Ethiopia's Only Dell Platinum Partner",
    body: "The highest tier in Dell's global partner program — awarded exclusively to ALTA Computec PLC in Ethiopia. This designation requires demonstrated technical expertise, certified engineers, and a proven track record of enterprise deployments.",
    accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)',
    dot: 'bg-amber-400',
  },
  {
    title: '130+ Engineers On-Staff',
    body: 'Our team of 130+ certified technology professionals spans networking, cloud, cybersecurity, software, and infrastructure disciplines — providing end-to-end delivery without subcontracting.',
    accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)', accentBorder: 'rgba(27,79,216,0.35)',
    dot: 'bg-alta-blue',
  },
  {
    title: '30-Year Local Market Knowledge',
    body: "Founded in Addis Ababa in 1994, ALTA has navigated every phase of Ethiopia's technology evolution. We understand local procurement, regulatory requirements, and institutional relationships that no foreign vendor can replicate.",
    accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)', accentBorder: 'rgba(22,163,74,0.35)',
    dot: 'bg-alta-green',
  },
  {
    title: 'Multi-Vendor Certified — No Lock-In',
    body: 'With official partnerships across Dell, Cisco, Oracle, Microsoft, HP, Kaspersky, IBM, and more, we architect solutions using the best technology for each requirement — not the technology we\'re incentivized to sell.',
    accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)',
    dot: 'bg-alta-indigo',
  },
];

const MILESTONES = [
  { year: '1994', label: 'Founded', detail: 'Established in Addis Ababa with ETB 100,000 capital', active: false },
  { year: '2003', label: 'Dell Platinum', detail: "Awarded Ethiopia's first and only Dell Platinum Partnership", active: false },
  { year: '2024', label: '640+ Projects', detail: '470+ enterprise clients, 130+ engineers, USD $25M revenue', active: true },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-100 dark:border-white/6 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded-lg px-1 group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-4">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.accent, opacity: isOpen ? 1 : 0.4 }} aria-hidden="true" />
          <span className="font-semibold text-[14px] transition-colors duration-150 text-navy-900 dark:text-slate-200" style={{ color: isOpen ? item.accent : undefined }}>
            {item.title}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={`text-slate-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="pb-4 pl-5 pr-1">
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.body}</p>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="about" className="section-padding bg-white dark:bg-navy-950" aria-label="About ALTA Computec">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="overline-tag mb-3">Our Story</p>
              <h2 className="section-heading">30 Years Building Ethiopia's Digital Infrastructure</h2>
            </div>

            <div className="flex flex-col gap-4 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.75]">
              <p>
                ALTA Computec PLC was founded in 1994 in Addis Ababa with a single conviction: that Ethiopian enterprises deserve world-class technology infrastructure, delivered by people who understand the local context. Starting with ETB 100,000 in capital, we built the company project by project, client by client.
              </p>
              <p>
                Today, we are Ethiopia's most decorated enterprise IT company — the country's only Dell Platinum Partner, a Cisco Premier Partner, Oracle Gold Partner, and Kaspersky Platinum Partner. Our 130+ engineers have delivered 640+ projects across banking, government, telecom, education, and energy sectors.
              </p>
              <p>
                Our mission has never changed: to be the strategic technology partner that Ethiopian institutions trust with their most critical infrastructure — not just for a project, but for decades.
              </p>
            </div>

            {/* Why Alta accordion */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-4">Why Alta?</p>
              <div className="rounded-2xl border-2 overflow-hidden divide-y divide-slate-100 dark:divide-white/6 bg-white dark:bg-navy-900 transition-all duration-250" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {DIFFERENTIATORS.map((item, i) => (
                  <div key={item.title} className="px-4 group" onMouseEnter={(e) => {
                    const parent = e.currentTarget.closest('.rounded-2xl');
                    if (parent) {
                      parent.style.borderColor = item.accent;
                      parent.style.boxShadow = `0 12px 32px ${item.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${item.accentBorder}`;
                    }
                  }} onMouseLeave={(e) => {
                    const parent = e.currentTarget.closest('.rounded-2xl');
                    if (parent) {
                      parent.style.borderColor = 'rgba(226,232,240,0.8)';
                      parent.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                    }
                  }}>
                    <AccordionItem
                      item={item}
                      isOpen={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <a href="#contact" className="btn-primary dark:btn-primary self-start">
              Learn Our Full Story <ArrowRight size={15} />
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            {/* Company Story Video */}
            <CompanyVideoPlayer />

            {/* Timeline */}
            <div className="rounded-2xl border-2 p-6 bg-white dark:bg-navy-900 transition-all duration-250" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-6">Company Milestones</p>
              <div className="relative">
                <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-alta-blue via-slate-200 to-alta-green" aria-hidden="true" />
                <div className="flex flex-col gap-6">
                  {MILESTONES.map((m, i) => (
                    <div key={m.year} className="flex items-start gap-4 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all duration-200 ${
                        m.active
                          ? 'bg-alta-green border-alta-green shadow-glow-green'
                          : 'bg-slate-100 dark:bg-navy-900 border-alta-blue'
                      }`}>
                        <span className={`text-[10px] font-black ${m.active ? 'text-white' : 'text-alta-blue'}`}>
                          {m.year.slice(2)}
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-bold text-slate-400">{m.year}</span>
                          <span className={`text-[14px] font-bold ${m.active ? 'text-alta-green' : 'text-navy-900 dark:text-white'}`}>{m.label}</span>
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
      </div>
    </section>
  );
}
