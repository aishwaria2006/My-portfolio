import { isPlaceholder, PLACEHOLDER } from "@/lib/content";

/** Renders text, or a clearly marked editable placeholder for content still to be written. */
export default function Field({ text, className = "" }: { text: string; className?: string }) {
  if (isPlaceholder(text)) {
    return (
      <p className={`placeholder-note rounded-[3px] px-4 py-3 text-[0.95rem] ${className}`}>
        <span className="font-medium text-lavender-deep">To be added: </span>
        {text.replace(`${PLACEHOLDER}: `, "")}
      </p>
    );
  }
  return <p className={className}>{text}</p>;
}
