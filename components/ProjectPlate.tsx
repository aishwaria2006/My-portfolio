import type { Project } from "@/lib/content";
import { accentVar } from "@/lib/accent";

/* ---- Generative artwork, one motif per project ---------------------------------- */

function Pulse({ c }: { c: string }) {
  // Telemetry waveform with a glowing "brain" node.
  const wave = (amp: number, phase: number, y: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 400; x += 8) {
      const v = y + Math.sin((x / 400) * Math.PI * 6 + phase) * amp * Math.sin((x / 400) * Math.PI);
      pts.push(`${x},${v.toFixed(1)}`);
    }
    return `M${pts.join(" L")}`;
  };
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path d={wave(42, 0, 125)} fill="none" stroke={c} strokeWidth="2.2" opacity="0.9" />
      <path d={wave(28, 1.3, 125)} fill="none" stroke={c} strokeWidth="1.4" opacity="0.55" />
      <path d={wave(16, 2.6, 125)} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="250" stroke="currentColor" strokeWidth="0.6" opacity="0.08" />
      ))}
      <circle cx="300" cy="78" r="26" fill={c} opacity="0.18" />
      <circle cx="300" cy="78" r="12" fill={c} opacity="0.5" />
      <circle cx="300" cy="78" r="5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function Spectrum({ c }: { c: string }) {
  // Spectrogram-style bars from a deterministic sequence.
  const bars = Array.from({ length: 36 }, (_, i) => {
    const h = 30 + Math.abs(Math.sin(i * 0.9) * 100 + Math.cos(i * 0.37) * 45);
    return { x: 10 + i * 10.6, h };
  });
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={210 - b.h} width="6" height={b.h} rx="3" fill={c} opacity={0.35 + (i % 5) * 0.12} />
      ))}
      <path d="M0 60 C 80 20, 140 110, 220 60 S 340 20, 400 70" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="220" cy="60" r="4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function Roadmap({ c }: { c: string }) {
  // A hundred-day grid with a path winding through it.
  const dots: { x: number; y: number; on: boolean }[] = [];
  for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) dots.push({ x: 24 + q * 27, y: 30 + r * 27, on: (r * 14 + q) % 7 === 0 });
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.on ? 4.5 : 2} fill={d.on ? c : "currentColor"} opacity={d.on ? 0.9 : 0.18} />
      ))}
      <path d="M24 30 H 240 V 84 H 78 V 138 H 320 V 192 H 160 V 219 H 375" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" strokeDasharray="6 7" />
      <circle cx="375" cy="219" r="9" fill={c} opacity="0.3" />
      <circle cx="375" cy="219" r="4" fill="currentColor" />
    </svg>
  );
}

function Dialogue({ c }: { c: string }) {
  // Alternating interview bubbles with a scoring strip.
  const rows = [
    { x: 24, w: 170, me: false }, { x: 190, w: 180, me: true }, { x: 24, w: 120, me: false },
    { x: 150, w: 220, me: true }, { x: 24, w: 200, me: false },
  ];
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {rows.map((r, i) => (
        <rect key={i} x={r.x} y={22 + i * 38} width={r.w} height="26" rx="13" fill={r.me ? c : "currentColor"} opacity={r.me ? 0.75 : 0.12} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={24 + i * 40} y="206" width="32" height="6" rx="3" fill={c} opacity={i < 4 ? 0.9 : 0.25} />
      ))}
    </svg>
  );
}

function Funnel({ c }: { c: string }) {
  // Hot / warm / cool / cold tiers.
  const tiers = [
    { y: 30, w: 320, o: 0.95 }, { y: 80, w: 250, o: 0.7 }, { y: 130, w: 180, o: 0.45 }, { y: 180, w: 110, o: 0.25 },
  ];
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {tiers.map((t, i) => (
        <rect key={i} x={200 - t.w / 2} y={t.y} width={t.w} height="36" rx="18" fill={c} opacity={t.o} />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={40 + ((i * 53) % 320)} cy={14 - (i % 3) * 4} r="2.5" fill="currentColor" opacity="0.3" />
      ))}
    </svg>
  );
}

const ART = { pulse: Pulse, spectrum: Spectrum, roadmap: Roadmap, dialogue: Dialogue, funnel: Funnel };

/** Visual for a project: a real screenshot when one is set, otherwise generated artwork in the project's accent. */
export default function ProjectPlate({
  project,
  tall = false,
  fill = false,
  className = "",
}: {
  project: Project;
  tall?: boolean;
  /** Stretch to the parent's height instead of keeping an aspect ratio (for side-by-side cards). */
  fill?: boolean;
  className?: string;
}) {
  const c = accentVar[project.accent];
  const Art = ART[project.art];
  const shape = fill ? "h-full min-h-[16rem] md:min-h-[20rem]" : tall ? "aspect-[4/5]" : "aspect-[16/10]";
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-line text-fg ${shape} ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 10% 0%, color-mix(in srgb, ${c} 38%, var(--sheet)) 0%, var(--sheet) 55%), linear-gradient(160deg, color-mix(in srgb, ${c} 18%, var(--sheet)), var(--lavender-wash))`,
      }}
    >
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt={`${project.name} screenshot`} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
      ) : (
        <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">
          <Art c={c} />
        </div>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/90 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c }} />
        <span className="meta truncate">{project.tagline}</span>
      </div>
      {project.award && (
        <span className="meta absolute right-3 top-3 rounded-full border border-accent bg-bg/70 px-2.5 py-1 text-accent">
          {project.award.split(",")[0]}
        </span>
      )}
    </div>
  );
}
