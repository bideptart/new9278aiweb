"use client"

import { useState } from "react"
import { motion } from "motion/react"
import {
  Wrench,
  Flame,
  Droplets,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Activity,
  Award,
  DollarSign,
  Radio,
  Globe,
  Cpu,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function HomeServicesIntegrations() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0)

  const integrations = [
    {
      id: "servicetitan",
      name: "ServiceTitan REST API",
      category: "FIELD SERVICE PLATFORM",
      speed: "< 180ms REST API",
      status: "Verified 2-Way Sync",
      desc: "Real-time technician calendar booking, arrival window SMS dispatch, and emergency job tagging directly on ServiceTitan.",
      bullets: ["2-Way Calendar Sync", "GPS Route Link Texting", "Priority Emergency Tag"],
      icon: Flame,
    },
    {
      id: "housecall-pro",
      name: "Housecall Pro Gateway",
      category: "DISPATCH & INVOICING",
      speed: "Real-Time Webhook",
      status: "Active Connector",
      desc: "Auto-creates customer work orders, logs after-hours intake notes, and dispatches invoice links to homeowners.",
      bullets: ["Work Order Intake", "Diagnostic Fee Invoice", "Call Recording Log"],
      icon: Droplets,
    },
    {
      id: "jobber",
      name: "Jobber Dispatch Board",
      category: "CONTRACTOR SCHEDULING",
      speed: "< 200ms REST Sync",
      status: "Live Integration",
      desc: "Direct booking on technician route windows, automated estimate follow-ups, and arrival window texts.",
      bullets: ["Route Window Booking", "Estimate Follow-Up", "Customer SMS Updates"],
      icon: Truck,
    },
    {
      id: "quickbooks",
      name: "QuickBooks & Zapier",
      category: "ACCOUNTING & CRM",
      speed: "Instant Webhook",
      status: "Automated Connector",
      desc: "Instant customer account creation, automated diagnostic deposit logging, and zero-latency accounting sync.",
      bullets: ["Automated Account Logging", "Diagnostic Deposit Sync", "5,000+ Zapier Apps"],
      icon: Cpu,
    },
    {
      id: "stripe-square",
      name: "Stripe & Square IVR",
      category: "PCI-DSS PAYMENT RELAY",
      speed: "PCI-DSS 4.0 Webhook",
      status: "PCI-DSS Registered",
      desc: "Secures after-hours diagnostic fee deposits via automated 1-click SMS payment links with 100% PCI-DSS encryption.",
      bullets: ["1-Click Deposit Link", "Automated Receipt SMS", "Zero No-Show Guarantee"],
      icon: DollarSign,
    },
  ]

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Rose Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/12 via-amber-500/8 to-transparent blur-3xl opacity-70"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Globe className="size-3.5 text-rose-300" />
            <span>CONTINUOUS 3D INTEGRATION CONVEYOR</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Contractor software <span className="italic text-rose-400 dark:text-rose-400">integration conveyor.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Hover or tap any field service software badge in the conveyor ribbon below to inspect 2-way REST API latency and calendar sync.
          </p>
        </div>

        {/* 60 FPS GPU-ACCELERATED RIBBON CONVEYOR */}
        <div className="max-w-5xl mx-auto space-y-3">
          {integrations.map((ig, idx) => {
            const isHovered = hoveredIdx === idx
            const Icon = ig.icon

            return (
              <div
                key={ig.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(idx)}
                className={cn(
                  "p-5 md:p-6 rounded-3xl transition-all duration-300 ease-out cursor-pointer border shadow-xs backdrop-blur-xl transform-gpu",
                  isHovered
                    ? "bg-gradient-to-r from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-rose-300 dark:border-rose-700 shadow-xl ring-2 ring-rose-400/20 scale-[1.01]"
                    : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-rose-200 hover:bg-rose-50/30 scale-100"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "size-10 rounded-2xl flex items-center justify-center shrink-0 border transition-colors duration-300",
                      isHovered
                        ? "bg-rose-500/15 text-rose-400 dark:text-rose-400 border-rose-300 dark:border-rose-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                    )}>
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">
                        {ig.category}
                      </span>
                      <h3 className="text-base md:text-lg font-serif font-bold text-foreground mt-0.5">{ig.name}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      ⚡ {ig.speed}
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-400 dark:text-rose-400 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900/50">
                      {ig.status}
                    </span>
                  </div>
                </div>

                {/* 60 FPS Native CSS Grid Height Expansion (Zero JS Layout Stutter) */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out overflow-hidden",
                    isHovered ? "grid-template-rows-[1fr] opacity-100 pt-3" : "grid-template-rows-[0fr] opacity-0 pt-0"
                  )}
                  style={{
                    gridTemplateRows: isHovered ? "1fr" : "0fr",
                  }}
                >
                  <div className="min-h-0 space-y-3 border-t border-slate-200/60 dark:border-slate-800 pt-3">
                    <p className="text-xs font-mono text-muted-foreground font-medium leading-relaxed">
                      {ig.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {ig.bullets.map((b, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-foreground bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                          <CheckCircle2 className="size-3 text-rose-300 shrink-0" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
