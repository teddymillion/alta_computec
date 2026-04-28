import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';

const CONTACT_ITEMS = [
  { icon: Phone,  label: 'Phone',        value: '+251-115-50-29-28',                                    href: 'tel:+251115502928',                                          accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)',  accentBorder: 'rgba(27,79,216,0.35)' },
  { icon: Mail,   label: 'Email',        value: 'info@altacomputec.com',                                href: 'mailto:info@altacomputec.com',                               accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)',  accentBorder: 'rgba(22,163,74,0.35)' },
  { icon: MapPin, label: 'Address',      value: 'Mexico Road, Chad St., ALTA Building, Addis Ababa',   href: 'https://maps.google.com/?q=Mexico+Square+Addis+Ababa',      accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)' },
  { icon: Clock,  label: 'Office Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM EAT',                      href: null,                                                        accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)' },
];

const inputClass = "form-input";
const labelClass = "form-label";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const body = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-padding bg-white dark:bg-navy-950" aria-label="Contact ALTA Computec">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: Info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="overline-tag mb-3">Get In Touch</p>
              <h2 className="section-heading">Start Your Enterprise<br className="hidden sm:block" /> IT Conversation</h2>
              <p className="section-subheading mt-3">
                Our team of certified engineers is ready to assess your requirements and propose the right solution.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 transition-all duration-200 hover:border-slate-300 hover:shadow-sm" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.accentLight, border: `1px solid ${item.accentBorder}` }}>
                      <Icon size={17} style={{ color: item.accent }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-0.5">{item.label}</p>
                      <p className="text-[14px] font-semibold text-navy-900">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-2xl border-2 p-5" style={{ background: 'rgba(27,79,216,0.06)', borderColor: 'rgba(27,79,216,0.2)' }}>
              <div className="relative">
                <p className="font-bold text-[14px] mb-1 text-navy-900 dark:text-white">Typical Response Time</p>
                <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed">
                  Enterprise inquiries receive a response within 24 business hours. For urgent infrastructure support, call our direct line.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div className="mb-7">
              <h3 className="text-[18px] font-bold text-navy-900">Request a Proposal</h3>
              <p className="text-[13px] text-slate-500 mt-1">Fill in your details and we'll get back to you within 24 hours.</p>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <ArrowRight size={24} className="text-alta-green" />
                </div>
                <h3 className="text-[18px] font-bold text-navy-900 mb-2">Request Received!</h3>
                <p className="text-slate-500 text-[14px]">Thank you! We've received your request and will respond within 24 hours.</p>
              </div>
            ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={labelClass}>First Name <span className="text-red-400" aria-hidden="true">*</span></label>
                  <input id="firstName" name="firstName" type="text" required autoComplete="given-name" placeholder="Tadesse" className={inputClass} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>Last Name <span className="text-red-400" aria-hidden="true">*</span></label>
                  <input id="lastName" name="lastName" type="text" required autoComplete="family-name" placeholder="Bekele" className={inputClass} aria-required="true" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Work Email <span className="text-red-400" aria-hidden="true">*</span></label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="tadesse@organization.com" className={inputClass} aria-required="true" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className={labelClass}>Organization <span className="text-red-400" aria-hidden="true">*</span></label>
                  <input id="company" name="organisation" type="text" required autoComplete="organization" placeholder="Commercial Bank of Ethiopia" className={inputClass} aria-required="true" />
                </div>
                <div>
                  <label htmlFor="sector" className={labelClass}>Sector</label>
                  <select id="sector" name="sector" className={inputClass}>
                    <option value="">Select sector</option>
                    <option>Banking & Finance</option>
                    <option>Government</option>
                    <option>Telecom & ISP</option>
                    <option>Education</option>
                    <option>Energy & Utilities</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="solution" className={labelClass}>Solution of Interest</label>
                <select id="solution" name="solutionInterest" className={inputClass}>
                  <option value="">Select a solution</option>
                  <option>IT Infrastructure & Networking</option>
                  <option>Banking Automation & ATM</option>
                  <option>Cloud & Virtualization</option>
                  <option>Cybersecurity</option>
                  <option>Enterprise Software & AI</option>
                  <option>Smart Office & Collaboration</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Project Brief</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Describe your project requirements, timeline, and any specific technology needs..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && <p className="text-red-500 text-[13px]">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-[15px] py-4">
                <Send size={15} aria-hidden="true" />
                {loading ? 'Sending...' : 'Submit Request'}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                By submitting, you agree to our Privacy Policy. We respond within 24 business hours.
              </p>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
