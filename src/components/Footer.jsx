import { Linkedin, Twitter, Facebook, Youtube, ArrowRight, Phone, Mail, MapPin, Clock, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Solutions: [
    { label: 'IT Infrastructure & Networking', to: '/solutions#infrastructure' },
    { label: 'Banking Automation & ATM', to: '/solutions#banking' },
    { label: 'Cloud & Virtualization', to: '/solutions#cloud' },
    { label: 'Cybersecurity', to: '/solutions#cybersecurity' },
    { label: 'Smart Office & Collaboration', to: '/solutions#smartoffice' },
  ],
  Products: [
    { label: 'Dell Servers & Storage', to: '/products' },
    { label: 'Cisco Networking', to: '/products' },
    { label: 'Oracle Software', to: '/products' },
    { label: 'HP Enterprise', to: '/products' },
    { label: 'View All Partners →', to: '/products' },
  ],
  Company: [
    { label: 'About Alta', to: '/about' },
    { label: 'Our Team', to: '/about' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Careers', to: '/careers' },
    { label: 'Blog & Insights', to: '/blog' },
  ],
};

const SOFTWARE_LINKS = [
  { label: 'Software Division', to: '/software-division' },
  { label: 'AI as a Service',   to: '/software-division#ai' },
  { label: 'ERP Solutions',     to: '/software-division#erp' },
  { label: 'Web & Apps',        to: '/software-division#webdev' },
  { label: 'Database',          to: '/software-division#database' },
  { label: 'Cybersecurity',     to: '/software-division#cyber' },
  { label: 'Training Center',   to: '/software-division#training' },
];

const SOCIAL = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/alta-computec', color: '#0A66C2', bg: 'rgba(10,102,194,0.12)', border: 'rgba(10,102,194,0.25)' },
  { icon: Twitter,  label: 'Twitter / X', href: 'https://twitter.com/altacomputec', color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)', border: 'rgba(29,161,242,0.25)' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/altacomputec', color: '#1877F2', bg: 'rgba(24,119,242,0.12)', border: 'rgba(24,119,242,0.25)' },
  { icon: Youtube,  label: 'YouTube', href: 'https://youtube.com/@altacomputec', color: '#FF0000', bg: 'rgba(255,0,0,0.12)', border: 'rgba(255,0,0,0.25)' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-navy-950" role="contentinfo" aria-label="Site footer">
      {/* Gradient separator */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #1B4FD8 30%, #22C55E 70%, transparent 100%)' }} aria-hidden="true" />
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <Link to="/" className="flex items-center mb-4 w-fit">
                <img src="/alta_logo_light.svg" alt="ALTA Computec PLC" className="h-14 w-auto" width="190" height="56" />
              </Link>
              <p className="text-[13px] text-slate-500 leading-relaxed">Smart IT. Strategic Partnership. Scalable Success.</p>
              <p className="text-[12px] text-slate-700 mt-2">Ethiopia's #1 Enterprise IT Partner since 1994.</p>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {SOCIAL.map(({ icon: Icon, label, href, color, bg, border }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
                    style={{ 
                      background: bg, 
                      border: `1px solid ${border}`,
                      '--hover-bg': color,
                      '--hover-shadow': color
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = color;
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.boxShadow = `0 8px 20px -4px ${color}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = bg;
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={label}
                  >
                    <Icon size={18} style={{ color }} className="transition-colors duration-300 group-hover:!text-white" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/8 border border-amber-500/15">
              <span className="text-amber-400 text-[11px] font-black">★</span>
              <span className="text-amber-400/80 text-[11px] font-semibold">Dell Platinum Partner</span>
            </div>

            {/* ALTA Group */}
            <div className="border-t border-slate-800 pt-4">
              <p className="text-[10px] font-bold tracking-wider uppercase text-slate-500 mb-2">ALTA Group</p>
              <div className="flex items-center gap-1.5">
                <Coffee size={12} className="text-amber-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-slate-600 text-xs">LATA Agri Export —</span>
                <a
                  href="https://coffeelata.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 text-xs transition-colors duration-150"
                >
                  coffeelata.com
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="overline-tag !text-slate-500">{heading}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[13px] text-slate-600 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Software & AI column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="overline-tag" style={{ color: '#6366F1' }}>Software &amp; AI</p>
              <span
                className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full w-fit"
                style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818CF8' }}
              >
                New Division
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {SOFTWARE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded"
                    style={{ color: link.label === 'Software Division' ? '#818CF8' : undefined }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#818CF8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = link.label === 'Software Division' ? '#818CF8' : ''; }}
                  >
                    {link.label === 'Software Division' ? (
                      <span className="font-semibold flex items-center gap-1">
                        {link.label} <ArrowRight size={11} />
                      </span>
                    ) : (
                      <span className="text-slate-600 hover:text-white transition-colors">{link.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <p className="overline-tag !text-slate-500">Contact</p>
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
            <Link to="/contact" className="flex items-center gap-1.5 text-[13px] font-semibold text-alta-green-light hover:text-green-400 transition-colors duration-150 mt-1">
              Get a Quote <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust badge pills */}
      <div className="border-t border-white/6">
        <div className="section-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Dell Platinum Partner', color: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', text: '#F59E0B' },
              { label: 'ISO 9001 Certified',    color: 'rgba(27,79,216,0.10)',  border: 'rgba(27,79,216,0.25)',  text: '#60A5FA' },
              { label: 'Cisco Premier',          color: 'rgba(14,165,233,0.10)', border: 'rgba(14,165,233,0.25)', text: '#38BDF8' },
              { label: '30+ Years in Business',  color: 'rgba(22,163,74,0.10)',  border: 'rgba(22,163,74,0.25)',  text: '#4ADE80' },
              { label: 'Govt. Registered',       color: 'rgba(99,102,241,0.10)', border: 'rgba(99,102,241,0.25)', text: '#A5B4FC' },
            ].map((b) => (
              <span
                key={b.label}
                className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                style={{ background: b.color, border: `1px solid ${b.border}`, color: b.text }}
              >
                {b.label}
              </span>
            ))}
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
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {['Privacy Policy', 'Terms of Use'].map((item) => (
                <a key={item} href="#" className="text-[12px] text-slate-700 hover:text-slate-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded">
                  {item}
                </a>
              ))}
              <span className="text-slate-800 text-[12px]">·</span>
              <span
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(27,79,216,0.10)', border: '1px solid rgba(27,79,216,0.2)', color: '#60A5FA' }}
              >
                WCAG 2.1 AA
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
