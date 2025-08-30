/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // green
        green: {
          50: "#f0f7f2",
          100: "#d4e8d9",
          200: "#b8d9c0",
          300: "#9ccaa7",
          400: "#80bb8e",
          500: "#64ac75",
          600: "#509d5c",
          700: "#3c8e43",
          800: "#287f2a",
          900: "#134324",
        },
        // cyan
        cyan: {
          50: "#f0fbfb",
          100: "#d1f5f4",
          200: "#b2efed",
          300: "#93e9e6",
          400: "#74e3df",
          500: "#55ddd8",
          600: "#44d7d1",
          700: "#33a8a7",
          800: "#22797d",
          900: "#114a53",
        },
        // blue
        accent: {
          50: "#f2f9fb",
          100: "#d7f0f6",
          200: "#bce7f1",
          300: "#a1deec",
          400: "#86d5e7",
          500: "#6bcce2",
          600: "#50c3dd",
          700: "#359ad8",
          800: "#2681c3",
          900: "#238aa6",
        },
        // gray
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
