import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Blueprint from "@/components/Blueprint";
import { experience } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

const blockArt = ["var(--accent)", "var(--fg)", "var(--accent)", "var(--fg)", "var(--accent)"];

export default function ExperiencePage() {
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Experience" }]}
      eyebrow="Experience"
      title={<>Build the product. <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>Run the cloud</span> under it.</>}
      intro="Two internships: one that owns a company's cloud and ships agentic features into it, and one that put LLMs in front of financial data."
    >
      <Reveal>
        <div className="card mb-20 p-6 md:p-8">
          <p className="meta text-accent">Fig. A · The production system at Adya AI</p>
          <p className="mt-2 max-w-[56ch] text-muted">Every component below is something I built or run. Select one to see the work behind it; the lines show what connects to what.</p>
          <div className="mt-8">
            <Blueprint initial="A4" />
          </div>
        </div>
      </Reveal>

      <ol className="space-y-24">
        {experience.map((r) => (
          <li key={r.slug} id={r.slug} className="grid scroll-mt-28 gap-8 md:grid-cols-12">
            <header className="md:sticky md:top-28 md:col-span-4 md:self-start">
              <Reveal>
                <p className="meta text-accent">{r.period}</p>
                <h2 className="display-wide mt-4 font-display text-[2.4rem] font-semibold leading-tight tracking-[-0.03em]">{r.org}</h2>
                <p className="mt-1 text-lg">{r.role}</p>
                <p className="mt-4 text-graphite">{r.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {r.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </Reveal>
            </header>
            <div className="relative space-y-5 md:col-span-8">
              <span aria-hidden className="absolute bottom-6 left-[1.1rem] top-6 hidden w-px bg-line-strong md:block" />
              {r.blocks.map((b, i) => (
                <Reveal key={b.title} delay={Math.min(i * 0.04, 0.2)}>
                  <SpotlightCard className="relative !overflow-visible p-6 md:ml-12 md:p-7">
                    <span
                      aria-hidden
                      className="absolute -left-[3.55rem] top-7 hidden h-9 w-9 items-center justify-center rounded-full font-mono text-[0.65rem] text-bg md:flex"
                      style={{ background: blockArt[i % blockArt.length] }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display-wide font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">{b.title}</h3>
                    {b.note && <p className="mt-1 text-[0.95rem] text-graphite">{b.note}</p>}
                    <ul className="mt-5 space-y-3">
                      {b.points.map((pt) => (
                        <li key={pt.text} className="flex max-w-[70ch] gap-3 leading-relaxed">
                          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: blockArt[i % blockArt.length] }} />
                          <span>
                            {pt.label && <span className="font-medium">{pt.label}. </span>}
                            <span className="text-graphite">{pt.text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
