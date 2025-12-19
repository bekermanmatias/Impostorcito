import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#1a0a2e",
          secondary: "#16213e",
          accent: "#0f3460",
        },
        neon: {
          purple: "#a855f7",
          pink: "#ec4899",
          cyan: "#06b6d4",
        },
      },
    },
  },
  plugins: [],
};
export default config;

