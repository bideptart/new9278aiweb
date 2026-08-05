"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CheckCircle2, Moon, Phone, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const scenarios = [
  { time: "2:14 AM", caller: "Unknown caller", outcome: "Appointment booked for 9:00 AM", tag: "Booking" },
  { time: "11:47 PM", caller: "Returning caller", outcome: "Message logged & emailed to your team", tag: "Message" },
  { time: "4:02 AM", caller: "Priority line", outcome: "Transferred to on-call staff", tag: "Transfer" },
  { time: "6:30 AM", caller: "New lead", outcome: "Lead captured in CRM", tag: "CRM Sync" },
]

// Relative hourly call-volume shape, 12 AM → 11 PM. Never hits zero — the point is nothing goes unanswered.
const hourlyVolume = [22, 14, 10, 8, 9, 12, 18, 28, 42, 55, 68, 74, 80, 76, 70, 62, 58, 64, 72, 66, 50, 38, 30, 24]

export function AfterHoursPreview() {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(reduced ? 2 : 0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [reduced])

  const phase = tick % 3 // 0 = ringing, 1 = AI analyzing, 2 = outcome
  const cycle = Math.floor(tick / 3)
  const scenario = scenarios[cycle % scenarios.length]
  const handled = 1284 + cycle
  const activeHour = 1 + (cycle % 5) // late-night hour highlighted on the sparkline each cycle

  return (
    <div className="flex h-full w-full flex-col justify-between p-1 sm:p-2">
      <div>
        {/* Status row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
            <span className="relative flex size-2">
              {!reduced && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />}
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <Moon className="size-3.5 text-primary" aria-hidden="true" />
            Answering right now
          </span>
          <p className="font-mono text-xs font-normal tabular-nums text-primary">
            {handled.toLocaleString()} after-hours calls this month
          </p>
        </div>

        {/* Live call-decision feed (Plain / No inner box) */}
        <div className="mt-4 flex items-center gap-3 py-2 sm:mt-5">
          <AnimatePresence mode="wait">
            <motion.span
              key={`icon-${phase}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full",
                phase === 2 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-primary/10 text-primary",
              )}
            >
              {phase === 0 && <Phone className="size-3.5" aria-hidden="true" />}
              {phase === 1 && <Sparkles className="size-3.5" aria-hidden="true" />}
              {phase === 2 && <CheckCircle2 className="size-3.5" aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={`text-${cycle}-${phase}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="truncate text-xs text-foreground"
              >
                {phase === 0 && (
                  <>
                    <span className="font-mono text-muted-foreground">{scenario.time}</span> — Incoming call from{" "}
                    {scenario.caller}
                  </>
                )}
                {phase === 1 && (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    AI analyzing intent
                    <span className="inline-flex items-center gap-0.5">
                      <span className="dot-float size-1 rounded-full bg-primary" />
                      <span className="dot-float size-1 rounded-full bg-primary" style={{ animationDelay: "0.2s" }} />
                      <span className="dot-float size-1 rounded-full bg-primary" style={{ animationDelay: "0.4s" }} />
                    </span>
                  </span>
                )}
                {phase === 2 && <span className="font-medium">{scenario.outcome}</span>}
              </motion.p>
            </AnimatePresence>
          </div>

          {phase === 2 && (
            <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              {scenario.tag}
            </span>
          )}
        </div>
      </div>

      {/* Bottom live stats panel (Plain / No inner boxes / No border line) */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-center sm:mt-6">
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Answer Rate</span>
          <span className="mt-0.5 block text-xs font-normal text-emerald-600 dark:text-emerald-400">100% Active</span>
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Response</span>
          <span className="mt-0.5 block text-xs font-normal text-primary">&lt; 0.5 Seconds</span>
        </div>
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Dispatch</span>
          <span className="mt-0.5 block text-xs font-normal text-foreground">Instant Alert</span>
        </div>
      </div>
    </div>
  )
}
