import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-pale": "var(--accent-pale)",
        "accent-wash": "var(--accent-wash)",
        // legacy names used by inner pages
        paper: "var(--paper)",
        sheet: "var(--sheet)",
        ink: "var(--ink)",
        graphite: "var(--graphite)",
        rule: "var(--rule)",
        lavender: "var(--lavender)",
        "lavender-deep": "var(--lavender-deep)",
        "lavender-wash": "var(--lavender-wash)",
        coral: "var(--coral)",
        mint: "var(--mint)",
        gold: "var(--gold)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Instrument Sans Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { measure: "64ch" },
      boxShadow: { glow: "none" },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
