import { useState } from 'react';
import { Cookie, X } from 'lucide-react';

const COOKIE_KEY = 'alta_cookie_consent';

export default function CookieConsent() {
  const [dismissed, setDismissed] = useState(() => !!localStorage.getItem(COOKIE_KEY));

  if (dismissed) return null;

  const accept = () => { localStorage.setItem(COOKIE_KEY, 'accepted'); setDismissed(true); };
  const decline = () => { localStorage.setItem(COOKIE_KEY, 'declined'); setDismissed(true); };

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 rounded-2xl border border-slate-200/80 bg-white shadow-xl p-4"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <button
        onClick={decline}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded-lg p-0.5"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>

      <div className="flex items-start gap-3 mb-3">
        <div className="icon-wrap icon-wrap-blue w-9 h-9 flex-shrink-0 mt-0.5">
          <Cookie size={15} aria-hidden="true" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-navy-900 mb-1">We use cookies</p>
          <p className="text-[12px] text-slate-500 leading-relaxed">
            We use cookies to improve your experience and analyse site usage. Your data stays private.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={accept}
          className="btn-primary !text-[12px] !px-4 !py-2 flex-1 justify-center"
          style={{ minHeight: 36 }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
