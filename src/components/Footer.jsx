import { Linkedin, Twitter, Facebook, Youtube, ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

const FOOTER_LINKS = {
  Solutions: [
    { label: 'IT Infrastructure & Networking', href: '#solutions' },
    { label: 'Banking Automation & ATM', href: '#solutions' },
    { label: 'Cloud & Virtualization', href: '#solutions' },
    { label: 'Cybersecurity', href: '#solutions' },
    { label: 'Smart Office & Collaboration', href: '#solutions' },
  ],
  Products: [
    { label: 'Dell Servers & Storage', href: '#partners' },
    { label: 'Cisco Networking', href: '#partners' },
    { label: 'Oracle Software', href: '#partners' },
    { label: 'HP Enterprise', href: '#partners' },
    { label: 'View All Partners →', href: '#partners' },
  ],
  Company: [
    { label: 'About Alta', href: '#about' },
    { label: 'Our Team', href: '#about' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Careers', href: '#about' },
    { label: 'Blog & Insights', href: '#blog' },
  ],
};

const SOCIAL = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-navy-950 border-t border-white/6" role="contentinfo" aria-label="Site footer">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-white/10">
                  <img src="/alta_computec.jpg" alt="ALTA Computec PLC" className="w-full h-full object-cover" width="40" height="40" />
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="font-black text-[16px] text-white tracking-tight">ALTA</span>
                  <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-slate-600">Computec PLC</span>
                </div>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Smart IT. Strategic Partnership. Scalable Success.
              </p>
              <p className="text-[12px] text-slate-700 mt-2">
                Ethiopia's #1 Enterprise IT Partner since 1994.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-600 hover:text-white hover:border-white/15 hover:bg-white/10 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
                  aria-label={label}
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/8 border border-amber-500/15">
              <span className="text-amber-400 text-[11px] font-black">★</span>
              <span className="text-amber-400/80 text-[11px] font-semibold">Dell Platinum Partner</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">{heading}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-slate-600 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">Contact</p>
            <div className="flex flex-col gap-3.5">
              <a href="tel:+251115502928" className="flex items-start gap-3 text-[13px] text-slate-600 hover:text-white transition-colors duration-150 group" aria-label="Call ALTA Computec">
                <Phone size={14} className="text-alta-blue flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" aria-hidden="true" />
                <span>+251-115-50-29-28</span>
              </a>
              <a href="mailto:info@altacomputec.com" className="flex items-start gap-3 text-[13px] text-slate-600 hover:text-white transition-colors duration-150 group" aria-label="Email ALTA Computec">
                <Mail size={14} className="text-alta-blue flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" aria-hidden="true" />
                <span>info@altacomputec.com</span>
              </a>
              <a href="https://maps.google.com/?q=Mexico+Square+Addis+Ababa" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[13px] text-slate-600 hover:text-white transition-colors duration-150 group" aria-label="View on Google Maps">
                <MapPin size={14} className="text-alta-blue flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" aria-hidden="true" />
                <span>Mexico Road, Chad St., ALTA Building, Addis Ababa, Ethiopia</span>
              </a>
              <div className="flex items-start gap-3 text-[13px] text-slate-700">
                <Clock size={14} className="text-slate-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Mon–Fri: 8:00 AM – 6:00 PM EAT</span>
              </div>
            </div>
            <a href="#contact" className="flex items-center gap-1.5 text-[13px] font-semibold text-alta-green-light hover:text-green-400 transition-colors duration-150 mt-1">
              Get a Quote <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="section-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-slate-700 text-center sm:text-left">
              © {year} ALTA Computec PLC. All rights reserved.
            </p>
            <div className="flex items-center gap-5 flex-wrap justify-center">
              {['Privacy Policy', 'Terms of Use', 'WCAG Compliance'].map((item) => (
                <a key={item} href="#" className="text-[12px] text-slate-700 hover:text-slate-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
