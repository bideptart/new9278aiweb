"use client"

import { CheckCircle2, PhoneOff, Voicemail, Zap } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

/**
 * "Traditional answering service" vs "9278.ai" — a two-column comparison.
 * The left column's busy-signal dot blinks (a stalled, blocked signal); the
 * right column's dot pulses steadily (an always-open line). Both loops are
 * plain CSS (Tailwind's animate-pulse / a local motion loop), guarded by
 * useReducedMotion for the motion-driven one.
 */

const TRADITIONAL = [
  { icon: PhoneOff, text: "Busy signal after the 3rd simultaneous caller" },
  { icon: Voicemail, text: "Overflow calls dumped straight to voicemail" },
  { icon: PhoneOff, text: "Hold queue during nights, weekends, and holidays" },
]

const NINE_TWO_SEVEN_EIGHT = [
  { icon: Zap, text: "Every caller answered instantly, no exceptions" },
  { icon: CheckCircle2, text: "100+ calls handled in parallel, zero queue" },
  { icon: CheckCircle2, text: "Same instant pickup at 3am as at 3pm" },
]

export function ConcurrencyComparison() {
  const reduced = useReducedMotion()
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Traditional */}
      <div className="rounded-2xl border border-border/60 bg-card/30 p-6">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-muted-foreground/60" />
          </span>
          <p className="text-xs font-normal uppercase tracking-[0.14em] text-muted-foreground">
            Traditional answering service
          </p>
        </div>
        <ul className="mt-5 space-y-4">
          {TRADITIONAL.map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <item.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="text-pretty text-sm leading-relaxed text-muted-foreground">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 9278.ai */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/[0.04] p-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-neural" />
        <div className="relative flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            {!reduced && (
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-primary"
                animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
              />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <p className="text-xs font-normal uppercase tracking-[0.14em] text-primary">9278.ai answering</p>
        </div>
        <ul className="relative mt-5 space-y-4">
          {NINE_TWO_SEVEN_EIGHT.map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <item.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span className="text-pretty text-sm leading-relaxed text-foreground">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
