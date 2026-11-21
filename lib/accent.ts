import type { Accent } from "./content";

/** CSS variable for each accent colour, so artwork and badges follow the theme. */
export const accentVar: Record<Accent, string> = {
  lavender: "var(--lavender)",
  coral: "var(--coral)",
  mint: "var(--mint)",
  gold: "var(--gold)",
};

export const accentDeepVar: Record<Accent, string> = {
  lavender: "var(--lavender-deep)",
  coral: "var(--coral)",
  mint: "var(--mint)",
  gold: "var(--gold)",
};
