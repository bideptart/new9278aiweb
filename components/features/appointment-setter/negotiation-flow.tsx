import type { LucideIcon } from "lucide-react"
import { ArrowRight, CheckCircle2, ListChecks, MessageCircleQuestion, XCircle } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

type FlowStep = {
  icon: LucideIcon
  label: string
  detail: string
  final?: boolean
}

const FLOW: FlowStep[] = [
  {
    icon: MessageCircleQuestion,
    label: "Requested",
    detail: "“Anything Thursday afternoon?”",
  },
  {
    icon: XCircle,
    label: "Unavailable",
    detail: "2:00 PM is already booked",
  },
  {
    icon: ListChecks,
    label: "Alternatives offered",
    detail: "3:00 PM and 3:30 PM open up",
  },
  {
    icon: CheckCircle2,
    label: "Confirmed",
    detail: "Locked in for 3:00 PM",
    final: true,
  },
]

/** Requested → unavailable → alternatives → confirmed, as a connected
    4-step flow. Stacks vertically below `sm`, runs left-to-right above it. */
export function NegotiationFlow() {
  return (
    <StaggerGroup className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2 md:gap-3">
      {FLOW.map((step, i) => {
        const Icon = step.icon
        return (
          <div key={step.label} className="flex flex-1 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <StaggerItem className="flex-1">
              <div
                className={cn(
                  "flex h-full flex-col gap-2 rounded-2xl border p-4",
                  step.final ? "border-[var(--ai-mint)]/45" : "border-border/60 bg-card/40",
                )}
                style={step.final ? { background: "color-mix(in oklch, var(--ai-mint) 8%, transparent)" } : undefined}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    step.final ? "text-white" : "text-primary",
                  )}
                  style={
                    step.final
                      ? { background: "var(--ai-mint)" }
                      : { background: "color-mix(in oklch, var(--primary) 12%, transparent)" }
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
                <p className="text-pretty text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            </StaggerItem>

            {i < FLOW.length - 1 && (
              <span aria-hidden className="flex shrink-0 items-center justify-center text-border">
                <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
              </span>
            )}
          </div>
        )
      })}
    </StaggerGroup>
  )
}
