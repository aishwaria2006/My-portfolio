import Link from "next/link";
import { person } from "@/lib/content";
import LocalTime from "./LocalTime";

const more = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Wins" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/beyond", label: "Beyond" },
];

/** The close: one giant line, the email as the biggest link on the site, then the index. */
export default function SiteFooter() {
  return (
    <footer id="contact" className="relative mt-16 scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-[96rem] px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <p className="meta">06 · Contact</p>
        <h2 className="display mt-6 text-[clamp(2.8rem,8vw,8.5rem)] uppercase">
          Let&rsquo;s build
          <br />
          <span className="serif-i normal-case text-accent" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>something</span> that ships
        </h2>
        <a
          href={`mailto:${person.email}`}
          className="group mt-12 inline-flex max-w-full items-baseline gap-4 font-display text-[clamp(1.25rem,3vw,2.8rem)] font-semibold tracking-tight"
        >
          <span className="break-all link-underline">{person.email}</span>
          <span aria-hidden className="text-accent transition group-hover:translate-x-2">↗</span>
        </a>

        <div className="mt-16 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="meta">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-[0.98rem]">
              <li><a className="link-underline" href={person.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="link-underline" href={person.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a className="link-underline" href={person.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
              <li><a className="link-underline" href={person.resumeUrl} download>Resume (PDF)</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="meta">Index</p>
            <ul className="mt-4 space-y-2 text-[0.98rem]">
              {more.map((m) => (
                <li key={m.href}><Link className="link-underline" href={m.href}>{m.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="meta">Status</p>
            <p className="mt-4 flex items-center gap-2 text-[0.98rem]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to full-time roles from 2027
            </p>
            <p className="mt-2 text-[0.98rem] text-muted">{person.location} · <LocalTime /></p>
          </div>
        </div>

        <div className="meta mt-16 flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {person.name}</p>
          <a href="#top" className="link-underline text-fg">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
