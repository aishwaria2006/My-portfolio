import { moments } from "@/lib/content";
import Reveal from "./Reveal";

/** Non-award moments as a row of photo cards: events attended, visits, club life. */
export default function MomentsStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {moments.map((m, i) => (
        <Reveal key={m.slug} delay={Math.min(i * 0.06, 0.2)}>
          <li className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-rule bg-lavender-wash">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.photos[0]} alt={m.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" style={{ objectPosition: m.cover ?? "50% 50%" }} loading="lazy" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <span className="meta absolute left-3 top-3 rounded-full bg-bg/70 px-2.5 py-1 text-fg">{m.date}</span>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-xl font-semibold leading-tight tracking-tight text-white">{m.title}</p>
              <p className="mt-1 text-xs text-white/85">{m.line}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
