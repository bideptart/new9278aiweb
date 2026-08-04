"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Home,
  Mic,
  Calendar,
  UserCheck,
  CheckCircle2,
  Play,
  Pause,
  Clock,
  User,
  Activity,
  Zap,
  Volume2,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RealEstateFolderGalleryHeroProps {
  industryName?: string
  subtitle?: string
  slug?: string
}

const INDUSTRY_BADGE_MAP: Record<string, { title: string; subtitle: string }> = {
  "real-estate": { title: "REAL ESTATE", subtitle: "PREMIUM PROPERTY" },
  "ecommerce": { title: "E-COMMERCE", subtitle: "RETAIL & CART RECOVERY" },
  "finance": { title: "FINANCIAL SERVICES", subtitle: "BANKING & ASSET VAULT" },
  "home-services": { title: "HOME SERVICES", subtitle: "DISPATCH & FIELD WORK" },
  "restaurants": { title: "RESTAURANTS", subtitle: "HOSPITALITY & DINING" },
  "healthcare": { title: "HEALTHCARE", subtitle: "MEDICAL & PATIENT CARE" },
  "dental": { title: "DENTAL & WELLNESS", subtitle: "CLINICAL & APPOINTMENTS" },
  "logistics": { title: "LOGISTICS & FLEET", subtitle: "DISPATCH & FREIGHT" },
  "automotive": { title: "AUTOMOTIVE", subtitle: "DEALERSHIP & SERVICE" },
  "legal": { title: "LEGAL PRACTICE", subtitle: "CASE & CLIENT INTAKE" },
  "education": { title: "EDUCATION", subtitle: "ADMISSIONS & ENROLLMENT" },
}

export function RealEstateFolderGalleryHero({
  industryName,
  subtitle,
  slug = "real-estate",
}: RealEstateFolderGalleryHeroProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)

  // Resolve dynamic industry badge title and subtitle
  const badgeInfo = INDUSTRY_BADGE_MAP[slug] || {
    title: industryName?.toUpperCase() || "REAL ESTATE",
    subtitle: subtitle?.toUpperCase() || "PREMIUM PROPERTY",
  }

  const badgeTitle = industryName ? industryName.toUpperCase() : badgeInfo.title
  const badgeSubtitle = subtitle ? subtitle.toUpperCase() : badgeInfo.subtitle

  const stages = [
    {
      topBadge: { label: "Loan Pre-Approval Verified", icon: ShieldCheck },
      rightBadge: { label: "₹1.5 Cr Budget Approved", icon: CheckCircle2 },
      leftBadge: { label: "Self-Use Lead Tagged", icon: User },
      bottomBadge: { label: "High Intent Score 98/100", icon: Sparkles },
      dialogue: "“I&apos;ve verified your pre-approved home loan status and matched your ₹1.5 Cr budget requirement!”",
    },
    {
      topBadge: { label: "Sub-3s Answer Speed", icon: Zap },
      rightBadge: { label: "Housing.com Lead Intake", icon: Home },
      leftBadge: { label: "Hindi & English AI Host", icon: Mic },
      bottomBadge: { label: "Buyer Qualification", icon: UserCheck },
      dialogue: "“Hi Rahul! Thanks for enquiring on Housing.com about Kothrud Heights — are you looking for a 2BHK or 3BHK layout?”",
    },
    {
      topBadge: { label: "Saturday 11 AM Locked", icon: Calendar },
      rightBadge: { label: "Google Calendar Synced", icon: Check },
      leftBadge: { label: "Broker Handoff Complete", icon: UserCheck },
      bottomBadge: { label: "SMS Confirmation Sent", icon: Clock },
      dialogue: "“I have locked Saturday at 11:00 AM for your VIP site walkthrough directly on our senior broker&apos;s calendar!”",
    },
    {
      topBadge: { label: "WhatsApp Floor Plan Sent", icon: CheckCircle2 },
      rightBadge: { label: "Google Maps Pin Relayed", icon: Building2 },
      leftBadge: { label: "PDF Brochure Attached", icon: Volume2 },
      bottomBadge: { label: "Sub-250ms Latency", icon: Activity },
      dialogue: "“HD floor plans, pricing sheets & site location directions have been dispatched straight to your WhatsApp!”",
    },
  ]

  // Automatic 2.5-Second Time Lapse Shift Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 2500)

    return () => clearInterval(timer)
  }, [stages.length])

  // CONTINUOUS 60FPS ALWAYS-WORKING 3D AUDIO SPECTRUM CANVAS
  useEffect(() => {
    let animationFrameId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let step = 0
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const bars = 26
      const barWidth = canvas.width / bars

      const speed = isPlayingAudio ? 0.22 : 0.09
      const maxAmp = isPlayingAudio ? canvas.height - 4 : (canvas.height - 10) * 0.65

      ctx.shadowColor = "rgba(251, 164, 164, 0.35)"
      ctx.shadowBlur = isPlayingAudio ? 12 : 5
      ctx.shadowOffsetY = 2

      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0)
      grad.addColorStop(0, "rgba(251, 164, 164, 0.25)")
      grad.addColorStop(0.5, "rgba(244, 164, 164, 0.7)")
      grad.addColorStop(1, "rgba(252, 191, 191, 1)")
      ctx.fillStyle = grad

      for (let i = 0; i < bars; i++) {
        const wave = Math.sin(step * speed + i * 0.35) * 0.5 + 0.5
        const height = Math.max(6, wave * maxAmp)

        ctx.beginPath()
        ctx.roundRect(i * barWidth + 2, (canvas.height - height) / 2, barWidth - 4, height, 4)
        ctx.fill()
      }

      step++
      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [isPlayingAudio])

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
  const RightIcon = currentStage.rightBadge.icon
  const LeftIcon = currentStage.leftBadge.icon
  const BottomIcon = currentStage.bottomBadge.icon

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24 overflow-hidden border-b border-border/40 bg-white dark:bg-gray-950"
    >
      {/* Soft Ambient Light Glow & Subtle Red Blur Accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Value Prop */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="ai-pill-magenta inline-flex items-center gap-2 text-[11px] font-normal tracking-wider mb-3 shadow-xs">
              <Sparkles className="size-3.5 text-primary animate-pulse" />
              <span>NEXT-GEN REAL ESTATE VOICE ENGINE</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
            Autonomous AI voice agents <br />
            <span className="italic text-primary">
              for real estate developers.
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg font-normal">
            Stop losing 60%+ of weekend portal inquiries. 9278.ai answers inbound calls in under 3 seconds across Housing.com, 99acres & MagicBricks, qualifies budget & loan pre-approval live, locks site walkthroughs on broker calendars, and dispatches WhatsApp floor plans instantly.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Clock className="size-3.5 text-primary" />
              24/7 Portal Intake
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <User className="size-3.5 text-primary" />
              Loan & Budget Qualify
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Calendar className="size-3.5 text-primary" />
              Broker Calendar Sync
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md transition-all cursor-pointer font-normal"
            >
              <Link href="/get-started?industry=real-estate">
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

        {/* Right Column: 3D DYNAMIC INDUSTRY PENTAGON BADGE MOCKUP */}
        <div className="lg:col-span-6 flex justify-center perspective-[1200px] pt-6 lg:pt-0">
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg min-h-[520px] flex flex-col items-center justify-center transition-transform duration-200 ease-out transform-gpu"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D REAL ESTATE ARCH BADGE CARD SHAPE (MATCHING ALL OTHER 5 HERO IMAGES) */}
            <div 
              className="relative w-[310px] sm:w-[350px] md:w-[370px] h-[390px] sm:h-[430px] rounded-[44px] bg-gradient-to-b from-white via-[#fff5f5] to-[#fee2e2] text-primary shadow-[0_20px_50px_rgba(244,91,91,0.15)] backdrop-blur-2xl flex flex-col items-center justify-between p-6 sm:p-8 text-center select-none [transform:translateZ(20px)] border-4 border-white overflow-visible transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(251,164,164,0.18)] cursor-pointer"
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
                  {/* Top Roof Peak Badge (Half inside top peak, half outside) */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 rounded-full bg-card/95 border border-primary/30 px-3.5 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap [transform:translateZ(65px)]">
                    <TopIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.topBadge.label}</span>
                  </div>

                  {/* Left Roof Edge Badge (Staggered top-20 to avoid overlap) */}
                  <div className="absolute top-20 -left-4 sm:-left-8 max-w-[145px] sm:max-w-[175px] z-40 rounded-full bg-card/95 border border-primary/30 px-3 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 [transform:translateZ(65px)]">
                    <LeftIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.leftBadge.label}</span>
                  </div>

                  {/* Right Roof Edge Badge (Staggered top-36 to avoid overlap) */}
                  <div className="absolute top-36 -right-4 sm:-right-8 max-w-[145px] sm:max-w-[175px] z-40 rounded-full bg-card/95 border border-primary/30 px-3 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 [transform:translateZ(65px)]">
                    <RightIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.rightBadge.label}</span>
                  </div>

                  {/* Bottom Wall Edge Badge (Half inside bottom wall, half outside) */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-40 rounded-full bg-card/95 border border-primary/30 px-3.5 py-1 text-[11px] font-normal text-foreground shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap [transform:translateZ(65px)]">
                    <BottomIcon className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{currentStage.bottomBadge.label}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* 3D GLOWING CONCENTRIC ARCH RING & LAYERED 3D REAL ESTATE SKYLINE GRAPHIC */}
              <div className="relative w-full h-[65%] flex flex-col items-center justify-center mt-2 [transform-style:preserve-3d]">
                {/* 3D Glowing Pulsing Concentric Outer Ring Halos (translateZ: 30px) */}
                <div className="absolute size-56 sm:size-64 rounded-full border-4 border-white/90 border-b-transparent shadow-[0_0_25px_rgba(255,255,255,0.8)] pointer-events-none -top-2 animate-pulse [transform:translateZ(30px)]" />
                <div className="absolute size-52 sm:size-60 rounded-full border-2 border-dashed border-white/80 border-b-transparent pointer-events-none top-0 animate-spin [animation-duration:20s] [transform:translateZ(40px)]" />

                {/* Floating 3D Orbiting Real Estate Badges */}
                <div className="absolute top-2 left-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3s] [transform:translateZ(55px)]">
                  <Home className="size-3.5" />
                </div>

                <div className="absolute top-4 right-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3.5s] [transform:translateZ(55px)]">
                  <Sparkles className="size-3.5" />
                </div>

                {/* Layered 3D Real Estate Skyline Vector Graphics (High-Rise Apartment & Villa Roofs - translateZ: 50px) */}
                <div className="relative z-10 flex flex-col items-center justify-center mt-4 [transform:translateZ(50px)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-rose-400/20 blur-xl rounded-full" />
                  <svg className="w-36 h-28 text-white fill-current drop-shadow-[0_15px_30px_rgba(251,164,164,0.3)] relative z-10" viewBox="0 0 200 150">
                    {/* High Rise Tower */}
                    <rect x="75" y="30" width="50" height="90" rx="3" fill="#ffffff" />
                    {/* Tower Windows */}
                    <rect x="85" y="40" width="10" height="10" fill="#f9b4b4" opacity="0.6" />
                    <rect x="105" y="40" width="10" height="10" fill="#f9b4b4" opacity="0.6" />
                    <rect x="85" y="58" width="10" height="10" fill="#f9b4b4" opacity="0.6" />
                    <rect x="105" y="58" width="10" height="10" fill="#f9b4b4" opacity="0.6" />
                    <rect x="85" y="76" width="10" height="10" fill="#f9b4b4" opacity="0.6" />
                    <rect x="105" y="76" width="10" height="10" fill="#f9b4b4" opacity="0.6" />

                    {/* Left Mid-Rise Building */}
                    <polygon points="40,60 75,40 75,120 40,120" fill="#ffffff" opacity="0.9" />
                    {/* Right Mid-Rise Building */}
                    <polygon points="125,50 160,70 160,120 125,120" fill="#ffffff" opacity="0.9" />

                    {/* Front Suburban Villa Roof 1 */}
                    <polygon points="25,120 65,85 105,120" fill="#ffffff" stroke="#f9b4b4" strokeWidth="3" />
                    <rect x="55" y="98" width="12" height="12" fill="#f9b4b4" rx="1" />

                    {/* Front Suburban Villa Roof 2 */}
                    <polygon points="95,120 135,75 175,120" fill="#ffffff" stroke="#f9b4b4" strokeWidth="3" />
                    <rect x="125" y="92" width="14" height="14" fill="#f9b4b4" rx="1" />
                  </svg>
                </div>
              </div>

              {/* Dynamic Typography Matching Current Industry */}
              <div className="relative z-10 mb-2 flex flex-col items-center max-w-full px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-rose-300 dark:text-rose-400 uppercase font-sans drop-shadow-xs truncate max-w-full">
                  {badgeTitle}
                </h2>
              </div>
            </div>

            {/* STYLISH 3D FLOATING GLASS VOICE TELEMETRY CONSOLE (LIGHT PASTEL ROSE - NO SOLID RED) */}
            <div className="relative mt-6 w-full max-w-sm sm:max-w-md rounded-3xl border border-rose-200/60 dark:border-rose-900/50 bg-gradient-to-r from-card/95 via-rose-50/50 to-card/95 dark:from-card/95 dark:via-rose-950/30 dark:to-card/95 p-4 shadow-[0_15px_40px_rgba(251,164,164,0.10)] backdrop-blur-2xl [transform:translateZ(60px)] z-40 overflow-hidden">
              {/* Glowing Top Edge Line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />

              {/* Console Header Bar */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-400 dark:text-rose-300 border border-rose-200/80 shadow-xs flex items-center justify-center animate-pulse">
                    <Mic className="size-4 text-rose-400 dark:text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xs font-normal text-foreground">AI Voice Telemetry Stream</h3>
                    <p className="text-[9px] font-mono text-rose-400 dark:text-rose-400 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                      LIVE DUAL-STREAM • 247MS
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-400 dark:text-rose-300 border border-rose-200/80 px-3.5 py-1 text-xs font-normal shadow-xs hover:bg-rose-100 hover:scale-105 transition-all cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="size-3 fill-rose-600 text-rose-400 dark:fill-rose-300 dark:text-rose-300" /> : <Play className="size-3 fill-rose-600 text-rose-400 dark:fill-rose-300 dark:text-rose-300" />}
                  <span>{isPlayingAudio ? "Pause" : "Play Script"}</span>
                </button>
              </div>

              {/* 2D/3D Canvas Spectrum */}
              <div className="h-10 w-full flex items-center justify-center my-1">
                <canvas ref={canvasRef} width={300} height={40} className="w-full h-full drop-shadow-[0_2px_8px_rgba(251,164,164,0.25)]" />
              </div>

              {/* Auto-Shifting Speech Dialogue Ribbon */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 pt-2 border-t border-border/30 text-xs text-foreground font-serif italic leading-relaxed min-h-[42px] flex items-center"
                >
                  {currentStage.dialogue.replace(/&apos;/g, "'")}
                </motion.div>
              </AnimatePresence>

              {/* 3D Stage Navigation Pills (Soft Light Rose - No Solid Red) */}
              <div className="mt-3 pt-2 border-t border-border/30 grid grid-cols-4 gap-1">
                {["1. Intake", "2. Qualify", "3. Lock", "4. WhatsApp"].map((stageLabel, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={cn(
                      "text-[10px] font-normal py-1 px-1 rounded-lg border text-center transition-all cursor-pointer truncate",
                      idx === activeStage
                        ? "bg-rose-100 dark:bg-rose-900/70 text-rose-400 dark:text-rose-200 border-rose-300 dark:border-rose-700 font-semibold shadow-xs"
                        : "bg-card/70 text-muted-foreground border-border/50 hover:bg-card"
                    )}
                  >
                    {stageLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
