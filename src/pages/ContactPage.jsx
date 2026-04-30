import { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, CheckCircle2, ChevronDown, ArrowRight, Send, Linkedin, Twitter, Facebook, Youtube, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const SOCIAL = [
  { icon: Linkedin, label: 'LinkedIn',   href: 'https://linkedin.com/company/alta-computec', color: '#0A66C2', bg: 'rgba(10,102,194,0.12)',  border: 'rgba(10,102,194,0.25)' },
  { icon: Twitter,  label: 'Twitter / X', href: 'https://twitter.com/altacomputec',           color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)',  border: 'rgba(29,161,242,0.25)' },
  { icon: Facebook, label: 'Facebook',   href: 'https://facebook.com/altacomputec',           color: '#1877F2', bg: 'rgba(24,119,242,0.12)',  border: 'rgba(24,119,242,0.25)' },
  { icon: Youtube,  label: 'YouTube',    href: 'https://youtube.com/@altacomputec',           color: '#FF0000', bg: 'rgba(255,0,0,0.12)',     border: 'rgba(255,0,0,0.25)' },
];
const FAQS = [
  { q: 'How quickly can ALTA respond to a request for quotation?', a: 'Our sales team typically responds to RFQs within 24 hours on business days. For urgent government procurement deadlines, same-day response is available by calling directly.' },
  { q: 'Do you serve clients outside Addis Ababa?', a: 'Yes. ALTA has delivered projects across Ethiopia including Dire Dawa, Hawassa, Bahir Dar, Mekelle, and Jimma. We also support clients in neighbouring East African countries.' },
  { q: 'What is the minimum project size ALTA works with?', a: 'We work with projects of all sizes, from single hardware purchases to multi-million ETB enterprise infrastructure rollouts. SME-focused packages are also available.' },
  { q: 'Do you provide after-sales support and maintenance?', a: 'All ALTA deployments include a post-delivery support period. We offer tiered SLA packages for ongoing maintenance, remote monitoring, and on-site response.' },
  { q: 'Are you certified for government procurement in Ethiopia?', a: 'Yes. ALTA is a registered supplier for Ethiopian government procurement. We hold all required certifications and have delivered projects for multiple federal ministries.' },
  { q: 'Can I request a site visit or on-site consultation?', a: 'Yes. Our solutions architects are available for on-site visits in Addis Ababa. For locations outside the capital, we schedule visits based on project scope.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const body = Object.fromEntries(new FormData(e.target));

    const fe = {};
    if (!body.firstName?.trim())   fe.firstName    = 'First name is required';
    if (!body.lastName?.trim())    fe.lastName     = 'Last name is required';
    if (!body.organisation?.trim()) fe.organisation = 'Organisation is required';
    if (!body.message?.trim())     fe.message      = 'Project brief is required';
    if (Object.keys(fe).length) { setFieldErrors(fe); return; }
    setFieldErrors({});

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch { /* non-JSON */ }
      if (!res.ok) throw new Error(data.message || `Server error (${res.status}). Please try again or call us directly.`);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageLayout>
      <PageHero breadcrumb="Contact" title="Let's Build Something Extraordinary Together" subtitle="Our team of 130+ engineers and specialists is ready to help with your next project." />

      {/* Contact Options */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-0">
            {[
              { icon: Phone, label: 'Phone', value: '+251 11 550 2928', sub: 'Mon–Fri, 8AM–6PM EAT', cta: 'Call Now', href: 'tel:+251115502928', accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)', accentBorder: 'rgba(27,79,216,0.35)', responseTime: 'Immediate' },
              { icon: Mail, label: 'Email', value: 'info@altacomputec.com', sub: 'Business inquiries welcome', cta: 'Send Email', href: 'mailto:info@altacomputec.com', accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)', accentBorder: 'rgba(22,163,74,0.35)', responseTime: 'Within 24 hrs' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us directly', sub: 'Quick responses on WhatsApp', cta: 'Open WhatsApp', href: 'https://wa.me/251115502928', accent: '#22C55E', accentLight: 'rgba(34,197,94,0.12)', accentBorder: 'rgba(34,197,94,0.35)', external: true, responseTime: 'Same day' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl border-2 bg-white dark:bg-navy-900 transition-all duration-250 hover:-translate-y-1 overflow-hidden"
                  style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.accent;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${item.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${item.accentBorder}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Hover top border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                    style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}88)` }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-250" style={{ background: item.accentLight, border: `1px solid ${item.accentBorder}` }}>
                      <Icon size={20} style={{ color: item.accent }} aria-hidden="true" />
                    </div>
                    {item.responseTime && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-alta-green/10 text-alta-green border border-alta-green/20">
                        {item.responseTime}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-1">{item.label}</p>
                    <p className="font-bold text-navy-900 text-[14px]">{item.value}</p>
                    <p className="text-[12px] text-slate-500 mt-0.5">{item.sub}</p>
                  </div>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="btn-primary !text-[13px] !py-2.5 justify-center"
                    style={{ minHeight: '40px' }}
                  >
                    {item.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Form + Office Info */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-[60%_40%] gap-10 lg:gap-12">

            {/* Form */}
            <div className="card-light dark:bg-navy-900 dark:border-white/8 p-8 rounded-2xl">
              <p className="overline-tag mb-3">Get In Touch</p>
              <h2 className="section-heading mb-6">Request a Consultation</h2>
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-[18px] font-bold text-navy-900 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-[14px]">Thank you! We've received your request and will respond within 24 hours.</p>
                </div>
              ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">First Name *</label>
                    <input name="firstName" type="text" autoComplete="given-name" className={`form-input${fieldErrors.firstName ? ' !border-red-400' : ''}`} placeholder="Tadesse" onChange={() => setFieldErrors(p => ({ ...p, firstName: '' }))} />
                    {fieldErrors.firstName && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="form-label">Last Name *</label>
                    <input name="lastName" type="text" autoComplete="family-name" className={`form-input${fieldErrors.lastName ? ' !border-red-400' : ''}`} placeholder="Bekele" onChange={() => setFieldErrors(p => ({ ...p, lastName: '' }))} />
                    {fieldErrors.lastName && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className="form-label">Work Email *</label>
                  <input name="email" type="email" autoComplete="email" className="form-input" placeholder="tadesse@organization.com" />
                </div>
                <div>
                  <label className="form-label">Organisation *</label>
                  <input name="organisation" type="text" autoComplete="organization" className={`form-input${fieldErrors.organisation ? ' !border-red-400' : ''}`} placeholder="Commercial Bank of Ethiopia" onChange={() => setFieldErrors(p => ({ ...p, organisation: '' }))} />
                  {fieldErrors.organisation && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.organisation}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="form-label">Job Title</label><input name="jobTitle" type="text" className="form-input" placeholder="IT Director" /></div>
                  <div>
                    <label className="form-label">Industry</label>
                    <select name="industry" className="form-input">
                      <option value="">Select industry</option>
                      {['Banking', 'Government', 'Telecom', 'Education', 'Energy', 'Manufacturing', 'SME', 'Other'].map((i) => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label">Solution of Interest</label>
                  <select name="solutionInterest" className="form-input">
                    <option value="">Select a solution</option>
                    {['IT Infrastructure', 'Banking & ATM', 'Cloud', 'Cybersecurity', 'Software & AI', 'Smart Office', 'Enterprise Apps', 'Consulting', 'Products', 'General'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Project Brief *</label>
                  <textarea name="message" rows={4} className={`form-input resize-none${fieldErrors.message ? ' !border-red-400' : ''}`} placeholder="Describe your project requirements, timeline, and any specific technology needs..." onChange={() => setFieldErrors(p => ({ ...p, message: '' }))} />
                  {fieldErrors.message && <p className="text-red-500 text-[11px] mt-1">{fieldErrors.message}</p>}
                </div>
                <div>
                  <label className="form-label">How did you hear about us?</label>
                  <select name="hearAboutUs" className="form-input">
                    <option value="">Select</option>
                    {['Google', 'Referral', 'LinkedIn', 'Existing Client', 'Event', 'Other'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                {error && <p className="text-red-500 text-[13px]">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-[15px] py-4 mt-1">
                  <Send size={15} aria-hidden="true" /> {loading ? 'Sending...' : 'Send Request'}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                  {['Free consultation', 'Response within 24 hours', 'No commitment required'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[12px] text-slate-400">
                      <CheckCircle2 size={12} className="text-alta-green flex-shrink-0" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </form>
              )}
            </div>

            {/* Office Info Card */}
            <div
              className="rounded-2xl flex flex-col gap-0 overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #0D1E38 0%, #0A1628 60%, #03080F 100%)',
                border: '1px solid rgba(27,79,216,0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(27,79,216,0.08)',
              }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #1B4FD8 0%, #22C55E 100%)' }} aria-hidden="true" />

              <div className="p-6 flex flex-col gap-6">
                {/* Brand */}
                <div className="flex items-center gap-3">
                  <img src="/alta_logo_light.svg" alt="ALTA Computec PLC" className="h-8 w-auto" loading="lazy" />
                </div>

                {/* Contact details */}
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-1">Contact Details</p>
                  {[
                    { icon: Phone, text: '+251-115-50-29-28', sub: 'Mon–Fri, 8AM–6PM EAT', href: 'tel:+251115502928', accent: '#1B4FD8' },
                    { icon: Mail,  text: 'info@altacomputec.com', sub: 'Business inquiries', href: 'mailto:info@altacomputec.com', accent: '#22C55E' },
                    { icon: Clock, text: 'Mon–Fri: 8:00 AM – 6:00 PM', sub: 'East Africa Time (EAT)', href: null, accent: '#6366F1' },
                  ].map(({ icon: Icon, text, sub, href, accent }) => (
                    <div key={text} className="flex items-start gap-3 group">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                      >
                        <Icon size={14} style={{ color: accent }} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        {href ? (
                          <a href={href} className="text-[13px] font-semibold text-slate-200 hover:text-white transition-colors duration-150 block">{text}</a>
                        ) : (
                          <span className="text-[13px] font-semibold text-slate-200 block">{text}</span>
                        )}
                        <span className="text-[11px] text-slate-500">{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map block */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(27,79,216,0.2)' }}
                >
                  {/* Map visual header */}
                  <div
                    className="relative h-28 flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #0D1E38 0%, #122444 100%)' }}
                  >
                    {/* Grid lines */}
                    <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
                    {/* Dot pattern */}
                    <div className="absolute inset-0 bg-dot-pattern opacity-30" aria-hidden="true" />
                    {/* Pulsing location pin */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-alta-blue/30 animate-ping" aria-hidden="true" />
                        <div
                          className="relative w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #1B4FD8, #2563EB)', boxShadow: '0 0 20px rgba(27,79,216,0.5)' }}
                        >
                          <MapPin size={18} className="text-white" aria-hidden="true" />
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-white tracking-wide">ALTA Computec HQ</span>
                    </div>
                    {/* Coordinate lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'rgba(27,79,216,0.2)' }} aria-hidden="true" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ background: 'rgba(27,79,216,0.2)' }} aria-hidden="true" />
                  </div>

                  {/* Address details */}
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="text-[12px] font-bold text-white mb-1">Mexico Road, Chad Street</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-1">ALTA Building, Mexico Square Area</p>
                    <p className="text-[11px] text-slate-500">Addis Ababa, Ethiopia · Near Mexico Square</p>
                  </div>

                  {/* Get directions CTA */}
                  <a
                    href="https://maps.google.com/?q=ALTA+Computec+Mexico+Road+Addis+Ababa+Ethiopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 transition-all duration-150 group"
                    style={{
                      background: 'rgba(27,79,216,0.12)',
                      borderTop: '1px solid rgba(27,79,216,0.2)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(27,79,216,0.22)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(27,79,216,0.12)'; }}
                    aria-label="Open ALTA Computec location in Google Maps"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-alta-blue" aria-hidden="true" />
                      <span className="text-[12px] font-semibold text-alta-blue">Get Directions on Google Maps</span>
                    </div>
                    <ExternalLink size={12} className="text-slate-500 group-hover:text-alta-blue transition-colors duration-150" aria-hidden="true" />
                  </a>
                </div>

                {/* Social media */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-3">Follow Us</p>
                  <div className="flex items-center gap-2.5">
                    {SOCIAL.map(({ icon: Icon, label, href, color, bg, border }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
                        style={{ background: bg, border: `1px solid ${border}` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = color;
                          e.currentTarget.style.borderColor = color;
                          e.currentTarget.style.boxShadow = `0 6px 16px -4px ${color}80`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = bg;
                          e.currentTarget.style.borderColor = border;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        aria-label={label}
                      >
                        <Icon size={16} style={{ color }} className="transition-colors duration-300 group-hover:!text-white" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Dell Platinum badge */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                >
                  <span className="text-amber-400 text-[11px] font-black">★</span>
                  <span className="text-amber-400/80 text-[11px] font-semibold">Ethiopia's Only Dell Platinum Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-10">
            <p className="overline-tag justify-center mb-3">Common Questions</p>
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/8 overflow-hidden divide-y divide-slate-100 dark:divide-white/6 bg-white dark:bg-navy-900" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="px-5">
                <button
                  className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded-lg group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className={`font-semibold text-[14px] pr-4 transition-colors duration-150 ${openFaq === i ? 'text-alta-blue' : 'text-navy-900 dark:text-slate-200 group-hover:text-alta-blue'}`}>{faq.q}</span>
                  <ChevronDown size={15} className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="pb-4">
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Portal CTA */}
      <section className="py-14 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10 text-center">
          <p className="text-[13px] font-bold tracking-widest uppercase text-slate-500 mb-2">Existing Clients</p>
          <h2 className="text-[28px] font-black text-white mb-3">Already an ALTA client?</h2>
          <p className="text-slate-400 text-[15px] mb-7">Access your service request portal for tickets, updates, and technical support.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:support@altacomputec.com" className="btn-secondary text-[15px] px-8 py-4">
              Submit a Service Request
            </a>
            <a href="tel:+251115502928" className="text-slate-400 text-[14px] hover:text-white transition-colors duration-150">
              Call Support: +251-115-50-29-28
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
