"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Wrench,
  Flame,
  Droplets,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Activity,
  Award,
  DollarSign,
  Radio,
  Sparkles,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function HomeServicesDispatchMatrix() {
  const [activeTier, setActiveTier] = useState(0) // 0: Apex Emergency, 1: Urgent Repair, 2: Scheduled & Deposit
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

    setRotateX(-mouseY / 15)
    setRotateY(mouseX / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const tiers = [
    {
      id: "apex-emergency",
      level: "APEX LEVEL 01",
      title: "Priority 1 HVAC Emergency Surge",
      tag: "Immediate Dispatch",
      icon: Flame,
      summary: "Sub-250ms call answer when AC fails in 95°F heat; auto-flags toddler & elderly high-risk households.",
      metrics: [
        { label: "Intake Speed", val: "< 240ms" },
        { label: "Tech ETA", val: "12 Mins Out" },
        { label: "System Sync", val: "ServiceTitan Live" },
      ],
      custAudio: "“No AC working and it's 95°F inside! We have a 2-year-old at home!”",
      aiVoice: "“Marked Priority 1 Emergency! Tech Mike is dispatched and 12 minutes away.”",
    },
    {
      id: "urgent-repair",
      level: "MID DECK LEVEL 02",
      title: "Plumbing Hydro Burst Mitigation",
      tag: "Video SMS Guide",
      icon: Droplets,
      summary: "Instantly texts 10-second video on shutting main water valve, preventing thousands in water damage.",
      metrics: [
        { label: "SMS Delay", val: "Instant 5s" },
        { label: "Tech ETA", val: "18 Mins Out" },
        { label: "System Sync", val: "Housecall Pro" },
      ],
      custAudio: "“Water pipe burst under the sink! How do I shut off the main valve?”",
      aiVoice: "“Don't panic! I am texting you a 10-second video on shutting off your main valve right now.”",
    },
    {
      id: "scheduled-deposit",
      level: "BASE FOUNDATION LEVEL 03",
      title: "Scheduled Panel & Deposit Lock",
      tag: "Revenue Protection",
      icon: Zap,
      summary: "Direct booking on technician calendar windows with automated after-hours diagnostic deposit capture.",
      metrics: [
        { label: "Calendar Lock", val: "100% Synced" },
        { label: "Deposit Auth", val: "PCI-DSS 4.0" },
        { label: "System Sync", val: "Jobber & Stripe" },
      ],
      custAudio: "“Can I book an estimate for replacing my 200A electrical panel?”",
      aiVoice: "“Booked Friday at 9:00 AM on Tech Dave's calendar. Diagnostic deposit secured.”",
    },
  ]

  // Auto-cycle pyramid tiers every 3.2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveTier((prev) => (prev + 1) % tiers.length)
      }, 3200)
    }
    return () => clearInterval(timer)
  }, [isPlaying, tiers.length])

  const curTier = tiers[activeTier]
  const TierIcon = curTier.icon

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Rose Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/12 via-amber-500/8 to-transparent blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Layers className="size-3.5 text-rose-300" />
            <span>3D EMERGENCY DISPATCH TRIAGE PYRAMID</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            3-Tier emergency <span className="italic text-rose-400 dark:text-rose-400">triage command stack.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Click any level of the 3D triage pyramid below to inspect emergency intake speed, video SMS leak guides, and ServiceTitan calendar locking.
          </p>
        </div>

        {/* 3D TRIANGULAR EMERGENCY DISPATCH PYRAMID CANVAS (100% Unique Geometry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto pt-2">
          
          {/* Left Column: 3-Tiered Pyramid Stack */}
          <div className="lg:col-span-5 space-y-3 flex flex-col items-center">
            {tiers.map((tr, idx) => {
              const isSelected = activeTier === idx
              const IconComp = tr.icon

              // Widths get wider from Top (Level 1) to Bottom (Level 3) to form a true Pyramid!
              const widths = ["w-[75%]", "w-[88%]", "w-[100%]"]

              return (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => {
                    setActiveTier(idx)
                    setIsPlaying(false)
                  }}
                  className={cn(
                    "p-4 rounded-3xl transition-all duration-300 text-left flex items-center justify-between cursor-pointer border shadow-xs backdrop-blur-md relative overflow-hidden",
                    widths[idx],
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 shadow-md scale-105 ring-2 ring-rose-400/20"
                      : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-rose-200 hover:bg-rose-50/40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "size-9 rounded-2xl flex items-center justify-center shrink-0 border transition-all",
                      isSelected
                        ? "bg-rose-500/15 text-rose-400 dark:text-rose-400 border-rose-300 dark:border-rose-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                    )}>
                      <IconComp className="size-4" />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono font-normal text-rose-400 dark:text-rose-400 block">{tr.level}</span>
                      <p className="text-xs font-normal text-foreground truncate">{tr.title}</p>
                    </div>
                  </div>

                  <span className={cn("size-2 rounded-full shrink-0 ml-2", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                </button>
              )
            })}
          </div>

          {/* Right Column: 3D Telemetry Inspector with Mouse Physics */}
          <div className="lg:col-span-7 flex justify-center [perspective:1000px]">
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
                className="w-full p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2 border-rose-200/80 dark:border-rose-900/50 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out space-y-5"
              >
                {/* Header inside HUD */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex items-center gap-2">
                    <TierIcon className="size-5 text-rose-300" />
                    <span className="text-xs font-serif font-normal text-foreground">{curTier.title}</span>
                  </div>

                  <span className="text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                    {curTier.tag}
                  </span>
                </div>

                {/* Summary Paragraph */}
                <p className="text-xs font-mono text-muted-foreground font-medium leading-relaxed" style={{ transform: "translateZ(35px)" }}>
                  {curTier.summary}
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2" style={{ transform: "translateZ(35px)" }}>
                  {curTier.metrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center">
                      <p className="text-[9px] font-mono text-muted-foreground">{m.label}</p>
                      <p className="text-xs font-mono font-normal text-rose-400 dark:text-rose-400 mt-0.5">{m.val}</p>
                    </div>
                  ))}
                </div>

                {/* Live Voice Dialogue Capsule */}
                <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 shadow-xs space-y-1.5" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex items-center justify-between text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400">
                    <span>9278 Voice AI Dispatcher</span>
                    {/* 6-Bar Sound Spectrum */}
                    <div className="flex items-center gap-1 h-3">
                      {[40, 90, 60, 100, 75, 50].map((h, i) => (
                        <span key={i} className="w-0.5 rounded-full bg-rose-500 animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-foreground font-normal leading-relaxed">{curTier.aiVoice}</p>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
