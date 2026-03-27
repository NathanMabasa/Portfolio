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
        sans:    ['var(--font-inter-tight)', 'sans-serif'],
        display: ['var(--font-inter-tight)', 'sans-serif'],
        body:    ['var(--font-inter-tight)', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg:       '#0d0d0d',
        surface:  '#111111',
        surface2: '#161616',
        border:   '#222222',
        fg:       '#ffffff',
        'fg-2':   '#777777',
        'fg-3':   '#333333',
        accent:   '#caff33',
        lime:     '#caff33',
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
