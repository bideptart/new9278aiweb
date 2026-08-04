import { ArrowDown, ArrowRight, Headset, MessageSquareText, PhoneOutgoing, Users, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

/**
 * FallbackRouting
 * Short branching decision-flow: try the primary agent, fall through to a
 * second agent, then fan out into three parallel fallbacks so no call is
 * ever dropped. No hooks/animation loops of its own — entrance is handled
 * by the shared StaggerGroup/StaggerItem — so it stays a plain server
 * component even though its children are client components.
 */
function StepNode({
  icon: Icon,
  label,
  sub,
  tone = "primary",
}: {
  icon: LucideIcon
  label: string
  sub: string
  tone?: "primary" | "magenta"
}) {
  const isMagenta = tone === "magenta"
  return (
    <div className="glass card-glow flex flex-1 items-center gap-3 rounded-xl border border-border/50 p-3">
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isMagenta ? "bg-[var(--ai-magenta)]/10 text-[var(--ai-magenta)]" : "bg-primary/10 text-primary",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{label}</p>
        <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-row items-center justify-center gap-2 py-1 md:flex-col md:gap-1 md:px-2 md:py-0">
      <ArrowDown className="size-4 shrink-0 text-muted-foreground/60 md:hidden" aria-hidden />
      <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground/60 md:block" aria-hidden />
      <span className="whitespace-nowrap text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

export function FallbackRouting() {
  return (
    <StaggerGroup className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-2">
      <StaggerItem className="md:min-w-[10rem] md:flex-1">
        <StepNode icon={Headset} label="Try Agent A" sub="Primary on-call" />
      </StaggerItem>
      <StaggerItem>
        <Connector label="no answer" />
      </StaggerItem>
      <StaggerItem className="md:min-w-[10rem] md:flex-1">
        <StepNode icon={Headset} label="Try Agent B" sub="Next in rotation" />
      </StaggerItem>
      <StaggerItem>
        <Connector label="no answer" />
      </StaggerItem>
      <StaggerItem className="flex flex-1 flex-col gap-2 sm:flex-row md:min-w-[20rem]">
        <StepNode icon={MessageSquareText} label="Voicemail" sub="Transcribed & sent" tone="magenta" />
        <StepNode icon={Users} label="Queue" sub="Next available agent" tone="magenta" />
        <StepNode icon={PhoneOutgoing} label="Callback offer" sub="AI offers a call back" tone="magenta" />
      </StaggerItem>
    </StaggerGroup>
  )
}
