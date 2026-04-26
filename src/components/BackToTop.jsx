import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-24 z-40 w-10 h-10 rounded-xl bg-navy-900 border border-white/10 text-slate-300 hover:text-white hover:bg-navy-800 shadow-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
      aria-label="Back to top"
    >
      <ArrowUp size={16} />
    </button>
  );
}
