import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function PageHero({ breadcrumb, title, subtitle, ctaPrimary, ctaSecondary }) {
  return (
    <section
      className="relative overflow-hidden bg-hero pt-24 pb-16 lg:pt-28 lg:pb-20"
      style={{ minHeight: '320px' }}
      aria-label={`${breadcrumb} page hero`}
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden="true" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-alta-blue/8 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="text-[12px] text-slate-500 hover:text-alta-blue transition-colors duration-150">
            Home
          </Link>
          <ChevronRight size={12} className="text-slate-600" aria-hidden="true" />
          <span className="text-[12px] font-semibold text-alta-blue">{breadcrumb}</span>
        </nav>

        <div className="max-w-3xl flex flex-col gap-5">
          <h1 className="section-heading-light text-[36px] sm:text-[44px] lg:text-[48px]">{title}</h1>
          {subtitle && <p className="section-subheading-light text-[16px] max-w-2xl">{subtitle}</p>}

          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {ctaPrimary && (
                <Link to={ctaPrimary.to} className="btn-primary text-[15px] px-7 py-3.5">
                  {ctaPrimary.label} <ArrowRight size={15} />
                </Link>
              )}
              {ctaSecondary && (
                <Link to={ctaSecondary.to} className="btn-secondary text-[15px] px-7 py-3.5">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
