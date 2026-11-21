import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import SkillExplorer from "@/components/SkillExplorer";
import { experience, projects, skills } from "@/lib/content";

export const metadata: Metadata = { title: "Skills & technologies" };

// Build a searchable text blob for every project and role, then match skills against it.
const sources = [
  ...experience.map((r) => ({ name: r.org, text: [r.summary, ...r.stack, ...r.blocks.flatMap((b) => b.points.map((p) => `${p.label ?? ""} ${p.text}`))].join(" ") })),
  ...projects.map((p) => ({ name: p.name, text: [p.overview, ...p.stack, ...p.architecture, ...p.highlights].join(" ") })),
];

const aliases: Record<string, string[]> = {
  "Google Cloud (GCP)": ["GCP"],
  "Microsoft Azure": ["Azure"],
  "AWS IAM & STS": ["IAM"],
  "Multi-Agentic Systems": ["multi-agent", "agents"],
  "Groq": ["Groq"],
  "Node.js": ["Node"],
  "Whisper ASR": ["Whisper"],
  "MCP Gateways": ["MCP gateway"],
  "Infrastructure as Code (IaC)": ["Terraform"],
  "CI/CD": ["Jenkins", "CodeBuild", "pipelines"],
  "Containerization": ["Kubernetes", "container"],
  "Monitoring & Observability": ["Prometheus", "Grafana"],
  "Database Migrations": ["database migration"],
  "LLM Guardrails": ["prompt-injection", "guardrail"],
  "Vector Databases": ["Weaviate", "FAISS"],
};

function usedIn(skill: string) {
  const terms = [skill, ...(aliases[skill] ?? [])].map((t) => t.toLowerCase());
  return sources.filter((s) => terms.some((t) => s.text.toLowerCase().includes(t))).map((s) => s.name);
}

export default function SkillsPage() {
  const groups = skills.map((g) => ({ group: g.group, items: g.items.map((name) => ({ name, usedIn: usedIn(name) })) }));
  const total = skills.reduce((n, g) => n + g.items.length, 0);
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Skills & technologies" }]}
      eyebrow={`${total} tools across ${skills.length} areas`}
      title={<>The <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>toolkit.</span></>}
      intro="The tools I use to build AI systems and run them in production. Select any skill to see where it appears in my work."
    >
      <SkillExplorer groups={groups} />
    </PageShell>
  );
}
