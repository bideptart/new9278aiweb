"use client"

/**
 * The Human Experience section's centerpiece — a single voice-orb scene
 * (no phone/tablet/browser mockup, and no scattered cluster of floating
 * card boxes either): a pulsing gradient sphere ringed by a radial
 * equalizer, a one-line live caption ticker beneath it, and a single
 * inline stat row. One cohesive composition instead of a stack of panels.
 *
 * Every position value below is fixed (not Math.random()) so server and
 * client markup match — no hydration mismatch from "random" decoration.
 *
 * Motion budget: transform/opacity only, so the compositor carries it.
 * `prefers-reduced-motion` strips the loops, the tilt, and the cursor glow.
 */

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Brain, Gauge, Globe2, PhoneCall, ShieldCheck, TrendingUp, Zap } from "lucide-react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
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

/* ------------------------------------------------------------------ */
/* the voice orb — one centerpiece instead of a cluster of card boxes.  */
/* A radial equalizer rings a pulsing gradient sphere; sound-wave rings */
/* expand outward. This is the entire "mockup" — no floating panels.   */
/* ------------------------------------------------------------------ */

const ORB_BARS = 32
// Deterministic per-bar phase/height so server and client agree — same
// approach as the rest of the file (no Math.random()).
const ORB_BAR_SEEDS = Array.from({ length: ORB_BARS }, (_, i) => ({
  angle: (i / ORB_BARS) * 360,
  h: 0.35 + Math.abs(Math.sin(i * 0.9)) * 0.65,
  delay: (i % 8) * 0.09,
}))

/** Two small badges drifting in a slow circular orbit around the sphere —
    round, not boxy, and counter-rotated so the icon itself stays upright. */
const SATELLITES = [
  { icon: PhoneCall, orbit: 148, duration: 18, startAngle: 40 },
  { icon: ShieldCheck, orbit: 148, duration: 18, startAngle: 220 },
] as const

function VoiceOrbCenterpiece() {
  const reduced = useReducedMotion()
  const calls = useCountUp(142)

  return (
    <div className="relative flex h-[220px] w-[220px] items-center justify-center sm:h-[260px] sm:w-[260px]">
      {/* soft rotating conic halo — extra depth behind the equalizer */}
      <motion.div
        aria-hidden
        className="absolute inset-3 rounded-full opacity-40 blur-[2px]"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, color-mix(in oklch, var(--primary) 55%, transparent), transparent 35%, color-mix(in oklch, var(--ai-magenta) 45%, transparent), transparent 75%)",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* expanding sound-wave rings */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-primary/25"
            initial={{ scale: 0.55, opacity: 0.8 }}
            animate={{ scale: 1.55, opacity: 0 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 1 }}
          />
        ))}

      {/* radial equalizer ring — bars standing on a circle around the orb */}
      <div className="absolute inset-0">
        {ORB_BAR_SEEDS.map((b, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 w-[2.5px] origin-bottom rounded-full bg-gradient-to-t from-primary/20 to-primary"
            style={{
              height: 22,
              transform: `rotate(${b.angle}deg) translateY(-108px)`,
            }}
            animate={reduced ? undefined : { scaleY: [b.h, 0.25, b.h] }}
            transition={{ duration: 1.3 + (i % 5) * 0.15, delay: b.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* orbiting satellite badges — small circles drifting around the ring,
          each counter-rotating so its icon always reads upright */}
      {!reduced &&
        SATELLITES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ rotate: s.startAngle }}
            animate={{ rotate: s.startAngle + 360 }}
            transition={{ duration: s.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <motion.span
              className="glass absolute flex h-8 w-8 items-center justify-center rounded-full text-primary shadow-sm"
              style={{ left: 0, top: -s.orbit / 2 }}
              animate={{ rotate: -(s.startAngle + 360) }}
              transition={{ duration: s.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <s.icon className="h-3.5 w-3.5" />
            </motion.span>
          </motion.div>
        ))}

      {/* the sphere itself — gradient balance drifts slowly for a "living" feel */}
      <motion.div
        className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full shadow-[0_25px_60px_-15px_color-mix(in_oklch,var(--primary)_55%,transparent)]"
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.06, 1],
                backgroundImage: [
                  "radial-gradient(circle at 32% 26%, #fff, var(--primary) 55%, var(--ai-magenta) 100%)",
                  "radial-gradient(circle at 40% 30%, #fff, var(--ai-magenta) 55%, var(--primary) 100%)",
                  "radial-gradient(circle at 32% 26%, #fff, var(--primary) 55%, var(--ai-magenta) 100%)",
                ],
              }
        }
        style={{ backgroundImage: "radial-gradient(circle at 32% 26%, #fff, var(--primary) 55%, var(--ai-magenta) 100%)" }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="absolute inset-[18%] rounded-full bg-white/25 blur-md" />
        <Brain className="relative h-9 w-9 text-white" strokeWidth={1.5} />
      </motion.div>

      {/* live-calls readout, sitting directly under the orb — no card */}
      <div className="absolute -bottom-9 flex flex-col items-center">
        <span className="font-mono text-xl font-normal leading-none tabular-nums text-foreground">{calls}</span>
        <span className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">live calls now</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* single-line caption ticker — replaces the "live transcript" card.    */
/* Just text fading in and out beneath the orb, like subtitles.        */
/* ------------------------------------------------------------------ */

const CAPTIONS = [
  { who: "Customer", text: "I need to reschedule tomorrow." },
  { who: "AI", text: "Sure — I found three available time slots." },
  { who: "Customer", text: "Friday afternoon works best." },
  { who: "AI", text: "Booked for Friday at 2pm. Confirmation sent." },
] as const

function CaptionTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % CAPTIONS.length), 2600)
    return () => clearInterval(id)
  }, [])
  const line = CAPTIONS[i]

  return (
    <div className="relative flex h-14 w-full max-w-[360px] items-center justify-center px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12.5px] leading-snug"
        >
          <span
            className={cn(
              "mr-1.5 font-normal uppercase tracking-[0.1em]",
              line.who === "AI" ? "text-primary" : "text-muted-foreground",
            )}
          >
            {line.who}:
          </span>
          <span className="text-foreground">{line.text}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* inline stat row — one line of numbers, not a row of pill boxes       */
/* ------------------------------------------------------------------ */

function StatRow() {
  const success = useCountUp(96)
  const csat = useCountUp(4.9, 1)
  const stats = [
    { icon: Zap, value: "98ms", label: "latency" },
    { icon: TrendingUp, value: `${success}%`, label: "success" },
    { icon: Globe2, value: "60+", label: "countries" },
    { icon: Gauge, value: csat, label: "CSAT" },
  ]
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {stats.map((s, i) => (
        <span key={s.label} className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[12px]">
            <s.icon className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono font-normal tabular-nums text-foreground">{s.value}</span>
            <span className="text-muted-foreground">{s.label}</span>
          </span>
          {i < stats.length - 1 && <span className="hidden h-3 w-px bg-border sm:block" />}
        </span>
      ))}
    </div>
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
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4])

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
      className="relative mx-auto flex min-h-[420px] w-full max-w-[500px] flex-col items-center justify-center gap-8 py-10"
      style={{ perspective: "1600px" }}
    >
      <StageBackdrop />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-1/2 h-8 w-[220px] -translate-x-1/2 rounded-[50%] bg-primary/25 blur-2xl"
      />

      {/* floating "control center" label */}
      <motion.span
        className="glass relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[9.5px] font-normal uppercase tracking-[0.14em] text-primary"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <LiveDot /> AI Control Center
      </motion.span>

      {/* one scene: orb, then its live caption, then a single stat line —
          no stacked panel boxes, no floating widget pills. Tilt lives on
          this wrapper alone. */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 pb-8"
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <VoiceOrbCenterpiece />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CaptionTicker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatRow />
        </motion.div>
      </motion.div>
    </div>
  )
}
