"use client"

import { useMemo } from "react"
import { PhoneCall } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import type { Step } from "./constants"

/** Live equalizer built on the existing `.voice-bar` keyframes (plain CSS,
    already covered by the global prefers-reduced-motion override). */
function Equalizer({ bars = 26 }: { bars?: number }) {
  const seeds = useMemo(
    () => Array.from({ length: bars }, (_, i) => ({ d: (i % 7) * 0.09, s: 0.3 + ((i * 37) % 60) / 100 })),
    [bars],
  )
  return (
    <div className="flex h-12 w-full items-center justify-between gap-[3px]" aria-hidden>
      {seeds.map((b, i) => (
        <span
          key={i}
          className="voice-bar w-full min-w-[2px] rounded-full"
          style={{
            height: `${b.s * 100}%`,
            animationDelay: `${b.d}s`,
            background: "linear-gradient(180deg, var(--primary), var(--ai-magenta))",
          }}
        />
      ))}
    </div>
  )
}

export function CallPanel({ step, reduced }: { step: Step; reduced: boolean }) {
  const isAgent = step.speaker === "agent"

  return (
    <div className="ring-gradient card-glow relative flex h-full flex-col overflow-hidden rounded-3xl p-5 md:p-6">
      <span className="scan-line" aria-hidden />

      {/* Status bar */}
      <div className="relative flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live call
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <PhoneCall className="h-3 w-3 text-primary" aria-hidden />
          Inbound · 0:47
        </span>
      </div>

      {/* Caller card */}
      <div className="relative mt-6 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-1 ring-primary/20">
          JM
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">Jordan Miller</p>
          <p className="truncate text-xs text-muted-foreground">Calling about a Thursday appointment</p>
        </div>
      </div>

      {/* Waveform */}
      <div className="relative mt-6">
        <Equalizer />
      </div>

      {/* Transcript */}
      <div className="relative mt-6 flex flex-1 flex-col justify-center rounded-2xl border border-border/50 bg-background/50 p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Live transcript</p>
        <div className="mt-3 min-h-[3.25rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={step.line}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-pretty text-sm leading-relaxed text-foreground"
            >
              <span className={cn("font-semibold", isAgent ? "text-primary" : "text-foreground")}>
                {isAgent ? "Aria" : "Jordan"}:
              </span>{" "}
              {step.line}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
