"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { Calendar, Clock, Database, MessageSquare, PhoneCall, PhoneIncoming, Sliders, Zap, FileText, Send, Sparkles, Volume2, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const ICONS = {
  phone: PhoneCall,
  phoneIncoming: PhoneIncoming,
  database: Database,
  sliders: Sliders,
  zap: Zap,
  calendar: Calendar,
  clock: Clock,
  message: MessageSquare,
  fileText: FileText,
  send: Send,
  sparkles: Sparkles,
  volume: Volume2,
  shield: ShieldCheck,
}
export type ProcessNodeIcon = keyof typeof ICONS

export type ProcessNode = {
  number: string
  iconName: ProcessNodeIcon
  title: string
  description: string
}

export function ProcessFlowTrack({
  eyebrow = "Quick Configuration",
  headingTitle = "Configure Call Transfers in",
  headingAccent = "4 Easy Steps",
  subtitle = "Set up intelligent staff call routing in under 10 minutes.",
  nodes,
}: {
  eyebrow?: string
  headingTitle?: string
  headingAccent?: string
  subtitle?: string
  nodes: ProcessNode[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Track scroll progress to control step progression through sticky scroll lock
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSteps = nodes.length
    const calculatedStep = Math.min(Math.floor(latest * totalSteps), totalSteps - 1)
    if (calculatedStep !== active && calculatedStep >= 0) {
      setActive(calculatedStep)
    }
  })

  // Automatic step cycle timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % nodes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [nodes.length])

  return (
    <div ref={containerRef} className="relative min-h-[180vh] sm:min-h-[220vh] w-full py-12">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      {/* Sticky viewport container — locks screen until all 4 steps complete */}
      <div className="sticky top-20 flex min-h-[80vh] flex-col justify-center py-6">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary shadow-xs">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
              {headingTitle} <span className="italic text-primary">{headingAccent}</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              {subtitle}
            </p>
          </div>

          {/* Central Spine Zig-Zag Layout (100% Different from Horizontal Top Rail!) */}
          <div className="relative">
            {/* Central Vertical Base Spine Line */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-6 bottom-6 hidden w-0.5 -translate-x-1/2 bg-border/60 md:block rounded-full"
            />

            {/* Glowing Vertical Active Laser Line */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-6 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-red-500 to-rose-500 shadow-[0_0_12px_rgba(220,38,38,0.8)] transition-all duration-500 ease-out md:block rounded-full"
              style={{ height: `${(active / (nodes.length - 1)) * 82}%` }}
            />

            <div className="space-y-10 md:space-y-14">
              {nodes.map((node, idx) => {
                const isActive = idx === active
                const isDone = idx < active
                const isLeft = idx % 2 === 0
                const Icon = ICONS[node.iconName] || Calendar

                return (
                  <div
                    key={node.title}
                    className="relative flex flex-col items-center md:flex-row md:justify-between"
                  >
                    {/* Central Node Badge (Pinned on Spine) */}
                    <button
                      type="button"
                      onClick={() => setActive(idx)}
                      aria-label={`Go to step ${node.number}`}
                      className={cn(
                        "z-20 flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300 shadow-md outline-none cursor-pointer md:absolute md:left-1/2 md:-translate-x-1/2",
                        isActive
                          ? "scale-125 border-primary bg-gradient-to-br from-primary via-red-600 to-rose-600 text-white shadow-xl shadow-primary/30 ring-4 ring-primary/20"
                          : isDone
                            ? "border-primary/50 bg-primary/10 text-primary"
                            : "border-border bg-background/90 text-muted-foreground hover:border-primary/40 hover:text-primary hover:scale-105"
                      )}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </button>

                    {/* Left or Right Content Block */}
                    <div
                      className={cn(
                        "mt-4 w-full md:mt-0 md:w-[42%]",
                        isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left",
                        "text-center"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setActive(idx)}
                        className={cn("group outline-none cursor-pointer w-full", isLeft ? "md:text-right" : "md:text-left")}
                      >
                        <div className={cn("inline-flex items-center gap-2 mb-2", isLeft ? "md:flex-row-reverse" : "md:flex-row")}>
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary/80">
                            STEP {node.number}
                          </span>
                          <span className="h-px w-6 bg-primary/30" />
                        </div>

                        <h3
                          className={cn(
                            "text-xl font-bold tracking-tight transition-colors",
                            isActive ? "text-foreground font-bold" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {node.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {node.description}
                        </p>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
