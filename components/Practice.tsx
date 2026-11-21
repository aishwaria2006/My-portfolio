import Link from "next/link";
import Reveal from "./Reveal";
import { person } from "@/lib/content";

const items = [
  { n: "01", title: "Agentic systems", line: "MCP gateways, multi-agent features, guardrails and human approval. Agents that act, with a record of what they did." },
  { n: "02", title: "Cloud & DevOps", line: "Azure, AWS and GCP from VMs upward. Four production clusters, CI/CD, data layer, Prometheus and Grafana on everything." },
  { n: "03", title: "Applied ML & voice", line: "Whisper, BERT and XGBoost where they earn their place. Local LLMs that explain themselves out loud." },
];

/** About, in brief: three practices and a line on who I am. The full story lives on the About page. */
export default function Practice() {
  return (
    <section id="about" className="mx-auto max-w-[96rem] scroll-mt-24 px-5 py-16 md:px-10 md:py-24" aria-labelledby="about-title">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="meta">05 · About</p>
          <h2 id="about-title" className="display mt-4 text-[clamp(2.2rem,4vw,4rem)] uppercase">What I do</h2>
          <p className="mt-5 max-w-[30ch] text-[0.95rem] leading-relaxed text-muted">
            Final-year B.Tech in AI and Data Science at Karpagam College of Engineering, 8.9 CGPA. Editor and DPP Chair at Rotaract. {person.location}.
          </p>
          <Link href="/about" className="meta mt-6 inline-flex items-center gap-2 text-fg link-underline">
            Full story and timeline <span aria-hidden>→</span>
          </Link>
        </div>
        <ol className="md:col-span-9">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={Math.min(i * 0.06, 0.2)}>
              <li className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-8 md:py-9">
                <span className="meta text-accent md:col-span-1">{it.n}</span>
                <h3 className="display-wide font-display text-[clamp(1.6rem,2.8vw,2.7rem)] font-semibold leading-[1] tracking-[-0.03em] md:col-span-5">{it.title}</h3>
                <p className="max-w-[44ch] text-[1rem] leading-relaxed text-muted md:col-span-6">{it.line}</p>
              </li>
            </Reveal>
          ))}
          <li className="border-t border-line" />
        </ol>
      </div>
    </section>
  );
}
