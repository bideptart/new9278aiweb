"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  CheckCircle2,
  Volume2,
  Play,
  Pause,
  Layers,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Radio,
  Cpu,
  Database,
  Calendar,
  Activity,
  Home,
  Stethoscope,
  ShoppingBag,
  UtensilsCrossed,
  DollarSign,
  Wrench,
  Headphones,
  Check,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Category = {
  slug: string
  name: string
  icon: LucideIcon
  link: string
  pitch: string
  jobs: string[]
  sampleLine: string
}

const CATEGORIES: Category[] = [
  {
    slug: "real-estate",
    name: "Real estate",
    icon: Home,
    link: "/industries/real-estate",
    pitch:
      "Over 60% of real estate portal leads die because sales teams miss late-night and weekend calls. 9278.ai answers every inbound call in under 3 seconds, qualifies buyer budget & home loan pre-approval, locks site walkthroughs directly onto your broker calendar, and dispatches HD floor plans via WhatsApp instantly.",
    jobs: [
      "Sub-3s Portal Intake across Housing.com, 99acres & MagicBricks 24/7",
      "Sub-250ms Audio Qualification verifying budget & loan status",
      "Broker Calendar Slot Locking (2-Way Google & Outlook sync)",
      "Instant WhatsApp PDF & Location Pin Relay right after call",
    ],
    sampleLine:
      "Hi Rahul! Thanks for enquiring about Kothrud Heights — are you looking for self-use or investment?",
  },
  {
    slug: "dental-health-wellness",
    name: "Dental, Health & Wellness",
    icon: Stethoscope,
    link: "/industries/healthcare",
    pitch:
      "Front desks miss 20–40% of inbound patient and fitness calls during peak hours. 9278.ai automates patient intake, confirms hygiene & dental checkups, reschedules cancellations, answers insurance coverage questions, and triages urgent care 24/7.",
    jobs: [
      "Confirm and reschedule hygiene & dental checkups automatically",
      "24/7 Patient intake, demographic capture & insurance benefit check",
      "Triage dental & medical emergencies with warm nurse transfer",
      "Class booking & fitness membership renewal reminders",
    ],
    sampleLine:
      "Hi Mrs. Patel, Sunrise Dental confirming your hygiene checkup tomorrow at 2:30 PM. Reply 1 to confirm.",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: ShoppingBag,
    link: "/industries/ecommerce",
    pitch:
      "Recover abandoned carts, resolve order tracking inquiries, process returns, and capture phone sales 24/7 without growing your customer support headcount.",
    jobs: [
      "Instant order status lookup & automated tracking SMS dispatch",
      "Abandoned cart recovery outbound calling with special discount offers",
      "Automated return & exchange authorization with self-service routing",
      "Product recommendations & phone checkout assistance 24/7",
    ],
    sampleLine:
      "Hi Alex! I noticed items left in your cart — would you like me to apply a 10% discount and complete your order?",
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    icon: UtensilsCrossed,
    link: "/industries/ecommerce",
    pitch:
      "Never miss a table reservation or catering order during peak dinner rush hours. 9278.ai handles table bookings, dietary questions, party sizes, and hotel concierge inquiries 24/7.",
    jobs: [
      "Table reservation & party size confirmation synced to OpenTable/Resy",
      "Catering & private event inquiry qualification & menu pricing",
      "Menu & dietary allergen information relay to calling guests",
      "Hotel concierge & room service requests handled in real-time",
    ],
    sampleLine:
      "Welcome to Bistro Milano! I can reserve a table for 4 tonight at 7:30 PM — would you prefer indoor or patio seating?",
  },
  {
    slug: "finance-banking",
    name: "Finance & Banking",
    icon: DollarSign,
    link: "/industries/finance",
    pitch:
      "Verify loan eligibility, process account balance inquiries, screen credit application leads, and provide 24/7 encrypted voice banking assistance with carrier-grade security.",
    jobs: [
      "Encrypted account balance & recent transaction status lookup",
      "Loan pre-approval & credit lead qualification in real-time",
      "PCI-compliant payment collection & overdue payment reminders",
      "Fraud alert verification & escalation to senior fraud analysts",
    ],
    sampleLine:
      "Hello Mr. Sharma, I see your home loan inquiry for ₹50 Lakhs — let me verify your income details and send pre-approval terms.",
  },
  {
    slug: "home-services",
    name: "Home services",
    icon: Wrench,
    link: "/industries/home-services",
    pitch:
      "Capture emergency HVAC, plumbing, and electrical service calls 24/7. Dispatch technicians, quote diagnostic fees, and lock emergency service slots without losing jobs to slow callbacks.",
    jobs: [
      "24/7 Emergency dispatch & field technician routing",
      "Job scope & diagnostic fee quoting over the phone",
      "Customer address & estimated arrival time confirmation",
      "Automated SMS status updates & post-service review requests",
    ],
    sampleLine:
      "Thanks for calling QuickFix Plumbing! We have an emergency technician available in your area within 45 minutes — shall I dispatch them?",
  },
]

type Props = {
  currentSlug: string
}

export function OtherIndustriesGrid({ currentSlug }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeTab, setActiveTab] = useState<"call" | "qualification" | "crm">("call")
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // 2-Second Automatic Rotation Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % CATEGORIES.length)
      setIsPlayingAudio(false)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const activeCategory = CATEGORIES[selectedIndex] || CATEGORIES[0]
  const Icon = activeCategory.icon

  // CONTINUOUS 60FPS ALWAYS-WORKING 3D AUDIO WAVEFORM CANVAS
  useEffect(() => {
    let animationFrameId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let step = 0
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const bars = 28
      const barWidth = canvas.width / bars

      // Speed & Amplitude boost when audio play mode is active
      const speed = isPlayingAudio ? 0.22 : 0.08
      const maxAmp = isPlayingAudio ? canvas.height - 6 : (canvas.height - 12) * 0.65

      for (let i = 0; i < bars; i++) {
        // Continuous 3D sine wave calculation
        const wave = Math.sin(step * speed + i * 0.32) * 0.5 + 0.5
        const height = Math.max(8, wave * maxAmp)

        // 3D Depth Shadow
        ctx.shadowColor = "rgba(244, 91, 91, 0.45)"
        ctx.shadowBlur = isPlayingAudio ? 12 : 6
        ctx.shadowOffsetY = 3

        // Gradient for 3D depth effect
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0)
        grad.addColorStop(0, "rgba(244, 91, 91, 0.35)")
        grad.addColorStop(0.5, "rgba(244, 91, 91, 0.85)")
        grad.addColorStop(1, "rgba(255, 140, 140, 1)")

        ctx.fillStyle = grad
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

  // Mouse move tracker for dynamic 3D tilt & radial spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  // Smooth 3D tilt calculation angles
  const tiltX = (mousePos.y - 50) * -0.12
  const tiltY = (mousePos.x - 50) * 0.12

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden"
    >
      {/* Interactive 2D Mouse-Reactive Radial Light Canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(244, 91, 91, 0.08), transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="ai-pill-magenta inline-flex items-center gap-2 text-[11px] font-normal tracking-wider mb-3">
          <Layers className="size-3 text-primary" />
          EXPLORE VERTICAL PLAYBOOKS
        </span>
        <h2 className="text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground">
          Pre-tuned AI voice agents for <span className="text-primary italic">every industry.</span>
        </h2>
        <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed font-normal">
          Auto-switching live vertical playbooks every 2 seconds. Tap any industry to inspect scripts & CRM automation.
        </p>
      </div>

      {/* 1. Fully Responsive Horizontal Industry Nav Bar (No Scrollbar Visible) */}
      <div className="mb-10 w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-start md:justify-center gap-2.5 w-max md:w-full mx-auto px-2">
          {CATEGORIES.map((cat, idx) => {
            const CatIcon = cat.icon
            const isSelected = idx === selectedIndex
            return (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedIndex(idx)
                  setIsPlayingAudio(false)
                }}
                className={cn(
                  "flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-normal transition-all duration-300 cursor-pointer select-none border whitespace-nowrap",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25 scale-[1.04]"
                    : "bg-card/70 border-border/60 text-muted-foreground hover:bg-card hover:text-foreground hover:border-border"
                )}
              >
                <CatIcon className={cn("size-4 shrink-0", isSelected ? "text-primary-foreground" : "text-primary")} />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Fluid Working 3D Perspective Console Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4"
        >
          {/* Left Column: Fluid Text & Signal Flow Diagram */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
                <Icon className="size-6" />
              </div>
              <div>
                <span className="text-xs text-primary font-normal uppercase tracking-wider">Vertical Automation</span>
                <h3 className="text-2xl md:text-4xl font-serif font-normal text-foreground leading-tight">
                  {activeCategory.name}
                </h3>
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-normal">
              {activeCategory.pitch}
            </p>

            {/* Interactive 2D Signal Flow Mode Selector */}
            <div className="rounded-2xl border border-primary/20 bg-card/60 p-3.5 backdrop-blur-md shadow-xs">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-normal mb-2.5">
                Interactive 2D Signal Flow Mode:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab("call")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-[11px] font-normal transition-all cursor-pointer border",
                    activeTab === "call"
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-background/80 text-muted-foreground border-border/50 hover:bg-background"
                  )}
                >
                  <Radio className="size-3.5" />
                  <span>1. Inbound</span>
                </button>
                <button
                  onClick={() => setActiveTab("qualification")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-[11px] font-normal transition-all cursor-pointer border",
                    activeTab === "qualification"
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-background/80 text-muted-foreground border-border/50 hover:bg-background"
                  )}
                >
                  <Cpu className="size-3.5" />
                  <span>2. Voice AI</span>
                </button>
                <button
                  onClick={() => setActiveTab("crm")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-[11px] font-normal transition-all cursor-pointer border",
                    activeTab === "crm"
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-background/80 text-muted-foreground border-border/50 hover:bg-background"
                  )}
                >
                  <Database className="size-3.5" />
                  <span>3. CRM Sync</span>
                </button>
              </div>

              {/* Working 2D Mode Signal Description */}
              <div className="mt-3 pt-2.5 border-t border-border/40 text-xs text-muted-foreground font-normal flex items-center justify-between">
                {activeTab === "call" && (
                  <span className="flex items-center gap-1.5 text-primary">
                    <Radio className="size-3.5 animate-pulse" />
                    Simultaneous carrier intake &lt; 3s answer rate
                  </span>
                )}
                {activeTab === "qualification" && (
                  <span className="flex items-center gap-1.5 text-primary">
                    <Cpu className="size-3.5 animate-spin [animation-duration:3s]" />
                    Real-time speech-to-speech AI latency &lt; 250ms
                  </span>
                )}
                {activeTab === "crm" && (
                  <span className="flex items-center gap-1.5 text-primary">
                    <Calendar className="size-3.5 animate-bounce" />
                    Instant 2-way Google Calendar & CRM transcript logging
                  </span>
                )}
              </div>
            </div>

            {/* Direct Link Action */}
            <div className="pt-2">
              <Link
                href={activeCategory.link}
                className="btn-ai inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-normal shadow-sm transition-transform hover:scale-[1.02]"
              >
                <span>Explore Full {activeCategory.name} Playbook</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: WORKING 3D PERSPECTIVE TILT HUD & ALWAYS-LIVE 3D AUDIO SPECTRUM */}
          <div className="lg:col-span-6 flex flex-col justify-center perspective-[1000px]">
            <div
              className="relative rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card/95 to-card p-6 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden transition-transform duration-200 ease-out transform-gpu"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Subtle Top Glowing 3D Line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* 3D Orb & Header HUD Status Bar */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/40 [transform:translateZ(20px)]">
                <div className="flex items-center gap-2 text-xs font-normal text-foreground">
                  {/* Glowing 3D Voice Orb */}
                  <div className="relative flex size-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(244,91,91,0.8)]" />
                  </div>
                  <span className="font-normal uppercase tracking-wider text-muted-foreground text-[11px]">
                    Working 3D Audio Spectrum
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-[10px] font-mono">
                    247ms Latency
                  </span>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3.5 py-1 text-xs font-normal transition-all hover:bg-primary/90 shadow-md cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="size-3 fill-primary-foreground" />
                        <span>Pause Spectrum</span>
                      </>
                    ) : (
                      <>
                        <Play className="size-3 fill-primary-foreground" />
                        <span>Boost Spectrum</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ALWAYS-WORKING 3D AUDIO WAVEFORM CANVAS TERMINAL */}
              <div className="relative rounded-2xl bg-background/85 p-5 mb-5 border border-primary/25 backdrop-blur-md shadow-inner [transform:translateZ(30px)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-normal uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Activity className="size-3.5 animate-pulse" />
                    Continuous 3D Wave Spectrum
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {isPlayingAudio ? "192 kbps HD | BOOSTED" : "60FPS ACTIVE REAL-TIME"}
                  </span>
                </div>

                {/* 3D HTML5 Canvas Waveform Output */}
                <div className="h-14 w-full flex items-center justify-center my-2">
                  <canvas ref={canvasRef} width={360} height={56} className="w-full h-full drop-shadow-[0_4px_10px_rgba(244,91,91,0.35)]" />
                </div>

                {/* Sample Line Quote */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-sm md:text-base text-foreground font-serif italic leading-relaxed">
                    &ldquo;{activeCategory.sampleLine}&rdquo;
                  </p>
                </div>
              </div>

              {/* Automated Day-1 Tasks Badges Grid */}
              <div className="[transform:translateZ(20px)]">
                <p className="text-[11px] font-normal text-muted-foreground uppercase tracking-wider mb-3">
                  Automated Workflows Handled Live:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeCategory.jobs.slice(0, 4).map((job, jIdx) => (
                    <div
                      key={jIdx}
                      className="group flex items-start gap-2.5 rounded-xl border border-border/50 bg-background/50 p-2.5 text-xs text-muted-foreground font-normal transition-all hover:border-primary/40 hover:bg-background/90 hover:text-foreground"
                    >
                      <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug text-[11px]">{job}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
