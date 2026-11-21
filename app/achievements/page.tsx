import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Medal from "@/components/Medal";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import MomentsStrip from "@/components/MomentsStrip";
import { achievements, education, experience } from "@/lib/content";
import type { Achievement } from "@/lib/content";

export const metadata: Metadata = { title: "Achievements" };

const groups = [
  { title: "Hackathons", kinds: ["Hackathon"], line: "Four first places in six months, from Coimbatore to IIT Delhi." },
  { title: "Awards and competitions", kinds: ["Award", "Competition"], line: "Research recognition and a national data competition." },
  { title: "Speaking", kinds: ["Speaking"], line: "On stage at Bosch." },
];

/** One achievement: cover photo, medal, title, detail, then the remaining photos as a strip. */
function AchievementCard({ a }: { a: Achievement }) {
  const [cover, ...more] = a.photos ?? [];
  return (
    <SpotlightCard className="h-full">
      <div id={a.slug} className="scroll-mt-28" />
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-rule">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={`${a.title}, ${a.event}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" style={{ objectPosition: a.cover ?? "50% 50%" }} loading="lazy" />
          <span className="meta absolute left-3 top-3 rounded-full bg-bg/70 px-2.5 py-1 text-fg">{a.date}</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Medal a={a} />
          <div className="min-w-0">
            {!cover && <p className="font-mono text-xs uppercase tracking-[0.16em] text-graphite">{a.date}</p>}
            <p className="display-wide font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em]">{a.title}</p>
            <p className="mt-1 text-graphite">{a.event}</p>
            {a.detail && <p className="mt-3 text-[0.95rem] leading-relaxed">{a.detail}</p>}
          </div>
        </div>
        {more.length > 0 && (
          <ul className="mt-5 grid grid-cols-3 gap-2">
            {more.map((src) => (
              <li key={src} className="aspect-[4/3] overflow-hidden rounded-xl border border-rule bg-lavender-wash">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SpotlightCard>
  );
}

export default function AchievementsPage() {
  const wins = achievements.filter((a) => a.place === 1).length;
  return (
    <PageShell
      crumbs={[{ href: "/", label: "Home" }, { label: "Achievements" }]}
      eyebrow={`${wins} first places · ${achievements.length} entries`}
      title={<>Four <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>first places</span>, an award, a talk.</>}
      intro="Everything here is dated and attributable, with the photos to go with it."
    >
      <div className="space-y-14">
        {groups.map((g) => {
          const items = achievements.filter((a) => g.kinds.includes(a.kind));
          return (
            <section key={g.title}>
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="display-wide font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.02em]">{g.title}</h2>
                  <p className="text-sm text-graphite">{g.line}</p>
                </div>
              </Reveal>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {items.map((a, i) => (
                  <Reveal key={a.slug} delay={Math.min(i * 0.05, 0.2)}>
                    <AchievementCard a={a} />
                  </Reveal>
                ))}
              </ol>
            </section>
          );
        })}

        <section>
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="display-wide font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.02em]">Also seen at</h2>
              <p className="text-sm text-graphite">Events, visits and club life.</p>
            </div>
          </Reveal>
          <div className="mt-6">
            <MomentsStrip />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <SpotlightCard className="h-full p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Internships</p>
              <ul className="mt-4 divide-y divide-rule">
                {experience.map((r) => (
                  <li key={r.slug} className="flex items-baseline justify-between gap-4 py-3">
                    <span>
                      <span className="font-medium">{r.role}</span>
                      <span className="text-graphite">, {r.org}</span>
                    </span>
                    <span className="shrink-0 text-sm text-graphite">{r.period}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.06}>
            <SpotlightCard className="relative h-full overflow-hidden p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-graphite">Academic</p>
              <p className="mt-4 font-medium">{education.degree}</p>
              <p className="text-graphite">{education.school}, {education.university}, {education.period}</p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="display text-5xl text-accent">8.9</span>
                <span className="text-sm text-graphite">/ 10 CGPA, till semester VI</span>
              </p>
            </SpotlightCard>
          </Reveal>
        </section>
      </div>
    </PageShell>
  );
}
