import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        noto: ['var(--font-noto-sans)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        violet: '#C52184',   // Violet
        red: '#E50914',    // Netflix Red
        amber: '#FF8325',  // Amber
        green: '#197C1C',
        smoke: '#F2F4F3', // White smoke
        black: '#050505', // Dark Charcoal
        eerie: '#212121',  // Dark Gray
        dim_gray: '#616161', // Medium Gray
        white: '#FFFFFF',  // White
        slate: '#6E8894', // Slate Gray
        peach: '#FFC78F',
      },
    },
  },
  plugins: [],
} satisfies Config;
