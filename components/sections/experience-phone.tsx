"use client"

/**
 * The Human Experience section's centerpiece — a premium floating AI
 * Voice Agent workspace (no phone/tablet/browser mockup). A cluster of
 * interconnected glass panels — Live Call, Live Transcript, AI Thinking,
 * Call Summary, and Analytics — hover in 3D space around a neural backdrop,
 * with small status widgets orbiting the outside edge.
 *
 * Every position value below is fixed (not Math.random()) so server and
 * client markup match — no hydration mismatch from "random" decoration.
 *
 * Motion budget: transform/opacity only, so the compositor carries it.
 * `prefers-reduced-motion` strips the loops, the tilt, and the cursor glow.
 */

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Brain,
  CalendarCheck,
  CheckCircle2,
  Database,
  Gauge,
  Globe2,
  PhoneCall,
  Radar,
  Sparkles,
  TrendingUp,
  Volume2,
  Zap,
} from "lucide-react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* shared primitives                                                    */
/* ------------------------------------------------------------------ */

function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-1.5 w-1.5", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
  )
}

function useCountUp(to: number, decimals = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setV(n),
    })
    return () => controls.stop()
  }, [to])
  return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()
}

const row = (i: number) => ({
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

/* ------------------------------------------------------------------ */
/* floating glass panel — shared lift / tilt / glow / parallax          */
/* ------------------------------------------------------------------ */

function FloatPanel({
  className,
  delay = 0,
  depth = 0,
  hoverRotate = 2,
  px,
  py,
  children,
}: {
  className?: string
  delay?: number
  depth?: number
  hoverRotate?: number
  px?: MotionValue<number>
  py?: MotionValue<number>
  children: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const zeroMv = useMotionValue(0)
  const dx = useTransform(px ?? zeroMv, (v) => v * depth * -18)
  const dy = useTransform(py ?? zeroMv, (v) => v * depth * -18)

  // Positioning (absolute offsets, centering translate, responsive `hidden`
  // classes) lives on a plain div — Framer Motion's `x`/`y` style props
  // compute their own `transform`, which would silently clobber Tailwind's
  // translate utilities if they shared an element.
  return (
    <div className={cn("absolute", className)}>
      <motion.div
        className="group glass ring-gradient relative h-full w-full rounded-2xl border border-border/40 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:border-primary/45 hover:shadow-[0_25px_65px_-20px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
        style={reduced ? undefined : { x: dx, y: dy }}
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        whileHover={reduced ? undefined : { y: -10, scale: 1.035, rotate: hoverRotate, zIndex: 40 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5 + depth, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
        >
          {/* animated border glow on hover */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/50 transition-opacity duration-300 group-hover:opacity-100" />
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* card 1 — call radar (replaces the earlier "live call" avatar mock —   */
/* that exact call-in-progress visual is already used twice elsewhere,  */
/* in the hero phone. This one shows the fleet-wide view instead.)      */
/* ------------------------------------------------------------------ */

// Fixed polar positions (angle, distance-from-center) converted to
// percentages up front — deterministic, so no server/client mismatch.
const RADAR_BLIPS = [
  { angle: 18, dist: 0.82, delay: 0 },
  { angle: 95, dist: 0.5, delay: 0.5 },
  { angle: 150, dist: 0.78, delay: 1 },
  { angle: 205, dist: 0.42, delay: 1.5 },
  { angle: 268, dist: 0.68, delay: 0.25 },
  { angle: 330, dist: 0.88, delay: 0.9 },
].map((b) => {
  const rad = (b.angle * Math.PI) / 180
  return {
    left: `${50 + Math.cos(rad) * b.dist * 50}%`,
    top: `${50 + Math.sin(rad) * b.dist * 50}%`,
    delay: b.delay,
  }
})

function RadarCard() {
  const reduced = useReducedMotion()
  const calls = useCountUp(14)

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-3.5 backdrop-blur-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_65%)]"
      />
      <div className="scan-line opacity-15" aria-hidden />

      <motion.div {...row(0)} className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-primary">
          <LiveDot /> Call radar
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-500">
          <Radar className="h-3 w-3" /> Scanning
        </span>
      </motion.div>

      {/* radar face */}
      <motion.div {...row(1)} className="relative mx-auto mt-3 h-[128px] w-[128px] shrink-0">
        {[0, 22, 44].map((inset) => (
          <span key={inset} className="absolute rounded-full border border-primary/15" style={{ inset }} />
        ))}

        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "conic-gradient(from 0deg, color-mix(in oklch, var(--primary) 50%, transparent), transparent 30%)",
            }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {RADAR_BLIPS.map((b, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            style={{ left: b.left, top: b.top }}
          >
            {!reduced && (
              <motion.span
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, delay: b.delay, ease: "easeOut" }}
              />
            )}
          </span>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-primary ring-[5px] ring-primary/15" />
        </div>
      </motion.div>

      <motion.div {...row(2)} className="relative mt-3 flex items-baseline justify-center gap-1.5">
        <span className="font-mono text-[26px] font-bold leading-none tabular-nums text-neutral-900">{calls}</span>
        <span className="text-[10.5px] text-neutral-400">live calls right now</span>
      </motion.div>

      <motion.div {...row(3)} className="relative mt-auto flex items-center justify-between text-[9.5px] text-neutral-400">
        <span className="inline-flex items-center gap-1">
          <Globe2 className="h-2.5 w-2.5 text-primary" /> 60+ countries
        </span>
        <span className="font-mono tabular-nums">Sub-100ms</span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* card 2 — live transcript                                             */
/* ------------------------------------------------------------------ */

const CONVO = [
  { who: "Customer", text: "I need to reschedule tomorrow." },
  { who: "AI", text: "Sure, I found three available time slots." },
] as const

function LiveTranscriptCard() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setShown((n) => (n < CONVO.length ? n + 1 : n)), 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-2xl bg-white/90 px-3.5 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-foreground">
          <Sparkles className="h-3 w-3 text-primary" /> Live transcript
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-emerald-500">Streaming</span>
      </div>

      <div className="flex-1 space-y-1.5 overflow-hidden">
        <AnimatePresence initial={false}>
          {CONVO.slice(0, shown).map((line, i) => (
            <motion.div
              key={line.who + i}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{line.who}</p>
              <p
                className={cn(
                  "mt-0.5 text-[11px] leading-snug",
                  line.who === "AI" ? "font-medium text-primary" : "text-foreground",
                )}
              >
                {line.text}
                {i === shown - 1 && (
                  <span className="ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[2px] animate-pulse bg-primary" />
                )}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* card 3 — AI thinking                                                 */
/* ------------------------------------------------------------------ */

function ThinkingCard() {
  const reduced = useReducedMotion()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/90 px-3.5 py-4 text-center backdrop-blur-xl">
      <div className="relative h-14 w-14">
        {!reduced &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-primary/30"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 0.7 }}
            />
          ))}
        <motion.span
          className="absolute inset-3 rounded-full"
          style={{ backgroundImage: "radial-gradient(circle at 34% 28%, #fff, var(--primary) 70%)" }}
          animate={reduced ? undefined : { scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="h-5 w-5 text-white" strokeWidth={1.75} />
        </div>
      </div>

      <div>
        <p className="text-[10.5px] font-semibold text-foreground">Generating response…</p>
      </div>

      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="dot-float h-1.5 w-1.5 rounded-full bg-primary" style={{ animationDelay: `${d * 0.18}s` }} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* card 4 — call summary                                                */
/* ------------------------------------------------------------------ */

const SUMMARY_ITEMS = ["Customer issue", "Resolution", "Follow-up", "CRM updated", "Meeting scheduled"]

function SummaryCard() {
  return (
    <div className="flex h-full w-full flex-col gap-2 rounded-2xl bg-white/90 px-3.5 py-3 backdrop-blur-xl">
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-foreground">
        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Call summary
      </span>
      <ul className="space-y-1.5">
        {SUMMARY_ITEMS.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.1 }}
            className="flex items-center gap-1.5 text-[10px] leading-snug text-muted-foreground"
          >
            <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" /> {s}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* card 5 — analytics                                                   */
/* ------------------------------------------------------------------ */

const MINI_BARS = [40, 62, 48, 74, 58, 90, 70, 82]

function AnalyticsCard() {
  const calls = useCountUp(142)
  const success = useCountUp(96)
  const csat = useCountUp(4.9, 1)

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-2xl bg-white/90 px-3.5 py-3 backdrop-blur-xl">
      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-foreground">
        <Gauge className="h-3 w-3 text-primary" /> Analytics
      </span>

      <div className="grid grid-cols-3 gap-1.5">
        <div>
          <p className="font-mono text-sm font-bold leading-none tabular-nums text-foreground">{calls}</p>
          <p className="mt-1 text-[8px] uppercase tracking-wide text-muted-foreground">Calls today</p>
        </div>
        <div>
          <p className="font-mono text-sm font-bold leading-none tabular-nums text-foreground">{success}%</p>
          <p className="mt-1 text-[8px] uppercase tracking-wide text-muted-foreground">Success</p>
        </div>
        <div>
          <p className="font-mono text-sm font-bold leading-none tabular-nums text-foreground">{csat}</p>
          <p className="mt-1 text-[8px] uppercase tracking-wide text-muted-foreground">CSAT</p>
        </div>
      </div>

      <div className="flex h-8 items-end gap-[3px]">
        {MINI_BARS.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/30 to-primary"
            style={{ height: `${h}%`, originY: 1 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
          />
        ))}
      </div>

      <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-500">
        <TrendingUp className="h-2.5 w-2.5" /> +18% response time
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* floating status widgets                                              */
/* ------------------------------------------------------------------ */

// Positions sit in the open corridors between the four corner panels and
// the center card (left strip, right strip, bottom-center gap) so nothing
// overlaps — see the panel layout in ExperienceMockup for the bounding
// boxes these were measured against.
const WIDGETS = [
  { icon: LiveDot, label: "AI Active", pos: "left-1 top-[31%]", depth: 1.4, delay: 0, dot: true },
  { icon: Sparkles, label: "AI Responding", pos: "left-1 top-[48%]", depth: 1.2, delay: 1.6 },
  { icon: Globe2, label: "60+ Countries", pos: "left-1 top-[65%]", depth: 1.7, delay: 1.1 },
  { icon: Zap, label: "98ms Latency", pos: "right-1 top-[31%]", depth: 2.1, delay: 0.5 },
  { icon: PhoneCall, label: "Live Calls", pos: "right-1 top-[48%]", depth: 2.4, delay: 0.3 },
  { icon: Volume2, label: "Human Voice", pos: "right-1 top-[65%]", depth: 1.5, delay: 0.2 },
  { icon: CalendarCheck, label: "Calendar Synced", pos: "left-1/2 bottom-[17%] -translate-x-1/2", depth: 1.9, delay: 0.8 },
  { icon: Database, label: "CRM Updated", pos: "left-1/2 bottom-[3%] -translate-x-1/2", depth: 2.6, delay: 1.3 },
] as const

function FloatingWidget({
  widget,
  px,
  py,
}: {
  widget: (typeof WIDGETS)[number]
  px: MotionValue<number>
  py: MotionValue<number>
}) {
  const reduced = useReducedMotion()
  const x = useTransform(px, (v) => v * widget.depth * -16)
  const y = useTransform(py, (v) => v * widget.depth * -16)
  const Icon = widget.icon

  // Same split as FloatPanel: the outer plain div owns the absolute
  // position (including any `-translate-x-1/2` centering), so Framer's
  // `x`/`y` motion style on the inner element can't clobber it.
  return (
    <div className={cn("pointer-events-none absolute z-30 hidden xl:block", widget.pos)}>
      <motion.div
        style={reduced ? undefined : { x, y }}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 + widget.delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="glass ring-gradient inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-medium text-foreground shadow-sm"
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 4.2 + widget.depth, delay: widget.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {"dot" in widget && widget.dot ? <Icon /> : <Icon className="h-3 w-3 text-primary" />}
          {widget.label}
        </motion.span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* connector lines between panels                                       */
/* ------------------------------------------------------------------ */

function ConnectorLines() {
  const reduced = useReducedMotion()
  const paths = [
    "M98,84 C170,130 220,175 268,228",
    "M502,84 C428,130 378,175 332,228",
    "M98,536 C170,485 220,435 270,375",
    "M502,536 C428,485 378,435 330,375",
  ]
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-40 xl:block"
      viewBox="0 0 600 620"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <defs>
        <linearGradient id="dash-connector" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--ai-magenta)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          stroke="url(#dash-connector)"
          strokeWidth="1.25"
          strokeDasharray="4 10"
          className={reduced ? undefined : "conn-flow"}
          style={{ animationDuration: `${2.6 + i * 0.4}s` }}
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* ambient backdrop — grid, aurora glow, neural lines, rays, motes       */
/* ------------------------------------------------------------------ */

const NEURAL_PATHS = [
  "M0,120 C60,90 100,150 180,110 S320,70 460,130",
  "M0,340 C80,300 130,380 220,330 S380,280 460,340",
  "M40,0 C70,60 40,120 90,180 S150,260 120,340",
]

const RAYS = [
  { rotate: -18, left: "22%" },
  { rotate: 12, left: "52%" },
  { rotate: -6, left: "74%" },
]

function StageBackdrop() {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_45%,black_10%,transparent_75%)]" />

      {/* aurora glow */}
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-full w-full rounded-full bg-primary/[0.14] blur-[110px]"
          animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="absolute left-[30%] top-[20%] h-[220px] w-[220px] rounded-full bg-[var(--ai-magenta)]/[0.10] blur-[90px]"
        animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />

      {/* light rays */}
      {RAYS.map((r, i) => (
        <motion.span
          key={i}
          className="absolute top-[-10%] h-[140%] w-[1px] origin-top bg-gradient-to-b from-primary/25 via-primary/5 to-transparent"
          style={{ left: r.left, rotate: r.rotate }}
          animate={reduced ? undefined : { opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 5 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}

      {/* neural network lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-25 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,black,transparent_80%)]"
        viewBox="0 0 460 460"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="exp-synapse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--ai-magenta)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {NEURAL_PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke="url(#exp-synapse)"
            strokeWidth="1"
            strokeDasharray="4 12"
            className={reduced ? undefined : "conn-flow"}
            style={{ animationDuration: `${2.4 + i * 0.4}s` }}
          />
        ))}
      </svg>

      {/* drifting particles — fixed positions, deterministic */}
      {[
        { l: "18%", t: "22%", d: 0 },
        { l: "82%", t: "18%", d: 0.6 },
        { l: "12%", t: "68%", d: 1.2 },
        { l: "88%", t: "62%", d: 1.8 },
        { l: "50%", t: "8%", d: 2.4 },
        { l: "45%", t: "90%", d: 0.3 },
        { l: "65%", t: "35%", d: 1.5 },
        { l: "30%", t: "50%", d: 0.9 },
      ].map((m, i) => (
        <span
          key={i}
          className="dot-float absolute h-1 w-1 rounded-full bg-primary/50"
          style={{ left: m.l, top: m.t, animationDelay: `${m.d}s` }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* the workspace — cursor parallax wrapper                              */
/* ------------------------------------------------------------------ */

export function ExperienceMockup() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const cfg = { stiffness: 120, damping: 20, mass: 0.5 }
  const sx = useSpring(nx, cfg)
  const sy = useSpring(ny, cfg)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7])
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || reduced) return
    const r = el.getBoundingClientRect()
    nx.set((e.clientX - r.left) / r.width - 0.5)
    ny.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        nx.set(0)
        ny.set(0)
      }}
      className="relative mx-auto flex min-h-[420px] w-full max-w-[500px] items-center justify-center py-6 xl:min-h-[540px]"
      style={{ perspective: "1600px" }}
    >
      <StageBackdrop />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-1/2 h-8 w-[220px] -translate-x-1/2 rounded-[50%] bg-primary/25 blur-2xl"
      />

      {/* floating "control center" label */}
      <motion.span
        className="glass absolute left-1/2 top-0 z-40 hidden -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-primary xl:flex"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <LiveDot /> AI Control Center
      </motion.span>

      {/* Scale lives on this plain wrapper (not the motion.div below) so it
          doesn't fight Framer's own inline `transform` from rotateX/rotateY —
          mixing a Tailwind transform utility onto a Framer-controlled element
          silently drops one of the two. Only shrinks at xl+, where the full
          multi-panel cluster (vs. just the mobile single card) is shown. */}
      <div className="relative h-[420px] w-full max-w-[300px] origin-center xl:h-[620px] xl:w-[600px] xl:max-w-none xl:scale-[0.82]">
        <motion.div
          className="relative h-full w-full"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
        <ConnectorLines />

        {WIDGETS.map((w) => (
          <FloatingWidget key={w.label} widget={w} px={sx} py={sy} />
        ))}

        {/* main live call panel */}
        <FloatPanel
          className="left-1/2 top-1/2 z-20 h-[300px] w-[248px] -translate-x-1/2 -translate-y-1/2"
          depth={0.6}
          hoverRotate={0}
          px={sx}
          py={sy}
        >
          <RadarCard />
        </FloatPanel>

        {/* live transcript — top-left */}
        <FloatPanel
          className="left-0 top-0 z-10 hidden h-[168px] w-[196px] xl:block"
          delay={0.1}
          depth={1.4}
          hoverRotate={-2}
          px={sx}
          py={sy}
        >
          <LiveTranscriptCard />
        </FloatPanel>

        {/* AI thinking — top-right */}
        <FloatPanel
          className="right-0 top-0 z-10 hidden h-[160px] w-[172px] xl:block"
          delay={0.2}
          depth={1.8}
          hoverRotate={3}
          px={sx}
          py={sy}
        >
          <ThinkingCard />
        </FloatPanel>

        {/* call summary — bottom-left */}
        <FloatPanel
          className="bottom-0 left-0 z-10 hidden h-[176px] w-[200px] xl:block"
          delay={0.3}
          depth={1.6}
          hoverRotate={-3}
          px={sx}
          py={sy}
        >
          <SummaryCard />
        </FloatPanel>

        {/* analytics — bottom-right */}
        <FloatPanel
          className="bottom-0 right-0 z-10 hidden h-[178px] w-[204px] xl:block"
          delay={0.4}
          depth={1.2}
          hoverRotate={2}
          px={sx}
          py={sy}
        >
          <AnalyticsCard />
        </FloatPanel>
        </motion.div>
      </div>
    </div>
  )
}
