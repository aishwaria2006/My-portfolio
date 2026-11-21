import Link from "next/link";
import { winsGallery } from "@/lib/content";
import Reveal from "./Reveal";

/** The wins as a horizontal strip of large photographs. Scrolls sideways; captions set in mono. */
export default function PodiumStrip() {
  const items = winsGallery.filter((a) => a.photos?.length);
  return (
    <section id="wins" className="scroll-mt-24 py-16 md:py-24" aria-labelledby="wins-title">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-6">
          <div>
            <p className="meta">04 · Wins</p>
            <h2 id="wins-title" className="display mt-4 text-[clamp(2.4rem,5.5vw,5.5rem)] uppercase">
              From the <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>podium</span>
            </h2>
          </div>
          <p className="meta hidden text-right md:block">
            4 first places
            <br />
            Sep 2025 to Feb 2026
          </p>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
        <ul className="flex w-max gap-4 px-5 md:gap-6 md:px-10">
          {items.map((a, i) => {
            return (
              <Reveal key={a.slug} delay={Math.min(i * 0.05, 0.25)}>
                <li className="w-[78vw] shrink-0 sm:w-[60vw] md:w-[42vw] lg:w-[34vw]">
                  <Link href={`/achievements#${a.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bg-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.photos![0]}
                        alt={`${a.title}, ${a.event}`}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                        style={{ objectPosition: a.cover ?? "50% 50%" }}
                        loading="lazy"
                      />
                      <span className="meta absolute left-4 top-4 rounded-full bg-bg/70 px-2.5 py-1 text-fg backdrop-blur-sm">{a.date}</span>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-3">
                      <div>
                        <p className="font-display text-[1.35rem] font-semibold leading-tight tracking-tight">
                          {a.place === 1 ? <span className="text-accent">1st place</span> : a.title}
                          <span className="text-muted"> · {a.short}</span>
                        </p>
                        <p className="mt-1 max-w-[42ch] text-[0.92rem] text-muted">{a.event}</p>
                      </div>
                      <span className="meta shrink-0 pt-1">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </Link>
                </li>
              </Reveal>
            );
          })}
          <li className="w-[40vw] shrink-0 md:w-[20vw]">
            <Link href="/achievements" className="flex h-full min-h-[14rem] items-end rounded-sm border border-line p-5 transition hover:border-fg">
              <span className="meta text-fg">All achievements →</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
