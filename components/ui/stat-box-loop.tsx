"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { PhoneCall, Clock, Database, Headphones, TrendingDown, Zap, Sparkles } from "lucide-react"

export type StatIconKey = "calls" | "latency" | "cost" | "availability"

const iconMap = {
  calls: PhoneCall,
  latency: Clock,
  cost: Database,
  availability: Headphones,
}

// Target values & loop arrays for fast continuous counting loops
const loopConfigs: Record<
  StatIconKey,
  {
    prefix?: string
    suffix?: string
    values: (number | string)[]
    finalDisplay: string
  }
> = {
  calls: {
    suffix: "%",
    values: [85, 60, 35, 15, 5, 0],
    finalDisplay: "0%",
  },
  latency: {
    prefix: "< ",
    suffix: "ms",
    values: [950, 720, 510, 380, 280],
    finalDisplay: "< 280ms",
  },
  cost: {
    prefix: "Up to ",
    suffix: "%",
    values: [10, 25, 45, 65, 80],
    finalDisplay: "Up to 80%",
  },
  availability: {
    values: ["8/5", "12/5", "18/6", "24/7/365"],
    finalDisplay: "24/7/365",
  },
}

export function StatBoxLoop({
  iconName,
  label,
  value,
  sub,
}: {
  iconName: StatIconKey
  label: string
  value: string
  sub: string
}) {
  const Icon = iconMap[iconName] || Clock
  const config = loopConfigs[iconName]

  const [stepIndex, setStepIndex] = useState(0)

  // Fast looping number counter timer (changes step every 180ms fast, pauses at final value then loops)
  useEffect(() => {
    const totalSteps = config.values.length

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % (totalSteps + 6)) // +6 steps pause at target value before restart
    }, 180)

    return () => clearInterval(interval)
  }, [config.values.length])

  // Determine current displayed value string during fast loop
  const rawValue =
    stepIndex < config.values.length
      ? config.values[stepIndex]
      : config.values[config.values.length - 1]

  const displayString =
    typeof rawValue === "number"
      ? `${config.prefix || ""}${rawValue}${config.suffix || ""}`
      : String(rawValue)

  const isAtFinal = stepIndex >= config.values.length - 1

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card/95 via-card/75 to-card/95 p-6 text-center shadow-lg shadow-black/5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300 backdrop-blur-xl"
    >
      {/* Top 3D Edge Light Beam Accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top Floating Extruded Icon Box */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="relative flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/30 transition-transform duration-300 ease-out group-hover:scale-110">
          <Icon className="size-5" aria-hidden="true" />
        </span>

        {/* Live Loop Pulse Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-[9px] font-normal text-primary shadow-2xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          LOOP ACTIVE
        </span>
      </div>

      {/* Main Looping Counter Display */}
      <div className="relative z-10 my-4 space-y-1">
        <div className="flex items-center justify-center gap-1">
          <span className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-primary/75 transition-all duration-150">
            {displayString}
          </span>
        </div>

        {/* Label */}
        <p className="text-base font-normal text-foreground tracking-tight">{label}</p>
      </div>

      {/* Subtitle & Telemetry Footer */}
      <div className="relative z-10 border-t border-border/40 pt-3 text-xs text-muted-foreground/90 font-medium">
        <p className="leading-relaxed">{sub}</p>
      </div>
    </motion.div>
  )
}
