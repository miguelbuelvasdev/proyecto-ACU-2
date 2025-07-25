/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gold: '#D4AF37',
          goldLight: '#F4C460',
          goldDark: '#996515',
          goldMetal: '#B8860B',
        },
        accent: {
          blue: '#00F0FF',
          blueLight: '#40F4FF',
          blueDark: '#0080FF',
          purple: '#8A2BE2',
          purpleLight: '#A855F7',
          purpleDark: '#6B1A9A',
        },
        neutral: {
          dark: '#1A1A1A',
          darker: '#0F0F0F',
          light: '#F5F5F5',
          gray: '#2D2D2D',
          grayLight: '#404040',
          grayDark: '#1F1F1F',
          white: '#FFFFFF',
          black: '#000000',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        'futuristic': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'pulse-gold': 'pulseGold 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px #D4AF37' },
          '50%': { boxShadow: '0 0 40px #F4C460' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #D4AF37' },
          '100%': { textShadow: '0 0 20px #F4C460, 0 0 30px #D4AF37' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37, #F4C460, #B8860B)',
        'gradient-blue': 'linear-gradient(135deg, #00F0FF, #40F4FF, #0080FF)',
        'gradient-purple': 'linear-gradient(135deg, #8A2BE2, #A855F7, #6B1A9A)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A, #2D2D2D, #0F0F0F)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'blue': '0 0 20px rgba(0, 240, 255, 0.3)',
        'purple': '0 0 20px rgba(138, 43, 226, 0.3)',
        'inner-gold': 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
        'glow-gold': '0 0 30px rgba(212, 175, 55, 0.6)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}

