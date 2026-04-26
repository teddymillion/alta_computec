import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1050);
    const doneTimer = setTimeout(() => onDone?.(), 1300);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-250"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img src="/alta_computec.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none gap-1">
            <span className="font-black text-[18px] text-white tracking-tight">ALTA</span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-500">Computec PLC</span>
          </div>
        </div>

        <div className="w-48 h-0.5 bg-navy-800 rounded-full overflow-hidden">
          <div
            className="h-full loading-bar rounded-full"
            style={{ background: 'linear-gradient(90deg, #1B4FD8, #22C55E)' }}
          />
        </div>
      </div>
    </div>
  );
}
