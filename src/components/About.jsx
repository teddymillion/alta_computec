import { useState } from 'react';
import { ChevronDown, Play, ArrowRight, CheckCircle2 } from 'lucide-react';

const DIFFERENTIATORS = [
  {
    title: "Ethiopia's Only Dell Platinum Partner",
    body: "The highest tier in Dell's global partner program — awarded exclusively to ALTA Computec PLC in Ethiopia. This designation requires demonstrated technical expertise, certified engineers, and a proven track record of enterprise deployments.",
    accent: 'text-amber-500',
    dot: 'bg-amber-400',
  },
  {
    title: '130+ Engineers On-Staff',
    body: 'Our team of 130+ certified technology professionals spans networking, cloud, cybersecurity, software, and infrastructure disciplines — providing end-to-end delivery without subcontracting.',
    accent: 'text-alta-blue',
    dot: 'bg-alta-blue',
  },
  {
    title: '30-Year Local Market Knowledge',
    body: "Founded in Addis Ababa in 1994, ALTA has navigated every phase of Ethiopia's technology evolution. We understand local procurement, regulatory requirements, and institutional relationships that no foreign vendor can replicate.",
    accent: 'text-alta-green',
    dot: 'bg-alta-green',
  },
  {
    title: 'Multi-Vendor Certified — No Lock-In',
    body: 'With official partnerships across Dell, Cisco, Oracle, Microsoft, HP, Kaspersky, IBM, and more, we architect solutions using the best technology for each requirement — not the technology we\'re incentivized to sell.',
    accent: 'text-alta-indigo',
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
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded-lg px-1 group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-4">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot} ${isOpen ? 'opacity-100' : 'opacity-40'} transition-opacity duration-200`} aria-hidden="true" />
          <span className={`font-semibold text-[14px] transition-colors duration-150 ${isOpen ? item.accent : 'text-navy-900 group-hover:text-alta-blue'}`}>
            {item.title}
          </span>
        </div>
        <ChevronDown
          size={15}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="pb-4 pl-5 pr-1">
          <p className="text-[13px] text-slate-500 leading-relaxed">{item.body}</p>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="about" className="section-padding bg-white" aria-label="About ALTA Computec">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="overline-tag mb-3">Our Story</p>
              <h2 className="section-heading">30 Years Building Ethiopia's Digital Infrastructure</h2>
            </div>

            <div className="flex flex-col gap-4 text-[14px] text-slate-600 leading-[1.75]">
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
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-4">Why Alta?</p>
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-100" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                {DIFFERENTIATORS.map((item, i) => (
                  <div key={item.title} className="px-4">
                    <AccordionItem
                      item={item}
                      isOpen={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <a href="#contact" className="btn-outline self-start">
              Learn Our Full Story <ArrowRight size={15} />
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            {/* Video placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-navy-900 border border-navy-800 aspect-video group cursor-pointer" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800/50 to-navy-950/80" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <button
                  className="relative w-16 h-16 rounded-full bg-alta-green flex items-center justify-center shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-alta-green/30 transition-all duration-200 group-hover:scale-110 group-hover:shadow-glow-green"
                  aria-label="Play ALTA Computec company video"
                >
                  <span className="absolute inset-0 rounded-full bg-alta-green-light opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                  <Play size={22} className="text-white fill-white ml-1" aria-hidden="true" />
                </button>
                <div className="text-center">
                  <p className="text-white font-semibold text-[14px]">ALTA Computec — Company Story</p>
                  <p className="text-slate-400 text-[12px] mt-1">30 Years of Enterprise IT Excellence in Ethiopia</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 bg-navy-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">4:32 min</span>
                <span className="text-[11px] text-slate-500 bg-navy-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">YouTube</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-slate-200/80 p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-6">Company Milestones</p>
              <div className="relative">
                <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-alta-blue via-slate-200 to-alta-green" aria-hidden="true" />
                <div className="flex flex-col gap-6">
                  {MILESTONES.map((m, i) => (
                    <div key={m.year} className="flex items-start gap-4 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all duration-200 ${
                        m.active
                          ? 'bg-alta-green border-alta-green shadow-glow-green'
                          : 'bg-white border-alta-blue'
                      }`}>
                        <span className={`text-[10px] font-black ${m.active ? 'text-white' : 'text-alta-blue'}`}>
                          {m.year.slice(2)}
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-bold text-slate-400">{m.year}</span>
                          <span className="text-[14px] font-bold text-navy-900">{m.label}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-relaxed">{m.detail}</p>
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
