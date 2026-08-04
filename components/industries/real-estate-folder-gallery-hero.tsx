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
  Clock,
  User,
  Activity,
  Zap,
  Volume2,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TypewriterText } from "@/components/animation/typewriter-text"
import { HeroStatCube3D, type StatCubeFace } from "@/components/industries/hero-stat-cube-3d"

const HERO_STAT_FACES: StatCubeFace[] = [
  { icon: Zap, value: "<3s", label: "Portal Answer Speed", caption: "Housing.com, 99acres & MagicBricks enquiries answered in under 3 seconds, 24/7." },
  { icon: ShieldCheck, value: "98%", label: "Loan Match Accuracy", caption: "Budget and home-loan pre-approval verified live, before a broker ever picks up." },
  { icon: Calendar, value: "1-Click", label: "Site Walkthrough Lock", caption: "Broker calendars checked live and Saturday walkthroughs locked on the call." },
  { icon: Activity, value: "250ms", label: "Voice Latency", caption: "Sub-250ms audio keeps every buyer conversation feeling human, not robotic." },
]

const HEADLINE_PHRASES = [
  "for real estate developers.",
  "for property brokers & agents.",
  "for site visit scheduling.",
  "for loan & budget qualification.",
]

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
  const [activeStage, setActiveStage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
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
      className="relative w-full max-w-7xl mx-auto px-4 pt-14 pb-8 md:px-6 md:pt-16 md:pb-12 overflow-hidden border-b border-border/40 bg-white dark:bg-gray-950"
    >
      {/* Soft Ambient Light Glow & Subtle Red Blur Accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-20"
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
            <TypewriterText phrases={HEADLINE_PHRASES} className="italic text-primary" />
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
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg min-h-[400px] flex flex-col items-center justify-center transition-transform duration-200 ease-out transform-gpu"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D REAL ESTATE ARCH BADGE CARD SHAPE (MATCHING ALL OTHER 5 HERO IMAGES) */}
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
                <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-wider text-rose-300 dark:text-rose-400 uppercase font-sans drop-shadow-xs text-center leading-tight">
                  {badgeTitle}
                </h2>
              </div>
            </div>

            <HeroStatCube3D
              title="AI Voice Metrics Cube"
              liveTag="LIVE PORTAL SYNC • 247MS"
              faces={HERO_STAT_FACES}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
