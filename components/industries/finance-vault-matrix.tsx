"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShieldCheck,
  Zap,
  Lock,
  TrendingUp,
  FileCheck,
  UserCheck,
  CheckCircle2,
  BadgeCheck,
  Activity,
  Cpu,
  ShieldAlert,
  Fingerprint,
  PieChart,
  Scale,
  Key,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function FinanceVaultMatrix() {
  const [activeNode, setActiveNode] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // 3D Tilt Mouse Controls
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Max 15deg tilt
    setRotateX(-mouseY / 15)
    setRotateY(mouseX / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const nodes = [
    {
      id: "voice-kyc",
      number: "01",
      title: "Global Biometric KYC Shield",
      shortTitle: "Voice KYC",
      category: "IDENTITY SHIELD",
      icon: Fingerprint,
      stat: "230ms",
      statLabel: "Biometric Match",
      telemetry: "Passport & FATCA Live Sync",
      highlights: [
        "Acoustic Voice Print Match (99.8% Accuracy)",
        "Instant Video KYC Token Dispatch",
        "Zero Manual Verification Delays",
      ],
      compliance: "FATCA & GDPR Compliant",
      eqHeights: [45, 90, 60, 100, 75, 40],
    },
    {
      id: "credit-engine",
      number: "02",
      title: "FICO Credit Underwriter",
      shortTitle: "Credit Score",
      category: "RISK ANALYSIS",
      icon: TrendingUp,
      stat: "785+",
      statLabel: "FICO Auto Pull",
      telemetry: "Pre-Approved $1.5M Mortgage",
      highlights: [
        "Instant Equifax, Experian & TransUnion Credit Check",
        "Automated DTI & W2 Tax Return OCR Parsing",
        "Auto-Issued Instant Sanction Letter",
      ],
      compliance: "FINRA & SEC Framework",
      eqHeights: [80, 50, 95, 70, 85, 60],
    },
    {
      id: "fraud-sentinel",
      number: "03",
      title: "SWIFT Anti-Fraud Sentinel",
      shortTitle: "Fraud Shield",
      category: "SECURITY DEFENSE",
      icon: ShieldAlert,
      stat: "99.94%",
      statLabel: "Zero Fraud Loss",
      telemetry: "Suspicious Wire Blocked in 5s",
      highlights: [
        "Real-Time Geo-Velocity Anomaly Alert",
        "2-Factor Voice OTP Authentication",
        "Instant Core Banking Account Freeze",
      ],
      compliance: "PCI-DSS 4.0 & SOC2 Type II",
      eqHeights: [100, 70, 40, 90, 65, 80],
    },
    {
      id: "debt-recovery",
      number: "04",
      title: "Global Loan Servicing Engine",
      shortTitle: "Loan Servicing",
      category: "COLLECTION AI",
      icon: Lock,
      stat: "+34%",
      statLabel: "Recovery Boost",
      telemetry: "ACH Auto-Debit Registered",
      highlights: [
        "Empathy-Tuned Multilingual Scripts",
        "Strict FDCPA & GLBA Calling Compliance",
        "Automated Payment Portal Link Relay",
      ],
      compliance: "FDCPA & GLBA Compliant",
      eqHeights: [60, 85, 40, 95, 70, 50],
    },
  ]

  // Silent Working Auto-Rotation State Machine (3.2 seconds)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveNode((prev) => (prev + 1) % nodes.length)
      }, 3200)
    }
    return () => clearInterval(timer)
  }, [isPlaying, nodes.length])

  const currentNode = nodes[activeNode]
  const NodeIcon = currentNode.icon

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Rose Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/12 via-amber-500/8 to-transparent blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <BadgeCheck className="size-3.5 text-rose-300" />
            <span>INSTITUTIONAL BANKING 3D AI CIRCUIT</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Financial AI sovereign <span className="italic text-rose-400 dark:text-rose-400">3D circuit grid.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Interact with the 3D telemetry nodes below to inspect real-time financial verification speed, RBI regulatory compliance standards, and live voice execution.
          </p>
        </div>

        {/* 1. 3D INTERACTIVE CIRCUIT PIPELINE (4 Interconnected Nodes) */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Connector Line behind nodes */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 dark:from-rose-900/40 dark:via-rose-800/40 dark:to-rose-900/40 -translate-y-1/2 -z-10" />

          {nodes.map((nd, idx) => {
            const isSelected = activeNode === idx
            const IconComp = nd.icon
            return (
              <button
                key={nd.id}
                type="button"
                onClick={() => {
                  setActiveNode(idx)
                  setIsPlaying(false)
                }}
                className={cn(
                  "relative group flex flex-col items-center p-5 rounded-3xl transition-all duration-300 cursor-pointer text-center space-y-3 backdrop-blur-xl border shadow-xs hover:scale-105",
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 shadow-md scale-105 ring-2 ring-rose-400/20"
                    : "bg-white/70 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800 hover:border-rose-200 hover:bg-rose-50/40"
                )}
              >
                {/* Node Number & Pulse Dot */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold">
                  <span className={cn("size-2 rounded-full", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                  <span className={isSelected ? "text-rose-400 dark:text-rose-400" : "text-muted-foreground"}>
                    NODE {nd.number}
                  </span>
                </div>

                {/* Icon Container with 3D Pop Effect */}
                <div
                  className={cn(
                    "size-12 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-xs",
                    isSelected
                      ? "bg-rose-500/15 text-rose-400 dark:text-rose-400 border-rose-300 dark:border-rose-800 scale-110 shadow-md"
                      : "bg-slate-100 dark:bg-slate-800 text-muted-foreground border-slate-200 dark:border-slate-700"
                  )}
                >
                  <IconComp className="size-6" />
                </div>

                {/* Short Title */}
                <div>
                  <p className="text-xs font-bold text-foreground leading-tight">{nd.shortTitle}</p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-0.5">{nd.category}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* 2. 3D RADIAL TELEMETRY DIAL & WORKING SOUND FREQUENCY DISPLAY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 max-w-5xl mx-auto"
          >
            {/* Left Column: 3D Mouse Tilt Radial Telemetry Canvas */}
            <div className="lg:col-span-5 flex justify-center [perspective:1000px]">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                }}
                className="relative size-72 md:size-80 rounded-full bg-gradient-to-br from-white via-rose-50/60 to-slate-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border-2 border-rose-200/80 dark:border-rose-800/80 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-2 transition-transform duration-200 ease-out"
              >
                
                {/* 3D Floating Rotating Outer Ring */}
                <div
                  className="absolute inset-2 rounded-full border border-dashed border-rose-300/60 dark:border-rose-800/60 animate-[spin_25s_linear_infinite]"
                  style={{ transform: "translateZ(20px)" }}
                />

                {/* Category Pill Floating in 3D */}
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 bg-rose-500/10 px-3 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {currentNode.category}
                </span>

                {/* Core Stat Big Metric */}
                <div
                  className="text-4xl md:text-5xl font-serif font-extrabold text-foreground tracking-tight pt-1"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {currentNode.stat}
                </div>

                <span
                  className="text-xs font-mono font-bold text-muted-foreground"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {currentNode.statLabel}
                </span>

                {/* Working Live Sound Equalizer Waveform */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <div className="flex items-center gap-0.5 h-3">
                    {currentNode.eqHeights.map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ["20%", `${h}%`, "20%"] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                        className="w-0.5 rounded-full bg-rose-500"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 dark:text-rose-400">
                    Live 24/7 AI Stream
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Node Highlights & Security Badges */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-rose-400 dark:text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                    Active Node {currentNode.number}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground font-semibold">
                    {currentNode.compliance}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {currentNode.title}
                </h3>
              </div>

              {/* Graphical Feature Chips with 3D Hover Lift */}
              <div className="space-y-3">
                {currentNode.highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all"
                  >
                    <div className="size-6 rounded-full bg-rose-500/15 text-rose-400 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-900/50">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Regulatory Audit Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-rose-300" />
                  RBI Regulatory Framework
                </span>
                <span className="flex items-center gap-1.5 text-rose-400 dark:text-rose-400 font-bold">
                  <span>3D Telemetry Active</span>
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
