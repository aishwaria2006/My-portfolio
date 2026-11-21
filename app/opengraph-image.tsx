import { ImageResponse } from "next/og";
import { person } from "@/lib/content";

export const runtime = "edge";
export const alt = `${person.name}, ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card: name, headline and three facts on the site's gradient. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#f3efe7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontFamily: "monospace", color: "#8f8b84", letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff4f12" }} />
          {person.title.toUpperCase()} · {person.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", fontSize: 150, lineHeight: 0.9, letterSpacing: -8, fontWeight: 800 }}>
            <span>AISHWARIA</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <span style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -8, fontWeight: 800, color: "#ff4f12" }}>V</span>
            <span style={{ fontSize: 58, fontFamily: "Georgia, serif", fontStyle: "italic", color: "#f3efe7" }}>ships to production.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22, fontFamily: "monospace", color: "#f3efe7", letterSpacing: 2 }}>
          {["4× HACKATHON WINNER", "ADYA AI", "AZURE · AWS · GCP"].map((t) => (
            <div key={t} style={{ padding: "12px 22px", borderRadius: 999, border: "1px solid rgba(243,239,231,0.32)" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
