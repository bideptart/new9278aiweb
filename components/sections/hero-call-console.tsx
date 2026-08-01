"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Pause, Play, PhoneCall, Globe2, Sparkles } from "lucide-react"
import { animate, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Hero "Live Call Console".
 *
 * The orb doubles as the play control for the sample call in /hpvoice.mp3.
 * While it plays, a radial waveform ringing the orb is driven by the real
 * FFT data off a Web Audio AnalyserNode, and the transcript advances in
 * step with playback. Idle, the same bars breathe on a synthetic sine so
 * the panel never looks dead.
 *
 * The transcript lines below are illustrative marketing copy, not a
 * transcription of the audio file — they're paced as equal fractions of
 * whatever duration the sample turns out to be.
 */

const BAR_COUNT = 72
const ORB_R = 60
const BAR_GAP = 12
const BAR_MAX = 40

/** Matches the "1,284 Active Calls" figure used in the features illustrations. */
const ACTIVE_CALLS = 1284

/**
 * ⚠️ REPLACE THESE WITH THE WORDS ACTUALLY SPOKEN IN /hpvoice.mp3.
 *
 * The panel labels this a "live transcript" of a "real sample" and highlights
 * each line in time with playback, so a visitor listening will immediately
 * notice if the words don't match. These are placeholders carried over from
 * the previous hero's illustrative copy.
 *
 * Lines are paced as equal fractions of the clip (currently ~9s), so add or
 * remove entries freely — no timings to update.
 */
const TRANSCRIPT = [
  { speaker: "Caller", text: "Hi, I'm calling about the listing on Maple Street." },
  { speaker: "Aria", text: "Of course — are you looking to schedule a showing this week?" },
]

/** Call origins — each one gets a pin, an inbound arc into the orb, and (for
    three of them) a floating chip. Positions are percentages over the map. */
const CALL_ORIGINS = [
  { left: 22, top: 30, city: "New York", intent: "Booking a showing", chip: "top-4 left-3" },
  { left: 78, top: 26, city: "London", intent: "Order status", chip: "top-4 right-3" },
  { left: 30, top: 76, city: "São Paulo", intent: null, chip: null },
  { left: 82, top: 72, city: "Singapore", intent: "New patient intake", chip: "bottom-4 right-3" },
  { left: 50, top: 20, city: "Tokyo", intent: null, chip: null },
] as const

const CALL_CHIPS = CALL_ORIGINS.filter(
  (o): o is (typeof CALL_ORIGINS)[number] & { intent: string; chip: string } => o.chip !== null,
)

/** Quadratic arc from a pin into the centre, bowed perpendicular to the run. */
const arcPath = (x: number, y: number, bend: number) => {
  const cx = 50
  const cy = 50
  const mx = (x + cx) / 2
  const my = (y + cy) / 2
  const dx = cx - x
  const dy = cy - y
  const len = Math.hypot(dx, dy) || 1
  const px = -dy / len
  const py = dx / len
  return `M ${x} ${y} Q ${(mx + px * len * bend).toFixed(2)} ${(my + py * len * bend).toFixed(2)} ${cx} ${cy}`
}

/** Resting bar lengths — a waveform silhouette, so the ring still reads
    as audio if the animation frame loop never runs (hidden tab, etc.). */
const idleLen = (i: number) => {
  const k = i < BAR_COUNT / 2 ? i : BAR_COUNT - 1 - i
  return 5 + Math.abs(Math.sin(k * 0.42)) * 16
}

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
}

export type CallConsoleHandle = { toggle: () => void }

export const HeroCallConsole = forwardRef<CallConsoleHandle>(function HeroCallConsole(_props, ref) {
  const reduced = useReducedMotion()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataRef = useRef<Uint8Array | null>(null)
  const barsRef = useRef<Array<SVGLineElement | null>>([])
  const rafRef = useRef<number | null>(null)
  const playingRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeCalls, setActiveCalls] = useState(ACTIVE_CALLS)

  /* Loops forever — drifts around ACTIVE_CALLS rather than counting up once
     and going static, so the "live" figure actually keeps ticking. */
  useEffect(() => {
    if (reduced) return
    const controls = animate(
      ACTIVE_CALLS,
      [ACTIVE_CALLS + 37, ACTIVE_CALLS - 52, ACTIVE_CALLS + 21, ACTIVE_CALLS - 29, ACTIVE_CALLS + 44, ACTIVE_CALLS],
      {
        duration: 16,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        onUpdate: (v) => setActiveCalls(Math.round(v)),
      },
    )
    return () => controls.stop()
  }, [reduced])

  const progress = duration > 0 ? Math.min(current / duration, 1) : 0
  const activeLine = Math.min(Math.floor(progress * TRANSCRIPT.length), TRANSCRIPT.length - 1)

  const setBar = (i: number, len: number) => {
    const bar = barsRef.current[i]
    if (bar) bar.setAttribute("y2", String(-(ORB_R + BAR_GAP + len)))
  }

  /* Build the audio graph lazily — createMediaElementSource may only run
     once per element, and AudioContext needs a user gesture to start. */
  const ensureGraph = useCallback(() => {
    if (ctxRef.current || !audioRef.current) return
    try {
      const AC: typeof AudioContext =
        window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      const ctx = new AC()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.75
      ctx.createMediaElementSource(audioRef.current).connect(analyser)
      analyser.connect(ctx.destination)
      ctxRef.current = ctx
      analyserRef.current = analyser
      dataRef.current = new Uint8Array(analyser.frequencyBinCount)
    } catch {
      /* No Web Audio (or it's blocked) — playback still works, bars stay synthetic. */
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
      /* Blocked by the browser — leave the panel in its idle state. */
    })
  }, [ensureGraph])

  useImperativeHandle(ref, () => ({ toggle }), [toggle])

  /* One rAF loop for the whole panel: real FFT while playing, a gentle
     synthetic wave while idle. Bars are written straight to the DOM so a
     60fps visualiser never re-renders React. */
  useEffect(() => {
    const half = BAR_COUNT / 2

    if (reduced) {
      for (let i = 0; i < half; i++) {
        const len = 6 + Math.abs(Math.sin(i * 0.7)) * 14
        setBar(i, len)
        setBar(BAR_COUNT - 1 - i, len)
      }
      return
    }

    const tick = (now: number) => {
      const analyser = analyserRef.current
      const data = dataRef.current

      if (playingRef.current && analyser && data) {
        analyser.getByteFrequencyData(data)
        for (let i = 0; i < half; i++) {
          const bin = Math.floor((i / half) * 64)
          const v = data[bin] / 255
          const len = 4 + Math.pow(v, 1.15) * BAR_MAX
          setBar(i, len)
          setBar(BAR_COUNT - 1 - i, len)
        }
      } else {
        const t = now / 1000
        for (let i = 0; i < half; i++) {
          const v = 0.2 + 0.14 * Math.sin(t * 1.5 + i * 0.48) + 0.08 * Math.sin(t * 2.6 + i * 0.21)
          setBar(i, 4 + v * BAR_MAX * 0.55)
          setBar(BAR_COUNT - 1 - i, 4 + v * BAR_MAX * 0.55)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  useEffect(() => {
    const ctx = ctxRef.current
    return () => {
      void ctx?.close()
    }
  }, [])

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

      {/* Status bar */}
      <div className="relative flex items-center justify-between gap-2 border-b border-border/40 bg-background/50 px-4 py-2.5 md:px-5">
        <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Globe2 className="h-3 w-3 text-primary" aria-hidden="true" />
          <span className="font-mono tabular-nums text-foreground/80">{activeCalls.toLocaleString("en-US")}</span>
          calls active
        </span>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>

      {/* Stage — world map, orb, radial waveform. Everything decorative stays
          inside the padded bounds: the card wrapper clips overflow, so
          anything positioned outside it (negative insets) would get cut off. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-[16/10]">
        {/* World map backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "url(/world-map.svg)",
            backgroundSize: "140% auto",
            backgroundPosition: "center 40%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Inbound signal arcs + pins — every call origin routes into the
            orb. SMIL keeps the travelling dots running independently of the
            waveform's rAF loop, so they still move if that loop is paused. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {CALL_ORIGINS.map((o, i) => {
            const d = arcPath(o.left, o.top, i % 2 === 0 ? 0.18 : -0.18)
            return (
              <g key={o.city}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--primary)"
                  strokeOpacity="0.28"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx={o.left} cy={o.top} r="1.1" fill="var(--primary)" fillOpacity="0.6" />
                {!reduced && (
                  <circle r="0.8" fill="var(--ai-magenta)">
                    <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            )
          })}
        </svg>

        {/* Soft glow behind the orb — small and contained, not a page-wide haze */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.16] blur-[40px]"
        />

        {/* Single static ring for structure */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
        />

        {/* Radial waveform + orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-square w-[54%] max-w-[190px]">
            <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                {/* gradientUnits="userSpaceOnUse" with a FIXED span is required here:
                    the default objectBoundingBox mode is computed per-shape, and a
                    vertical <line> has a zero-width bounding box, which makes the
                    gradient degenerate and the stroke disappear entirely. */}
                <linearGradient
                  id="hero-bar"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={-(ORB_R + BAR_GAP)}
                  x2="0"
                  y2={-(ORB_R + BAR_GAP + BAR_MAX + 6)}
                >
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--ai-magenta)" />
                </linearGradient>
              </defs>
              <g transform="translate(160 160)">
                {Array.from({ length: BAR_COUNT }).map((_, i) => (
                  <g key={i} transform={`rotate(${(i * 360) / BAR_COUNT})`}>
                    <line
                      ref={(el) => {
                        barsRef.current[i] = el
                      }}
                      x1="0"
                      y1={-(ORB_R + BAR_GAP)}
                      x2="0"
                      y2={-(ORB_R + BAR_GAP + idleLen(i))}
                      stroke="url(#hero-bar)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                ))}
              </g>
            </svg>

            {/* Ripples radiating off the orb while the sample plays */}
            {playing &&
              !reduced &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{
                    duration: 2.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeOut",
                    delay: i * 0.8,
                  }}
                />
              ))}

            {/* Orb = play control */}
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause the sample call" : "Play a real 9278.ai sample call"}
              className="group absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-95"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 62%, white), var(--primary) 62%, color-mix(in oklch, var(--primary) 78%, black))",
              }}
            >
              {!reduced && !playing && (
                <span className="pulse-ring absolute inset-0 rounded-full text-primary" aria-hidden />
              )}
              {playing ? (
                <Pause className="relative h-6 w-6 fill-white text-white md:h-7 md:w-7" aria-hidden="true" />
              ) : (
                <Play className="relative ml-1 h-6 w-6 fill-white text-white md:h-7 md:w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Caption pinned to the stage, not the shrinking orb wrapper */}
        <span className="pointer-events-none absolute bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-border/60 bg-card/85 px-3 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-md">
          {playing ? "Aria · speaking now" : "Tap to hear a real call"}
        </span>

        {/* Floating live-call chips — positioned inward from the edges so the
            card's overflow-hidden never clips them */}
        {CALL_CHIPS.map((chip, i) => (
          <motion.div
            key={chip.city}
            aria-hidden
            className={cn(
              "absolute z-10 hidden max-w-[9.5rem] items-center gap-2 rounded-xl border border-border/60 bg-card/90 px-2.5 py-1.5 backdrop-blur-md sm:flex",
              chip.chip,
            )}
            animate={reduced ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }}
            transition={{ duration: 4.5 + i, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.6 }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
              <PhoneCall className="h-3 w-3 text-primary" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[10px] font-semibold text-foreground">{chip.city}</span>
              <span className="block truncate text-[9px] text-muted-foreground">{chip.intent}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Transcript — advances with playback */}
      <div className="relative border-t border-border/40 bg-background/50 px-4 py-3.5 md:px-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Live transcript</p>
          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-primary">
            <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
            Real sample
          </span>
        </div>

        <div className="mt-2.5 space-y-1.5">
          {TRANSCRIPT.map((line, i) => {
            const isActive = playing && i === activeLine
            const isAgent = line.speaker === "Aria"
            return (
              <p
                key={line.text}
                className={cn(
                  "flex items-start gap-2 text-xs leading-snug transition-all duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground/45",
                )}
              >
                <span
                  className={cn(
                    "mt-1 h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                    isActive ? (isAgent ? "bg-primary" : "bg-foreground/50") : "bg-border",
                  )}
                />
                <span className="line-clamp-1">
                  <span className={cn("font-medium", isAgent && isActive && "text-primary")}>{line.speaker}:</span>{" "}
                  {line.text}
                </span>
              </p>
            )
          })}
        </div>

        {/* Progress */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border/60">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
})
