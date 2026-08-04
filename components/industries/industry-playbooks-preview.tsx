"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, Volume2, Play, Pause, ShieldCheck, Check, PhoneCall, Bot, User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type PlaybookItem = {
  id: number
  title: string
  tag: string
  agentBubble: string
  callerBubble: string
  bottomQuote: string
  latency: string
  badge: string
}

type Props = {
  industryName?: string
  slug?: string
}

export function IndustryPlaybooksPreview({ industryName = "Healthcare Clinics", slug = "healthcare" }: Props) {
  const [activeStep, setActiveStep] = useState(0) // Default to step 1
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const isRealEstate = slug === "real-estate" || industryName.toLowerCase().includes("real estate")

  const realEstatePlaybooks: PlaybookItem[] = [
    {
      id: 1,
      title: "Capture & qualify leads instantly",
      tag: "INSTANT INBOUND LEAD",
      agentBubble: "Hi! I saw you just enquired about the 2BHK in Kothrud — are you working with an agent yet?",
      callerBubble: "Not yet, just started looking.",
      bottomQuote: "Answering Housing.com, MagicBricks & 99acres inquiries in under 3 seconds 24/7.",
      latency: "280ms",
      badge: "Housing.com Connected",
    },
    {
      id: 2,
      title: "Qualify with the right info",
      tag: "BUDGET & INTENT INTAKE",
      agentBubble: "Quick question — is your home loan pre-approved, or would you like me to introduce a lender?",
      callerBubble: "Not pre-approved yet, actually. We are looking for ₹1.2 Cr to ₹1.5 Cr budget range.",
      bottomQuote: "Captured pre-approval status, budget range, and 30-day target move-in timeline.",
      latency: "240ms",
      badge: "Buyer Score 94/100",
    },
    {
      id: 3,
      title: "Book & manage site visits",
      tag: "CALENDAR BOOKING",
      agentBubble: "No problem! I can connect you with one. I have Tuesday at 4 or Saturday at 11 open for a site visit — which works better?",
      callerBubble: "Saturday at 11 AM works perfectly for us.",
      bottomQuote: "Locked in Saturday 11:00 AM site visit for Kothrud 2BHK and sent calendar invite & SMS.",
      latency: "260ms",
      badge: "Google & Outlook Synced",
    },
    {
      id: 4,
      title: "Follow up, every time",
      tag: "SMS & WHATSAPP RELAY",
      agentBubble: "I've texted you the brochure, floor plan PDF, and site location pin via WhatsApp!",
      callerBubble: "Awesome, I received the floor plan PDF. See you on Saturday!",
      bottomQuote: "Listing brochure & location pin delivered via WhatsApp instantly after the call.",
      latency: "190ms",
      badge: "WhatsApp Relay Active",
    },
    {
      id: 5,
      title: "Nurture while you're busy",
      tag: "WARM LEAD NURTURE",
      agentBubble: "While the listing agent is with another client, I can answer any pricing or amenity questions right now.",
      callerBubble: "What are the maintenance charges and covered parking options?",
      bottomQuote: "Engaged warm buyer with full CMA & amenity details until senior broker was ready.",
      latency: "220ms",
      badge: "Live Agent Handoff",
    },
  ]

  const healthcarePlaybooks: PlaybookItem[] = [
    {
      id: 1,
      title: "New patient intake & demographic capture",
      tag: "INTAKE & INSURANCE",
      agentBubble: "Welcome to Sunrise Health! Are you establishing care as a new patient with Dr. Sharma today?",
      callerBubble: "Yes, I'd like to book a new appointment and verify my insurance coverage.",
      bottomQuote: "I can capture your medical history, verify your insurance coverage, and text your intake link in under 2 minutes.",
      latency: "120ms",
      badge: "EHR Intake Active",
    },
    {
      id: 2,
      title: "EHR-integrated appointment scheduling",
      tag: "CALENDAR BOOKING",
      agentBubble: "Your annual preventive checkup is due this Thursday, Mr. Vance! I have a 10:00 AM slot open.",
      callerBubble: "Please book that appointment. The 10:00 AM slot works great for me.",
      bottomQuote: "Locked in Thursday at 10:00 AM with Dr. Sharma. Your preventive copay is $0.",
      latency: "140ms",
      badge: "Epic & Athena Sync",
    },
    {
      id: 3,
      title: "Prescription refill requests & pharmacy routing",
      tag: "PHARMACY ROUTING",
      agentBubble: "I see your Lisinopril prescription is eligible for a 90-day refill. Should I route it to CVS?",
      callerBubble: "Yes, please send the refill request to the CVS pharmacy on Main Street.",
      bottomQuote: "Refill request submitted directly to CVS Pharmacy on Main Street. Dr. Lee will confirm via SMS.",
      latency: "95ms",
      badge: "CVS / Walgreens Routed",
    },
    {
      id: 4,
      title: "HIPAA-compliant post-discharge triage & symptom tracking",
      tag: "POST-OP TRIAGE",
      agentBubble: "Following up after your surgery — on a 0 to 10 scale, how is your discomfort level today?",
      callerBubble: "My pain is down to a 3, and I've been taking my recovery medication on time.",
      bottomQuote: "Glad to hear discomfort is down to 3/10. Please continue your recovery plan and stay hydrated.",
      latency: "110ms",
      badge: "Triage Score 3/10",
    },
    {
      id: 5,
      title: "Emergency symptom triage & nurse warm transfer",
      tag: "URGENT TRIAGE",
      agentBubble: "I hear that you are experiencing sudden dizziness and high blood pressure.",
      callerBubble: "I'm feeling quite dizzy right now. Could you connect me with an on-call nurse?",
      bottomQuote: "Please take a seat and stay calm. Transferring your call immediately to our on-call triage nurse.",
      latency: "80ms",
      badge: "Nurse Warm Transfer",
    },
  ]

  const playbooks = isRealEstate ? realEstatePlaybooks : healthcarePlaybooks

  // Smooth Sequential Auto-Cycling Timer (1 -> 2 -> 3 -> 4 -> 5 -> 1)
  useEffect(() => {
    if (!isPlaying) return

    const DURATION = 4000 // 4 seconds per playbook step
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / DURATION) * 100, 100)

      if (currentProgress >= 100) {
        setProgress(0)
        setActiveStep((prev) => (prev + 1) % playbooks.length)
      } else {
        setProgress(currentProgress)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [isPlaying, activeStep, playbooks.length])

  const selectStep = (idx: number) => {
    setActiveStep(idx)
    setProgress(0)
    setIsPlaying(false)
  }

  const current = playbooks[activeStep]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden">
      {/* Ambient Red Blur Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-75"
      />

      {/* Section Header */}
      <div className="mb-12 text-center md:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3 shadow-xs border border-primary/20">
          <Sparkles className="size-3.5 text-primary" />
          Interactive Playbooks
        </span>
        <h2 className="text-3xl font-serif font-bold tracking-tight md:text-5xl text-foreground">
          What the agent does and <span className="bg-gradient-to-r from-primary via-rose-600 to-primary bg-clip-text text-transparent underline decoration-primary/30 underline-offset-8">how it sounds</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl">
          Pre-built playbooks tuned for {industryName.toLowerCase()} workflows, and the real lines our voice agents use to run them — cycling live below.
        </p>
      </div>

      {/* Main 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: PLAYBOOKS List & Segmented Progress Bar */}
        <div className="lg:col-span-5 rounded-3xl border border-white/80 dark:border-white/15 bg-card/85 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:scale-[1.01]">
          <div>
            {/* Header with Step Indicator & Play/Pause */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">PLAYBOOKS</span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-full bg-muted p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause auto cycle" : "Play auto cycle"}
                >
                  {isPlaying ? <Pause className="size-3" /> : <Play className="size-3 ml-0.5" />}
                </button>
              </div>

              <span className="text-xs font-mono font-bold text-primary">
                0{activeStep + 1} / 0{playbooks.length}
              </span>
            </div>

            {/* Segmented Dynamic Progress Bar */}
            <div className="grid grid-cols-5 gap-1.5 mb-6">
              {playbooks.map((pb, idx) => {
                const isActive = idx === activeStep
                const isPast = idx < activeStep
                return (
                  <div
                    key={pb.id}
                    onClick={() => selectStep(idx)}
                    className="h-1.5 rounded-full bg-muted overflow-hidden cursor-pointer"
                  >
                    <div
                      className="h-full bg-primary transition-all duration-100 ease-linear"
                      style={{
                        width: isActive ? `${progress}%` : isPast ? "100%" : "0%",
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Playbooks List Items (1 to 5) */}
            <div className="space-y-2.5">
              {playbooks.map((pb, idx) => {
                const isActive = idx === activeStep
                return (
                  <button
                    key={pb.id}
                    onClick={() => {
                      setActiveStep(idx)
                      setProgress(0)
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between font-medium cursor-pointer border",
                      isActive
                        ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-sm font-bold scale-[1.01]"
                        : "bg-white/80 dark:bg-slate-900/80 text-muted-foreground border-slate-200/80 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-900/40 hover:text-rose-400 dark:hover:text-rose-400"
                    )}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-xl text-xs font-mono font-bold transition-colors border",
                          isActive
                            ? "bg-rose-500/20 text-rose-400 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                        )}
                      >
                        {pb.id}
                      </span>
                      <span className="text-xs md:text-sm leading-snug truncate">{pb.title}</span>
                    </div>
                    {isActive && (
                      <span className="size-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Card: LIVE AGENT PREVIEW (Light Glass Card) */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between min-h-[400px] transition-all duration-300 hover:border-rose-300 dark:hover:border-rose-800">
          <div>
            {/* Top Live Status Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">LIVE AGENT PREVIEW</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 px-3 py-1 text-[11px] font-mono font-bold shadow-xs">
                  {current.badge}
                </span>

                {/* Animated Audio Equalizer Bars */}
                <div className="flex items-center gap-1 h-3.5 px-2">
                  <span className="w-0.5 h-3 bg-rose-500 animate-pulse rounded-full" />
                  <span className="w-0.5 h-4 bg-rose-500 animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-2 bg-rose-500 animate-pulse delay-150 rounded-full" />
                  <span className="w-0.5 h-4 bg-rose-500 animate-pulse delay-225 rounded-full" />
                  <span className="w-0.5 h-2.5 bg-rose-500 animate-pulse delay-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Conversational Transcript Bubbles */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 py-2"
              >
                {/* Agent Bubble (Soft Rose Tint) */}
                <div className="flex items-start gap-3 max-w-[90%]">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 shadow-xs mt-0.5">
                    <Bot className="size-4.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-xs bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-4 text-xs md:text-sm text-foreground font-medium shadow-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold text-rose-400 dark:text-rose-400 mb-1">
                      <span>Agent · AI Voice Assistant</span>
                      <span className="font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">{current.latency}</span>
                    </div>
                    <p className="leading-relaxed">&ldquo;{current.agentBubble}&rdquo;</p>
                  </div>
                </div>

                {/* Caller Bubble */}
                <div className="flex items-start gap-3 max-w-[90%] ml-auto justify-end">
                  <div className="rounded-2xl rounded-tr-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 text-xs md:text-sm text-foreground font-medium text-right shadow-xs">
                    <div className="text-[10px] font-bold text-muted-foreground mb-1">
                      <span>Caller</span>
                    </div>
                    <p className="leading-relaxed">&ldquo;{current.callerBubble}&rdquo;</p>
                  </div>
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 shadow-xs mt-0.5 border border-slate-200 dark:border-slate-700">
                    <User className="size-4.5" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Live Spoken AI Audio Quote Box */}
          <div className="mt-8 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-white/90 dark:bg-slate-900/90 p-4 backdrop-blur-md flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 shadow-xs transition-transform hover:scale-105 cursor-pointer"
                aria-label="Simulate voice audio"
              >
                {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400">Spoken AI Output</span>
                  <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-mono text-muted-foreground">Natural Human Pacing</span>
                </div>
                <p className="text-xs text-foreground/90 font-semibold leading-relaxed italic">
                  &ldquo;{current.bottomQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
