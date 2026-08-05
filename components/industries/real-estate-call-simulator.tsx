"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Play,
  Pause,
  Sparkles,
  PhoneCall,
  Mic,
  Calendar,
  Building2,
  Activity,
  Bot,
  User,
  Check,
  PhoneForwarded,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RealEstateCallSimulator() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [isAutoCycling, setIsAutoCycling] = useState(true)
  const [timer, setTimer] = useState(14)

  // 60FPS Smooth Auto-Rotation Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoCycling) {
      interval = setInterval(() => {
        setActiveScenario((prev) => (prev + 1) % 3)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isAutoCycling])

  // Call duration counter
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => (prev >= 45 ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [])

  const scenarios = [
    {
      id: "housing",
      title: "01. Housing.com Inbound Lead",
      badge: "SUB-3s PORTAL INTAKE",
      prop: "2BHK Kothrud Heights • ₹1.25 Cr",
      leadName: "Rahul Deshmukh",
      nodeIcon: Mic,
      agentLine1: "“Hi Rahul! Thanks for enquiring about the 2BHK in Kothrud Heights. Are you looking for self-use or investment?”",
      buyerLine: "“Self-use. Can I get a site walkthrough this Saturday at 11 AM?”",
      agentLine2: "“Done! I’ve locked Saturday 11 AM on our calendar and sent the WhatsApp floor plan PDF and location pin to your phone!”",
      pills: ["Saturday 11 AM Locked", "WhatsApp Pin Sent", "Score 98/100"],
    },
    {
      id: "magicbricks",
      title: "02. MagicBricks Villa Handoff",
      badge: "WARM DEVELOPER HANDOFF",
      prop: "3BHK Villa Penthouse • ₹2.40 Cr",
      leadName: "Priya Nair",
      nodeIcon: PhoneForwarded,
      agentLine1: "“Hello Priya! Thank you for calling regarding Baner Villa Penthouse. How can I assist with the property details?”",
      buyerLine: "“What are the monthly maintenance charges and covered parking slots?”",
      agentLine2: "“Maintenance is ₹4.5/sqft with 2 covered parking slots. Transferring you to our senior developer sales lead right now!”",
      pills: ["Warm Handoff Active", "Maintenance Verified", "Score 95/100"],
    },
    {
      id: "99acres",
      title: "03. 99acres Tour Reschedule",
      badge: "BROKER CALENDAR SYNC",
      prop: "4BHK Duplex • ₹3.10 Cr",
      leadName: "Anand Sharma",
      nodeIcon: Calendar,
      agentLine1: "“Hi Anand! Following up on your scheduled site visit today — will you still be visiting at 4 PM?”",
      buyerLine: "“I got stuck in traffic. Can we reschedule to Sunday at 4 PM instead?”",
      agentLine2: "“No problem! I’ve updated your walkthrough to Sunday 4:00 PM on our broker calendar and logged your price note in CRM!”",
      pills: ["Rescheduled to Sunday 4 PM", "CRM Price Note Logged", "Score 92/100"],
    },
  ]

  const currentSc = scenarios[activeScenario]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-32 border-t border-border/40 overflow-hidden">
      {/* Soft Glowing Ambient Red Mesh Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/25 via-rose-500/15 to-primary/10 blur-3xl opacity-20"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50 backdrop-blur-md">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          LIVE REAL ESTATE CALL SIMULATOR
        </span>
        <h2 className="text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground">
          3 Real Estate Call Scenarios <br className="hidden sm:inline" />
          <span className="italic text-rose-400 dark:text-rose-400">
            Seamlessly transitioning live.
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          Watch our AI voice engine handle Housing.com, MagicBricks, and 99acres buyer conversations live.
        </p>
      </div>

      {/* Scenario Pill Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        {scenarios.map((sc, idx) => {
          const isSelected = idx === activeScenario
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setActiveScenario(idx)
                setIsAutoCycling(false)
              }}
              className={cn(
                "relative overflow-hidden rounded-full px-5 py-2.5 text-xs font-normal transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs border",
                isSelected
                  ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 border-rose-300 dark:border-rose-500 shadow-sm scale-105"
                  : "bg-white/80 dark:bg-slate-900/80 text-muted-foreground border-slate-200/80 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-900/40 hover:text-rose-400 dark:hover:text-rose-400"
              )}
            >
              <PhoneCall className={cn("size-3.5", isSelected ? "text-rose-400 dark:text-rose-400" : "text-muted-foreground")} />
              <span>{sc.title}</span>

              {/* Hardware Accelerated Progress Line Bar */}
              {isSelected && isAutoCycling && (
                <motion.span
                  key={activeScenario}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-rose-400 rounded-full"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* HARDWARE ACCELERATED TRANSITION CONTAINER */}
      <div className="relative max-w-4xl mx-auto py-4 min-h-[420px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSc.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
            className="space-y-8 transform-gpu"
          >
            {/* Central Soft Rose Audio Node */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute size-48 rounded-full border border-rose-200/60 dark:border-rose-900/40 bg-rose-500/5 animate-pulse" />
              <div className="absolute size-36 rounded-full border border-dashed border-rose-300/60 dark:border-rose-800/60 animate-spin" style={{ animationDuration: "14s" }} />

              <div className="relative size-20 rounded-full bg-rose-500/15 border-2 border-rose-300 dark:border-rose-800 text-rose-400 dark:text-rose-400 flex items-center justify-center ring-4 ring-rose-500/10 z-10 shadow-md">
                {(() => {
                  const NodeIcon = currentSc.nodeIcon
                  return <NodeIcon className="size-8 animate-pulse text-rose-400 dark:text-rose-400" />
                })()}
                <span className="absolute -bottom-1 -right-1 size-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[10px] font-normal text-white">
                  ✓
                </span>
              </div>

              {/* Dynamic Audio Equalizer Ribbon */}
              <div className="mt-5 flex items-center gap-1.5 px-6 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-md backdrop-blur-xl">
                <span className="text-xs font-mono font-normal text-rose-400 dark:text-rose-400 flex items-center gap-1">
                  <Activity className="size-3.5 text-rose-300 animate-pulse" />
                  00:{timer < 10 ? `0${timer}` : timer}
                </span>
                <div className="flex items-center gap-1 px-2 h-6">
                  {[14, 28, 18, 36, 24, 16, 32, 12, 28].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-rose-400 dark:bg-rose-500 animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400">Sub-250ms Audio</span>
              </div>
            </div>

            {/* Floating Soft Rose Property Badge */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 px-4 py-1.5 text-xs font-normal text-rose-400 dark:text-rose-300 shadow-xs backdrop-blur-md">
                <Building2 className="size-3.5 text-rose-300" />
                <span>{currentSc.prop} ({currentSc.badge})</span>
              </span>
            </div>

            {/* Speech Capsules Stream */}
            <div className="space-y-4">
              {/* Agent Speech Capsule */}
              <div className="flex items-start gap-3 max-w-2xl mr-auto">
                <div className="size-9 rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-3xl rounded-tl-sm bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-4 shadow-sm backdrop-blur-xl text-xs font-medium leading-relaxed text-foreground">
                  <div className="flex items-center justify-between text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 mb-1">
                    <span>9278 AI VOICE AGENT</span>
                    <span>00:04</span>
                  </div>
                  <p>{currentSc.agentLine1}</p>
                </div>
              </div>

              {/* Buyer Speech Capsule */}
              <div className="flex items-start gap-3 max-w-2xl ml-auto flex-row-reverse">
                <div className="size-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-foreground flex items-center justify-center shrink-0 shadow-xs border border-slate-200 dark:border-slate-700">
                  <User className="size-4 text-muted-foreground" />
                </div>
                <div className="rounded-3xl rounded-tr-sm bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-md backdrop-blur-xl text-xs font-medium leading-relaxed text-foreground text-right">
                  <div className="flex items-center justify-end text-[10px] font-mono font-normal text-muted-foreground mb-1">
                    <span>00:15 • {currentSc.leadName} (BUYER)</span>
                  </div>
                  <p>{currentSc.buyerLine}</p>
                </div>
              </div>

              {/* Agent Final Action Capsule */}
              <div className="flex items-start gap-3 max-w-2xl mr-auto">
                <div className="size-9 rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-3xl rounded-tl-sm bg-rose-50/90 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800/60 p-4 shadow-md backdrop-blur-xl text-xs font-medium leading-relaxed text-foreground">
                  <div className="flex items-center justify-between text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 mb-1">
                    <span>9278 AI VOICE AGENT</span>
                    <span>00:28</span>
                  </div>
                  <p>{currentSc.agentLine2}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-3 mt-2 border-t border-rose-200/60 dark:border-rose-900/30">
                    {currentSc.pills.map((pill, i) => (
                      <span key={i} className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 text-rose-400 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 px-2.5 py-0.5 text-[10px] font-normal font-mono">
                        <Check className="size-3 text-rose-400 dark:text-rose-400 stroke-[3]" />
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <Button asChild size="lg" className="btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md font-normal cursor-pointer">
          <Link href="/get-started?industry=real-estate">
            Deploy Real Estate AI Agent <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
