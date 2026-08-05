"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  Wrench,
  ShieldCheck,
  ArrowRight,
  Zap,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Clock,
  Flame,
  Droplets,
  Activity,
  UserCheck,
  Truck,
  Sparkles,
  Home,
  Check,
  Play,
  Volume2,
  Key,
  RefreshCw,
  Power,
  Sofa,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TypewriterText } from "@/components/animation/typewriter-text"
import { HeroStatCube3D, type StatCubeFace } from "@/components/industries/hero-stat-cube-3d"

const HEADLINE_PHRASES = [
  "for home & living services.",
  "for emergency dispatch calls.",
  "for HVAC & plumbing jobs.",
  "for technician scheduling.",
]

const HERO_STAT_FACES: StatCubeFace[] = [
  { icon: Flame, value: "12 min", label: "Emergency Dispatch ETA", caption: "HVAC and plumbing emergencies routed to the nearest available technician." },
  { icon: Wrench, value: "Live", label: "ServiceTitan Sync", caption: "Job details, parts, and arrival windows synced straight to your field CRM." },
  { icon: Zap, value: "<3s", label: "Call Answer Speed", caption: "Every service call picked up instantly — no missed emergency jobs." },
  { icon: MapPin, value: "Real-Time", label: "Technician Tracking", caption: "Customers get live ETA updates without a single manual dispatch call." },
]

export function HomeServicesHero() {
  const [activeStage, setActiveStage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const heroRef = useRef<HTMLDivElement | null>(null)

  const stages = [
    {
      topBadge: { label: "Smart Home Presets Restored", icon: Power },
      leftBadge: { label: "Premium Furnishings Code SAVE20", icon: Sofa },
      rightBadge: { label: "1-Click Appliance Installation", icon: Wrench },
      bottomBadge: { label: "+45% Efficiency Boost", icon: Sparkles },
      dialogue: "“Hi Vikram! Calling from HomePro Services — your kitchen appliance installation is locked for tomorrow at 10 AM!”",
    },
    {
      topBadge: { label: "Emergency HVAC Dispatch", icon: Flame },
      leftBadge: { label: "Tech 12 Mins Away", icon: Truck },
      rightBadge: { label: "ServiceTitan API Synced", icon: CheckCircle2 },
      bottomBadge: { label: "Sub-3s Response Time", icon: Zap },
      dialogue: "“Emergency AC dispatch confirmed! Technician Mike is 2.4 miles out with an ETA of 12 minutes.”",
    },
    {
      topBadge: { label: "Hydro Leak Shutoff Guide", icon: Droplets },
      leftBadge: { label: "Housecall Pro Synced", icon: Check },
      rightBadge: { label: "Basement Pipe Repair", icon: Wrench },
      bottomBadge: { label: "Surge Priority Active", icon: ShieldCheck },
      dialogue: "“Hydro leak alert logged. Main water shutoff video instructions have been sent straight to your WhatsApp!”",
    },
    {
      topBadge: { label: "200A Electrical Upgrade", icon: Zap },
      leftBadge: { label: "EV Charger Permit Ready", icon: CheckCircle2 },
      rightBadge: { label: "Jobber Calendar Synced", icon: Clock },
      bottomBadge: { label: "Arrival Window Locked", icon: Sparkles },
      dialogue: "“Your 200A electrical panel upgrade and EV charger installation window is locked for Friday at 9:00 AM!”",
    },
  ]

  // Automatic 2.5-Second Time Lapse Shift Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 2500)

    return () => clearInterval(timer)
  }, [stages.length])

  // Throttled mouse move tracker for lag-free 3D perspective tilt
  const rafId = useRef<number | null>(null)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current || rafId.current !== null) return
    const clientX = e.clientX
    const clientY = e.clientY
    rafId.current = requestAnimationFrame(() => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((clientX - rect.left) / rect.width) * 100
        const y = ((clientY - rect.top) / rect.height) * 100
        setMousePos({ x, y })
      }
      rafId.current = null
    })
  }, [])

  // Smooth 3D tilt angles
  const tiltX = (mousePos.y - 50) * -0.15
  const tiltY = (mousePos.x - 50) * 0.15

  const currentStage = stages[activeStage]
  const TopIcon = currentStage.topBadge.icon
  const LeftIcon = currentStage.leftBadge.icon
  const RightIcon = currentStage.rightBadge.icon
  const BottomIcon = currentStage.bottomBadge.icon

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-7xl mx-auto px-4 pt-28 pb-8 md:px-6 md:pt-24 md:pb-12 overflow-hidden border-b border-border/40 bg-white dark:bg-gray-950"
    >
      {/* Soft Ambient Light Glow & Subtle Red Blur Accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-20"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Value Prop */}
        <div className="lg:col-span-6 space-y-6">
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
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
              <li className="text-foreground font-normal">Home & Living Services</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="ai-pill-magenta inline-flex items-center gap-2 text-[11px] font-normal tracking-wider shadow-xs">
              <Sparkles className="size-3.5 text-primary animate-pulse" />
              <span>SERVICETITAN & HOUSECALL PRO DISPATCH ENGINE</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
            Autonomous AI voice agents <br />
            <TypewriterText phrases={HEADLINE_PHRASES} className="italic text-primary" />
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg font-normal">
            Dispatch technicians 24/7 without dispatcher burnout. 9278.ai answers inbound calls in under 3 seconds — diagnoses HVAC, plumbing & electrical emergencies, dispatches nearest technicians, and syncs live into ServiceTitan, Housecall Pro & Jobber.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Wrench className="size-3.5 text-primary" />
              1-Click Installation
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Truck className="size-3.5 text-primary" />
              Live Technician Dispatch
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-primary" />
              ServiceTitan & Jobber Synced
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md transition-all cursor-pointer font-normal"
            >
              <Link href="/get-started?industry=home-services">
                Get Started <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border/70 bg-card/50 px-7 backdrop-blur-md hover:border-primary/40 hover:bg-card/80 transition-all font-normal cursor-pointer"
            >
              <Link href="/pricing" className="flex items-center gap-2">
                <Play className="size-3.5 fill-current text-primary" />
                View Pricing
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column: 3D HOME & LIVING BADGE MOCKUP (EXACT MATCH TO UPLOADED IMAGE) */}
        <div className="lg:col-span-6 flex justify-center perspective-[1200px] pt-6 lg:pt-0">
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg min-h-[400px] flex flex-col items-center justify-center transition-transform duration-200 ease-out transform-gpu"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ambient Red Glow Halo Base */}
            <div className="absolute bottom-10 size-72 md:size-80 rounded-full bg-gradient-to-tr from-primary/30 via-rose-500/20 to-primary/10 blur-2xl opacity-75" />

            {/* 3D HOME & LIVING BADGE CARD SHAPE (ROUNDED ARCH CARD MATCHING UPLOADED IMAGE) */}
            <div 
              className="relative w-[260px] sm:w-[290px] md:w-[310px] h-[320px] sm:h-[350px] rounded-[40px] bg-gradient-to-b from-white via-[#fff5f5] to-[#fee2e2] text-primary shadow-[0_20px_50px_rgba(244,91,91,0.15)] backdrop-blur-2xl flex flex-col items-center justify-between p-5 sm:p-6 text-center select-none [transform:translateZ(20px)] border-4 border-white overflow-visible transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(251,164,164,0.18)] cursor-pointer"
            >
              {/* Automatic Shifting 3D Status Badges (Overlapping half inside, half outside the badge rim) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                  className="contents"
                >
                  {/* Top Center Badge (Half inside top edge, half outside) */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 rounded-full bg-card/95 border border-primary/30 px-3.5 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap [transform:translateZ(65px)]">
                    <TopIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.topBadge.label}</span>
                  </div>

                  {/* Left Side Badge (Staggered top-20 to avoid overlap) */}
                  <div className="absolute top-20 -left-4 sm:-left-8 max-w-[145px] sm:max-w-[175px] z-40 rounded-full bg-card/95 border border-primary/30 px-3 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 [transform:translateZ(65px)]">
                    <LeftIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.leftBadge.label}</span>
                  </div>

                  {/* Right Side Badge (Staggered top-36 to avoid overlap) */}
                  <div className="absolute top-36 -right-4 sm:-right-8 max-w-[145px] sm:max-w-[175px] z-40 rounded-full bg-card/95 border border-primary/30 px-3 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 [transform:translateZ(65px)]">
                    <RightIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.rightBadge.label}</span>
                  </div>

                  {/* Bottom Edge Badge (Half inside bottom edge, half outside) */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-40 rounded-full bg-card/95 border border-primary/30 px-3.5 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap [transform:translateZ(65px)]">
                    <BottomIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.bottomBadge.label}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 3D GLOWING CONCENTRIC ARCH RING & LAYERED 3D HOME & LIVING INTERIOR GRAPHIC */}
              <div className="relative w-full h-[68%] flex flex-col items-center justify-center mt-2 [transform-style:preserve-3d]">
                {/* 3D Glowing Pulsing Concentric Outer Ring Halos (translateZ: 30px) */}
                <div className="absolute size-56 sm:size-64 rounded-full border-4 border-white/90 border-b-transparent shadow-[0_0_25px_rgba(255,255,255,0.8)] pointer-events-none -top-2 animate-pulse [transform:translateZ(30px)]" />
                <div className="absolute size-52 sm:size-60 rounded-full border-2 border-dashed border-white/80 border-b-transparent pointer-events-none top-0 animate-spin [animation-duration:20s] [transform:translateZ(40px)]" />

                {/* Floating 3D Orbiting Home Badges */}
                <div className="absolute top-2 left-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3s] [transform:translateZ(55px)]">
                  <Key className="size-3.5" />
                </div>

                <div className="absolute top-4 right-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3.5s] [transform:translateZ(55px)]">
                  <RefreshCw className="size-3.5 text-primary" />
                </div>

                {/* Layered 3D Isometric Home & Kitchen Interior Graphic (Matching Uploaded Image - translateZ: 50px) */}
                <div className="relative z-10 flex flex-col items-center justify-center mt-4 [transform:translateZ(50px)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-rose-400/20 blur-xl rounded-full" />
                  <svg className="w-44 h-36 drop-shadow-[0_15px_30px_rgba(251,164,164,0.3)] relative z-10" viewBox="0 0 220 170">
                    {/* Isometric Living Room Floor Rug */}
                    <polygon points="110,150 185,112 110,75 35,112" fill="#fecaca" opacity="0.6" />

                    {/* Living Room Section (Sofa & Coffee Table) */}
                    <g transform="translate(35, 80)">
                      {/* Sofa Seat & Back */}
                      <polygon points="0,20 30,5 50,15 20,30" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="0,20 20,30 20,38 0,28" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="30,5 50,15 50,23 30,13" fill="#f9b4b4" opacity="0.8" />
                      {/* Cushions */}
                      <rect x="8" y="10" width="10" height="8" rx="2" fill="#fca5a5" />
                      <rect x="22" y="16" width="10" height="8" rx="2" fill="#fca5a5" />
                      {/* Coffee Table */}
                      <polygon points="25,32 45,22 60,30 40,40" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                    </g>

                    {/* Kitchen Appliances Section (Refrigerator, Oven Stove & Countertop) */}
                    <g transform="translate(115, 45)">
                      {/* Refrigerator Tower */}
                      <polygon points="0,35 25,20 40,28 15,43" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="0,35 15,43 15,90 0,82" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="15,43 40,28 40,75 15,90" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                      {/* Fridge Door Handle Lines */}
                      <line x1="12" y1="50" x2="12" y2="62" stroke="#f9b4b4" strokeWidth="2" />
                      <line x1="12" y1="68" x2="12" y2="82" stroke="#f9b4b4" strokeWidth="2" />

                      {/* Microwave Stove & Oven Unit */}
                      <g transform="translate(28, 25)">
                        <polygon points="0,25 25,10 50,22 25,37" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                        <polygon points="0,25 25,37 25,62 0,50" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                        <polygon points="25,37 50,22 50,47 25,62" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                        {/* Stove Burner Rings */}
                        <circle cx="15" cy="22" r="3" fill="#f9b4b4" opacity="0.8" />
                        <circle cx="32" cy="18" r="3" fill="#f9b4b4" opacity="0.8" />
                        {/* Oven Glass Door */}
                        <rect x="5" y="32" width="15" height="12" rx="1" fill="#f9b4b4" opacity="0.7" />
                      </g>
                    </g>

                    {/* Wall-Mounted Smart Home Thermostat Hub */}
                    <g transform="translate(145, 25)">
                      <rect x="0" y="0" width="18" height="18" rx="4" fill="#ffffff" stroke="#f9b4b4" strokeWidth="2" />
                      <circle cx="9" cy="9" r="5" fill="#f9b4b4" opacity="0.8" />
                      {/* WiFi Waves */}
                      <path d="M -5,-5 A 10,10 0 0 1 5,-5" stroke="#f9b4b4" strokeWidth="1.5" fill="none" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Typography Matching Uploaded Image */}
              <div className="relative z-10 mb-2 flex flex-col items-center max-w-full px-2">
                <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wider text-rose-300 dark:text-rose-400 uppercase font-sans drop-shadow-xs text-center leading-tight">
                  HOME SERVICES
                </h2>
              </div>
            </div>

            <HeroStatCube3D
              title="Dispatch Voice Metrics Cube"
              liveTag="SERVICETITAN & HOUSECALL PRO"
              faces={HERO_STAT_FACES}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
