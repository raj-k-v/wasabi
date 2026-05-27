import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        line: "var(--line)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        panel: "var(--panel)",
        cyan: "#41d1ff",
        violet: "#8b7cff",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        glass: "0 30px 80px rgba(0, 0, 0, 0.28)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 70px rgba(65, 209, 255, 0.12)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top, rgba(65,209,255,0.18), transparent 30%), radial-gradient(circle at 80% 20%, rgba(139,124,255,0.16), transparent 24%), linear-gradient(180deg, #0b1120 0%, #0f172a 50%, #111827 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2.6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
