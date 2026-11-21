import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[96rem] px-5 pb-24 pt-32 md:px-10">
      <p className="meta">404</p>
      <h1 className="display mt-6 text-[clamp(3rem,12vw,12rem)] uppercase">
        Not <span className="serif-i normal-case text-accent" style={{ fontWeight: 400 }}>here.</span>
      </h1>
      <Link href="/" className="meta mt-10 inline-block text-fg link-underline">Back to the homepage</Link>
    </div>
  );
}
