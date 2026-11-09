export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        bg: '#0A0A0B',
        surface: '#111827',
        'surface-elevated': '#1F2937',
        primary: '#2563EB',
        'primary-hover': '#1D4ED8',
        secondary: '#4F46E5',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        border: '#334155',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ticker': 'ticker 28s linear infinite',
        'glow-pulse': 'glowPulse 18s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 10px 25px rgba(0,0,0,0.25)',
        'glow': '0 0 40px rgba(37,99,235,0.18)',
      },
      borderRadius: {
        'xl': '24px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
}
