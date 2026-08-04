"use client"

import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Two example call snippets side by side: a routine inquiry that gets
 * logged quietly, and an urgent one that trips a custom escalation trigger.
 * The urgent card's badge pulses (motion-driven, reduced-motion aware) to
 * visually separate "logged" from "escalating right now."
 */

const GENERAL = {
  tag: "General — logged",
  caller: "Caller",
  lines: [
    { speaker: "Caller", text: "Hi, what are your hours this weekend?" },
    { speaker: "Aria", text: "We're open 9 to 5 Saturday and closed Sunday — anything else I can help with?" },
  ],
}

const URGENT = {
  tag: "URGENT — escalating now",
  caller: "Caller",
  lines: [
    { speaker: "Caller", text: "There's water pouring through our ceiling right now, we need someone immediately." },
    { speaker: "Aria", text: "I'm connecting you to the on-call technician right now — please stay on the line." },
  ],
}

function CallCard({
  data,
  urgent,
}: {
  data: typeof GENERAL
  urgent?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <div
      className={
        urgent
          ? "relative overflow-hidden rounded-2xl border border-primary/40 bg-primary/[0.06] p-5"
          : "relative overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-5"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={
            urgent
              ? "inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-primary"
              : "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
          }
        >
          {urgent ? (
            <span className="relative flex size-2">
              {!reduced && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-primary"
                  animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                  transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
          ) : (
            <CheckCircle2 className="size-3" aria-hidden />
          )}
          {data.tag}
        </span>
        {urgent && <AlertTriangle className="size-4 text-primary" aria-hidden />}
      </div>

      <ul className="mt-4 space-y-2.5">
        {data.lines.map((line, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
            <span className={urgent ? "font-medium text-primary" : "font-medium text-foreground"}>
              {line.speaker}:
            </span>
            <span className="text-pretty text-muted-foreground">{line.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function EscalationDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <CallCard data={GENERAL} />
      <CallCard data={URGENT} urgent />
    </div>
  )
}
