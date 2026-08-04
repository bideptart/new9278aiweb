"use client"

import type { ComponentType } from "react"
import { ClipboardCheck, PhoneIncoming, ShieldCheck } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Three-stage pipeline: incoming call volume → the AI processing shield →
 * CRM logging & escalation. The connector between each stage is a dashed
 * line (reusing the site's .conn-flow drift) with a small glowing packet
 * riding across it on an infinite loop — a second, independent signal of
 * "always moving," on top of the call matrix above it.
 */

type Stage = {
  icon: ComponentType<{ className?: string }>
  title: string
  desc: string
}

const STAGES: Stage[] = [
  {
    icon: PhoneIncoming,
    title: "100+ Incoming Calls",
    desc: "After-hours, overflow, and peak-season spikes — all at once.",
  },
  {
    icon: ShieldCheck,
    title: "AI Processing Shield",
    desc: "Every call answered instantly, triaged, and classified.",
  },
  {
    icon: ClipboardCheck,
    title: "CRM Logged & Escalated",
    desc: "Summary logged; urgent calls routed to a human on call.",
  },
]

function StageCard({ stage }: { stage: Stage }) {
  const Icon = stage.icon
  return (
    <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-4">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 text-primary sm:size-8">
        <Icon className="size-3.5 sm:size-4" />
      </span>
      <p className="mt-2 text-[10px] font-semibold leading-tight text-foreground sm:text-sm">{stage.title}</p>
      <p className="mt-1 hidden text-[11px] leading-snug text-muted-foreground sm:block">{stage.desc}</p>
    </div>
  )
}

function Connector({ delay }: { delay: number }) {
  const reduced = useReducedMotion()
  return (
    <div aria-hidden className="relative w-5 shrink-0 self-center sm:w-10">
      <svg className="block h-3 w-full overflow-visible" preserveAspectRatio="none">
        <line
          x1="0"
          y1="6"
          x2="100%"
          y2="6"
          stroke="var(--primary)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
          className="conn-flow"
        />
      </svg>
      {!reduced && (
        <motion.span
          className="absolute top-1/2 size-[6px] -translate-y-1/2 rounded-full"
          style={{ background: "var(--ai-magenta)", boxShadow: "0 0 8px 2px var(--primary)" }}
          animate={{ left: ["-10%", "110%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay }}
        />
      )}
    </div>
  )
}

export function PipelineDiagram() {
  return (
    <div>
      <div aria-hidden className="flex items-stretch">
        <StageCard stage={STAGES[0]} />
        <Connector delay={0} />
        <StageCard stage={STAGES[1]} />
        <Connector delay={0.55} />
        <StageCard stage={STAGES[2]} />
      </div>
      <p className="sr-only">
        Pipeline: over one hundred incoming calls flow into the AI processing shield, which answers, triages, and
        classifies every one, then logs a summary to the CRM and escalates urgent calls to a human.
      </p>
    </div>
  )
}
