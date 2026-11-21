import type { Achievement } from "@/lib/content";

const label = (a: Achievement) => {
  if (a.place === 1) return "1st";
  if (a.kind === "Speaking") return "Talk";
  if (a.kind === "Award") return "Award";
  if (a.title.startsWith("Top")) return "Top 10";
  if (a.title.startsWith("Rank")) return a.title.replace("Rank ", "#");
  return "Entry";
};

/** A typographic badge for an achievement. First places are set in the accent. */
export default function Medal({ a, size = "md" }: { a: Achievement; size?: "sm" | "md" }) {
  const first = a.place === 1;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-mono uppercase tracking-[0.12em] ${
        size === "sm" ? "h-9 min-w-9 px-2 text-[0.6rem]" : "h-12 min-w-12 px-3 text-[0.68rem]"
      } ${first ? "border-accent bg-accent text-bg" : "border-line-strong text-fg"}`}
      aria-label={a.title}
    >
      {label(a)}
    </span>
  );
}
