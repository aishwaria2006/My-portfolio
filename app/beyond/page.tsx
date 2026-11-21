import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Field from "@/components/Field";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import MomentsStrip from "@/components/MomentsStrip";
import { beyond } from "@/lib/content";

export const metadata: Metadata = { title: "Beyond engineering" };

export default function BeyondPage() {
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Beyond engineering" }]}
      eyebrow="Beyond engineering"
      title={<>Around <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>the work</span></>}
      intro="Two years of Rotaract, a stage at Bosch, and the habit of being the person others can ask."
    >
      <div className="space-y-12">
        <MomentsStrip />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <SpotlightCard className="relative h-full overflow-hidden p-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Leadership</p>
              <ul className="mt-5 space-y-5">
                {beyond.leadership.map((l) => (
                  <li key={l.title} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      <p className="font-medium">{l.title}</p>
                      <p className="text-graphite">{l.org}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.06}>
            <SpotlightCard className="relative h-full overflow-hidden p-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Speaking</p>
              <p className="prose-serif mt-5">{beyond.speaking}</p>
            </SpotlightCard>
          </Reveal>
          <Reveal className="md:col-span-2">
            <SpotlightCard className="p-7">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Outside work</p>
              <Field text={beyond.personal} className="prose-serif mt-5 max-w-measure" />
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
