"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Headphones, Check, Zap, Globe2, PhoneCall, Star } from "lucide-react"
import { animate, motion, useReducedMotion } from "motion/react"
import { HeroVoiceOrbPanel, type CallConsoleHandle } from "@/components/sections/hero-voice-orb-panel"

const PROOF = ["No porting required", "Live in an afternoon", "Cancel anytime"]

type Stat = {
  icon: LucideIcon
  label: string
  /** Static stats (like "24/7") skip this and just render `value`. */
  loop?: { base: number; keyframes: number[]; duration: number; format: (n: number) => string }
  value?: string
}

const STATS: Stat[] = [
  {
    icon: Zap,
    label: "Response latency",
    // Drifts inside the real sub-300ms range we advertise — never crosses it.
    loop: { base: 260, keyframes: [260, 185, 250, 210, 295, 230, 260], duration: 13, format: (n) => `<${n}ms` },
  },
  {
    icon: Globe2,
    label: "Countries covered",
    // Drifts upward from the 60+ floor we advertise — never dips under it.
    loop: { base: 60, keyframes: [60, 68, 62, 71, 64, 60], duration: 15, format: (n) => `${n}+` },
  },
  {
    icon: PhoneCall,
    label: "Never misses a call",
    // Not a number that fluctuates — "24/7" gets a live-pulse dot instead
    // of a fake looping figure.
    value: "24/7",
  },
]

function StatCard({ stat, reduced }: { stat: Stat; reduced: boolean }) {
  const [display, setDisplay] = useState(stat.loop ? stat.loop.format(stat.loop.base) : (stat.value ?? ""))

  useEffect(() => {
    if (!stat.loop || reduced) return
    const { base, keyframes, duration, format } = stat.loop
    // Plays through the drift once and stops — the keyframes are authored to
    // end back on `base`, so it settles cleanly rather than drifting forever.
    const controls = animate(base, keyframes, {
      duration,
      ease: "easeInOut",
      onUpdate: (v) => setDisplay(format(Math.round(v))),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const Icon = stat.icon
  return (
    <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-border/50 bg-card/60 px-3.5 py-3.5 backdrop-blur-sm transition-colors hover:border-primary/30 sm:px-4">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-3 h-14 w-14 rounded-full bg-primary/[0.06] blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <dd className="relative flex items-center gap-1.5 font-serif text-xl font-normal tabular-nums leading-none tracking-tight text-primary sm:text-2xl">
        {display}
        {!stat.loop && (
          <span className="relative flex h-1.5 w-1.5 translate-y-[1px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        )}
      </dd>
      <dt className="relative text-[10.5px] leading-tight text-muted-foreground sm:text-xs">{stat.label}</dt>
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const consoleRef = useRef<CallConsoleHandle>(null)

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="relative overflow-hidden">
      {/* Layered background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_55%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-neural opacity-50" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-[440px] w-[440px] rounded-full blur-[130px] [will-change:transform]"
        style={{ background: "var(--primary)", opacity: 0.07 }}
        animate={reduced ? undefined : { x: [0, 60, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 h-[420px] w-[420px] rounded-full blur-[130px] [will-change:transform]"
        style={{ background: "var(--ai-magenta)", opacity: 0.05 }}
        animate={reduced ? undefined : { x: [0, -50, 25, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-8 pt-6 md:px-6 md:pb-10 md:pt-8 lg:grid-cols-12 lg:gap-10">
        {/* LEFT — copy */}
        <div className="lg:col-span-6">
          <motion.div
            {...fade(0.05)}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-1.5 text-[11px] font-medium text-primary backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="uppercase tracking-[0.16em]">AI voice agents · Live now</span>
          </motion.div>

          <motion.h1
            {...fade(0.15)}
            className="mt-5 text-balance font-serif text-[11vw] font-normal leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl xl:text-[3.8rem]"
          >
            Every call.
            <br />
            {/* Brush-stroke highlight with a one-off shimmer sweep */}
            <span className="relative inline-block">
              <motion.span
                aria-hidden
                className="absolute inset-x-[-0.18em] bottom-[0.08em] top-[0.14em] -z-10 origin-left overflow-hidden rounded-[0.28em] bg-primary/15"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: "skewX(-4deg)" }}
              >
                {!reduced && (
                  <motion.span
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    initial={{ x: "-150%" }}
                    animate={{ x: "400%" }}
                    transition={{ duration: 1.1, delay: 1.5, ease: "easeInOut" }}
                  />
                )}
              </motion.span>
              <span className="italic text-primary">Answered.</span>
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.32)}
            className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            9278.ai answers on the first ring, in a voice your callers can&apos;t tell from a person — on the phone
            number and carrier you already have. Press play and hear it for yourself.
          </motion.p>

          <motion.div {...fade(0.42)} className="mt-5 flex flex-row flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="group btn-ai relative h-12 overflow-hidden rounded-full px-6 text-sm text-primary-foreground transition-all sm:px-7 sm:text-base"
            >
              <span className="relative z-10">Build your first agent</span>
              <ArrowRight
                className="relative z-10 ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => consoleRef.current?.toggle()}
              className="group h-12 rounded-full border-primary/25 bg-primary/[0.07] px-6 text-sm text-foreground backdrop-blur-md hover:border-primary/40 hover:bg-primary/[0.12] sm:px-7 sm:text-base"
            >
              <Headphones className="mr-2 h-4 w-4 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
              Hear a real call
            </Button>
          </motion.div>

          {/* Rating strip */}
          <motion.div {...fade(0.48)} className="mt-4 flex items-center gap-2.5">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> from 500+ businesses
            </p>
          </motion.div>

          {/* Proof line */}
          <motion.ul {...fade(0.56)} className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {PROOF.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>

          {/* Stat strip */}
          <motion.dl {...fade(0.64)} className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} reduced={!!reduced} />
            ))}
          </motion.dl>
        </div>

        {/* RIGHT — live call console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <HeroVoiceOrbPanel ref={consoleRef} />
        </motion.div>
      </div>

      {/* Carrier trust strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative border-t border-border/40 bg-background/50 px-4 py-4 md:px-6"
      >
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Connect your carrier account in two clicks
        </p>
      </motion.div>
    </section>
  )
}
