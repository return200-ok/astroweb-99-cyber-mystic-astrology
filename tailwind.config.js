/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			mystic: ['Cinzel', 'serif'],
  			serif: ['Spectral', 'serif'],
  		},
  		colors: {
  			background: '#1e1b4b',
  			foreground: '#e0e7ff',
  			gold: {
  				400: '#ffdf4d',
  				500: '#ffd700',
  				600: '#ccac00',
  			},
  			indigo: {
  				900: '#1e1b4b',
  				950: '#0f0d2b',
  			},
  			primary: {
  				DEFAULT: '#ffd700',
  				foreground: '#1e1b4b',
  			},
  			secondary: {
  				DEFAULT: '#e0e7ff',
  				foreground: '#1e1b4b',
  			},
  			border: '#ffd700',
  		},
  		boxShadow: {
  			'ethereal-glow': '0 0 15px rgba(255, 215, 0, 0.3)',
  			'inner-glow': 'inset 0 0 10px rgba(255, 215, 0, 0.2)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}