"use client";

import { useState } from "react";

type Group = { group: string; items: { name: string; usedIn: string[] }[] };

/** Skills grouped by domain. Selecting a skill shows where it was used, based on the portfolio content. */
export default function SkillExplorer({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="border-t border-line-strong">
      {groups.map((g, gi) => {
        const selected = g.items.find((i) => `${g.group}:${i.name}` === active);
        return (
          <section key={g.group} className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="meta text-accent">{String(gi + 1).padStart(2, "0")}</p>
              <h2 className="display-wide mt-2 font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.02em]">{g.group}</h2>
              <p className="meta mt-2">{g.items.length} tools</p>
            </div>
            <div className="md:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {g.items.map((i) => {
                  const key = `${g.group}:${i.name}`;
                  const on = key === active;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setActive(on ? null : key)}
                        className={`rounded-full border px-3.5 py-1.5 text-[0.9rem] transition ${on ? "border-accent bg-accent text-bg" : "border-line text-fg/90 hover:border-fg"}`}
                      >
                        {i.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p aria-live="polite" className="mt-5 min-h-[1.6em] text-[0.95rem] text-muted">
                {selected
                  ? selected.usedIn.length
                    ? <><span className="text-fg">{selected.name}</span> appears in {selected.usedIn.join(", ")}.</>
                    : `${selected.name} is part of my toolkit; it isn't tied to a specific entry on this site.`
                  : "Select a skill to see where it was used."}
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
