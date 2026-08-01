"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Wrench,
  ShieldCheck,
  ArrowRight,
  Bot,
  Zap,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Clock,
  Navigation,
  Flame,
  Droplets,
  Activity,
  ChevronRight,
  UserCheck,
  Truck,
  Sparkles,
  Radio,
  Cpu,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeServicesHero() {
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

    setRotateX(-mouseY / 15)
    setRotateY(mouseX / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const serviceNodes = [
    {
      id: "hvac-dispatch",
      trade: "HVAC Emergency",
      badge: "Priority 1 Alert",
      issue: "No AC in 95°F Heat",
      tech: "Tech Mike R.",
      eta: "12 Mins Out",
      distance: "2.4 Miles",
      action: "Tech Dispatched + GPS SMS Sent",
      software: "ServiceTitan Synced",
      icon: Flame,
    },
    {
      id: "plumbing-dispatch",
      trade: "Plumbing Hydro Leak",
      badge: "Surge Priority",
      issue: "Pipe Burst in Basement",
      tech: "Tech Alex K.",
      eta: "18 Mins Out",
      distance: "3.8 Miles",
      action: "Main Shutoff Video Guide Sent",
      software: "Housecall Pro Synced",
      icon: Droplets,
    },
    {
      id: "electrical-dispatch",
      trade: "Electrical Panel",
      badge: "Scheduled Upgrade",
      issue: "200A EV Charger Install",
      tech: "Tech Dave M.",
      eta: "Friday 9 AM",
      distance: "Estimate Ready",
      action: "Permit & Arrival Window Locked",
      software: "Jobber Synced",
      icon: Zap,
    },
  ]

  // Auto-rotate 3D Hex Nodes every 3.2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveNode((prev) => (prev + 1) % serviceNodes.length)
      }, 3200)
    }
    return () => clearInterval(timer)
  }, [isPlaying, serviceNodes.length])

  const curN = serviceNodes[activeNode]
  const CurIcon = curN.icon

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Soft Rose Background Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/12 via-amber-500/8 to-transparent blur-3xl opacity-70"
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
                <li className="text-foreground font-medium">Home Services</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
                </span>
                <Wrench className="size-3.5 text-rose-500" />
                <span className="font-bold">24/7 FIELD SERVICE DISPATCH ENGINE</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md">
                <ShieldCheck className="size-3.5 text-rose-500" />
                Sub-250ms Emergency Intake
              </span>
            </div>

            <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
              AI voice agents for <span className="italic text-rose-600 dark:text-rose-400">home service pros.</span>
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Capture after-hours HVAC, plumbing, and electrical emergencies on 24/7 AI voice calls. Connect ServiceTitan, Housecall Pro & Jobber to dispatch tech ETA tracking in 3 minutes.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="group btn-ai h-12 rounded-full px-8 shadow-md font-bold cursor-pointer">
                <Link href="/get-started?industry=home-services">
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
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">0 missed</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">After-Hours Calls</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">&lt; 250ms</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Voice AI Latency</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">+42%</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Emergency Job Bookings</p>
              </div>
            </div>
          </div>

          {/* Right Column: BRAND-NEW UNIQUE CIRCULAR 3D HEXAGON COMMAND MATRIX (0 Box Cards!) */}
          <div className="lg:col-span-6 flex items-center justify-center pt-6 lg:pt-0 [perspective:1000px]">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative size-[340px] md:size-[390px] flex items-center justify-center transition-transform duration-200 ease-out"
            >
              {/* 360-Degree Rotating Background Radar Line */}
              <div className="absolute inset-0 rounded-full border border-rose-200/60 dark:border-rose-900/40 bg-gradient-to-br from-rose-500/5 via-amber-500/5 to-transparent shadow-inner backdrop-blur-3xl" />

              {/* Pulsing Concentric Radar Rings */}
              <div className="absolute size-[260px] rounded-full border border-rose-300/30 dark:border-rose-800/30 animate-ping opacity-25" />
              <div className="absolute size-[180px] rounded-full border border-rose-400/20 dark:border-rose-700/20" />

              {/* CENTER 3D DISPATCH COMMAND HOUSE HUB */}
              <div
                className="z-20 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border-2 border-rose-300 dark:border-rose-700 shadow-2xl text-center space-y-1.5 backdrop-blur-xl size-[155px] md:size-[170px] flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  transform: "translateZ(45px)",
                  clipPath: "polygon(50% 0%, 100% 24%, 100% 100%, 0% 100%, 0% 24%)",
                }}
              >
                {/* Pitched Roof Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

                <div className="size-9 mt-3 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shadow-xs">
                  <Home className="size-4.5 text-rose-500 animate-pulse" />
                </div>

                <p className="text-xs font-serif font-bold text-foreground leading-none">9278 Home AI</p>

                {/* Working Equalizer Sound Bars */}
                <div className="flex items-center gap-1 h-3 pt-0.5">
                  {[40, 90, 60, 100, 70, 45].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-rose-500 animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>

                <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Sub-250ms Live
                </span>
              </div>

              {/* 3 ORBITING FLOATING HEXAGON NODES (Arranged in 120-degree orbital positions around center) */}
              {serviceNodes.map((nd, idx) => {
                const isSelected = activeNode === idx
                // 120-deg Orbital Positions
                const angles = [270, 30, 150] // Top, Bottom-Right, Bottom-Left
                const angleRad = (angles[idx] * Math.PI) / 180
                const radius = 135 // Orbital Distance in PX
                const x = Math.cos(angleRad) * radius
                const y = Math.sin(angleRad) * radius

                const IconComp = nd.icon

                return (
                  <button
                    key={nd.id}
                    type="button"
                    onClick={() => {
                      setActiveNode(idx)
                      setIsPlaying(false)
                    }}
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${isSelected ? 40 : 20}px)`,
                    }}
                    className={cn(
                      "absolute z-30 p-3 rounded-2xl transition-all duration-300 text-left space-y-1 cursor-pointer border shadow-lg backdrop-blur-xl max-w-[130px] md:max-w-[145px]",
                      isSelected
                        ? "bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-700 shadow-xl scale-110 ring-2 ring-rose-400/20"
                        : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-muted-foreground hover:border-rose-200 hover:bg-rose-50/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <IconComp className={cn("size-3.5", isSelected ? "text-rose-500" : "text-slate-400")} />
                      <span className={cn("size-2 rounded-full", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300")} />
                    </div>
                    <p className="text-[11px] font-bold text-foreground truncate">{nd.trade}</p>
                    <p className="text-[9px] font-mono font-bold text-rose-600 dark:text-rose-400">{nd.eta}</p>
                  </button>
                )
              })}

              {/* Bottom Active Telemetry HUD Strip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={curN.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[320px] p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-900/50 shadow-xl text-center space-y-0.5 backdrop-blur-xl"
                  style={{ transform: "translate3d(-50%, 0, 35px)" }}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-foreground">{curN.tech} ({curN.distance})</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{curN.software}</span>
                  </div>
                  <p className="text-[9px] font-mono text-rose-600 dark:text-rose-400 font-semibold truncate">
                    {curN.action}
                  </p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
