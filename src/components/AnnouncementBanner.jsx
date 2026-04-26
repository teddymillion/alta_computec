import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BANNER_KEY = 'alta_banner_dismissed_v1';

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(BANNER_KEY) === '1');

  if (dismissed) return null;

  const dismiss = () => {
    sessionStorage.setItem(BANNER_KEY, '1');
    setDismissed(true);
  };

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center gap-3 px-4"
      style={{ height: 36, background: 'linear-gradient(90deg, #1B4FD8 0%, #1340B0 50%, #16A34A 100%)' }}
      role="banner"
      aria-label="Announcement"
    >
      <span className="text-[12px] font-semibold text-white leading-none text-center">
        🎉 ALTA is Ethiopia's only Dell Platinum Partner — exclusive pricing available.
      </span>
      <Link
        to="/contact"
        className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-white/80 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap"
      >
        Get a Quote <ArrowRight size={10} />
      </Link>
      <button
        onClick={dismiss}
        className="absolute right-3 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
