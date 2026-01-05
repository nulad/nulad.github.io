/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        brutalist: {
          black: '#000000',
          white: '#ffffff',
        },
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
    },
  },
  plugins: [],
  // Disable utilities that conflict with brutalism
  corePlugins: {
    boxShadow: false,
    borderRadius: false,
  },
}

