# Aishwaria V: portfolio

Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.
Concept: an editorial, studio-grade single theme. Near-black canvas, one accent (orange), Bricolage Grotesque display type with Instrument Serif italics and JetBrains Mono labels, hairline rules instead of cards, photographs run large, and inertial smooth scrolling (Lenis). The homepage reads as chapters: name, statement, work index with a cursor-following preview, Adya in numbers, the podium photo strip, practice, contact.

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste your Groq key into .env.local
npm run dev                  # http://localhost:3000
```

Do not run `npm run build` in this folder while `npm run dev` is running: both write to `.next` and will corrupt each other. Stop the dev server first, or build from a copy.

## Edit content

Everything lives in `lib/content.ts`. Entries starting with `TODO:` show on the site as clearly marked "To be added" boxes.

| What | Where |
| --- | --- |
| Your photo | `public/photo.jpg`; `person.photoPosition` controls the crop (CSS object-position) |
| Resume PDF | Replace `public/Aishwaria_V_Resume.pdf` |
| Project screenshots | Put images in `public/projects/` and set `image` on the project. Until then each project shows generated artwork chosen by its `art` and `accent` fields |
| Photos of your wins | Files live in `public/wins/`; list them in `photos` on the matching `achievements` entry (first one is the cover, `cover` sets its crop anchor). Non-award events go in `moments` |
| Which projects are on the homepage | Set `featured: true` on up to three projects |
| The three lines about Adya on the homepage | `highlights` on the Adya entry in `experience` |
| GitHub / demo links | Set `github` and `demo` on each project |
| Ticker under the hero | the `words` list in `components/Marquee.tsx` |
| The statement paragraph | `text` and `emphasis` in `components/Manifesto.tsx` |
| Stat tiles ("By the numbers") | `glance`; each entry has a `source` so every number stays traceable to the resume |
| About, journey, outside work | `about` and `beyond` |
| New project or role | Add an entry to `projects` or `experience` |

Project `art` options: `pulse`, `spectrum`, `roadmap`, `dialogue`, `funnel` (see `components/ProjectPlate.tsx`). `accent` options: `lavender`, `coral`, `mint`, `gold`.

The AI assistant reads the same file, so it always answers from your latest content. It skips anything still marked `TODO`.

## Design system

- Colours are CSS variables in `app/globals.css`: `--bg`, `--fg`, `--muted`, `--line`, `--accent`. Old token names (`--paper`, `--lavender`, …) are aliased onto these so inner pages keep working. Change `--accent` to recolour the whole site.
- Type classes: `.display` (Bricolage, heavy, tight), `.serif-i` (Instrument Serif italic), `.meta` (mono uppercase labels).
- Homepage pieces: `Hero`, `Marquee`, `Manifesto` (scroll-lit statement), `WorkList` (index with floating preview), `Stats`, `PodiumStrip`, `Practice`. Shared: `Reveal`, `SpotlightCard` (now a flat panel), `Timeline`, `Blueprint`, `SmoothScroll`.
- All motion respects `prefers-reduced-motion`.

## Deploy on Vercel

1. Push this folder to a **new** GitHub repo. `.env*.local` is already in `.gitignore`; never commit the key.
2. Import the repo in Vercel (framework is detected automatically).
3. In the environment variables, add either `NVIDIA_API_KEY` (free at build.nvidia.com; optional `NVIDIA_MODEL`) or `GROQ_API_KEY` (optional `GROQ_MODEL`). NVIDIA wins if both are set.
4. Add `NEXT_PUBLIC_SITE_URL` (your final URL) so Open Graph tags, `sitemap.xml` and `robots.txt` point at the right domain. Then deploy.

A social preview image is generated at `/opengraph-image` from `app/opengraph-image.tsx`, and the favicon is `app/icon.svg`.

## Figures and timeline

`lib/system.ts` holds the interactive architecture diagram of the Adya system (nodes, layers, and the connections between them) and the dated milestone timeline. Only add a connection if your work really links the two components; the timeline's version numbers are a framing device, the dates are real.

## Assistant notes

- Route: `app/api/assistant/route.ts`. It calls Groq with a system prompt built in `lib/knowledge.ts`.
- Soft rate limit: 15 questions per visitor per 10 minutes (per server instance). For a strict limit, swap in a shared store such as Upstash Redis.
- Voice input uses the browser's speech recognition (Chrome, Edge, Safari). Other browsers show text input only. Spoken replies use the browser's speech synthesis and can be muted.
