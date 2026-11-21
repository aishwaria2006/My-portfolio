"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { person } from "@/lib/content";
import LocalTime from "./LocalTime";

/**
 * One set of labels everywhere. On the homepage each label scrolls to its chapter and lights up
 * as you pass through it; on inner pages the same label opens the full page.
 */
const nav = [
  { label: "Work", section: "work", page: "/projects" },
  { label: "Experience", section: "now", page: "/experience" },
  { label: "Wins", section: "wins", page: "/achievements" },
  { label: "About", section: "about", page: "/about" },
  { label: "Contact", section: "contact", page: "/#contact" },
];

export default function SiteHeader() {
  const path = usePathname();
  const home = path === "/";
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!home) return;
    const ids = nav.map((n) => n.section);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const seen = new Map<string, boolean>();
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive("contact");
      if (window.scrollY < 200) return setActive(null);
      const first = ids.find((id) => seen.get(id));
      setActive(first ?? null);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        update();
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [home]);

  const isOn = (n: (typeof nav)[number]) => (home ? active === n.section : path === n.page || path.startsWith(`${n.page}/`));

  return (
    <header className="sticky top-0 z-40 text-fg" style={{ background: "linear-gradient(to bottom, var(--bg) 55%, transparent)" }}>
      <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-4 px-5 py-4 pb-6 md:px-10">
        <Link href="/" className="font-display text-[1.05rem] font-bold tracking-tight" aria-label={`${person.name}, home`}>
          Aishwaria&nbsp;V
        </Link>
        <p className="meta hidden items-center gap-2 lg:flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {person.location} · <LocalTime />
        </p>
        <nav aria-label="Main">
          <ul className="meta flex items-center gap-4 md:gap-6">
            {nav.map((n) => {
              const on = isOn(n);
              const href = home ? `#${n.section}` : n.page;
              return (
                <li key={n.label} className={n.label === "Contact" ? "hidden sm:block" : ""}>
                  <Link
                    href={href}
                    aria-current={on ? "true" : undefined}
                    className={`relative transition hover:text-fg ${on ? "text-fg" : ""}`}
                  >
                    {on && <span aria-hidden className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent" />}
                    {n.label}
                  </Link>
                </li>
              );
            })}
            <li className="hidden md:block">
              <a href={person.resumeUrl} className="text-fg link-underline">Resume</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
