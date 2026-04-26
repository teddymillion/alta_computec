import { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Server, ShieldCheck, Cloud, FileText } from 'lucide-react';

const CHIPS = [
  { label: 'IT Infrastructure', icon: Server },
  { label: 'Cybersecurity',     icon: ShieldCheck },
  { label: 'Cloud Setup',       icon: Cloud },
  { label: 'Get a Quote',       icon: FileText },
];

function AvatarIcon({ size = 32 }) {
  return (
    <img
      src="/alta_ai_icon.svg"
      alt="ALTA AI"
      width={size}
      height={size}
      style={{ display: 'block', width: size, height: size }}
      draggable={false}
    />
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);
  const FAB = 64;

  useEffect(() => {
    setPos({ x: window.innerWidth - FAB - 24, y: window.innerHeight - FAB - 24 });
    setInitialized(true);
    const onResize = () => {
      setPos((p) => ({
        x: Math.min(p.x, window.innerWidth - FAB - 8),
        y: Math.min(p.y, window.innerHeight - FAB - 8),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const w = widgetRef.current?.offsetWidth || FAB;
      const h = widgetRef.current?.offsetHeight || FAB;
      setPos({
        x: Math.min(Math.max(cx - dragOffset.current.x, 0), window.innerWidth - w),
        y: Math.min(Math.max(cy - dragOffset.current.y, 0), window.innerHeight - h),
      });
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  const startDrag = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    dragOffset.current = { x: cx - pos.x, y: cy - pos.y };
    setDragging(true);
    e.preventDefault();
  };

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input.trim(), time: now() }]);
    setInput('');
    setMessages((prev) => [...prev, { role: 'typing' }]);
    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.role !== 'typing');
        return [
          ...filtered,
          {
            role: 'assistant',
            content:
              'Thank you for your message. Our team will follow up shortly. ' +
              'For immediate assistance, call +251 11 550 2928 or visit /contact.',
            time: now(),
          },
        ];
      });
    }, 1200);
  };

  if (!initialized || pos.x === null) return null;

  const PANEL_W = 320;
  const PANEL_H = 460;
  const panelLeft = Math.min(Math.max(pos.x - PANEL_W + FAB, 8), window.innerWidth - PANEL_W - 8);
  const panelTop  = Math.min(Math.max(pos.y - PANEL_H - 12, 8), window.innerHeight - PANEL_H - 8);

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className="glass-dark border border-white/10 shadow-2xl rounded-2xl overflow-hidden select-none"
          style={{ position: 'fixed', left: panelLeft, top: panelTop, width: PANEL_W, zIndex: 49 }}
          role="dialog"
          aria-modal="false"
          aria-label="ALTA AI chat panel"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-grab active:cursor-grabbing border-b border-white/8"
            style={{ background: 'linear-gradient(135deg, #0D1E38 0%, #122444 100%)' }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
              <AvatarIcon size={36} />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-bold text-white text-[13px] leading-none tracking-tight">ALTA AI</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Enterprise IT Assistant</span>
            </div>
            <div className="flex items-center gap-1.5 mr-1">
              <span className="w-2 h-2 rounded-full bg-alta-green-light" aria-hidden="true" />
              <span className="text-[10px] text-alta-green-light font-medium">Online</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-white transition-colors duration-150 p-1 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue flex-shrink-0"
              aria-label="Minimize chat"
            >
              <Minimize2 size={14} />
            </button>
          </div>

          {/* Chat body */}
          <div
            className="overflow-y-auto px-4 py-4 scrollbar-hide flex flex-col gap-2"
            style={{ height: 272, background: 'rgba(5,13,26,0.95)' }}
          >
            {messages.length === 0 ? (
              <div>
                <div className="flex items-start gap-2.5 mb-3">
                  <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5">
                    <AvatarIcon size={28} />
                  </div>
                  <div
                    className="rounded-xl rounded-tl-sm px-3.5 py-2.5 text-[13px] text-slate-300 leading-relaxed"
                    style={{ background: 'rgba(27,79,216,0.12)', border: '1px solid rgba(27,79,216,0.2)' }}
                  >
                    Hello! I'm ALTA AI. How can I help you with IT solutions, products, or services today?
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-9">
                  {CHIPS.map(({ label, icon: ChipIcon }) => (
                    <button
                      key={label}
                      onClick={() => setInput(label)}
                      className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(148,163,184,0.9)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(27,79,216,0.25)'; e.currentTarget.style.borderColor = 'rgba(27,79,216,0.5)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(148,163,184,0.9)'; }}
                    >
                      <ChipIcon size={10} aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) =>
                msg.role === 'typing' ? (
                  <div key={i} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                      <AvatarIcon size={24} />
                    </div>
                    <div className="flex items-center gap-1 px-3.5 py-3 rounded-xl rounded-tl-sm" style={{ background: 'rgba(27,79,216,0.1)', border: '1px solid rgba(27,79,216,0.15)' }}>
                      {[0,1,2].map((d) => (
                        <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: `${d * 150}ms` }} aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                ) : msg.role === 'user' ? (
                  <div key={i} className="flex flex-col items-end gap-0.5">
                    <div className="text-[13px] text-white px-3.5 py-2.5 rounded-xl rounded-br-sm max-w-[82%] leading-relaxed" style={{ background: 'linear-gradient(135deg, #1B4FD8, #1340B0)' }}>
                      {msg.content}
                    </div>
                    {msg.time && <span className="text-[10px] text-slate-700 pr-1">{msg.time}</span>}
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                      <AvatarIcon size={24} />
                    </div>
                    <div className="flex flex-col gap-0.5 max-w-[82%]">
                      <div className="text-[13px] text-slate-300 px-3.5 py-2.5 rounded-xl rounded-tl-sm leading-relaxed" style={{ background: 'rgba(27,79,216,0.1)', border: '1px solid rgba(27,79,216,0.15)' }}>
                        {msg.content}
                      </div>
                      {msg.time && <span className="text-[10px] text-slate-700 pl-1">{msg.time}</span>}
                    </div>
                  </div>
                )
              )
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/8" style={{ background: 'rgba(10,22,40,0.98)' }}>
            <input
              type="text"
              className="flex-1 bg-transparent text-[13px] text-white placeholder-slate-600 focus:outline-none"
              style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '7px 12px', background: 'rgba(255,255,255,0.04)' }}
              placeholder="Ask about IT solutions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              aria-label="Message ALTA AI"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
              style={{ background: input.trim() ? 'linear-gradient(135deg, #16A34A, #15803D)' : 'rgba(255,255,255,0.06)' }}
              aria-label="Send message"
            >
              <Send size={14} className={input.trim() ? 'text-white' : 'text-slate-600'} />
            </button>
          </div>

          <div className="px-4 py-2 text-center" style={{ background: 'rgba(10,22,40,0.98)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="text-[10px] text-slate-700">Powered by ALTA Computec AI</span>
          </div>
        </div>
      )}

      {/* FAB */}
      <div
        ref={widgetRef}
        className="select-none"
        style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 50, width: FAB, height: FAB }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {/* Pulse rings — staggered, visible */}
        {!open && (
          <>
            <span className="absolute rounded-full pointer-events-none" style={{ inset: -8, borderRadius: '50%', border: '2px solid rgba(184,212,50,0.45)', animation: 'aiPulse 2.4s ease-out infinite' }} aria-hidden="true" />
            <span className="absolute rounded-full pointer-events-none" style={{ inset: -8, borderRadius: '50%', border: '2px solid rgba(184,212,50,0.25)', animation: 'aiPulse 2.4s ease-out 1.2s infinite' }} aria-hidden="true" />
          </>
        )}

        {/* FAB tooltip */}
        {!open && (
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ bottom: FAB + 8 }} aria-hidden="true">
            <span className="whitespace-nowrap text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ background: 'rgba(10,22,40,0.88)', border: '1px solid rgba(184,212,50,0.35)', color: 'rgba(184,212,50,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              Ask ALTA AI
            </span>
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          style={{ width: FAB, height: FAB, borderRadius: '50%', background: 'transparent', border: 'none', padding: 0, cursor: dragging ? 'grabbing' : 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: open ? 'brightness(0.6)' : 'drop-shadow(0 4px 16px rgba(27,79,216,0.4))', transition: 'filter 0.2s ease' }}
          aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
          aria-expanded={open}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <img src="/alta_ai_icon.svg" alt="ALTA AI" style={{ width: FAB, height: FAB, display: 'block', pointerEvents: 'none' }} draggable={false} />
          {open && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ background: 'rgba(5,13,26,0.55)' }} aria-hidden="true">
              <X size={22} className="text-white" />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
