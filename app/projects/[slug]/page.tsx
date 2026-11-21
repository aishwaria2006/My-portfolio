import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProjectPlate from "@/components/ProjectPlate";
import Field from "@/components/Field";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import { accentVar } from "@/lib/accent";
import { person, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  return p ? { title: p.name, description: p.overview } : {};
}

function Section({ title, index, children }: { title: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-4 py-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="font-mono text-xs text-lavender-deep">{index}</p>
          <h2 className="display-wide mt-1 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">{title}</h2>
        </div>
        <div className="md:col-span-9">{children}</div>
      </section>
    </Reveal>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((x) => x.slug === params.slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const c = accentVar[p.accent];

  return (
    <PageShell crumbs={[{ href: "/", label: "Home" }, { href: "/projects", label: "Projects" }, { label: p.name }]} eyebrow={p.tagline} title={p.name} intro={p.overview}>
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <ProjectPlate project={p} />
        </div>
        <SpotlightCard className="p-6 md:col-span-4">
          <dl className="space-y-5 text-[0.95rem]">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">When</dt>
              <dd className="mt-1">{p.period}</dd>
            </div>
            {p.status && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Status</dt>
                <dd className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                  {p.status}
                </dd>
              </div>
            )}
            {p.award && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Recognition</dt>
                <dd className="mt-1 text-lavender-deep">★ {p.award}</dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Built with</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Links</dt>
              <dd className="mt-1 flex gap-4">
                {p.github ? (
                  <a className="link-underline" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
                ) : (
                  <a className="link-underline" href={`mailto:${person.email}?subject=${encodeURIComponent(`Source for ${p.name}`)}`}>Ask for the source</a>
                )}
                {p.demo && <a className="link-underline" href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
              </dd>
            </div>
          </dl>
        </SpotlightCard>
      </div>

      <div className="mt-10 divide-y divide-rule">
        <Section index="01" title="Problem">
          <Field text={p.problem} className="prose-serif max-w-measure" />
        </Section>
        <Section index="02" title="Architecture">
          <ol className="grid max-w-[80ch] gap-3">
            {p.architecture.map((a, i) => (
              <li key={a}>
                <SpotlightCard className="flex gap-4 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs text-paper" style={{ background: c }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="prose-serif !text-[1.08rem]">{a}</span>
                </SpotlightCard>
              </li>
            ))}
          </ol>
        </Section>
        <Section index="03" title="What I built">
          <ul className="grid max-w-[80ch] gap-2 sm:grid-cols-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 rounded-2xl border border-rule bg-sheet/60 p-4 text-[0.98rem]">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c }} />
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-graphite">{p.contribution}</p>
        </Section>
        <Section index="04" title="Challenges">
          <Field text={p.challenges} className="prose-serif max-w-measure" />
        </Section>
        <Section index="05" title="Results">
          <Field text={p.results} className="prose-serif max-w-measure" />
        </Section>
      </div>

      <Reveal>
        <SpotlightCard href={`/projects/${next.slug}`} className="mt-6 flex items-center justify-between gap-6 p-6 md:p-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Next project</span>
            <span className="display-wide mt-2 block font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight tracking-[-0.03em] transition group-hover:text-accent">{next.name}</span>
            <span className="mt-1 block text-graphite">{next.tagline}</span>
          </div>
          <span aria-hidden className="text-3xl text-graphite transition group-hover:translate-x-1 group-hover:text-lavender-deep">→</span>
        </SpotlightCard>
      </Reveal>
      <p className="mt-6">
        <Link href="/projects" className="link-underline text-[0.95rem]">All projects</Link>
      </p>
    </PageShell>
  );
}
