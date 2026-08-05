"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Users,
  Clock,
  Receipt,
  UtensilsCrossed,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TableSeed {
  id: number
  seats: number
  baseStatus: "available" | "occupied"
}

const TABLES: TableSeed[] = [
  { id: 1, seats: 2, baseStatus: "occupied" },
  { id: 2, seats: 4, baseStatus: "available" },
  { id: 3, seats: 2, baseStatus: "occupied" },
  { id: 4, seats: 6, baseStatus: "available" },
  { id: 5, seats: 4, baseStatus: "occupied" },
  { id: 6, seats: 2, baseStatus: "available" },
  { id: 7, seats: 8, baseStatus: "occupied" },
  { id: 8, seats: 4, baseStatus: "available" },
]

const STAGES = [
  {
    tableId: 6,
    status: "Call Incoming",
    icon: PhoneCall,
    color: "rose",
    dialogue: "“Riviera Bistro, good evening! I have a table for two at 8:00 PM — would that work for you tonight?”",
  },
  {
    tableId: 6,
    status: "Reserved",
    icon: CheckCircle2,
    color: "emerald",
    dialogue: "Table 06 locked for 2 guests at 8:00 PM. Confirmation SMS dispatched instantly.",
  },
  {
    tableId: 4,
    status: "Walk-in Waitlisted",
    icon: Users,
    color: "amber",
    dialogue: "Table 04 flagged for a 6-guest walk-in — AI is holding a 15-minute courtesy window automatically.",
  },
  {
    tableId: 7,
    status: "Bill Requested",
    icon: Receipt,
    color: "sky",
    dialogue: "Table 07 wrapping up — AI has already logged the check-out call-back for feedback follow-up.",
  },
] as const

const COLOR_MAP: Record<string, string> = {
  rose: "bg-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.55)]",
  emerald: "bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.5)]",
  amber: "bg-amber-500 shadow-[0_0_18px_rgba(245,158,11,0.5)]",
  sky: "bg-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.5)]",
}

export function Restaurant3DFloorPlan() {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStageIndex((i) => (i + 1) % STAGES.length), 3200)
    return () => clearInterval(timer)
  }, [])

  const stage = STAGES[stageIndex]
  const StageIcon = stage.icon

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-20"
      />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          LIVE 3D DINING FLOOR
        </span>
        <h2 className="text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground">
          Every table, <span className="italic text-rose-400 dark:text-rose-400">tracked in real time.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          The AI voice engine reads live floor status before every call — no double-booked tables, no missed walk-ins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Isometric 3D Floor Grid */}
        <div className="lg:col-span-7 [perspective:1400px]">
          <div
            className="mx-auto grid w-full max-w-md grid-cols-4 gap-5 sm:gap-6 [transform:rotateX(52deg)_rotateZ(-38deg)] [transform-style:preserve-3d]"
          >
            {TABLES.map((table) => {
              const isActive = table.id === stage.tableId
              return (
                <motion.div
                  key={table.id}
                  animate={{
                    translateZ: isActive ? 26 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-lg border text-[10px] font-mono font-normal transition-colors duration-300",
                    isActive
                      ? "border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 shadow-xl"
                      : table.baseStatus === "occupied"
                        ? "border-slate-300/70 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/70"
                        : "border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50"
                  )}
                >
                  <span className={cn(!isActive && "text-muted-foreground", isActive && "text-rose-400 dark:text-rose-300")}>
                    T{table.id}
                  </span>
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-sans font-medium text-muted-foreground [transform:rotateZ(38deg)_rotateX(-52deg)] whitespace-nowrap">
                    {table.seats} seats
                  </span>
                  {isActive && (
                    <motion.span
                      key={stageIndex}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={cn("absolute -top-1.5 -right-1.5 size-3 rounded-full ring-2 ring-white dark:ring-slate-900", COLOR_MAP[stage.color])}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Live Status Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-[2rem] border border-rose-200/80 dark:border-rose-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 md:p-7 shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className={cn("flex size-9 items-center justify-center rounded-xl text-white", COLOR_MAP[stage.color].split(" ")[0])}>
                    <StageIcon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-mono font-normal uppercase tracking-wider text-foreground">Table {String(stage.tableId).padStart(2, "0")}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">Live floor sync</p>
                  </div>
                </div>
                <span className="rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 px-3 py-1 text-[10px] font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400">
                  {stage.status}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <UtensilsCrossed className="mt-0.5 size-4 shrink-0 text-rose-400 dark:text-rose-400" />
                <p className="text-sm text-foreground font-serif italic leading-relaxed">{stage.dialogue}</p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                <Clock className="size-3.5 text-rose-400" />
                Floor state refreshes automatically — no manual host-stand updates.
              </div>

              {/* Auto-cycle progress bar */}
              <motion.span
                key={`bar-${stageIndex}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.2, ease: "linear" }}
                style={{ transformOrigin: "left" }}
                className="absolute bottom-0 left-6 right-6 h-1 bg-rose-500 rounded-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
