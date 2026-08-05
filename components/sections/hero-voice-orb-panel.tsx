"use client"

/**
 * Hero live-call console.
 *
 * A product-grade mockup of the 9278.ai call surface rather than an
 * illustration: real audio drives everything on screen. Pressing play
 * streams /hpvoice.mp3, a Web Audio analyser feeds the waveform and the
 * caller/agent level meters, the transcript types itself in sync with
 * playback position, and the header timer is the real currentTime.
 *
 * Layout is a single glass panel with a soft red wash, a 3D cursor
 * parallax, and floating metric chips at different depths.
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  Globe2,
  Zap,
  ShieldCheck,
  Play,
  Pause,
  AudioLines,
  PhoneCall,
  Sparkles,
  Languages,
  CheckCircle2,
} from "lucide-react"
import { animate, motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"

const ACTIVE_CALLS = 1284
const WAVE_BARS = 56

/** Transcript beats, keyed to playback seconds. Real timing, not a loop. */
const TRANSCRIPT = [
  { t: 0.0, who: "caller", text: "Hi — I'm calling about my order from last week." },
  { t: 3.2, who: "agent", text: "Of course. Let me pull that up — one moment." },
  { t: 6.4, who: "agent", text: "Found it. It shipped Tuesday, arriving tomorrow." },
  { t: 10.0, who: "caller", text: "Perfect. Can I change the delivery address?" },
  { t: 13.4, who: "agent", text: "Yes, I can update that for you right now." },
] as const

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
}

export type CallConsoleHandle = { toggle: () => void }

/* ---------- waveform driven by the real analyser --------------------- */

function Waveform({ playing, levelRef }: { playing: boolean; levelRef: React.MutableRefObject<number> }) {
  const reduced = useReducedMotion()
  const [bars, setBars] = useState<number[]>(() => new Array(WAVE_BARS).fill(0.08))
  const n = useRef(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      n.current += 1
      const k = n.current
      const idle = 0.06 + 0.05 * Math.abs(Math.sin(k * 0.35))
      const live = 0.12 + Math.min(1, levelRef.current * 1.7) * 0.88
      setBars((prev) => [...prev.slice(1), playing ? live : idle])
    }, 60)
    return () => clearInterval(id)
  }, [reduced, playing, levelRef])

  return (
    <div className="flex h-full items-center justify-center gap-[2px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-full bg-primary transition-[height,opacity] duration-100 ease-out"
          style={{
            height: `${Math.max(6, h * 100)}%`,
            opacity: playing ? 0.35 + (i / WAVE_BARS) * 0.65 : 0.22,
          }}
        />
      ))}
    </div>
  )
}

/* ---------- floating metric chip -------------------------------------- */

function Chip({
  className = "",
  delay = 0,
  depth = 40,
  children,
}: {
  className?: string
  delay?: number
  depth?: number
  children: React.ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={`pointer-events-none absolute z-20 rounded-2xl border border-black/[0.06] bg-white/95 px-3.5 py-2.5 backdrop-blur-xl ${className}`}
      style={{ transform: `translateZ(${depth}px)` }}
      initial={{ opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -7, 0] }}
      transition={
        reduced
          ? { duration: 0.4 }
          : { duration: 5 + delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }
      }
    >
      {children}
    </motion.div>
  )
}

/* ==================================================================== */

export const HeroVoiceOrbPanel = forwardRef<CallConsoleHandle>(function HeroVoiceOrbPanel(_props, ref) {
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playingRef = useRef(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const levelRef = useRef(0)
  const rafRef = useRef(0)

  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeCalls, setActiveCalls] = useState(ACTIVE_CALLS)

  const level = useMotionValue(0)
  const levelSpring = useSpring(level, { stiffness: 180, damping: 18, mass: 0.4 })
  const ringScale = useTransform(levelSpring, [0, 1], [1, 1.22])
  const meterWidth = useTransform(levelSpring, [0, 1], ["8%", "100%"])

  /* Which transcript lines have been reached at the current playhead. */
  const visibleLines = useMemo(() => TRANSCRIPT.filter((l) => current >= l.t).slice(-3), [current])
  const speaking = visibleLines.at(-1)?.who ?? "agent"

  useEffect(() => {
    const controls = animate(
      ACTIVE_CALLS,
      [ACTIVE_CALLS + 37, ACTIVE_CALLS - 52, ACTIVE_CALLS + 21, ACTIVE_CALLS - 29, ACTIVE_CALLS + 44, ACTIVE_CALLS],
      { duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", onUpdate: (v) => setActiveCalls(Math.round(v)) },
    )
    return () => controls.stop()
  }, [])

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
      /* Web Audio blocked — playback still works, visuals fall back. */
    }
  }, [])

  useEffect(() => {
    if (!playing) {
      level.set(0)
      levelRef.current = 0
      return
    }
    const data = new Uint8Array(analyserRef.current?.frequencyBinCount ?? 128)
    const tick = () => {
      const analyser = analyserRef.current
      if (analyser) {
        analyser.getByteFrequencyData(data)
        let sum = 0
        for (let i = 0; i < data.length; i++) sum += data[i]
        const v = sum / data.length / 255
        level.set(v)
        levelRef.current = v
      } else {
        const v = 0.25 + 0.2 * Math.abs(Math.sin(performance.now() / 300))
        level.set(v)
        levelRef.current = v
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing, level])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playingRef.current) {
      audio.pause()
      return
    }
    ensureGraph()
    void ctxRef.current?.resume()
    void audio.play().catch(() => {})
  }, [ensureGraph])

  useEffect(() => {
    const ctx = ctxRef.current
    return () => {
      void ctx?.close()
    }
  }, [])

  useImperativeHandle(ref, () => ({ toggle }), [toggle])

  /* Cursor parallax */
  const stageRef = useRef<HTMLDivElement | null>(null)
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const cfg = { stiffness: 120, damping: 20, mass: 0.5 }
  const sx = useSpring(nx, cfg)
  const sy = useSpring(ny, cfg)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = stageRef.current
    if (!el || reduced) return
    const r = el.getBoundingClientRect()
    nx.set((e.clientX - r.left) / r.width - 0.5)
    ny.set((e.clientY - r.top) / r.height - 0.5)
  }

  const progress = duration > 0 ? Math.min(1, current / duration) : 0

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

      {/* ── header ─────────────────────────────────────────────── */}
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

      {/* ── stage ──────────────────────────────────────────────── */}
      <div
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={() => {
          nx.set(0)
          ny.set(0)
        }}
        className="relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-[16/10]"
        style={{ perspective: "1200px" }}
      >
        {/* ambient brand wash + grid floor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--primary)_11%,transparent),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-grid opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]"
        />
        {/* logo watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -right-10 w-[52%] select-none opacity-[0.045] [mask-image:linear-gradient(135deg,transparent_10%,black_70%)]"
        >
          <Image src="/logo.png" alt="" width={560} height={245} draggable={false} className="h-auto w-full" />
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* ── the call card ─────────────────────────────────── */}
          <div
            className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] border border-black/[0.07] bg-white/95 backdrop-blur-xl"
            style={{ transform: "translateZ(46px)" }}
          >
            {/* card chrome */}
            <div className="flex items-center gap-2 border-b border-black/[0.05] bg-black/[0.015] px-3.5 py-2">
              <span className="flex gap-[3px]">
                <span className="h-[5px] w-[5px] rounded-full bg-primary/60" />
                <span className="h-[5px] w-[5px] rounded-full bg-black/[0.12]" />
                <span className="h-[5px] w-[5px] rounded-full bg-black/[0.12]" />
              </span>
              <span className="font-mono text-[8.5px] tracking-wide text-muted-foreground/70">live-call</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-[2px] text-[8px] font-normal uppercase tracking-wider text-primary">
                <span className="relative flex h-1 w-1">
                  {playing && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  )}
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-primary" />
                </span>
                {playing ? "On call" : "Ready"}
              </span>
            </div>

            <div className="p-4">
              {/* caller row */}
              <div className="flex items-center gap-3">
                {/* pulsing avatar */}
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-primary/25 blur-md"
                    style={{ scale: ringScale }}
                  />
                  {!reduced &&
                    playing &&
                    [0, 1].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-primary/40"
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ scale: 1.7, opacity: 0 }}
                        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 0.9 }}
                      />
                    ))}
                  <span
                    className="relative flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-normal text-white ring-2 ring-white"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 68%, white), var(--primary))",
                    }}
                  >
                    AR
                  </span>
                </span>

                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 truncate text-[13px] font-normal tracking-tight">
                    Aria · 9278.ai
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                  </p>
                  <p className="truncate font-mono text-[10.5px] text-muted-foreground">+1 (415) 555-0142</p>
                </div>

                {/* play / pause — the real control */}
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pause the sample call" : "Play a real 9278.ai sample call"}
                  className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-95"
                >
                  {playing ? (
                    <Pause className="h-4 w-4 fill-white" aria-hidden="true" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4 fill-white" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* waveform + scrub progress */}
              <div className="mt-3.5 h-14 rounded-xl bg-black/[0.025] px-2.5 ring-1 ring-black/[0.04]">
                <Waveform playing={playing} levelRef={levelRef} />
              </div>
              <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-black/[0.07]">
                <span
                  className="block h-full rounded-full bg-primary transition-[width] duration-200 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              {/* who's speaking + live level meter */}
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`rounded-md px-1.5 py-[3px] font-mono text-[8px] font-normal uppercase tracking-wider transition-colors duration-300 ${
                    speaking === "agent" ? "bg-primary text-white" : "bg-black/[0.05] text-muted-foreground"
                  }`}
                >
                  {speaking === "agent" ? "Agent" : "Caller"}
                </span>
                <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.span className="block h-full rounded-full bg-primary/70" style={{ width: meterWidth }} />
                </div>
                <span className="font-mono text-[9px] tabular-nums text-muted-foreground">
                  {playing ? "142ms" : "—"}
                </span>
              </div>

              {/* live transcript */}
              <div className="mt-3 h-[76px] space-y-1.5 overflow-hidden rounded-xl bg-black/[0.02] p-2.5 ring-1 ring-black/[0.04]">
                {visibleLines.length === 0 ? (
                  <p className="flex h-full items-center justify-center gap-1.5 text-[10.5px] text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                    Press play — the transcript writes itself.
                  </p>
                ) : (
                  <AnimatePresence initial={false}>
                    {visibleLines.map((l) => (
                      <motion.p
                        key={l.t}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex items-start gap-1.5 text-[10.5px] leading-snug"
                      >
                        <span
                          className={`mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full ${
                            l.who === "agent" ? "bg-primary" : "bg-black/25"
                          }`}
                        />
                        <span className={l.who === "agent" ? "text-foreground/80" : "text-muted-foreground"}>
                          {l.text}
                        </span>
                      </motion.p>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

          {/* ── floating metric chips ──────────────────────────── */}
          <Chip className="left-[3%] top-[10%] hidden w-[142px] sm:block" delay={0} depth={82}>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-3 w-3 text-primary" strokeWidth={2.75} aria-hidden="true" />
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">First word</span>
            </div>
            <p className="mt-1 font-mono text-xl font-normal leading-none tabular-nums text-primary">
              280<span className="ml-0.5 text-[10px] font-medium text-primary/60">ms</span>
            </p>
          </Chip>

          <Chip className="right-[3%] top-[8%] hidden w-[152px] sm:block" delay={1.2} depth={98}>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-3 w-3 text-primary" strokeWidth={2.75} aria-hidden="true" />
              </span>
              <span className="text-[11px] font-normal leading-tight tracking-tight">Self-hosted</span>
            </div>
            <p className="mt-1 text-[9.5px] leading-snug text-muted-foreground">Your infra, your data.</p>
          </Chip>

          <Chip className="bottom-[9%] left-[4%] hidden sm:block" delay={2.3} depth={62}>
            <span className="flex items-center gap-2">
              <Languages className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-[11px] font-normal tracking-tight">32 languages</span>
            </span>
          </Chip>

          <Chip className="bottom-[11%] right-[4%] hidden sm:block" delay={3.1} depth={44}>
            <span className="flex items-center gap-2">
              <AudioLines className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-[11px] font-normal tracking-tight">Audio-native</span>
            </span>
          </Chip>

          {/* brand chip, closest to the viewer */}
          <Chip className="left-1/2 top-[2%] hidden -translate-x-1/2 !py-1.5 sm:block" delay={0.6} depth={120}>
            <span className="relative flex items-center gap-2 overflow-hidden">
              <Image
                src="/logo.png"
                alt="9278.ai"
                width={82}
                height={36}
                draggable={false}
                className="h-[20px] w-auto select-none"
              />
              <span className="h-3.5 w-px bg-black/10" aria-hidden />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">Voice&nbsp;AI</span>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-[-40%] w-8 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                initial={{ x: "-120%" }}
                animate={reduced ? undefined : { x: ["-120%", "480%"] }}
                transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatDelay: 2.4 }}
                style={{ skewX: "-14deg" }}
              />
            </span>
          </Chip>
        </motion.div>

        {/* caption */}
        <span className="pointer-events-none absolute bottom-3 left-1/2 z-30 w-max -translate-x-1/2 rounded-full border border-border/60 bg-card/85 px-3 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-md">
          {playing ? (
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall className="h-3 w-3 text-primary" aria-hidden="true" />
              Aria · speaking now
            </span>
          ) : (
            "Press play to hear a real call"
          )}
        </span>
      </div>
    </div>
  )
})
