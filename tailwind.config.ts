import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        interTight: ['"Inter Tight"', 'sans-serif'],
        londrinaShadow: ['"Londrina Shadow"', 'cursive'],
        londrinaSolid: ['"Londrina Solid"', 'sans-serif'],
        pragatiNarrow: ['"Pragati Narrow"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
