"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/lib/content";
import ProjectPlate from "./ProjectPlate";

/**
 * Selected work as an index. On desktop the hovered project's visual floats after the cursor;
 * on phones each row carries its visual inline.
 */
export default function WorkList() {
  const [active, setActive] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = projects.find((p) => p.slug === active);

  return (
    <section id="work" className="mx-auto max-w-[96rem] scroll-mt-24 px-5 py-16 md:px-10 md:py-24" aria-labelledby="work-title">
      <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-6">
        <div>
          <p className="meta">02 · Selected work</p>
          <h2 id="work-title" className="display mt-4 text-[clamp(2.4rem,5.5vw,5.5rem)] uppercase">Work</h2>
        </div>
        <p className="meta hidden text-right md:block">
          {projects.length} projects
          <br />
          2025 to now
        </p>
      </div>

      <div ref={wrap} className="relative" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
        <ol>
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setActive(p.slug)}
                onFocus={() => setActive(p.slug)}
                className="group grid gap-4 py-7 md:grid-cols-12 md:items-center md:py-9"
              >
                <span className="meta md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="md:col-span-6">
                  <span className="display-wide block font-display text-[clamp(1.7rem,3.2vw,3.1rem)] font-semibold leading-[0.98] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                    {p.name}
                  </span>
                </span>
                <span className="text-[0.98rem] text-muted md:col-span-3">{p.tagline}</span>
                <span className="meta flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span>{p.period.split(" - ")[0]}</span>
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">→</span>
                </span>
                {/* Inline visual on phones */}
                <span className="md:hidden">
                  <ProjectPlate project={p} className="!rounded-sm" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* Floating preview, desktop only */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[22rem] md:block"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        >
          <AnimatePresence mode="popLayout">
            {current && (
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96, rotate: 2 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-sm shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
              >
                <ProjectPlate project={current} className="!rounded-sm" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link href="/projects" className="meta text-fg link-underline">All case studies</Link>
      </div>
    </section>
  );
}
