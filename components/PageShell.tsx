import Link from "next/link";

type Crumb = { href?: string; label: string };

/** Inner-page frame: mono breadcrumb, a very large display title, one line of intro, then content. */
export default function PageShell({
  crumbs,
  title,
  intro,
  eyebrow,
  children,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  intro?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  const back = [...crumbs].reverse().find((c) => c.href);
  return (
    <div className="mx-auto max-w-[96rem] px-5 pb-24 pt-20 md:px-10 md:pt-20">
      <div className="meta flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href ? <Link href={c.href} className="hover:text-fg">{c.label}</Link> : <span aria-current="page" className="text-fg">{c.label}</span>}
                {i < crumbs.length - 1 && <span aria-hidden>/</span>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <span>{eyebrow}</span>}
      </div>
      <h1 className="display mt-8 max-w-[16ch] text-[clamp(2.6rem,6.5vw,6.5rem)] uppercase md:mt-10">{title}</h1>
      {intro && <p className="mt-8 max-w-[52ch] text-[1.1rem] leading-[1.5] text-muted md:text-[1.25rem]">{intro}</p>}
      <div className="mt-14 md:mt-20">{children}</div>
      {back?.href && (
        <Link href={back.href} className="meta mt-24 inline-flex items-center gap-2 text-fg link-underline">
          ← Back to {back.label}
        </Link>
      )}
    </div>
  );
}
