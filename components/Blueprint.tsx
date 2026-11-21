"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { edges, layers, nodes, type SysNode } from "@/lib/system";

type Path = { key: string; d: string; a: string; b: string };

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const layerArt: Record<string, string> = {
  Product: "var(--accent)",
  Platform: "var(--fg)",
  Cloud: "var(--accent-soft)",
  Clients: "var(--accent-pale)",
};

/**
 * The production system at Adya AI, drawn as an interactive architecture diagram.
 * Nodes are buttons. Selecting one highlights its connections and opens its detail below.
 */
export default function Blueprint({ initial = "A3" }: { initial?: string }) {
  const [selected, setSelected] = useState<string>(initial);
  const [hover, setHover] = useState<string | null>(null);
  const [paths, setPaths] = useState<Path[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const reduce = useReducedMotion();
  const focus = hover ?? selected;
  const node = nodes.find((n) => n.id === selected)!;

  const measure = useCallback(() => {
    const box = wrap.current?.getBoundingClientRect();
    if (!box) return;
    const stacked = window.innerWidth < 768;
    const next: Path[] = [];
    for (const [a, b] of edges) {
      const ea = refs.current[a]?.getBoundingClientRect();
      const eb = refs.current[b]?.getBoundingClientRect();
      if (!ea || !eb) continue;
      if (stacked) {
        const x1 = ea.right - box.left, y1 = ea.top + ea.height / 2 - box.top;
        const x2 = eb.right - box.left, y2 = eb.top + eb.height / 2 - box.top;
        const bend = Math.max(x1, x2) + 18 + Math.abs(y2 - y1) / 40;
        next.push({ key: a + b, a, b, d: `M${x1},${y1} C${bend},${y1} ${bend},${y2} ${x2},${y2}` });
      } else if (Math.abs(ea.left - eb.left) < 8) {
        const x = ea.left - box.left;
        const y1 = ea.top + ea.height / 2 - box.top, y2 = eb.top + eb.height / 2 - box.top;
        const bulge = 24 + Math.abs(y2 - y1) / 8;
        next.push({ key: a + b, a, b, d: `M${x},${y1} C${x - bulge},${y1} ${x - bulge},${y2} ${x},${y2}` });
      } else {
        const x1 = ea.right - box.left, y1 = ea.top + ea.height / 2 - box.top;
        const x2 = eb.left - box.left, y2 = eb.top + eb.height / 2 - box.top;
        const fromRight = x2 > x1;
        const sx = fromRight ? x1 : ea.left - box.left;
        const tx = fromRight ? x2 : eb.right - box.left;
        const dx = Math.max(40, Math.abs(tx - sx) / 2);
        next.push({ key: a + b, a, b, d: `M${sx},${y1} C${sx + (fromRight ? dx : -dx)},${y1} ${tx - (fromRight ? dx : -dx)},${y2} ${tx},${y2}` });
      }
    }
    setPaths(next);
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const linked = (id: string) => edges.some(([a, b]) => (a === focus && b === id) || (b === focus && a === id));

  return (
    <div>
      <div ref={wrap} className="relative">
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <marker id="bp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--lavender-deep)" />
            </marker>
          </defs>
          {paths.map((p) => {
            const on = p.a === focus || p.b === focus;
            return (
              <path
                key={p.key}
                d={p.d}
                fill="none"
                stroke={on ? "var(--lavender-deep)" : "var(--graphite)"}
                strokeOpacity={on ? 1 : 0.22}
                strokeWidth={on ? 1.8 : 1}
                strokeDasharray={on ? undefined : "4 5"}
                markerEnd={on ? "url(#bp-arrow)" : undefined}
                className={on ? "" : "hidden md:inline"}
                style={{ transition: "stroke-opacity .3s, stroke .3s" }}
              />
            );
          })}
        </svg>

        <div className="relative grid gap-x-10 gap-y-8 md:grid-cols-4 md:gap-x-12 lg:gap-x-16">
          {layers.map((l) => {
            const items = nodes.filter((n) => n.layer === l.name);
            return (
              <section key={l.name} aria-label={`${l.name} layer`} className="flex flex-col">
                <header className="mb-4 flex items-center gap-3 border-b border-rule pb-3">
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: layerArt[l.name] }} />
                  <div>
                    <p className="font-display text-lg font-semibold leading-tight tracking-tight">{l.name}</p>
                    <p className="meta mt-0.5">{l.caption}</p>
                  </div>
                </header>
                <ul className="flex flex-1 flex-col justify-center gap-3 pr-10 md:pr-0">
                  {items.map((n) => (
                    <li key={n.id}>
                      <NodeButton
                        n={n}
                        active={selected === n.id}
                        linked={linked(n.id)}
                        refCb={(el) => (refs.current[n.id] = el)}
                        onSelect={() => {
                          setSelected(n.id);
                          if (window.innerWidth < 768) {
                            setTimeout(() => detailRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), 50);
                          }
                        }}
                        onHover={(on) => setHover(on ? n.id : null)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div ref={detailRef} className="mt-8 scroll-mt-24 rounded-md border border-line bg-bg" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={node.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 p-6 md:grid-cols-12 md:p-7"
          >
            <div className="md:col-span-4">
              <p className="meta text-accent">
                {node.id} · {node.layer}
              </p>
              <h3 className="display-wide mt-2 font-display text-[2rem] font-semibold leading-tight tracking-[-0.03em]">{node.label}</h3>
              {node.note && <p className="mt-2 text-graphite">{node.note}</p>}
              {node.link && (
                <Link href={node.link.href} className="mt-5 inline-flex items-center gap-2 text-[0.95rem] link-underline">
                  {node.link.text} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
            <ul className="space-y-3 md:col-span-8">
              {node.points.map((p) => (
                <li key={p.text} className="flex gap-3 text-[0.98rem] leading-relaxed">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: layerArt[node.layer] }} />
                  <span>
                    {p.label && <span className="font-medium">{p.label}. </span>}
                    <span className="text-graphite">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function NodeButton({
  n, active, linked, refCb, onSelect, onHover,
}: {
  n: SysNode; active: boolean; linked: boolean;
  refCb: (el: HTMLButtonElement | null) => void; onSelect: () => void; onHover: (on: boolean) => void;
}) {
  return (
    <button
      ref={refCb}
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className={`relative block w-full rounded-md border px-4 py-3 text-left transition-all duration-300 ${
        active ? "border-accent bg-accent-wash" : linked ? "border-accent-soft bg-bg-2" : "border-line bg-bg-2 hover:border-fg"
      }`}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight">{n.label}</span>
        <span className="font-mono text-[0.62rem] text-muted">{n.id}</span>
      </span>
      <span className="mt-0.5 block text-xs leading-snug text-graphite">{n.sub}</span>
    </button>
  );
}
