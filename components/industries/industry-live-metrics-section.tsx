"use client"

import { Zap, ShieldCheck, PhoneCall, DollarSign, Activity, TrendingUp, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  industryName?: string
}

export function IndustryLiveMetricsSection({ industryName = "Real Estate" }: Props) {
  const isRealEstate = industryName.toLowerCase().includes("real estate")

  const realEstateMetrics = [
    {
      id: "speed",
      label: "FIRST-TOUCH RESPONSE",
      value: "< 3 sec",
      highlight: "Instant Pickup",
      sub: "Answer Housing.com, MagicBricks, and 99acres leads in under 3 seconds 24/7.",
      icon: Zap,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      liveDot: "bg-primary",
    },
    {
      id: "capacity",
      label: "CONCURRENT CALLS",
      value: "Up to 40",
      highlight: "Zero Busy Signals",
      sub: "Handle peak campaign call bursts simultaneously without dead air or voicemail.",
      icon: PhoneCall,
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      liveDot: "bg-emerald-500",
    },
    {
      id: "rate",
      label: "PER-MINUTE RATE",
      value: "From ₹10",
      highlight: "Pay-As-You-Go",
      sub: "Transparent per-minute pricing for high ROI across starter and scale tiers.",
      icon: DollarSign,
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      liveDot: "bg-blue-500",
    },
    {
      id: "uptime",
      label: "UPTIME RELIABILITY",
      value: "99.9%",
      highlight: "Always-On 24/7",
      sub: "Carrier-grade Indian connectivity with automated failover and zero downtime.",
      icon: ShieldCheck,
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      liveDot: "bg-amber-500",
    },
    {
      id: "booking",
      label: "SITE-VISIT BOOKINGS",
      value: "+340%",
      highlight: "Auto Calendar",
      sub: "Direct Google Calendar & CRM booking during initial phone conversation.",
      icon: TrendingUp,
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      liveDot: "bg-purple-500",
    },
  ]

  const defaultMetrics = [
    {
      id: "speed",
      label: "RESPONSE SPEED",
      value: "< 3s",
      highlight: "247ms Latency",
      sub: `Every ${industryName.toLowerCase()} call answered instantly 24/7 without voicemail.`,
      icon: Zap,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      liveDot: "bg-primary",
    },
    {
      id: "hipaa",
      label: "COMPLIANCE & SECURITY",
      value: "100% BAA",
      highlight: "AES-256 Encrypted",
      sub: "Encrypted audio streams, executed compliance agreements, and secure logs.",
      icon: ShieldCheck,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      liveDot: "bg-primary",
    },
    {
      id: "capacity",
      label: "CONCURRENT CAPACITY",
      value: "Unlimited",
      highlight: "Active Calls",
      sub: "Handle hundreds of simultaneous calls without dead air or busy signals.",
      icon: PhoneCall,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      liveDot: "bg-primary",
    },
    {
      id: "rate",
      label: "PER-MINUTE RATE",
      value: "From ₹10",
      highlight: "70% Cost Reduction",
      sub: "Transparent pay-as-you-go pricing with zero seat licenses or hidden fees.",
      icon: DollarSign,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      liveDot: "bg-primary",
    },
    {
      id: "resolution",
      label: "FIRST-CALL RESOLUTION",
      value: "94.2%",
      highlight: "Real-time AI",
      sub: "Instant qualification, CRM data lookup, and immediate transfer execution.",
      icon: Activity,
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      liveDot: "bg-primary",
    },
  ]

  const metricsList = isRealEstate ? realEstateMetrics : defaultMetrics
  // Duplicate metrics array 4 times for smooth continuous infinite horizontal scrolling from right to left
  const duplicatedMetrics = [...metricsList, ...metricsList, ...metricsList, ...metricsList]

  return (
    <section className="relative border-y border-border/50 bg-card/20 py-16 md:py-24 backdrop-blur-md overflow-hidden">
      {/* Ambient Red Blur Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-70"
      />

      {/* Hardware-Accelerated Smooth GPU Live Marquee Container */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div className="animate-live-marquee gap-6 py-2 px-4">
          {duplicatedMetrics.map((m, idx) => {
            const Icon = m.icon
            return (
              <div
                key={`${m.id}-${idx}`}
                className="group relative w-[300px] sm:w-[340px] shrink-0 rounded-3xl border border-white/80 dark:border-white/15 bg-card/90 backdrop-blur-xl p-6 shadow-lg transition-all duration-200 hover:border-primary/50 hover:shadow-2xl hover:scale-[1.01] transform-gpu"
              >
                {/* Glow ring on hover */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent transition-colors group-hover:border-primary/40" />

                {/* Card Top Label & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                    <div className="flex size-7 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="size-3.5" />
                    </div>
                    <span>{m.label}</span>
                  </div>

                  {/* Live Status Badge */}
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-normal border", m.badgeColor)}>
                    <span className={cn("size-1.5 rounded-full animate-ping", m.liveDot)} />
                    {m.highlight}
                  </span>
                </div>

                {/* Main Big Metric Value */}
                <div className="my-3 flex items-baseline justify-between">
                  <p className="text-3xl font-normal tracking-tight text-foreground font-serif group-hover:text-primary transition-colors">
                    {m.value}
                  </p>
                  <ArrowUpRight className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                {/* Subtitle Description */}
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  {m.sub}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
