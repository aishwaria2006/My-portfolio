import Link from "next/link";
import { releases, type Tag } from "@/lib/system";
import Reveal from "./Reveal";

const tagStyle: Record<Tag, string> = {
  Won: "border-accent bg-accent text-bg",
  Shipped: "border-fg bg-fg text-bg",
  Joined: "border-line-strong text-fg",
  Spoke: "border-line-strong text-fg",
  Started: "border-line text-muted",
  Attended: "border-line text-muted",
  "In progress": "border-accent text-accent",
};

/** Every milestone so far, newest first. Dates are real; versions are a framing device. */
export default function Timeline({ limit }: { limit?: number }) {
  const items = limit ? releases.slice(0, limit) : releases;
  return (
    <ol className="border-t border-line-strong">
      {items.map((r, i) => (
        <Reveal key={r.version} delay={Math.min(i * 0.03, 0.15)}>
          <li className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="meta">
                {r.date} <span className="text-accent">· {r.version}</span>
                {i === 0 && <span className="ml-2 text-fg">Latest</span>}
              </p>
            </div>
            <div className="md:col-span-9">
              <h3 className="display-wide font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">{r.title}</h3>
              <ul className="mt-4 space-y-3">
                {r.notes.map((n) => (
                  <li key={n.text} className="grid gap-x-4 gap-y-1 sm:grid-cols-[7rem_1fr]">
                    <span className={`inline-flex h-6 w-fit items-center rounded-full border px-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] ${tagStyle[n.tag]}`}>{n.tag}</span>
                    <span className="max-w-[64ch] text-[0.98rem] leading-relaxed text-muted">
                      {n.href ? <Link href={n.href} className="hover:text-fg">{n.text}</Link> : n.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
