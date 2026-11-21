"use client";

import { motion, useReducedMotion } from "framer-motion";
import { person } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/** One word per line, each rising out of a clipped box. */
function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="top" className="relative px-5 pt-20 md:px-10 md:pt-16" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[96rem]">
        {/* Top meta line */}
        <motion.div {...fade(0.1)} className="meta flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <span>AI engineer in DevOps</span>
          <span className="hidden sm:inline">Final-year B.Tech, AI &amp; Data Science</span>
          <span>Portfolio 2026</span>
        </motion.div>

        {/* Name */}
        <h1 id="hero-title" className="display mt-8 text-[clamp(3rem,9.6vw,10rem)] uppercase md:mt-10">
          <Rise delay={0.15}>
            Aishwaria <span className="text-accent">V</span>
          </Rise>
          <Rise delay={0.28}>
            <span className="serif-i block text-[0.42em] normal-case text-fg/90" style={{ fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              ships to production.
            </span>
          </Rise>
        </h1>

        {/* Lower row: statement + photo */}
        <div className="mt-8 grid items-start gap-8 md:mt-8 md:grid-cols-12">
          <motion.div {...fade(0.6)} className="md:col-span-6 md:pt-2 lg:col-span-5">
            <p className="max-w-[42ch] text-[1.1rem] leading-[1.5] text-fg/90 md:text-[1.2rem]">
              Software Developer Intern at Adya AI. I build agentic features and run the cloud they live on: three providers, four production clusters.
              Four national hackathon wins in six months.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a href="#work" className="meta flex items-center gap-3 text-fg">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition group-hover:border-fg">↓</span>
                Selected work
              </a>
              <a href={person.resumeUrl} className="meta text-fg link-underline">Resume</a>
              <a href={person.links.linkedin} target="_blank" rel="noreferrer" className="meta text-fg link-underline">LinkedIn</a>
            </div>
          </motion.div>

          <motion.figure
            className="relative md:col-span-6 md:col-start-7"
            initial={reduce ? false : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.5, ease }}
          >
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-bg-2 md:aspect-[4/3] md:max-h-[32rem]">
              {person.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.photo}
                  alt={`Portrait of ${person.name}`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  style={{ objectPosition: person.photoPosition ?? "50% 50%" }}
                />
              )}
            </div>
            <figcaption className="meta mt-3 flex items-center justify-between">
              <span>{person.photoCaption}</span>
              <span>Fig. 00</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
