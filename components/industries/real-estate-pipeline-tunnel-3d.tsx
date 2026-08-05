"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sparkles,
  Zap,
  Mic,
  UserCheck,
  Calendar,
  MessageSquare,
  Database,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TunnelStep {
  num: string
  title: string
  badge: string
  icon: LucideIcon
  preview: string
}

const STEPS: TunnelStep[] = [
  {
    num: "01",
    title: "Instant Portal Call Intake",
    badge: "SUB-3s PORTAL INTAKE",
    icon: Zap,
    preview: "Housing.com Enquiry ➔ AI Agent dialing buyer back in 2.8s...",
  },
  {
    num: "02",
    title: "Instant AI Voice Qualification",
    badge: "24/7 AI VOICE AGENT",
    icon: Mic,
    preview: "“Hi Rahul! Thanks for enquiring about Kothrud Heights — 2BHK or 3BHK?”",
  },
  {
    num: "03",
    title: "Budget & Loan Qualification",
    badge: "BUYER SCORE 98/100",
    icon: UserCheck,
    preview: "Budget ₹1.5 Cr • Loan Pre-Approved • High Intent Score 98/100",
  },
  {
    num: "04",
    title: "Broker Calendar & Site Tour Lock",
    badge: "SITE WALKTHROUGH LOCKED",
    icon: Calendar,
    preview: "Saturday 11:00 AM Confirmed ➔ Senior Broker Assigned",
  },
  {
    num: "05",
    title: "Instant WhatsApp Floor Plan Relay",
    badge: "WHATSAPP DISPATCH",
    icon: MessageSquare,
    preview: "FloorPlan.pdf + PriceSheet.pdf + Google Maps Pin ➔ Sent",
  },
  {
    num: "06",
    title: "Instant CRM & Pipeline Sync",
    badge: "AUTOMATED CRM SYNC",
    icon: Database,
    preview: "Buyer Data & Call Transcript Synced ➔ Broker Notified",
  },
]

const TOTAL = STEPS.length

export function RealEstatePipelineTunnel3D() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % TOTAL), 1500)
    return () => clearInterval(timer)
  }, [])

  const active = STEPS[index]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-20"
      />

      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          LEAD TO SITE VISIT TUNNEL
        </span>
        <h2 className="text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground">
          Every lead, <span className="italic text-rose-400 dark:text-rose-400">flying straight to a site visit.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          Watch a portal enquiry travel the full pipeline, step by step, in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* 3D Spiral Depth Tunnel */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative h-[280px] sm:h-[330px] md:h-[380px] w-full max-w-md [perspective:1100px]">
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-rose-200/70 dark:border-rose-900/50 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 text-[10px] font-mono font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 backdrop-blur-md shadow-xs">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-rose-400" />
            </span>
            {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <div className="absolute inset-0 scale-[0.62] sm:scale-[0.82] md:scale-100 origin-center">
            {/* Rotating dashed spiral guide rings, purely decorative */}
            {[1, 2, 3, 4].map((d) => (
              <motion.span
                key={d}
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-rose-300/50 dark:border-rose-800/40"
                style={{ width: 224 + d * 44, height: 224 + d * 44 }}
                animate={{ rotate: d % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 24 + d * 7, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* Ambient orbiting particles for a living 3D feel */}
            {[0, 1, 2].map((p) => {
              const baseAngle = p * 120
              const orbitRadius = 168
              return (
                <motion.span
                  key={p}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400 shadow-[0_0_12px_3px_rgba(244,63,94,0.45)]"
                  animate={{
                    x: [
                      Math.cos((baseAngle * Math.PI) / 180) * orbitRadius,
                      Math.cos(((baseAngle + 360) * Math.PI) / 180) * orbitRadius,
                    ],
                    y: [
                      Math.sin((baseAngle * Math.PI) / 180) * orbitRadius * 0.55,
                      Math.sin(((baseAngle + 360) * Math.PI) / 180) * orbitRadius * 0.55,
                    ],
                    opacity: [0.25, 0.9, 0.25],
                  }}
                  transition={{ duration: 9 + p * 2, repeat: Infinity, ease: "linear" }}
                />
              )
            })}

            {/* Live autoplay progress ring around the active step */}
            <svg
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
              width={244}
              height={244}
              viewBox="0 0 244 244"
              style={{ zIndex: TOTAL + 1 }}
            >
              <circle cx={122} cy={122} r={116} fill="none" strokeWidth={2} className="stroke-rose-200/40 dark:stroke-rose-900/40" />
              <motion.circle
                key={index}
                cx={122}
                cy={122}
                r={116}
                fill="none"
                strokeWidth={3}
                strokeLinecap="round"
                className="stroke-rose-400 dark:stroke-rose-400"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "linear" }}
              />
            </svg>

            {STEPS.map((step, i) => {
              const Icon = step.icon
              const diff = (i - index + TOTAL) % TOTAL
              const isExiting = diff === TOTAL - 1
              const depth = isExiting ? 0 : diff

              const angleDeg = depth * 52 + 18
              const angleRad = (angleDeg * Math.PI) / 180
              const spiralRadius = depth * 26
              const spiralX = isExiting ? 0 : Math.cos(angleRad) * spiralRadius
              const spiralY = isExiting ? -50 : Math.sin(angleRad) * spiralRadius

              const translateZ = isExiting ? 220 : -depth * 130
              const rotateZ = isExiting ? 0 : depth * 14
              const scale = isExiting ? 1.2 : Math.max(1 - depth * 0.12, 0.5)
              const opacity = isExiting ? 0 : Math.max(1 - depth * 0.12, 0.45)

              return (
                <motion.div
                  key={step.num}
                  className={cn(
                    "absolute left-1/2 top-1/2 flex aspect-square size-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border-2 text-center backdrop-blur-xl",
                    diff === 0
                      ? "border-rose-300 dark:border-rose-500 bg-white dark:bg-slate-900 shadow-[0_25px_60px_rgba(244,63,94,0.22)]"
                      : "border-border/50 bg-white/80 dark:bg-slate-900/70 shadow-md"
                  )}
                  style={{ zIndex: TOTAL - depth }}
                  animate={{ translateZ, scale, opacity, x: spiralX, y: spiralY, rotateZ }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                >
                  <span
                    className={cn(
                      "absolute inset-3 rounded-full border",
                      diff === 0 ? "border-rose-200 dark:border-rose-500/50" : "border-border/30"
                    )}
                  />
                  <span
                    className={cn(
                      "relative flex size-14 items-center justify-center rounded-full border",
                      diff === 0
                        ? "bg-rose-500/15 border-rose-300 dark:border-rose-500 text-rose-400 dark:text-rose-400"
                        : "bg-rose-500/5 border-border/50 text-muted-foreground"
                    )}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="relative text-[10px] font-mono font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400">
                    STEP {step.num}
                  </span>
                  {diff === 0 && (
                    <p className="relative max-w-[9.5rem] text-xs font-serif font-normal leading-snug text-foreground">
                      {step.title}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
          </div>
        </div>

        {/* Synced Detail Panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 14 }}
              animate={{ y: 0 }}
              exit={{ y: -14 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-[2rem] border border-rose-200/80 dark:border-rose-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 md:p-7 shadow-lg"
            >
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span className="text-[11px] font-mono font-normal px-2.5 py-0.5 rounded-full border border-rose-300 dark:border-rose-800 bg-rose-500/15 text-rose-400 dark:text-rose-300 shadow-xs">
                  STEP {active.num}
                </span>
                <span className="text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/30 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/40 uppercase tracking-wider">
                  {active.badge}
                </span>
              </div>

              <h3 className="text-lg font-serif font-normal text-foreground leading-snug">{active.title}</h3>

              <div className="mt-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/10 p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="size-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[10px] font-mono font-normal text-foreground uppercase tracking-wider">Live Engine Preview</span>
                </div>
                <p className="text-xs font-medium text-foreground italic leading-relaxed">{active.preview}</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-normal">
                  <CheckCircle2 className="size-3" />
                  Automated Real Estate Relay
                </span>
                <span className="text-rose-400 dark:text-rose-400 font-normal">Sub-250ms</span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-border/30 pt-4">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-rose-400" : "w-1.5 bg-rose-400/25"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
