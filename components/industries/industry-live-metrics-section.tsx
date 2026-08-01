"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Zap, ShieldCheck, PhoneCall, DollarSign, Sparkles, Activity, CheckCircle2, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  industryName?: string
}

export function IndustryLiveMetricsSection({ industryName = "Real Estate" }: Props) {
  const [activeCalls, setActiveCalls] = useState(40)
  const reduced = useReducedMotion()

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
  ]

  const metrics = isRealEstate ? realEstateMetrics : defaultMetrics

  return (
    <section className="relative border-y border-border/50 bg-card/20 py-16 md:py-24 backdrop-blur-md overflow-hidden">
      {/* Ambient Red Blur Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-70"
      />

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl border border-white/80 dark:border-white/15 bg-card/85 backdrop-blur-2xl p-6 shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-[1.03]"
              >
                {/* Glow ring on hover */}
                <div className="pointer-events-none absolute -inset-px rounded-3xl border border-transparent transition-colors group-hover:border-primary/40" />

                {/* Card Top Label & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <div className="flex size-7 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon className="size-3.5" />
                    </div>
                    <span>{m.label}</span>
                  </div>

                  {/* Live Status Badge */}
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold border", m.badgeColor)}>
                    <span className={cn("size-1.5 rounded-full animate-ping", m.liveDot)} />
                    {m.highlight}
                  </span>
                </div>

                {/* Main Big Metric Value */}
                <div className="my-3 flex items-baseline justify-between">
                  <p className="text-3xl font-bold tracking-tight text-foreground font-serif group-hover:text-primary transition-colors">
                    {m.value}
                  </p>
                  <ArrowUpRight className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                {/* Subtitle Description */}
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {m.sub}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
