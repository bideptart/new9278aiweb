"use client"

import { CalendarDays, Check, Lock, RefreshCw } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { DAY_LABEL, SLOTS, statusFor, type SlotStatus, type Step } from "./constants"

const STATUS_LABEL: Record<SlotStatus, string> = {
  busy: "Busy",
  free: "Open",
  checking: "Checking...",
  candidate: "Available",
  booked: "Booked",
}

function SlotCell({ status, label, delay, reduced }: { status: SlotStatus; label: string; delay: number; reduced: boolean }) {
  return (
    <motion.div
      animate={
        reduced
          ? undefined
          : status === "checking" || status === "candidate"
            ? { scale: [1, 1.035, 1] }
            : { scale: 1 }
      }
      transition={
        status === "checking" || status === "candidate"
          ? { duration: 1.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }
          : { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }
      }
      className={cn(
        "relative flex flex-col justify-between rounded-xl border p-2.5 transition-colors duration-500 md:p-3",
        status === "busy" && "border-border/60 bg-muted/60",
        status === "free" && "border-border/60 bg-background/60",
        status === "checking" && "border-primary/50 bg-primary/[0.07]",
        status === "candidate" && "border-[var(--ai-mint)]/50",
        status === "booked" && "border-transparent",
      )}
      style={
        status === "candidate"
          ? { background: "color-mix(in oklch, var(--ai-mint) 10%, transparent)" }
          : status === "booked"
            ? { background: "var(--ai-mint)" }
            : undefined
      }
    >
      <span
        className={cn(
          "text-[11px] font-normal tabular-nums",
          status === "booked" ? "text-white" : "text-foreground",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "mt-2 inline-flex items-center gap-1 text-[10px] font-medium",
          status === "busy" && "text-muted-foreground",
          status === "free" && "text-muted-foreground/80",
          status === "checking" && "text-primary",
          status === "candidate" && "text-[var(--ai-mint)]",
          status === "booked" && "text-white",
        )}
      >
        {status === "busy" && <Lock className="h-2.5 w-2.5" aria-hidden />}
        {status === "booked" && <Check className="h-2.5 w-2.5" aria-hidden />}
        {STATUS_LABEL[status]}
      </span>
    </motion.div>
  )
}

export function CalendarDashboard({ step, reduced }: { step: Step; reduced: boolean }) {
  return (
    <div className="ring-gradient card-glow relative flex h-full flex-col overflow-hidden rounded-3xl p-5 md:p-6">
      <span className="scan-line" aria-hidden />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-normal text-foreground">
          <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
          {DAY_LABEL}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[10px] text-muted-foreground">
          <RefreshCw className={cn("h-3 w-3 text-primary", !reduced && "animate-spin [animation-duration:3.5s]")} aria-hidden />
          Synced
        </span>
      </div>

      {/* Slot grid */}
      <div className="relative mt-5 grid flex-1 grid-cols-2 gap-2 md:gap-2.5">
        {SLOTS.map((slot) => {
          const status = statusFor(slot, step)
          const checkIdx = step.checking.indexOf(slot.id)
          const candIdx = step.candidates.indexOf(slot.id)
          const wave = checkIdx >= 0 ? checkIdx : candIdx >= 0 ? candIdx : 0
          return (
            <SlotCell
              key={slot.id}
              status={status}
              label={slot.label}
              delay={reduced ? 0 : wave * 0.14}
              reduced={reduced}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="relative mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" /> Busy
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full border border-border" /> Open
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Checking
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ai-mint)" }} /> Booked
        </span>
      </div>
    </div>
  )
}
