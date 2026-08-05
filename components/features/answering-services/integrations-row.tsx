"use client"

import { CheckCircle2, Users, Workflow, LifeBuoy } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Integration badges — plain text labels + generic lucide icons, no
 * third-party marks. Each shows a small "Logged" checkmark that pulses on
 * a staggered loop, selling "the call summary lands here automatically."
 */

const INTEGRATIONS = [
  { icon: Workflow, name: "HubSpot", note: "Contact + call summary synced" },
  { icon: Users, name: "Salesforce", note: "Lead created, activity logged" },
  { icon: LifeBuoy, name: "Zendesk", note: "Ticket opened automatically" },
]

export function IntegrationsRow() {
  const reduced = useReducedMotion()
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {INTEGRATIONS.map((item, i) => (
        <div
          key={item.name}
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/30 px-4 py-3.5"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <item.icon className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-normal text-foreground">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.note}</p>
          </div>
          <motion.span
            aria-hidden
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary"
            animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.4 }}
          >
            <CheckCircle2 className="size-3" aria-hidden />
            Logged
          </motion.span>
        </div>
      ))}
    </div>
  )
}
