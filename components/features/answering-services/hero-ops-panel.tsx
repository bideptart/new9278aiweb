"use client"

import { Radio } from "lucide-react"
import { CallMatrix } from "@/components/features/answering-services/call-matrix"
import { PipelineDiagram } from "@/components/features/answering-services/pipeline-diagram"
import { StatsTicker } from "@/components/features/answering-services/stats-ticker"

/**
 * The hero centerpiece for /features/answering-services: an "ops console"
 * card stacking the concurrent-call matrix, the live stats row, and the
 * incoming → shield → CRM pipeline. Reads off the site's normal
 * --primary / --ai-violet / --background tokens, so it matches the
 * visitor's actual light/dark theme — no bespoke colors here.
 */
export function HeroOpsPanel() {
  return (
    <div className="ring-gradient card-glow relative overflow-hidden rounded-[28px]">
      <span className="scan-line" aria-hidden />
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />

      {/* Status bar */}
      <div className="relative flex items-center justify-between gap-2 border-b border-border/40 bg-background/60 px-4 py-2.5 md:px-5">
        <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Ops console
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Radio className="h-3 w-3 text-primary" aria-hidden />
          24/7 coverage
        </span>
      </div>

      {/* Matrix */}
      <div className="relative px-4 py-4 md:px-5 md:py-5">
        <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Concurrent call matrix
        </p>
        <CallMatrix />
      </div>

      {/* Stats */}
      <div className="relative border-t border-border/40 bg-background/40 px-4 py-3.5 md:px-5">
        <StatsTicker />
      </div>

      {/* Pipeline */}
      <div className="relative border-t border-border/40 bg-background/60 px-4 py-4 md:px-5">
        <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Call pipeline</p>
        <PipelineDiagram />
      </div>
    </div>
  )
}
