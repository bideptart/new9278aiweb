"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ChevronLeft, ChevronRight, Phone, Infinity as InfinityIcon, Zap, Check, User, Bot, Sparkles, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

function ZeroLagIllustration() {
  const barCount = 48
  const bars = Array.from({ length: barCount }, (_, i) => {
    const mid = barCount / 2
    const dist = Math.abs(i - mid)
    const jitter = (i % 3) * 6 - 6
    const base = 14 + Math.max(0, 58 - dist * 2.15) + jitter
    return Math.max(8, Math.min(96, base))
  })

  return (
    <div className="relative flex h-full min-h-[310px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-card/90 border border-white/80 dark:border-white/15 px-6 py-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] group">
      {/* Ambient Red Radial Mesh Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/30 via-rose-500/20 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity"
      />

      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary border border-primary/20 shadow-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Analyzing audio stream
        </span>
        <span className="font-mono text-[11px] font-semibold text-muted-foreground">0ms STT lag</span>
      </div>

      <div className="flex h-28 w-full items-center gap-[3px] my-3 z-10">
        {bars.map((h, i) => (
          <span
            key={i}
            className="voice-bar min-w-0 flex-1 shrink-0 rounded-full"
            style={{
              height: `${h}%`,
              animationDelay: `${(i * 70) % 1100}ms`,
              backgroundImage: "linear-gradient(180deg, var(--primary), color-mix(in oklch, var(--primary) 40%, transparent))",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-center text-xs font-semibold z-10">
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-2.5 backdrop-blur-md transition-colors group-hover:bg-primary/15">
          <p className="text-primary font-bold font-mono text-sm">&lt; 250ms</p>
          <p className="text-[10px] text-muted-foreground font-medium">Real-Time Latency</p>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 backdrop-blur-md transition-colors group-hover:bg-emerald-500/15">
          <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">100% Native</p>
          <p className="text-[10px] text-muted-foreground font-medium">Audio-to-Audio</p>
        </div>
      </div>
    </div>
  )
}

function SmartInterruptIllustration() {
  const [phase, setPhase] = useState<"listening" | "understanding" | "responding">("listening")

  useEffect(() => {
    setPhase("listening")
    const t1 = setTimeout(() => setPhase("understanding"), 900)
    const t2 = setTimeout(() => setPhase("responding"), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const cutAt = 128
  const states: Array<{ key: typeof phase; label: string }> = [
    { key: "listening", label: "Listening" },
    { key: "understanding", label: "Understanding" },
    { key: "responding", label: "Responding" },
  ]

  return (
    <div className="relative flex h-full min-h-[310px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-card/90 border border-white/80 dark:border-white/15 px-6 py-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] group">
      {/* Ambient Red Radial Mesh Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/30 via-rose-500/20 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity"
      />

      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary border border-primary/20 shadow-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Barge-in detected
        </span>
        <span className="font-mono text-[11px] font-semibold text-muted-foreground">&lt;250ms interrupt</span>
      </div>

      <div className="relative h-24 w-full my-2 z-10">
        <svg viewBox="0 0 320 100" className="h-full w-full" preserveAspectRatio="none">
          <path
            d={`M0 50 C 16 24, 32 76, 48 50 S 80 24, 96 50 S 112 70, ${cutAt} 50`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={cn("text-foreground/30 transition-opacity duration-500", phase !== "listening" && "opacity-40")}
          />
          <path
            d={`M${cutAt} 50 C ${cutAt + 16} 10, ${cutAt + 32} 90, ${cutAt + 48} 50 S ${cutAt + 80} 10, ${cutAt + 96} 50`}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={cn("transition-opacity duration-300", phase === "responding" ? "opacity-95" : "opacity-0")}
          />
          <line x1={cutAt} y1="0" x2={cutAt} y2="100" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
        </svg>

        <span
          className="absolute bottom-0 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary shadow-xs backdrop-blur-md"
          style={{ left: `${(cutAt / 320) * 100}%` }}
        >
          <Zap className="h-3 w-3" strokeWidth={2.5} />
          Barge-in Active
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-border/40 pt-3 z-10">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
            <User className="size-4" />
          </span>
          <span className="text-xs font-bold">Caller Speech</span>
        </div>

        <div className="flex items-center gap-3">
          {states.map((s) => (
            <span
              key={s.key}
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-bold transition-colors",
                phase === s.key ? "text-primary" : "text-muted-foreground/40"
              )}
            >
              {s.label}
              <span className={cn("size-1.5 rounded-full bg-current", phase === s.key && "animate-ping")} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CapacityIllustration() {
  const [activeCallCount, setActiveCallCount] = useState(1284)

  // Live ticking call counter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCallCount((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative flex h-full min-h-[310px] w-full flex-col justify-between overflow-hidden rounded-3xl bg-card/90 border border-white/80 dark:border-white/15 px-6 py-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] group">
      {/* Ambient Red Radial Mesh Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/30 via-rose-500/20 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity"
      />

      {/* Top Header Row */}
      <div className="flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary border border-primary/20 shadow-xs">
          <InfinityIcon className="size-3.5 text-primary" />
          ∞ Unlimited Scale
        </span>
        <span className="font-mono text-[11px] font-semibold text-muted-foreground">No busy signals</span>
      </div>

      {/* Central Rotating Radar Visualizer with Glowing Rings */}
      <div className="relative flex flex-1 items-center justify-center my-6">
        {/* Radar Concentric Glowing Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer Pulsing Aura Ring */}
          <div className="size-48 rounded-full border border-primary/20 bg-primary/5 animate-pulse" />
          {/* Dashed Rotating Radar Outer Ring */}
          <div className="absolute size-40 rounded-full border border-dashed border-primary/40 animate-spin" style={{ animationDuration: "14s" }} />
          {/* Inner Rotating Counter Radar Ring */}
          <div className="absolute size-28 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: "9s", animationDirection: "reverse" }} />
        </div>

        {/* Floating Satellite Status Badges */}
        <div className="absolute -top-1 left-2 flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md shadow-xs">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
          100% Inbound SLA
        </div>

        <div className="absolute -bottom-1 right-2 flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-primary border border-primary/20 backdrop-blur-md shadow-xs">
          <span className="size-1.5 rounded-full bg-primary animate-ping" />
          0 Queued Calls
        </div>

        {/* Central Glowing Phone Node */}
        <div className="relative size-16 rounded-full bg-gradient-to-br from-primary via-primary to-rose-700 text-primary-foreground flex items-center justify-center shadow-[0_0_35px_rgba(244,91,91,0.5)] ring-8 ring-primary/20 transition-transform group-hover:scale-110">
          <Phone className="size-7 animate-pulse" />
        </div>
      </div>

      {/* Bottom Live Metrics Chips */}
      <div className="grid grid-cols-2 gap-3 text-center text-xs font-semibold z-10">
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-2.5 backdrop-blur-md transition-colors group-hover:bg-primary/15">
          <p className="text-primary font-bold font-mono text-sm">{activeCallCount.toLocaleString()}+ Calls</p>
          <p className="text-[10px] text-muted-foreground font-medium">Concurrent Capacity</p>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 backdrop-blur-md transition-colors group-hover:bg-emerald-500/15">
          <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">0 Seconds</p>
          <p className="text-[10px] text-muted-foreground font-medium">Hold / Queue Time</p>
        </div>
      </div>
    </div>
  )
}

export function IndustryInteractiveShowcase({ industryName }: { industryName: string }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const reduced = useReducedMotion()

  const slides = [
    {
      step: "01 / 03",
      tag: "SMART INTERRUPTIONS",
      title: "Natural barge-in detection",
      description:
        `Customers can talk over the agent at any moment. It stops, listens, and responds the way a real human would — not the way a chatbot pretends to. Barge-in detection kicks in instantly for ${industryName.toLowerCase()} calls.`,
      Illustration: SmartInterruptIllustration,
      points: [
        "Instant caller speech detection",
        "Natural tone adaptation & emotion",
        "Seamless conversational handling",
      ],
    },
    {
      step: "02 / 03",
      tag: "ZERO-LAG CONVERSATIONS",
      title: "Sub-250ms real-time latency",
      description:
        `Native audio-to-audio modeling delivers natural warmth and real-time fluidity. No robotic dead air, no awkward pauses while a transcription pipeline catches up. Every response streams back in real time.`,
      Illustration: ZeroLagIllustration,
      points: [
        "0ms STT relay overhead",
        "Human-like breath & pacing",
        "Custom domain vocabulary",
      ],
    },
    {
      step: "03 / 03",
      tag: "UNLIMITED CAPACITY",
      title: "Scale from 1 to 10,000 calls",
      description:
        `Scale from one call to thousands simultaneously. No busy signals, no queue time, no per-seat math. Every caller gets the same agent, the same knowledge, and instant pickup 24/7.`,
      Illustration: CapacityIllustration,
      points: [
        "Zero hold or queue times",
        "No extra per-seat licenses",
        "Direct EHR & Calendar sync",
      ],
    },
  ]

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActiveSlide((prev) => (prev + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [reduced, slides.length])

  const current = slides[activeSlide]
  const IllustrationComponent = current.Illustration

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-slate-200/60 dark:border-slate-800/60">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50">
          <Sparkles className="size-3.5 text-rose-500 animate-pulse" />
          THE HUMAN-KIND EXPERIENCE
        </span>
        <h2 className="text-3xl font-serif font-semibold tracking-tight md:text-5xl text-foreground">
          Conversations indistinguishable from <span className="italic text-rose-600 dark:text-rose-400">your best agent.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          9278.ai runs on a single audio-native engine so your callers hear pauses, emotion, and timing that feel right.
        </p>
      </div>

      {/* Main Light Glassmorphic Showcase Box */}
      <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 md:p-10 shadow-xl overflow-hidden">
        {/* Soft Light Rose Ambient Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 -z-10 size-96 rounded-full bg-gradient-to-tr from-rose-500/10 via-rose-300/5 to-transparent blur-3xl opacity-60"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Live Animated Illustration Component */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <IllustrationComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Slide Text & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      {current.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {current.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-serif font-semibold tracking-tight text-foreground">{current.title}</h3>
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {current.description}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {current.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-medium">
                      <Check className="size-4 text-rose-600 dark:text-rose-400 shrink-0 stroke-[3]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200/80 dark:border-slate-800 mt-8">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 cursor-pointer",
                      idx === activeSlide ? "w-8 bg-rose-500" : "w-2 bg-slate-200 dark:bg-slate-800 hover:bg-rose-300"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="size-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="size-5 text-rose-600 dark:text-rose-400" />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                  className="size-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                  aria-label="Next feature"
                >
                  <ChevronRight className="size-5 text-rose-600 dark:text-rose-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
