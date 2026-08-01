"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Headset, TrendingUp, Languages, CalendarCheck, PhoneIncoming, PhoneOutgoing, Globe2, Check } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/* ==================================================================
   Four use cases in one row, each an interactive 3D card:

   - the whole card tilts toward the cursor in real perspective (a
     single, shallow tilt — early drafts stacked per-layer translateZ
     on top of the rotation and that combination blurred text,
     especially the Devanagari glyph in the multilingual card)
   - a conic-gradient border runs slowly around each card and spins up
     with a glow on hover (.uc-border in globals.css)
   - a spotlight follows the cursor across the card face
   - a diagonal shine sweeps across on hover

   Every card still carries its own live scene — dial, chart, globe,
   booking grid.
   ================================================================== */

/* ---------- 3D tilt wrapper ----------------------------------------- */

function TiltCard({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const cfg = { stiffness: 200, damping: 22, mass: 0.5 }
  const sx = useSpring(nx, cfg)
  const sy = useSpring(ny, cfg)
  // Kept shallow on purpose: text on a 3D-rotated plane is a known
  // source of sub-pixel blur in Chromium. 6° reads as "tilting toward
  // you" without ever softening the copy.
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, color-mix(in oklch, var(--primary) 11%, transparent), transparent 72%)`

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mx.set(x)
    my.set(y)
    nx.set(x / r.width - 0.5)
    ny.set(y / r.height - 0.5)
  }

  function onLeave() {
    nx.set(0)
    ny.set(0)
  }

  return (
    <div style={{ perspective: "1600px" }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={reduced ? undefined : { y: -10, scale: 1.015 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="uc-border group h-full [will-change:transform]"
      >
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.25rem-1.5px)] bg-white p-4"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          {/* cursor spotlight */}
          <motion.span
            aria-hidden
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* diagonal shine sweep on hover */}
          <span aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <span className="uc-shine absolute -inset-y-1/2 left-[-60%] w-1/3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <div className="relative flex h-full flex-col">{children}</div>
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- 01 · the 24-hour dial ----------------------------------- */

/** Hours at which a call lands — spread right around the clock, including
    the ones a human front desk would have slept through. */
const CALL_HOURS = [2, 5, 8, 11, 14, 17, 20, 23]

function FrontDeskScene() {
  const reduced = useReducedMotion()
  const [beat, setBeat] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setBeat((b) => (b + 1) % CALL_HOURS.length), 900)
    return () => clearInterval(id)
  }, [reduced])

  const R = 42
  const C = 56

  return (
    <div className="relative flex h-[136px] items-center justify-center">
      <svg viewBox="0 0 112 112" className="h-[112px] w-[112px]" aria-hidden="true">
        {/* hour ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2
          const major = i % 6 === 0
          const r1 = R - (major ? 7 : 4)
          return (
            <line
              key={i}
              x1={C + Math.cos(a) * r1}
              y1={C + Math.sin(a) * r1}
              x2={C + Math.cos(a) * R}
              y2={C + Math.sin(a) * R}
              stroke="currentColor"
              className={major ? "text-primary/35" : "text-foreground/12"}
              strokeWidth={major ? 1.6 : 1}
              strokeLinecap="round"
            />
          )
        })}

        {/* ring */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" className="text-black/[0.07]" strokeWidth="1" />

        {/* answered-call markers */}
        {CALL_HOURS.map((h, i) => {
          const a = (h / 24) * Math.PI * 2 - Math.PI / 2
          const on = i <= beat
          return (
            <circle
              key={h}
              cx={C + Math.cos(a) * R}
              cy={C + Math.sin(a) * R}
              r={on ? 3.2 : 2}
              fill="var(--primary)"
              opacity={on ? 1 : 0.22}
              style={{ transition: "r 0.4s ease, opacity 0.4s ease" }}
            />
          )
        })}

        {/* sweeping hand */}
        {!reduced && (
          <g style={{ transformOrigin: `${C}px ${C}px` }}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${C} ${C}`}
              to={`360 ${C} ${C}`}
              dur="7.2s"
              repeatCount="indefinite"
            />
            <line
              x1={C}
              y1={C}
              x2={C}
              y2={C - R + 3}
              stroke="var(--primary)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx={C} cy={C - R + 3} r="2.6" fill="var(--primary)" />
          </g>
        )}
      </svg>

      {/* centre readout */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-bold leading-none text-primary">24/7</span>
        <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">always on</span>
      </div>

      {/* the moment a call lands */}
      <AnimatePresence>
        <motion.span
          key={beat}
          initial={{ opacity: 0, y: 6, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 ring-1 ring-primary/15"
        >
          <PhoneIncoming className="h-2.5 w-2.5 text-primary" strokeWidth={2.75} aria-hidden="true" />
          <span className="font-mono text-[9px] tabular-nums text-primary">
            {String(CALL_HOURS[beat]).padStart(2, "0")}:00 · answered
          </span>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ---------- 02 · the outbound climb --------------------------------- */

const CAMPAIGNS = ["Lead revival", "Speed-to-lead", "Renewal outreach", "Win-back list"]

function GrowthScene() {
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [dialled, setDialled] = useState(3480)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % CAMPAIGNS.length)
      setDialled((d) => d + Math.floor(3 + Math.random() * 9))
    }, 1600)
    return () => clearInterval(id)
  }, [reduced])

  const series = [18, 26, 22, 38, 34, 48, 44, 62, 58, 76, 72, 92]
  const w = 160
  const h = 62
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - (v / 100) * h] as const)
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ")
  const area = `0,${h} ${line} ${w},${h}`

  return (
    <div className="relative flex h-[136px] flex-col justify-center gap-2">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">Calls placed</p>
          <p className="mt-0.5 font-mono text-xl font-bold leading-none tabular-nums text-primary">
            {dialled.toLocaleString()}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 ring-1 ring-primary/15">
          <PhoneOutgoing className="h-2.5 w-2.5 text-primary" strokeWidth={2.75} aria-hidden="true" />
          <span className="font-mono text-[8.5px] font-semibold uppercase tracking-wider text-primary">outbound</span>
        </span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="h-[62px] w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#growthFill)" />
        <polyline
          className="draw-line"
          points={line}
          pathLength={1}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {!reduced && (
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill="var(--primary)">
            <animate attributeName="r" values="3;5;3" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.55;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* the campaign currently dialling */}
      <div className="h-[26px] overflow-hidden rounded-lg bg-black/[0.03] ring-1 ring-black/[0.05]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ y: 13, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -13, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex h-full items-center gap-1.5 px-2.5"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span className="truncate text-[9.5px] text-foreground/70">{CAMPAIGNS[idx]}</span>
            <span className="ml-auto shrink-0 font-mono text-[8px] uppercase tracking-wide text-primary">dialling</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- 03 · the language handover ------------------------------ */

const LANGS = [
  { code: "EN", hello: "Hello", name: "English" },
  { code: "ES", hello: "Hola", name: "Español" },
  { code: "FR", hello: "Bonjour", name: "Français" },
  { code: "HI", hello: "नमस्ते", name: "हिन्दी" },
  { code: "RU", hello: "Привет", name: "Русский" },
]

function MultilingualScene() {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % LANGS.length), 1700)
    return () => clearInterval(id)
  }, [reduced])

  const active = LANGS[i]

  return (
    <div className="relative flex h-[136px] flex-col items-center justify-center gap-3">
      {/* orbiting globe */}
      <div className="relative flex h-[62px] w-[62px] items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          animate={reduced ? undefined : { scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-1 rounded-full border border-dashed border-primary/30"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <span
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-white ring-2 ring-white"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 28%, color-mix(in oklch, var(--primary) 62%, white), var(--primary))",
          }}
        >
          <Globe2 className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
        </span>
      </div>

      {/* the greeting, swapping mid-conversation */}
      <div className="flex h-[42px] flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.code}
            initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-lg font-semibold leading-none tracking-tight text-primary">{active.hello}</span>
            <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
              detected · {active.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* language rail */}
      <div className="flex items-center gap-1.5">
        {LANGS.map((l, li) => (
          <span
            key={l.code}
            className={cn(
              "rounded-md px-1.5 py-[3px] font-mono text-[8.5px] font-bold transition-all duration-300",
              li === i
                ? "bg-primary text-white"
                : "bg-black/[0.05] text-muted-foreground/70",
            )}
          >
            {l.code}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- 04 · the booking grid ----------------------------------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const SLOTS = ["09:00", "11:30", "14:00"]
/** Which cells are already taken before the agent books anything. */
const TAKEN = new Set(["0-1", "1-0", "2-2", "3-1", "4-0", "1-2"])
/** The cells the agent books, in order, on loop. */
const BOOKINGS = ["2-0", "0-2", "3-2", "4-1"]

function BookingScene() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(reduced ? BOOKINGS.length : 0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setStep((s) => (s >= BOOKINGS.length ? 0 : s + 1)), 1300)
    return () => clearInterval(id)
  }, [reduced])

  const justBooked = step > 0 ? BOOKINGS[step - 1] : null
  const [bd, bs] = justBooked ? justBooked.split("-").map(Number) : [0, 0]

  return (
    <div className="relative flex h-[136px] flex-col justify-center gap-2">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">This week</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 ring-1 ring-primary/15">
          <CalendarCheck className="h-2.5 w-2.5 text-primary" strokeWidth={2.75} aria-hidden="true" />
          <span className="font-mono text-[8.5px] font-semibold uppercase tracking-wider text-primary">
            {step} booked
          </span>
        </span>
      </div>

      {/* day columns × time rows */}
      <div className="flex gap-1.5">
        {DAYS.map((d, di) => (
          <div key={d} className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-center text-[7.5px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {d}
            </span>
            {SLOTS.map((_, si) => {
              const id = `${di}-${si}`
              const taken = TAKEN.has(id)
              const bookedIdx = BOOKINGS.indexOf(id)
              const booked = bookedIdx > -1 && bookedIdx < step
              const isNew = id === justBooked
              return (
                <motion.span
                  key={id}
                  animate={isNew ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={cn(
                    "flex h-4 items-center justify-center rounded-[4px] transition-colors duration-500",
                    booked
                      ? "bg-primary"
                      : taken
                        ? "bg-foreground/15"
                        : "bg-black/[0.045] ring-1 ring-black/[0.04]",
                  )}
                >
                  {booked && <Check className="h-2 w-2 text-white" strokeWidth={4} aria-hidden="true" />}
                </motion.span>
              )
            })}
          </div>
        ))}
      </div>

      {/* confirmation line */}
      <div className="h-[24px] overflow-hidden rounded-lg bg-black/[0.03] ring-1 ring-black/[0.05]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="flex h-full items-center gap-1.5 px-2.5"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span className="truncate text-[9.5px] text-foreground/70">
              {justBooked ? `${DAYS[bd]} · ${SLOTS[bs]} confirmed` : "Checking availability…"}
            </span>
            <span className="ml-auto shrink-0 font-mono text-[8px] uppercase tracking-wide text-primary">
              {justBooked ? "synced" : "live"}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const items = [
  {
    icon: Headset,
    tag: "Inbound",
    title: "24/7 virtual front desk",
    description: "Greets every caller, answers from your knowledge base, escalates only when needed.",
    Scene: FrontDeskScene,
  },
  {
    icon: TrendingUp,
    tag: "Outbound",
    title: "Proactive growth",
    description: "Lead generation, lead revival, and instant speed-to-lead callbacks — one dashboard.",
    Scene: GrowthScene,
  },
  {
    icon: Languages,
    tag: "Global",
    title: "Multilingual fluency",
    description: "Detects the caller's language and switches mid-conversation. No extra setup.",
    Scene: MultilingualScene,
  },
  {
    icon: CalendarCheck,
    tag: "Scheduling",
    title: "Books your calendar",
    description: "Checks real availability, offers open slots, writes the booking straight back.",
    Scene: BookingScene,
  },
]

export function UseCases() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-border/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/[0.045] blur-[110px]"
        animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-cyan">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Inbound & outbound
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Inbound, outbound, and multilingual <span className="text-primary">— covered.</span>
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            From the first hello to the follow-up that closes the deal — 9278.ai handles the entire call lifecycle.
          </p>
        </ScrollReveal>

        {/* one row of four 3D cards (stacks 1 → 2 → 4 as space allows) */}
        <StaggerGroup className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon
            const Scene = item.Scene
            return (
              <StaggerItem key={item.title} className="h-full">
                <TiltCard>
                  {/* header */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-border/60 bg-white/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>

                  {/* live scene */}
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-black/[0.06] bg-white px-3 py-1.5 transition-colors duration-500 group-hover:border-primary/25">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_62%)]"
                    />
                    <div className="relative">
                      <Scene />
                    </div>
                  </div>

                  {/* copy */}
                  <div className="mt-auto pt-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">/ 0{i + 1}</p>
                    <h3 className="mt-1.5 text-pretty text-[15px] font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-[11.5px] leading-snug text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
