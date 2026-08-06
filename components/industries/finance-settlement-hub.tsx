"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShieldCheck,
  Bot,
  User,
  Lock,
  CheckCircle2,
  Award,
  Play,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 3500
const BARCODE_WIDTHS = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1, 2, 1, 3, 2, 1, 4, 1, 2]

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
      }, AUTOPLAY_MS)
    }
    return () => clearInterval(timer)
  }, [isPlaying, scenarios.length])

  const curSc = scenarios[activeScenario]
  const angleFor = (idx: number) => -90 + idx * (360 / scenarios.length)
  const needleAngle = angleFor(activeScenario)

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/8 to-transparent blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-6">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Award className="size-3.5 text-rose-300" />
            <span>LIVE VAULT DIAL SIMULATOR</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Experience real-time <span className="italic text-rose-400 dark:text-rose-400">banking AI calls.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Turn the vault dial to any scenario below and read the printed transaction receipt for that live banking call.
          </p>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-rose-200 dark:border-rose-900/50 bg-white/80 dark:bg-slate-900/80 px-3.5 py-1.5 text-[11px] font-normal text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="size-3 fill-current" /> : <Play className="size-3 fill-current" />}
            {isPlaying ? "Pause Autoplay" : "Resume Autoplay"}
          </button>
        </div>

        {/* Side-by-side: rotating vault dial on the left, printed receipt on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl mx-auto">

          {/* VAULT COMBINATION DIAL */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-square w-[260px] sm:w-[300px]">
              {/* Autoplay progress ring (native SMIL — no framer SVG quirks) */}
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
                <circle cx="50" cy="50" r="47" fill="none" stroke="rgb(251 113 133 / 0.15)" strokeWidth="1.5" />
                {isPlaying && (
                  <circle
                    cx="50" cy="50" r="47" fill="none"
                    stroke="rgb(253 164 175)" strokeWidth="1.5" strokeLinecap="round"
                    strokeDasharray={295} strokeDashoffset={295}
                  >
                    <animate
                      key={activeScenario}
                      attributeName="stroke-dashoffset"
                      from="295" to="0"
                      dur={`${AUTOPLAY_MS / 1000}s`}
                      fill="freeze"
                      repeatCount="1"
                    />
                  </circle>
                )}
              </svg>

              {/* Dial face */}
              <div className="absolute inset-[8%] rounded-full border-2 border-rose-200/60 dark:border-rose-900/40 bg-gradient-to-br from-white via-rose-50/50 to-slate-50 dark:from-slate-900 dark:to-slate-950 shadow-inner" />

              {/* Minor tick marks */}
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[6%] w-px bg-rose-300/50 dark:bg-rose-800/50 origin-bottom"
                  style={{ transform: `rotate(${i * 15}deg) translateY(-42%)` }}
                />
              ))}

              {/* Rotating needle */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-[34%] w-[3px] origin-bottom rounded-full bg-gradient-to-t from-rose-300 to-rose-100 z-[5]"
                style={{ marginLeft: -1.5, marginTop: "-34%" }}
                animate={{ rotate: needleAngle }}
                transition={{ type: "spring", stiffness: 85, damping: 13 }}
              />

              {/* Center vault hub */}
              <div className="absolute left-1/2 top-1/2 z-10 flex size-14 sm:size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-950/50 dark:to-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400 shadow-md">
                <Lock className="size-5 sm:size-6" />
              </div>

              {/* Scenario position markers */}
              {scenarios.map((sc, idx) => {
                const angle = (angleFor(idx) * Math.PI) / 180
                const radius = 44
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                const isSelected = idx === activeScenario

                return (
                  <button
                    key={sc.id}
                    type="button"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => {
                      setActiveScenario(idx)
                      setIsPlaying(false)
                    }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    aria-label={sc.title}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-full border font-mono text-[10px] font-normal transition-all duration-300",
                        isSelected
                          ? "size-9 bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 text-rose-400 shadow-md scale-110"
                          : "size-7 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-rose-200"
                      )}
                    >
                      {idx + 1}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* PRINTED TRANSACTION RECEIPT */}
          <div className="lg:col-span-7 flex justify-center [perspective:1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={curSc.id}
                initial={{ opacity: 0, rotateX: -8, y: -10 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 8, y: 10 }}
                transition={{ duration: 0.3 }}
                style={{
                  clipPath:
                    "polygon(0% 0%,100% 0%,100% 90%,95% 100%,90% 90%,85% 100%,80% 90%,75% 100%,70% 90%,65% 100%,60% 90%,55% 100%,50% 90%,45% 100%,40% 90%,35% 100%,30% 90%,25% 100%,20% 90%,15% 100%,10% 90%,5% 100%,0% 90%)",
                }}
                className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 pb-10 font-mono"
              >
                {/* Barcode header */}
                <div className="flex items-end gap-[2px] mb-4 h-6">
                  {BARCODE_WIDTHS.map((w, i) => (
                    <span key={i} className="bg-slate-800 dark:bg-slate-200" style={{ width: `${w}px`, height: "100%" }} />
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Transaction Receipt</span>
                  <span className="text-[10px] font-normal text-rose-400 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                    {curSc.tag}
                  </span>
                </div>

                <h3 className="text-sm font-sans font-normal text-foreground mb-1">{curSc.title}</h3>
                <p className="text-[10px] text-muted-foreground mb-4">{curSc.subtitle}</p>

                <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-3" />

                <div className="flex items-start gap-2 mb-3">
                  <User className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">Customer Inbound Audio</p>
                    <p className="text-xs text-foreground leading-relaxed">{curSc.custMsg}</p>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-3" />

                <div className="flex items-start gap-2 mb-3">
                  <Bot className="size-3.5 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-1">9278 Financial AI · Sub-250ms Response</p>
                    <p className="text-xs text-foreground leading-relaxed">{curSc.aiMsg}</p>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-3" />

                <div className="flex items-center justify-between text-[10px] mb-1.5">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CheckCircle2 className="size-3 text-emerald-500" />
                    Action Outcome
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">{curSc.actionStatus}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShieldCheck className="size-3 text-rose-300" />
                    Core Banking Feed
                  </span>
                  <span className="text-rose-400 dark:text-rose-400">{curSc.systemMetric}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
