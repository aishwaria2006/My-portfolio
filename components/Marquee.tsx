const words = ["Agentic systems", "Cloud infrastructure", "MCP gateways", "Voice interfaces", "CI/CD", "LLM platforms", "Kubernetes", "Terraform"];

/** A huge, slow band of what I work on. Alternates outline and filled type. */
export default function Marquee() {
  const items = [...words, ...words];
  return (
    <div className="marquee mt-16 border-y border-line py-5 md:mt-20 md:py-6" aria-label="Areas of work">
      <div className="marquee-track items-baseline">
        {items.map((w, i) => (
          <span
            key={`${w}-${i}`}
            aria-hidden={i >= words.length}
            className={`display whitespace-nowrap pr-10 text-[clamp(2.2rem,5vw,5rem)] uppercase md:pr-14 ${i % 2 ? "outline-text" : "text-fg"}`}
          >
            {w}
            <span className="ml-10 inline-block h-[0.12em] w-[0.12em] rounded-full bg-accent align-middle md:ml-16" />
          </span>
        ))}
      </div>
    </div>
  );
}
