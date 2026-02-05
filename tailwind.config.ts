import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // White Theme Design Tokens
        primary: {
          bg: '#FFFFFF',
          'bg-secondary': '#F8FAFC',
          surface: '#F1F5F9',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(255, 255, 255, 0.2)',
          strong: 'rgba(255, 255, 255, 0.85)',
        },
        text: {
          DEFAULT: '#0F172A',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        accent: {
          DEFAULT: '#6366F1',
          glow: '#818CF8',
          soft: 'rgba(99, 102, 241, 0.1)',
        },
        border: {
          DEFAULT: '#E2E8F0',
        },
        // Legacy compatibility
        aether: {
          bg: '#FFFFFF',
          surface: '#F8FAFC',
          border: '#E2E8F0',
          text: '#0F172A',
          muted: '#64748B',
          accent: '#6366f1',
          glow: '#818cf8',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
        },
      },
      borderRadius: {
        'aether': '12px',
        'aether-lg': '16px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'aether': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'aether-glow': '0 0 40px rgba(99, 102, 241, 0.15)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 40px rgba(99, 102, 241, 0.15)',
        'glow-strong': '0 0 60px rgba(99, 102, 241, 0.25)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '80px', letterSpacing: '-0.02em' }],
        'title': ['48px', { lineHeight: '56px', letterSpacing: '-0.01em' }],
        'heading': ['32px', { lineHeight: '40px' }],
        'subheading': ['24px', { lineHeight: '32px' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'ripple': 'ripple 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.4' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
