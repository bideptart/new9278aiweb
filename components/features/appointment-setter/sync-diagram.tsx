"use client"

import { Bot, Calendar, Mail } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

function Node({
  icon: Icon,
  label,
  sub,
  emphasis,
}: {
  icon: typeof Bot
  label: string
  sub: string
  emphasis?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 text-center sm:px-6",
        emphasis ? "border-primary/40 bg-primary/[0.06]" : "border-border/60 bg-card/40",
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full",
          emphasis ? "bg-primary text-primary-foreground" : "text-primary",
        )}
        style={emphasis ? undefined : { background: "color-mix(in oklch, var(--primary) 12%, transparent)" }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="text-sm font-normal text-foreground">{label}</span>
      <span className="text-[11px] text-muted-foreground">{sub}</span>
    </div>
  )
}

/** Connector line with two dots drifting opposite directions — the visual
    shorthand for "two-way sync," always in motion, never landing on either side. */
function Connector({ reverseDelay = 0 }: { reverseDelay?: number }) {
  const reduced = useReducedMotion()
  return (
    <div className="relative mx-auto hidden h-px w-full max-w-[6rem] shrink-0 bg-border/70 sm:block md:max-w-[8rem]" aria-hidden>
      {!reduced && (
        <>
          <motion.span
            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-primary"
            animate={{ left: ["0%", "94%"] }}
            transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full"
            style={{ background: "var(--ai-mint)" }}
            animate={{ left: ["94%", "0%"] }}
            transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: reverseDelay }}
          />
        </>
      )}
    </div>
  )
}

export function SyncDiagram() {
  return (
    <div className="ring-gradient card-glow relative overflow-hidden rounded-3xl p-6 md:p-8">
      <span className="scan-line" aria-hidden />
      <div className="relative flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-2">
        <Node icon={Calendar} label="Google Calendar" sub="Two-way sync" />
        <Connector />
        <Node icon={Bot} label="9278.ai Agent" sub="Always current" emphasis />
        <Connector reverseDelay={1.2} />
        <Node icon={Mail} label="Outlook" sub="Two-way sync" />
      </div>
    </div>
  )
}
