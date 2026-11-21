import Link from "next/link";
import { experience, glance } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

/** The job right now, told in four numbers and three sentences. */
export default function Stats() {
  const role = experience[0];
  const highlights = role.highlights ?? [];
  return (
    <section id="now" className="mx-auto max-w-[96rem] scroll-mt-24 px-5 py-16 md:px-10 md:py-24" aria-labelledby="now-title">
      <div className="flex items-end justify-between gap-6 border-b border-line-strong pb-6">
        <div>
          <p className="meta">03 · Experience</p>
          <h2 id="now-title" className="display mt-4 text-[clamp(2.4rem,5.5vw,5.5rem)] uppercase">
            Adya <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>AI</span>
          </h2>
        </div>
        <p className="meta hidden text-right md:block">
          {role.role}
          <br />
          {role.period}
        </p>
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-4">
        {glance.map((g, i) => (
          <Reveal key={g.label} delay={Math.min(i * 0.06, 0.25)}>
            <div className={`border-b border-line py-8 md:py-10 ${i % 2 === 0 ? "pr-6 md:border-r md:pr-8" : "pl-6 md:border-r md:px-8"} ${i === 3 ? "md:!border-r-0" : ""} ${i === 2 ? "md:pl-8" : ""}`}>
              <dd className="display text-[clamp(3rem,6vw,6rem)]">
                <CountUp value={g.value} />
                <span className="text-accent">{g.unit ?? ""}</span>
              </dd>
              <dt className="mt-3 text-[0.95rem] text-fg/90">{g.label}</dt>
              <dd className="meta mt-2 normal-case tracking-normal">{g.source}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <p className="meta md:col-span-3">What that means day to day</p>
        <ol className="md:col-span-9 md:grid md:grid-cols-3 md:gap-10">
          {highlights.map((h, i) => (
            <Reveal key={h.text} delay={Math.min(i * 0.08, 0.25)}>
              <li className="border-t border-line py-5 md:py-0 md:pt-5">
                <p className="meta text-accent">0{i + 1}</p>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-fg/90">{h.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
      <div className="mt-10 flex justify-end">
        <Link href="/experience" className="meta text-fg link-underline">Full experience and the system diagram</Link>
      </div>
    </section>
  );
}
