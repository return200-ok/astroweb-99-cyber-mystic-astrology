/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			retro: ['VT323', 'monospace'],
  			mono: ['Space Mono', 'monospace'],
  		},
  		colors: {
  			background: '#09090b',
  			foreground: '#ffffff',
  			magenta: {
  				500: '#ff00ff',
  			},
  			cyan: {
  				500: '#00f3ff',
  			},
  			primary: {
  				DEFAULT: '#ff00ff',
  				foreground: '#ffffff',
  			},
  			secondary: {
  				DEFAULT: '#00f3ff',
  				foreground: '#000000',
  			},
  			border: '#ff00ff',
  		},
  		boxShadow: {
  			neon: '0 0 10px #ff00ff',
  			'neon-cyan': '0 0 10px #00f3ff',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}