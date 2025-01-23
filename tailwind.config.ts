import type { Config } from "tailwindcss";
import daisyui from "./node_modules/daisyui/src/index.d";
export default {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBackground: "#f9fafb",
        lightPrimaryText: "#111827",
        lightSecondaryText: "#6b7280",
        lightAccent: "#3b82f6",
        lightAccentHover: "#2563eb",
        lightBorder: "#d1d5db",
        lightCardBackground: "#ffffff",
        lightTagBackground: "#e5e7eb",
        lightTagText: "#374151",
        darkBackground: "#1f2937",
        darkPrimaryText: "#f9fafb",
        darkSecondaryText: "#9ca3af",
        darkAccent: "#3b82f6",
        darkAccentHover: "#2563eb",
        darkBorder: "#4b5563",
        darkCardBackground: "#374151",
        darkTagBackground: "#4b5563",
        darkTagText: "#d1d5db",
      },
    },
    daisyui: {
      themes: ["dark", "light"],
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
