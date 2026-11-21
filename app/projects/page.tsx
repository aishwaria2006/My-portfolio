import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import ProjectPlate from "@/components/ProjectPlate";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Work" }]}
      eyebrow={`${projects.length} case studies`}
      title={<>Selected <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>work</span></>}
      intro="Each project opens into a case study: the problem, the architecture, what I built and how it turned out."
    >
      <ol className="border-t border-line-strong">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <li className="border-b border-line">
              <Link href={`/projects/${p.slug}`} className="group grid gap-8 py-10 md:grid-cols-12 md:items-center md:py-14">
                <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                  <ProjectPlate project={p} className="!rounded-sm" />
                </div>
                <div className={`md:col-span-6 ${i % 2 ? "md:col-start-1" : "md:col-start-7"}`}>
                  <p className="meta flex items-center gap-4">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.period}</span>
                    {p.award && <span className="text-accent">{p.award.split(",")[0]}</span>}
                  </p>
                  <h2 className="display-wide mt-4 font-display text-[clamp(2rem,4.5vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.03em] transition-colors group-hover:text-accent">{p.name}</h2>
                  <p className="mt-3 text-[1.05rem] text-fg/90">{p.tagline}</p>
                  <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-muted">{p.overview}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                  <span className="meta mt-8 inline-flex items-center gap-2 text-fg">
                    Open case study <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </li>
          </Reveal>
        ))}
      </ol>
    </PageShell>
  );
}
