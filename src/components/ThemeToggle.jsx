import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alta-blue rounded-full flex-shrink-0"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '52px',
        height: '28px',
        borderRadius: '14px',
        padding: 0,
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        background: isDark
          ? 'linear-gradient(135deg, #060D1A 0%, #1B4FD8 100%)'
          : 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
        boxShadow: isDark
          ? '0 0 0 1px rgba(27,79,216,0.5), 0 0 18px rgba(27,79,216,0.3), inset 0 1px 0 rgba(255,255,255,0.07)'
          : '0 0 0 1px rgba(245,158,11,0.6), 0 0 18px rgba(245,158,11,0.25), inset 0 1px 0 rgba(255,255,255,0.45)',
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Tiny star dots visible in dark mode */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: isDark ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span style={{ position: 'absolute', width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', top: 7, left: 8 }} />
        <span style={{ position: 'absolute', width: 1.5, height: 1.5, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', top: 15, left: 13 }} />
        <span style={{ position: 'absolute', width: 1, height: 1, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', top: 10, left: 17 }} />
      </span>

      {/* Sliding knob */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '4px',
          left: isDark ? '24px' : '4px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDark
            ? '0 2px 8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)'
            : '0 2px 8px rgba(245,158,11,0.35), 0 0 0 1px rgba(255,255,255,0.9)',
          transition: 'left 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
        }}
      >
        {isDark
          ? <Moon size={11} style={{ color: '#1B4FD8' }} />
          : <Sun size={11} style={{ color: '#F59E0B' }} />
        }
      </span>
    </button>
  );
}
