import { Phone } from "lucide-react"
import { ContextSummaryCard } from "./context-summary-card"

/**
 * AgentScreenCard
 * A mock softphone/browser window showing the incoming-transfer notification
 * with the AI-generated summary already populated — before the human agent
 * has even picked up. Purely presentational (the ringing pulse is the
 * existing `.pulse-ring` CSS keyframe), so it stays a plain server-renderable
 * component with no client boundary of its own.
 */
export function AgentScreenCard() {
  return (
    <div className="ring-gradient card-glow relative overflow-hidden rounded-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-background/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[var(--ai-magenta)]/50" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--ai-mint)]/60" aria-hidden />
        <span className="size-2.5 rounded-full bg-primary/50" aria-hidden />
        <span className="ml-3 truncate text-[10px] text-muted-foreground">Agent softphone — 9278.ai</span>
      </div>

      <div className="p-5">
        {/* incoming call banner */}
        <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <span className="pulse-ring absolute inset-0 rounded-full text-primary/50" aria-hidden />
            <Phone className="relative size-4 text-primary" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-normal text-foreground">Incoming transfer · Jane D.</p>
            <p className="truncate text-xs text-muted-foreground">Forwarded from AI Agent · ringing</p>
          </div>
        </div>

        {/* AI summary — already on screen before pickup */}
        <ContextSummaryCard
          bare
          label="AI summary — ready before pickup"
          className="mt-4 rounded-xl border border-border/50 bg-background/50 p-4"
        />

        {/* decorative actions */}
        <div className="mt-4 flex gap-2">
          <span className="btn-ai flex-1 rounded-lg px-3 py-2 text-center text-xs font-medium">Answer with context</span>
          <span className="flex-1 rounded-lg border border-border/60 px-3 py-2 text-center text-xs font-medium text-muted-foreground">
            Decline
          </span>
        </div>
      </div>
    </div>
  )
}
