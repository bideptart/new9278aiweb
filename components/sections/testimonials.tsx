"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Clock, PhoneCall, Rocket, ShieldCheck, BadgeCheck, Building2 } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/* ==================================================================
   Back to the drifting row, but the card itself is rebuilt — twice
   now. The first rebuild put a "call scrubber" on every card: a play
   button and a waveform that looked like it played audio but did
   nothing when clicked. That's gone. Nothing on this card pretends to
   be interactive unless it actually is.

   In its place: an honest, computed detail — a reading-time estimate
   derived from each quote's actual word count — plus a bigger serif
   quote as the centerpiece, since that's the thing doing the
   persuading.

   Two things carried over as fixes rather than styling: the quote is
   no longer line-clamped (every review used to get cut mid-sentence),
   and the four per-card accent colours (cyan, magenta, violet, mint)
   are gone — they fought the red brand.
   ================================================================== */

const metrics = [
  { icon: PhoneCall, value: 2.4, suffix: "M+", label: "Calls handled / month", decimals: 1 },
  { icon: Clock, value: 62, suffix: "%", label: "Average ops time saved", decimals: 0 },
  { icon: TrendingUp, value: 3.1, suffix: "x", label: "Lift in qualified leads", decimals: 1 },
]

const testimonials = [
  {
    metric: "Saved 60 hrs / week",
    metricIcon: Clock,
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
    metricIcon: TrendingUp,
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
    metricIcon: ShieldCheck,
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
    metricIcon: Rocket,
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

/** Real reading time, computed from the quote's own word count — not a
    prop, not a fake duration. ~180 wpm, floored to a whole second. */
function readSeconds(quote: string) {
  const words = quote.trim().split(/\s+/).length
  return Math.max(4, Math.round((words / 180) * 60))
}

/* ---------- the card ------------------------------------------------ */

/**
 * Stays on the brand's red/white system throughout. Cards sit dead
 * straight in the row now — the earlier per-card tilt never actually
 * un-tilted on hover, so a scrolling row of cards at alternating
 * angles just read as broken rather than "hand-placed". Attractiveness
 * instead comes from a crisp gradient border, a top accent line, an
 * oversized serif quote mark, a glowing avatar ring, a soft ambient
 * glow that blooms on hover, and the quote itself set large as the
 * card's centerpiece — no fake controls pretending to do something
 * they don't.
 */
function CallCard({ t }: { t: (typeof testimonials)[number] }) {
  const secs = readSeconds(t.quote)
  const MetricIcon = t.metricIcon

  return (
    <div className="group/card relative shrink-0 py-4">
      {/* soft ambient glow — blooms on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 -z-10 rounded-[24px] bg-primary/[0.14] opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
      />
      <figure className="testimonial-card group relative flex h-full w-[290px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white pl-1 shadow-[0_2px_14px_rgba(17,17,17,0.05)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_color-mix(in_oklch,var(--primary)_32%,transparent)] sm:w-[368px]">
        {/* left accent bar instead of a top gradient line */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1"
          style={{
            backgroundImage:
              "linear-gradient(180deg, var(--primary), color-mix(in oklch, var(--primary) 55%, var(--ai-magenta)))",
          }}
        />

        <div className="relative flex flex-1 flex-col p-5 pl-6">
          {/* ── metric + icon row, up top ────────────────────────── */}
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
              style={{
                backgroundImage:
                  "linear-gradient(150deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--ai-magenta)))",
                boxShadow: "0 10px 20px -10px color-mix(in oklch, var(--primary) 55%, transparent)",
              }}
            >
              <MetricIcon className="h-4.5 w-4.5" strokeWidth={2.25} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-normal tracking-tight text-foreground">{t.metric}</p>
              <p className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
                <Building2 className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
                {t.industry}
              </p>
            </div>
            <span className="ml-auto shrink-0 self-start font-mono text-[9.5px] tabular-nums text-muted-foreground/45">
              {secs}s read
            </span>
          </div>

          {/* ── the quote ─────────────────────────────────────────── */}
          <blockquote className="mt-4 flex-1 text-pretty font-serif text-[15px] italic leading-relaxed tracking-tight text-foreground/85">
            “{t.quote}”
          </blockquote>

          {/* ── author, avatar with an overlapping verified badge ──── */}
          <div className="mt-5 flex items-center gap-3 border-t border-black/[0.06] pt-4">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-normal text-white ring-2 ring-white"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 35% 28%, color-mix(in oklch, var(--primary) 62%, white), var(--primary))",
                }}
              >
                {t.initial}
              </span>
              <BadgeCheck
                className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-white text-primary"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-normal tracking-tight">{t.author}</p>
              <p className="truncate text-[10.5px] text-muted-foreground">
                {t.role} · {t.company}
              </p>
            </div>
          </div>
        </div>
      </figure>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section id="testimonials" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[34rem] w-[34rem] -translate-x-1/2">
        <motion.div
          aria-hidden="true"
          className="h-full w-full rounded-full bg-primary/[0.05] blur-[120px] [will-change:transform]"
          animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
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

        {/* metrics */}
        <ScrollReveal className="mx-auto mt-9 max-w-2xl">
          {/* mobile: 2 tiles up top, 3rd centered full-width below; sm+: 3 across */}
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm sm:grid-cols-3">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <div
                  key={m.label}
                  className={cn(
                    "group flex flex-col items-center gap-1 px-2 py-4 text-center transition-colors duration-300 hover:bg-primary/[0.03] sm:px-4",
                    i === 1 && "border-l border-border/60",
                    i === 2 && "col-span-2 border-t border-border/60 sm:col-span-1 sm:border-l sm:border-t-0",
                  )}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-3 w-3 text-primary" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <p className="mt-1 font-mono text-xl font-normal leading-none text-primary sm:text-2xl">
                    <CountUp to={m.value} decimals={m.decimals} suffix={m.suffix} />
                  </p>
                  <p className="text-pretty text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
                    {m.label}
                  </p>
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* drifting row of call cards */}
        <ScrollReveal className="mt-9 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          {/* under reduced-motion the marquee is off, so the row must scroll
              by hand or cards past the first would be unreachable */}
          <div className={cn(reduced && "overflow-x-auto")}>
            <div className={cn("flex w-max items-stretch gap-5", !reduced && "marquee")}>
              {(reduced ? testimonials : [...testimonials, ...testimonials]).map((t, i) => (
                <CallCard key={`${t.author}-${i}`} t={t} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
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
