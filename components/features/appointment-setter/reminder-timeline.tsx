import { Bell, BellRing, CalendarCheck, MessageCircle } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

const TIMELINE = [
  { icon: CalendarCheck, label: "Booked", detail: "SMS confirmation sent instantly" },
  { icon: Bell, label: "24h reminder", detail: "Automated nudge the day before" },
  { icon: BellRing, label: "1h reminder", detail: "Final heads-up before arrival" },
  { icon: MessageCircle, label: "Post-visit follow-up", detail: "Thank-you + review request" },
] as const

/** Booked → 24h → 1h → post-visit, as a connected timeline. A single line
    runs behind every node; it's vertical on mobile, horizontal from `sm` up. */
export function ReminderTimeline() {
  return (
    <StaggerGroup className="relative grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-4">
      <div
        aria-hidden
        className="absolute left-[15px] top-2 bottom-2 w-px bg-border/70 sm:left-4 sm:right-4 sm:top-4 sm:bottom-auto sm:h-px sm:w-auto"
      />
      {TIMELINE.map((step) => {
        const Icon = step.icon
        return (
          <StaggerItem key={step.label} className="relative flex items-start gap-4 sm:flex-col sm:items-start sm:gap-3">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{step.label}</p>
              <p className="mt-0.5 text-pretty text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}
