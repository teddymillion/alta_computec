import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, ArrowRight, Zap } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Solutions',
    columns: [
      {
        heading: 'By Service',
        links: [
          { label: 'IT Infrastructure & Networking', href: '#solutions', desc: 'Data centers, LAN/WAN, servers' },
          { label: 'Banking Automation & ATM', href: '#solutions', desc: 'ATM deployment, cash management' },
          { label: 'Cloud & Virtualization', href: '#solutions', desc: 'Private cloud, VMware, hybrid' },
          { label: 'Cybersecurity', href: '#solutions', desc: 'SOC, endpoint, network security' },
        ],
      },
      {
        heading: 'By Outcome',
        links: [
          { label: 'Enterprise Software & AI', href: '#solutions', desc: 'Oracle ERP, Microsoft, analytics' },
          { label: 'Smart Office & Collaboration', href: '#solutions', desc: 'SHARP displays, unified comms' },
          { label: 'Consulting & Advisory', href: '#solutions', desc: 'Architecture, strategy, planning' },
          { label: 'View All Solutions', href: '#solutions', highlight: true },
        ],
      },
    ],
  },
  {
    label: 'Products',
    columns: [
      {
        heading: 'Hardware',
        links: [
          { label: 'Dell Servers & Storage', href: '#partners', desc: 'PowerEdge, PowerStore, VxRail' },
          { label: 'Cisco Networking', href: '#partners', desc: 'Catalyst, Meraki, Nexus' },
          { label: 'HP Enterprise', href: '#partners', desc: 'ProLiant, Aruba, Nimble' },
          { label: 'Huawei', href: '#partners', desc: 'OceanStor, CloudEngine' },
        ],
      },
      {
        heading: 'Software & Security',
        links: [
          { label: 'Oracle Software', href: '#partners', desc: 'Database, ERP, Analytics' },
          { label: 'Microsoft', href: '#partners', desc: 'Azure, M365, Dynamics' },
          { label: 'Kaspersky Security', href: '#partners', desc: 'EDR, SIEM, threat intel' },
          { label: 'View All Brands', href: '#partners', highlight: true },
        ],
      },
    ],
  },
  {
    label: 'Partners',
    columns: [
      {
        heading: 'Platinum & Premier',
        links: [
          { label: 'Dell — Platinum Partner', href: '#partners', badge: "Ethiopia's Only", desc: 'Highest Dell tier — exclusive' },
          { label: 'Cisco — Premier Partner', href: '#partners', desc: 'Enterprise networking certified' },
          { label: 'Oracle — Gold Partner', href: '#partners', desc: 'ERP & analytics certified' },
          { label: 'Kaspersky — Platinum', href: '#partners', desc: 'Enterprise security certified' },
        ],
      },
      {
        heading: 'Authorized Partners',
        links: [
          { label: 'IBM', href: '#partners' },
          { label: 'Microsoft', href: '#partners' },
          { label: 'SHARP — Exclusive Ethiopia', href: '#partners' },
          { label: 'View All 15+ Partners', href: '#partners', highlight: true },
        ],
      },
    ],
  },
  {
    label: 'Case Studies',
    columns: [
      {
        heading: 'By Sector',
        links: [
          { label: 'Banking & Financial Services', href: '#case-studies', desc: 'CBE, DBE, Awash Bank' },
          { label: 'Government & Public Sector', href: '#case-studies', desc: 'Ministries, agencies' },
          { label: 'Telecom & ISP', href: '#case-studies', desc: 'Ethio Telecom, ISPs' },
        ],
      },
      {
        heading: 'More Sectors',
        links: [
          { label: 'Education & NGO', href: '#case-studies' },
          { label: 'Energy & Utilities', href: '#case-studies' },
          { label: 'View All 640+ Projects', href: '#case-studies', highlight: true },
        ],
      },
    ],
  },
  {
    label: 'Company',
    columns: [
      {
        heading: 'About',
        links: [
          { label: 'About Alta', href: '#about', desc: '30 years, 470+ clients' },
          { label: 'Our Team', href: '#about', desc: '130+ certified engineers' },
          { label: 'Company History', href: '#about', desc: '1994 to present' },
          { label: 'Careers', href: '#about', desc: 'Join our team' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'News & Events', href: '#blog' },
          { label: 'Blog & Insights', href: '#blog' },
          { label: 'Contact Us', href: '#contact' },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const open = (label) => { clearTimeout(timeoutRef.current); setActiveMenu(label); };
  const close = () => { timeoutRef.current = setTimeout(() => setActiveMenu(null), 120); };

  const linkBase = scrolled
    ? 'text-slate-600 hover:text-navy-900'
    : 'text-slate-300 hover:text-white';

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-light shadow-nav' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ── */}
            <a
              href="#"
              className="flex items-center gap-2.5 flex-shrink-0 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
              aria-label="ALTA Computec PLC — Home"
            >
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 shadow-md border border-white/10">
                <img
                  src="/alta_computec.jpg"
                  alt="ALTA Computec PLC"
                  className="w-full h-full object-cover"
                  width="36"
                  height="36"
                />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className={`font-black text-[15px] tracking-tight leading-none ${scrolled ? 'text-navy-900' : 'text-white'}`}>
                  ALTA
                </span>
                <span className={`text-[9px] font-bold tracking-[0.18em] uppercase leading-none ${scrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                  Computec PLC
                </span>
              </div>
            </a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => open(item.label)}
                  onMouseLeave={close}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${linkBase} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue`}
                    aria-expanded={activeMenu === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''} ${scrolled ? 'text-slate-400' : 'text-slate-500'}`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {activeMenu === item.label && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      style={{ animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                      role="region"
                      aria-label={`${item.label} menu`}
                    >
                      {/* Top accent bar */}
                      <div className="h-0.5 bg-gradient-to-r from-alta-blue via-alta-sky to-alta-green-light" />
                      <div className="grid grid-cols-2 gap-0 p-5">
                        {item.columns.map((col, ci) => (
                          <div key={col.heading} className={ci === 0 ? 'pr-4 border-r border-slate-100' : 'pl-4'}>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-3 px-2">
                              {col.heading}
                            </p>
                            <ul className="space-y-0.5">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <a
                                    href={link.href}
                                    className={`group flex flex-col px-2 py-2 rounded-xl transition-all duration-150 ${
                                      link.highlight
                                        ? 'text-alta-blue font-semibold hover:bg-blue-50'
                                        : 'hover:bg-slate-50'
                                    }`}
                                  >
                                    <span className={`flex items-center gap-1.5 text-[13px] font-medium ${link.highlight ? 'text-alta-blue' : 'text-slate-700 group-hover:text-navy-900'}`}>
                                      {link.label}
                                      {link.badge && (
                                        <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                                          {link.badge}
                                        </span>
                                      )}
                                      {link.highlight && <ArrowRight size={11} className="ml-auto opacity-60" />}
                                    </span>
                                    {link.desc && (
                                      <span className="text-[11px] text-slate-400 mt-0.5 leading-tight">{link.desc}</span>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Bottom CTA strip */}
                      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Ethiopia's #1 Enterprise IT Partner since 1994</span>
                        <a href="#contact" className="text-[11px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                          Get a Quote <ArrowRight size={10} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="tel:+251115502928"
                className={`flex items-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg transition-colors duration-150 ${linkBase}`}
                aria-label="Call ALTA Computec"
              >
                <Phone size={13} aria-hidden="true" />
                <span className="hidden xl:inline">+251-115-50-29-28</span>
              </a>
              <div className={`w-px h-4 ${scrolled ? 'bg-slate-200' : 'bg-white/15'}`} aria-hidden="true" />
              <button
                className={`text-[12px] font-medium px-2 py-1.5 rounded-lg transition-colors duration-150 ${linkBase}`}
                aria-label="Switch language"
              >
                EN | AM
              </button>
              <a href="#contact" className="btn-primary !text-[13px] !px-4 !py-2.5 ml-1" style={{ minHeight: '38px' }}>
                Get a Quote <ArrowRight size={13} />
              </a>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${scrolled ? 'text-navy-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mega menu backdrop */}
        {activeMenu && (
          <div
            className="hidden lg:block fixed inset-0 top-[68px] bg-navy-950/20 backdrop-blur-[2px] -z-10"
            onMouseEnter={() => setActiveMenu(null)}
          />
        )}
      </header>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950 overflow-y-auto lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                <img src="/alta_computec.jpg" alt="ALTA Computec PLC" className="w-full h-full object-cover" width="36" height="36" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-black text-[15px] text-white tracking-tight">ALTA</span>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-slate-500">Computec PLC</span>
              </div>
            </div>
            <button
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="px-4 py-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-white/6">
                <button
                  className="w-full flex items-center justify-between py-4 text-white font-semibold text-[15px] focus-visible:outline-none"
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  aria-expanded={mobileExpanded === item.label}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileExpanded === item.label && (
                  <div className="pb-4 space-y-5">
                    {item.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-600 mb-2 px-1">
                          {col.heading}
                        </p>
                        {col.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className={`flex items-center min-h-[48px] py-2.5 px-2 text-[14px] rounded-xl transition-colors duration-150 ${
                              link.highlight ? 'text-alta-blue font-semibold' : 'text-slate-300 hover:text-white'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6 pb-8 space-y-3">
              <a
                href="#contact"
                className="btn-primary w-full justify-center text-[15px]"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote <ArrowRight size={16} />
              </a>
              <a
                href="tel:+251115502928"
                className="flex items-center justify-center gap-2 text-slate-400 text-sm py-3 min-h-[48px] hover:text-white transition-colors"
              >
                <Phone size={15} /> +251-115-50-29-28
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
