"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Bot,
  Zap,
  PhoneCall,
  CheckCircle2,
  FileCheck,
  CreditCard,
  Building2,
  Lock,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Sparkles,
  Activity,
  ShieldAlert,
  Fingerprint,
  PieChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinanceHero() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const scenarios = [
    {
      id: "kyc-biometric",
      modeTitle: "Global Biometric KYC Verification",
      subtitle: "Passport, SSN & Instant Voice Biometric Match",
      score: "99.8%",
      scoreLabel: "Identity Confidence",
      badge: "KYC Verified",
      color: "emerald",
      metrics: [
        { label: "Biometric Voice Match", val: "Instant 1:1" },
        { label: "Document Status", val: "US Passport & SSN Synced" },
        { label: "Verification Latency", val: "< 240ms" },
      ],
      nodes: [
        { title: "Voice Biometric", desc: "Acoustic Print Match", icon: Fingerprint },
        { title: "Global KYC Portal", desc: "FATCA / Identity API", icon: ShieldCheck },
        { title: "Instant Clearance", desc: "Vault Unlocked", icon: CheckCircle2 },
      ],
    },
    {
      id: "loan-underwriting",
      modeTitle: "Cross-Border AI Credit Underwriting",
      subtitle: "Automated Global FICO Score Pull & Mortgage Approval",
      score: "785+",
      scoreLabel: "FICO Credit Score",
      badge: "Pre-Approved $1.5M",
      color: "rose",
      metrics: [
        { label: "Max Loan Sanction", val: "$1,500,000" },
        { label: "DTI Debt Ratio", val: "28% Healthy" },
        { label: "Interest Rate", val: "6.2% Fixed" },
      ],
      nodes: [
        { title: "FICO Bureau", desc: "Score 785 Pulled", icon: TrendingUp },
        { title: "Income Analysis", desc: "W2 & Bank Audit", icon: PieChart },
        { title: "Pre-Sanction Letter", desc: "Auto-Issued PDF", icon: Zap },
      ],
    },
    {
      id: "fraud-sentinel",
      modeTitle: "24/7 Global SWIFT Fraud Sentinel",
      subtitle: "Suspicious Wire Transfer Detection & Voice OTP Shield",
      score: "0.01%",
      scoreLabel: "Risk Exposure",
      badge: "Shield Active",
      color: "rose",
      metrics: [
        { label: "Flagged Wire Txn", val: "$125,000 Alert" },
        { label: "Voice OTP Auth", val: "Passed in 10s" },
        { label: "Account Status", val: "PCI-DSS Protected" },
      ],
      nodes: [
        { title: "Anomaly Alert", desc: "Geo-Velocity Trigger", icon: ShieldAlert },
        { title: "Outbound AI Call", desc: "2-Factor Voice OTP", icon: PhoneCall },
        { title: "Account Shield", desc: "PCI-DSS 4.0 Lock", icon: Lock },
      ],
    },
  ]

  // Auto-rotate modes every 3.5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % scenarios.length)
      }, 3500)
    }
    return () => clearInterval(timer)
  }, [isPlaying, scenarios.length])

  const curSc = scenarios[activeTab]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/8 to-transparent blur-3xl opacity-70"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <nav aria-label="Breadcrumb" className="mb-2">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/industries" className="hover:text-foreground transition-colors">
                    Industries
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-foreground font-medium">Finance & Banking</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
                </span>
                <DollarSign className="size-3.5 text-rose-500" />
                <span className="font-bold">FINANCE & BANKING VOICE ENGINE</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md">
                <ShieldCheck className="size-3.5 text-rose-500" />
                GLBA, GDPR & PCI-DSS 4.0 Compliant
              </span>
            </div>

            <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
              AI voice agents for <span className="italic text-rose-600 dark:text-rose-400">global banking & finance.</span>
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Automate international mortgage pre-screening, global KYC document intake, and SWIFT fraud alert response on 24/7 compliant AI voice calls. Connect Fiserv, Salesforce Financial Services & Core Banking in 3 minutes.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="group btn-ai h-12 rounded-full px-8 shadow-md font-bold cursor-pointer">
                <Link href="/get-started?industry=finance">
                  Get started <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-8 backdrop-blur-md hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 transition-all font-semibold cursor-pointer"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">3.2x</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Loan Conversion Rate</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">&lt; 240ms</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Voice Latency</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">100%</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">PCI-DSS Audit Compliant</p>
              </div>
            </div>
          </div>

          {/* Right Column: BRAND-NEW UNIQUE Holographic Financial Radar Command Node (NO BOX CARDS!) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[500px]">
            
            {/* Top Interactive Mode Capsule Bar */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md backdrop-blur-xl mb-8 z-20">
              {scenarios.map((sc, idx) => {
                const isSelected = activeTab === idx
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(idx)
                      setIsPlaying(false)
                    }}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-mono font-bold rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5",
                      isSelected
                        ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs scale-105"
                        : "text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50"
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                    <span>{sc.id === "kyc-biometric" ? "KYC Biometric" : sc.id === "loan-underwriting" ? "Loan Underwriting" : "Fraud Sentinel"}</span>
                  </button>
                )
              })}
            </div>

            {/* Central Orbital Financial AI Radar Canvas (Circular Graphic Canvas) */}
            <div className="relative size-[340px] md:size-[380px] flex items-center justify-center">
              
              {/* Outer Glowing Concentric Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-rose-200/60 dark:border-rose-900/40 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-dashed border-rose-300/40 dark:border-rose-800/40 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-14 rounded-full border border-slate-200/80 dark:border-slate-800 bg-rose-500/5 backdrop-blur-xs" />

              {/* Pulsing Radar Scanning Line */}
              <div className="absolute size-full rounded-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-rose-500/80 to-transparent origin-left animate-[spin_4s_linear_infinite]" />
              </div>

              {/* Central Core Financial Telemetry Orb */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={curSc.id}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10 size-44 md:size-48 rounded-full bg-white/95 dark:bg-slate-900/95 border-2 border-rose-200 dark:border-rose-800 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center p-4 text-center space-y-1"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                    {curSc.badge}
                  </span>

                  <div className="text-3xl md:text-4xl font-serif font-extrabold text-foreground tracking-tight pt-1">
                    {curSc.score}
                  </div>

                  <span className="text-[10px] font-mono font-bold text-muted-foreground">
                    {curSc.scoreLabel}
                  </span>

                  {/* Live Status Indicator */}
                  <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Activity className="size-2.5 animate-pulse" />
                    <span>24/7 AI Stream Active</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 3 Orbiting Satellite Telemetry Nodes Around the Core Circle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`nodes-${curSc.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  aria-live="polite"
                >
                  {/* Orbiting Satellite Node 1 (Top Left) */}
                  {(() => {
                    const NodeIcon = curSc.nodes[0].icon
                    return (
                      <div className="absolute -top-3 left-0 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-800 shadow-lg backdrop-blur-md flex items-center gap-2 z-20 max-w-[170px]">
                        <div className="size-7 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <NodeIcon className="size-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] font-bold text-foreground truncate">{curSc.nodes[0].title}</p>
                          <p className="text-[9px] font-mono text-muted-foreground truncate">{curSc.nodes[0].desc}</p>
                        </div>
                      </div>
                    )
                  })()}

                  {/* Orbiting Satellite Node 2 (Top Right) */}
                  {(() => {
                    const NodeIcon = curSc.nodes[1].icon
                    return (
                      <div className="absolute -top-3 right-0 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-800 shadow-lg backdrop-blur-md flex items-center gap-2 z-20 max-w-[170px]">
                        <div className="size-7 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <NodeIcon className="size-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] font-bold text-foreground truncate">{curSc.nodes[1].title}</p>
                          <p className="text-[9px] font-mono text-muted-foreground truncate">{curSc.nodes[1].desc}</p>
                        </div>
                      </div>
                    )
                  })()}

                  {/* Orbiting Satellite Node 3 (Bottom Center) */}
                  {(() => {
                    const NodeIcon = curSc.nodes[2].icon
                    return (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-800 shadow-xl backdrop-blur-md flex items-center gap-2 z-20 max-w-[210px]">
                        <div className="size-7 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <NodeIcon className="size-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] font-bold text-foreground truncate">{curSc.nodes[2].title}</p>
                          <p className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold truncate">{curSc.nodes[2].desc}</p>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Bottom Live Metrics Pill Dock */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${curSc.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md mt-6 grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md backdrop-blur-xl text-center"
              >
                {curSc.metrics.map((m, idx) => (
                  <div key={idx} className="p-1.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30">
                    <p className="text-[9px] font-mono font-medium text-muted-foreground truncate">{m.label}</p>
                    <p className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 truncate mt-0.5">{m.val}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  )
}
