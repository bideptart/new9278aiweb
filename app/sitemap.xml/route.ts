import { INDUSTRIES } from "@/lib/industries"
import { BLOG_POSTS } from "@/lib/blog"
import { SITE } from "@/lib/seo"

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"

type Entry = {
  path: string
  priority: number
  changefreq: ChangeFreq
  lastmod: string
}

/**
 * Custom /sitemap.xml route (replaces the default app/sitemap.ts generator)
 * so we can attach a styled XSL stylesheet via an <?xml-stylesheet?>
 * processing instruction — Next.js's built-in MetadataRoute.Sitemap API
 * does not support that. The visual styling lives in public/sitemap.xsl
 * and follows the 9278.ai brand (Inter / Instrument Serif / Geist Mono,
 * primary red #e40014, neutral grays).
 *
 * URL list is generated from the same data sources the rest of the site
 * uses (INDUSTRIES, BLOG_POSTS) plus the static route list below, so it
 * stays in sync automatically as pages are added.
 */

const today = () => new Date().toISOString().slice(0, 10)

function buildEntries(): Entry[] {
  const now = today()

  const staticPages: Entry[] = [
    { path: "/", priority: 1.0, changefreq: "weekly", lastmod: now },
    { path: "/features", priority: 0.9, changefreq: "weekly", lastmod: now },
    { path: "/pricing", priority: 0.9, changefreq: "weekly", lastmod: now },
    { path: "/industries", priority: 0.9, changefreq: "monthly", lastmod: now },
    { path: "/faq", priority: 0.7, changefreq: "monthly", lastmod: now },
    { path: "/get-started", priority: 0.8, changefreq: "monthly", lastmod: now },
    { path: "/about", priority: 0.6, changefreq: "monthly", lastmod: now },
    { path: "/contact", priority: 0.6, changefreq: "monthly", lastmod: now },
    { path: "/blog", priority: 0.8, changefreq: "weekly", lastmod: now },
    { path: "/trust", priority: 0.5, changefreq: "monthly", lastmod: now },
    { path: "/legal", priority: 0.4, changefreq: "monthly", lastmod: now },
    { path: "/terms", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/privacy", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/acceptable-use", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/cookies", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/dpa", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/subprocessors", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/recording-notice", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/refund-policy", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/sla", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/e911", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/accessibility", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/ai-disclosure", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/law-enforcement", priority: 0.3, changefreq: "monthly", lastmod: now },
    { path: "/country-requirements", priority: 0.3, changefreq: "monthly", lastmod: now },
  ]

  const industryPages: Entry[] = INDUSTRIES.map((i) => ({
    path: `/industries/${i.slug}`,
    priority: 0.7,
    changefreq: "monthly",
    lastmod: now,
  }))

  const blogPages: Entry[] = BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.6,
    changefreq: "monthly",
    lastmod: p.date,
  }))

  return [...staticPages, ...industryPages, ...blogPages]
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export async function GET() {
  const entries = buildEntries()

  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(`${SITE.url}${e.path}`)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
