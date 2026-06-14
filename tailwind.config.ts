import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"DM Serif Display"', "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', '"Fira Code"', "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
