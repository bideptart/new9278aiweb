"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Building2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Lock,
  Layers,
  Sparkles,
  Database,
  Activity,
  Globe,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function FinanceCoreIntegrations() {
  const [activeNode, setActiveNode] = useState(0)
  const [selectedTier, setSelectedTier] = useState(1) // 0: Retail NBFC, 1: Commercial Bank, 2: Enterprise Mega Bank
  const [isPlayingNode, setIsPlayingNode] = useState(true)
  const [isPlayingTier, setIsPlayingTier] = useState(true)

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

    setRotateX(-mouseY / 15)
    setRotateY(mouseX / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const nodes = [
    {
      id: "finacle-core",
      title: "Fiserv & Finacle Core",
      protocol: "REST API · < 180ms",
      desc: "Real-time account creation, balance checks, and instant debit mandate verification directly on Fiserv & Finacle.",
      status: "Verified 2-Way Sync",
    },
    {
      id: "cibil-gateway",
      title: "Experian & FICO Gateway",
      protocol: "Direct Bureau API",
      desc: "Instant credit score, default history, and DTI debt ratio calculation during live voice calls with zero manual delays.",
      status: "Soft Pull Active",
    },
    {
      id: "nsdl-kyc",
      title: "Global Video KYC & Identity",
      protocol: "FATCA / Identity API",
      desc: "Automated passport verification, video KYC link generation, and acoustic voice biometric matching.",
      status: "Identity Lock Active",
    },
    {
      id: "nach-gateway",
      title: "Stripe & ACH Auto-Debit",
      protocol: "PCI-DSS 4.0 Webhook",
      desc: "Automates monthly ACH recurring mandates, instant credit card payment link generation, and automated bounce handling.",
      status: "ACH Mandate Registered",
    },
  ]

  const tiers = [
    {
      id: "retail",
      name: "Regional Credit Union",
      volume: "< 5,000 Apps/mo",
      npaSaved: "$250,000 / mo",
      costCut: "65% Overhead Saved",
      speedup: "2.8x Faster",
    },
    {
      id: "commercial",
      name: "Commercial Bank",
      volume: "5,000 - 25,000 Apps/mo",
      npaSaved: "$680,000 / mo",
      costCut: "78% Overhead Saved",
      speedup: "3.4x Faster",
    },
    {
      id: "enterprise",
      name: "Global Enterprise Bank",
      volume: "50,000+ Apps/mo",
      npaSaved: "$1.85 Million / mo",
      costCut: "88% Overhead Saved",
      speedup: "4.2x Faster",
    },
  ]

  // Auto-cycle nodes every 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlayingNode) {
      timer = setInterval(() => {
        setActiveNode((prev) => (prev + 1) % nodes.length)
      }, 3000)
    }
    return () => clearInterval(timer)
  }, [isPlayingNode, nodes.length])

  // Auto-cycle tiers every 2.2 seconds (silent background rotation)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlayingTier) {
      timer = setInterval(() => {
        setSelectedTier((prev) => (prev + 1) % tiers.length)
      }, 2200)
    }
    return () => clearInterval(timer)
  }, [isPlayingTier, tiers.length])

  const curN = nodes[activeNode]
  const curTier = tiers[selectedTier]

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Rose Background Ambient Lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/8 to-transparent blur-3xl opacity-60"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Globe className="size-3.5 text-rose-500" />
            <span>INSTITUTIONAL CORE BANKING MESH</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Interconnected financial <span className="italic text-rose-600 dark:text-rose-400">clearing matrix.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Click any peripheral node below to inspect real-time REST API latency, RBI audit compliance logs, and institutional ROI metrics.
          </p>
        </div>

        {/* 1. RADIAL BANKING MESH CANVAS (Central Core Vault + 4 Satellite Nodes) */}
        <div className="relative max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
          
          {/* Left: Interconnected Node Grid Canvas */}
          <div className="relative flex flex-col items-center justify-center p-4 md:p-6 min-h-[340px]">
            {/* Center Core Node */}
            <div className="z-10 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border-2 border-rose-200 dark:border-rose-800 shadow-xl text-center space-y-1 backdrop-blur-xl max-w-[200px]">
              <div className="size-8 mx-auto rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center font-bold text-xs">
                <Database className="size-4" />
              </div>
              <p className="text-xs font-serif font-bold text-foreground">9278 Core Vault</p>
              <p className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">256-Bit Encrypted</p>
            </div>

            {/* 4 Satellite Nodes Layout */}
            <div className="grid grid-cols-2 gap-3 w-full mt-6">
              {nodes.map((nd, idx) => {
                const isSelected = activeNode === idx
                return (
                  <button
                    key={nd.id}
                    type="button"
                    onClick={() => {
                      setActiveNode(idx)
                      setIsPlayingNode(false)
                    }}
                    className={cn(
                      "p-3 rounded-2xl transition-all duration-300 text-left space-y-1 cursor-pointer border shadow-xs backdrop-blur-md",
                      isSelected
                        ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-md scale-105"
                        : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn("size-2 rounded-full", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                      <span className="text-[9px] font-mono font-bold text-rose-600 dark:text-rose-400">{nd.protocol}</span>
                    </div>
                    <p className="text-xs font-bold text-foreground truncate">{nd.title}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Dynamic Node Inspection Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={curN.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/60 to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-rose-200/80 dark:border-rose-900/50 shadow-xl backdrop-blur-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-foreground">{curN.title}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {curN.status}
                </span>
              </div>

              <p className="text-xs font-mono text-muted-foreground font-medium leading-relaxed">
                {curN.desc}
              </p>

              <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Gateway Protocol:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{curN.protocol}</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* 2. RESPONSIVE 3D BANKING CAPITAL BAROMETER WITH 3D TILT PHYSICS */}
        <div className="pt-4 space-y-6 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
              <Award className="size-3.5 text-rose-500" />
              <span>INSTITUTIONAL RISK & CAPITAL BAROMETER</span>
            </span>
            <h3 className="text-xl md:text-3xl font-serif font-bold text-foreground">
              Select your institution tier.
            </h3>
          </div>

          {/* 3 Tier Selector Buttons (Fully Responsive Grid: 1 col mobile, 3 col desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tiers.map((tr, idx) => {
              const isSelected = selectedTier === idx
              return (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => {
                    setSelectedTier(idx)
                    setIsPlayingTier(false)
                  }}
                  className={cn(
                    "p-4 sm:p-5 rounded-3xl transition-all duration-300 text-left space-y-2 cursor-pointer border shadow-xs backdrop-blur-md",
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 shadow-md scale-[1.02] ring-2 ring-rose-400/20"
                      : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-rose-200 hover:bg-rose-50/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-bold text-foreground">{tr.name}</span>
                    <span className={cn("size-2 rounded-full shrink-0", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                  </div>
                  <p className="text-[10px] sm:text-xs font-mono font-bold text-rose-600 dark:text-rose-400">{tr.volume}</p>
                </button>
              )
            })}
          </div>

          {/* Dynamic Tier Telemetry Output Display with 3D Mouse Tilt Motion */}
          <div className="flex justify-center [perspective:1000px] pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={curTier.id}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2 border-rose-200/80 dark:border-rose-900/50 shadow-2xl backdrop-blur-xl text-center transition-transform duration-200 ease-out"
              >
                <div className="p-3.5 rounded-2xl bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/40 shadow-xs" style={{ transform: "translateZ(25px)" }}>
                  <p className="text-[10px] font-mono text-muted-foreground font-medium">Est. NPA Saved</p>
                  <p className="text-sm sm:text-base font-mono font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">{curTier.npaSaved}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs" style={{ transform: "translateZ(35px)" }}>
                  <p className="text-[10px] font-mono text-muted-foreground font-medium">Overhead Reduction</p>
                  <p className="text-sm sm:text-base font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{curTier.costCut}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs" style={{ transform: "translateZ(25px)" }}>
                  <p className="text-[10px] font-mono text-muted-foreground font-medium">Disposal Acceleration</p>
                  <p className="text-sm sm:text-base font-mono font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">{curTier.speedup}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
