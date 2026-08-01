"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

// Rotates through the site's existing red-family accent tokens (already
// used for the homepage's "01/02/03" step cards) for the icon badge.
const ACCENTS = ["var(--ai-cyan)", "var(--ai-violet)", "var(--ai-magenta)"]

// perspective/preserve-3d/backface-visibility force a 3D compositing context
// that blurs text on mobile Safari/Chrome. Hover-flip has no touch equivalent
// anyway, so mobile renders a flat front-face card with no 3D transform at all.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

// Tailwind v4 drops the group-hover:/group-focus-visible: variant prefix when
// combined with an arbitrary `transform:` property, compiling it into an
// unconditional rule (always rotated). Driving the flip from React state
// instead of a CSS-only :hover selector sidesteps that entirely.
function FlipCard({
  link,
  index,
  showNumber = true,
}: {
  link: RelatedLink
  index: number
  showNumber?: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const isDesktop = useIsDesktop()
  const number = String(index + 1).padStart(2, "0")

  const frontIconBadge = (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs"
    >
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </span>
  )

  const backIconBadge = (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md"
    >
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </span>
  )

  if (!isDesktop) {
    return (
      <li>
        <Link
          href={link.href}
          className="relative flex min-h-[92px] w-full flex-col gap-1 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur-md outline-none"
        >
          <div className="flex items-start justify-between">
            {showNumber && <span className="text-xl font-bold leading-none text-primary/30">{number}</span>}
            <span className={cn(!showNumber && "ml-auto")}>{frontIconBadge}</span>
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-foreground">{link.title}</p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">{link.description}</p>
          </div>
        </Link>
      </li>
    )
  }

  return (
    <li style={{ perspective: "1200px" }}>
      <Link
        href={link.href}
        className={cn(
          "relative block w-full outline-none transition-all duration-500 will-change-transform",
          showNumber ? "h-56" : "h-[210px]",
        )}
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
      >
        {/* Front face — Glassmorphic card matching project theme */}
        <div
          className={cn(
            "absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/85 p-6 backdrop-blur-2xl shadow-lg transition-all",
            showNumber ? "justify-between" : "justify-start gap-2",
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-start justify-between">
            {showNumber && <span className="text-5xl font-bold font-serif leading-none text-primary/25">{number}</span>}
            <span className={cn(!showNumber && "ml-auto")}>{frontIconBadge}</span>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-foreground">{link.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{link.description}</p>
          </div>
        </div>
        {/* Back face — Brand red primary card on flip */}
        <div
          className={cn(
            "absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-3xl border border-primary/40 bg-primary/10 p-6 backdrop-blur-2xl shadow-xl",
            showNumber ? "justify-between" : "justify-start gap-2",
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-start justify-between">
            {showNumber && <span className="text-5xl font-bold font-serif leading-none text-primary/40">{number}</span>}
            <span className={cn(!showNumber && "ml-auto")}>{backIconBadge}</span>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-foreground">{link.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{link.description}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

/**
 * Site-wide internal-linking module. Each landing page renders one of these
 * to push link equity to siblings (industries → pricing → FAQ → get-started).
 */
export function RelatedLinks({
  heading = "Keep exploring 9278.ai",
  description = "Related guides, pricing, and use cases curated for the calls you take.",
  links,
  variant = "default",
  showNumber = true,
}: {
  heading?: string
  description?: string
  links: RelatedLink[]
  /** "flip" renders solid, 3D flip-on-hover cards (pricing & FAQ pages only). */
  variant?: "default" | "flip"
  /** Set false to drop the 01/02/03 numbering on flip cards. */
  showNumber?: boolean
}) {
  return (
    <section aria-labelledby="related-heading" className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 id="related-heading" className="text-balance text-2xl font-serif font-bold tracking-tight md:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-xs md:text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <ul className={cn("grid", variant === "flip" ? "gap-4 md:grid-cols-3" : "gap-4 md:grid-cols-2 lg:grid-cols-3")}>
        {links.map((l, i) =>
          variant === "flip" ? (
            <FlipCard key={l.href} link={l} index={i} showNumber={showNumber} />
          ) : (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-card/85 p-6 backdrop-blur-2xl shadow-lg transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:scale-[1.02]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="ai-pill-magenta text-[10px] font-bold">
                      {l.href.toUpperCase()}
                    </span>
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{l.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{l.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
