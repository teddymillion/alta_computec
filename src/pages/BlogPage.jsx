import { useState } from 'react';
import { Search, Clock, ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const CATEGORIES = ['All', 'Infrastructure', 'Cybersecurity', 'Software', 'Banking Tech', 'Smart Office', 'Company News'];

const ARTICLES = [
  { cat: 'Banking Tech', title: 'ATM Security Best Practices for Ethiopian Banks in 2026', excerpt: 'With ATM fraud rising across sub-Saharan Africa, Ethiopian banks must upgrade endpoint protection and network segmentation.', date: 'Mar 2026', read: '6 min', catColor: 'bg-blue-100 text-blue-700', topColor: '#3B82F6' },
  { cat: 'Cybersecurity', title: 'Top 5 Cybersecurity Threats Facing Ethiopian Enterprises', excerpt: 'Ransomware, phishing, and insider threats are growing. Here is how enterprise IT teams should respond.', date: 'Mar 2026', read: '7 min', catColor: 'bg-red-100 text-red-700', topColor: '#EF4444' },
  { cat: 'Company News', title: 'What Dell Platinum Partner Status Means for Your Procurement', excerpt: "ALTA is Ethiopia's only Dell Platinum Partner. We explain what that means for pricing, support, and certification.", date: 'Feb 2026', read: '4 min', catColor: 'bg-amber-100 text-amber-700', topColor: '#F59E0B' },
  { cat: 'Software', title: 'On-Premise vs Cloud ERP: A Guide for African Enterprises', excerpt: 'Choosing between on-premise and cloud ERP deployment involves more than cost — connectivity, compliance, and control all matter.', date: 'Feb 2026', read: '9 min', catColor: 'bg-purple-100 text-purple-700', topColor: '#8B5CF6' },
  { cat: 'Smart Office', title: 'SHARP Interactive Display Setup Guide for Ethiopian Schools', excerpt: 'A step-by-step guide to deploying SHARP AQUOS BOARD interactive displays in Ethiopian classrooms.', date: 'Jan 2026', read: '5 min', catColor: 'bg-green-100 text-green-700', topColor: '#22C55E' },
  { cat: 'Infrastructure', title: 'Network Infrastructure Planning for Fast-Growing Ethiopian Enterprises', excerpt: 'As your organisation scales, your network must scale with it. A guide to phased Cisco infrastructure planning.', date: 'Jan 2026', read: '6 min', catColor: 'bg-blue-100 text-blue-700', topColor: '#3B82F6' },
  { cat: 'Cybersecurity', title: 'Kaspersky Endpoint Security: Enterprise Deployment Guide', excerpt: 'A technical walkthrough of deploying Kaspersky Endpoint Security across an enterprise environment.', date: 'Dec 2025', read: '8 min', catColor: 'bg-red-100 text-red-700', topColor: '#EF4444' },
  { cat: 'Banking Tech', title: 'Core Banking Integration Best Practices with Diebold Nixdorf ATMs', excerpt: 'Technical and operational best practices for integrating Diebold Nixdorf ATM networks with core banking systems.', date: 'Dec 2025', read: '7 min', catColor: 'bg-blue-100 text-blue-700', topColor: '#3B82F6' },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterAlready, setNewsletterAlready] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'All' || a.cat === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageLayout>
      <PageHero breadcrumb="Blog" title="Insights from Ethiopia's Technology Leaders" subtitle="Industry analysis, product guides, and technology trends from the ALTA team." />

      {/* Search + Filters */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="form-input pl-11"
              aria-label="Search articles"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  activeCategory === c
                    ? 'bg-navy-900 dark:bg-alta-blue text-white border-navy-900 dark:border-alta-blue'
                    : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-alta-blue hover:text-alta-blue'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className="relative card-light dark:bg-navy-900 dark:border-white/8 border-l-4 border-l-alta-green p-7 mb-10 rounded-2xl">
            <span className="absolute top-4 right-4 text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-alta-green text-white">Featured</span>
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-100 dark:bg-alta-green/15 text-green-700 dark:text-alta-green inline-block mb-4">Industry Analysis</span>
            <h2 className="text-[22px] font-bold text-navy-900 dark:text-white mb-3 leading-snug">Why Ethiopian Enterprises Are Accelerating Cloud Adoption in 2026</h2>
            <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed mb-4">As connectivity infrastructure matures across Ethiopia, enterprise IT directors are shifting from on-premise-only strategies to hybrid and private cloud architectures. Here is what is driving the change.</p>
            <div className="flex items-center gap-4 text-[12px] text-slate-400 mb-5">
              <span>ALTA Technology Team</span>
              <span>·</span>
              <span>April 2026</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={11} aria-hidden="true" />8 min read</span>
            </div>
            <Link to="/blog" className="btn-ghost inline-flex">
              Read Article <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <article
                key={article.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white dark:bg-navy-900 transition-all duration-250 hover:-translate-y-1"
                style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = article.topColor;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${article.topColor}40, 0 0 0 1px ${article.topColor}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(226,232,240,0.8)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}
              >
                <div className="h-2 w-full" style={{ background: article.topColor }} aria-hidden="true" />
                <div className="flex flex-col gap-4 p-5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${article.catColor}`}>{article.cat}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0"><Clock size={10} aria-hidden="true" />{article.read}</span>
                  </div>
                  <h3 className="text-[14px] font-bold text-navy-900 dark:text-white leading-snug flex-1">{article.title}</h3>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/6">
                    <span className="text-[11px] text-slate-400">{article.date}</span>
                    <Link to="/blog" className="text-[12px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                      Read <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #03080F 100%)' }}>
        <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
        <div className="section-container relative z-10 text-center">
          <h2 className="text-[28px] font-black text-white mb-3">Stay Ahead of Ethiopia's Technology Landscape</h2>
          <p className="text-slate-400 text-[15px] mb-7">Join 2,000+ IT professionals. Weekly digest. No spam.</p>
          {!newsletterSubmitted && !newsletterAlready ? (
            <form
              className="flex flex-col items-center gap-2 max-w-md mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                setNewsletterError('');
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
                  setNewsletterError('Please enter a valid email address.');
                  return;
                }
                setNewsletterLoading(true);
                try {
                  const res = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: newsletterEmail }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.errors?.email?.[0] || data.message || 'Something went wrong, please try again.');
                  if (data.alreadySubscribed) { setNewsletterAlready(true); return; }
                  setNewsletterSubmitted(true);
                } catch (err) {
                  setNewsletterError(err.message || 'Something went wrong, please try again.');
                } finally {
                  setNewsletterLoading(false);
                }
              }}
            >
              <div className="flex w-full gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(''); }}
                  placeholder="your@email.com"
                  className={`flex-1 px-4 py-3 rounded-xl border bg-navy-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-alta-blue/40 text-[14px] ${
                    newsletterError ? 'border-red-500' : 'border-white/20 focus:border-alta-blue'
                  }`}
                  aria-label="Email address"
                />
                <button type="submit" disabled={newsletterLoading} className="btn-primary !text-[14px] px-6 py-3 flex-shrink-0">
                  {newsletterLoading ? 'Subscribing...' : 'Subscribe'} <ArrowRight size={14} />
                </button>
              </div>
              {newsletterError && <p className="text-red-400 text-[12px] self-start">{newsletterError}</p>}
            </form>
          ) : newsletterAlready ? (
            <div className="flex items-center justify-center gap-2 text-amber-400 text-[15px] font-semibold">
              <CheckCircle size={18} aria-hidden="true" /> You're already subscribed!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-alta-green-light text-[15px] font-semibold">
              <CheckCircle size={18} aria-hidden="true" /> You're subscribed!
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="py-12 bg-white dark:bg-navy-950">
        <div className="section-container">
          <div className="flex items-center justify-center gap-2">
            <button className="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-navy-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue" aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue ${
                  currentPage === p
                    ? 'bg-navy-900 dark:bg-alta-blue text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/6'
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-slate-400 text-[13px]">…</span>
            <button className="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-navy-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue" aria-label="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
