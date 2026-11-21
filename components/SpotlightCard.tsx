import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
};

/** A flat panel with a hairline border. Renders as a link when `href` is given. (Name kept for existing imports.) */
export default function SpotlightCard({ children, className = "", href, external }: Props) {
  const cls = `card group block overflow-hidden ${className}`;
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <div className={cls}>{children}</div>;
}
