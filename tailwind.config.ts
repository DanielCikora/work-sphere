import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f9fafb",
          primaryText: "#111827",
          secondaryText: "#6b7280",
          accent: "#3b82f6",
          accentHover: "#2563eb",
          border: "#d1d5db",
          cardBackground: "#ffffff",
          tagBackground: "#e5e7eb",
          tagText: "#374151",
        },
        dark: {
          background: "#1f2937",
          primaryText: "#f9fafb",
          secondaryText: "#9ca3af",
          accent: "#3b82f6",
          accentHover: "#2563eb",
          border: "#4b5563",
          cardBackground: "#374151",
          tagBackground: "#4b5563",
          tagText: "#d1d5db",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
