import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';

export default function CTABanner() {
  return (
    <section
      id="cta"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0A1628 0%, #03080F 50%, #0D1E38 100%)' }}
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-alta-blue/8 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* Card wrapper with gradient border */}
        <div className="relative rounded-3xl overflow-hidden p-px" style={{ background: 'linear-gradient(135deg, rgba(27,79,216,0.4), rgba(22,163,74,0.2), rgba(27,79,216,0.1))' }}>
          <div className="relative rounded-3xl px-8 py-14 md:px-16 md:py-16 text-center" style={{ background: 'linear-gradient(145deg, #0D1E38 0%, #0A1628 100%)' }}>
            <div className="absolute inset-0 bg-dot-pattern opacity-30 rounded-3xl" aria-hidden="true" />

            <div className="relative max-w-2xl mx-auto flex flex-col gap-7">
              <div>
                <p className="overline-tag justify-center text-alta-blue mb-4">Start Your Project</p>
                <h2 className="text-[36px] sm:text-[42px] font-black text-white leading-tight tracking-tight">
                  Ready to Transform Your<br className="hidden sm:block" /> IT Infrastructure?
                </h2>
                <p className="text-[16px] text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
                  Talk to an expert who has built Ethiopia's most critical technology systems — from central bank data centers to nationwide government networks.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#contact" className="btn-primary text-[15px] px-8 py-4 w-full sm:w-auto justify-center">
                  Request a Proposal <ArrowRight size={15} />
                </a>
                <a href="tel:+251115502928" className="btn-secondary text-[15px] px-8 py-4 w-full sm:w-auto justify-center">
                  <Phone size={15} /> Talk to an Engineer
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5">
                {[
                  'Response within 24 hours',
                  'Free initial consultation',
                  'No commitment required',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-500 text-[13px]">
                    <CheckCircle2 size={13} className="text-alta-green-light flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
