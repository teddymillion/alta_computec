import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Minimize2 } from 'lucide-react';

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const [input, setInput] = useState('');
  const dragOffset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef(null);
  const initialized = useRef(false);

  // Set default position after mount
  useEffect(() => {
    setPos({
      x: window.innerWidth - 88,
      y: window.innerHeight - 88,
    });
    initialized.current = true;
  }, []);

  // Drag logic
  useEffect(() => {
    if (!dragging) return;

    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const w = widgetRef.current?.offsetWidth || 64;
      const h = widgetRef.current?.offsetHeight || 64;
      setPos({
        x: Math.min(Math.max(clientX - dragOffset.current.x, 0), window.innerWidth - w),
        y: Math.min(Math.max(clientY - dragOffset.current.y, 0), window.innerHeight - h),
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
    if (e.target.closest('button') && !e.target.closest('.drag-handle')) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = widgetRef.current.getBoundingClientRect();
    dragOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
    setDragging(true);
    e.preventDefault();
  };

  if (!initialized.current || pos.x === null) return null;

  return (
    <div
      ref={widgetRef}
      className="fixed z-[9999] select-none"
      style={{ left: pos.x, top: pos.y, cursor: dragging ? 'grabbing' : 'grab' }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      aria-label="ALTA AI Assistant"
    >
      {/* Expanded chat panel */}
      {open && (
        <div
          className="absolute bottom-[72px] right-0 w-[320px] rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10, 22, 40, 0.97)',
            border: '1px solid rgba(27,79,216,0.25)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(27,79,216,0.1)',
            backdropFilter: 'blur(20px)',
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="drag-handle flex items-center justify-between px-4 py-3.5 border-b cursor-grab"
            style={{ borderColor: 'rgba(27,79,216,0.2)', background: 'rgba(27,79,216,0.08)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                <img src="/alta_ai.jpg" alt="ALTA AI" className="w-full h-full object-cover" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-alta-green-light border border-navy-900" />
              </div>
              <div>
                <p className="text-white font-bold text-[13px] leading-none">ALTA AI</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Enterprise IT Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
              aria-label="Close AI assistant"
            >
              <Minimize2 size={13} />
            </button>
          </div>

          {/* Chat area */}
          <div className="px-4 py-5 flex flex-col gap-3 min-h-[180px]">
            {/* Welcome message */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-alta-blue/20 border border-alta-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles size={11} className="text-alta-blue" />
              </div>
              <div
                className="rounded-xl rounded-tl-sm px-3.5 py-2.5 text-[13px] text-slate-300 leading-relaxed"
                style={{ background: 'rgba(27,79,216,0.12)', border: '1px solid rgba(27,79,216,0.15)' }}
              >
                Hi! I'm ALTA AI. Tell me about your IT challenge and I'll recommend the right solution.
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-1.5 pl-8">
              {['IT Infrastructure', 'Cybersecurity', 'Cloud Setup', 'Get a Quote'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInput(chip)}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(148,163,184,0.9)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(27,79,216,0.5)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(148,163,184,0.9)'; }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about IT solutions..."
                className="flex-1 bg-transparent text-[13px] text-white placeholder-slate-600 focus:outline-none"
                aria-label="Message ALTA AI"
              />
              <button
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue"
                style={{ background: input.trim() ? '#16A34A' : 'rgba(255,255,255,0.06)' }}
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <Send size={12} className={input.trim() ? 'text-white' : 'text-slate-600'} />
              </button>
            </div>
            <p className="text-[10px] text-slate-700 text-center mt-2">
              Powered by ALTA Computec AI · Logic coming soon
            </p>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue focus-visible:ring-offset-2"
        style={{
          background: open
            ? 'linear-gradient(135deg, #1340B0, #0D2D8A)'
            : 'linear-gradient(135deg, #1B4FD8, #1340B0)',
          boxShadow: open
            ? '0 8px 24px rgba(27,79,216,0.5)'
            : '0 8px 32px rgba(27,79,216,0.45), 0 0 0 1px rgba(27,79,216,0.3)',
        }}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
      >
        {/* Pulse ring when closed */}
        {!open && (
          <span
            className="absolute inset-0 rounded-2xl animate-ping"
            style={{ background: 'rgba(27,79,216,0.3)', animationDuration: '2.5s' }}
            aria-hidden="true"
          />
        )}

        {/* Icon */}
        <div className="relative z-10 transition-all duration-200 overflow-hidden" style={{ transform: open ? 'scale(0.9)' : 'scale(1)' }}>
          {open ? (
            <X size={20} className="text-white" />
          ) : (
            <img src="/alta_ai.jpg" alt="ALTA AI" className="w-8 h-8 rounded-xl object-cover" />
          )}
        </div>

        {/* Online dot */}
        {!open && (
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white"
            style={{ background: '#22C55E' }}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
