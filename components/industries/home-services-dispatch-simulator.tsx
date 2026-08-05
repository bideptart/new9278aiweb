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
  Radio,
  Navigation,
  Sparkles,
  Layers,
  Clock,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function HomeServicesDispatchSimulator() {
  const [activeDispatch, setActiveDispatch] = useState(0)
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

  const dispatches = [
    {
      id: "hvac-surge",
      trade: "HVAC Emergency Surge",
      tag: "Priority 1 Alert",
      desc: "AC failure in 95°F heat; auto-flags toddler & elderly high-risk households for priority dispatch.",
      tech: "Tech Mike R.",
      eta: "12 Mins Out",
      distance: "2.4 Miles",
      software: "ServiceTitan Synced",
      icon: Flame,
      speech: "“Priority 1 Emergency flagged! Tech Mike is 12 mins away with live GPS link text.”",
    },
    {
      id: "hydro-leak",
      trade: "Plumbing Burst Pipe",
      tag: "Damage Mitigation",
      desc: "Instantly texts 10-second video on shutting main water valve, preventing thousands in water damage claims.",
      tech: "Tech Alex K.",
      eta: "18 Mins Out",
      distance: "3.8 Miles",
      software: "Housecall Pro Synced",
      icon: Droplets,
      speech: "“Main shutoff video guide texted! Tech Alex dispatched to mitigate leak.”",
    },
    {
      id: "electrical-panel",
      trade: "200A Electrical Upgrade",
      tag: "Calendar Locked",
      desc: "Direct booking on technician calendar arrival windows with waived diagnostic fee for EV charger installs.",
      tech: "Tech Dave M.",
      eta: "Friday 9:00 AM",
      distance: "Estimate Ready",
      software: "Jobber Synced",
      icon: Zap,
      speech: "“Locked Friday 9:00 AM slot on Tech Dave's dispatch board. Permit verified.”",
    },
  ]

  // Auto-rotate dispatches every 3.2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveDispatch((prev) => (prev + 1) % dispatches.length)
      }, 3200)
    }
    return () => clearInterval(timer)
  }, [isPlaying, dispatches.length])

  const curD = dispatches[activeDispatch]
  const TradeIcon = curD.icon

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
            <Radio className="size-3.5 text-rose-300 animate-pulse" />
            <span>3D FIELD SERVICE DISPATCH COMMAND SPHERE</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal leading-tight md:text-5xl text-foreground">
            Live emergency voice <span className="italic text-rose-400 dark:text-rose-400">dispatch simulator.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Click any trade node below to inspect real-time emergency voice intake, ServiceTitan calendar locking, and live technician GPS tracking.
          </p>
        </div>

        {/* 3D FLOATING CONTRACTOR DISPATCH COMMAND SPHERE (100% Unique Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {dispatches.map((dp, idx) => {
            const isSelected = activeDispatch === idx
            const Icon = dp.icon

            return (
              <button
                key={dp.id}
                type="button"
                onClick={() => {
                  setActiveDispatch(idx)
                  setIsPlaying(false)
                }}
                className={cn(
                  "p-5 rounded-3xl transition-all duration-300 text-left space-y-3 cursor-pointer border shadow-xs backdrop-blur-md relative overflow-hidden",
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 shadow-md scale-105 ring-2 ring-rose-400/20"
                    : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-rose-200 hover:bg-rose-50/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "size-9 rounded-2xl flex items-center justify-center shrink-0 border transition-all",
                    isSelected
                      ? "bg-rose-500/15 text-rose-400 dark:text-rose-400 border-rose-300 dark:border-rose-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                  )}>
                    <Icon className="size-4" />
                  </div>

                  <span className="text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                    {dp.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-normal text-foreground">{dp.trade}</h3>
                  <p className="text-[11px] font-mono text-rose-400 dark:text-rose-400 font-normal mt-0.5">{dp.eta}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* 3D Dynamic Dispatch Inspector Ring with Mouse Physics */}
        <div className="flex justify-center [perspective:1000px] pt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={curD.id}
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
              className="w-full max-w-4xl p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2 border-rose-200/80 dark:border-rose-900/50 shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out space-y-5"
            >
              {/* Header inside Inspector */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800" style={{ transform: "translateZ(30px)" }}>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shadow-xs">
                    <TradeIcon className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">
                      {curD.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-normal text-foreground mt-0.5">
                      {curD.trade}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    ⚡ {curD.software}
                  </span>
                </div>
              </div>

              <p className="text-xs font-mono text-muted-foreground font-medium leading-relaxed" style={{ transform: "translateZ(35px)" }}>
                {curD.desc}
              </p>

              {/* Spoken AI Dispatch Quote Capsule */}
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center justify-between text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400">
                  <span>9278 Voice AI Dispatcher</span>
                  {/* 6-Bar Equalizer */}
                  <div className="flex items-center gap-1 h-3">
                    {[40, 90, 60, 100, 75, 50].map((h, i) => (
                      <span key={i} className="w-0.5 rounded-full bg-rose-500 animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono font-normal text-foreground leading-relaxed">{curD.speech}</p>
              </div>

              {/* GPS & Tech Telemetry Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs font-mono" style={{ transform: "translateZ(25px)" }}>
                <span className="flex items-center gap-1.5 text-rose-400 dark:text-rose-400 font-normal">
                  <MapPin className="size-3.5 text-rose-300" />
                  {curD.tech} ({curD.distance})
                </span>

                <span className="text-emerald-600 dark:text-emerald-400 font-normal bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  ✓ {curD.eta}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
