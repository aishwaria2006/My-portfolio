import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Assistant from "@/components/Assistant";
import SmoothScroll from "@/components/SmoothScroll";
import { person } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${person.name} | ${person.title}`, template: `%s | ${person.name}` },
  description: `${person.headline} ${person.intro}`,
  keywords: ["Aishwaria V", "AI engineer", "DevOps", "MCP", "agentic AI", "Kubernetes", "Azure", "AWS", "GCP", "Coimbatore", "portfolio"],
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  openGraph: { title: `${person.name} | ${person.title}`, description: person.headline, type: "website", url: siteUrl, siteName: person.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: `${person.name} | ${person.title}`, description: person.headline },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Assistant />
      </body>
    </html>
  );
}
