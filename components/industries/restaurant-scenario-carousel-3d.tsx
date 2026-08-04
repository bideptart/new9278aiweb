"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sparkles,
  CalendarCheck,
  Users,
  PartyPopper,
  Truck,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Scenario {
  id: string
  title: string
  icon: LucideIcon
  frontTag: string
  outcome: string
  metric: string
}

const SCENARIOS: Scenario[] = [
  {
    id: "reservation",
    title: "Reservation Call",
    icon: CalendarCheck,
    frontTag: "Inbound Booking",
    outcome: "Table booked, dietary notes logged, and a confirmation SMS sent — all inside one call.",
    metric: "Booked in 42s",
  },
  {
    id: "waitlist",
    title: "Walk-in Waitlist",
    icon: Users,
    frontTag: "Host-Stand Overflow",
    outcome: "Party added to the live waitlist with an accurate quote, texted the moment their table opens.",
    metric: "Zero missed walk-ins",
  },
  {
    id: "private-event",
    title: "Private Event",
    icon: PartyPopper,
    frontTag: "Group Booking",
    outcome: "14-guest private dining inquiry qualified, deposit link sent, event manager looped in instantly.",
    metric: "Warm handoff <60s",
  },
  {
    id: "catering",
    title: "Catering Order",
    icon: Truck,
    frontTag: "Off-Premise Order",
    outcome: "Bulk catering order captured with delivery window, synced straight to the kitchen queue.",
    metric: "Auto-synced to POS",
  },
  {
    id: "recovery",
    title: "Complaint Recovery",
    icon: HeartHandshake,
    frontTag: "Guest Follow-up",
    outcome: "Post-visit feedback call logged, service recovery offer issued, manager alerted before it becomes a review.",
    metric: "+25% satisfaction",
  },
]

const TOTAL = SCENARIOS.length
const ANGLE = 360 / TOTAL
const RADIUS = 200

export function RestaurantScenarioCarousel3D() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % TOTAL), 3200)
    return () => clearInterval(timer)
  }, [])

  const active = SCENARIOS[index]
  const ActiveIcon = active.icon

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 size-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-bl from-primary/15 via-rose-500/10 to-transparent blur-3xl opacity-20"
      />

      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          CALL SCENARIO DRUM
        </span>
        <h2 className="text-3xl font-serif font-semibold tracking-tight md:text-5xl text-foreground">
          One engine, <span className="italic text-rose-400 dark:text-rose-400">every kind of call.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          Five real front-of-house scenarios spinning through — the AI voice engine handles every one of them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* 3D Rotating Drum */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="[perspective:1300px]">
            <motion.div
              className="relative [transform-style:preserve-3d]"
              style={{ width: 220, height: 260 }}
              animate={{ rotateY: -index * ANGLE }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            >
              {SCENARIOS.map((scenario, i) => {
                const Icon = scenario.icon
                const isActive = i === index
                return (
                  <div
                    key={scenario.id}
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[1.75rem] border p-5 text-center backdrop-blur-xl transition-colors duration-500",
                      isActive
                        ? "border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 shadow-[0_20px_45px_rgba(244,63,94,0.18)]"
                        : "border-border/50 bg-white/70 dark:bg-slate-900/60"
                    )}
                    style={{ transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)` }}
                  >
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-2xl border transition-all duration-500",
                        isActive
                          ? "bg-rose-500/15 border-rose-300 dark:border-rose-800 text-rose-400 dark:text-rose-400 scale-110"
                          : "bg-rose-500/5 border-border/50 text-muted-foreground"
                      )}
                    >
                      <Icon className="size-5.5" />
                    </span>
                    <p
                      className={cn(
                        "text-[10px] font-mono font-bold uppercase tracking-wider",
                        isActive ? "text-rose-400 dark:text-rose-400" : "text-muted-foreground/70"
                      )}
                    >
                      {scenario.frontTag}
                    </p>
                    <p className={cn("text-sm font-serif font-bold leading-snug", isActive ? "text-foreground" : "text-muted-foreground")}>
                      {scenario.title}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Synced Detail Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-[2rem] border border-rose-200/80 dark:border-rose-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 md:p-7 shadow-lg"
            >
              <div className="flex items-center gap-3 border-b border-border/40 pb-4 mb-4">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-rose-500/15 border border-rose-300 dark:border-rose-800 text-rose-400 dark:text-rose-400">
                  <ActiveIcon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400">{active.frontTag}</p>
                  <p className="text-base font-serif font-bold text-foreground">{active.title}</p>
                </div>
              </div>

              <p className="text-sm text-foreground leading-relaxed font-medium">{active.outcome}</p>

              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 px-3 py-1 text-xs font-bold text-rose-400 dark:text-rose-400">
                {active.metric}
              </span>

              <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-border/30 pt-4">
                {SCENARIOS.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-rose-400" : "w-1.5 bg-rose-400/25"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
