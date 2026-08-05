import { AlertTriangle, FileText, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ContextSummaryCard
 * The AI-generated hand-off note that "travels" from the AI node to the
 * human-agent node in <HeroTransferGraph>, and gets reused verbatim inside
 * <AgentScreenCard> so the same mock summary reinforces the story in both
 * places. `bare` drops the glass/border chrome so it can be dropped into a
 * differently-styled parent container (e.g. the softphone mock).
 */
const SUMMARY_BULLETS = [
  { icon: User, text: "Caller: Jane D." },
  { icon: FileText, text: "Reason: Billing dispute on invoice #4021" },
  { icon: AlertTriangle, text: "Sentiment: Frustrated, needs escalation" },
] as const

export function ContextSummaryCard({
  className,
  bare = false,
  label = "AI summary",
}: {
  className?: string
  bare?: boolean
  label?: string
}) {
  return (
    <div
      className={cn(
        !bare && "glass card-glow w-52 rounded-2xl border border-primary/20 p-3 shadow-none sm:w-56",
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-1.5 text-[9px] font-normal uppercase tracking-[0.16em] text-primary">
        <Sparkles className="size-3" aria-hidden />
        {label}
      </div>
      <ul className="space-y-1.5">
        {SUMMARY_BULLETS.map((b) => (
          <li key={b.text} className="flex items-start gap-1.5 text-[11px] leading-snug text-foreground/85">
            <b.icon className="mt-0.5 size-3 shrink-0 text-[var(--ai-magenta)]" aria-hidden />
            <span>{b.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
