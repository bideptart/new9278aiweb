"use client"

/**
 * Circular carousel — cards laid out on an elliptical arc, the active one
 * front-and-centre, neighbours scaled back and faded behind it.
 *
 * Adapted from a dark-theme reference implementation in two ways that
 * matter:
 *
 *  1. Animation runs on `motion/react` (the project's existing dependency),
 *     not `framer-motion`. They are the same library post-rename — pulling
 *     in framer-motion alongside it would ship a second copy.
 *
 *  2. The visible window is derived from `items.length` instead of a fixed
 *     5. With the constant, a 3-item set never wraps (offsets 0/1/2 all stay
 *     positive) and the cards bunch to one side instead of fanning out
 *     symmetrically around the active one.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string
  title: string
  description: string
  tag?: string
  bullets?: string[]
  icon?: LucideIcon
}

export interface CircularCarouselProps {
  items: CarouselItem[]
  activeIndex?: number
  onActiveChange?: (index: number) => void
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

/** Upper bound on how many cards fan out at once; the real count is
    min(this, items.length) so small sets stay symmetric. */
const MAX_VISIBLE = 5
const RADIUS_Y = 44
/** Card width in px, kept in sync with the `w-[300px]` class below — the
    radius is tuned against it so neighbours only just kiss the active card
    instead of covering its text. */
const CARD_W = 300
/** Below this container width the arc collapses to a single card — side
    cards would otherwise overlap the active one almost completely. */
const NARROW_BREAKPOINT = 768

function getItemPosition(index: number, activeIndex: number, total: number, visible: number) {
  const half = Math.floor(visible / 2)
  const offset = index - activeIndex

  // Wrap the offset into [-half, half] so the fan stays centred on the
  // active card regardless of where it sits in the array.
  let adjusted = offset
  if (offset > half) adjusted = offset - total
  if (offset < -half) adjusted = offset + total
  if (Math.abs(adjusted) > half) return null

  const angle = (adjusted / visible) * Math.PI
  const distance = Math.abs(adjusted)
  const maxDistance = half + 1

  return {
    angle,
    distance,
    scale: 1 - (distance / maxDistance) * 0.28,
    opacity: Math.max(0.45, 1 - (distance / maxDistance) * 0.5),
    zIndex: visible - distance,
  }
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4500,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [radiusX, setRadiusX] = useState(230)
  const [narrow, setNarrow] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const activeIndex = controlledIndex ?? internalIndex
  const total = items.length
  const visible = Math.min(MAX_VISIBLE, total)

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total
      if (controlledIndex === undefined) setInternalIndex(next)
      onActiveChange?.(next)
    },
    [total, controlledIndex, onActiveChange],
  )

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  /* Measure directly on layout as well as via ResizeObserver: RO doesn't
     fire in a background/hidden tab, so a first-paint measurement is what
     guarantees a sane radius rather than the initial guess.

     Deps intentionally frozen to `[]` — this reads `items.length` and
     `visible` from the closure once on mount rather than re-subscribing to
     them, so the effect's dependency array can never change shape across
     renders regardless of how the item count is computed upstream. The
     carousel's item count doesn't change after mount in practice; if that
     ever stops being true, re-key the component instead of reintroducing a
     dynamic dep here. */
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return

    const halfVisible = Math.floor(visible / 2)
    const outerAngle = halfVisible > 0 ? (halfVisible / visible) * Math.PI : 0
    const sinOuter = Math.sin(outerAngle)

    const apply = (width: number) => {
      setNarrow(width < NARROW_BREAKPOINT)
      // Widest radius the container allows, but never so wide the outermost
      // card leaves the track. sin() of the outermost angle converts the
      // radius into the actual horizontal offset a card will sit at.
      const maxOffset = (width - CARD_W) / 2
      const maxRadius = sinOuter > 0 ? maxOffset / sinOuter : 0
      setRadiusX(Math.max(120, Math.min(maxRadius, width * 0.34)))
    }

    const measure = () => apply(el.getBoundingClientRect().width)

    measure()
    /* Re-measure on timers as well as via ResizeObserver. The first paint can
       land before fonts/late layout settle, and RO is suspended in a
       background tab — timers still fire there, so this is what guarantees
       the radius ends up matching the real track width. */
    const timers = [setTimeout(measure, 0), setTimeout(measure, 250)]
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width))
    ro.observe(el)
    window.addEventListener("resize", measure)

    return () => {
      timers.forEach(clearTimeout)
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!autoPlay || paused || total < 2) return
    const id = setInterval(next, autoPlayInterval)
    return () => clearInterval(id)
  }, [autoPlay, autoPlayInterval, paused, next, total])

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Steps"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          prev()
        }
        if (e.key === "ArrowRight") {
          e.preventDefault()
          next()
        }
      }}
      className={cn("relative flex flex-col items-center gap-6", className)}
    >
      {/* Arc track */}
      <div
        ref={trackRef}
        role="listbox"
        aria-label="Steps"
        data-debug-radius={radiusX}
        className="relative h-[340px] w-full sm:h-[350px]"
      >
        {items.map((item, i) => {
          const pos = getItemPosition(i, activeIndex, total, visible)
          if (!pos) return null

          const isActive = i === activeIndex
          // On narrow viewports only the active card is shown, centred.
          if (narrow && !isActive) return null

          const Icon = item.icon
          const x = narrow ? 0 : Math.sin(pos.angle) * radiusX
          const y = narrow ? 0 : (1 - Math.cos(pos.angle)) * RADIUS_Y

          return (
            <motion.button
              key={item.id}
              type="button"
              role="option"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => goTo(i)}
              initial={false}
              animate={{ x, y, scale: narrow ? 1 : pos.scale, opacity: narrow ? 1 : pos.opacity }}
              style={{ zIndex: pos.zIndex, transformOrigin: "center center" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute left-1/2 top-1/2 flex h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col overflow-hidden rounded-[1.25rem] p-6 text-left transition-shadow duration-300",
                isActive
                  ? "bg-white shadow-[0_28px_70px_-24px_color-mix(in_oklch,var(--primary)_45%,transparent),0_0_0_1px_color-mix(in_oklch,var(--primary)_22%,transparent)]"
                  : "bg-white shadow-[0_12px_34px_-18px_oklch(0.205_0_0/0.3),0_0_0_1px_oklch(0.205_0_0/0.07)]",
              )}
            >
              {/* Red wash + accent rail mark the focal card; neighbours stay
                  plain white so the eye lands on the active step first. */}
              {isActive && (
                <>
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(160deg, color-mix(in oklch, var(--primary) 13%, white), white 62%)",
                    }}
                  />
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-primary" />
                </>
              )}

              {/* Oversized step numeral, set as a background watermark so it
                  adds depth without competing with the copy. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -bottom-7 -right-2 select-none font-serif text-[8rem] leading-none tabular-nums transition-colors",
                  isActive ? "text-primary/[0.09]" : "text-foreground/[0.045]",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center justify-between gap-2">
                {Icon && (
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-primary text-white shadow-[0_8px_18px_-6px_color-mix(in_oklch,var(--primary)_65%,transparent)]"
                        : "bg-primary/[0.08] text-primary",
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                )}
                {item.tag && (
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground/60",
                    )}
                  >
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="relative mt-4 text-[1.0625rem] font-semibold leading-snug tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="relative mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {item.bullets && item.bullets.length > 0 && (
                <>
                  <span
                    aria-hidden
                    className={cn("relative mt-auto h-px w-full transition-colors", isActive ? "bg-primary/20" : "bg-border")}
                  />
                  <ul className="relative space-y-2 pt-3.5">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[11.5px] leading-snug text-foreground/80">
                        <Check
                          className={cn("mt-0.5 h-3 w-3 shrink-0 transition-colors", isActive ? "text-primary" : "text-primary/55")}
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous step"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${item.title}`}
              aria-current={i === activeIndex}
              className={cn(
                "h-1.5 shrink-0 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next step"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground transition-all hover:border-primary/50 hover:text-primary active:scale-95"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default CircularCarousel
