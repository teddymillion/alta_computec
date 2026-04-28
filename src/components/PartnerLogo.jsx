import { useState } from 'react';
import { LOGO_SOURCES, LOGO_META } from '../data/partnerLogos';

function lum(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export default function PartnerLogo({ name, size = 64, className = '' }) {
  const [idx, setIdx] = useState(0);
  const sources = LOGO_SOURCES[name] ?? [];
  const { color, initials } = LOGO_META[name] ?? { color: '#475569', initials: (name ?? '??').slice(0, 2).toUpperCase() };

  if (idx >= sources.length) {
    const textColor = lum(color) > 145 ? '#111827' : '#ffffff';
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.22),
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-label={name}
      >
        <span style={{ color: textColor, fontSize: Math.round(size * 0.28), fontWeight: 800, letterSpacing: '0.04em' }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      key={sources[idx]}
      src={sources[idx]}
      alt={`${name} logo`}
      width={size}
      height={size}
      onError={() => setIdx((i) => i + 1)}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
      loading="lazy"
    />
  );
}
