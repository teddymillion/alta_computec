/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#03080F',
          900: '#0A1628',
          800: '#0D1E38',
          700: '#122444',
          600: '#1A3260',
        },
        alta: {
          blue: '#1B4FD8',
          'blue-light': '#2563EB',
          'blue-dark': '#1340B0',
          green: '#16A34A',
          'green-light': '#22C55E',
          'green-dark': '#15803D',
          indigo: '#6366F1',
          sky: '#0EA5E9',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        display: ['60px', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-sm': ['48px', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }],
        h1: ['40px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['22px', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        h4: ['17px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      spacing: {
        4.5: '18px',
        13: '52px',
        18: '72px',
        22: '88px',
        26: '104px',
        30: '120px',
      },
      maxWidth: {
        '8xl': '1440px',
        '9xl': '1600px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0,0,0,0.05)',
        'sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'lg': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'xl': '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.18)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.3)',
        'card-dark-hover': '0 16px 40px rgba(0,0,0,0.4)',
        'glow-blue': '0 0 0 3px rgba(27,79,216,0.15)',
        'glow-green': '0 0 0 3px rgba(22,163,74,0.15)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.06)',
        'nav': '0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-down': 'slideDown 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
