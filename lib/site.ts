/**
 * The public URL of the site. Set NEXT_PUBLIC_SITE_URL to your final domain.
 * Falls back to Netlify's URL, then Vercel's, then localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
