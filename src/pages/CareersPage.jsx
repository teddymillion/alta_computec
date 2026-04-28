import { useState } from 'react';
import { Briefcase, Award, TrendingUp, Users, Globe, Monitor, X, MapPin, Clock, FileText, UserCheck, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const BENEFITS = [
  { icon: Briefcase, title: 'Competitive Compensation', desc: 'Market-leading salaries with performance bonuses and benefits.', accent: '#1B4FD8', accentLight: 'rgba(27,79,216,0.12)', accentBorder: 'rgba(27,79,216,0.35)' },
  { icon: Award, title: 'Global Certifications', desc: 'Dell, Cisco, Oracle, and Kaspersky certification programs fully sponsored.', accent: '#F59E0B', accentLight: 'rgba(245,158,11,0.12)', accentBorder: 'rgba(245,158,11,0.35)' },
  { icon: TrendingUp, title: 'Career Growth', desc: 'Clear progression paths from junior engineer to technical lead in 3–5 years.', accent: '#16A34A', accentLight: 'rgba(22,163,74,0.12)', accentBorder: 'rgba(22,163,74,0.35)' },
  { icon: Users, title: 'Collaborative Culture', desc: '130+ professionals across engineering, sales, design, and operations.', accent: '#6366F1', accentLight: 'rgba(99,102,241,0.12)', accentBorder: 'rgba(99,102,241,0.35)' },
  { icon: Globe, title: 'Meaningful Impact', desc: "Build the infrastructure powering Ethiopia's banks, government, and enterprises.", accent: '#0EA5E9', accentLight: 'rgba(14,165,233,0.12)', accentBorder: 'rgba(14,165,233,0.35)' },
  { icon: Monitor, title: 'Modern Tools', desc: 'Work with the latest Dell, Cisco, Oracle, and Microsoft enterprise technology.', accent: '#22C55E', accentLight: 'rgba(34,197,94,0.12)', accentBorder: 'rgba(34,197,94,0.35)' },
];

const EMPLOYEE_QUOTES = [
  { quote: 'ALTA gave me the opportunity to become a Cisco certified engineer within my first year.', name: 'T.A.', role: 'Network Engineer', initials: 'TA' },
  { quote: "I've worked on projects for CBE, Ethio Telecom, and three government ministries.", name: 'D.G.', role: 'Senior Engineer', initials: 'DG' },
  { quote: 'The team is genuinely collaborative. Everyone teaches each other.', name: 'M.H.', role: 'Software Developer', initials: 'MH' },
];

const ROLE_FILTERS = ['All', 'Engineering', 'Sales', 'Design', 'Operations', 'Internship'];

const JOBS = [
  {
    title: 'Senior Network Engineer', dept: 'Engineering', deptColor: 'bg-blue-100 text-blue-700',
    type: 'Full Time', location: 'Addis Ababa',
    responsibilities: ['Design and deploy Cisco/HP network infrastructure', 'Lead client site assessments and technical scoping', 'Mentor junior engineers and review technical documentation'],
    qualifications: ['5+ years networking experience required', 'CCNP required, CCIE preferred', 'Experience with SD-WAN and enterprise switching'],
    offer: ['Competitive salary + performance bonus', 'Cisco certification sponsorship', 'Team laptop and equipment'],
  },
  {
    title: 'Full Stack Software Developer', dept: 'Engineering', deptColor: 'bg-blue-100 text-blue-700',
    type: 'Full Time', location: 'Addis Ababa',
    responsibilities: ['Build enterprise web applications using React/Node.js', 'Develop and maintain REST APIs and system integrations', 'Oracle database integration and optimization'],
    qualifications: ['3+ years full stack development experience', 'React, Node.js or equivalent required', 'Oracle integration experience a plus'],
    offer: ['Competitive salary', 'Remote work flexibility', 'Professional development budget'],
  },
  {
    title: 'UX/UI Designer', dept: 'Design', deptColor: 'bg-indigo-100 text-indigo-700',
    type: 'Full Time', location: 'Addis Ababa',
    responsibilities: ['Design enterprise product interfaces in Figma', 'Conduct user research and usability testing', 'Collaborate with engineering on implementation'],
    qualifications: ['Figma expert with enterprise product design experience', 'B2B design experience preferred', 'Portfolio of enterprise or SaaS products required'],
    offer: ['Competitive salary', 'Design tool subscriptions provided', 'Conference attendance budget'],
  },
  {
    title: 'Enterprise Sales Executive', dept: 'Sales', deptColor: 'bg-green-100 text-green-700',
    type: 'Full Time', location: 'Addis Ababa',
    responsibilities: ['Develop and manage enterprise client relationships', 'Lead RFQ responses and proposal development', 'Achieve quarterly revenue targets'],
    qualifications: ['3+ years B2B technology sales experience', 'Government/banking sector experience preferred', 'Fluent Amharic and English required'],
    offer: ['Base salary + uncapped commission', 'Company vehicle', 'Quarterly performance bonuses'],
  },
  {
    title: 'Cybersecurity Analyst', dept: 'Engineering', deptColor: 'bg-blue-100 text-blue-700',
    type: 'Full Time', location: 'Addis Ababa',
    responsibilities: ['Deploy and manage Kaspersky and Fortinet security solutions', 'Conduct security audits and penetration testing', 'Respond to and document security incidents'],
    qualifications: ['Kaspersky or Fortinet experience required', 'Incident response and security auditing skills', 'CEH, CISSP, or equivalent certification preferred'],
    offer: ['Competitive salary', 'Security certification sponsorship', 'Access to latest security tools'],
  },
  {
    title: 'IT Support Intern', dept: 'Internship', deptColor: 'bg-amber-100 text-amber-700',
    type: 'Internship', location: 'Addis Ababa',
    responsibilities: ['Assist with hardware troubleshooting and deployment', 'Support senior engineers on client projects', 'Document technical procedures and configurations'],
    qualifications: ['Final year CS/IT student or recent graduate', 'Hardware troubleshooting knowledge', 'Eagerness to learn enterprise IT'],
    offer: ['Monthly stipend', 'Mentorship from senior engineers', 'Potential full-time offer after 6 months'],
  },
];

const PROCESS_STEPS = [
  { icon: FileText, title: 'Upload Application', desc: 'Submit your CV and cover note through our careers portal.' },
  { icon: UserCheck, title: 'HR Screening', desc: 'Our HR team reviews applications and contacts shortlisted candidates within 5 business days.' },
  { icon: Code, title: 'Technical Interview', desc: 'A 60-minute technical or portfolio review with the hiring team.' },
  { icon: CheckCircle, title: 'Offer & Onboarding', desc: 'Offer letter, contract, and a structured 2-week onboarding program.' },
];

export default function CareersPage() {
  const [activeRole, setActiveRole] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApplyError('');
    const formData = new FormData(e.target);
    formData.set('jobTitle', selectedJob.title);
    formData.set('department', selectedJob.dept);
    try {
      const res = await fetch('/api/apply', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        const firstError = Object.values(data.errors || {})[0]?.[0] || data.message;
        throw new Error(firstError);
      }
      setApplySuccess(true);
    } catch (err) {
      setApplyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeRole === 'All' ? JOBS : JOBS.filter((j) => j.dept === activeRole);

  return (
    <PageLayout>
      <PageHero
        breadcrumb="Careers"
        title="Build the Future of Ethiopian Technology"
        subtitle="Join 130+ engineers, consultants, and innovators shaping Africa's digital infrastructure."
        ctaPrimary={{ label: 'View Open Positions', to: '#positions' }}
      />

      {/* Why Work at ALTA */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">Life at ALTA</p>
            <h2 className="section-heading dark:section-heading-light">Why Join Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-navy-900 border-2 transition-all duration-250 hover:-translate-y-1 overflow-hidden"
                  style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = b.accent;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${b.accentLight.replace('0.12', '0.25')}, 0 0 0 1px ${b.accentBorder}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250" style={{ background: `linear-gradient(90deg, ${b.accent}, ${b.accent}88)` }} aria-hidden="true" />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-250" style={{ background: b.accentLight, border: `1px solid ${b.accentBorder}` }}>
                    <Icon size={20} style={{ color: b.accent }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-navy-900 dark:text-white mb-1.5">{b.title}</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="overline-tag text-alta-blue mb-3">Our Culture</p>
              <h2 className="section-heading-light mb-6">A Team That Builds Together</h2>
              <p className="text-[14px] text-slate-400 leading-[1.75] mb-4">At ALTA, we believe that great technology is built by great teams. Our engineers work on some of Ethiopia's most complex and impactful IT projects — from central bank data centers to nationwide government networks.</p>
              <p className="text-[14px] text-slate-400 leading-[1.75] mb-8">We invest in our people through sponsored certifications, mentorship programs, and a culture of continuous learning. When you join ALTA, you join a team that has been building Ethiopia's digital infrastructure for 30 years.</p>
              <div className="flex flex-col gap-4">
                {EMPLOYEE_QUOTES.map((q) => (
                  <div key={q.name} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-9 h-9 rounded-full bg-alta-blue flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[11px]">{q.initials}</span>
                    </div>
                    <div>
                      <p className="text-[13px] text-slate-300 italic">"{q.quote}"</p>
                      <p className="text-[11px] text-slate-500 mt-1">{q.name}, {q.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[{ v: '130+', l: 'Team Members' }, { v: '30 Years', l: 'Of Growth' }, { v: '5+', l: 'Project Sectors' }].map((s) => (
                <div key={s.l} className="card-dark p-6 flex items-center gap-5">
                  <span className="text-[40px] font-black text-alta-green-light leading-none">{s.v}</span>
                  <span className="text-[15px] font-semibold text-white">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="overline-tag justify-center mb-3">Open Roles</p>
            <h2 className="section-heading dark:section-heading-light">Current Opportunities</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {ROLE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveRole(f)}
                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  activeRole === f ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-slate-600 border-slate-200 hover:border-alta-blue hover:text-alta-blue'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {filtered.map((job, ji) => {
              const isNew = JOBS.indexOf(job) < 2;
              return (
              <div key={job.title} className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border-2 transition-all duration-250 hover:-translate-y-1 overflow-hidden" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }} onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1B4FD8';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(27,79,216,0.25), 0 0 0 1px rgba(27,79,216,0.35)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-navy-900 text-[16px]">{job.title}</h3>
                    {isNew && (
                      <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-alta-green/15 text-alta-green border border-alta-green/25">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${job.deptColor}`}>{job.dept}</span>
                    <span className="flex items-center gap-1 text-[12px] text-slate-500"><MapPin size={11} aria-hidden="true" />{job.location}</span>
                    <span className="flex items-center gap-1 text-[12px] text-slate-500"><Clock size={11} aria-hidden="true" />{job.type}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedJob(job); setApplySuccess(false); setApplyError(''); }}
                  className="btn-outline flex-shrink-0 !text-[13px]"
                >
                  View & Apply <ArrowRight size={13} />
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline-tag justify-center mb-3">How It Works</p>
            <h2 className="section-heading dark:section-heading-light">Our Hiring Process</h2>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dashed connecting line (desktop) */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden lg:block" style={{ border: 'none', borderTop: '2px dashed rgba(27,79,216,0.2)' }} aria-hidden="true" />
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="group relative flex flex-col items-center gap-4 text-center relative z-10 p-5 rounded-2xl bg-white border-2 transition-all duration-250 hover:-translate-y-1 overflow-hidden" style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }} onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#16A34A';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(22,163,74,0.25), 0 0 0 1px rgba(22,163,74,0.35)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}>
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250" style={{ background: 'linear-gradient(90deg, #16A34A, #16A34A88)' }} aria-hidden="true" />
                  <div className="w-12 h-12 rounded-full bg-alta-green flex items-center justify-center group-hover:scale-110 transition-transform duration-250">
                    <span className="text-white font-black text-[13px]">0{i + 1}</span>
                  </div>
                  <Icon size={20} className="text-alta-green" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-navy-900 text-[14px] mb-1">{step.title}</p>
                    <p className="text-[12px] text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Application CTA */}
      <section className="py-14 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-[28px] font-black text-white mb-3">Don't see the right role?</h2>
          <p className="text-slate-400 text-[15px] mb-7">Send us your CV and we'll reach out when the right position opens.</p>
          <a href="mailto:careers@altacomputec.com" className="btn-primary inline-flex text-[15px] px-8 py-4">
            Submit Open Application <ArrowRight size={15} />
          </a>
          <p className="text-slate-600 text-[13px] mt-4">careers@altacomputec.com</p>
        </div>
      </section>

      {/* Job Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Apply for ${selectedJob.title}`}>
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[540px] max-h-[90vh] overflow-y-auto z-10">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="font-bold text-navy-900 text-[16px]">{selectedJob.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${selectedJob.deptColor}`}>{selectedJob.dept}</span>
                  <span className="text-[12px] text-slate-400">{selectedJob.type} · {selectedJob.location}</span>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">Responsibilities</p>
                <ul className="flex flex-col gap-1.5">
                  {selectedJob.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-alta-blue flex-shrink-0 mt-1.5" aria-hidden="true" />{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">Qualifications</p>
                <ul className="flex flex-col gap-1.5">
                  {selectedJob.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-alta-green flex-shrink-0 mt-1.5" aria-hidden="true" />{q}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">What We Offer</p>
                <ul className="flex flex-col gap-1.5">
                  {selectedJob.offer.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <CheckCircle size={13} className="text-alta-green flex-shrink-0 mt-0.5" aria-hidden="true" />{o}
                    </li>
                  ))}
                </ul>
              </div>
              {applySuccess ? (
                <div className="text-center py-6 border-t border-slate-100">
                  <h3 className="font-bold text-navy-900 text-[16px] mb-2">Application Submitted!</h3>
                  <p className="text-slate-500 text-[13px]">Our HR team will contact you within 5 business days.</p>
                </div>
              ) : (
              <form className="flex flex-col gap-4 pt-2 border-t border-slate-100" onSubmit={handleApply} noValidate>
                <p className="font-bold text-navy-900 text-[14px]">Apply Now</p>
                <div><label className="form-label">Full Name *</label><input name="fullName" type="text" required className="form-input" placeholder="Your full name" /></div>
                <div><label className="form-label">Email *</label><input name="email" type="email" required className="form-input" placeholder="your@email.com" /></div>
                <div><label className="form-label">CV / Resume *</label><input name="cvFile" type="file" accept=".pdf,.doc,.docx" required className="form-input !py-2" /></div>
                <div><label className="form-label">Cover Note</label><textarea name="coverNote" rows={3} className="form-input resize-none" placeholder="Tell us why you're a great fit..." /></div>
                {applyError && <p className="text-red-500 text-[13px]">{applyError}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Submitting...' : 'Submit Application'} <ArrowRight size={15} />
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
