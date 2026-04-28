import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const LATA_MEGA = [
  { label: 'About LATA',        href: 'https://coffeelata.com/about' },
  { label: 'Coffee Types',      href: 'https://coffeelata.com/coffee' },
  { label: 'Quality Assurance', href: 'https://coffeelata.com/quality' },
  { label: 'Visit Website',     href: 'https://coffeelata.com/' },
];

const NAV_ITEMS = [
  {
    label: 'Solutions',
    activeFor: ['/solutions'],
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
  { label: 'Products', isProducts: true, activeFor: ['/products'] },
  {
    label: 'Industries',
    activeFor: ['/industries'],
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
    activeFor: ['/case-studies'],
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
    activeFor: ['/about', '/careers', '/blog'],
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
  { label: 'Group', isGroup: true, activeFor: ['/group'] },
];

const DARK_MEGA_STYLE = {
  background: 'rgba(3,8,15,0.96)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(27,79,216,0.25)',
  borderTop: '2px solid #1B4FD8',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (item) => item.activeFor?.some((path) => location.pathname.startsWith(path));

  const scrolledBg = {
    background: 'rgba(3,8,15,0.92)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        className="fixed top-0 inset-x-0 z-30 transition-all duration-300"
        style={scrolled ? scrolledBg : {}}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
              aria-label="ALTA Computec PLC — Home"
            >
              <img
                src="/alta_logo_light.svg"
                alt="ALTA Computec PLC"
                className="h-8 w-auto"
                width="160"
                height="68"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center min-w-0 mx-2" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                return (
                  <div key={item.label} className="relative" onMouseEnter={() => openMenu(item.label)} onMouseLeave={closeMenu}>
                    <button
                      className={`relative flex items-center gap-1 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                        item.isGroup
                          ? 'text-amber-400 hover:text-amber-300'
                          : active
                          ? 'text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      aria-expanded={activeMenu === item.label}
                      aria-haspopup="true"
                    >
                      {active && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-alta-green-light" aria-hidden="true" />
                      )}
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 text-slate-500 ${activeMenu === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Products mega menu */}
                    {activeMenu === item.label && item.isProducts && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[680px] rounded-2xl shadow-2xl overflow-hidden"
                        style={{ ...DARK_MEGA_STYLE, animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                        role="region"
                        aria-label="Products menu"
                      >
                        <div className="grid grid-cols-3 gap-0 p-5">
                          {[
                            { heading: 'Client Products', links: ['Desktop','Laptop','Copier','Printer','Scanner','Projector','Toners','External Drive','Flash Drive','Accessories','Spare Parts'] },
                            { heading: 'Enterprise & Power', links: ['Server','Storage','Workstation','Switch','Router','Firewall','Server Rack','Backup Device','UPS','Surge Protector'] },
                            { heading: 'Specialised + Solutions', links: ['ATM','POS','Smart Screen','Headset','Infrastructure','Consultancy','Software','Technical Support'] },
                          ].map((col, ci) => (
                            <div key={col.heading} className={ci === 0 ? 'pr-4 border-r border-white/8' : ci === 1 ? 'px-4 border-r border-white/8' : 'pl-4'}>
                              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-3 px-2">{col.heading}</p>
                              <ul className="space-y-0.5">
                                {col.links.map(link => (
                                  <li key={link}>
                                    <Link
                                      to="/products"
                                      onClick={() => setActiveMenu(null)}
                                      className="block px-2 py-1.5 rounded-lg text-[13px] text-slate-400 hover:text-white hover:bg-white/6 transition-colors duration-150"
                                    >
                                      {link}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="px-5 py-3 border-t border-white/6 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <span className="text-[11px] text-slate-500">Ethiopia's #1 Enterprise IT Partner since 1994</span>
                          <Link to="/contact" onClick={() => setActiveMenu(null)} className="text-[11px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                            Get a Quote <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Group mega menu */}
                    {activeMenu === item.label && item.isGroup && (
                      <div
                        className="absolute top-full right-0 mt-1.5 w-[640px] rounded-2xl shadow-2xl overflow-hidden"
                        style={{ ...DARK_MEGA_STYLE, borderTop: '2px solid #F59E0B', animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                        role="region"
                        aria-label="Group menu"
                      >
                        <div className="grid grid-cols-2 gap-0 p-5">
                          {/* ALTA Computec */}
                          <div className="pr-5 border-r border-white/8">
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-1">Technology & IT Solutions</p>
                            <p className="text-white font-bold text-[17px] mb-0.5 tracking-tight">ALTA Computec PLC</p>
                            <p className="text-slate-400 text-[12px] mb-3 leading-snug">Ethiopia's #1 enterprise IT partner. Dell Platinum. 30 years.</p>
                            <ul className="space-y-1 mb-4">
                              {[{label:'Solutions',to:'/solutions'},{label:'Products',to:'/products'},{label:'Case Studies',to:'/case-studies'},{label:'Contact',to:'/contact'}].map(l => (
                                <li key={l.label}>
                                  <Link to={l.to} onClick={() => setActiveMenu(null)} className="flex items-center gap-1.5 text-[13px] text-slate-300 hover:text-white transition-colors duration-150 py-1">
                                    <ArrowRight size={11} className="text-slate-600" /> {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white">Since 1994</span>
                          </div>
                          {/* LATA */}
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
                                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[13px] text-amber-300 hover:text-amber-100 transition-colors duration-150 py-1">
                                    <ArrowRight size={11} className="text-amber-600" /> {l.label}
                                    <ArrowRight size={10} className="ml-auto opacity-50" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <Link to="/group" onClick={() => setActiveMenu(null)} className="text-amber-400 text-[12px] font-semibold hover:text-amber-200 transition-colors">
                              View LATA Page →
                            </Link>
                          </div>
                        </div>
                        <div className="px-5 py-2.5 border-t border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <span className="text-[11px] text-slate-500">Part of the ALTA Group — Addis Ababa, Ethiopia</span>
                        </div>
                      </div>
                    )}

                    {/* Standard mega menu */}
                    {activeMenu === item.label && !item.isProducts && !item.isGroup && item.columns && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[520px] rounded-2xl shadow-2xl overflow-hidden"
                        style={{ ...DARK_MEGA_STYLE, animation: 'slideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                        role="region"
                        aria-label={`${item.label} menu`}
                      >
                        <div className="grid grid-cols-2 gap-0 p-5">
                          {item.columns.map((col, ci) => (
                            <div key={col.heading} className={ci === 0 ? 'pr-4 border-r border-white/8' : 'pl-4'}>
                              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-3 px-2">{col.heading}</p>
                              <ul className="space-y-0.5">
                                {col.links.map((link) => (
                                  <li key={link.label}>
                                    <Link
                                      to={link.to}
                                      onClick={() => setActiveMenu(null)}
                                      className={`group flex flex-col px-2 py-2 rounded-xl transition-all duration-150 ${link.highlight ? 'hover:bg-alta-blue/10' : 'hover:bg-white/5'}`}
                                    >
                                      <span className={`flex items-center gap-1.5 text-[13px] font-medium ${link.highlight ? 'text-alta-blue font-semibold' : 'text-slate-300 group-hover:text-white'}`}>
                                        {link.label}
                                        {link.highlight && <ArrowRight size={11} className="ml-auto opacity-60" />}
                                      </span>
                                      {link.desc && <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">{link.desc}</span>}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="px-5 py-3 border-t border-white/6 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <span className="text-[11px] text-slate-500">Ethiopia's #1 Enterprise IT Partner since 1994</span>
                          <Link to="/contact" onClick={() => setActiveMenu(null)} className="text-[11px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                            Get a Quote <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
              <a href="tel:+251115502928" className="flex items-center gap-1 text-[12px] font-medium px-2 py-1.5 rounded-lg transition-colors duration-150 text-slate-300 hover:text-white" aria-label="Call ALTA Computec">
                <Phone size={12} aria-hidden="true" />
              </a>
              <ThemeToggle />
              <Link to="/contact" className="btn-primary !text-[12px] !px-3.5 !py-2 whitespace-nowrap" style={{ minHeight: '34px' }}>
                Get a Quote
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue text-white hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {activeMenu && (
          <div className="hidden lg:block fixed inset-0 top-[68px] bg-navy-950/20 backdrop-blur-[2px] -z-10" onMouseEnter={() => setActiveMenu(null)} />
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            background: 'rgba(3,8,15,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/8">
            <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/alta_logo_light.svg" alt="ALTA Computec PLC" className="h-8 w-auto" width="160" height="68" />
            </Link>
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
                {item.isGroup ? (
                  <Link to="/group" className="flex items-center py-4 text-amber-400 font-semibold text-[15px]" onClick={() => setMobileOpen(false)}>
                    ☕ Group
                  </Link>
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
                <Phone size={15} /> +251 11 550 2928
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
