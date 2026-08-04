"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react"
import { Clock, Phone, DollarSign, ShieldCheck, Play, Pause, Volume2, CheckCircle2, PhoneCall, Signal, Sparkles, Activity, Cpu, Calendar, Check, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  industryName: string
  slug: string
}

export function HeroAgentConsoleMockup({ industryName, slug }: Props) {
  const [activePlaybook, setActivePlaybook] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // 3D Mouse Tilt Motion Setup
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const playbooks = [
    {
      id: "intake",
      name: "# Patient intake",
      status: "2 agents · 1 live call",
      agentText: "Welcome to Sunrise Health! I can take your intake details & verify your insurance in under 2 minutes.",
      patientName: "Sarah M.",
      time: "Today, 9:12 AM",
      duration: "0:42",
      badge: "HIPAA Verified",
      accuracy: "99.8%",
      bookingDetail: "Thursday · 9:00 AM (Dr. Sharma)",
    },
    {
      id: "booking",
      name: "# Appointment booking",
      status: "4 agents · 2 live calls",
      agentText: "Your annual checkup is due this Thursday! I have a 10:00 AM slot with Dr. Sharma. Copay is $0.",
      patientName: "David K.",
      time: "Today, 10:30 AM",
      duration: "1:08",
      badge: "EHR Sync Active",
      accuracy: "99.9%",
      bookingDetail: "Thursday · 10:00 AM (Dr. Sharma)",
    },
    {
      id: "refill",
      name: "# Prescription refills",
      status: "1 agent · Idle",
      agentText: "Your Lisinopril prescription is eligible for a 90-day refill. I'll route this to your CVS Pharmacy.",
      patientName: "Dr. Sharma Practice",
      time: "Today, 11:15 AM",
      duration: "0:55",
      badge: "Pharmacy Routed",
      accuracy: "100%",
      bookingDetail: "CVS Pharmacy · Main St",
    },
    {
      id: "triage",
      name: "# Post-op triage",
      status: "3 agents · 1 live call",
      agentText: "Checking in post-surgery — discomfort level is down to 3/10. I am updating your recovery chart.",
      patientName: "Post-Op Followup",
      time: "Yesterday",
      duration: "0:48",
      badge: "Triage Score 3/10",
      accuracy: "99.7%",
      bookingDetail: "Recovery Chart Updated",
    },
  ]

  // Auto-cycle playbooks every 4.5 seconds
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActivePlaybook((prev) => (prev + 1) % playbooks.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPlaying, playbooks.length])

  const current = playbooks[activePlaybook]

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto perspective-[1200px] py-6">
      {/* Ambient Radial Blur Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-primary/30 via-rose-500/20 to-amber-500/10 blur-3xl opacity-80"
      />

      {/* Floating 3D Geometric Badge (Top Left) */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-4 -left-4 z-30 size-10 rounded-2xl bg-gradient-to-br from-primary to-rose-600 p-2.5 text-white shadow-lg shadow-primary/30 border border-white/30 backdrop-blur-md flex items-center justify-center"
      >
        <Cpu className="size-5" />
      </motion.div>

      {/* Floating Accuracy Badge (Bottom Left) */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute -bottom-2 -left-4 z-30 flex items-center gap-1.5 rounded-full border border-white/60 dark:border-white/10 bg-card/90 px-3 py-1 text-xs font-bold text-primary shadow-xl backdrop-blur-md"
      >
        <Sparkles className="size-3.5 text-primary" />
        <span>Accuracy: {current.accuracy}</span>
      </motion.div>

      {/* Interactive 3D Tilt Card Wrapper */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-xl overflow-hidden transition-all duration-200 group hover:border-rose-300 dark:hover:border-rose-800"
      >
        {/* Specular Catch-light Reflection Overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* macOS Window Titlebar Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-rose-400/80 shadow-xs" />
            <span className="size-3 rounded-full bg-amber-400/80 shadow-xs" />
            <span className="size-3 rounded-full bg-emerald-400/80 shadow-xs" />
            <span className="ml-2 text-xs font-mono font-bold text-foreground/90 flex items-center gap-1.5">
              9278.ai — Healthcare Voice Console
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 px-2.5 py-0.5 text-[10px] font-semibold border border-rose-200 dark:border-rose-900/40">
              <ShieldCheck className="size-3 text-rose-300" />
              HIPAA Certified
            </span>
          </div>
        </div>

        {/* Console Body Grid */}
        <div className="grid grid-cols-12 min-h-[340px]">
          {/* Left Sidebar */}
          <div className="col-span-5 border-r border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-3 space-y-4">
            <div>
              <div className="flex items-center justify-between px-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">PLAYBOOKS</span>
                <span className="text-[9px] font-mono text-rose-400 dark:text-rose-400 font-bold">0{activePlaybook + 1}/0{playbooks.length}</span>
              </div>

              <div className="space-y-1">
                {playbooks.map((pb, idx) => {
                  const isActive = activePlaybook === idx
                  return (
                    <button
                      key={pb.id}
                      onClick={() => {
                        setActivePlaybook(idx)
                        setIsPlaying(false)
                      }}
                      className={cn(
                        "w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border cursor-pointer",
                        isActive
                          ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 font-bold border-rose-300 dark:border-rose-800 shadow-xs scale-[1.02]"
                          : "border-transparent text-muted-foreground hover:bg-rose-50/40 dark:hover:bg-rose-950/20 hover:text-foreground"
                      )}
                    >
                      <span className="truncate">{pb.name}</span>
                      {isActive && <span className="size-1.5 rounded-full bg-rose-500 animate-ping" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-800 pt-3">
              <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">LIVE STREAM</span>
              <div className="mt-2 space-y-2 px-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="truncate font-semibold text-foreground">{current.patientName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">LIVE</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="size-2 rounded-full bg-emerald-500/60" />
                  <span className="truncate">Dr. Sharma Triage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Console Content */}
          <div className="col-span-7 p-4 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2 mb-3">
                <div>
                  <h4 className="text-xs font-bold text-foreground">{current.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{current.status}</p>
                </div>
                <span className="rounded-full bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 px-2 py-0.5 text-[9px] font-bold">
                  {current.badge}
                </span>
              </div>

              {/* Agent Bubble Response */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlaybook}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/20 p-3.5 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-rose-400 dark:text-rose-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" />
                      Agent Response · Sub-250ms
                    </span>
                    <span className="size-2 rounded-full bg-primary animate-ping" />
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    &ldquo;{current.agentText}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Live Audio Spectrum Equalizer Matrix */}
            <div className="rounded-2xl border border-border/60 bg-background/90 p-3 flex items-center justify-between shadow-sm backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform hover:scale-105"
                  aria-label={isPlaying ? "Pause cycle" : "Play cycle"}
                >
                  {isPlaying ? <Pause className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current ml-0.5" />}
                </button>
                <div>
                  <p className="text-xs font-bold text-foreground">Live Call · {current.patientName}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{current.duration} · Transcript Active</p>
                </div>
              </div>

              {/* Animated Spectrum Equalizer Matrix */}
              <div className="flex items-center gap-0.5 h-4 px-2">
                {[60, 100, 45, 80, 55, 90, 40, 85].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-primary animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* NEW FLOATING GLASS LIVE VOICE CONTROL & EHR BOOKING CARD (Replaces phone frame) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -bottom-5 -right-2 sm:-right-6 w-64 sm:w-72 rounded-3xl border border-white/80 dark:border-white/15 bg-card/90 backdrop-blur-2xl p-4 shadow-2xl overflow-hidden z-20 hover:scale-[1.03] transition-all duration-300 hover:border-primary/50"
      >
        {/* Card Header: Live Audio Engine */}
        <div className="flex items-center justify-between border-b border-border/40 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-bold text-foreground">9278.ai Voice Core</span>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-500 border border-emerald-500/20">
            0ms STT Relay
          </span>
        </div>

        {/* Real-Time EHR Action Badge */}
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 mb-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-primary">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              EHR Action Executed
            </span>
            <span className="flex items-center gap-0.5 text-emerald-500">
              <Check className="size-3 stroke-[3]" />
              Synced
            </span>
          </div>
          <p className="text-xs font-bold text-foreground truncate">
            {current.bookingDetail}
          </p>
        </div>

        {/* Live Audio Spectrum Equalizer Line */}
        <div className="rounded-2xl border border-border/50 bg-background/80 p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Volume2 className="size-4 text-primary animate-pulse" />
            <span className="text-[11px] text-muted-foreground">Live Waveform</span>
          </div>
          <div className="flex items-center gap-1 h-3.5">
            {[40, 90, 60, 100, 50, 85, 70].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-primary animate-pulse"
                style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function HeroMetricsCard() {
  return (
    <div className="mt-8 rounded-2xl border border-white/80 dark:border-white/10 bg-card/75 backdrop-blur-2xl p-4 md:p-5 shadow-xl transition-all hover:border-primary/40 hover:scale-[1.01]">
      <div className="grid grid-cols-3 divide-x divide-border/50 text-center">
        <div className="px-2 md:px-4">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-semibold mb-1">
            <Clock className="size-3.5 text-primary" />
            <span>Response</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-primary tracking-tight">&lt; 3s</p>
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium mt-0.5">First-touch response</p>
        </div>

        <div className="px-2 md:px-4">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-semibold mb-1">
            <Phone className="size-3.5 text-primary" />
            <span>Capacity</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-primary tracking-tight">40+</p>
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium mt-0.5">Concurrent calls</p>
        </div>

        <div className="px-2 md:px-4">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-semibold mb-1">
            <DollarSign className="size-3.5 text-primary" />
            <span>Rate</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-primary tracking-tight">$0.10</p>
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium mt-0.5">Per-minute, from</p>
        </div>
      </div>
    </div>
  )
}
