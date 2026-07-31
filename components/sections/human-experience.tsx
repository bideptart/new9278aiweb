"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Zap, Split, Waves, Mic, PhoneOff, Grid2x2, Signal, Wifi, BatteryFull, ShieldCheck } from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/* ==================================================================
   Product mockup stage
   ------------------------------------------------------------------
   A 3D phone showing a live 9278.ai call, floating on a light stage
   with glass stat cards orbiting it. The whole scene parallaxes
   toward the cursor.

   Millisecond figures shown sit inside 9278.ai's own published
   sub-300ms first-word range. No numbers are put on any competing
   stack — we have no source for those.
   ================================================================== */

const WAVE_BARS = 34

/* ---------- live waveform inside the phone -------------------------- */

function PhoneWave() {
  const reduced = useReducedMotion()
  const [bars, setBars] = useState<number[]>(() => new Array(WAVE_BARS).fill(0.12))
  const n = useRef(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      n.current += 1
      const k = n.current
      const wob = 0.5 + 0.5 * Math.sin(k * 0.83) * Math.sin(k * 0.27)
      setBars((prev) => [...prev.slice(1), 0.22 + wob * 0.72])
    }, 70)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="flex h-12 items-center justify-center gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] flex-none rounded-full bg-primary transition-[height] duration-150 ease-out"
          style={{ height: `${Math.max(8, h * 100)}%`, opacity: 0.35 + (i / WAVE_BARS) * 0.65 }}
        />
      ))}
    </div>
  )
}

/* ---------- the phone ---------------------------------------------- */

function PhoneMockup() {
  const reduced = useReducedMotion()
  const [secs, setSecs] = useState(23)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setSecs((s) => (s + 1) % 3600), 1000)
    return () => clearInterval(id)
  }, [reduced])

  const mm = String(Math.floor(secs / 60)).padStart(2, "0")
  const ss = String(secs % 60).padStart(2, "0")

  return (
    <div
      className="relative h-[520px] w-[262px] rounded-[42px] p-[9px]"
      style={{
        backgroundImage: "linear-gradient(160deg, #f7f7f8, #dcdcdf 45%, #f4f4f5)",
        boxShadow:
          "0 60px 90px -40px rgba(0,0,0,0.38), 0 8px 20px -8px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.9)",
      }}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[112px] h-11 w-[3px] rounded-l bg-black/15" />
      <span aria-hidden className="absolute -left-[3px] top-[170px] h-11 w-[3px] rounded-l bg-black/15" />
      <span aria-hidden className="absolute -right-[3px] top-[140px] h-16 w-[3px] rounded-r bg-black/15" />

      {/* screen */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,color-mix(in_oklch,var(--primary)_11%,transparent),transparent_62%)]"
        />

        {/* status bar */}
        <div className="relative flex items-center justify-between px-5 pb-1 pt-3">
          <span className="font-mono text-[10px] font-semibold tabular-nums text-foreground/70">9:41</span>
          <span className="flex items-center gap-1 text-foreground/45">
            <Signal className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
            <Wifi className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
            <BatteryFull className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>

        {/* notch */}
        <span
          aria-hidden
          className="absolute left-1/2 top-2 h-5 w-[86px] -translate-x-1/2 rounded-full bg-[#1b1b1e]"
        />

        {/* call header */}
        <div className="relative mt-5 px-5 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            On call
          </span>
          <p className="mt-3 text-[17px] font-semibold tracking-tight text-foreground">Aria · 9278.ai</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            +1 (415) 555-0142 · {mm}:{ss}
          </p>
        </div>

        {/* orb */}
        <div className="relative mt-6 flex justify-center">
          <div className="relative h-[122px] w-[122px]">
            <motion.span
              className="absolute inset-0 rounded-full bg-primary/25 blur-2xl"
              animate={reduced ? undefined : { scale: [1, 1.16, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-3 rounded-full border border-primary/35"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={reduced ? undefined : { scale: [0.6, 1.35], opacity: [0.65, 0] }}
                transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: i * 0.93 }}
              />
            ))}
            <motion.span
              className="absolute inset-4 rounded-full border border-dashed border-primary/25"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-[27%] rounded-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 72%, white), var(--primary) 62%)",
                boxShadow: "0 12px 30px -8px color-mix(in oklch, var(--primary) 65%, transparent)",
              }}
              animate={reduced ? undefined : { scale: [1, 1.07, 1] }}
              transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-5 items-center gap-[3px]">
                {[0.5, 0.9, 1, 0.7, 0.85].map((peak, i) => (
                  <motion.span
                    key={i}
                    className="block w-[2.5px] rounded-full bg-white"
                    style={{ height: "100%", transformOrigin: "center" }}
                    animate={reduced ? { scaleY: 0.4 } : { scaleY: [0.25, peak, 0.35, peak * 0.8, 0.25] }}
                    transition={{
                      duration: 1.1 + i * 0.08,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* live waveform */}
        <div className="relative mt-5 px-5">
          <PhoneWave />
        </div>

        {/* latency readout */}
        <div className="relative mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1.5 ring-1 ring-primary/15">
            <Zap className="h-3 w-3 text-primary" strokeWidth={2.75} aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary">142ms</span>
            <span className="text-[10px] text-muted-foreground">to first word</span>
          </span>
        </div>

        {/* call controls */}
        <div className="relative mt-auto flex items-center justify-center gap-4 pb-7">
          {[
            { Icon: Mic, tone: "soft" },
            { Icon: PhoneOff, tone: "end" },
            { Icon: Grid2x2, tone: "soft" },
          ].map(({ Icon, tone }, i) => (
            <span
              key={i}
              className={cn(
                "flex items-center justify-center rounded-full",
                tone === "end" ? "h-12 w-12 bg-primary" : "h-10 w-10 bg-black/[0.05]",
              )}
              style={
                tone === "end"
                  ? { boxShadow: "0 10px 22px -8px color-mix(in oklch, var(--primary) 70%, transparent)" }
                  : undefined
              }
            >
              <Icon
                className={cn(tone === "end" ? "h-5 w-5 text-white" : "h-4 w-4 text-foreground/55")}
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>

        {/* home indicator */}
        <span aria-hidden className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-black/15" />
      </div>
    </div>
  )
}

/* ---------- floating glass cards ----------------------------------- */

function FloatCard({
  className,
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
      className={cn(
        "absolute rounded-2xl border border-black/[0.06] bg-white/85 px-3.5 py-2.5 backdrop-blur-xl",
        className,
      )}
      style={{
        transform: `translateZ(${depth}px)`,
        boxShadow: "0 24px 45px -22px rgba(0,0,0,0.28), 0 2px 6px -2px rgba(0,0,0,0.06)",
      }}
      animate={reduced ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- the stage (cursor parallax) ---------------------------- */

function MockupStage() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const cfg = { stiffness: 120, damping: 20, mass: 0.5 }
  const sx = useSpring(nx, cfg)
  const sy = useSpring(ny, cfg)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-13, 13])
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || reduced) return
    const r = el.getBoundingClientRect()
    nx.set((e.clientX - r.left) / r.width - 0.5)
    ny.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        nx.set(0)
        ny.set(0)
      }}
      className="relative mx-auto flex min-h-[560px] w-full max-w-[520px] items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      {/* stage glow + ground shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.09] blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-14 left-1/2 h-8 w-[220px] -translate-x-1/2 rounded-[50%] bg-black/25 blur-2xl"
      />

      <motion.div
        className="relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div style={{ transform: "translateZ(0px)" }}>
          <PhoneMockup />
        </div>

        {/* ── floating cards ───────────────────────────────────── */}

        {/* latency + sparkline */}
        <FloatCard className="-left-[112px] top-[46px] hidden w-[168px] sm:block" delay={0} depth={70}>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-3 w-3 text-primary" strokeWidth={2.75} aria-hidden="true" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">First word</span>
          </div>
          <p className="mt-1.5 font-mono text-2xl font-bold leading-none tabular-nums text-primary">
            280<span className="ml-0.5 text-xs font-medium text-primary/60">ms</span>
          </p>
          <div className="mt-2 flex h-7 items-end gap-[3px]">
            {[168, 151, 194, 133, 176, 145, 142, 126, 189, 158].map((v, i) => (
              <motion.span
                key={i}
                className="flex-1 origin-bottom rounded-sm bg-primary/70"
                style={{ height: `${(v / 300) * 100}%` }}
                animate={reduced ? undefined : { scaleY: [0.75, 1, 0.75] }}
                transition={{
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
              />
            ))}
          </div>
        </FloatCard>

        {/* barge-in */}
        <FloatCard className="-right-[118px] top-[196px] hidden w-[182px] sm:block" delay={1.1} depth={95}>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
              <Split className="h-3 w-3 text-primary" strokeWidth={2.75} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold tracking-tight">Barge-in detected</span>
          </div>
          <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
            Caller talked over the agent — it yielded the floor instantly.
          </p>
          <div className="mt-2 flex items-center gap-[2px]">
            {[0.35, 0.7, 1, 0.55, 0.85, 0.4, 0.15, 0.12, 0.14, 0.12].map((h, i) => (
              <span
                key={i}
                className={cn("h-6 w-[3px] shrink-0 self-center rounded-full", i < 6 ? "bg-primary" : "bg-black/15")}
                style={{ height: `${Math.max(3, h * 24)}px` }}
              />
            ))}
            <span className="ml-1.5 font-mono text-[8px] uppercase text-muted-foreground">stopped</span>
          </div>
        </FloatCard>

        {/* one hop */}
        <FloatCard className="-left-[96px] bottom-[74px] hidden w-[156px] sm:block" delay={2.2} depth={55}>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
              <Waves className="h-3 w-3 text-primary" strokeWidth={2.75} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold tracking-tight">One hop</span>
          </div>
          <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
            Audio in, audio out. No speech-to-text relay in the middle.
          </p>
        </FloatCard>

        {/* trust chip */}
        <FloatCard className="-right-[78px] top-[92px] hidden sm:block" delay={3.1} depth={35}>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-tight">0 dead air</span>
          </span>
        </FloatCard>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const facts = [
  {
    icon: Waves,
    title: "Zero-lag conversations",
    description:
      "Native audio-to-audio modeling delivers natural warmth and real-time fluidity. No robotic dead air while a transcription pipeline catches up — every response streams back in under 300ms.",
  },
  {
    icon: Split,
    title: "Smart interruptions",
    description:
      "Customers can talk over the agent at any moment. It stops, listens, and responds the way a real human would. Barge-in detection kicks in instantly — no talking over, no dead air.",
  },
]

export function HumanExperience() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[110px] [will-change:transform]"
        animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── left: the 3D product mockup ─────────────────────── */}
          <ScrollReveal className="order-1">
            <MockupStage />
          </ScrollReveal>

          {/* ── right: the copy ──────────────────────────────────── */}
          <div className="order-2">
            <ScrollReveal>
              <span className="ai-pill-cyan">
                <span className="h-1 w-1 rounded-full bg-primary" />
                The human-kind experience
              </span>
              <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
                Conversations indistinguishable from <span className="text-primary">your best agent.</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                9278.ai skips the brittle speech-to-text and text-to-speech relay and runs on a single audio-native
                engine — so your callers hear pauses, emotion, and timing that feel right.
              </p>
            </ScrollReveal>

            <div className="mt-9 flex flex-col gap-7">
              {facts.map((f, i) => {
                const Icon = f.icon
                return (
                  <ScrollReveal key={f.title} delay={0.1 + i * 0.1}>
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                        <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                          0{i + 1}
                        </span>
                        <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{f.title}</h3>
                        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
