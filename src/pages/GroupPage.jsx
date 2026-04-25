import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Globe, CheckCircle, ExternalLink, ChevronRight, Coffee, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const ALTA_STATS = [
  { value: '30+',      label: 'Years' },
  { value: '640+',     label: 'Projects' },
  { value: '470+',     label: 'Clients' },
  { value: 'Platinum', label: 'Dell Tier' },
];

const LATA_STATS = [
  { value: '5',        label: 'Export Markets' },
  { value: 'Washed &', label: 'Unwashed' },
  { value: 'Sidamo',   label: '& Limmu' },
  { value: 'Quality',  label: 'Certified' },
];

const SHARED_VALUES = [
  { icon: MapPin,  color: 'text-alta-green',  bg: 'bg-green-50',  title: 'One Address',    desc: 'ALTA Building, Mexico Square, Addis Ababa, Ethiopia — both companies, one roof.' },
  { icon: Shield,  color: 'text-alta-blue',   bg: 'bg-blue-50',   title: 'One Standard',   desc: '"Professional Service, Best Quality, Timely Delivery" — the motto that defines both brands.' },
  { icon: Globe,   color: 'text-alta-amber',  bg: 'bg-amber-50',  title: 'Global Reach',   desc: 'Enterprise IT across Ethiopia. Ethiopian coffee across four continents.' },
];

const LATA_LINKS = [
  { label: 'About LATA',        href: 'https://coffeelata.com/about' },
  { label: 'Coffee Types',      href: 'https://coffeelata.com/coffee' },
  { label: 'Quality Assurance', href: 'https://coffeelata.com/quality' },
  { label: 'Visit Website',     href: 'https://coffeelata.com/' },
];

export default function GroupPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PageLayout>
      <PageHero
        breadcrumb="Group"
        title="The ALTA Group"
        subtitle="Two industry-leading companies. One shared commitment to Ethiopian excellence."
      />

      {/* Section 1 — Two Company Cards */}
      <section className="section-padding bg-white border-t border-slate-100">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* ALTA Computec */}
            <div className="card-light rounded-2xl p-7 flex flex-col border-t-4 border-alta-blue">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-50 text-alta-blue border border-blue-100">
                  Technology &amp; IT Solutions
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Est. 1994</span>
              </div>
              <h2 className="text-2xl font-bold text-navy-900 tracking-tight mb-4">ALTA Computec PLC</h2>
              <p className="text-slate-500 text-[15px] leading-[1.7] mb-6">
                Ethiopia's #1 enterprise IT partner for over 30 years. The country's only Dell Platinum Partner, serving banks, government ministries, and telecoms with world-class technology solutions.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {ALTA_STATS.map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-alta-blue leading-none">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
              <ul className="flex flex-col gap-2 mb-7 flex-1">
                {['IT Infrastructure & Networking', 'Custom Software Development', 'Cybersecurity Solutions', 'Banking Automation & ATM'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle size={15} className="text-alta-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/" className="btn-primary self-start">
                Explore ALTA Computec <ArrowRight size={14} />
              </Link>
            </div>

            {/* LATA Agri Export */}
            <div className="card-light rounded-2xl p-7 flex flex-col border-t-4 border-amber-600">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                  Ethiopian Coffee Export
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">Est. 1994</span>
              </div>
              <h2 className="text-2xl font-bold text-navy-900 tracking-tight mb-4">LATA Agri Export</h2>
              <p className="text-slate-500 text-[15px] leading-[1.7] mb-6">
                World-class Ethiopian green coffee exported to the USA, Europe, Japan, South Korea, and the Middle East. Specialising in Washed &amp; Unwashed Sidamo and Ethiopia Washed Limmu.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {LATA_STATS.map((s) => (
                  <div key={s.label} className="bg-amber-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-amber-700 leading-none">{s.value}</div>
                    <div className="text-xs text-amber-600 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
              <ul className="flex flex-col gap-2 mb-7 flex-1">
                {['Washed Sidamo', 'Washed Limmu', 'Specialty Grades', 'Direct Export'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Coffee size={15} className="text-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="https://coffeelata.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 self-start">
                Visit LATA Agri Export <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Shared Identity */}
      <section className="section-padding bg-navy-900 bg-dot-pattern border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Shared Identity</p>
            <h2 className="section-heading-light mt-3">Two Companies. One Building. One Standard.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SHARED_VALUES.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="card-dark p-7 flex flex-col gap-5">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={28} className={color} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-[1.7]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — LATA Spotlight */}
      <section className="section-padding bg-white border-t border-slate-100">
        <div className="section-container">
          <div className="card-light rounded-2xl p-8 border-l-4 border-amber-500">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Coffee size={28} className="text-amber-500" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-900 tracking-tight">Discover LATA Agri Export</h2>
                </div>
                <p className="text-slate-500 text-[15px] leading-[1.7] mb-5">
                  LATA Agri Export is Ethiopia's trusted green coffee exporter, bringing the finest Sidamo and Limmu coffees to discerning buyers around the world. Founded alongside ALTA Computec in 1994, LATA shares the same commitment to professionalism and quality.
                </p>
                <ul className="flex flex-col gap-2.5 mb-6">
                  {['Washed & Unwashed Sidamo coffee', 'Ethiopia Washed Limmu specialty grades', 'Markets: USA, Europe, Japan, S. Korea, Middle East'].map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-amber-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href="https://coffeelata.com/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5">
                  Visit coffeelata.com <ExternalLink size={14} />
                </a>
              </div>

              <div className="bg-gradient-to-br from-amber-900 to-amber-700 rounded-2xl p-6 text-white">
                <div className="mb-4">
                  <div className="text-amber-300 text-[10px] font-bold tracking-widest uppercase mb-1">Sister Company</div>
                  <div className="text-2xl font-bold text-white tracking-tight">coffeelata.com</div>
                </div>
                <ul className="flex flex-col gap-3 mb-5">
                  {LATA_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-amber-200 hover:text-white text-sm transition-colors duration-150 group">
                        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        {label}
                        <ExternalLink size={11} className="ml-auto opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-amber-600/50 pt-4 flex items-center gap-1.5 text-amber-300 text-xs">
                  <ExternalLink size={11} /> Opens in a new window
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — CTA */}
      <section className="section-padding bg-navy-950 border-t border-white/6">
        <div className="section-container text-center">
          <p className="overline-tag justify-center mb-3">Get in Touch</p>
          <h2 className="section-heading-light mt-3 mb-4">Interested in working with the ALTA Group?</h2>
          <p className="section-subheading-light mx-auto mb-8">
            Whether you need enterprise IT or premium Ethiopian coffee — we're here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact ALTA <ArrowRight size={14} />
            </Link>
            <a href="https://coffeelata.com/contact-us/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Contact LATA <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
