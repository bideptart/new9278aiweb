"use client"

/**
 * Hero showcase — a glass "device" that cycles through five product states
 * every 5.5s: incoming call → live transcript → summary → analytics → agent
 * builder. Each state remounts on entry so its internal animation replays.
 *
 * The frame tilts toward the cursor via spring-damped motion values, and a
 * ring of status chips floats at different depths for parallax. All motion is
 * transform/opacity, and everything degrades to a static frame under
 * `prefers-reduced-motion`.
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
  type MotionValue,
} from "motion/react"
import {
  Activity,
  BookOpen,
  Brain,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Gauge,
  Globe2,
  Languages,
  PhoneCall,
  PhoneIncoming,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Waves,
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

/**
 * The agent's voice orb — a soft gradient sphere with two expanding rings.
 * It sits in the persistent header so every slide still reads as "voice",
 * not just another SaaS dashboard.
 */
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
/* 1 — incoming call                                                    */
/* ------------------------------------------------------------------ */

function IncomingCall() {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const t = `0:${String(secs).padStart(2, "0")}`

  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
          <PhoneIncoming className="h-3 w-3" /> Incoming
        </span>
        <StatusDot label="AI answered" />
      </motion.div>

      <motion.div
        {...row(1)}
        className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/60 px-3 py-2.5 backdrop-blur-sm"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
          SM
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12.5px] font-semibold leading-tight text-foreground">Sarah Mitchell</span>
          <span className="block truncate text-[10.5px] text-muted-foreground">+1 (415) 555‑0148 · San Francisco</span>
        </span>
        <span className="ml-auto font-mono text-lg tabular-nums leading-none tracking-tight text-foreground">{t}</span>
      </motion.div>

      {/* the waveform is the point of this slide — give it real estate */}
      <motion.div {...row(2)} className="relative h-16">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/60" />
        <Equalizer bars={38} className="relative" />
      </motion.div>

      <motion.div {...row(3)} className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Waves className="h-3 w-3 text-primary" /> Voice: Ava · Warm, neutral accent
        </span>
        <span className="font-mono tabular-nums">Sub-300ms</span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2 — live conversation                                                */
/* ------------------------------------------------------------------ */

const TRANSCRIPT = [
  { who: "caller", text: "Hi — I need to reschedule Thursday's install." },
  { who: "agent", text: "No problem. I have Friday 10am or Monday 2pm open." },
  { who: "caller", text: "Friday works better for me." },
  { who: "agent", text: "Booked for Friday at 10am. Confirmation is on its way." },
] as const

function LiveConversation() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setShown((n) => (n < TRANSCRIPT.length ? n + 1 : n)), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full flex-col">
      <motion.div {...row(0)} className="flex items-center justify-between pb-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Live transcript
        </span>
        <StatusDot label="Streaming" />
      </motion.div>

      <div className="flex-1 space-y-2 overflow-hidden">
        <AnimatePresence initial={false}>
          {TRANSCRIPT.slice(0, shown).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${line.who === "agent" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${
                  line.who === "agent"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border border-border/60 bg-card/70 text-foreground"
                }`}
              >
                {line.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {shown < TRANSCRIPT.length && (
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1 rounded-2xl rounded-br-sm bg-primary/15 px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="dot-float h-1.5 w-1.5 rounded-full bg-primary"
                  style={{ animationDelay: `${d * 0.18}s` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <motion.div {...row(3)} className="mt-3 flex items-center gap-3 border-t border-border/50 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Brain className="h-3 w-3 text-primary" /> Intent: reschedule
        </span>
        <div className="h-5 flex-1">
          <Equalizer bars={20} />
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3 — call summary                                                     */
/* ------------------------------------------------------------------ */

const SUMMARY = [
  "Customer requested to move Thursday install",
  "Rebooked for Friday 10:00 AM",
  "Confirmation SMS + email sent",
]

function CallSummary() {
  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Call summary
        </span>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">1:47 · resolved</span>
      </motion.div>

      <ul className="space-y-2">
        {SUMMARY.map((s, i) => (
          <motion.li key={s} {...row(i + 1)} className="flex items-start gap-2 text-[11.5px] leading-snug text-foreground">
            <CheckCircle2 className="mt-[1px] h-3.5 w-3.5 shrink-0 text-primary" />
            {s}
          </motion.li>
        ))}
      </ul>

      <motion.div {...row(4)} className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Sentiment</span>
          <span className="font-medium text-emerald-500">Positive · 92%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.92 }}
            style={{ originX: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      <motion.div {...row(5)} className="grid grid-cols-2 gap-2">
        {[
          { icon: Database, label: "CRM synced" },
          { icon: CalendarCheck, label: "Slot booked" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1.5 text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400"
          >
            <Icon className="h-3 w-3" /> {label}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4 — analytics                                                        */
/* ------------------------------------------------------------------ */

const BARS = [42, 58, 47, 71, 63, 88, 76, 94, 82, 69, 91, 78]

function AnalyticsTile({ icon: Icon, label, value, suffix = "" }: { icon: typeof Gauge; label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 px-2.5 py-2">
      <Icon className="mb-1.5 h-3.5 w-3.5 text-primary" />
      <p className="font-mono text-base font-semibold tabular-nums leading-none text-foreground">
        {value}
        <span className="text-xs text-muted-foreground">{suffix}</span>
      </p>
      <p className="mt-1 text-[9.5px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  )
}

function AnalyticsDashboard() {
  const calls = useCountUp(1284)
  const rate = useCountUp(96.4, 1)
  const dur = useCountUp(112)
  const rev = useCountUp(48)

  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" /> Today
        </span>
        <StatusDot label="Live" />
      </motion.div>

      <motion.div {...row(1)} className="grid grid-cols-4 gap-1.5">
        <AnalyticsTile icon={PhoneCall} label="Calls" value={calls} />
        <AnalyticsTile icon={TrendingUp} label="Resolved" value={rate} suffix="%" />
        <AnalyticsTile icon={Clock} label="Avg" value={dur} suffix="s" />
        <AnalyticsTile icon={Gauge} label="Saved" value={`$${rev}`} suffix="k" />
      </motion.div>

      <motion.div {...row(2)} className="flex h-24 items-end gap-[5px]">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/25 to-primary"
            style={{ height: `${h}%`, originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.55, delay: 0.3 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </motion.div>

      <motion.div {...row(3)} className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>00:00</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-500">
          <TrendingUp className="h-3 w-3" /> +18% vs yesterday
        </span>
        <span>23:59</span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 5 — agent builder                                                    */
/* ------------------------------------------------------------------ */

const NODES = [
  { icon: PhoneIncoming, label: "Trigger", sub: "Inbound call" },
  { icon: BookOpen, label: "Knowledge", sub: "412 documents" },
  { icon: Cpu, label: "Reasoning", sub: "Prompt + tools" },
]

function AgentBuilder() {
  return (
    <div className="flex h-full flex-col justify-between">
      <motion.div {...row(0)} className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Agent builder
        </span>
        <span className="rounded-full border border-border/60 px-2 py-0.5 text-[9.5px] uppercase tracking-wider text-muted-foreground">
          Draft v3
        </span>
      </motion.div>

      <div className="relative space-y-2">
        {/* connector rail */}
        <span className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent" />
        {NODES.map((n, i) => (
          <motion.div
            key={n.label}
            {...row(i + 1)}
            className="relative flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 px-2.5 py-2 backdrop-blur-sm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <n.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <p className="text-[11.5px] font-semibold leading-tight text-foreground">{n.label}</p>
              <p className="truncate text-[10px] text-muted-foreground">{n.sub}</p>
            </span>
            <motion.span
              className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, delay: i * 0.3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        {...row(4)}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="group relative w-full overflow-hidden rounded-xl btn-ai px-3 py-2.5 text-[11.5px] font-semibold"
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
  { id: "call", title: "Incoming call", Component: IncomingCall },
  { id: "transcript", title: "Live conversation", Component: LiveConversation },
  { id: "summary", title: "Call summary", Component: CallSummary },
  { id: "analytics", title: "Analytics", Component: AnalyticsDashboard },
  { id: "builder", title: "Agent builder", Component: AgentBuilder },
]

/* ------------------------------------------------------------------ */
/* floating status chips                                                */
/* ------------------------------------------------------------------ */

// This wrapper (`relative mx-auto w-full max-w-[440px] lg:max-w-[480px]`) sits
// inside a wider grid column, so there's slack outside the card itself for
// these to float in — offsets below are sized to clear the card almost
// entirely (only a sliver behind it) using that slack, without reaching far
// enough to hit the copy in the neighboring column.
const CHIPS = [
  { icon: Gauge, label: "Sub-300ms response", pos: "-left-10 top-[14%]", depth: 1.5, delay: 0 },
  { icon: ShieldCheck, label: "Carrier-grade uptime", pos: "-right-12 top-[6%]", depth: 2.2, delay: 0.6 },
  { icon: Languages, label: "Multilingual", pos: "-right-14 top-[46%]", depth: 1.1, delay: 1.2 },
  { icon: Globe2, label: "60+ countries", pos: "-left-14 top-[62%]", depth: 2.6, delay: 0.3 },
  { icon: CalendarCheck, label: "Calendar booking", pos: "-right-10 bottom-[8%]", depth: 1.8, delay: 0.9 },
  { icon: Database, label: "CRM connected", pos: "-left-10 bottom-[4%]", depth: 1.3, delay: 1.5 },
]

function FloatingChip({
  chip,
  px,
  py,
  reduced,
}: {
  chip: (typeof CHIPS)[number]
  px: MotionValue<number>
  py: MotionValue<number>
  reduced: boolean
}) {
  const x = useTransform(px, (v) => v * chip.depth * -14)
  const y = useTransform(py, (v) => v * chip.depth * -14)
  const Icon = chip.icon

  return (
    <motion.div
      className={`pointer-events-none absolute z-20 hidden xl:block ${chip.pos}`}
      style={reduced ? undefined : { x, y }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 + chip.delay * 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="glass ring-gradient inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[10.5px] font-medium text-foreground shadow-sm"
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 4 + chip.depth, delay: chip.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Icon className="h-3 w-3 text-primary" />
        {chip.label}
      </motion.span>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* showcase                                                             */
/* ------------------------------------------------------------------ */

export function HeroShowcase() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  // -1..1 pointer position, spring-damped, shared by the tilt and the chips.
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
      {/* halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-primary/20 blur-[90px]"
      />

      {CHIPS.map((chip) => (
        <FloatingChip key={chip.label} chip={chip} px={px} py={py} reduced={!!reduced} />
      ))}

      <motion.div
        className="glass ring-gradient relative z-10 overflow-hidden rounded-[26px] p-1.5 [transform-style:preserve-3d] [will-change:transform]"
        style={reduced ? undefined : { rotateX, rotateY }}
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="scan-line" />

        <div className="relative rounded-[20px] border border-border/40 bg-card/70 backdrop-blur-xl">
          {/* persistent agent bar — the voice identity that carries every slide */}
          <div className="flex items-center gap-2.5 border-b border-border/40 px-3.5 py-2.5">
            <VoiceOrb />
            <span className="min-w-0">
              <span className="block truncate text-[11.5px] font-semibold leading-tight text-foreground">
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
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
                <Sparkles className="h-2.5 w-2.5" /> Live
              </span>
            </span>
          </div>

          {/* stage — fixed height so slide swaps never shift layout.
              `overflow-hidden` is load-bearing: without it, a slide whose
              content runs slightly tall (e.g. CallSummary's CRM/slot pills)
              bleeds past this box and gets half-buried under the progress
              rail below instead of just being clipped cleanly. */}
          <div className="relative h-[320px] overflow-hidden px-4 py-3.5 sm:h-[340px]">
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
          <div className="flex items-center gap-1.5 border-t border-border/40 px-3.5 py-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.title}`}
                aria-current={i === index}
                className="group h-4 flex-1 cursor-pointer"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-border/70 transition-colors group-hover:bg-border">
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
