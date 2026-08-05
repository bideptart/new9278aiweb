"use client"

import { motion, useReducedMotion } from "motion/react"
import { User, Bot, Volume2, ArrowRight, Sparkles, PhoneCall, Mic, Wifi, Battery, Sparkle } from "lucide-react"

export function TranscriptCard3D({
  tag,
  scenario,
  callerQuote,
  aiQuote,
}: {
  tag: string
  scenario: string
  callerQuote: string
  aiQuote: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      // Draggable interaction so cards are moveable
      drag
      dragSnapToOrigin
      dragElastic={0.15}
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      whileDrag={{ scale: 1.04, zIndex: 40 }}
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full min-h-[460px] sm:min-h-[500px] w-full max-w-[325px] xs:max-w-[340px] sm:max-w-[360px] flex-col justify-between overflow-hidden rounded-[32px] sm:rounded-[38px] border-2 border-primary/40 bg-background/98 p-4 sm:p-6 shadow-2xl transition-all duration-500 hover:border-primary hover:bg-gradient-to-b hover:from-primary/12 hover:via-card/95 hover:to-primary/18 hover:shadow-2xl hover:shadow-primary/30 hover:ring-2 hover:ring-primary/40 cursor-grab active:cursor-grabbing select-none mx-auto"
    >
      {/* Top Edge Phone Glass Beam Accent */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 space-y-3.5 sm:space-y-4">
        {/* Phone Top Speaker Notch & System Bar */}
        <div className="space-y-2 border-b-2 border-border/80 pb-2.5 sm:pb-3">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
            <span className="font-normal">09:41 AM</span>
            {/* Phone Speaker Pill Notch */}
            <div className="h-2.5 w-14 sm:w-16 rounded-full bg-muted border-2 border-border/80 shadow-inner" />
            <div className="flex items-center gap-1.5">
              <Wifi className="size-3" />
              <Battery className="size-3.5 text-emerald-500" />
            </div>
          </div>

          {/* Active Call HUD Banner & Hover Theme Indicator */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] font-normal uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <PhoneCall className="size-2.5" />
                Live Call
              </span>
            </div>

            {/* Hover Theme Badge Pill */}
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-primary/40 bg-primary/10 px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[9.5px] font-normal text-primary shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Sparkle className="size-2.5 animate-pulse" />
              {tag}
            </span>
          </div>
        </div>

        {/* Scenario Header */}
        <div className="flex items-center gap-1.5 rounded-xl bg-primary/5 px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
          <Sparkles className="size-3.5 text-primary shrink-0" />
          <h4 className="font-mono text-[10.5px] sm:text-[11px] font-normal leading-snug text-foreground">
            {scenario}
          </h4>
        </div>

        {/* Phone Conversation Display */}
        <div className="space-y-2.5 sm:space-y-3 pt-0.5 sm:pt-1">
          {/* Caller Speech Card */}
          <div className="flex items-start gap-2.5 sm:gap-3 rounded-2xl border-2 border-border/80 bg-card/80 p-3 sm:p-3.5 transition-colors group-hover:border-border">
            <span className="flex size-7 sm:size-7.5 shrink-0 items-center justify-center rounded-full bg-muted/80 ring-2 ring-border shadow-2xs">
              <User className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-[9.5px] font-normal uppercase tracking-wider opacity-80">
                  Caller (Client)
                </span>
                <span className="font-mono text-[8px] sm:text-[8.5px] font-normal opacity-60">00:04</span>
              </div>
              <p className="mt-1 text-[11.5px] sm:text-[12.5px] leading-relaxed italic font-medium text-foreground">
                "{callerQuote}"
              </p>
            </div>
          </div>

          {/* AI Receptionist Speech Card */}
          <div className="flex items-start gap-2.5 sm:gap-3 rounded-2xl border-2 border-primary/50 bg-primary/[0.08] p-3 sm:p-3.5 transition-all group-hover:border-primary/80 group-hover:bg-primary/[0.14]">
            <span className="flex size-7 sm:size-7.5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25">
              <Bot className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-[9.5px] font-normal uppercase tracking-wider text-primary flex items-center gap-1">
                  <Volume2 className="size-3 animate-pulse text-primary" />
                  AI Receptionist
                </span>

                {/* Animated Equalizer Visualizer */}
                <div className="flex h-3 items-center gap-[2px]" aria-hidden="true">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const heights = [40, 85, 60, 100, 50, 75]
                    return (
                      <span
                        key={i}
                        className="w-[2px] rounded-full bg-primary"
                        style={{
                          height: `${heights[i]}%`,
                          opacity: 0.9,
                          animation: reduced ? undefined : `voiceBar 0.75s ease-in-out infinite alternate`,
                          animationDelay: `${i * 80}ms`,
                        }}
                      />
                    )
                  })}
                </div>
              </div>

              <p className="mt-1 text-[11.5px] sm:text-[12.5px] leading-relaxed font-normal text-foreground">
                "{aiQuote}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Screen Footer Controls & Move Handle Indicator */}
      <div className="relative z-10 mt-4 sm:mt-5 space-y-2 border-t-2 border-border/80 pt-2.5 sm:pt-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-normal text-primary">
          <span className="flex items-center gap-1 opacity-90 font-mono text-[9.5px] sm:text-[10px]">
            <Mic className="size-3 text-primary animate-pulse" />
            <span>Hover to Glow Theme</span>
          </span>
          <span className="flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1 font-normal">
            Simulate Live Call <ArrowRight className="size-3.5" />
          </span>
        </div>

        {/* Phone Bottom Drag Bar Indicator */}
        <div className="h-1.5 w-16 sm:w-20 rounded-full bg-muted-foreground/40 mx-auto" />
      </div>
    </motion.div>
  )
}
