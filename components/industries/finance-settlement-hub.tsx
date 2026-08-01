"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  PhoneCall,
  ShieldCheck,
  Bot,
  User,
  Zap,
  CheckCircle2,
  Lock,
  TrendingUp,
  AlertTriangle,
  Building2,
  ChevronRight,
  Activity,
  Sparkles,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function FinanceSettlementHub() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const scenarios = [
    {
      id: "home-loan-sanction",
      title: "Instant Mortgage Pre-Approval",
      subtitle: "Sub-250ms FICO & DTI Pre-Approval",
      tag: "Pre-Approved $1.5M",
      custMsg: "“Hi, I'm looking for a $1.5 Million commercial mortgage for a property in New York. What rate do I qualify for?”",
      aiMsg: "“Hello David! Your FICO score is 790 with a healthy 28% DTI. You qualify for a 6.2% fixed rate. I've sent your instant pre-approval letter to your email and client portal!”",
      actionStatus: "Pre-Approval Letter Issued",
      systemMetric: "FICO 790 · Experian Synced",
    },
    {
      id: "fraud-card-shield",
      title: "SWIFT Wire Fraud Sentinel",
      subtitle: "Instant Outbound Fraud Verification Call",
      tag: "Account Protected",
      custMsg: "“I just received a security alert for a $125,000 international wire transfer to London! I am in Boston!”",
      aiMsg: "“I have immediately placed an emergency freeze on your account to block the transfer. Your account manager has been alerted and a new security token is being issued.”",
      actionStatus: "Wire Blocked & Vault Locked",
      systemMetric: "Zero Fraud Loss · PCI-DSS 4.0",
    },
    {
      id: "emi-restructure",
      title: "Empathetic Loan Servicing",
      subtitle: "FDCPA & GLBA Compliant Soft Servicing",
      tag: "Grace Period Active",
      custMsg: "“My company payout is delayed by 15 days due to a wire delay. Can I request a short extension on my monthly loan payment?”",
      aiMsg: "“We understand completely, Sarah! I have granted a 20-day grace period with zero late fees. Your ACH auto-debit has been updated accordingly.”",
      actionStatus: "Zero Penalty Extension",
      systemMetric: "GLBA Compliant · ACH Updated",
    },
  ]

  // Auto-cycle scenarios every 3.5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveScenario((prev) => (prev + 1) % scenarios.length)
      }, 3500)
    }
    return () => clearInterval(timer)
  }, [isPlaying, scenarios.length])

  const curSc = scenarios[activeScenario]

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/8 to-transparent blur-3xl opacity-60"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-8">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Award className="size-3.5 text-rose-500" />
            <span>LIVE FINANCIAL VOICE SIMULATOR</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Experience real-time <span className="italic text-rose-600 dark:text-rose-400">banking AI calls.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            See how 9278.ai handles high-value loan intake, fraud alerts, and EMI recovery calls with sub-250ms latency and empathetic human-like tone.
          </p>
        </div>

        {/* 3 Scenario Selector Capsules */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {scenarios.map((sc, idx) => {
            const isSelected = activeScenario === idx
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setActiveScenario(idx)
                  setIsPlaying(false)
                }}
                className={cn(
                  "px-4 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border shadow-xs",
                  isSelected
                    ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-sm scale-105"
                    : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/40"
                )}
              >
                <span className={cn("size-2 rounded-full", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                <span>{sc.title}</span>
              </button>
            )
          })}
        </div>

        {/* Simulation Dialogue & Core Banking Feed (Open Organic Canvas - No Heavy Outer Box!) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={curSc.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 max-w-5xl mx-auto"
          >
            {/* Left Column: Floating Dialogue Bubbles */}
            <div className="lg:col-span-7 space-y-4">
              {/* Customer Speech Bubble */}
              <div className="flex items-start gap-3 max-w-[92%]">
                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-foreground flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <User className="size-4 text-muted-foreground" />
                </div>
                <div className="p-4 rounded-3xl rounded-tl-none bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs md:text-sm text-foreground font-medium leading-relaxed">
                  <p className="text-[10px] font-mono text-muted-foreground font-bold mb-1">Customer Inbound Audio</p>
                  {curSc.custMsg}
                </div>
              </div>

              {/* Financial AI Voice Response Bubble */}
              <div className="flex items-start gap-3 max-w-[95%] ml-auto flex-row-reverse">
                <div className="size-8 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="size-4" />
                </div>
                <div className="p-4 rounded-3xl rounded-tr-none bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 shadow-md text-xs md:text-sm text-foreground font-semibold leading-relaxed">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">9278 Financial AI</span>
                    <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      ⚡ Sub-250ms Response
                    </span>
                  </div>
                  {curSc.aiMsg}
                </div>
              </div>
            </div>

            {/* Right Column: Live Banking Telemetry & Action Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/60 to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-rose-200/80 dark:border-rose-900/50 shadow-xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-foreground">{curSc.title}</span>
                  <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                    {curSc.tag}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <p className="text-[10px] font-mono text-muted-foreground">Action Outcome Status</p>
                  <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{curSc.actionStatus}</p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 space-y-1">
                  <p className="text-[10px] font-mono text-muted-foreground">Core Banking Audit Feed</p>
                  <p className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">{curSc.systemMetric}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3 text-rose-500" />
                    Finacle Synced
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="size-3 text-emerald-500 animate-pulse" />
                    24/7 Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
