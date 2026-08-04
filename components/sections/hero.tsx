"use client"

/**
 * Hero — full-viewport, two-column.
 *
 * Left: staggered blur-reveal copy, magnetic CTAs, trust row, feature pills.
 * Right: <HeroShowcase /> — a glass device cycling through five product states.
 * Behind both: <HeroBackground /> — aurora orbs, neural lines, cursor spotlight.
 *
 * Motion budget: every animation here is transform/opacity or filter on a
 * composited layer, so the main thread stays free. `prefers-reduced-motion`
 * strips the loops and the pointer-driven effects entirely.
 */

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Gauge,
  Languages,
  Pause,
  PhoneCall,
  Play,
  Sparkles,
  Star,
  Waves,
} from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"
import { HeroBackground } from "@/components/sections/hero-background"
import { HeroShowcase } from "@/components/sections/hero-showcase"

const PILLS = [
  { icon: Waves, label: "Human-like voice" },
  { icon: Gauge, label: "Sub-300ms response" },
  { icon: Languages, label: "Multilingual" },
  { icon: PhoneCall, label: "24/7 answering" },
]

/** The headline's second line cycles through what "never miss" applies to —
    keeps the hero feeling alive without touching the static first line. */
const ROTATING_ENDINGS = ["another call.", "another lead.", "another booking.", "another customer."]
const ROTATE_MS = 2600

/** Wordmarks are rendered as type — elegant, monochrome, zero image weight. */
const PARTNERS = ["Microsoft", "HubSpot", "Google", "Slack", "Stripe"]

/* ------------------------------------------------------------------ */
/* magnetic wrapper                                                     */
/* ------------------------------------------------------------------ */

function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.5 })

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduced ? undefined : { x, y }}
      className="inline-block"
    >
      {children}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/* hero                                                                 */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [endingIndex, setEndingIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setEndingIndex((i) => (i + 1) % ROTATING_ENDINGS.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [reduced])

  const toggleDemo = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) void el.play()
    else el.pause()
  }, [])

  /** Blur-reveal, staggered by index. */
  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.75, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-white">
      <HeroBackground />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-14">
        {/* ─────────────── LEFT ─────────────── */}
        <div className="lg:col-span-6 xl:col-span-6">
          {/* badge */}
          <motion.div {...reveal(0)}>
            <span className="glass ring-gradient group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-3.5 py-1.5 text-[11px] font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="uppercase tracking-[0.18em] text-primary">AI Voice Platform</span>
              <span className="h-3 w-px bg-border" />
              <span className="text-muted-foreground">Live now</span>
              {!reduced && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  animate={{ x: ["-150%", "420%"] }}
                  transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4, ease: "easeInOut" }}
                />
              )}
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            {...reveal(1)}
            className="mt-6 text-balance text-center font-serif text-[10.5vw] font-normal leading-[0.98] tracking-[-0.02em] sm:text-left sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            Never miss
            <br />
            <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_ENDINGS[endingIndex]}
                  initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-aurora text-aurora-flow inline-block italic"
                >
                  {ROTATING_ENDINGS[endingIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* description */}
          <motion.p
            {...reveal(2)}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-[1.0625rem]"
          >
            9278.ai answers on the first ring in a voice callers can&apos;t tell from a person — it holds the
            conversation, books the meeting and updates your CRM, on the number and carrier you already have.
          </motion.p>

          {/* CTAs */}
          <motion.div {...reveal(3)} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap">
            <Magnetic>
              <Link
                href="/get-started"
                className="btn-ai group relative inline-flex h-[3.25rem] items-center gap-2 overflow-hidden rounded-full px-7 text-[0.9375rem] font-semibold text-primary-foreground transition-[filter,transform] duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="relative z-10">Build Your AI Agent</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                {/* gradient sweep on hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
              </Link>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={toggleDemo}
                aria-pressed={playing}
                className="glass ring-gradient group relative inline-flex h-[3.25rem] items-center gap-2.5 overflow-hidden rounded-full px-6 text-[0.9375rem] font-semibold text-foreground transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-primary transition-all duration-300",
                    "group-hover:bg-primary group-hover:text-primary-foreground"
                  )}
                >
                  {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-[1px]" />}
                </span>
                {playing ? "Pause the demo" : "Hear a Live Demo"}
              </button>
            </Magnetic>

            <audio
              ref={audioRef}
              src="/hpvoice.mp3"
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              className="sr-only"
            />
          </motion.div>

          {/* feature pills */}
          <motion.ul {...reveal(4)} className="mt-7 flex flex-wrap gap-2">
            {PILLS.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="group inline-flex cursor-default items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-[11.5px] font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.07] hover:text-foreground">
                  <Icon className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* trust */}
          <motion.div {...reveal(5)} className="mt-9 space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> average rating
                </span>
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span className="text-[13px] text-muted-foreground">
                <span className="font-semibold text-foreground">500+</span> businesses answering with 9278.ai
              </span>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:gap-5">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                Integrates with
              </span>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {PARTNERS.map((name) => (
                  <li
                    key={name}
                    className="cursor-default text-[13px] font-semibold tracking-tight text-muted-foreground/55 grayscale transition-all duration-300 hover:text-foreground/80 hover:grayscale-0"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ─────────────── RIGHT ─────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 xl:col-span-6"
        >
          <HeroShowcase />
        </motion.div>
      </div>

      {/* bottom hairline + scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden flex-col items-center gap-2 pb-4 lg:flex"
      >
        <span className="inline-flex items-center gap-1.5 text-[9.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground/60">
          <Sparkles className="h-2.5 w-2.5" /> Connect your carrier in two clicks
        </span>
        <span className="h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.div>
    </section>
  )
}
