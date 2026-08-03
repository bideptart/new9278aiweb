"use client"

import { useState, useEffect, useCallback, type ElementType } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  Clock,
  Database,
  Globe,
  Headphones,
  PhoneCall,
  PhoneForwarded,
  Sparkles,
  Mic,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type NodeKey = "latency" | "multilingual" | "calls" | "crm" | "transfer" | "afterhours"

export type NodeConfig = {
  key: NodeKey
  label: string
  shortTag: string
  icon: ElementType
  top: string
  left?: string
  right?: string
  startPoint: { x: number; y: number }
  midPoint: { x: number; y: number }
  endPoint: { x: number; y: number }
  title: string
  subtitle: string
  quote: string
  badge: string
  floatDelay: number
}

// 6 Orbit Nodes balanced at exact sweet-spot distances (Close to phone, 15px-25px gap, ZERO overlap!)
export const nodes: NodeConfig[] = [
  {
    key: "latency",
    label: "Zero-Latency Replies",
    shortTag: "<280ms Latency",
    icon: Clock,
    top: "2%",
    left: "1%",
    startPoint: { x: 50, y: 55 },
    midPoint: { x: 50, y: 130 },
    endPoint: { x: 145, y: 130 },
    title: "Sub-300ms Response Speed",
    subtitle: "Converses smoothly without robotic delays or awkward pauses",
    quote: '"Hello! I can answer your question instantly with zero latency."',
    badge: "Sub-300ms",
    floatDelay: 0,
  },
  {
    key: "multilingual",
    label: "Multilingual Fluency",
    shortTag: "30+ Languages",
    icon: Globe,
    top: "2%",
    right: "1%",
    startPoint: { x: 410, y: 55 },
    midPoint: { x: 410, y: 130 },
    endPoint: { x: 315, y: 130 },
    title: "Instant Language Switching",
    subtitle: "Recognizes caller native language automatically in real-time",
    quote: '"¡Hola! Puedo atender su llamada en español o 30+ idiomas."',
    badge: "30+ Langs",
    floatDelay: 0.4,
  },
  {
    key: "calls",
    label: "Inbound Calls",
    shortTag: "100% Pickup",
    icon: PhoneCall,
    top: "43%",
    left: "-5%",
    startPoint: { x: 45, y: 180 },
    midPoint: { x: 95, y: 180 },
    endPoint: { x: 145, y: 180 },
    title: "24/7 Autonomous Intake",
    subtitle: "Answers 100% of calls on first ring, zero missed opportunities",
    quote: '"Thank you for calling! How may I assist your inquiry today?"',
    badge: "Always Active",
    floatDelay: 0.8,
  },
  {
    key: "crm",
    label: "Automatic CRM Sync",
    shortTag: "Auto Logging",
    icon: Database,
    top: "43%",
    right: "-5%",
    startPoint: { x: 415, y: 180 },
    midPoint: { x: 365, y: 180 },
    endPoint: { x: 315, y: 180 },
    title: "Instant CRM Data Sync",
    subtitle: "Transcribes calls, extracts intent, and logs lead cards",
    quote: "✓ Lead created: John Doe (Qualified • High Priority)",
    badge: "Auto Synced",
    floatDelay: 1.2,
  },
  {
    key: "transfer",
    label: "Live Staff Transfer",
    shortTag: "Warm Patching",
    icon: PhoneForwarded,
    top: "84%",
    left: "4%",
    startPoint: { x: 65, y: 315 },
    midPoint: { x: 65, y: 230 },
    endPoint: { x: 145, y: 230 },
    title: "Intelligent Staff Routing",
    subtitle: "Transfers urgent callers to staff with AI summary briefing",
    quote: '"Connecting you to Senior Support now. Please hold a second..."',
    badge: "Live Patching",
    floatDelay: 1.6,
  },
  {
    key: "afterhours",
    label: "After-Hours Coverage",
    shortTag: "Night & Peak",
    icon: Headphones,
    top: "84%",
    right: "4%",
    startPoint: { x: 395, y: 315 },
    midPoint: { x: 395, y: 230 },
    endPoint: { x: 315, y: 230 },
    title: "Night & Overflow Protection",
    subtitle: "Handles 100% of after-hours inquiry calls and peak surges",
    quote: '"Our office is currently closed, but I can book your slot now."',
    badge: "24/7 Coverage",
    floatDelay: 2.0,
  },
]

export function CallRoutingOrbit({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const [activeKey, setActiveKey] = useState<NodeKey>("calls")

  // Automatic Fast Cycling every 2.2 seconds with smooth 0.2s transition
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKey((prev) => {
        const currentIndex = nodes.findIndex((n) => n.key === prev)
        const nextIndex = (currentIndex + 1) % nodes.length
        return nodes[nextIndex].key
      })
    }, 2200)

    return () => clearInterval(interval)
  }, [])

  const activeNode = nodes.find((n) => n.key === activeKey) || nodes[2]

  const handleNodeClick = useCallback((key: NodeKey) => {
    setActiveKey(key)
  }, [])

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[460/360] w-full max-w-[460px] select-none p-1 sm:p-2",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
      >
        {/* Soft Ambient Backdrop Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/10 blur-[75px]"
        />

        {/* SVG Lines */}
        <svg
          aria-hidden
          viewBox="0 0 460 360"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {nodes.map((node) => {
            const isActive = node.key === activeKey
            const d = `M ${node.startPoint.x} ${node.startPoint.y} L ${node.midPoint.x} ${node.midPoint.y} L ${node.endPoint.x} ${node.endPoint.y}`

            return (
              <g key={`connector-${node.key}`}>
                {/* SVG Path */}
                <path
                  d={d}
                  fill="none"
                  stroke={isActive ? "var(--primary)" : "currentColor"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={isActive ? "6 4" : "4 5"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "opacity-100" : "text-border/60 opacity-35"
                  )}
                  style={
                    isActive && !reduced
                      ? { filter: "url(#orbit-glow)" }
                      : undefined
                  }
                />

                {/* Traveling Signal Particle */}
                {!reduced && (
                  <circle
                    r={isActive ? 3.5 : 2.5}
                    fill="var(--primary)"
                    className={cn(
                      "transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-40"
                    )}
                    style={{
                      filter: isActive ? "drop-shadow(0 0 4px var(--primary))" : undefined,
                    }}
                  >
                    <animateMotion
                      dur={isActive ? "1.5s" : "3s"}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                )}

                {/* Junction Dot at Phone Border */}
                <circle
                  cx={node.endPoint.x}
                  cy={node.endPoint.y}
                  r={isActive ? 4 : 2.5}
                  fill={isActive ? "var(--primary)" : "var(--background)"}
                  stroke={isActive ? "var(--primary)" : "currentColor"}
                  strokeWidth={1.5}
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-primary shadow-xs" : "text-border"
                  )}
                />
              </g>
            )
          })}
        </svg>

        {/* Central Phone Mockup (Light Elegant Palette) */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 w-[37%] min-w-[168px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] border border-border/80 bg-background/95 shadow-2xl backdrop-blur-xl transition-all duration-200"
          )}
        >
          {/* Phone Header Bar */}
          <div className="relative flex items-center justify-between border-b border-border/40 bg-muted/40 px-3 py-1.5">
            <div className="flex items-center gap-1 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Live Green Online Badge */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[8.5px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                ONLINE
              </span>
            </div>
          </div>

          {/* Phone Screen Display */}
          <div className="p-2.5 space-y-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeNode.key}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-2"
              >
                {/* Active Feature Identity (Light Red Theme) */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="flex size-7.5 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary shadow-xs">
                      <activeNode.icon className="size-3.5 text-primary" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-foreground leading-tight truncate">
                        {activeNode.label}
                      </p>
                      <p className="text-[9.5px] font-medium text-muted-foreground truncate">
                        {activeNode.shortTag}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-primary/10 border border-primary/25 px-2 py-0.5 text-[8px] font-bold text-primary">
                    {activeNode.badge}
                  </span>
                </div>

                {/* Animated Audio Equalizer Waveform */}
                <div className="relative flex h-6 items-center justify-center gap-[2.5px] rounded-xl border border-border/50 bg-muted/30 px-2">
                  {Array.from({ length: 15 }).map((_, i) => {
                    const heights = [30, 65, 90, 45, 100, 75, 40, 85, 60, 95, 50, 70, 35, 80, 55]
                    const h = heights[i % heights.length]
                    return (
                      <span
                        key={i}
                        className="w-[2.5px] rounded-full bg-primary"
                        style={{
                          height: `${h}%`,
                          opacity: 0.85,
                          animation: reduced ? undefined : `voiceBar 0.75s ease-in-out infinite alternate`,
                          animationDelay: `${(i * 45) % 360}ms`,
                        }}
                      />
                    )
                  })}
                </div>

                {/* Active Status Info Box */}
                <div className="rounded-xl border border-border/60 bg-card/70 p-2 text-left shadow-2xs">
                  <p className="text-[9.5px] font-bold text-foreground flex items-center gap-1 leading-tight">
                    <Sparkles className="size-3 text-primary shrink-0" />
                    <span className="truncate">{activeNode.title}</span>
                  </p>
                  <p className="mt-0.5 text-[8.5px] leading-relaxed text-muted-foreground line-clamp-2">
                    {activeNode.subtitle}
                  </p>
                </div>

                {/* Sample Dialogue Quote */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-1.5 text-left">
                  <p className="text-[8.5px] italic font-medium leading-tight text-foreground/90">
                    {activeNode.quote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Phone Screen Footer Bar */}
            <div className="border-t border-border/40 pt-1 text-[8px] font-medium text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1 text-foreground">
                <Mic className="size-2.5 text-primary animate-pulse shrink-0" />
                <span>Live Assistant</span>
              </span>
              <span className="text-primary font-bold">Auto 0.2s ➔</span>
            </div>
          </div>
        </div>

        {/* 6 Orbiting Moveable Nodes (Light Red Color Theme) */}
        {nodes.map((node) => {
          const Icon = node.icon
          const isActive = node.key === activeKey

          return (
            <motion.div
              key={node.key}
              className="absolute outline-hidden"
              style={{
                top: node.top,
                left: node.left,
                right: node.right,
                zIndex: isActive ? 30 : 20,
              }}
              // Draggable interaction
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              dragConstraints={{ left: -15, right: 15, top: -15, bottom: 15 }}
              whileDrag={{ scale: 1.12, zIndex: 40 }}
              animate={
                reduced
                  ? undefined
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 3 + node.floatDelay * 0.4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: node.floatDelay,
                    }
              }
            >
              <button
                type="button"
                onClick={() => handleNodeClick(node.key)}
                onPointerDown={() => handleNodeClick(node.key)}
                aria-label={`Select ${node.label}`}
                aria-pressed={isActive}
                className="group flex flex-col items-center gap-0.5 cursor-grab active:cursor-grabbing"
              >
                {/* Icon Circle (Light Theme) */}
                <div className="relative">
                  {/* Soft Light Ripple Ring */}
                  {isActive && (
                    <span className="absolute -inset-1.5 animate-ping rounded-full bg-primary/20" />
                  )}

                  <span
                    className={cn(
                      "relative flex items-center justify-center rounded-full border transition-all duration-200 backdrop-blur-md",
                      isActive
                        ? "size-9.5 sm:size-10 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 text-primary border-primary/50 ring-3 ring-primary/20 shadow-md shadow-primary/15"
                        : "size-8 sm:size-8.5 bg-card/95 text-foreground border-border/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <Icon className={isActive ? "size-4 text-primary font-bold" : "size-3.5 text-primary/80"} aria-hidden />
                  </span>
                </div>

                {/* Label Pill (Light Red Theme) */}
                <span
                  className={cn(
                    "whitespace-nowrap rounded-full px-2.5 py-0.5 text-[9px] sm:text-[9.5px] transition-all duration-200 shadow-2xs border",
                    isActive
                      ? "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 text-primary border-primary/35 font-bold shadow-xs backdrop-blur-md scale-105"
                      : "bg-background/95 text-muted-foreground border-border/70 group-hover:text-foreground group-hover:border-border font-medium"
                  )}
                >
                  {node.label}
                </span>
              </button>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
