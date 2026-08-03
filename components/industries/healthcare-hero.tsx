"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartPulse,
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
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HealthcareHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)

  const stages = [
    {
      topBadge: { label: "Insurance Pre-Authorization Verified", icon: ShieldCheck },
      leftBadge: { label: "Patient Profile Tagged", icon: User },
      rightBadge: { label: "₹5 Lakh Budget Approved", icon: CheckCircle2 },
      bottomBadge: { label: "Treatment Completion Score 98/100", icon: Sparkles },
      dialogue: "“Welcome to Sunrise Health! I&apos;ve pre-authorized your insurance coverage and verified Dr. Sharma&apos;s availability for Thursday at 9:00 AM.”",
    },
    {
      topBadge: { label: "HIPAA & DISHA Compliant", icon: ShieldCheck },
      leftBadge: { label: "EHR System Synced", icon: Check },
      rightBadge: { label: "Specialist Locked", icon: Calendar },
      bottomBadge: { label: "No-Show Protection Active", icon: Clock },
      dialogue: "“I have scheduled your dental implant consultation for Friday at 11:30 AM and dispatched pre-procedure instructions to your WhatsApp.”",
    },
    {
      topBadge: { label: "Prescription Reminder Set", icon: Clock },
      leftBadge: { label: "Lab Reports Uploaded", icon: Activity },
      rightBadge: { label: "Follow-Up Visit Confirmed", icon: Calendar },
      bottomBadge: { label: "24/7 Care Triage Ready", icon: HeartPulse },
      dialogue: "“Checking in on your post-op recovery! Our AI clinical assistant is logging your symptom updates for the attending doctor.”",
    },
    {
      topBadge: { label: "Sub-3s Voice Latency", icon: Zap },
      leftBadge: { label: "24/7 On-Call Referral", icon: Stethoscope },
      rightBadge: { label: "Instant Hospital Relay", icon: Activity },
      bottomBadge: { label: "Emergency Triage Verified", icon: Sparkles },
      dialogue: "“Emergency triage activated. Connecting your call to our on-call medical specialist and emergency team right now.”",
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

      ctx.shadowColor = "rgba(244, 91, 91, 0.45)"
      ctx.shadowBlur = isPlayingAudio ? 12 : 5
      ctx.shadowOffsetY = 2

      const grad = ctx.createLinearGradient(0, canvas.height, 0, 0)
      grad.addColorStop(0, "rgba(244, 91, 91, 0.3)")
      grad.addColorStop(0.5, "rgba(244, 91, 91, 0.9)")
      grad.addColorStop(1, "rgba(255, 140, 140, 1)")
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
      className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24 overflow-hidden border-b border-border/40"
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
              <li className="text-foreground font-normal">Healthcare & Dental</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span className="ai-pill-magenta inline-flex items-center gap-2 text-[11px] font-normal tracking-wider shadow-xs">
              <Sparkles className="size-3.5 text-primary animate-pulse" />
              <span>HIPAA & DISHA COMPLIANT CLINICAL VOICE AI</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
            AI voice agents for <br />
            <span className="italic text-primary">
              healthcare & dental clinics.
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg font-normal">
            Never miss an urgent patient intake call or appointment inquiry. 9278.ai picks up every call in under 3 seconds — verifies insurance pre-authorization, qualifies symptom urgency, books appointments directly into Practo & EHR systems, and dispatches SMS/WhatsApp pre-op instructions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-primary" />
              Insurance Pre-Auth
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <UserCheck className="size-3.5 text-primary" />
              EHR & Practo Synced
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-md">
              <HeartPulse className="size-3.5 text-primary" />
              24/7 Clinical Triage
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group btn-ai h-12 rounded-full px-8 shadow-md transition-all cursor-pointer font-normal"
            >
              <Link href="/get-started?industry=healthcare">
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

        {/* Right Column: 3D HEALTHCARE & DENTAL BADGE MOCKUP (EXACT MATCH TO UPLOADED IMAGE) */}
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

            {/* 3D HEALTHCARE CARD SHAPE (ROUNDED ARCH CARD MATCHING UPLOADED IMAGE) */}
            <div 
              className="relative w-[310px] sm:w-[350px] md:w-[370px] h-[390px] sm:h-[430px] rounded-[44px] bg-gradient-to-b from-white via-[#fff5f5] to-[#fee2e2] text-primary shadow-[0_20px_50px_rgba(244,91,91,0.15)] backdrop-blur-2xl flex flex-col items-center justify-between p-6 sm:p-8 text-center select-none [transform:translateZ(20px)] border-4 border-white overflow-visible transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(244,91,91,0.22)] cursor-pointer"
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

              {/* 3D GLOWING CONCENTRIC ARCH RING & LAYERED 3D HOSPITAL GRAPHIC */}
              <div className="relative w-full h-[68%] flex flex-col items-center justify-center mt-2 [transform-style:preserve-3d]">
                {/* 3D Glowing Pulsing Concentric Outer Ring Halos (translateZ: 30px) */}
                <div className="absolute size-56 sm:size-64 rounded-full border-4 border-white/90 border-b-transparent shadow-[0_0_25px_rgba(255,255,255,0.8)] pointer-events-none -top-2 animate-pulse [transform:translateZ(30px)]" />
                <div className="absolute size-52 sm:size-60 rounded-full border-2 border-dashed border-white/80 border-b-transparent pointer-events-none top-0 animate-spin [animation-duration:20s] [transform:translateZ(40px)]" />

                {/* Floating 3D Orbiting Medical Badges */}
                <div className="absolute top-2 left-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3s] [transform:translateZ(55px)]">
                  <Stethoscope className="size-3.5" />
                </div>

                <div className="absolute top-4 right-6 z-20 size-7 rounded-xl bg-card/90 border border-primary/30 shadow-md backdrop-blur-md flex items-center justify-center text-primary animate-bounce [animation-duration:3.5s] [transform:translateZ(55px)]">
                  <HeartPulse className="size-3.5" />
                </div>

                {/* Layered 3D Isometric Healthcare & Dental Hospital Graphic (translateZ: 50px) */}
                <div className="relative z-10 flex flex-col items-center justify-center mt-4 [transform:translateZ(50px)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-rose-400/20 blur-xl rounded-full" />
                  <svg className="w-40 h-32 drop-shadow-[0_15px_30px_rgba(244,91,91,0.4)] relative z-10" viewBox="0 0 200 160">
                    {/* Isometric Hospital Base Platform */}
                    <polygon points="100,140 170,105 100,70 30,105" fill="#fecaca" opacity="0.6" />

                    {/* Left Clinical Wing (Suburban Clinic) */}
                    <polygon points="35,95 75,75 75,110 35,130" fill="#ffffff" />
                    <polygon points="75,75 95,85 95,120 75,110" fill="#fee2e2" />
                    <polygon points="35,95 75,75 95,85 55,105" fill="#f45b5b" opacity="0.85" />
                    {/* Dental Tooth Logo on Left Wing */}
                    <path d="M 52,90 Q 55,83 58,90 Q 61,97 58,100 Q 55,96 52,90 Z" fill="#ffffff" />

                    {/* Central Hospital Main Tower */}
                    <polygon points="75,55 125,30 125,85 75,110" fill="#ffffff" />
                    <polygon points="125,30 155,45 155,100 125,85" fill="#fee2e2" />
                    <polygon points="75,55 125,30 155,45 105,70" fill="#f45b5b" />

                    {/* Red Cross Emblem Box on Top of Main Hospital Tower */}
                    <rect x="95" y="22" width="16" height="16" rx="3" fill="#ef4444" />
                    <path d="M 101,25 H 105 V 35 H 101 Z M 97,29 H 109 V 33 H 97 Z" fill="#ffffff" />

                    {/* Windows Grid on Main Hospital */}
                    <rect x="85" y="65" width="8" height="8" rx="1" fill="#f45b5b" opacity="0.7" />
                    <rect x="100" y="58" width="8" height="8" rx="1" fill="#f45b5b" opacity="0.7" />
                    <rect x="85" y="80" width="8" height="8" rx="1" fill="#f45b5b" opacity="0.7" />
                    <rect x="100" y="72" width="8" height="8" rx="1" fill="#f45b5b" opacity="0.7" />

                    {/* Right Medical Wing (Caduceus Wing) */}
                    <polygon points="115,75 155,95 155,130 115,110" fill="#ffffff" />
                    <polygon points="155,95 175,85 175,120 155,130" fill="#fee2e2" />
                    <polygon points="115,75 155,95 175,85 135,65" fill="#f45b5b" opacity="0.8" />

                    {/* Caduceus Emblem on Right Wing */}
                    <circle cx="140" cy="100" r="6" fill="#f45b5b" opacity="0.8" />
                  </svg>
                </div>
              </div>

              {/* Typography Matching Uploaded Image */}
              <div className="relative z-10 mb-2 flex flex-col items-center max-w-full px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-rose-500 dark:text-rose-400 uppercase font-sans drop-shadow-xs truncate max-w-full">
                  HEALTHCARE
                </h2>
              </div>
            </div>

            {/* STYLISH 3D FLOATING GLASS VOICE TELEMETRY CONSOLE (LIGHT PASTEL ROSE - NO SOLID RED) */}
            <div className="relative mt-6 w-full max-w-sm sm:max-w-md rounded-3xl border border-rose-200/60 dark:border-rose-900/50 bg-gradient-to-r from-card/95 via-rose-50/50 to-card/95 dark:from-card/95 dark:via-rose-950/30 dark:to-card/95 p-4 shadow-[0_15px_40px_rgba(244,91,91,0.12)] backdrop-blur-2xl [transform:translateZ(60px)] z-40 overflow-hidden">
              {/* Glowing Top Edge Line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />

              {/* Console Header Bar */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 border border-rose-200/80 shadow-xs flex items-center justify-center animate-pulse">
                    <Mic className="size-4 text-rose-600 dark:text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-xs font-normal text-foreground">Clinical Voice Telemetry Stream</h3>
                    <p className="text-[9px] font-mono text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                      LIVE DUAL-STREAM • HIPAA SYNCED
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 px-3.5 py-1 text-xs font-normal shadow-xs hover:bg-rose-100 hover:scale-105 transition-all cursor-pointer"
                >
                  {isPlayingAudio ? <Pause className="size-3 fill-rose-600 text-rose-600 dark:fill-rose-300 dark:text-rose-300" /> : <Play className="size-3 fill-rose-600 text-rose-600 dark:fill-rose-300 dark:text-rose-300" />}
                  <span>{isPlayingAudio ? "Pause" : "Play Script"}</span>
                </button>
              </div>

              {/* 2D/3D Canvas Spectrum */}
              <div className="h-10 w-full flex items-center justify-center my-1">
                <canvas ref={canvasRef} width={300} height={40} className="w-full h-full drop-shadow-[0_2px_8px_rgba(244,91,91,0.3)]" />
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
                {["1. Intake", "2. Booking", "3. Follow-up", "4. Triage"].map((stageLabel, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={cn(
                      "text-[10px] font-normal py-1 px-1 rounded-lg border text-center transition-all cursor-pointer truncate",
                      idx === activeStage
                        ? "bg-rose-100 dark:bg-rose-900/70 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700 font-semibold shadow-xs"
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
