import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURED = {
  category: 'Cybersecurity',
  categoryColor: 'bg-red-100 text-red-700',
  date: 'April 2026',
  readTime: '8 min read',
  title: 'Why Ethiopian Banks Are Prioritizing Endpoint Security in 2026',
  excerpt: 'As digital banking adoption accelerates across Ethiopia, financial institutions face an expanding attack surface. We examine the threat landscape and the security frameworks that leading banks are deploying.',
  gradient: 'linear-gradient(135deg, #1e3a8a 0%, #0A1628 100%)',
};

const ARTICLES = [
  {
    category: 'Cloud & Infrastructure',
    categoryColor: 'bg-blue-100 text-blue-700',
    date: 'March 2026',
    readTime: '6 min',
    title: 'The Case for Private Cloud in Ethiopian Government Institutions',
  },
  {
    category: 'AI & Innovation',
    categoryColor: 'bg-purple-100 text-purple-700',
    date: 'February 2026',
    readTime: '5 min',
    title: 'How AI-Powered Analytics Is Transforming Ethiopian Telecom Operations',
  },
  {
    category: 'Banking Technology',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    date: 'January 2026',
    readTime: '7 min',
    title: 'ATM Network Modernization: Lessons from 50+ Banking Deployments',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section-padding bg-white" aria-label="Blog and insights">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="overline-tag mb-3">Insights</p>
            <h2 className="section-heading">Technology Insights for<br className="hidden sm:block" /> Ethiopian Enterprise Leaders</h2>
          </div>
          <Link to="/blog" className="btn-ghost self-start sm:self-auto flex-shrink-0">
            View All Insights <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Featured */}
          <article className="lg:col-span-2 group flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="relative h-56 overflow-hidden" style={{ background: FEATURED.gradient }}>
              <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-5">
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${FEATURED.categoryColor}`}>
                  {FEATURED.category}
                </span>
              </div>
              {/* Read time badge */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-navy-950/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Clock size={10} className="text-slate-400" aria-hidden="true" />
                <span className="text-[10px] text-slate-400 font-medium">{FEATURED.readTime}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6 flex-1">
              <p className="text-[12px] text-slate-400">{FEATURED.date}</p>
              <h3 className="text-[17px] font-bold text-navy-900 leading-snug group-hover:text-alta-blue transition-colors duration-150">
                {FEATURED.title}
              </h3>
              <p className="text-[13.5px] text-slate-500 leading-relaxed flex-1">{FEATURED.excerpt}</p>
              <Link to="/blog" className="flex items-center gap-1.5 text-[13px] font-semibold text-alta-blue hover:underline underline-offset-2 mt-auto">
                Read Article <ArrowRight size={13} />
              </Link>
            </div>
          </article>

          {/* Sidebar articles */}
          <div className="flex flex-col gap-4">
            {ARTICLES.map((article) => (
              <article
                key={article.title}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-slate-200/80 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 flex-1"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0">
                    <Clock size={10} aria-hidden="true" /> {article.readTime}
                  </span>
                </div>
                <h3 className="text-[13.5px] font-bold text-navy-900 leading-snug group-hover:text-alta-blue transition-colors duration-150 flex-1">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{article.date}</span>
                  <Link to="/blog" className="text-[12px] font-semibold text-alta-blue hover:underline underline-offset-2 flex items-center gap-1">
                    Read <ArrowRight size={11} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
