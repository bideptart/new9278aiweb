"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckCircle2, Dumbbell, Home, PhoneCall, Scale, Stethoscope, UtensilsCrossed, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

// Icon keys, not component references — scenario data is often authored in a Server Component
// page and passed in as a prop, and React components can't cross that serialization boundary.
const ICONS = { stethoscope: Stethoscope, scale: Scale, wrench: Wrench, utensils: UtensilsCrossed, home: Home, dumbbell: Dumbbell }
export type CallScenarioIcon = keyof typeof ICONS

export type CallScenario = {
  tag: string
  iconName: CallScenarioIcon
  caller: string
  lines: { speaker: "caller" | "ai"; text: string }[]
  outcome: string
  sentiment: string
}

const DEFAULT_SCENARIOS: CallScenario[] = [
  {
    tag: "Clinic & Healthcare",
    iconName: "stethoscope",
    caller: "Sophia M.",
    lines: [
      { speaker: "caller" as const, text: "My tooth has been hurting severely since last night. Do you have any emergency slots today?" },
      {
        speaker: "ai" as const,
        text: "I'm sorry to hear you're in pain. We do reserve emergency slots for severe cases. May I get your full name and date of birth so I can book you for 11:30 AM today?",
      },
    ],
    outcome: "Appointment booked · 11:30 AM today",
    sentiment: "Urgent · Resolved",
  },
  {
    tag: "Real Estate & Legal",
    iconName: "scale",
    caller: "David R.",
    lines: [
      { speaker: "caller" as const, text: "I need to consult an attorney regarding a commercial property lease dispute." },
      {
        speaker: "ai" as const,
        text: "Understood. I can transfer you directly to Senior Attorney Marcus right now. Before I patch you through, may I quickly confirm the property address?",
      },
    ],
    outcome: "Transferred to Senior Attorney Marcus",
    sentiment: "Priority · Live transfer",
  },
  {
    tag: "Home Services",
    iconName: "wrench",
    caller: "Karen L.",
    lines: [
      { speaker: "caller" as const, text: "My AC completely stopped working and it's 95 degrees in here. Can someone come out today?" },
      {
        speaker: "ai" as const,
        text: "That sounds urgent — let's get a technician out right away. Our next emergency slot is 2:00 PM. Can I confirm your address is 214 Birchwood Lane?",
      },
    ],
    outcome: "Emergency visit scheduled · 2:00 PM",
    sentiment: "Urgent · Resolved",
  },
  {
    tag: "Restaurant & Hospitality",
    iconName: "utensils",
    caller: "Tom K.",
    lines: [
      { speaker: "caller" as const, text: "Hi, do you have a table for 6 available tonight around 7:30?" },
      {
        speaker: "ai" as const,
        text: "Let me check for you — yes, I have a table for 6 at 7:30. Would you prefer the patio or indoor seating?",
      },
    ],
    outcome: "Reservation confirmed · 7:30 PM, party of 6",
    sentiment: "Positive · Booked",
  },
]

const AUTOPLAY_MS = 7000

export function LiveCallShowcase({
  scenarios = DEFAULT_SCENARIOS,
  aiLabel = "AI Receptionist",
  initialIndex = 0,
}: {
  scenarios?: CallScenario[]
  aiLabel?: string
  initialIndex?: number
} = {}) {
  const reduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [revealed, setRevealed] = useState(reduced ? scenarios[initialIndex].lines.length + 1 : 0)
  const [elapsed, setElapsed] = useState(0)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const active = scenarios[activeIndex]

  const selectScenario = (index: number) => {
    setActiveIndex(index)
  }

  // Reveal transcript lines one by one, then the outcome, whenever the active scenario changes.
  useEffect(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    setElapsed(0)

    if (reduced) {
      setRevealed(active.lines.length + 1)
      return
    }

    setRevealed(0)
    active.lines.forEach((_, i) => {
      timeouts.current.push(setTimeout(() => setRevealed(i + 1), 500 + i * 900))
    })
    timeouts.current.push(setTimeout(() => setRevealed(active.lines.length + 1), 500 + active.lines.length * 900 + 500))

    return () => timeouts.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, reduced])

  // Elapsed call timer.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [activeIndex, reduced])

  // Autoplay through scenarios.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % scenarios.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [reduced])

  const mm = String(Math.floor(elapsed / 60)).padStart(1, "0")
  const ss = String(elapsed % 60).padStart(2, "0")

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Scenario tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {scenarios.map((s, i) => {
          const Icon = ICONS[s.iconName]
          const isActive = i === activeIndex
          return (
            <button
              key={s.tag}
              type="button"
              onClick={() => selectScenario(i)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
                isActive
                  ? "border-primary/30 bg-primary/10 text-primary shadow-xs"
                  : "border-border/50 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {s.tag}
            </button>
          )
        })}
      </div>

      {/* Call stage — no card, no boxes. An incoming-call header + a real chat thread. */}
      <div className="relative mt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-8 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-[60px]"
        />

        {/* Caller header, centered like an active call screen */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`header-${activeIndex}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <span className="relative flex size-16 items-center justify-center">
              {!reduced && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20" />}
              <span className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-b from-primary/15 to-primary/5 text-lg font-semibold text-primary ring-1 ring-primary/20">
                {active.caller[0]}
              </span>
            </span>
            <p className="mt-3 text-base font-semibold text-foreground">{active.caller}</p>
            <p className="text-xs text-muted-foreground">{active.tag}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-1.5">
                {!reduced && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              Connected · {mm}:{ss}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Chat thread */}
        <div className="relative mt-8 min-h-[11rem] space-y-3">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-3">
              {active.lines.map((line, i) => {
                const shown = i < revealed
                const isAi = line.speaker === "ai"
                const isFirstAiLine = isAi && active.lines.findIndex((l) => l.speaker === "ai") === i
                return (
                  <motion.div key={i}>
                    {isFirstAiLine && shown && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-1.5 pr-1 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {aiLabel}
                      </motion.p>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={shown ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={cn("flex items-end gap-2", isAi ? "flex-row-reverse" : "flex-row")}
                    >
                      <span
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                          isAi ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {isAi ? <PhoneCall className="size-3" aria-hidden="true" /> : active.caller[0]}
                      </span>
                      <div
                        className={cn(
                          "max-w-[80%] px-4 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[70%]",
                          isAi
                            ? "rounded-2xl rounded-br-md bg-primary/15 border border-primary/35 text-black font-semibold shadow-xs backdrop-blur-md"
                            : "rounded-2xl rounded-bl-md bg-muted text-foreground",
                        )}
                      >
                        {line.text}
                        {isAi && shown && i === revealed - 1 && (
                          <span className="ml-1.5 inline-flex items-center gap-0.5 align-middle">
                            <span className="dot-float size-1 rounded-full bg-primary-foreground/70" />
                            <span className="dot-float size-1 rounded-full bg-primary-foreground/70" style={{ animationDelay: "0.2s" }} />
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Outcome — a floating system-message pill, not a bar */}
        <div className="mt-5 flex min-h-[2.25rem] items-center justify-center">
          <AnimatePresence mode="wait">
            {revealed > active.lines.length && (
              <motion.div
                key={`outcome-${activeIndex}`}
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400"
              >
                <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
                {active.outcome}
                <span className="h-3 w-px bg-emerald-600/20 dark:bg-emerald-400/20" />
                {active.sentiment}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
