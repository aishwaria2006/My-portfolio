import { person } from "@/lib/content";

/** Mono text links: GitHub, LinkedIn, LeetCode. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  const items = [
    { href: person.links.github, label: "GitHub" },
    { href: person.links.linkedin, label: "LinkedIn" },
    { href: person.links.leetcode, label: "LeetCode" },
  ];
  return (
    <ul className={`meta flex flex-wrap items-center gap-5 ${className}`}>
      {items.map((i) => (
        <li key={i.label}>
          <a href={i.href} target="_blank" rel="noreferrer" className="text-fg link-underline">
            {i.label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
