"use client"

import { useEffect, useState } from "react"
import { Calendar, CheckCircle2, Lock, PhoneIncoming, Sparkles, Zap, type LucideIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Hero "AI Receptionist" live demo — the centerpiece of
 * /features/ai-receptionist.
 *
 * Deliberately NOT a bordered dashboard card: a glowing orb floats on the
 * open hero canvas with a handful of independent glass chips scattered
 * around it (caller + live duration, status metrics, the current
 * transcript line or action tag, integrations) — a constellation, not a
 * boxed panel. The call loops: connecting → connected → a scripted
 * exchange plays out line by line, with [TAG] chips popping in between →
 * a short pause → resets for the next inbound call.
 *
 * Fully timer-driven (chained setTimeout, not CSS), so it's paused and
 * replaced with one static "settled" frame when the visitor prefers
 * reduced motion.
 */

const BAR_COUNT = 36
const ORB_RADIUS = 52

type Speaker = "Caller" | "Aria"
type FeedEvent =
  | { kind: "message"; speaker: Speaker; text: string }
  | { kind: "tag"; label: string; icon: LucideIcon }

const SCRIPT: FeedEvent[] = [
  { kind: "message", speaker: "Caller", text: "Hi, is this Meridian Dental? I need to reschedule my cleaning." },
  { kind: "tag", label: "INTENT: RESCHEDULE", icon: Sparkles },
  { kind: "message", speaker: "Aria", text: "You've got it — I see Tuesday's appointment. What day works better?" },
  { kind: "message", speaker: "Caller", text: "Do you have anything Thursday afternoon?" },
  { kind: "tag", label: "CALENDAR: CHECKING SLOTS", icon: Calendar },
  { kind: "message", speaker: "Aria", text: "2:15pm Thursday just opened up. Want me to lock that in for you?" },
  { kind: "tag", label: "CRM: MATCHED", icon: CheckCircle2 },
]

const CONNECT_MS = 1400
const TYPING_MS = 750
const MESSAGE_HOLD_MS = 2600
const TAG_HOLD_MS = 1500
const CYCLE_GAP_MS = 1600

const METRICS: { icon: LucideIcon; label: string }[] = [
  { icon: Zap, label: "0.2s latency" },
  { icon: Lock, label: "TLS encrypted" },
]

const INTEGRATIONS = ["Google Calendar", "HubSpot"]

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function HeroVoiceAura() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<"connecting" | "connected">(reduced ? "connected" : "connecting")
  const [current, setCurrent] = useState<FeedEvent | null>(reduced ? SCRIPT[SCRIPT.length - 1] : null)
  const [typing, setTyping] = useState<Speaker | null>(null)
  const [seconds, setSeconds] = useState(reduced ? 42 : 0)

  useEffect(() => {
    if (reduced) {
      setPhase("connected")
      setCurrent(SCRIPT[SCRIPT.length - 1])
      setTyping(null)
      setSeconds(42)
      return
    }

    const timers: number[] = []
    let intervalId: number | null = null

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms)
      timers.push(id)
    }

    const playEvent = (index: number) => {
      if (index >= SCRIPT.length) {
        schedule(() => {
          setCurrent(null)
          schedule(startCall, CYCLE_GAP_MS)
        }, TAG_HOLD_MS)
        return
      }
      const event = SCRIPT[index]
      if (event.kind === "message") {
        setTyping(event.speaker)
        schedule(() => {
          setTyping(null)
          setCurrent(event)
          schedule(() => playEvent(index + 1), MESSAGE_HOLD_MS)
        }, TYPING_MS)
      } else {
        setCurrent(event)
        schedule(() => playEvent(index + 1), TAG_HOLD_MS)
      }
    }

    const startCall = () => {
      setPhase("connecting")
      setCurrent(null)
      setTyping(null)
      setSeconds(0)
      if (intervalId !== null) window.clearInterval(intervalId)
      schedule(() => {
        setPhase("connected")
        intervalId = window.setInterval(() => setSeconds((s) => s + 1), 1000)
        playEvent(0)
      }, CONNECT_MS)
    }

    startCall()
    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      if (intervalId !== null) window.clearInterval(intervalId)
    }
  }, [reduced])

  const connected = phase === "connected"

  return (
    <div className="relative flex min-h-[420px] flex-col items-center justify-center py-6 md:min-h-[460px]">
      {/* Ambient glow behind the whole constellation — no card, just light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.14] blur-[100px]"
      />

      {/* Caller chip + live duration — floats top-left on desktop, stacks first on mobile */}
      <div className="relative z-10 mb-6 flex items-center gap-2 md:absolute md:left-0 md:top-0 md:mb-0">
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1.5 backdrop-blur-md transition-colors duration-500",
            connected ? "border-primary/40" : "border-border/60",
          )}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full ring-1 transition-colors duration-500",
              connected ? "bg-primary/15 ring-primary/30" : "bg-muted ring-border",
            )}
          >
            <PhoneIncoming
              className={cn("h-3 w-3 transition-colors duration-500", connected ? "text-primary" : "text-muted-foreground")}
              aria-hidden
            />
          </span>
          <span className="text-[10px] font-medium text-foreground">Inbound caller</span>
        </div>
        <span className="rounded-full border border-border/60 bg-card/70 px-2.5 py-1 font-mono text-[10px] tabular-nums text-muted-foreground backdrop-blur-md">
          {formatDuration(seconds)}
        </span>
      </div>

      {/* Status metric chips — float top-right on desktop, wrap centered on mobile */}
      <div className="relative z-10 mb-8 flex flex-wrap items-center justify-center gap-2 md:absolute md:right-0 md:top-0 md:mb-0 md:flex-col md:items-end">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[9px] font-normal uppercase tracking-wider text-primary backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Live connected
        </span>
        {METRICS.map((m) => (
          <span
            key={m.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-md"
          >
            <m.icon className="h-2.5 w-2.5 text-primary" aria-hidden />
            {m.label}
          </span>
        ))}
      </div>

      {/* Radial waveform + orb — the one fixed anchor of the composition */}
      <div className="relative z-10 flex h-44 w-44 items-center justify-center">
        {!reduced &&
          Array.from({ length: BAR_COUNT }).map((_, i) => {
            const angle = (i / BAR_COUNT) * 360
            return (
              <span
                key={i}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
                style={{ transform: `rotate(${angle}deg) translateY(-${ORB_RADIUS}px)` }}
              >
                <span
                  className="voice-bar block h-3 w-[2.5px] -translate-x-1/2 rounded-full"
                  style={{
                    backgroundImage: "linear-gradient(180deg, var(--primary), var(--ai-cyan))",
                    opacity: connected ? 0.85 : 0.35,
                    animationDelay: `${(i % 13) * 0.07}s`,
                    animationDuration: `${0.9 + (i % 5) * 0.11}s`,
                  }}
                />
              </span>
            )
          })}

        {connected &&
          !reduced &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35"
              initial={{ scale: 1, opacity: 0.55 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 1.1 }}
            />
          ))}

        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-full text-primary"
          style={{
            backgroundImage:
              "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 62%, white), var(--primary) 62%, color-mix(in oklch, var(--primary) 78%, black))",
          }}
        >
          {!reduced && <span className="pulse-ring absolute inset-0 rounded-full" aria-hidden />}
          <Sparkles className="relative h-6 w-6 text-white" aria-hidden />
        </div>
      </div>

      <span className="relative z-10 mt-3 text-center text-[10px] font-medium text-muted-foreground">
        {connected ? "Aria · listening & responding" : "Inbound call connecting…"}
      </span>

      {/* Current line — a single floating chip that crossfades between transcript
          bubbles, a typing indicator, and [TAG] chips. Never a scrolling list, so
          there's nothing here that needs a bounding box. */}
      <div className="relative z-10 mt-5 flex h-14 w-full max-w-sm items-start justify-center px-4">
        <AnimatePresence mode="wait">
          {typing ? (
            <motion.div
              key="typing"
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex items-center gap-1 rounded-2xl px-3 py-2.5 backdrop-blur-md",
                typing === "Aria" ? "rounded-br-sm border border-primary/25 bg-primary/10" : "rounded-bl-sm border border-border/50 bg-card/70",
              )}
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn("h-1.5 w-1.5 animate-bounce rounded-full", typing === "Aria" ? "bg-primary" : "bg-foreground/40")}
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </motion.div>
          ) : current?.kind === "message" ? (
            <motion.div
              key={`msg-${current.text}`}
              initial={reduced ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-left text-xs leading-snug backdrop-blur-md",
                current.speaker === "Aria"
                  ? "rounded-br-sm border border-primary/25 bg-primary/10 text-foreground"
                  : "rounded-bl-sm border border-border/50 bg-card/75 text-foreground",
              )}
            >
              <span className={cn("mb-0.5 block text-[9px] font-normal uppercase tracking-wide", current.speaker === "Aria" ? "text-primary" : "text-muted-foreground")}>
                {current.speaker}
              </span>
              {current.text}
            </motion.div>
          ) : current?.kind === "tag" ? (
            <motion.div
              key={`tag-${current.label}`}
              initial={reduced ? undefined : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 self-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-wider text-primary backdrop-blur-md"
            >
              <current.icon className="h-2.5 w-2.5" aria-hidden />
              {current.label}
            </motion.div>
          ) : (
            <motion.div
              key="establishing"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              className="text-[10px] text-muted-foreground"
            >
              Establishing a secure line…
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Integrations — plain floating labels, no bar, no border */}
      <div className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10px] text-muted-foreground">
        {INTEGRATIONS.map((name) => (
          <span key={name} className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-primary" aria-hidden />
            {name} synced
          </span>
        ))}
      </div>
    </div>
  )
}
