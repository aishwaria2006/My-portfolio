"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const text =
  "I am a final-year AI student who already runs a company's cloud. By day I ship agents and infrastructure at Adya AI, across Azure, AWS and GCP. On weekends I win hackathons. I care about the part after the demo works: getting it to run for real, watched and safe.";

const emphasis = new Set(["runs", "company's", "cloud.", "agents", "infrastructure", "win", "hackathons.", "real,", "watched", "safe."]);

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const start = i / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const strong = emphasis.has(word);
  return (
    <motion.span style={{ opacity }} className={strong ? "serif-i text-accent" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** A statement that lights up word by word as you scroll through it. */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <section ref={ref} id="statement" aria-label="Introduction" className="mx-auto max-w-[96rem] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-8 md:grid-cols-12">
        <p className="meta md:col-span-3">01 · Statement</p>
        <p className="display-wide font-display text-[clamp(1.6rem,3vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] md:col-span-9">
          {reduce
            ? words.map((w, i) => (
                <span key={i} className={emphasis.has(w) ? "serif-i text-accent" : undefined}>{w} </span>
              ))
            : words.map((w, i) => <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} />)}
        </p>
      </div>
    </section>
  );
}
