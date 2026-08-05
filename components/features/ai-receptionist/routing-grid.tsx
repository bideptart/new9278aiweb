import { TrendingUp, Headset, CreditCard, Siren, Voicemail, type LucideIcon } from "lucide-react"

/**
 * Static breakdown of how a call gets routed once intent is identified.
 * No client-side state needed — plain presentational cards, meant to be
 * wrapped in StaggerGroup/StaggerItem by the page that renders it.
 */

export const ROUTING_RULES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: TrendingUp,
    title: "Sales",
    description: "Pricing questions and new leads route straight to your sales queue with full call context attached.",
  },
  {
    icon: Headset,
    title: "Support",
    description: "Existing customers with product questions reach support — no re-explaining the issue.",
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Invoice and payment questions go to billing, with the account already looked up.",
  },
  {
    icon: Siren,
    title: "Emergency",
    description: "Urgent, time-sensitive calls skip the queue and ring your on-call line immediately.",
  },
  {
    icon: Voicemail,
    title: "Everything else",
    description: "Answered on the spot from the knowledge base, or logged as a detailed message for your team.",
  },
]

export function RoutingCard({ icon: Icon, title, description }: (typeof ROUTING_RULES)[number]) {
  return (
    <div className="glass card-glow flex h-full flex-col gap-3 rounded-xl border border-border/50 p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-normal tracking-tight text-foreground">{title}</p>
        <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
