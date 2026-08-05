"use client"

/**
 * Hero showcase — a premium "AI call console" that cycles through five
 * product states every 5.5s: call connect → live conversation → outcome →
 * analytics → agent builder. Each state remounts on entry so its internal
 * animation replays.
 *
 * The frame tilts toward the cursor via spring-damped motion values and sits
 * on a stacked-deck of ghost cards for depth. All motion is transform/opacity
 * and everything degrades to a static frame under `prefers-reduced-motion`.
 */

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import {
  Activity,
  BookOpen,
  Brain,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Gauge,
  PhoneCall,
  PhoneIncoming,
  Rocket,
  Sparkles,
  TrendingUp,
  Waves,
  Zap,
} from "lucide-react"

const SLIDE_MS = 5500

/* ------------------------------------------------------------------ */
/* shared primitives                                                    */
/* ------------------------------------------------------------------ */

/** Live equalizer built on the existing `.voice-bar` keyframes. */
function Equalizer({ bars = 28, className = "" }: { bars?: number; className?: string }) {
  const seeds = useMemo(
    () => Array.from({ length: bars }, (_, i) => ({ d: (i % 7) * 0.11, s: 0.35 + ((i * 37) % 60) / 100 })),
    [bars]
  )
  return (
    <div className={`flex h-full w-full items-center justify-between gap-[3px] ${className}`}>
      {seeds.map((b, i) => (
        <span
          key={i}
          className="voice-bar w-full min-w-[2px] rounded-full bg-gradient-to-t from-primary/40 to-primary"
          style={{ height: `${b.s * 100}%`, animationDelay: `${b.d}s` }}
        />
      ))}
    </div>
  )
}

/** The agent's voice orb — a soft gradient sphere with two expanding rings. */
function VoiceOrb({ size = 30 }: { size?: number }) {
  const reduced = useReducedMotion()
  return (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      {!reduced &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-primary/40"
            animate={{ scale: [1, 1.85], opacity: [0.55, 0] }}
            transition={{ duration: 2.4, delay: i * 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
          />
        ))}
      <motion.span
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-[var(--ai-magenta)]"
        animate={reduced ? undefined : { scale: [1, 1.07, 1] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <span className="absolute inset-[22%] rounded-full bg-white/25 blur-[3px]" />
    </span>
  )
}

function StatusDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-500">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      {label}
    </span>
  )
}

function useCountUp(to: number, decimals = 0) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => setV(n),
    })
    return () => controls.stop()
  }, [to])
  return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()
}

/** Slide-in wrapper so every row inside a mockup staggers consistently. */
const row = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
})

/* ------------------------------------------------------------------ */
/* 1 — call connect: the pickup moment, staged around the caller        */
/* ------------------------------------------------------------------ */

function CallConnect() {
  const reduced = useReducedMotion()
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const t = `0:${String(secs).padStart(2, "0")}`

  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-normal uppercase tracking-[0.16em] text-white shadow-[0_4px_14px_-4px_var(--primary)]">
          <PhoneIncoming className="h-3 w-3" /> Incoming
        </span>
        <span className="rounded-full bg-black/[0.04] px-2.5 py-1 font-mono text-[11px] tabular-nums text-foreground">
          {t}
        </span>
      </motion.div>

      {/* the caller, centre stage */}
      <motion.div {...row(1)} className="flex flex-col items-center">
        <span className="relative flex h-[76px] w-[76px] items-center justify-center">
          {/* rotating dashed orbit */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          {/* expanding pings */}
          {!reduced &&
            [0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute inset-1.5 rounded-full border border-primary/40"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, delay: i * 1, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
              />
            ))}
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[var(--ai-magenta)] text-[15px] font-normal text-white shadow-[0_10px_24px_-8px_var(--primary)]">
            SM
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
            <PhoneCall className="h-2.5 w-2.5 text-white" />
          </span>
        </span>
        <p className="mt-2.5 text-[13.5px] font-normal leading-tight text-foreground">Sarah Mitchell</p>
        <p className="mt-0.5 text-[10.5px] text-muted-foreground">+1 (415) 555-0148 · San Francisco</p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-normal text-emerald-600">
          <Sparkles className="h-3 w-3" /> AI answered on first ring
        </span>
      </motion.div>

      {/* pickup stats */}
      <motion.div {...row(2)} className="grid grid-cols-3 gap-1.5">
        {[
          { icon: Zap, label: "Pickup", value: "0.8s" },
          { icon: Gauge, label: "Latency", value: "98ms" },
          { icon: Waves, label: "Voice", value: "Ava" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-black/[0.06] bg-white px-2 py-1.5 text-center shadow-sm">
            <p className="inline-flex items-center gap-1 font-mono text-[12px] font-normal text-foreground">
              <s.icon className="h-3 w-3 text-primary" /> {s.value}
            </p>
            <p className="text-[8.5px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — live conversation: bubbles + the agent actually using a tool     */
/* ------------------------------------------------------------------ */

function LiveConversation() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((n) => Math.min(n + 1, 4)), 850)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full flex-col">
      <motion.div {...row(0)} className="flex items-center justify-between pb-2.5">
        <span className="inline-flex items-center gap-2 text-xs font-normal text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Live conversation
        </span>
        <StatusDot label="Streaming" />
      </motion.div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {step >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start"
          >
            <p className="max-w-[82%] rounded-2xl rounded-bl-sm border border-black/[0.06] bg-white px-3 py-2 text-[11.5px] leading-snug text-foreground shadow-sm">
              Hi — can I move Thursday&apos;s install to Friday morning?
            </p>
          </motion.div>
        )}

        {/* the agent working: a visible tool call */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex justify-end"
          >
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 py-1.5 font-mono text-[9.5px] text-primary">
              <Brain className="h-3 w-3" />
              calendar.check(&quot;Friday&quot;)
              {step === 1 && (
                <motion.span
                  className="inline-block h-3 w-[5px] bg-primary/70"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
              {step >= 2 && <span className="text-emerald-600">→ 2 slots free</span>}
            </span>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="flex justify-end"
          >
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary)_75%,var(--ai-magenta))] px-3 py-2 text-[11.5px] leading-snug text-white shadow-[0_8px_20px_-10px_var(--primary)]">
              Friday works! I have these open:
              <span className="mt-1.5 flex gap-1.5">
                {["10:00 AM", "2:30 PM"].map((slot, i) => (
                  <span
                    key={slot}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-normal transition-colors duration-300 ${
                      step >= 4 && i === 0 ? "bg-white text-primary" : "bg-white/20 text-white"
                    }`}
                  >
                    {step >= 4 && i === 0 && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
                    {slot}
                  </span>
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div {...row(3)} className="mt-2.5 flex items-center gap-3 border-t border-black/[0.06] pt-2.5">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
          <Brain className="h-3 w-3" /> Intent: reschedule
        </span>
        <div className="h-5 flex-1">
          <Equalizer bars={20} />
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — outcome: sentiment ring + everything the agent handled           */
/* ------------------------------------------------------------------ */

const OUTCOME_ITEMS = [
  { icon: CalendarCheck, text: "Rebooked · Friday 10:00 AM" },
  { icon: Database, text: "CRM record updated" },
  { icon: CheckCircle2, text: "Confirmation SMS + email sent" },
]

function CallOutcome() {
  const sentiment = useCountUp(92)
  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-normal text-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          </span>
          Call resolved
        </span>
        <span className="rounded-full bg-black/[0.04] px-2.5 py-1 font-mono text-[10px] tabular-nums text-muted-foreground">
          1:47 · no human needed
        </span>
      </motion.div>

      {/* ring + checklist */}
      <motion.div {...row(1)} className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-sm">
        <span className="relative flex h-[84px] w-[84px] shrink-0 items-center justify-center">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r="33" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="6" />
            <defs>
              <linearGradient id="hs-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="40"
              cy="40"
              r="33"
              fill="none"
              stroke="url(#hs-ring)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.92 }}
              transition={{ duration: 1.3, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-lg font-normal leading-none text-foreground">{sentiment}%</span>
            <span className="mt-0.5 text-[7.5px] uppercase tracking-wider text-muted-foreground">positive</span>
          </span>
        </span>

        <ul className="min-w-0 flex-1 space-y-1.5">
          {OUTCOME_ITEMS.map((s, i) => (
            <motion.li
              key={s.text}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-[10.5px] leading-snug text-foreground"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <s.icon className="h-2.5 w-2.5" />
              </span>
              <span className="truncate">{s.text}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...row(3)} className="flex gap-2">
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1.5 text-[10.5px] font-medium text-emerald-600">
          <Check className="h-3 w-3" strokeWidth={3} /> Slot booked
        </span>
        <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1.5 text-[10.5px] font-medium text-emerald-600">
          <Database className="h-3 w-3" /> CRM synced
        </span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — analytics: KPI strip + animated area chart                       */
/* ------------------------------------------------------------------ */

const CHART_LINE =
  "M0,58 L30,48 L60,52 L90,36 L120,42 L150,24 L180,30 L210,14 L240,22 L270,10 L300,16"
const CHART_AREA = `${CHART_LINE} L300,80 L0,80 Z`

function AnalyticsDashboard() {
  const calls = useCountUp(1284)
  const rate = useCountUp(96.4, 1)
  const dur = useCountUp(112)
  const rev = useCountUp(48)

  const kpis = [
    { icon: PhoneCall, label: "Calls", value: calls },
    { icon: TrendingUp, label: "Resolved", value: `${rate}%` },
    { icon: Clock, label: "Avg", value: `${dur}s` },
    { icon: Gauge, label: "Saved", value: `$${rev}k` },
  ]

  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-normal text-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" /> Today
        </span>
        <StatusDot label="Live" />
      </motion.div>

      {/* one KPI strip instead of four boxes */}
      <motion.div
        {...row(1)}
        className="grid grid-cols-4 divide-x divide-black/[0.06] rounded-2xl border border-black/[0.06] bg-white shadow-sm"
      >
        {kpis.map((k) => (
          <div key={k.label} className="px-2 py-2 text-center">
            <k.icon className="mx-auto mb-1 h-3 w-3 text-primary" />
            <p className="font-mono text-[13px] font-normal tabular-nums leading-none text-foreground sm:text-sm">
              {k.value}
            </p>
            <p className="mt-0.5 text-[8.5px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
          </div>
        ))}
      </motion.div>

      {/* area chart */}
      <motion.div {...row(2)} className="relative rounded-2xl border border-black/[0.06] bg-white p-3 shadow-sm">
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-normal text-emerald-600">
          <TrendingUp className="h-2.5 w-2.5" /> +18%
        </span>
        <svg viewBox="0 0 300 80" className="h-[92px] w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hs-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
          ))}
          <motion.path
            d={CHART_AREA}
            fill="url(#hs-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
          <motion.path
            d={CHART_LINE}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.circle
            cx="300"
            cy="16"
            r="4"
            fill="var(--primary)"
            stroke="white"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [1, 1.35, 1] }}
            transition={{ delay: 1.6, duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
        <div className="mt-1 flex items-center justify-between text-[9px] text-muted-foreground">
          <span>00:00</span>
          <span>12:00</span>
          <span>23:59</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — agent builder: a mini flow canvas + passing test call            */
/* ------------------------------------------------------------------ */

const FLOW_NODES = [
  { icon: PhoneIncoming, label: "Trigger", sub: "Inbound" },
  { icon: BookOpen, label: "Knowledge", sub: "412 docs" },
  { icon: Cpu, label: "Reasoning", sub: "Tools" },
]

function AgentBuilder() {
  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-normal text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Agent builder
        </span>
        <span className="rounded-full border border-black/[0.08] bg-white px-2 py-0.5 text-[9.5px] uppercase tracking-wider text-muted-foreground shadow-sm">
          Draft v3
        </span>
      </motion.div>

      {/* flow canvas */}
      <motion.div
        {...row(1)}
        className="relative rounded-2xl border border-black/[0.06] bg-white px-3 py-4 shadow-sm"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-50" />
        <div className="relative flex items-start">
          {FLOW_NODES.map((n, i) => (
            <div key={n.label} className="flex flex-1 items-start">
              <div className="flex w-14 flex-col items-center text-center">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.07] text-primary shadow-sm">
                  <n.icon className="h-4.5 w-4.5" />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl border border-primary/40"
                    animate={{ opacity: [0, 0.9, 0], scale: [1, 1.18, 1.28] }}
                    transition={{ duration: 2.2, delay: i * 0.55, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                  />
                </span>
                <p className="mt-1.5 text-[10px] font-normal leading-tight text-foreground">{n.label}</p>
                <p className="text-[8.5px] text-muted-foreground">{n.sub}</p>
              </div>
              {i < FLOW_NODES.length - 1 && (
                <div className="relative mt-[22px] h-px flex-1 border-t border-dashed border-primary/35">
                  <motion.span
                    aria-hidden
                    className="absolute -top-[2.5px] left-0 h-1 w-1 rounded-full bg-primary"
                    animate={{ left: ["2%", "92%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, delay: i * 0.55 + 0.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* test result */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] px-3 py-2"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3 w-3" strokeWidth={3.5} />
        </span>
        <span className="text-[11px] font-medium text-emerald-700">Test call passed</span>
        <span className="ml-auto font-mono text-[10px] tabular-nums text-emerald-600">0:42</span>
      </motion.div>

      <motion.button
        {...row(4)}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="group relative w-full overflow-hidden rounded-xl btn-ai px-3 py-2.5 text-[11.5px] font-normal"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-1.5">
          <Rocket className="h-3.5 w-3.5" /> Deploy agent
        </span>
        <motion.span
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          animate={{ x: ["-120%", "420%"] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatDelay: 0.8 }}
        />
      </motion.button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* slide registry                                                       */
/* ------------------------------------------------------------------ */

type Slide = { id: string; title: string; Component: ComponentType }

const SLIDES: Slide[] = [
  { id: "call", title: "Incoming call", Component: CallConnect },
  { id: "transcript", title: "Live conversation", Component: LiveConversation },
  { id: "summary", title: "Call outcome", Component: CallOutcome },
  { id: "analytics", title: "Analytics", Component: AnalyticsDashboard },
  { id: "builder", title: "Agent builder", Component: AgentBuilder },
]

/* ------------------------------------------------------------------ */
/* showcase                                                             */
/* ------------------------------------------------------------------ */

export function HeroShowcase() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  // -1..1 pointer position, spring-damped, drives the tilt.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 140, damping: 22, mass: 0.6 })
  const py = useSpring(rawY, { stiffness: 140, damping: 22, mass: 0.6 })
  const rotateY = useTransform(px, [-1, 1], [-7, 7])
  const rotateX = useTransform(py, [-1, 1], [5, -5])

  // `index` is a dep so clicking a dot restarts the dwell timer, keeping the
  // progress bar and the auto-advance in lockstep.
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearTimeout(id)
  }, [index])

  useEffect(() => {
    if (reduced) return
    const el = wrapRef.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      rawX.set(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)))
      rawY.set(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)))
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [reduced, rawX, rawY])

  const Active = SLIDES[index].Component

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[440px] lg:max-w-[480px]"
      style={{ perspective: 1400 }}
    >
      {/* organic color blobs instead of stacked rectangle "ghost cards" —
          soft, edgeless depth rather than more boxes behind the box */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-primary/[0.18] blur-[70px]"
        animate={reduced ? undefined : { scale: [1, 1.12, 1], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-0 h-[55%] w-[55%] rounded-full bg-[var(--ai-magenta)]/[0.16] blur-[70px]"
        animate={reduced ? undefined : { scale: [1, 1.15, 1], y: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/3 h-[40%] w-[40%] rounded-full bg-primary/[0.12] blur-[60px]"
        animate={reduced ? undefined : { scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />

      {/* the console itself — a single clean surface (no stacked bezel/frame
          boxes), edges softened with a hairline gradient ring instead of a
          thick device bezel, so it reads as one floating panel rather than
          "a box inside a box." */}
      <motion.div
        className="ring-gradient relative z-10 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-35px_color-mix(in_oklch,var(--primary)_40%,transparent)] [transform-style:preserve-3d] [will-change:transform]"
        style={reduced ? undefined : { rotateX, rotateY }}
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="scan-line" />

        <div className="relative overflow-hidden rounded-[28px]">
          {/* persistent agent bar — the voice identity that carries every slide */}
          <div className="flex items-center gap-2.5 border-b border-black/[0.06] bg-white px-3.5 py-2.5">
            <VoiceOrb />
            <span className="min-w-0">
              <span className="block truncate text-[11.5px] font-normal leading-tight text-foreground">
                Ava · Front-desk agent
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={SLIDES[index].id}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  transition={{ duration: 0.22 }}
                  className="block truncate text-[9.5px] leading-tight text-muted-foreground"
                >
                  {SLIDES[index].title}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="ml-auto flex items-center gap-2.5">
              <span className="hidden h-4 w-14 sm:block">
                <Equalizer bars={11} />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-normal uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-2.5 w-2.5" /> Live
              </span>
            </span>
          </div>

          {/* stage — fixed height so slide swaps never shift layout. The soft
              gray canvas makes every white panel inside the slides pop with
              real depth. `overflow-hidden` is load-bearing: without it a
              slightly-tall slide bleeds under the progress rail below. */}
          <div className="relative h-[320px] overflow-hidden bg-[#f7f7f8] sm:h-[340px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_4%,transparent),transparent_70%)]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={SLIDES[index].id}
                initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 px-4 py-3.5"
              >
                <Active />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* progress rail */}
          <div className="flex items-center gap-1.5 border-t border-black/[0.06] bg-white px-3.5 py-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.title}`}
                aria-current={i === index}
                className="group flex h-9 flex-1 cursor-pointer items-center"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-black/[0.08] transition-colors group-hover:bg-black/[0.14]">
                  {i === index && (
                    <motion.span
                      key={s.id}
                      className="block h-full rounded-full bg-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{ originX: 0 }}
                      transition={{ duration: reduced ? 0.3 : SLIDE_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {i < index && <span className="block h-full rounded-full bg-primary/45" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
