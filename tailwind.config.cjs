// tailwind.config.cjs
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Accent (أزرق عصري)
        primary: "#3B82F6",

        // Secondary Accent (برتقالي لافت)
        secondary: "#F97316",

        // Neutral / Background Palette
        background: "#F9FAFB",
        card: "#FFFFFF",
        gray800: "#1F2937",
        gray500: "#6B7280",
        gray200: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",       // shadow-sm
        cardHover: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", // shadow-md
      },
      borderRadius: {
        pill: "9999px",    // rounded-full
        lg: "0.5rem",      // rounded-lg
      },
      spacing: {
        navbarHeight: "4rem",  // 64px
      },
    },
  },
  plugins: [],
};
