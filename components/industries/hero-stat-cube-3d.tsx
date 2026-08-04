"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatCubeFace {
  icon: LucideIcon
  value: string
  label: string
  caption: string
}

interface HeroStatCube3DProps {
  title: string
  liveTag: string
  faces: StatCubeFace[]
  intervalMs?: number
}

export function HeroStatCube3D({ title, liveTag, faces, intervalMs = 2600 }: HeroStatCube3DProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % faces.length), intervalMs)
    return () => clearInterval(timer)
  }, [faces.length, intervalMs])

  const face = faces[index]
  const size = 92
  const half = size / 2

  return (
    <div className="relative mt-4 w-full max-w-sm sm:max-w-md rounded-3xl border border-rose-200/60 dark:border-rose-900/50 bg-gradient-to-r from-card/95 via-rose-50/50 to-card/95 dark:from-card/95 dark:via-rose-950/30 dark:to-card/95 p-4 shadow-[0_15px_40px_rgba(251,164,164,0.10)] backdrop-blur-2xl [transform:translateZ(60px)] z-40 overflow-hidden">
      {/* Glowing Top Edge Line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />

      {/* Console Header Bar */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-normal text-foreground">{title}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-[9px] font-mono text-rose-400 dark:text-rose-400">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
            {liveTag}
          </p>
        </div>
        <Sparkles className="size-4 text-rose-300 animate-pulse" />
      </div>

      <div className="flex items-center gap-5">
        {/* Auto-Rotating 3D Stat Cube */}
        <div className="shrink-0 [perspective:800px]">
          <motion.div
            className="relative [transform-style:preserve-3d]"
            style={{ width: size, height: size }}
            animate={{ rotateY: -index * 90, rotateX: 10 }}
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
          >
            {faces.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border border-rose-200/70 dark:border-rose-900/50 bg-white dark:bg-slate-900 shadow-md"
                  style={{ transform: `rotateY(${i * 90}deg) translateZ(${half}px)` }}
                >
                  <Icon className="size-5 text-rose-400 dark:text-rose-300" />
                  <p className="text-sm font-extrabold text-foreground tracking-tight">{f.value}</p>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Auto-Shifting Live Caption — no opacity animation so it can never get stuck invisible */}
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 4 }}
              animate={{ y: 0 }}
              exit={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400">
                {face.label}
              </p>
              <p className="mt-1 text-xs text-foreground font-serif italic leading-relaxed">{face.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Face Progress Dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-border/30 pt-2.5">
        {faces.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-5 bg-rose-400" : "w-1.5 bg-rose-400/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}
