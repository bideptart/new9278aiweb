"use client"

// Marketing /pricing plan grid. Fetches the SAME live plans the get-started
// signup widget uses (https://voice.9278.ai/api/plans), so any pricing update
// in the portal is reflected here automatically. Each card deep-links into
// /get-started?plan=<id>&cycle=<cycle>, where checkout is completed.

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Headphones,
  Loader2,
  Mic2,
  Minus,
  Quote,
  ShieldCheck,
  TrendingUp,
  Clock,
  Rocket,
  Users,
} from "lucide-react"
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

const PORTAL_BASE = "https://voice.9278.ai"

type Plan = {
  id: string
  label: string
  amount: number
  yearlyAmount: number
  yearlySavingsUsd?: number
  min: number
  rate: number
  agents: number
  tag: string | null
  sub: string
  perks: string[]
}

const usd = (n: number) =>
  "$" + Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })

// Pulls a specific attribute (voice stack, support tier, SLA) out of a plan's
// perks list, so the comparison table stays in sync with whatever the portal
// API returns instead of hardcoding a second copy of the same data.
function perkMatching(perks: string[], pattern: RegExp) {
  return perks.find((perk) => pattern.test(perk)) ?? "—"
}

const COMPARISON_ROWS: Array<{
  label: string
  icon: typeof Clock
  value: (p: Plan) => string
}> = [
  { label: "Included minutes", icon: Clock, value: (p) => `${p.min.toLocaleString("en-US")} min` },
  { label: "Effective rate", icon: Gauge, value: (p) => `${usd(p.rate)}/min` },
  { label: "AI voice agents", icon: Users, value: (p) => (p.agents >= 999 ? "Unlimited" : String(p.agents)) },
  { label: "Voice stack", icon: Mic2, value: (p) => perkMatching(p.perks, /stack|premium/i) },
  { label: "Support", icon: Headphones, value: (p) => perkMatching(p.perks, /support|success manager/i) },
  { label: "SLA", icon: ShieldCheck, value: (p) => (p.perks.some((perk) => /sla/i.test(perk)) ? "✓" : "—") },
]

const TESTIMONIALS = [
  {
    metric: "+38% conversion",
    quote: "The agent handles objections better than half my SDRs — prospects don't realize it's AI until we tell them.",
    author: "Marcus Chen",
    role: "Head of Sales, Northwind Solar",
    icon: TrendingUp,
    accent: "var(--ai-cyan)",
  },
  {
    metric: "Saved 60 hrs/week",
    quote: "Aria handles every inbound after-hours call now. Our reply time dropped from 14 minutes to under one.",
    author: "Lina Okafor",
    role: "VP Operations, Marlowe Realty",
    icon: Clock,
    accent: "var(--ai-violet)",
  },
  {
    metric: "Live in 4 days",
    quote: "I was quoted 6 months by an enterprise vendor. We had a working voice agent in production by day four.",
    author: "Daniel Reyes",
    role: "CTO, Bright Dental Group",
    icon: Rocket,
    accent: "var(--ai-magenta)",
  },
]

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(active ? target : 0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    const controls = animate(0, target, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active])
  return value
}

// Animates a displayed number from its previous value to a new one whenever
// it changes (e.g. the Monthly/Yearly toggle) — shows the exact value on
// first mount, only tweens on subsequent changes.
function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target)
  const prevTarget = useRef(target)
  useEffect(() => {
    if (prevTarget.current === target) return
    const from = prevTarget.current
    prevTarget.current = target
    const controls = animate(from, target, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [target])
  return display
}

export function PricingPlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly")
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${PORTAL_BASE}/api/plans`).then((r) => r.json())
        if (!cancelled) setPlans(res.plans || [])
      } catch (e) {
        if (!cancelled) setLoadError((e as Error).message || "Could not load plans")
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const priceFor = (p: Plan) => (cycle === "yearly" ? p.yearlyAmount : p.amount)
  const yearlySavings = (p: Plan) => p.yearlySavingsUsd ?? Math.max(0, p.amount * 12 - p.yearlyAmount)

  // Display order: Starter (left) → Growth (middle) → Scale (right), regardless
  // of the order the portal API returns them in.
  const PLAN_ORDER = ["starter", "growth", "scale"]
  const ordered = useMemo(
    () => [...plans].sort((a, b) => PLAN_ORDER.indexOf(a.id) - PLAN_ORDER.indexOf(b.id)),
    [plans],
  )

  const recommendedPlan = useMemo(
    () => ordered.find((p) => p.tag) ?? ordered[0] ?? null,
    [ordered],
  )

  // Mobile plan carousel: swipeable, snap-to-card, with peeking side cards,
  // dot pagination, and prev/next arrows. Desktop keeps the 3-column grid.
  // offsetLeft is relative to the nearest *positioned* ancestor, which isn't
  // reliably the scroll container itself — use getBoundingClientRect deltas
  // instead so this works regardless of the offsetParent chain.
  const childScrollLeft = (el: HTMLDivElement, child: HTMLElement) =>
    child.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft

  const scrollToIndex = (idx: number) => {
    const el = carouselRef.current
    const child = el?.children[idx] as HTMLElement | undefined
    if (el && child) el.scrollTo({ left: childScrollLeft(el, child), behavior: "smooth" })
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const onScroll = () => {
      let closest = 0
      let min = Infinity
      Array.from(el.children).forEach((child, idx) => {
        const dist = Math.abs(childScrollLeft(el, child as HTMLElement) - el.scrollLeft)
        if (dist < min) {
          min = dist
          closest = idx
        }
      })
      setActiveIndex(closest)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [ordered.length])

  const savingsTarget = recommendedPlan ? yearlySavings(recommendedPlan) : 0
  const animatedSavings = useCountUp(savingsTarget, cycle === "yearly" && Boolean(recommendedPlan))

  if (loadError) {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive">
        Couldn&apos;t load live pricing ({loadError}). Please refresh, or{" "}
        <Link href="/contact" className="underline">
          contact us
        </Link>
        .
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading live pricing…
      </div>
    )
  }

  return (
    <div>
      {/* Billing cycle toggle */}
      <div className="mb-3 mt-6 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm">
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-full px-4 py-1.5 transition",
              cycle === "monthly" ? "bg-foreground text-background" : "text-muted-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("yearly")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 transition",
              cycle === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            Yearly
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px]",
                cycle === "yearly" ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>
      {cycle === "yearly" && recommendedPlan && (
        <p className="mb-8 text-center text-sm text-primary">
          Switching to yearly saves you {usd(animatedSavings)} on {recommendedPlan.label}.
        </p>
      )}
      {cycle === "monthly" && <div className="mb-8" />}

      {/* Per-second billing callout */}
      <div className="mb-8 flex justify-center px-4">
        <div className="flex flex-row items-start gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-4 py-2 text-left text-sm text-primary sm:items-center sm:text-center">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden />
          <span>
            <strong>Per-second billing</strong> — pay only for the seconds you use.
          </span>
        </div>
      </div>

      {/* Plan cards — 3-col grid on desktop, swipeable peek carousel on mobile */}
      <div className="hidden gap-8 md:grid md:grid-cols-3 md:gap-6 md:items-stretch lg:gap-8">
        {ordered.map((p) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} price={priceFor(p)} savings={yearlySavings(p)} />
        ))}
      </div>

      <div className="md:hidden">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[4%] pt-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ordered.map((p, i) => (
            <div key={p.id} className="w-[92%] shrink-0 snap-center">
              <PlanCard
                plan={p}
                cycle={cycle}
                price={priceFor(p)}
                savings={yearlySavings(p)}
                emphasize={i === activeIndex}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous plan"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1">
            {ordered.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.label}`}
                onClick={() => scrollToIndex(i)}
                className="flex h-10 items-center px-1.5"
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next plan"
            onClick={() => scrollToIndex(Math.min(ordered.length - 1, activeIndex + 1))}
            disabled={activeIndex === ordered.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        All plans include real-time transcripts, recording, analytics, and unlimited test calls in the playground.
      </p>

      {/* Feature comparison table */}
      <div className="mt-16 flex justify-center">
        <span className="ai-pill-cyan">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Comparison
        </span>
      </div>
      <h3 className="mt-6 text-balance text-center text-2xl font-serif font-normal tracking-tight md:text-3xl">
        Compare plans <span className="text-primary">side by side.</span>
      </h3>
      <p className="mx-auto mb-8 mt-4 max-w-xl text-pretty text-center text-sm leading-relaxed text-muted-foreground md:text-base">
        See exactly what you get at every tier — included minutes, effective rate, and support level, all in one
        view.
      </p>
      {/* Mobile: one stacked card per plan — no horizontal scroll needed */}
      <div className="space-y-4 md:hidden">
        {ordered.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-primary/40"
          >
            <div className={cn("flex items-center justify-between px-4 py-3", p.tag ? "bg-primary/10" : "bg-card/40")}>
              <span className="font-semibold text-foreground">{p.label}</span>
              {p.tag && <span className="text-xs font-medium text-primary">{p.tag}</span>}
            </div>
            <dl>
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={cn(
                    "flex items-center justify-between border-t border-border/40 px-4 py-2.5 text-sm",
                    i % 2 === 1 && "bg-card/20",
                  )}
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium text-foreground">{row.value(p)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: full comparison table — the featured plan reads as its own
          raised card (lifted, rounded, glowing) rather than just a tinted
          column, so the hierarchy is obvious at a glance. */}
      <ScrollReveal className="hidden md:block">
        <div className="relative rounded-2xl border border-border/60 bg-white shadow-[0_20px_50px_-35px_rgba(17,17,17,0.25)]">
        <div className="relative overflow-x-auto pt-3">
          {/* ambient glow behind the featured column */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(38%_100%_at_63%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_75%)]"
          />
          <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="w-[26%] border-b border-border/60 bg-white p-5 align-bottom font-medium text-muted-foreground">
                  Feature
                </th>
                {ordered.map((p) => (
                  <th
                    key={p.id}
                    className={cn(
                      "relative border-b p-5 text-center align-bottom",
                      p.tag
                        ? "z-10 -translate-y-2 rounded-t-2xl border-x-2 border-t-2 border-primary/30 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_9%,white),white)] shadow-[0_-14px_36px_-20px_color-mix(in_oklch,var(--primary)_55%,transparent)]"
                        : "border-l border-border/60 bg-white",
                    )}
                  >
                    {p.tag && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 top-0 h-[3px] rounded-full"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, transparent, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--ai-magenta)), transparent)",
                        }}
                      />
                    )}
                    <span className="text-base font-bold tracking-tight text-foreground">{p.label}</span>
                    {p.tag && (
                      <span className="mt-1.5 flex justify-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_var(--primary)]">
                          <span className="relative flex h-1.5 w-1.5">
                            <motion.span
                              className="absolute inline-flex h-full w-full rounded-full bg-white/80"
                              animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                            />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                          </span>
                          {p.tag}
                        </span>
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => {
                const isLast = i === COMPARISON_ROWS.length - 1
                return (
                  <tr
                    key={row.label}
                    className={cn(
                      "group transition-colors",
                      i % 2 === 1 ? "bg-card/30" : "bg-white",
                    )}
                  >
                    <td
                      className={cn(
                        "border-border/40 p-5 font-medium text-muted-foreground transition-colors group-hover:bg-primary/[0.06]",
                        !isLast && "border-b",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="ring-1 ring-primary/15 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                          <row.icon className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                        </span>
                        {row.label}
                      </span>
                    </td>
                    {ordered.map((p) => {
                      const value = row.value(p)
                      return (
                        <td
                          key={p.id}
                          className={cn(
                            "p-5 text-center font-medium text-foreground transition-colors group-hover:bg-primary/[0.08]",
                            !isLast && "border-b",
                            p.tag
                              ? cn(
                                  "border-x-2 border-primary/30 bg-primary/[0.045]",
                                  isLast &&
                                    "rounded-b-2xl border-b-2 shadow-[0_16px_36px_-22px_color-mix(in_oklch,var(--primary)_55%,transparent)]",
                                )
                              : "border-l border-border/40",
                          )}
                        >
                          {value === "✓" ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/12">
                              <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} aria-hidden="true" />
                            </span>
                          ) : value === "—" ? (
                            <Minus className="mx-auto h-3.5 w-3.5 text-muted-foreground/35" aria-hidden="true" />
                          ) : (
                            value
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        </div>
      </ScrollReveal>

      {/* Testimonials with quantified results */}
      <div className="mt-8 grid gap-5 sm:mt-16 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.author} t={t} />
        ))}
      </div>
    </div>
  )
}

/** Tilts toward the cursor in real 3D (rotateX/rotateY on a perspective
    parent), spring-damped so it settles smoothly instead of snapping. */
function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const Icon = t.icon
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const springRx = useSpring(rx, { stiffness: 300, damping: 22, mass: 0.6 })
  const springRy = useSpring(ry, { stiffness: 300, damping: 22, mass: 0.6 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 16)
    rx.set(-py * 16)
  }

  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className="group/tcard relative h-full" style={{ perspective: "1000px" }}>
      {/* ambient glow — blooms on hover, tinted per testimonial */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] opacity-0 blur-2xl transition-opacity duration-500 group-hover/tcard:opacity-100"
        style={{ background: `color-mix(in oklch, ${t.accent} 20%, transparent)` }}
      />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d" }}
        whileHover={reduced ? undefined : { scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="ring-gradient relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(17,17,17,0.05)] transition-shadow duration-300 group-hover/tcard:shadow-[0_30px_60px_-25px_rgba(17,17,17,0.22)]"
      >
        {/* ambient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 85% 0%, color-mix(in oklch, ${t.accent} 10%, transparent), transparent 60%)`,
          }}
        />
        <span className="scan-line opacity-30" aria-hidden />

        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(28px)" }}>
          <Quote className="h-7 w-7" style={{ color: `color-mix(in oklch, ${t.accent} 35%, transparent)` }} strokeWidth={2.5} aria-hidden="true" />
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover/tcard:rotate-6"
            style={{
              background: `color-mix(in oklch, ${t.accent} 12%, transparent)`,
              boxShadow: `0 6px 16px -4px color-mix(in oklch, ${t.accent} 45%, transparent)`,
              color: t.accent,
            }}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <span
          className="relative mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold"
          style={{
            background: `color-mix(in oklch, ${t.accent} 12%, transparent)`,
            color: t.accent,
            transform: "translateZ(20px)",
          }}
        >
          {t.metric}
        </span>

        <p
          className="relative mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground/85"
          style={{ transform: "translateZ(14px)" }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>

        <div
          className="relative mt-5 flex items-center gap-3 border-t border-black/[0.06] pt-4"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* avatar with a verification ring that draws itself in, plus a
              pop-in check badge — borrowed from the "security card" idea of
              visually confirming an identity, dialed back to fit a quote. */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-9 w-9 -rotate-90" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <motion.circle
                cx="18"
                cy="18"
                r="16.25"
                stroke={t.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: "easeInOut", delay: 0.15 }}
              />
            </svg>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-white"
              style={{
                backgroundImage: `radial-gradient(circle at 35% 28%, color-mix(in oklch, ${t.accent} 60%, white), ${t.accent})`,
              }}
            >
              {t.author
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <motion.span
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-white ring-2 ring-white"
              style={{ background: t.accent }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 16, delay: 1.3 }}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
            </motion.span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-foreground">{t.author}</p>
            <p className="truncate text-[11px] text-muted-foreground">{t.role}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function PlanCard({
  plan: p,
  cycle,
  price,
  savings,
  emphasize = false,
}: {
  plan: Plan
  cycle: "monthly" | "yearly"
  price: number
  savings: number
  emphasize?: boolean
}) {
  const featured = Boolean(p.tag)
  const animatedPrice = useAnimatedNumber(price)

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1",
        featured
          ? "border-primary/40 shadow-[0_25px_70px_-25px_color-mix(in_oklch,var(--primary)_38%,transparent)] md:scale-[1.02]"
          : "border-black/[0.08] hover:border-primary/25 hover:shadow-[0_25px_60px_-30px_rgba(17,17,17,0.18)]",
        emphasize && "border-primary/40 shadow-[0_25px_70px_-25px_color-mix(in_oklch,var(--primary)_38%,transparent)] scale-[1.02]",
      )}
    >
      {/* ambient red wash on the featured card */}
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 65%)",
          }}
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight text-foreground">{p.label}</h3>
        {p.tag && (
          <span className="whitespace-nowrap rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            {p.tag}
          </span>
        )}
      </div>
      <p className="relative mt-1 text-xs text-muted-foreground">{p.sub}</p>

      <div className="relative mt-3.5">
        <p className="text-3xl font-extrabold leading-none tracking-tight text-foreground">
          {usd(animatedPrice)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">/{cycle === "yearly" ? "yr" : "mo"}</span>
        </p>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          {cycle === "yearly" ? `Save ${usd(savings)} vs monthly` : "Starting from"}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground/70">
          {p.min.toLocaleString("en-US")} min · {usd(p.rate)}/min ·{" "}
          {p.agents >= 999 ? "Unlimited" : `${p.agents} agents`}
        </p>
      </div>

      <StaggerGroup className="relative mt-4 flex-1 list-none space-y-2">
        {p.perks
          .filter((perk) => !/phone number|concurrent call/i.test(perk))
          .map((perk) => (
            <StaggerItem key={perk}>
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-1 h-[6px] w-[6px] shrink-0 rotate-45 border",
                    featured ? "border-primary bg-primary/20" : "border-black/25",
                  )}
                  aria-hidden="true"
                />
                <span className="text-[13px] text-foreground/80">{perk}</span>
              </div>
            </StaggerItem>
          ))}
      </StaggerGroup>

      <Button
        asChild
        size="default"
        className={cn(
          "relative mt-5 w-full rounded-full transition-all duration-200",
          featured
            ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90"
            : "border border-black/10 bg-muted text-foreground hover:border-primary/40 hover:bg-primary/5",
        )}
      >
        <Link href={`/get-started?plan=${p.id}&cycle=${cycle}`}>{featured ? `Choose ${p.label}` : "Get started"}</Link>
      </Button>
    </div>
  )
}
