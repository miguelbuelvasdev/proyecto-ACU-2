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
        },
        // Colores personalizados
        'FFD439': '#FFD439', // Amarillo vibrante
        'F4A300': '#F4A300', // Naranja dorado
        '256B3E': '#256B3E', // Verde oscuro
        'FCD94B': '#FCD94B', // Amarillo claro
        'FFFFFF': '#FFFFFF', // Blanco
      },
      fontFamily: {
        'futuristic': ['Poppins', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      // ... (otros estilos)
    },
  },
  plugins: [],
}
