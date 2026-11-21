import { person } from "@/lib/content";

/** A plain, large photograph with a mono caption. Colour arrives on hover. `variant="alt"` uses the second portrait. */
export default function PhotoFrame({ variant = "main" }: { variant?: "main" | "alt" }) {
  const alt = variant === "alt" && person.photoAlt;
  const src = alt ? person.photoAlt : person.photo;
  const position = alt ? person.photoAltPosition : person.photoPosition;
  const caption = alt ? person.photoAltCaption : person.photoCaption;
  return (
    <figure className="group w-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bg-2">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`Portrait of ${person.name}`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            style={{ objectPosition: position ?? "50% 50%" }}
          />
        ) : (
          <div className="flex h-full w-full items-end p-6">
            <span className="display text-[6rem] text-line-strong">AV</span>
          </div>
        )}
      </div>
      <figcaption className="meta mt-3 flex items-center justify-between gap-4">
        <span className="shrink-0">{caption}</span>
        <span className="truncate text-right">{person.status}</span>
      </figcaption>
    </figure>
  );
}
