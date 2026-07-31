"use client"

/**
 * Wraps AIVoiceOrb3D with the same audio/status chrome the 2D console used
 * (play the /hpvoice.mp3 sample, "calls active" loop, status bar) so
 * swapping the hero's visual doesn't drop the "Hear a real call" CTA's
 * behaviour. The 3D canvas is loaded client-only via next/dynamic — WebGL
 * needs the browser, and importing three.js/@react-three eagerly in the
 * server bundle would be dead weight.
 */

import dynamic from "next/dynamic"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Globe2, Zap, ShieldCheck } from "lucide-react"
import { animate, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const AIVoiceOrb3D = dynamic(() => import("@/components/ui/ai-voice-orb-3d").then((m) => m.AIVoiceOrb3D), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-primary/[0.04]" />,
})

// Fills the empty space either side of the orb — same claims used in the
// hero's own stat strip and the closing CTA's trust row, not new copy.
const SIDE_BULLETS = [
  { icon: Zap, label: "Sub-second latency", side: "left" as const },
  { icon: ShieldCheck, label: "Self-hosted control panel", side: "right" as const },
]

const ACTIVE_CALLS = 1284

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
}

export type CallConsoleHandle = { toggle: () => void }

export const HeroVoiceOrbPanel = forwardRef<CallConsoleHandle>(function HeroVoiceOrbPanel(_props, ref) {
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playingRef = useRef(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeCalls, setActiveCalls] = useState(ACTIVE_CALLS)

  useEffect(() => {
    const controls = animate(
      ACTIVE_CALLS,
      [ACTIVE_CALLS + 37, ACTIVE_CALLS - 52, ACTIVE_CALLS + 21, ACTIVE_CALLS - 29, ACTIVE_CALLS + 44, ACTIVE_CALLS],
      { duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", onUpdate: (v) => setActiveCalls(Math.round(v)) },
    )
    return () => controls.stop()
  }, [])

  /* Build the Web Audio graph lazily: createMediaElementSource may only run
     once per element, and an AudioContext needs a user gesture to start.
     The analyser is handed to the 3D orb, which samples it every frame so
     the surface actually reacts to the voice instead of faking a pulse. */
  const ensureGraph = useCallback(() => {
    if (ctxRef.current || !audioRef.current) return
    try {
      const AC: typeof AudioContext =
        window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      const ctx = new AC()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.72
      ctx.createMediaElementSource(audioRef.current).connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
    } catch {
      /* No Web Audio (or blocked) — playback still works, orb falls back to
         its idle sway rather than breaking. */
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playingRef.current) {
      audio.pause()
      return
    }
    ensureGraph()
    void ctxRef.current?.resume()
    void audio.play().catch(() => {
      /* Autoplay/interaction restrictions — leave the panel idle. */
    })
  }, [ensureGraph])

  useEffect(() => {
    const ctx = ctxRef.current
    return () => {
      void ctx?.close()
    }
  }, [])

  useImperativeHandle(ref, () => ({ toggle }), [toggle])

  return (
    <div className="ring-gradient card-glow relative overflow-hidden rounded-3xl">
      <span className="scan-line" aria-hidden />

      <audio
        ref={audioRef}
        src="/hpvoice.mp3"
        preload="metadata"
        onPlay={() => {
          playingRef.current = true
          setPlaying(true)
        }}
        onPause={() => {
          playingRef.current = false
          setPlaying(false)
        }}
        onEnded={() => {
          playingRef.current = false
          setPlaying(false)
          setCurrent(0)
        }}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Status bar — same layout language as the rest of the hero chrome */}
      <div className="relative flex items-center justify-between gap-2 border-b border-border/40 bg-background/50 px-4 py-2.5 md:px-5">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Globe2 className="h-3 w-3 text-primary" aria-hidden="true" />
          <span className="font-mono tabular-nums text-foreground/80">{activeCalls.toLocaleString("en-US")}</span>
          calls active
        </span>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>

      {/* 3D voice orb */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-[16/10]">
        <AIVoiceOrb3D active={playing} analyserRef={analyserRef} onToggle={toggle} />

        {/* Side bullets — fill the empty margins either side of the ring
            with real product claims instead of blank white. */}
        {SIDE_BULLETS.map((bullet, i) => {
          const Icon = bullet.icon
          return (
            <motion.div
              key={bullet.label}
              className={cn(
                "pointer-events-none absolute top-1/2 z-10 hidden max-w-[9.5rem] -translate-y-1/2 items-center gap-2 rounded-xl border border-border/60 bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md sm:flex",
                bullet.side === "left" ? "left-4" : "right-4",
              )}
              animate={reduced ? undefined : { y: ["-50%", "calc(-50% - 8px)", "-50%"] }}
              transition={{ duration: 4.5 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.6 }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium leading-tight text-foreground/85">{bullet.label}</span>
            </motion.div>
          )
        })}

        <span className="pointer-events-none absolute bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-border/60 bg-card/85 px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-sm backdrop-blur-md">
          {playing ? "Aria · speaking now" : "Tap the orb to hear a real call"}
        </span>
      </div>
    </div>
  )
})
