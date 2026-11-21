import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PhotoFrame from "@/components/PhotoFrame";
import Field from "@/components/Field";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import Timeline from "@/components/Timeline";
import { about, beyond, education, person } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

function H({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line-strong pt-4">
      <h2 className="display-wide font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.02em]">{children}</h2>
      {aside}
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      eyebrow="About"
      title={<>Hi, I&rsquo;m <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>Aishwaria.</span></>}
      intro={person.intro}
    >
      <div className="grid gap-12 md:grid-cols-12">
        <div className="space-y-16 md:col-span-7">
          <Reveal>
            <section>
              <H>My journey</H>
              <Field text={about.journey} className="prose-serif mt-6 max-w-measure" />
            </section>
          </Reveal>
          <Reveal>
            <section>
              <H>How I build</H>
              <Field text={about.philosophy} className="prose-serif mt-6 max-w-measure" />
            </section>
          </Reveal>
          <Reveal>
            <section>
              <H aside={<Link href="/skills" className="meta text-fg link-underline">All skills</Link>}>What I work on</H>
              <ol className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {about.workAreas.map((w, i) => (
                  <li key={w} className="flex items-baseline gap-4 border-b border-line py-3">
                    <span className="meta text-accent">0{i + 1}</span>
                    <span className="text-[1.05rem]">{w}</span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
          <Reveal>
            <section>
              <H>The story so far</H>
              <p className="mt-3 text-muted">Every milestone, newest first. The dates are real; the version numbers are just how I keep count.</p>
              <div className="mt-8">
                <Timeline />
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section>
              <H aside={<Link href="/beyond" className="meta text-fg link-underline">More</Link>}>Beyond engineering</H>
              <ul className="mt-6 space-y-4">
                {beyond.leadership.map((l) => (
                  <li key={l.title}>
                    <p className="font-medium">{l.title}</p>
                    <p className="text-[0.95rem] text-muted">{l.org}</p>
                  </li>
                ))}
                <li className="text-[0.95rem] text-muted">{beyond.speaking}</li>
              </ul>
            </section>
          </Reveal>
        </div>

        <aside className="md:col-span-5">
          <div className="md:sticky md:top-24">
            <PhotoFrame variant="alt" />
            <div className="mt-8 border-t border-line-strong pt-4">
              <p className="meta">Education</p>
              <p className="display-wide mt-3 font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.02em]">{education.school}</p>
              <p className="mt-1 text-muted">{education.degree}</p>
              <p className="meta mt-1 normal-case tracking-normal">{education.university} · {education.period}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="display text-[3.2rem] text-accent">8.9</span>
                <span className="meta">/ 10 CGPA, till semester VI</span>
              </p>
            </div>
            <div className="mt-8 border-t border-line-strong pt-4">
              <p className="meta">Contact</p>
              <a href={`mailto:${person.email}`} className="mt-3 block text-[1.05rem] link-underline">{person.email}</a>
              <SocialLinks className="mt-4" />
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
