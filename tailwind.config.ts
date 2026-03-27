import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-montserrat)', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
        body:    ['var(--font-montserrat)', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        /* Light palette */
        bg:       '#ffffff',
        surface:  '#fafafa',
        surface2: '#f5f5f5',
        border:   '#e5e5e5',
        fg:       '#000000',
        'fg-2':   '#888888',
        'fg-3':   '#cccccc',
        accent:   '#000000',        // black as primary accent on white
        lime:     '#CAFF33',        // kept for micro-accents only
      },
      animation: {
        marquee:          'marquee 32s linear infinite',
        'marquee-reverse':'marquee-reverse 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
