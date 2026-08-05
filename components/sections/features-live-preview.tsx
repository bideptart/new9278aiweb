"use client"

import { useEffect, useState } from "react"
import { Check, PhoneCall, CalendarClock, Headphones, PhoneForwarded, type LucideIcon } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * FeaturesLivePreview
 * Hero mockup for /features — a single device frame that cycles through
 * four compact, purpose-built scenes, one per dedicated feature page
 * (/features/ai-voice-receptionist, /appointment-setter, /answering-services,
 * /call-transfer). Replaces the previous generic "Sarah Chen" phone +
 * dashboard mockup with something that actually maps to the site's IA.
 */

type TabKey = "receptionist" | "appointment" | "answering" | "transfer"

const TABS: { key: TabKey; label: string; icon: LucideIcon; accent: string; path: string }[] = [
  { key: "receptionist", label: "Receptionist", icon: PhoneCall, accent: "var(--ai-cyan)", path: "ai-receptionist" },
  { key: "appointment", label: "Appointment", icon: CalendarClock, accent: "var(--ai-mint)", path: "appointment-setter" },
  { key: "answering", label: "Answering", icon: Headphones, accent: "var(--ai-violet)", path: "answering-services" },
  { key: "transfer", label: "Transfer", icon: PhoneForwarded, accent: "var(--ai-magenta)", path: "call-transfer" },
]

export function FeaturesLivePreview() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((c) => (c + 1) % TABS.length), 3400)
    return () => clearInterval(id)
  }, [reduced])

  const tab = TABS[active]

  return (
    <div className="mx-auto w-full max-w-[320px] sm:max-w-[360px]">
      <div className="ring-gradient card-glow relative overflow-hidden rounded-2xl">
        <span className="scan-line" aria-hidden />

        {/* Chrome bar */}
        <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/60 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="h-2 w-2 rounded-full bg-foreground/10" />
          <span className="ml-1.5 truncate font-mono text-[9px] text-muted-foreground">app.9278.ai/{tab.path}</span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[9px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Live
          </span>
        </div>

        {/* Body — swaps per tab */}
        <div className="relative flex h-[210px] items-center justify-center overflow-hidden bg-background/40 sm:h-[230px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              {tab.key === "receptionist" && <ReceptionistScene reduced={!!reduced} />}
              {tab.key === "appointment" && <AppointmentScene />}
              {tab.key === "answering" && <AnsweringScene />}
              {tab.key === "transfer" && <TransferScene reduced={!!reduced} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs — also serve as a legend for what's cycling */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {TABS.map((t, i) => {
          const Icon = t.icon
          const isActive = i === active
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${t.label} preview`}
              aria-pressed={isActive}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2.5 text-center transition-colors",
                isActive ? "border-transparent" : "border-border/50 bg-card/30 hover:border-border",
              )}
              style={
                isActive
                  ? {
                      background: `color-mix(in oklch, ${t.accent} 14%, transparent)`,
                      borderColor: `color-mix(in oklch, ${t.accent} 42%, transparent)`,
                    }
                  : undefined
              }
            >
              <Icon className="h-4 w-4" style={{ color: isActive ? t.accent : undefined }} aria-hidden />
              <span className={cn("text-[9.5px] font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ReceptionistScene({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {!reduced && <span className="pulse-ring absolute inset-0 rounded-full" style={{ color: "var(--ai-cyan)" }} aria-hidden />}
        <span
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-white"
          style={{
            backgroundImage:
              "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--ai-cyan) 60%, white), var(--ai-cyan))",
          }}
        >
          <PhoneCall className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <div className="flex h-4 items-center gap-[2.5px]" aria-hidden>
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            className="voice-bar w-[2px] rounded-full"
            style={{
              height: `${28 + ((i * 41) % 65)}%`,
              animationDelay: `${(i * 90) % 900}ms`,
              background: "var(--ai-cyan)",
            }}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">Greeting caller…</p>
        <p className="mt-1 text-[10px] text-muted-foreground">Routed to Support in 0.3s</p>
      </div>
    </div>
  )
}

const SLOTS = ["9:00", "10:00", "11:00", "1:00", "2:00", "3:00", "3:30", "4:00"]
const BOOKED_INDEX = 5

function AppointmentScene() {
  return (
    <div className="w-full max-w-[220px]">
      <div className="grid grid-cols-4 gap-1.5">
        {SLOTS.map((s, i) => {
          const booked = i === BOOKED_INDEX
          return (
            <span
              key={s}
              className={cn(
                "flex h-8 items-center justify-center rounded-lg border text-[10px] font-medium",
                booked ? "border-transparent text-white" : "border-border/50 bg-card/40 text-muted-foreground",
              )}
              style={booked ? { background: "var(--ai-mint)" } : undefined}
            >
              {booked ? <Check className="h-3.5 w-3.5" aria-hidden /> : s}
            </span>
          )
        })}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-3 py-1.5 text-[10px] font-medium text-foreground">
        <Check className="h-3 w-3" style={{ color: "var(--ai-mint)" }} aria-hidden />
        Booked · 3:00 PM
      </div>
    </div>
  )
}

const MATRIX_COLS = 8
const MATRIX_ROWS = 4

function AnsweringScene() {
  return (
    <div className="w-full max-w-[220px]">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${MATRIX_COLS}, minmax(0, 1fr))` }}>
        {Array.from({ length: MATRIX_COLS * MATRIX_ROWS }).map((_, i) => (
          <span
            key={i}
            className="matrix-cell aspect-square rounded-[2px]"
            style={
              {
                background: "var(--ai-violet)",
                "--cell-delay": `${(i * 137) % 2200}ms`,
                "--cell-duration": "2.2s",
              } as React.CSSProperties
            }
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        <span className="font-mono font-semibold text-foreground">128</span> calls live · 0.0s wait
      </p>
    </div>
  )
}

function TransferScene({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex w-full max-w-[230px] flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between">
        <TransferNode label="Caller" />
        <TransferConnector reduced={reduced} />
        <TransferNode label="AI" active />
        <TransferConnector reduced={reduced} delay={0.7} />
        <TransferNode label="Human" />
      </div>
      <div className="rounded-lg border border-border/50 bg-card/60 px-3 py-1.5 text-center text-[10px] leading-snug text-muted-foreground">
        Context summary <span className="font-medium text-foreground">sent</span> before pickup
      </div>
    </div>
  )
}

function TransferNode({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border text-[9px] font-semibold"
        style={
          active
            ? { background: "var(--ai-magenta)", borderColor: "var(--ai-magenta)", color: "white" }
            : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
        }
      >
        {label[0]}
      </span>
      <span className="text-[9px] text-muted-foreground">{label}</span>
    </div>
  )
}

function TransferConnector({ reduced, delay = 0 }: { reduced: boolean; delay?: number }) {
  return (
    <div
      className="relative mx-1 h-0 flex-1 border-t border-dashed"
      style={{ borderColor: "color-mix(in oklch, var(--ai-magenta) 45%, transparent)" }}
      aria-hidden
    >
      {!reduced && (
        <motion.span
          className="absolute -top-[3px] h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--ai-magenta)" }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay }}
        />
      )}
    </div>
  )
}
