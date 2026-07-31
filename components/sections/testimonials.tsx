"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Quote,
  Star,
  TrendingUp,
  Clock,
  PhoneCall,
  BadgeCheck,
  ArrowLeft,
  ArrowRight,
  Building2,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/* ==================================================================
   Rebuilt from the drifting marquee into a spotlight.

   The marquee had two problems worth fixing rather than restyling:
   every quote was line-clamped to three lines, so no testimonial could
   actually be read end to end; and each card carried its own accent
   colour (cyan, magenta, violet, mint) that fought the red brand.

   Now: one testimonial at full length on stage, the rest as a
   selectable rail beside it, all on the brand red — plus the industry
   labels that back up the "dental clinics to logistics ops" claim in
   the intro, which previously had nothing supporting it on the page.
   ================================================================== */

const AUTO_MS = 7000

const metrics = [
  { icon: PhoneCall, value: 2.4, suffix: "M+", label: "Calls handled / month", decimals: 1 },
  { icon: Clock, value: 62, suffix: "%", label: "Average ops time saved", decimals: 0 },
  { icon: TrendingUp, value: 3.1, suffix: "x", label: "Lift in qualified leads", decimals: 1 },
]

const testimonials = [
  {
    metric: "Saved 60 hrs / week",
    industry: "Real estate",
    quote:
      "Aria handles every inbound after-hours call now. We replaced an offshore answering service inside two weeks and our reply time dropped from 14 minutes to under one.",
    author: "Lina Okafor",
    role: "VP Operations",
    company: "Marlowe Realty",
    initial: "L",
  },
  {
    metric: "+38% conversion",
    industry: "Solar",
    quote:
      "The agent handles objections better than half my SDRs. Real interruptions, real follow-up questions — the prospects don't realize they're talking to AI until we tell them.",
    author: "Marcus Chen",
    role: "Head of Sales",
    company: "Northwind Solar",
    initial: "M",
  },
  {
    metric: "99.4% deflection",
    industry: "Logistics",
    quote:
      "We pointed our business number at 9278 and within a day it was triaging, scheduling, and updating our CRM on its own. The remaining 0.6% are the calls humans should handle anyway.",
    author: "Priya Anand",
    role: "Director of Support",
    company: "Glide Logistics",
    initial: "P",
  },
  {
    metric: "Live in 4 days",
    industry: "Dental",
    quote:
      "I was quoted 6 months by an enterprise vendor. We had a working voice agent in production by day four — connected to our calendar, CRM, and existing phone number — at an order of magnitude less.",
    author: "Daniel Reyes",
    role: "CTO",
    company: "Bright Dental Group",
    initial: "D",
  },
]

/** Counts up once the element scrolls into view. */
function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement | null>(null)
  const [v, setV] = useState(reduced ? to : 0)
  const started = useRef(false)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1)
          setV(to * (1 - Math.pow(1 - p, 3)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/** Avatar with a soft pulse ring — used on stage only. */
function StageAvatar({ initial }: { initial: string }) {
  const reduced = useReducedMotion()
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/25"
          animate={{ scale: [0.85, 1.45], opacity: [0.55, 0] }}
          transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
        />
      )}
      <span
        className="relative flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white ring-2 ring-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 35% 28%, color-mix(in oklch, var(--primary) 62%, white), var(--primary))",
          boxShadow: "0 10px 22px -6px color-mix(in oklch, var(--primary) 62%, transparent)",
        }}
      >
        {initial}
      </span>
    </span>
  )
}

export function Testimonials() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dir, setDir] = useState(1)
  const t = testimonials[active]

  const go = useCallback((next: number, d: number) => {
    setDir(d)
    setActive((next + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (reduced || paused) return
    const id = setTimeout(() => go(active + 1, 1), AUTO_MS)
    return () => clearTimeout(id)
  }, [active, paused, reduced, go])

  return (
    <section id="testimonials" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[120px] [will-change:transform]"
        animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-magenta">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Loved by operators
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Teams shipping AI voice agents <span className="text-primary">that actually convert.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From dental clinics to logistics ops, 9278.ai is answering, qualifying, and closing — 24/7, on the carrier
            you already use.
          </p>
        </ScrollReveal>

        {/* ── metrics ───────────────────────────────────────────────── */}
        <ScrollReveal className="mt-10">
          <div className="grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm">
            {metrics.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.label}
                  className="group relative flex flex-col items-center gap-1 px-2 py-5 text-center transition-colors duration-300 hover:bg-primary/[0.03] sm:px-4"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <p className="mt-1.5 font-mono text-2xl font-bold leading-none text-primary sm:text-3xl">
                    <CountUp to={m.value} decimals={m.decimals} suffix={m.suffix} />
                  </p>
                  <p className="text-pretty text-[10px] leading-tight text-muted-foreground sm:text-xs">{m.label}</p>
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* ── spotlight + rail ──────────────────────────────────────── */}
        <ScrollReveal className="mt-8">
          <div
            className="grid gap-4 lg:grid-cols-[1fr_290px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* stage */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-white p-6 shadow-[0_30px_70px_-38px_oklch(0.577_0.245_27.33/0.4)] sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_0%,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_60%)]"
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4"
                animate={reduced ? undefined : { y: [0, 6, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Quote className="h-32 w-32 text-primary/[0.07]" strokeWidth={1.5} />
              </motion.div>

              {/* top row */}
              <div className="relative flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/20">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.75} aria-hidden="true" />
                  {t.metric}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Building2 className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                  {t.industry}
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </span>
              </div>

              {/* full quote — no clamp, this is the point of the rebuild */}
              <div className="relative mt-5 min-h-[140px] sm:min-h-[124px]">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.blockquote
                    key={t.author}
                    custom={dir}
                    initial={{ opacity: 0, y: 14 * dir, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14 * dir, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-pretty font-serif text-lg leading-[1.5] tracking-tight text-foreground/90 sm:text-[22px]"
                  >
                    &ldquo;{t.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* footer */}
              <div className="relative mt-auto flex items-center gap-3 border-t border-border/50 pt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.initial}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    <StageAvatar initial={t.initial} />
                  </motion.div>
                </AnimatePresence>

                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 truncate text-sm font-semibold tracking-tight">
                    {t.author}
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>

                {/* controls */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden font-mono text-[10px] tabular-nums text-muted-foreground sm:inline">
                    {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(active - 1, -1)}
                    aria-label="Previous review"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1, 1)}
                    aria-label="Next review"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* auto-advance progress — spans the card base */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-black/[0.05]">
                {!reduced && !paused && (
                  <motion.span
                    key={active}
                    className="block h-full bg-gradient-to-r from-primary/50 to-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </div>

            {/* rail */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {testimonials.map((item, i) => {
                const on = i === active
                return (
                  <button
                    key={item.author}
                    type="button"
                    onClick={() => go(i, i > active ? 1 : -1)}
                    aria-label={`Read ${item.author}'s review`}
                    aria-current={on}
                    className={cn(
                      "group relative flex min-w-[228px] flex-1 items-center gap-3 overflow-hidden rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 lg:min-w-0",
                      on
                        ? "border-primary/30 bg-white shadow-[0_16px_34px_-22px_oklch(0.577_0.245_27.33/0.5)]"
                        : "border-border/60 bg-white/55 hover:border-primary/20 hover:bg-white",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="rail-marker"
                        className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-primary"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                        on ? "text-white" : "bg-primary/10 text-primary",
                      )}
                      style={
                        on
                          ? {
                              backgroundImage:
                                "radial-gradient(circle at 35% 28%, color-mix(in oklch, var(--primary) 62%, white), var(--primary))",
                            }
                          : undefined
                      }
                    >
                      {item.initial}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[13px] font-semibold tracking-tight transition-colors",
                          on ? "text-foreground" : "text-foreground/75 group-hover:text-foreground",
                        )}
                      >
                        {item.author}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">{item.company}</span>
                      <span
                        className={cn(
                          "mt-1 inline-block truncate rounded px-1.5 py-px font-mono text-[8.5px] font-semibold uppercase tracking-wider transition-colors duration-300",
                          on ? "bg-primary/10 text-primary" : "bg-black/[0.04] text-muted-foreground/70",
                        )}
                      >
                        {item.metric}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ── industry trust strip ──────────────────────────────────── */}
        <ScrollReveal className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Running in
            </span>
            {["Real estate", "Solar", "Logistics", "Dental", "Home services", "Legal", "Automotive"].map((s) => (
              <span
                key={s}
                className="rounded-full border border-border/50 bg-white/50 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors duration-300 hover:border-primary/25 hover:text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
