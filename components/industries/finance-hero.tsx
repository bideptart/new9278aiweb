"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Zap,
  PhoneCall,
  CheckCircle2,
  CreditCard,
  Building2,
  Lock,
  Sparkles,
  Activity,
  Fingerprint,
  Check,
  Clock,
  Play,
  Pause,
  Volume2,
  Mic,
  Star,
  Coins,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FinanceHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)

  const stages = [
    {
      topBadge: { label: "Loan Application Approved", icon: Check },
      leftBadge: { label: "Instant Credit Line for SAVE10 Account", icon: CreditCard },
      rightBadge: { label: "Secured Transactions with multi-layer UPI", icon: ShieldCheck },
      bottomBadge: { label: "+45% Approval Rate", icon: Sparkles },
      dialogue: "“Welcome to Apex Banking! Your ₹15 Lakh home loan pre-approval is verified with an instant credit line!”",
    },
    {
      topBadge: { label: "Biometric Voice Match 99.8%", icon: Fingerprint },
      leftBadge: { label: "FATCA & PAN Portal Synced", icon: CheckCircle2 },
      rightBadge: { label: "PCI-DSS 4.0 Vault Unlocked", icon: Lock },
      bottomBadge: { label: "Sub-240ms Verification", icon: Zap },
      dialogue: "“Voice biometric identity matched with 99.8% confidence. Your high-yield wealth account is now unlocked.”",
    },
    {
      topBadge: { label: "24/7 SWIFT Wire Sentinel", icon: ShieldCheck },
      leftBadge: { label: "Suspicious Wire Flagged", icon: Lock },
      rightBadge: { label: "Voice OTP 2-Factor Passed", icon: CheckCircle2 },
      bottomBadge: { label: "Zero Fraud Liability", icon: Sparkles },
      dialogue: "“Security Alert: We detected a foreign wire attempt. I&apos;ve verified your identity via Voice OTP and secured your vault.”",
    },
    {
      topBadge: { label: "Pre-Approved ₹5 Lakh Credit", icon: Coins },
      leftBadge: { label: "Zero Preclosure Penalty", icon: Check },
      rightBadge: { label: "Instant Disbursal in 60s", icon: Zap },
      bottomBadge: { label: "CIBIL Score 785+ Verified", icon: CheckCircle2 },
      dialogue: "“You qualify for an instant pre-approved credit line upgrade of ₹5 Lakh at a 6.2% fixed interest rate!”",
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
  const LeftIcon = currentStage.leftBadge.icon
  const RightIcon = currentStage.rightBadge.icon
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
              <li className="text-foreground font-normal">Finance & Banking</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="ai-pill-magenta inline-flex items-center gap-2 text-[11px] font-normal tracking-wider shadow-xs">
              <Sparkles className="size-3.5 text-primary animate-pulse" />
              <span>PCI-DSS 4.0 BANK-GRADE VOICE AI ENGINE</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
            Autonomous AI voice agents <br />
            <span className="italic text-primary">
              for banks & financial institutions.
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg font-normal">
            Automate voice biometric KYC verification, pre-approved loan underwriting, and 24/7 SWIFT wire fraud sentinel calls with sub-240ms latency and 99.8% identity precision.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Fingerprint className="size-3.5 text-primary" />
              Voice Biometric KYC
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <Building2 className="size-3.5 text-primary" />
              Core Banking Synced
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-primary" />
              PCI-DSS 4.0 Vault Shield
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md transition-all cursor-pointer font-normal"
            >
              <Link href="/get-started?industry=finance">
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

        {/* Right Column: 3D FINANCE & BANKING BADGE MOCKUP (EXACT MATCH TO UPLOADED IMAGE) */}
        <div className="lg:col-span-6 flex justify-center perspective-[1200px] pt-6 lg:pt-0">
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg min-h-[520px] flex flex-col items-center justify-center transition-transform duration-200 ease-out transform-gpu"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ambient Red Glow Halo Base */}
            <div className="absolute bottom-10 size-72 md:size-80 rounded-full bg-gradient-to-tr from-primary/30 via-rose-500/20 to-primary/10 blur-2xl opacity-75" />

            {/* 3D FINANCE & BANKING BADGE CARD SHAPE (ROUNDED ARCH CARD MATCHING UPLOADED IMAGE) */}
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

              {/* 3D GLOWING CONCENTRIC ARCH RING & LAYERED 3D BANK VAULT & CORE MATRIX GRAPHIC */}
              <div className="relative w-full h-[68%] flex flex-col items-center justify-center mt-2 [transform-style:preserve-3d]">
                {/* 3D Glowing Pulsing Concentric Outer Ring Halos (translateZ: 30px) */}
                <div className="absolute size-56 sm:size-64 rounded-full border-4 border-white/90 border-b-transparent shadow-[0_0_25px_rgba(255,255,255,0.8)] pointer-events-none -top-2 animate-pulse [transform:translateZ(30px)]" />
                <div className="absolute size-52 sm:size-60 rounded-full border-2 border-dashed border-white/80 border-b-transparent pointer-events-none top-0 animate-spin [animation-duration:20s] [transform:translateZ(40px)]" />

                {/* Floating 3D Orbiting Finance Badges */}
                <div className="absolute top-2 left-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3s] [transform:translateZ(55px)]">
                  <Lock className="size-3.5" />
                </div>

                <div className="absolute top-4 right-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3.5s] [transform:translateZ(55px)]">
                  <Star className="size-3.5 fill-primary text-primary" />
                </div>

                {/* Layered 3D Isometric Bank Vault, Currency Stacks & Core Database Graphic (Matching Uploaded Image - translateZ: 50px) */}
                <div className="relative z-10 flex flex-col items-center justify-center mt-4 [transform:translateZ(50px)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-rose-400/20 blur-xl rounded-full" />
                  <svg className="w-44 h-36 drop-shadow-[0_15px_30px_rgba(251,164,164,0.3)] relative z-10" viewBox="0 0 220 170">
                    {/* Isometric Floor Grid Base */}
                    <polygon points="110,150 190,110 110,70 30,110" fill="#fecaca" opacity="0.6" />

                    {/* Left 3D Bank Vault Door Building */}
                    <polygon points="35,90 75,70 75,120 35,140" fill="#ffffff" stroke="#f9b4b4" strokeWidth="2" />
                    <polygon points="75,70 105,85 105,135 75,120" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="2" />
                    <polygon points="35,90 75,70 105,85 65,105" fill="#f9b4b4" />
                    {/* Vault Wheel Handle */}
                    <circle cx="70" cy="105" r="10" fill="#ffffff" stroke="#f9b4b4" strokeWidth="2" />
                    <circle cx="70" cy="105" r="4" fill="#f9b4b4" />
                    <path d="M 70,91 V 119 M 56,105 H 84" stroke="#f9b4b4" strokeWidth="2" />

                    {/* Center Currency Cash Bundles (Stacked Rupee/Dollar Cash Notes) */}
                    <g transform="translate(85, 100)">
                      {/* Cash Note Layer 1 */}
                      <polygon points="0,15 25,2 55,17 30,30" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="30,30 55,17 55,22 30,35" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                      {/* Cash Note Layer 2 */}
                      <polygon points="0,10 25,-3 55,12 30,25" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="30,25 55,12 55,17 30,30" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                      {/* Currency Band Ribbon */}
                      <rect x="22" y="5" width="8" height="20" fill="#f9b4b4" />
                    </g>

                    {/* Right Bank Database Core Servers */}
                    <g transform="translate(130, 65)">
                      {/* Server Unit 1 */}
                      <polygon points="0,20 30,5 55,17 25,32" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="25,32 55,17 55,27 25,42" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="0,20 25,32 25,42 0,30" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <circle cx="10" cy="27" r="1.5" fill="#fca5a5" />
                      <circle cx="16" cy="24" r="1.5" fill="#10b981" />

                      {/* Server Unit 2 */}
                      <polygon points="0,40 30,25 55,37 25,52" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="25,52 55,37 55,47 25,62" fill="#fee2e2" stroke="#f9b4b4" strokeWidth="1.5" />
                      <polygon points="0,40 25,52 25,62 0,50" fill="#ffffff" stroke="#f9b4b4" strokeWidth="1.5" />
                      <circle cx="10" cy="47" r="1.5" fill="#fca5a5" />
                      <circle cx="16" cy="44" r="1.5" fill="#10b981" />

                      {/* Encrypted Circuit Connection Line */}
                      <path d="M -15,50 C 0,55 10,65 25,65" stroke="#f9b4b4" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                      <circle cx="25" cy="65" r="3" fill="#f9b4b4" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Typography Matching Uploaded Image */}
              <div className="relative z-10 mb-2 flex flex-col items-center max-w-full px-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wider text-rose-300 dark:text-rose-400 uppercase font-sans drop-shadow-xs truncate max-w-full">
                  FINANCE & BANKING
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
                    <h3 className="text-xs font-normal text-foreground">Banking Voice Telemetry Stream</h3>
                    <p className="text-[9px] font-mono text-rose-400 dark:text-rose-400 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                      CORE BANKING & SWIFT SYNCED
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
                {["1. Sanction", "2. Voice KYC", "3. Wire Guard", "4. Credit Line"].map((stageLabel, idx) => (
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
