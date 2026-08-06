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
  Play,
  Pause,
} from "lucide-react"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 3200

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
      }, AUTOPLAY_MS)
    }
    return () => clearInterval(timer)
  }, [isPlaying, dispatches.length])

  const curD = dispatches[activeDispatch]
  const TradeIcon = curD.icon

  // Orbit node position as % of the square hub canvas (0,120,240deg apart, starting at top)
  const nodePos = (idx: number) => {
    const angle = (-90 + idx * (360 / dispatches.length)) * (Math.PI / 180)
    const radius = 35
    return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) }
  }

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
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-rose-200 dark:border-rose-900/50 bg-white/80 dark:bg-slate-900/80 px-3.5 py-1.5 text-[11px] font-normal text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="size-3 fill-current" /> : <Play className="size-3 fill-current" />}
            {isPlaying ? "Pause Autoplay" : "Resume Autoplay"}
          </button>
        </div>

        {/* Side-by-side: orbital hub on the left, live inspector on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center max-w-5xl mx-auto pt-2">

        {/* ORBITAL DISPATCH HUB — circular radar of trade nodes around the AI dispatcher core */}
        <div className="relative mx-auto aspect-square w-[300px] sm:w-[360px] lg:col-span-5 lg:w-full lg:max-w-[380px]">
          {/* Slow-rotating dashed orbit rings */}
          <div className="absolute inset-[6%] rounded-full border-2 border-dashed border-rose-200/50 dark:border-rose-900/40 animate-spin [animation-duration:26s]" />
          <div className="absolute inset-[16%] rounded-full border border-rose-200/30 dark:border-rose-900/25" />

          {/* SVG connecting lines to each node */}
          <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {dispatches.map((dp, idx) => {
              const { x, y } = nodePos(idx)
              const isSelected = activeDispatch === idx
              return (
                <line
                  key={dp.id}
                  x1="50" y1="50" x2={x} y2={y}
                  stroke={isSelected ? "rgb(251 113 133)" : "rgb(251 113 133 / 0.18)"}
                  strokeWidth={isSelected ? 0.7 : 0.4}
                />
              )
            })}
          </svg>

          {/* Travelling pulse dot from hub to the active node */}
          {isPlaying && (() => {
            const { x, y } = nodePos(activeDispatch)
            return (
              <motion.div
                key={activeDispatch}
                aria-hidden
                className="absolute z-10 -ml-1 -mt-1 size-2 rounded-full bg-rose-300 shadow-[0_0_8px_rgba(251,113,133,0.7)] pointer-events-none"
                initial={{ left: "50%", top: "50%" }}
                animate={{ left: ["50%", `${x}%`], top: ["50%", `${y}%`] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            )
          })()}

          {/* Central Pulsing AI Dispatcher Hub */}
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <span className="absolute inset-0 rounded-full bg-rose-400/30 animate-ping" />
            <div className="relative flex size-14 sm:size-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-950/50 dark:to-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400 shadow-md">
              <Radio className="size-5 sm:size-6" />
            </div>
            <p className="mt-1.5 whitespace-nowrap text-[8px] sm:text-[9px] font-mono font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400">
              AI Dispatcher
            </p>
          </div>

          {/* Orbiting Trade Nodes */}
          {dispatches.map((dp, idx) => {
            const { x, y } = nodePos(idx)
            const isSelected = activeDispatch === idx
            const Icon = dp.icon

            return (
              <button
                key={dp.id}
                type="button"
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => {
                  setActiveDispatch(idx)
                  setIsPlaying(false)
                }}
                className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 cursor-pointer"
              >
                <span className="relative flex items-center justify-center">
                  {isSelected && (
                    <svg className="absolute -inset-2 size-[calc(100%+16px)] -rotate-90" viewBox="0 0 40 40" aria-hidden>
                      <circle cx="20" cy="20" r="18" fill="none" stroke="rgb(251 113 133 / 0.15)" strokeWidth="2" />
                      {isPlaying && (
                        <circle
                          cx="20" cy="20" r="18" fill="none"
                          stroke="rgb(251 113 133)" strokeWidth="2" strokeLinecap="round"
                          strokeDasharray={113}
                          strokeDashoffset={113}
                        >
                          <animate
                            key={activeDispatch}
                            attributeName="stroke-dashoffset"
                            from="113"
                            to="0"
                            dur={`${AUTOPLAY_MS / 1000}s`}
                            fill="freeze"
                            repeatCount="1"
                          />
                        </circle>
                      )}
                    </svg>
                  )}
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full border shadow-md transition-all duration-300 transform-gpu",
                      isSelected
                        ? "size-13 sm:size-15 bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 text-rose-400 scale-105"
                        : "size-10 sm:size-11 bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-400 group-hover:border-rose-200 group-hover:text-rose-300 group-hover:scale-105"
                    )}
                  >
                    <Icon className={isSelected ? "size-5 sm:size-6" : "size-4 sm:size-4.5"} />
                  </span>
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-normal transition-colors",
                    isSelected
                      ? "bg-rose-500/15 border-rose-300 dark:border-rose-500 text-rose-400"
                      : "bg-white/70 dark:bg-slate-900/70 border-slate-200/70 dark:border-slate-800 text-muted-foreground"
                  )}
                >
                  {dp.trade}
                </span>
              </button>
            )
          })}
        </div>

        {/* 3D Dynamic Dispatch Inspector Ring with Mouse Physics */}
        <div className="lg:col-span-7 flex justify-center [perspective:1000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={curD.id}
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
              className="w-full max-w-4xl p-6 md:p-8 bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-2 border-rose-200/80 dark:border-rose-900/50 backdrop-blur-xl transition-transform duration-200 ease-out space-y-5"
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

      </div>
    </section>
  )
}
