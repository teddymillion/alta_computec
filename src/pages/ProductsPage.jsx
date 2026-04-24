import { useState } from 'react';
import { Award, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const TIER1 = [
  { name: 'Dell', img: '/dell.png', tier: 'Platinum Partner', badge: 'tier-platinum', note: "Ethiopia's Only", glow: 'rgba(37,99,235,0.15)', accent: '#2563EB', desc: 'Highest tier in Dell\'s global partner program — exclusive to ALTA in Ethiopia.' },
  { name: 'Cisco', img: '/cisco.png', tier: 'Premier Partner', badge: 'tier-premier', note: 'Certified', glow: 'rgba(2,132,199,0.15)', accent: '#0284C7', desc: 'Enterprise networking, SD-WAN, and security solutions.' },
  { name: 'Oracle', img: '/oracle.png', tier: 'Gold Partner', badge: 'tier-gold', note: 'Certified', glow: 'rgba(220,38,38,0.12)', accent: '#DC2626', desc: 'ERP, HCM, analytics, and database solutions.' },
  { name: 'Kaspersky', img: '/kaspersky.png', tier: 'Platinum Partner', badge: 'tier-platinum', note: 'Certified', glow: 'rgba(22,163,74,0.15)', accent: '#16A34A', desc: 'Enterprise endpoint security and threat intelligence.' },
];

const TIER2 = [
  { name: 'IBM', img: '/ibm.png' }, { name: 'Microsoft', img: '/microsoft.png' }, { name: 'HP', img: '/hp.png' },
  { name: 'Huawei', img: '/huawei.jpg' }, { name: 'Fortinet', img: '/fortinet.png' }, { name: 'Lenovo', img: '/lenovo.png' },
  { name: 'Eaton', img: '/eaton.png' }, { name: 'Vertiv', img: '/vertive.png' }, { name: 'SHARP', img: '/sharp.png', exclusive: true },
  { name: 'Diebold Nixdorf', img: '/diebold.png' }, { name: 'Jabra', img: '/jabra.png' }, { name: 'Poly', img: '/poly.png' },
  { name: 'Epson', img: '/epson.png' }, { name: 'Backbase', img: '/backbase.png' }, { name: 'Symantec', img: '/symante.png' },
];

const CATEGORIES = ['All', 'Servers & Storage', 'Networking', 'Security', 'Power & UPS', 'Collaboration', 'Software'];

const PRODUCTS = [
  { name: 'Dell PowerEdge R750', brand: '/dell.png', brandName: 'Dell', cat: 'Servers & Storage', specs: ['3rd Gen Intel Xeon Scalable', 'Up to 3TB DDR4 RAM', 'NVMe SSD & SAS options'] },
  { name: 'Dell PowerVault ME5', brand: '/dell.png', brandName: 'Dell', cat: 'Servers & Storage', specs: ['12Gb/s SAS connectivity', 'Up to 5PB raw capacity', 'Automated storage tiering'] },
  { name: 'HP ProLiant DL380 Gen11', brand: '/hp.png', brandName: 'HP', cat: 'Servers & Storage', specs: ['Dual Intel Xeon processors', 'HPE iLO 6 management', 'Hot-plug SAS/SATA drives'] },
  { name: 'IBM FlashSystem 5200', brand: '/ibm.png', brandName: 'IBM', cat: 'Servers & Storage', specs: ['NVMe all-flash storage', '99.9999% availability', 'AI-powered management'] },
  { name: 'Cisco Catalyst 9300', brand: '/cisco.png', brandName: 'Cisco', cat: 'Networking', specs: ['48-port PoE+ switching', 'SD-Access ready', 'Cisco DNA Center managed'] },
  { name: 'Cisco ISR 4000 Router', brand: '/cisco.png', brandName: 'Cisco', cat: 'Networking', specs: ['Integrated security services', 'SD-WAN capable', 'Gigabit throughput'] },
  { name: 'Huawei CloudEngine S5735', brand: '/huawei.jpg', brandName: 'Huawei', cat: 'Networking', specs: ['48-port enterprise switch', '10GE uplink ports', 'Smart management platform'] },
  { name: 'Fortinet FortiGate 200F', brand: '/fortinet.png', brandName: 'Fortinet', cat: 'Networking', specs: ['Next-gen firewall', 'SD-WAN integrated', '20Gbps firewall throughput'] },
  { name: 'Kaspersky Endpoint Security Cloud', brand: '/kaspersky.png', brandName: 'Kaspersky', cat: 'Security', specs: ['EDR & anti-ransomware', 'Cloud management console', 'Multi-platform protection'] },
  { name: 'Fortinet FortiGate NGFW', brand: '/fortinet.png', brandName: 'Fortinet', cat: 'Security', specs: ['IPS & SSL inspection', 'Zero-trust network access', 'Threat intelligence feeds'] },
  { name: 'Cisco Firepower 1140', brand: '/cisco.png', brandName: 'Cisco', cat: 'Security', specs: ['NGFW with AMP', 'Threat intelligence', 'Centralized management'] },
  { name: 'Symantec Endpoint Protection', brand: '/symante.png', brandName: 'Symantec', cat: 'Security', specs: ['AI-driven detection', 'Multi-layer protection', 'Central management console'] },
  { name: 'Eaton 9SX 6000i UPS', brand: '/eaton.png', brandName: 'Eaton', cat: 'Power & UPS', specs: ['6kVA online double conversion', 'LCD display & monitoring', 'Hot-swappable batteries'] },
  { name: 'Vertiv Liebert GXT5', brand: '/vertive.png', brandName: 'Vertiv', cat: 'Power & UPS', specs: ['10kVA online UPS', 'Remote monitoring card', 'Scalable runtime'] },
  { name: 'Eaton 93PM UPS', brand: '/eaton.png', brandName: 'Eaton', cat: 'Power & UPS', specs: ['10–200kW 3-phase UPS', 'Modular & scalable', 'High efficiency mode'] },
  { name: 'Vertiv VRC Precision Cooling', brand: '/vertive.png', brandName: 'Vertiv', cat: 'Power & UPS', specs: ['10kW precision cooling', 'In-row deployment', 'Remote monitoring'] },
  { name: 'SHARP AQUOS BOARD 8K', brand: '/sharp.png', brandName: 'SHARP', cat: 'Collaboration', specs: ['8K resolution display', '4K writing capability', 'Wireless screen share'] },
  { name: 'SHARP Big Pad PN-L803C', brand: '/sharp.png', brandName: 'SHARP', cat: 'Collaboration', specs: ['80-inch 4K display', '20-point multi-touch', 'Windows collaboration'] },
  { name: 'Jabra PanaCast 50', brand: '/jabra.png', brandName: 'Jabra', cat: 'Collaboration', specs: ['4K AI panoramic camera', '180° field of view', 'USB & BYOD compatible'] },
  { name: 'Poly Studio X70', brand: '/poly.png', brandName: 'Poly', cat: 'Collaboration', specs: ['4K dual camera system', 'AI noise cancellation', 'Teams & Zoom certified'] },
  { name: 'Oracle Fusion ERP', brand: '/oracle.png', brandName: 'Oracle', cat: 'Software', specs: ['Cloud ERP platform', 'Finance, HR & supply chain', 'Ethiopian compliance ready'] },
  { name: 'Microsoft 365 Enterprise', brand: '/microsoft.png', brandName: 'Microsoft', cat: 'Software', specs: ['Full Office app suite', 'Microsoft Teams & Azure AD', '1TB OneDrive per user'] },
  { name: 'Kaspersky Total Security Enterprise', brand: '/kaspersky.png', brandName: 'Kaspersky', cat: 'Software', specs: ['Multi-platform protection', 'Centralized management', 'MDM & mobile security'] },
  { name: 'Backbase Digital Banking', brand: '/backbase.png', brandName: 'Backbase', cat: 'Software', specs: ['Core banking UI platform', 'Mobile-first architecture', 'API-first integration'] },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCategory);

  return (
    <PageLayout>
      <PageHero
        breadcrumb="Products"
        title="Enterprise Hardware & Software from the World's Leading Brands"
        subtitle="As Ethiopia's only Dell Platinum Partner and authorized reseller for 15+ global brands, ALTA delivers certified, warranty-backed products with local support."
      />

      {/* Dell Platinum Spotlight */}
      <section className="py-12" style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)' }}>
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Award size={28} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-amber-200 text-[11px] font-bold tracking-widest uppercase mb-1">Exclusive Designation</p>
                <h2 className="text-white font-black text-[22px] leading-tight">Ethiopia's ONLY Dell Platinum Partner</h2>
                <p className="text-amber-200/80 text-[13px] mt-1 max-w-lg">The highest tier in Dell's global partner program — meaning priority pricing, factory-certified engineers, and direct Dell engineering support for every project.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              {['Priority Pricing', 'Factory-Certified Engineers', 'Direct Dell Support'].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full bg-white text-navy-900 font-semibold text-[12px]">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partner Grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Our Authorized Portfolio</p>
            <h2 className="section-heading">15+ Global Technology Brands</h2>
          </div>

          {/* Tier 1 */}
          <div className="mb-10">
            <div className="divider-label mb-7">
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 whitespace-nowrap">Platinum & Premier Partners</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TIER1.map((p) => (
                <div
                  key={p.name}
                  className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 transition-all duration-250 hover:-translate-y-1 cursor-default overflow-hidden"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px ${p.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: p.accent }} aria-hidden="true" />
                  <div className="w-full h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-250 px-4">
                    <img src={p.img} alt={`${p.name} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="font-bold text-navy-900 text-[14px]">{p.name}</span>
                    <span className={`tier-badge ${p.badge}`}>{p.tier}</span>
                    {p.note && <span className="text-[10px] text-slate-400 font-medium">{p.note}</span>}
                    <p className="text-[11px] text-slate-500 leading-relaxed text-center">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div>
            <div className="divider-label mb-6">
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 px-4 whitespace-nowrap">Authorized Partners</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
              {TIER2.map((p) => (
                <div key={p.name} className="group flex flex-col items-center gap-3 p-5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-default">
                  <div className="w-full h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 px-2">
                    <img src={p.img} alt={`${p.name} logo`} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-200" loading="lazy" />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-600 text-center leading-tight">{p.name}</span>
                  {p.exclusive && <span className="text-[9px] font-bold text-amber-600">Exclusive</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding bg-slate-50/80">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="overline-tag justify-center mb-3">Product Catalogue</p>
            <h2 className="section-heading">Browse Our Product Range</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  activeCategory === c ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-600 border-slate-200 hover:border-alta-blue hover:text-alta-blue'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <div key={product.name} className="card-light flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-navy-900 text-[14px] leading-snug">{product.name}</h3>
                  <img src={product.brand} alt={product.brandName} className="h-8 max-w-[64px] object-contain flex-shrink-0" loading="lazy" />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 self-start">{product.cat}</span>
                <ul className="flex flex-col gap-1.5 flex-1">
                  {product.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-[12px] text-slate-500">
                      <span className="w-1 h-1 rounded-full bg-alta-blue flex-shrink-0 mt-1.5" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <Link to="/contact" className="btn-outline !text-[12px] !px-3 !py-2 flex-1 justify-center" style={{ minHeight: '36px' }}>
                    Request Quote
                  </Link>
                  <a href="#" className="btn-ghost !text-[12px] !px-3 !py-2 flex items-center gap-1" style={{ minHeight: '36px' }}>
                    <Download size={12} /> Datasheet
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ Form */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="text-center mb-8">
            <p className="overline-tag justify-center text-alta-blue mb-3">Request a Quote</p>
            <h2 className="section-heading-light">Need a Formal Quotation for Procurement?</h2>
            <p className="section-subheading-light mx-auto text-center">Used by government procurement offices and enterprise buyers across Ethiopia.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="form-label">Full Name *</label><input type="text" required className="form-input" placeholder="Tadesse Bekele" /></div>
                <div><label className="form-label">Organisation *</label><input type="text" required className="form-input" placeholder="Commercial Bank of Ethiopia" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="form-label">Email *</label><input type="email" required className="form-input" placeholder="tadesse@org.com" /></div>
                <div><label className="form-label">Phone</label><input type="tel" className="form-input" placeholder="+251 911 000 000" /></div>
              </div>
              <div>
                <label className="form-label">Product Category</label>
                <select className="form-input">
                  <option value="">Select category</option>
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="form-label">Products of Interest</label><textarea rows={3} className="form-input resize-none" placeholder="List the specific products or models you need..." /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Quantity Estimate</label>
                  <input type="text" className="form-input" placeholder="e.g. 10 units" />
                </div>
                <div>
                  <label className="form-label">Additional Notes</label>
                  <input type="text" className="form-input" placeholder="Delivery timeline, budget, etc." />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full justify-center text-[15px] py-4 mt-2">
                Submit RFQ <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
