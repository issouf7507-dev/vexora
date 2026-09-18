/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // VECXORA — charte graphique : orange #FF6400, noir #080808, blanc #FFFFFF.
        // 950→700 = déclinaisons du noir, 600→300 = déclinaisons de l'orange.
        brand: {
          950: '#080808', // Noir profond (fonds de section)
          900: '#121212', // Noir lifté (cartes sur fond sombre)
          800: '#1c1c1c',
          700: '#8f3300', // Orange brûlé (bordures, ombres portées)
          600: '#c24000', // Orange lisible sur fond clair (AA — texte)
          500: '#ff6400', // ORANGE PRESTIGE — couleur officielle
          400: '#ff7f2a', // Survols, aplats
          300: '#ff9c5c', // Accents sur fond sombre
        },
        cream: '#fdf8f5', // Blanc chaud de la charte
        ink: '#080808', // Noir profond
      },
      fontFamily: {
        // Titres / accroches : Bebas Neue Bold
        display: ['"Bebas Neue"', 'Oswald', 'Impact', 'sans-serif'],
        // Sous-titres et textes courants : Montserrat
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.22em',
        display: '0.02em',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
