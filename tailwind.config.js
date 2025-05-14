/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0077cc',
        secondary: '#f9f9f9',
        text: '#333',
        'text-light': '#666',
        border: '#eaeaea',
      },
    },
  },
  plugins: [],
} 