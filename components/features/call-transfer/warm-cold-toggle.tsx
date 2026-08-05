"use client"

import { useState } from "react"
import { ArrowRight, Bot, FileText, Headset, Mic, User, type LucideIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * WarmColdToggle
 * Segmented control (hand-rolled, not Radix Tabs, so the sliding pill can
 * use a `layoutId` spring) that swaps both the copy and the mini diagram
 * below it between the two transfer modes.
 */
type Mode = "warm" | "cold"

const CONTENT: Record<Mode, { title: string; description: string; points: string[] }> = {
  warm: {
    title: "The AI stays on the line",
    description:
      "The AI agent bridges the customer into a live three-way call, briefs the human agent out loud in real time, confirms they're ready to take over, then exits — the customer never has to repeat themselves.",
    points: [
      "Live spoken briefing before the human ever speaks",
      "AI confirms the hand-off before leaving the call",
      "Best for complex, high-stakes conversations",
    ],
  },
  cold: {
    title: "Routed directly, note attached",
    description:
      "The call routes straight to the next available human agent — no bridging, no wait. Instead of a live briefing, a written AI summary lands on their screen the instant the call rings through.",
    points: [
      "Fastest possible hand-off, zero bridging delay",
      "Written summary note replaces the live briefing",
      "Best for high-volume queues and simple routing",
    ],
  },
}

function NodeIcon({ icon: Icon, label, tone = "primary" }: { icon: LucideIcon; label: string; tone?: "primary" | "magenta" }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl border",
          tone === "magenta" ? "border-[var(--ai-magenta)]/40 text-[var(--ai-magenta)]" : "border-primary/40 text-primary",
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

function WarmDiagram() {
  return (
    <div className="flex items-center justify-between gap-1">
      <NodeIcon icon={User} label="Customer" />
      <div className="flex flex-1 flex-col items-center gap-1 px-1">
        <span className="h-px w-full bg-gradient-to-r from-primary/60 via-primary/60 to-[var(--ai-magenta)]/60" />
        <span className="text-[9px] text-muted-foreground">3-way bridge</span>
      </div>
      <NodeIcon icon={Bot} label="AI" />
      <div className="flex flex-1 flex-col items-center gap-1 px-1">
        <Mic className="size-3.5 text-primary" aria-hidden />
        <span className="text-[9px] text-muted-foreground">live brief</span>
      </div>
      <NodeIcon icon={Headset} label="Human" tone="magenta" />
    </div>
  )
}

function ColdDiagram() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between gap-2">
        <NodeIcon icon={User} label="Customer" />
        <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-[var(--ai-magenta)]/60" />
        <NodeIcon icon={Headset} label="Human" tone="magenta" />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[10px] text-muted-foreground">
        <FileText className="size-3.5 text-[var(--ai-magenta)]" aria-hidden />
        Summary note delivered async
      </div>
    </div>
  )
}

export function WarmColdToggle() {
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<Mode>("warm")
  const content = CONTENT[mode]
  const transitionDuration = reduced ? 0 : 0.35

  return (
    <div>
      <div role="tablist" aria-label="Transfer type" className="relative inline-flex rounded-full border border-border/60 bg-card/40 p-1">
        {(["warm", "cold"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors",
              mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {mode === m && (
              <motion.span
                layoutId="warm-cold-pill"
                className="btn-ai absolute inset-0 -z-10 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {m === "warm" ? "Warm transfer" : "Cold transfer"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl font-normal tracking-tight">{content.title}</h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{content.description}</p>
            <ul className="mt-5 space-y-2.5">
              {content.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-diagram`}
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            className="glass card-glow rounded-2xl border border-border/50 p-6"
          >
            {mode === "warm" ? <WarmDiagram /> : <ColdDiagram />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
