import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LATA_MEGA = [
  { label: 'About LATA',        href: 'https://coffeelata.com/about' },
  { label: 'Coffee Types',      href: 'https://coffeelata.com/coffee' },
  { label: 'Quality Assurance', href: 'https://coffeelata.com/quality' },
  { label: 'Visit Website',     href: 'https://coffeelata.com/' },
];

const NAV_ITEMS = [
  {
    label: 'Solutions',
    columns: [
      {
        heading: 'By Service',
        links: [
          { label: 'IT Infrastructure & Networking', to: '/solutions#infrastructure', desc: 'Data centers, LAN/WAN, servers' },
          { label: 'Banking Automation & ATM', to: '/solutions#banking', desc: 'ATM deployment, cash management' },
          { label: 'Cloud & Virtualization', to: '/solutions#cloud', desc: 'Private cloud, VMware, hybrid' },
          { label: 'Cybersecurity', to: '/solutions#cybersecurity', desc: 'SOC, endpoint, network security' },
        ],
      },
      {
        heading: 'By Outcome',
        links: [
          { label: 'Enterprise Software & AI', to: '/solutions#software', desc: 'Oracle ERP, Microsoft, analytics' },
          { label: 'Smart Office & Collaboration', to: '/solutions#smartoffice', desc: 'SHARP displays, unified comms' },
          { label: 'Consulting & Advisory', to: '/solutions#consulting', desc: 'Architecture, strategy, planning' },
          { label: 'View All Solutions', to: '/solutions', highlight: true },
        ],
      },
    ],
  },
  {
    label: 'Products',
    isProducts: true,
  },
  {
    label: 'Industries',
    columns: [
      {
        heading: 'By Sector',
        links: [
          { label: 'Banking & Financial Services', to: '/industries#banking', desc: 'CBE, DBE, Awash Bank' },
          { label: 'Government & Public Sector', to: '/industries#government', desc: 'Ministries, agencies' },
          { label: 'Telecom & ISP', to: '/industries#telecom', desc: 'Ethio Telecom, ISPs' },
        ],
      },
      {
        heading: 'More Sectors',
        links: [
          { label: 'Education & NGO', to: '/industries#education' },
          { label: 'Energy & Utilities', to: '/industries#energy' },
          { label: 'View All Industries', to: '/industries', highlight: true },
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
          { label: 'Banking & Financial Services', to: '/case-studies', desc: 'CBE, DBE, Awash Bank' },
          { label: 'Government & Public Sector', to: '/case-studies', desc: 'Ministries, agencies' },
          { label: 'Telecom & ISP', to: '/case-studies', desc: 'Ethio Telecom, ISPs' },
        ],
      },
      {
        heading: 'More Sectors',
        links: [
          { label: 'Education & NGO', to: '/case-studies' },
          { label: 'Energy & Utilities', to: '/case-studies' },
          { label: 'View All 640+ Projects', to: '/case-studies', highlight: true },
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
          { label: 'About Alta', to: '/about', desc: '30 years, 470+ clients' },
          { label: 'Our Team', to: '/about', desc: '130+ certified engineers' },
          { label: 'Company History', to: '/about', desc: '1994 to present' },
          { label: 'Careers', to: '/careers', desc: 'Join our team' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'News & Events', to: '/blog' },
          { label: 'Blog & Insights', to: '/blog' },
          { label: 'Contact Us', to: '/contact' },
        ],
      },
    ],
  },
  {
    label: 'Group',
    isGroup: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openMenu = (label) => { clearTimeout(timeoutRef.current); setActiveMenu(label); };
  const closeMenu = () => { timeoutRef.current = setTimeout(() => setActiveMenu(null), 120); };

  const linkBase = scrolled ? 'text-slate-600 hover:text-navy-900' : 'text-slate-300 hover:text-white';

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass-light shadow-nav' : 'bg-transparent'}`}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue" aria-label="ALTA Computec PLC — Home">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 shadow-md border border-white/10">
                <img src="/alta_computec.jpg" alt="ALTA Computec PLC" className="w-full h-full object-cover" width="36" height="36" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className={`font-black text-[15px] tracking-tight leading-none ${scrolled ? 'text-navy-900' : 'text-white'}`}>ALTA</span>
                <span className={`text-[9px] font-bold tracking-[0.18em] uppercase leading-none ${scrolled ? 'text-slate-400' : 'text-slate-500'}`}>Computec PLC</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative" onMouseEnter={() => openMenu(item.label)} onMouseLeave={closeMenu}>
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${linkBase} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue`}
                    aria-expanded={activeMenu === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''} ${scrolled ? 'text-slate-400' : 'text-slate-500'}`} />
                  </button>

                  {activeMenu === item.label && item.isProducts && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      style={{ animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                      role="region" aria-label="Products menu"
                    >
                      <div className="h-0.5 bg-gradient-to-r from-alta-blue via-alta-sky to-alta-green-light" />
                      <div className="grid grid-cols-3 gap-0 p-5">
                        {[
                          { heading: 'Client Products', links: ['Desktop','Laptop','Copier','Printer','Scanner','Projector','Toners','External Drive','Flash Drive','Accessories'] },
                          { heading: 'Enterprise & Power', links: ['Server','Storage','Workstation','Switch','Router','Firewall','Server Rack','Backup Device','UPS','Surge Protector'] },
                          { heading: 'Specialised', links: ['ATM','POS','Smart Screen','Headset','Infrastructure','Software','Service'] },
                        ].map((col, ci) => (
                          <div key={col.heading} className={ci === 0 ? 'pr-4 border-r border-slate-100' : ci === 1 ? 'px-4 border-r border-slate-100' : 'pl-4'}>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-3 px-2">{col.heading}</p>
                            <ul className="space-y-0.5">
                              {col.links.map(link => (
                                <li key={link}>
                                  <Link to="/products" onClick={() => setActiveMenu(null)}
                                    className="block px-2 py-1.5 rounded-lg text-[13px] text-slate-600 hover:text-navy-900 hover:bg-slate-50 transition-colors duration-150">
                                    {link}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Ethiopia's #1 Enterprise IT Partner since 1994</span>
                        <Link to="/contact" onClick={() => setActiveMenu(null)} className="text-[11px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                          Get a Quote <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeMenu === item.label && item.isGroup && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[680px] bg-navy-900 rounded-2xl shadow-2xl border border-white/8 overflow-hidden"
                      style={{ animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)', backdropFilter: 'blur(20px)' }}
                      role="region" aria-label="Group menu"
                    >
                      <div className="h-0.5 bg-gradient-to-r from-alta-blue via-alta-amber to-amber-400" />
                      <div className="grid grid-cols-2 gap-0 p-5">
                        <div className="pr-5 border-r border-slate-700">
                          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-1">Technology &amp; IT Solutions</p>
                          <p className="text-white font-bold text-[17px] mb-0.5 tracking-tight">ALTA Computec PLC</p>
                          <p className="text-slate-400 text-[12px] mb-3 leading-snug">Ethiopia's #1 enterprise IT partner. Dell Platinum. 30 years.</p>
                          <ul className="space-y-1 mb-4">
                            {[{label:'Solutions',to:'/solutions'},{label:'Products',to:'/products'},{label:'Case Studies',to:'/case-studies'},{label:'Contact',to:'/contact'}].map(l => (
                              <li key={l.label}>
                                <Link to={l.to} onClick={() => setActiveMenu(null)}
                                  className="flex items-center gap-1.5 text-[13px] text-slate-300 hover:text-white transition-colors duration-150 py-1">
                                  <ArrowRight size={11} className="text-slate-600" /> {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">Since 1994</span>
                        </div>
                        <div className="pl-5">
                          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-amber-500 mb-1">Ethiopian Coffee Export</p>
                          <p className="text-white font-bold text-[17px] mb-0.5 tracking-tight">LATA Agri Export</p>
                          <p className="text-slate-400 text-[12px] mb-3 leading-snug">World-class Ethiopian green coffee exported globally.</p>
                          <div className="flex items-center gap-2 text-amber-400 text-[12px] mb-3">
                            <span>☕</span>
                            <span className="font-medium">Sidamo · Limmu · Specialty</span>
                          </div>
                          <ul className="space-y-1 mb-4">
                            {LATA_MEGA.map(l => (
                              <li key={l.label}>
                                <a href={l.href} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-[13px] text-amber-300 hover:text-amber-100 transition-colors duration-150 py-1">
                                  <ArrowRight size={11} className="text-amber-600" /> {l.label}
                                  <ArrowRight size={10} className="ml-auto opacity-50" />
                                </a>
                              </li>
                            ))}
                          </ul>
                          <a href="https://coffeelata.com/" target="_blank" rel="noopener noreferrer"
                            className="text-amber-400 text-[12px] font-medium hover:text-amber-200 transition-colors">
                            Visit coffeelata.com →
                          </a>
                        </div>
                      </div>
                      <div className="px-5 py-2.5 border-t border-slate-700">
                        <span className="text-[11px] text-slate-500">Part of the ALTA Group — Addis Ababa, Ethiopia</span>
                      </div>
                    </div>
                  )}

                  {activeMenu === item.label && !item.isProducts && !item.isGroup && item.columns && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      style={{ animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                      role="region"
                      aria-label={`${item.label} menu`}
                    >
                      <div className="h-0.5 bg-gradient-to-r from-alta-blue via-alta-sky to-alta-green-light" />
                      <div className="grid grid-cols-2 gap-0 p-5">
                        {item.columns.map((col, ci) => (
                          <div key={col.heading} className={ci === 0 ? 'pr-4 border-r border-slate-100' : 'pl-4'}>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-3 px-2">{col.heading}</p>
                            <ul className="space-y-0.5">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    to={link.to}
                                    onClick={() => setActiveMenu(null)}
                                    className={`group flex flex-col px-2 py-2 rounded-xl transition-all duration-150 ${link.highlight ? 'hover:bg-blue-50' : 'hover:bg-slate-50'}`}
                                  >
                                    <span className={`flex items-center gap-1.5 text-[13px] font-medium ${link.highlight ? 'text-alta-blue font-semibold' : 'text-slate-700 group-hover:text-navy-900'}`}>
                                      {link.label}
                                      {link.badge && <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{link.badge}</span>}
                                      {link.highlight && <ArrowRight size={11} className="ml-auto opacity-60" />}
                                    </span>
                                    {link.desc && <span className="text-[11px] text-slate-400 mt-0.5 leading-tight">{link.desc}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Ethiopia's #1 Enterprise IT Partner since 1994</span>
                        <Link to="/contact" onClick={() => setActiveMenu(null)} className="text-[11px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                          Get a Quote <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <a href="tel:+251115502928" className={`flex items-center gap-1.5 text-[13px] font-medium px-3 py-2 rounded-lg transition-colors duration-150 ${linkBase}`} aria-label="Call ALTA Computec">
                <Phone size={13} aria-hidden="true" />
                <span className="hidden xl:inline">+251-115-50-29-28</span>
              </a>
              <div className={`w-px h-4 ${scrolled ? 'bg-slate-200' : 'bg-white/15'}`} aria-hidden="true" />
              <button className={`text-[12px] font-medium px-2 py-1.5 rounded-lg transition-colors duration-150 ${linkBase}`} aria-label="Switch language">EN | AM</button>
              <Link to="/contact" className="btn-primary !text-[13px] !px-4 !py-2.5 ml-1" style={{ minHeight: '38px' }}>
                Get a Quote <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile Hamburger */}
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

        {activeMenu && <div className="hidden lg:block fixed inset-0 top-[68px] bg-navy-950/20 backdrop-blur-[2px] -z-10" onMouseEnter={() => setActiveMenu(null)} />}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy-950 overflow-y-auto lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/8">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                <img src="/alta_computec.jpg" alt="ALTA Computec PLC" className="w-full h-full object-cover" width="36" height="36" />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-black text-[15px] text-white tracking-tight">ALTA</span>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-slate-500">Computec PLC</span>
              </div>
            </Link>
            <button className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          <nav className="px-4 py-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-white/6">
                {item.isGroup ? (
                  <Link to="/group" className="flex items-center py-4 text-white font-semibold text-[15px]" onClick={() => setMobileOpen(false)}>Group</Link>
                ) : item.isProducts ? (
                  <Link to="/products" className="flex items-center py-4 text-white font-semibold text-[15px]" onClick={() => setMobileOpen(false)}>Products</Link>
                ) : (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-4 text-white font-semibold text-[15px] focus-visible:outline-none"
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      aria-expanded={mobileExpanded === item.label}
                    >
                      {item.label}
                      <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === item.label && item.columns && (
                      <div className="pb-4 space-y-5">
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-600 mb-2 px-1">{col.heading}</p>
                            {col.links.map((link) => (
                              <Link
                                key={link.label}
                                to={link.to}
                                className={`flex items-center min-h-[48px] py-2.5 px-2 text-[14px] rounded-xl transition-colors duration-150 ${link.highlight ? 'text-alta-blue font-semibold' : 'text-slate-300 hover:text-white'}`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <div className="pt-6 pb-8 space-y-3">
              <Link to="/contact" className="btn-primary w-full justify-center text-[15px]" onClick={() => setMobileOpen(false)}>
                Get a Quote <ArrowRight size={16} />
              </Link>
              <a href="tel:+251115502928" className="flex items-center justify-center gap-2 text-slate-400 text-sm py-3 min-h-[48px] hover:text-white transition-colors">
                <Phone size={15} /> +251-115-50-29-28
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
