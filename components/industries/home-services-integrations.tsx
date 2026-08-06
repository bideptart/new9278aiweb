"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Flame,
  Droplets,
  Truck,
  CheckCircle2,
  Globe,
  Cpu,
  DollarSign,
  Play,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 3400

export function HomeServicesIntegrations() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // 3D Tilt Mouse Controls for the Inspector Panel
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setRotateX(-((e.clientY - centerY) / 18))
    setRotateY((e.clientX - centerX) / 18)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

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

  const total = integrations.length

  // Autoplay: rotate the 3D coverflow every ~3.4s
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [isPlaying, total])

  const selectCard = (idx: number) => {
    setActiveIdx(idx)
    setIsPlaying(false)
  }

  const active = integrations[activeIdx]
  const ActiveIcon = active.icon

  return (
    <section className="relative overflow-hidden py-10 md:py-16">
      {/* Soft Rose Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/12 via-amber-500/8 to-transparent blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Globe className="size-3.5 text-rose-300" />
            <span>3D INTEGRATION CAROUSEL</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Contractor software <span className="italic text-rose-400 dark:text-rose-400">integration carousel.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Auto-rotating every {(AUTOPLAY_MS / 1000).toFixed(1)}s — tap any card in the 3D carousel to inspect 2-way REST API latency and calendar sync.
          </p>
        </div>

        {/* 3D COVERFLOW CAROUSEL */}
        <div className="relative">
          <div
            className="relative h-[210px] sm:h-[240px] flex items-center justify-center [perspective:1400px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            {integrations.map((ig, idx) => {
              let diff = idx - activeIdx
              if (diff > total / 2) diff -= total
              if (diff < -total / 2) diff += total
              const abs = Math.abs(diff)
              const isActive = diff === 0
              const Icon = ig.icon

              const translateX = diff * 132
              const translateZ = -abs * 130
              const rotateYc = diff * -38
              const scale = Math.max(1 - abs * 0.16, 0.52)
              const opacity = abs > 2 ? 0 : Math.max(1 - abs * 0.32, 0.15)

              return (
                <button
                  key={ig.id}
                  type="button"
                  onClick={() => selectCard(idx)}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateYc}deg) scale(${scale})`,
                    opacity,
                    zIndex: 10 - abs,
                    pointerEvents: abs > 2 ? "none" : "auto",
                  }}
                  className={cn(
                    "absolute left-1/2 top-1/2 w-[170px] sm:w-[200px] shrink-0 rounded-3xl border p-4 sm:p-5 text-left backdrop-blur-xl transition-[transform,opacity,box-shadow] duration-500 ease-out cursor-pointer transform-gpu",
                    isActive
                      ? "bg-gradient-to-br from-white via-rose-50/80 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-rose-300 dark:border-rose-700 shadow-2xl ring-2 ring-rose-400/25"
                      : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-rose-200"
                  )}
                >
                  <div className={cn(
                    "size-9 rounded-2xl flex items-center justify-center border mb-3 transition-colors duration-300",
                    isActive
                      ? "bg-rose-500/15 text-rose-400 dark:text-rose-400 border-rose-300 dark:border-rose-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                  )}>
                    <Icon className="size-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">
                    {ig.category}
                  </span>
                  <h3 className="text-sm font-serif font-normal text-foreground mt-1.5 leading-snug">{ig.name}</h3>
                </button>
              )
            })}
          </div>

          {/* Progress Dots + Autoplay Toggle */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="flex items-center justify-center size-7 rounded-full border border-rose-200 dark:border-rose-900/50 bg-white/80 dark:bg-slate-900/80 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0"
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isPlaying ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
            </button>
            <div className="flex items-center gap-1.5">
              {integrations.map((ig, idx) => (
                <button
                  key={ig.id}
                  type="button"
                  onClick={() => selectCard(idx)}
                  aria-label={`Show ${ig.name}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    idx === activeIdx ? "w-6 bg-rose-400" : "w-1.5 bg-rose-400/30 hover:bg-rose-400/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3D Tilt Inspector Panel */}
        <div className="flex justify-center [perspective:1000px] pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                clipPath:
                  "polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)",
                filter: "drop-shadow(0 22px 34px rgba(244,63,94,0.16))",
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-4xl bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2 border-rose-200/80 dark:border-rose-900/50 backdrop-blur-xl transition-transform duration-200 ease-out overflow-hidden"
            >
              {/* Autoplay Progress Rail */}
              <div className="h-1 w-full bg-rose-500/10">
                {isPlaying && (
                  <motion.div
                    key={activeIdx}
                    className="h-full bg-gradient-to-r from-rose-400 to-rose-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>

              <div className="p-6 md:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shadow-xs">
                      <ActiveIcon className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">
                        {active.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-normal text-foreground mt-0.5">{active.name}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      ⚡ {active.speed}
                    </span>
                    <span className="text-xs font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900/50">
                      {active.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-mono text-muted-foreground font-medium leading-relaxed" style={{ transform: "translateZ(35px)" }}>
                  {active.desc}
                </p>

                <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(35px)" }}>
                  {active.bullets.map((b, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] font-mono font-normal text-foreground bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                      <CheckCircle2 className="size-3 text-rose-300 shrink-0" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
