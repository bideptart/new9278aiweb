"use client"

import { useState, useEffect } from "react"
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
  PhoneCall,
  Activity,
  Zap,
  Volume2,
  Radio,
  Sliders,
  Check,
  MapPin,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function RealEstateFolderGalleryHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true)
  const [audioTimer, setAudioTimer] = useState(14)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioTimer((prev) => (prev >= 45 ? 0 : prev + 1))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlayingAudio])

  const voiceLines = [
    { speaker: "Agent", text: "“Hi! Thanks for calling Greenfield Realty. I saw you enquired about the 2BHK in Kothrud — are you working with an agent yet?”" },
    { speaker: "Caller", text: "“Not yet. Is your home loan pre-approved or can I get a walkthrough this Saturday?”" },
    { speaker: "Agent", text: "“I can lock in Saturday at 11:00 AM for your site visit and send the WhatsApp floor plan PDF right now!”" },
  ]

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24 overflow-hidden">
      {/* Soft Ambient Light Glow & Subtle Red Blur Accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/10 to-primary/10 blur-3xl opacity-70"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Value Prop */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 shadow-xs">
              <Sparkles className="size-3.5 text-rose-500 animate-pulse" />
              <span>NEXT-GEN REAL ESTATE VOICE ENGINE</span>
            </span>
          </div>

          <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
            Autonomous AI voice agents <br />
            <span className="italic text-rose-600 dark:text-rose-400">
              for real estate developers.
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Stop losing 60%+ of weekend portal inquiries. 9278.ai answers inbound calls in under 3 seconds across Housing.com, 99acres & MagicBricks, qualifies budget & loan pre-approval live, locks site walkthroughs on broker calendars, and dispatches WhatsApp floor plans instantly.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/30 px-3.5 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 backdrop-blur-md">
              <Clock className="size-3.5 text-rose-500" />
              24/7 Portal Intake
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/30 px-3.5 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 backdrop-blur-md">
              <User className="size-3.5 text-rose-500" />
              Loan & Budget Qualify
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/30 px-3.5 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 backdrop-blur-md">
              <Calendar className="size-3.5 text-rose-500" />
              Broker Calendar Sync
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              asChild
              size="lg"
              className="group btn-ai h-12 rounded-full px-8 shadow-md transition-all cursor-pointer font-bold"
            >
              <Link href="/get-started?industry=real-estate">
                Get Started <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-7 backdrop-blur-md hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 transition-all font-semibold cursor-pointer"
            >
              <Link href="/pricing" className="flex items-center gap-2">
                <Play className="size-3.5 fill-current text-rose-500" />
                View Pricing
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column: DEDICATED VOICE INTERACTION PANEL */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[560px] aspect-square flex flex-col justify-between p-5 rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-xl overflow-hidden group"
          >
            {/* Header: Dedicated Voice Interaction Status Bar */}
            <div className="relative z-20 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-2xl bg-rose-500/15 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shadow-xs">
                  <Mic className="size-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">Real Estate Voice Interaction Engine</h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live Audio Stream • Indian Languages</span>
                  </div>
                </div>
              </div>

              <span className="rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 px-3 py-1 text-[10px] font-mono font-bold">
                Sub-250ms STT/TTS
              </span>
            </div>

            {/* Central Dedicated Voice AI Visualizer */}
            <div className="relative z-20 my-3 flex flex-col items-center justify-center space-y-4">
              {/* Central Glowing Soft Rose Microphone Node */}
              <div className="relative flex items-center justify-center">
                {/* Concentric Pulsing Aura Rings */}
                <div className="absolute size-44 rounded-full border border-rose-200/60 dark:border-rose-900/40 bg-rose-500/5 animate-pulse" />
                <div className="absolute size-32 rounded-full border border-dashed border-rose-300/60 dark:border-rose-800/60 animate-spin" style={{ animationDuration: "12s" }} />

                {/* Central Soft Rose Metallic Microphone Button */}
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="relative size-20 rounded-3xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border-2 border-rose-300 dark:border-rose-800 flex items-center justify-center shadow-md ring-4 ring-rose-500/10 hover:bg-rose-500/25 transition-all duration-300 hover:scale-105 cursor-pointer z-10"
                >
                  <Mic className="size-9 animate-pulse" />
                  <span className="absolute -bottom-1.5 -right-1.5 size-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-bold text-white">
                    ✓
                  </span>
                </button>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="w-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 shadow-md backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                    <Activity className="size-3 text-rose-500 animate-pulse" />
                    <span>REAL-TIME VOICE WAVEFORM</span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                    <span>Call Duration:</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">00:{audioTimer < 10 ? `0${audioTimer}` : audioTimer}</span>
                  </div>
                </div>

                {/* Animated Audio Equalizer Waveform Bars (Soft Rose Tint) */}
                <div className="flex items-center justify-center gap-1 h-12 py-1 px-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  {[18, 36, 24, 48, 30, 20, 42, 16, 38, 28, 44, 22, 34, 18, 40, 26, 32, 20].map((h, i) => (
                    <span
                      key={i}
                      className={cn(
                        "w-1.5 rounded-full bg-rose-400 dark:bg-rose-500 transition-all duration-300",
                        isPlayingAudio ? "animate-pulse" : "opacity-40"
                      )}
                      style={{
                        height: isPlayingAudio ? `${Math.max(8, (h * (i % 2 === 0 ? 1.15 : 0.85))).toFixed(0)}px` : "10px",
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Real Estate Voice Dialogue Output */}
              <div className="w-full rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/20 p-3 shadow-sm backdrop-blur-xl">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1 border-b border-rose-200/60 dark:border-rose-900/30 pb-1">
                  <span>Voice AI Dialogue Stream</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">Hindi / English Multi-lingual</span>
                </div>

                <div className="space-y-1.5 pt-1 text-xs font-medium text-foreground italic leading-relaxed">
                  <p className="text-rose-700 dark:text-rose-300 font-semibold">&ldquo;Pre-approval verified for $2.4M listing inquiry. Walkthrough scheduled for Thursday at 3 PM.&rdquo;</p>
                </div>
              </div>
            </div>

            {/* Dedicated Voice Metrics Grid */}
            <div className="relative z-20 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-2">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">LATENCY</p>
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">&lt; 250ms</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-2">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">VOICE MODE</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Native Audio</p>
              </div>
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-2">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">BARGE-IN</p>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">Active Interrupt</p>
              </div>
            </div>

            {/* Floating Micro-Cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute left-3 top-14 z-30 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-md">
                <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Home className="size-3.5 text-emerald-500" />
                </span>
                <span>New Lead</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold border border-emerald-500/30">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  Qualifying
                </span>
              </div>
            </motion.div>

            {/* Top Right: AI Voice Agent Listening... */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-3 top-14 z-30 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-md">
                <span className="p-1 rounded-lg bg-rose-500/10 text-rose-500">
                  <Mic className="size-3.5 text-rose-500" />
                </span>
                <span>AI Voice Agent</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 px-2 py-0.5 text-[10px] font-bold border border-rose-500/30">
                  <span className="flex items-center gap-0.5">
                    <span className="h-2 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="h-3 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                    <span className="h-2 w-0.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </span>
                  Listening...
                </span>
              </div>
            </motion.div>

            {/* Bottom Left: Site Visit Booked */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="absolute left-3 bottom-14 z-30 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-md">
                <span className="p-1 rounded-lg bg-blue-500/10 text-blue-500">
                  <Calendar className="size-3.5 text-blue-500" />
                </span>
                <span>Site Visit</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 px-2 py-0.5 text-[10px] font-bold border border-blue-500/30">
                  Booked
                </span>
              </div>
            </motion.div>

            {/* Bottom Right: Buyer Qualified */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
              className="absolute right-3 bottom-14 z-30 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur-md">
                <span className="p-1 rounded-lg bg-amber-500/10 text-amber-500">
                  <UserCheck className="size-3.5 text-amber-500" />
                </span>
                <span>Buyer</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-0.5 text-[10px] font-bold border border-amber-500/30">
                  Qualified
                </span>
              </div>
            </motion.div>

            {/* Footer Status Bar */}
            <div className="relative z-20 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-2 px-1 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-500" />
                Dual-Stream Voice AI Peering
              </span>
              <span className="font-bold text-rose-600 dark:text-rose-400">Sub-250ms Real-Time Latency</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
