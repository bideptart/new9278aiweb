"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Globe2,
  PhoneForwarded,
  ShieldCheck,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Cloud,
  Brain,
  CreditCard,
  ArrowLeftRight,
  RefreshCw,
  BadgeCheck,
  Zap,
  ChevronDown,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

// Below lg, hover and the 3s auto-cycle don't make sense (no cursor, no
// desktop mockup panel) — the mobile accordion is tap-only instead.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

/** Counts up from 0 to `target` once the component mounts. */
function useCountUp(target: number, duration = 1300) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

/* ==================================================================
   Shared window chrome — all three mockups sit in the same frame so
   swapping between them reads as tabs of one product, not three
   unrelated illustrations.
   ================================================================== */

function MockShell({
  label,
  status,
  children,
}: {
  label: string
  status: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_78%)]"
        style={{
          backgroundSize: "26px 26px",
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
        }}
      />
      <div className="pointer-events-none absolute -top-14 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-primary/[0.13] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-56 rounded-full bg-primary/[0.07] blur-[70px]" />

      {/* title bar */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 border-b border-black/[0.06] bg-white/70 px-4 py-2.5 backdrop-blur-sm">
        <span className="flex gap-1.5">
          <span className="h-[7px] w-[7px] rounded-full bg-primary/50" />
          <span className="h-[7px] w-[7px] rounded-full bg-black/10" />
          <span className="h-[7px] w-[7px] rounded-full bg-black/10" />
        </span>
        <span className="truncate font-mono text-[10px] tracking-wide text-muted-foreground/75">{label}</span>
        <span className="ml-auto shrink-0">{status}</span>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-4 sm:p-5">{children}</div>
    </div>
  )
}

function LivePill({ children = "Live" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/15">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------
   01 · Bring your own number — the connect handshake
   ------------------------------------------------------------------
   Your carrier on the left, 9278.ai on the right, a live link between
   them, and your existing numbers flipping over to route through us
   one by one. Nothing is transferred, nothing goes dark — which is
   the whole claim, shown rather than stated.
   ------------------------------------------------------------------ */

/** Four-bar traffic meter — signals live audio on a routed number. */
function TrafficBars({ seed = 0, tone = "primary" }: { seed?: number; tone?: "primary" | "muted" }) {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn("voice-bar w-[2px] rounded-full", tone === "primary" ? "bg-primary" : "bg-foreground/40")}
          style={{ height: "12px", animationDelay: `${(i * 130 + seed * 90) % 700}ms` }}
        />
      ))}
    </span>
  )
}

/** Floating glass badge with a slow, staggered drift. */
function DriftBadge({
  icon: Icon,
  title,
  sub,
  className,
  delay = 0,
}: {
  icon: typeof Phone
  title: string
  sub: string
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={cn(
        "absolute z-20 flex w-[172px] items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white/90 px-3 py-2.5 backdrop-blur-md",
        className,
      )}
      style={{ boxShadow: "0 18px 34px -18px rgba(0,0,0,0.28), 0 2px 6px -2px rgba(0,0,0,0.05)" }}
      animate={reduced ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
        <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[10px] font-semibold leading-tight text-foreground">{title}</p>
        <p className="text-[8.5px] leading-tight text-muted-foreground">{sub}</p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   01 · Bring your own number — the phone, restored
   ------------------------------------------------------------------
   The panel-style rebuild tested worse than this, so the phone is back.
   Fixed from the original: badge copy no longer truncates (wider cards,
   shorter strings), badges drift instead of sitting dead still, the
   connector lines flow, and the screen carries a live call timer and
   waveform so something is always moving.
   ------------------------------------------------------------------ */

function CarrierPhoneMockup() {
  const reduced = useReducedMotion()
  const [secs, setSecs] = useState(23)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setSecs((s) => (s + 1) % 3600), 1000)
    return () => clearInterval(id)
  }, [reduced])

  const mm = String(Math.floor(secs / 60)).padStart(2, "0")
  const ss = String(secs % 60).padStart(2, "0")

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-white"
      style={{ boxShadow: "0 24px 60px -28px rgba(0,0,0,0.18), 0 8px 24px -12px rgba(220,38,38,0.10)" }}
    >
      {/* faint grid + layered ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
        style={{
          backgroundSize: "28px 28px",
          backgroundImage:
            "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.15] blur-[75px]"
        animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute -left-8 -top-10 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 rounded-full bg-primary/[0.06] blur-[60px]" />

      {/* connector lines tying the badges to the phone — dashes flow inward */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          { x1: "22%", y1: "16%", x2: "40%", y2: "27%" },
          { x1: "78%", y1: "38%", x2: "61%", y2: "41%" },
          { x1: "22%", y1: "63%", x2: "40%", y2: "59%" },
          { x1: "78%", y1: "83%", x2: "61%", y2: "73%" },
        ].map((l, i) => (
          <line
            key={i}
            {...l}
            stroke="url(#connGrad)"
            strokeWidth="1"
            strokeDasharray="3 5"
            className={reduced ? undefined : "conn-flow"}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
        <defs>
          <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* iPhone bezel */}
      <div
        className="relative z-10 flex h-[320px] w-[172px] flex-col rounded-[2.25rem] bg-[#111]"
        style={{ boxShadow: "inset 0 0 0 2px #3f3f46, inset 0 0 0 6px #000, 0 34px 64px -14px rgba(0,0,0,0.32)" }}
      >
        <div className="relative m-[6px] flex-1 overflow-hidden rounded-[1.9rem] bg-white text-foreground">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_22%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_60%)]"
          />

          {/* dynamic island */}
          <div className="absolute left-1/2 top-[7px] z-20 flex h-[17px] w-[68px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2">
            <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
          </div>

          <div className="relative flex h-full flex-col px-3.5 pb-4 pt-8">
            {/* status row */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
                SIP trunk
              </span>
              <span className="inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-wider text-primary">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-primary" />
                </span>
                Connected
              </span>
            </div>

            {/* glowing carrier ring */}
            <div className="relative mx-auto mt-5 flex h-[72px] w-[72px] items-center justify-center">
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/40"
                  initial={{ scale: 0.65, opacity: 0 }}
                  animate={reduced ? undefined : { scale: [0.65, 1.35], opacity: [0.7, 0] }}
                  transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 1.3 }}
                />
              ))}
              <motion.span
                className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full ring-2 ring-white"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 60%, white), var(--primary))",
                  boxShadow: "0 8px 20px -4px color-mix(in oklch, var(--primary) 60%, transparent)",
                }}
                animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Phone className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden="true" />
              </motion.span>
            </div>

            <p className="mt-3.5 text-center font-mono text-[11px] font-semibold tracking-tight text-foreground">
              +1 (415) 555-0182
            </p>
            <p className="mt-0.5 text-center text-[8px] text-muted-foreground">
              Your number · your carrier · {mm}:{ss}
            </p>

            {/* live waveform */}
            <div className="mt-3 flex h-6 items-center justify-center gap-[2px]">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className={cn("w-[2px] rounded-full bg-primary", !reduced && "voice-bar")}
                  style={{ height: "100%", animationDelay: `${(i * 90) % 800}ms`, opacity: 0.35 + (i / 22) * 0.6 }}
                />
              ))}
            </div>

            {/* mini widgets */}
            <div className="mt-auto space-y-1.5">
              {[
                { label: "Inbound routing", tone: "primary" as const },
                { label: "Outbound campaigns", tone: "muted" as const },
              ].map((w) => (
                <div
                  key={w.label}
                  className="flex items-center gap-2 rounded-lg bg-black/[0.03] px-2 py-1.5 ring-1 ring-black/[0.05]"
                >
                  <span className="text-[8.5px] font-medium text-foreground/70">{w.label}</span>
                  <span className="ml-auto">
                    <TrafficBars tone={w.tone} seed={w.tone === "primary" ? 1 : 3} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating glass badges — zig-zag, alternating sides */}
      <DriftBadge
        icon={RefreshCw}
        title="No porting"
        sub="Numbers stay live"
        className="left-3 top-[11%] sm:left-5"
        delay={0}
      />
      <DriftBadge
        icon={Globe2}
        title="Global coverage"
        sub="60+ countries"
        className="right-3 top-[33%] sm:right-5"
        delay={1.3}
      />
      <DriftBadge
        icon={Zap}
        title="Instant activation"
        sub="Live in minutes"
        className="bottom-[31%] left-3 sm:left-5"
        delay={2.6}
      />
      <DriftBadge
        icon={BadgeCheck}
        title="Carrier verified"
        sub="Billing unchanged"
        className="bottom-[9%] right-3 sm:right-5"
        delay={3.9}
      />
    </div>
  )
}

/* ------------------------------------------------------------------
   02 · Inbound and outbound — two lanes, one agent
   ------------------------------------------------------------------
   Calls arrive from both directions and converge on a single agent
   node in the middle. Live counters on each lane, call rows dropping
   in as they connect, and a stacked bar of the day's mix underneath.
   ------------------------------------------------------------------ */

const IN_CALLS = ["+1 (415) 555-0182", "+1 (206) 555-0119", "+1 (312) 555-0144", "+44 20 7946 0812"]
const OUT_CALLS = ["Renewal campaign", "Missed-call follow-up", "Appointment reminder", "Win-back list"]

function CallLane({
  side,
  rows,
  index,
  count,
}: {
  side: "in" | "out"
  rows: string[]
  index: number
  count: number
}) {
  const inbound = side === "in"
  const Icon = inbound ? PhoneIncoming : PhoneOutgoing
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-1.5">
        <Icon
          className={cn("h-3 w-3 shrink-0", inbound ? "text-primary" : "text-foreground/45")}
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground/75">
          {inbound ? "Inbound" : "Outbound"}
        </span>
      </div>
      <p
        className={cn(
          "mt-1 font-mono text-xl font-bold leading-none tabular-nums",
          inbound ? "text-primary" : "text-foreground/70",
        )}
      >
        {count.toLocaleString()}
      </p>
      <div className="mt-2 flex flex-col gap-1">
        {rows.map((r, i) => {
          const live = i === index
          return (
            <motion.div
              key={r}
              animate={{
                opacity: live ? 1 : 0.42,
                scale: live ? 1 : 0.985,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2 py-1.5 ring-1 transition-colors duration-300",
                live
                  ? inbound
                    ? "bg-primary/[0.06] ring-primary/15"
                    : "bg-black/[0.05] ring-black/[0.08]"
                  : "bg-black/[0.025] ring-black/[0.04]",
              )}
            >
              <span
                className={cn(
                  "h-1 w-1 shrink-0 rounded-full",
                  live ? (inbound ? "bg-primary" : "bg-foreground/50") : "bg-black/15",
                )}
              />
              <span className="truncate text-[9px] text-foreground/70">{r}</span>
              {live && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-auto shrink-0 font-mono text-[7.5px] uppercase tracking-wide text-primary"
                >
                  live
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function InboundOutboundDashboardMockup() {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)
  const inTotal = useCountUp(1284)
  const outTotal = useCountUp(412)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setTick((t) => t + 1), 1400)
    return () => clearInterval(id)
  }, [reduced])

  const mix = [
    { d: "Mon", i: 0.72, o: 0.28 },
    { d: "Tue", i: 0.64, o: 0.36 },
    { d: "Wed", i: 0.8, o: 0.2 },
    { d: "Thu", i: 0.58, o: 0.42 },
    { d: "Fri", i: 0.75, o: 0.25 },
    { d: "Sat", i: 0.5, o: 0.5 },
    { d: "Sun", i: 0.68, o: 0.32 },
  ]

  return (
    <MockShell label="live-traffic" status={<LivePill />}>
      {/* two lanes converging on one agent */}
      <div className="flex min-h-0 shrink-0 items-start gap-3">
        <CallLane side="in" rows={IN_CALLS} index={tick % IN_CALLS.length} count={Math.round(inTotal)} />

        {/* centre agent node */}
        <div className="flex shrink-0 flex-col items-center gap-1.5 self-center">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={reduced ? undefined : { scale: [0.8, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
            />
            <span
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-white ring-2 ring-white"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 60%, white), var(--primary))",
                boxShadow: "0 8px 20px -6px color-mix(in oklch, var(--primary) 60%, transparent)",
              }}
            >
              <ArrowLeftRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </div>
          <span className="whitespace-nowrap text-center text-[8px] font-semibold leading-tight text-primary">
            One agent
          </span>
          <span className="whitespace-nowrap text-center text-[7.5px] leading-tight text-muted-foreground">
            one number
          </span>
        </div>

        <CallLane side="out" rows={OUT_CALLS} index={(tick + 2) % OUT_CALLS.length} count={Math.round(outTotal)} />
      </div>

      {/* weekly mix — stacked bars */}
      <div className="mt-auto shrink-0 rounded-xl bg-black/[0.03] p-3 ring-1 ring-black/[0.05]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground/75">This week</p>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 text-[8.5px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> In
            </span>
            <span className="inline-flex items-center gap-1 text-[8.5px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-black/25" /> Out
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex h-16 items-end gap-1.5">
          {mix.map((m, idx) => (
            <div key={m.d} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="flex h-full w-full flex-col justify-end overflow-hidden rounded-[3px]">
                <motion.span
                  className="w-full bg-black/20"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${m.o * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * idx, ease: "easeOut" }}
                />
                <motion.span
                  className="w-full bg-primary"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${m.i * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * idx + 0.08, ease: "easeOut" }}
                />
              </div>
              <span className="text-[7.5px] text-muted-foreground/70">{m.d}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2.5 shrink-0 text-center font-mono text-[9px] text-muted-foreground">
        Same dashboard · same agent · both directions
      </p>
    </MockShell>
  )
}

/* ------------------------------------------------------------------
   03 · Carrier-grade voice — the call path
   ------------------------------------------------------------------
   A routed path drawn as an actual signal map: carrier PoPs on the
   left feed arcs into the 9278.ai node, which fans back out into the
   three things the customer keeps. Packets travel the arcs live and
   the "you keep" chips light in sequence.
   ------------------------------------------------------------------ */

const POPS = ["Frankfurt", "New York", "Singapore"]
const KEEPS = [
  { icon: Phone, label: "Your numbers", sub: "stay on your account" },
  { icon: CreditCard, label: "Your billing", sub: "unchanged, direct" },
  { icon: ShieldCheck, label: "Porting rights", sub: "always yours" },
]

// left arcs: PoP i → brain.  right arcs: brain → keep i.
const IN_ARCS = ["M2,14 C22,14 26,50 46,50", "M2,50 L46,50", "M2,86 C22,86 26,50 46,50"]
const OUT_ARCS = ["M54,50 C74,50 78,14 98,14", "M54,50 L98,50", "M54,50 C74,50 78,86 98,86"]

function CarrierGradeVoiceMockup() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % KEEPS.length), 1700)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <MockShell
      label="call-path"
      status={
        <span className="font-mono text-[9px] tracking-wide text-muted-foreground/75">carrier → AI → you</span>
      }
    >
      {/* signal map */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-black/[0.025] ring-1 ring-black/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_65%)]"
        />

        {/* arcs */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {IN_ARCS.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.1"
              opacity="0.28"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {OUT_ARCS.map((d, i) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={active === i ? 2 : 1.1}
              opacity={active === i ? 0.95 : 0.2}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "opacity 0.45s ease, stroke-width 0.45s ease" }}
            />
          ))}
          {!reduced && (
            <>
              {IN_ARCS.map((d, i) => (
                <circle key={`in-${d}`} r="1.6" fill="var(--primary)">
                  <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
                </circle>
              ))}
              <circle key={`out-${active}`} r="1.9" fill="var(--primary)">
                <animateMotion dur="1.5s" repeatCount="indefinite" path={OUT_ARCS[active]} />
              </circle>
            </>
          )}
        </svg>

        {/* PoP nodes */}
        <div className="absolute inset-y-0 left-0 flex w-[26%] flex-col justify-between py-3 pl-2.5">
          {POPS.map((p) => (
            <div key={p} className="flex items-center gap-1.5">
              <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/[0.06]">
                <Cloud className="h-3 w-3 text-muted-foreground" strokeWidth={2.25} aria-hidden="true" />
                <span className="absolute -right-px -top-px h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-white" />
              </span>
              <span className="truncate text-[8px] font-medium leading-tight text-muted-foreground">{p}</span>
            </div>
          ))}
        </div>

        {/* brain node */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
          <div className="relative flex h-14 w-14 items-center justify-center">
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full bg-primary/20"
                animate={reduced ? undefined : { scale: [0.75, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 1.3 }}
              />
            ))}
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full text-white ring-2 ring-white"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--primary) 60%, white), var(--primary))",
                boxShadow: "0 10px 24px -6px color-mix(in oklch, var(--primary) 65%, transparent)",
              }}
            >
              <Brain className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            </span>
          </div>
          <span className="whitespace-nowrap rounded-full bg-white/85 px-2 py-0.5 text-[8px] font-semibold text-primary backdrop-blur-sm">
            9278.ai engine
          </span>
        </div>

        {/* "you keep" chips */}
        <div className="absolute inset-y-0 right-0 flex w-[34%] flex-col justify-between py-2.5 pr-2.5">
          {KEEPS.map((k, i) => {
            const Icon = k.icon
            const on = active === i
            return (
              <motion.div
                key={k.label}
                animate={{ scale: on ? 1.04 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{ transformOrigin: "right center" }}
                className={cn(
                  "flex min-w-0 items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 ring-1 transition-all duration-300",
                  on ? "shadow-md ring-primary/25" : "shadow-sm ring-black/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                    on ? "bg-primary/12" : "bg-black/[0.04]",
                  )}
                >
                  <Icon
                    className={cn("h-3 w-3 transition-colors duration-300", on ? "text-primary" : "text-primary/50")}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[8.5px] font-semibold leading-tight text-foreground/80">{k.label}</p>
                  <p className="truncate text-[7.5px] leading-tight text-muted-foreground">{k.sub}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* split footer */}
      <div className="mt-3 grid shrink-0 grid-cols-3 gap-2">
        {[
          { k: "Carrier", v: "carries the call" },
          { k: "9278.ai", v: "runs the brain", accent: true },
          { k: "You", v: "keep control" },
        ].map((c) => (
          <div
            key={c.k}
            className={cn(
              "rounded-lg px-2 py-2 text-center ring-1",
              c.accent ? "bg-primary/[0.06] ring-primary/15" : "bg-black/[0.03] ring-black/[0.05]",
            )}
          >
            <p className={cn("text-[9px] font-bold tracking-tight", c.accent ? "text-primary" : "text-foreground/70")}>
              {c.k}
            </p>
            <p className="mt-0.5 truncate text-[8px] text-muted-foreground">{c.v}</p>
          </div>
        ))}
      </div>
    </MockShell>
  )
}

const items = [
  {
    icon: PhoneForwarded,
    title: "Bring your own number",
    description:
      "Already have a carrier account? Connect it and your existing numbers route through 9278.ai instantly — no porting, no downtime.",
    // TODO: drop in the generated illustration once image credits are available.
    image: null,
  },
  {
    icon: Globe2,
    title: "Inbound and outbound",
    description:
      "One number, both directions. Trigger outbound campaigns or answer every incoming call automatically — same dashboard, same agent.",
    image: null,
  },
  {
    icon: ShieldCheck,
    title: "Carrier-grade voice",
    description:
      "Your provider's global network carries the call. We handle the brain. You keep the relationship, the billing, and the porting rights.",
    image: null,
  },
]

function MockupFor({ index }: { index: number }) {
  if (index === 1) return <InboundOutboundDashboardMockup />
  if (index === 2) return <CarrierGradeVoiceMockup />
  return <CarrierPhoneMockup />
}

export function Connectivity() {
  const [active, setActive] = useState(0)
  // Mobile-only accordion: nothing expanded until the user taps a row.
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)
  const isDesktop = useIsDesktop()

  // Auto-cycle the mockup every 3s, desktop only. Restarts from whatever is
  // active whenever it changes (hover or auto-advance), so hovering doesn't
  // fight the cycle — it just gives that item a fresh 3s before advancing.
  useEffect(() => {
    if (!isDesktop) return
    const id = setTimeout(() => setActive((a) => (a + 1) % items.length), 3000)
    return () => clearTimeout(id)
  }, [active, isDesktop])

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:px-6 md:pb-10 md:pt-14">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* LEFT: Copy + items */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <span className="ai-pill-violet">
                <Globe2 className="h-3 w-3" />
                Phone numbers
              </span>
              <h2 className="mt-4 text-balance text-3xl font-serif font-normal leading-[1.1] tracking-tight md:text-4xl">
                Your carrier account,{" "}
                <span className="text-primary">supercharged.</span>
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                We don't sell phone numbers. We connect to the carrier you already use — so your numbers, billing, and
                porting stay exactly where they are.
              </p>
            </ScrollReveal>

            <StaggerGroup className="mt-6 flex flex-col gap-2">
              {items.map((item, i) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={item.title}>
                    <motion.div
                      onMouseEnter={() => isDesktop && setActive(i)}
                      onClick={() => {
                        setActive(i)
                        setMobileExpanded((cur) => (cur === i ? null : i))
                      }}
                      className={`group card-glow relative flex items-start gap-4 rounded-2xl p-4 transition-colors ${
                        active === i ? "border-primary/30" : ""
                      }`}
                      animate={
                        isDesktop
                          ? { x: active === i ? 6 : 0, scale: active === i ? 1.03 : 1 }
                          : { x: 0, scale: 1 }
                      }
                      style={{ transformOrigin: "left center" }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors ${
                          active === i
                            ? "bg-primary text-primary-foreground ring-primary/30"
                            : "bg-primary/10 text-primary ring-primary/20"
                        }`}
                      >
                        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold tracking-tight transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.description}</p>
                      </div>
                      <motion.span
                        animate={{ rotate: mobileExpanded === i ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-0.5 shrink-0 text-muted-foreground lg:hidden"
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    </motion.div>

                    {/* Mobile-only accordion — the matching mockup drops down right under the tapped row */}
                    <AnimatePresence initial={false}>
                      {mobileExpanded === i && (
                        <motion.div
                          key="mobile-mockup"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div
                            className="ring-gradient card-glow relative mt-3 overflow-hidden rounded-3xl"
                            style={{ height: 430 }}
                          >
                            <MockupFor index={i} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>

          {/* RIGHT: swaps with whichever item is hovered — desktop/tablet only; mobile uses the inline accordion above */}
          <ScrollReveal className="hidden lg:col-span-6 lg:block">
            <div className="ring-gradient card-glow relative min-h-[460px] overflow-hidden rounded-3xl sm:aspect-[4/3] sm:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {items[active].image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={items[active].image}
                      alt={items[active].title}
                      className="h-full w-full object-cover"
                    />
                  ) : active === 1 ? (
                    <InboundOutboundDashboardMockup />
                  ) : active === 2 ? (
                    <CarrierGradeVoiceMockup />
                  ) : (
                    <CarrierPhoneMockup />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
