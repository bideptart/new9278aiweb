"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react"
import { Calendar, Check, Clock, Database, MessageSquare, PhoneCall, Sliders, Zap, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// Icon keys, not component references — step data is often authored in a Server Component
// page and passed in as a prop, and React components can't cross that serialization boundary.
const ICONS = { phone: PhoneCall, database: Database, sliders: Sliders, zap: Zap, calendar: Calendar, clock: Clock, message: MessageSquare }
export type TimelineStepIcon = keyof typeof ICONS

export type TimelineStep = {
  title: string
  description: string
  iconName: TimelineStepIcon
  checklist: string[]
}

const DEFAULT_STEPS: TimelineStep[] = [
  {
    title: "Connect Number",
    description: "Use your existing business phone number or claim a new local/toll-free DID.",
    iconName: "phone",
    checklist: ["Port your existing number, or claim a new one", "Verify carrier connection in under 2 minutes", "Test the line with an inbound ring check"],
  },
  {
    title: "Set Knowledge Base",
    description: "Upload your company FAQ, business hours, services list, and staff transfer rules.",
    iconName: "database",
    checklist: ["Upload FAQs, hours & services", "Import documents via drag-and-drop", "Define staff transfer rules"],
  },
  {
    title: "Choose Voice Persona",
    description: "Select from 50+ ultra-realistic male and female voice models with natural accents.",
    iconName: "sliders",
    checklist: ["Browse 50+ realistic voice models", "Preview accents in real time", "Write a custom greeting script"],
  },
  {
    title: "Go Live",
    description: "Turn on call forwarding and let your AI Receptionist handle inbound calls 24/7.",
    iconName: "zap",
    checklist: ["Enable call forwarding", "Run a live test call", "You're live — 24/7 coverage active"],
  },
]

export function DeploymentTimeline({ steps = DEFAULT_STEPS }: { steps?: TimelineStep[] } = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  // Track scroll progress through the sticky section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Synchronize active step (0, 1, 2, 3) with scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return
    const totalSteps = steps.length
    const calculatedStep = Math.min(Math.floor(latest * totalSteps), totalSteps - 1)
    if (calculatedStep !== active && calculatedStep >= 0) {
      setActive(calculatedStep)
    }
  })

  const step = steps[active]
  const progressPct = (active / (steps.length - 1)) * 100

  return (
    <div ref={containerRef} className="relative min-h-[160vh] sm:min-h-[200vh] w-full">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Sticky viewport wrapper — locks screen content in place while scrolling from step 1 to step 4 */}
      <div className="sticky top-20 flex min-h-[75vh] flex-col justify-center py-6">
        <div className="mx-auto w-full max-w-4xl px-2 sm:px-4">
          {/* Timeline Rail — horizontal on desktop, vertical on mobile */}
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-0">
            {/* Base rail */}
            <div aria-hidden="true" className="absolute left-6 top-0 bottom-0 w-1 bg-border/60 sm:left-0 sm:right-0 sm:top-6 sm:h-1 sm:w-auto sm:bottom-auto rounded-full" />
            
            {/* Glowing progress fill line (Light red theme) */}
            <div
              aria-hidden="true"
              className="absolute left-6 top-0 w-1 bg-gradient-to-b from-primary/70 via-red-400/60 to-rose-400/60 shadow-[0_0_8px_rgba(220,38,38,0.25)] transition-all duration-500 ease-out rounded-full sm:hidden"
              style={{ height: `${progressPct}%` }}
            />
            <div
              aria-hidden="true"
              className="absolute left-0 top-6 hidden h-1 bg-gradient-to-r from-primary/70 via-red-400/60 to-rose-400/60 shadow-[0_0_8px_rgba(220,38,38,0.25)] transition-all duration-500 ease-out rounded-full sm:block"
              style={{ width: `${progressPct}%` }}
            />

            {steps.map((s, i) => {
              const isActive = i === active
              const isDone = i < active
              const StepIcon = ICONS[s.iconName] || Calendar
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative z-10 flex items-center gap-3 text-left sm:flex-1 sm:flex-col sm:items-center sm:text-center outline-none cursor-pointer"
                >
                  <span
                    className={cn(
                      "relative flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 text-sm font-normal transition-all duration-300 shadow-sm",
                      isActive
                        ? "scale-110 border-primary/50 bg-primary/10 text-primary shadow-md shadow-primary/10 ring-4 ring-primary/15"
                        : isDone
                          ? "border-primary/30 bg-primary/5 text-primary/70"
                          : "border-border/80 bg-background/90 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary group-hover:scale-105",
                    )}
                  >
                    {isDone ? (
                      <Check className="size-5 font-normal text-primary/80" aria-hidden="true" />
                    ) : (
                      <StepIcon className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <div className="sm:mt-2">
                    <p className="text-[10px] font-mono font-normal uppercase tracking-wider text-primary/60 sm:block hidden">
                      0{i + 1}
                    </p>
                    <p className={cn("text-xs sm:text-sm font-medium transition-colors sm:max-w-[8.5rem]", isActive ? "text-foreground font-normal" : "text-muted-foreground group-hover:text-foreground")}>
                      {s.title}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active step detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 overflow-hidden rounded-3xl border border-primary/20 bg-background/95 backdrop-blur-xl shadow-xl shadow-black/5 sm:mt-10 relative"
            >
              {/* Top Accent Edge Light Beam (Softened) */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

              <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:gap-10">
                {/* Left Side Info */}
                <div className="md:flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-mono font-normal uppercase tracking-wider text-primary/80">
                      <span className="size-1.5 rounded-full bg-primary/75 animate-pulse" />
                      Step {String(active + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Right Side Checklist Pills */}
                <ul className="space-y-3 md:flex-1">
                  {step.checklist.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 + i * 0.07 }}
                      className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm font-medium text-foreground shadow-xs transition-transform hover:translate-x-1"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom Quick Controls Bar */}
              <div className="flex items-center justify-between border-t border-border/40 bg-card/40 px-6 py-3 text-xs">
                <div className="flex items-center gap-1.5">
                  {steps.map((_, idx) => (
                    <button
                      key={`dot-${idx}`}
                      type="button"
                      onClick={() => setActive(idx)}
                      aria-label={`Go to step ${idx + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        idx === active ? "w-6 bg-primary/70" : "w-1.5 bg-border hover:bg-primary/40"
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActive((prev) => Math.max(0, prev - 1))}
                    disabled={active === 0}
                    className="flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-1.5 font-medium text-foreground disabled:opacity-40 hover:bg-accent transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive((prev) => Math.min(steps.length - 1, prev + 1))}
                    disabled={active === steps.length - 1}
                    className="flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-normal text-primary/80 disabled:opacity-40 hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    Next <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

