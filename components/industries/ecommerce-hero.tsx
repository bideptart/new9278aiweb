"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ShoppingBag,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Volume2,
  Truck,
  RotateCcw,
  Check,
  User,
  Clock,
  Play,
  Activity,
  Gift,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TypewriterText } from "@/components/animation/typewriter-text"
import { HeroStatCube3D, type StatCubeFace } from "@/components/industries/hero-stat-cube-3d"

const HERO_STAT_FACES: StatCubeFace[] = [
  { icon: Zap, value: "<3s", label: "Response Speed", caption: "Every order and delivery query answered in under 3 seconds, 24/7." },
  { icon: Truck, value: "Live", label: "Carrier Tracking Sync", caption: "Shiprocket & Delhivery status pulled live and read back on the call." },
  { icon: Gift, value: "+32%", label: "Cart Recovery Boost", caption: "Abandoned carts recovered with instant promo codes and 1-click UPI links." },
  { icon: ShieldCheck, value: "PCI-DSS", label: "Compliant by Default", caption: "Every payment conversation encrypted and compliant out of the box." },
]

const HEADLINE_PHRASES = [
  "retail & e-commerce stores.",
  "abandoned cart recovery.",
  "order tracking & delivery.",
  "returns & exchange support.",
]

export function EcommerceHero() {
  const [activeStage, setActiveStage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const heroRef = useRef<HTMLDivElement | null>(null)

  const stages = [
    {
      topBadge: { label: "PCI-DSS & GDPR Compliant", icon: ShieldCheck },
      leftBadge: { label: "Omnichannel Inventory Synced", icon: Check },
      rightBadge: { label: "Flash Sale Verified", icon: ShoppingBag },
      bottomBadge: { label: "One-Day Delivery Active", icon: Clock },
      dialogue: "“Hi Ananya! Calling from FashionHub regarding your COD order #9842 — can I confirm delivery for tomorrow afternoon?”",
    },
    {
      topBadge: { label: "Shiprocket API Synced", icon: Truck },
      leftBadge: { label: "Live Carrier Status", icon: CheckCircle2 },
      rightBadge: { label: "Sub-250ms Voice Latency", icon: Zap },
      bottomBadge: { label: "WhatsApp Tracking Sent", icon: Sparkles },
      dialogue: "“Your order #9910 is out for delivery with Delhivery. The live tracking link has been dispatched straight to your WhatsApp!”",
    },
    {
      topBadge: { label: "Shopify Cart Restored", icon: ShoppingBag },
      leftBadge: { label: "10% Promo Code SAVE10", icon: Gift },
      rightBadge: { label: "1-Click Razorpay UPI", icon: Check },
      bottomBadge: { label: "+32% Recovery Boost", icon: Sparkles },
      dialogue: "“I noticed you left the Linen Blazer in your cart! I can apply an instant 10% promo discount and send a 1-click UPI link right now.”",
    },
    {
      topBadge: { label: "Auto Return Intake", icon: RotateCcw },
      leftBadge: { label: "Doorstep Pickup Scheduled", icon: Truck },
      rightBadge: { label: "Store Credit Issued", icon: CheckCircle2 },
      bottomBadge: { label: "Zero Handoff Friction", icon: ShieldCheck },
      dialogue: "“I&apos;ve initiated the size exchange for your Nike Air Max. Doorstep pickup is scheduled for tomorrow at 10 AM!”",
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
              <li className="text-foreground font-normal">Retail & E-Commerce</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="ai-pill-magenta inline-flex items-center gap-2 text-[11px] font-normal tracking-wider shadow-xs">
              <Sparkles className="size-3.5 text-primary animate-pulse" />
              <span>E-COMMERCE VOICE REVENUE ENGINE</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
            AI voice agents for <br />
            <TypewriterText phrases={HEADLINE_PHRASES} className="italic text-primary" />
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg font-normal">
            Automate COD verification, WISMO order tracking, and size exchanges on 24/7 AI voice calls. Connect Shopify, WooCommerce & Shiprocket in under 3 minutes with sub-250ms latency.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <ShoppingBag className="size-3.5 text-primary" />
              COD Verification
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Truck className="size-3.5 text-primary" />
              WISMO Carrier Sync
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Gift className="size-3.5 text-primary" />
              32% Cart Recovery
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md transition-all cursor-pointer font-normal"
            >
              <Link href="/get-started?industry=ecommerce">
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

        {/* Right Column: 3D RETAIL & E-COMMERCE BADGE MOCKUP (EXACT MATCH TO UPLOADED IMAGE) */}
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

            {/* 3D RETAIL & E-COMMERCE BADGE CARD SHAPE (ROUNDED ARCH CARD MATCHING UPLOADED IMAGE) */}
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

              {/* 3D GLOWING CONCENTRIC ARCH RING & LAYERED 3D RETAIL FULFILLMENT GRAPHIC */}
              <div className="relative w-full h-[68%] flex flex-col items-center justify-center mt-2 [transform-style:preserve-3d]">
                {/* 3D Glowing Pulsing Concentric Outer Ring Halos (translateZ: 30px) */}
                <div className="absolute size-56 sm:size-64 rounded-full border-4 border-white/90 border-b-transparent shadow-[0_0_25px_rgba(255,255,255,0.8)] pointer-events-none -top-2 animate-pulse [transform:translateZ(30px)]" />
                <div className="absolute size-52 sm:size-60 rounded-full border-2 border-dashed border-white/80 border-b-transparent pointer-events-none top-0 animate-spin [animation-duration:20s] [transform:translateZ(40px)]" />

                {/* Floating 3D Orbiting Retail Badges */}
                <div className="absolute top-2 left-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3s] [transform:translateZ(55px)]">
                  <ShoppingBag className="size-3.5" />
                </div>

                <div className="absolute top-4 right-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3.5s] [transform:translateZ(55px)]">
                  <Star className="size-3.5 fill-primary text-primary" />
                </div>

                {/* Layered 3D Isometric Retail Store & Fulfillment Center Graphic (Matching Uploaded Image - translateZ: 50px) */}
                <div className="relative z-10 flex flex-col items-center justify-center mt-4 [transform:translateZ(50px)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-rose-400/20 blur-xl rounded-full" />
                  <svg className="w-44 h-36 drop-shadow-[0_15px_30px_rgba(251,164,164,0.3)] relative z-10" viewBox="0 0 220 170">
                    {/* Ground Platform */}
                    <polygon points="110,150 190,110 110,70 30,110" fill="#fecaca" opacity="0.6" />

                    {/* Left Retail Storefront Building */}
                    <polygon points="35,100 75,80 75,120 35,140" fill="#ffffff" />
                    <polygon points="75,80 100,92 100,132 75,120" fill="#fee2e2" />
                    <polygon points="35,100 75,80 100,92 60,112" fill="#f9b4b4" opacity="0.9" />
                    {/* Store Awning Stripes */}
                    <polygon points="35,100 45,95 55,100 45,105" fill="#ffffff" />
                    <polygon points="55,100 65,95 75,100 65,105" fill="#ffffff" />
                    {/* Store Door & Windows */}
                    <rect x="50" y="108" width="10" height="18" fill="#f9b4b4" opacity="0.7" rx="1" />
                    <rect x="65" y="105" width="8" height="10" fill="#f9b4b4" opacity="0.7" rx="1" />

                    {/* Center Shopping Cart with Gift Box on Conveyor Path */}
                    <path d="M 75,115 C 90,125 110,125 125,115" stroke="#ffffff" strokeWidth="4" fill="none" strokeDasharray="3 3" />
                    <g transform="translate(90, 80)">
                      <rect x="5" y="5" width="22" height="16" rx="3" fill="#ffffff" stroke="#f9b4b4" strokeWidth="2" />
                      <circle cx="10" cy="24" r="3" fill="#f9b4b4" />
                      <circle cx="22" cy="24" r="3" fill="#f9b4b4" />
                      {/* Gift Box Inside Cart */}
                      <rect x="9" y="-2" width="14" height="10" rx="2" fill="#fca5a5" />
                      <path d="M 16,-2 V 8 M 9,3 H 23" stroke="#ffffff" strokeWidth="1.5" />
                    </g>

                    {/* Right E-Commerce Fulfillment Warehouse */}
                    <polygon points="125,75 175,50 175,105 125,130" fill="#ffffff" />
                    <polygon points="175,50 200,65 200,120 175,105" fill="#fee2e2" />
                    <polygon points="125,75 175,50 200,65 150,90" fill="#f9b4b4" />
                    {/* Warehouse Arch Door */}
                    <path d="M 140,100 A 12,12 0 0 1 164,100 V 122 H 140 Z" fill="#f9b4b4" opacity="0.8" />

                    {/* Delivery Trucks (Fulfillment Dispatch) */}
                    <g transform="translate(155, 105)">
                      <rect x="0" y="0" width="20" height="14" rx="2" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <rect x="18" y="4" width="8" height="10" rx="1" fill="#fee2e2" />
                      <circle cx="5" cy="15" r="2.5" fill="#f9b4b4" />
                      <circle cx="18" cy="15" r="2.5" fill="#f9b4b4" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Typography Matching Uploaded Image */}
              <div className="relative z-10 mb-2 flex flex-col items-center max-w-full px-2">
                <h2 className="text-base sm:text-lg md:text-xl font-normal tracking-wider text-rose-300 dark:text-rose-400 uppercase font-sans drop-shadow-xs text-center leading-tight">
                  RETAIL & E-COMMERCE
                </h2>
              </div>
            </div>

            <HeroStatCube3D
              title="Retail Voice Metrics Cube"
              liveTag="SHOPIFY & SHIPROCKET SYNCED"
              faces={HERO_STAT_FACES}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
