"use client"

import { useEffect, useState } from "react"
import { Mic, Brain, Route, type LucideIcon } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Three-stage call pipeline: GREET → IDENTIFY INTENT → ROUTE OR ANSWER.
 * The active stage cycles automatically, with a dashed connector between
 * nodes lighting up (via the shared .conn-flow drift utility) once the
 * flow has passed it. Reduced motion renders the final, fully-lit state.
 */

const STAGES: { icon: LucideIcon; title: string; caption: string }[] = [
  { icon: Mic, title: "Greet", caption: "Warm, on-brand greeting in under a second." },
  { icon: Brain, title: "Identify intent", caption: "Understands why the caller is calling." },
  { icon: Route, title: "Route or answer", caption: "Answers instantly or hands off with context." },
]

const STEP_MS = 1900

export function PipelineFlow() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(reduced ? STAGES.length - 1 : 0)

  useEffect(() => {
    if (reduced) {
      setActive(STAGES.length - 1)
      return
    }
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STAGES.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="ring-gradient card-glow relative overflow-hidden rounded-[28px] px-4 py-6 sm:px-8 sm:py-7">
      <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon
          const isActive = i === active
          const isPast = i < active || (reduced && i <= active)
          const lit = isActive || isPast
          return (
            <div key={stage.title} className="flex flex-1 flex-col items-stretch sm:flex-row sm:items-center">
              <div className="flex flex-col items-center gap-2 px-2 py-3 text-center sm:py-0">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500",
                    lit
                      ? "border-primary/50 bg-primary/12 text-primary shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_25%,transparent)]"
                      : "border-border/60 bg-muted/40 text-muted-foreground",
                    isActive && "scale-110",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wide transition-colors duration-500",
                      lit ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {stage.title}
                  </p>
                  <p className="mt-0.5 max-w-[9.5rem] text-[11px] leading-snug text-muted-foreground sm:max-w-[8.5rem]">
                    {stage.caption}
                  </p>
                </div>
              </div>

              {i < STAGES.length - 1 && (
                <div className="mx-auto h-8 w-8 sm:mx-0 sm:h-3 sm:w-full sm:flex-1" aria-hidden>
                  <ConnectorLine active={i < active} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ConnectorLine({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className="h-8 w-8 sm:h-3 sm:w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        className="conn-flow sm:hidden"
        stroke={active ? "var(--primary)" : "var(--border)"}
        strokeOpacity={active ? 0.7 : 0.6}
        strokeWidth="3"
        strokeDasharray="5 5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="0"
        y1="50"
        x2="100"
        y2="50"
        className="conn-flow hidden sm:block"
        stroke={active ? "var(--primary)" : "var(--border)"}
        strokeOpacity={active ? 0.7 : 0.6}
        strokeWidth="3"
        strokeDasharray="5 5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
