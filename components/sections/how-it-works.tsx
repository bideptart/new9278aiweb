"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Wand2,
  BookOpen,
  Rocket,
  Check,
  FileText,
  Quote,
  PhoneCall,
  ShieldCheck,
  AudioLines,
  ArrowRight,
} from "lucide-react"
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/* ==================================================================
   Each step ships a working miniature of the screen you'd actually
   touch at that stage — the prompt being typed, files indexing, calls
   landing — framed in window chrome so the row reads as a product tour
   rather than three paragraphs with icons on top.

   A shared clock walks the rail pulse from node to node and lights the
   matching card, so the three steps read as one sequence.

   Figures shown are illustrative of the product surface, not published
   performance benchmarks.
   ================================================================== */

const STEP_MS = 3400

/* ---------- shared window chrome ------------------------------------ */

function MockWindow({
  label,
  active,
  children,
}: {
  label: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative flex h-[204px] flex-col overflow-hidden rounded-xl border bg-white text-left transition-all duration-500",
        active ? "border-primary/25" : "border-black/[0.07]",
      )}
    >
      {/* title bar */}
      <div
        className={cn(
          "grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-1.5 border-b px-2.5 py-1.5 transition-colors duration-500",
          active ? "border-primary/12 bg-primary/[0.04]" : "border-black/[0.05] bg-black/[0.015]",
        )}
      >
        <span aria-hidden />
        <span className="flex gap-[3px]">
          <span className={cn("h-[5px] w-[5px] rounded-full transition-colors", active ? "bg-primary" : "bg-primary/60")} />
          <span className="h-[5px] w-[5px] rounded-full bg-primary/35" />
          <span className="h-[5px] w-[5px] rounded-full bg-primary/35" />
        </span>
        <span className="flex items-center justify-end gap-1.5 overflow-hidden">
          <span className="truncate font-mono text-[8px] tracking-wide text-muted-foreground/70">{label}</span>
          {active && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex h-1 w-1 shrink-0 rounded-full bg-primary"
            />
          )}
        </span>
      </div>

      <div className="relative min-h-0 flex-1 p-2.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,color-mix(in_oklch,var(--primary)_7%,transparent),transparent_62%)]"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  )
}

/* ---------- 01 · agent builder -------------------------------------- */

const PROMPT = "You are a warm, concise support agent for Northwind Coffee. Never guess an order status—"

function BuilderMock() {
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  const [voice, setVoice] = useState(0)
  const voices = ["Aria", "Milo", "Nova"]

  useEffect(() => {
    if (reduced) {
      setN(PROMPT.length)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i = i >= PROMPT.length + 26 ? 0 : i + 1
      setN(Math.min(i, PROMPT.length))
    }, 40)
    return () => clearInterval(id)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setVoice((v) => (v + 1) % 3), 2600)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/70">Voice</span>
        <div className="ml-auto flex gap-1">
          {voices.map((v, i) => (
            <span
              key={v}
              className={cn(
                "rounded-full px-2 py-[3px] text-[9px] font-medium transition-all duration-300",
                i === voice
                  ? "bg-primary text-white"
                  : "bg-black/[0.05] text-muted-foreground",
              )}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-black/[0.03] p-2 ring-1 ring-black/[0.05]">
        <p className="text-[9.5px] leading-[1.5] text-foreground/70">
          {PROMPT.slice(0, n)}
          <span className="ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px] animate-pulse bg-primary" />
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-lg bg-primary/[0.06] px-2 py-1.5 ring-1 ring-primary/15">
        <ShieldCheck className="h-3 w-3 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
        <span className="text-[9px] font-medium text-foreground/75">Guardrails</span>
        <span className="ml-auto flex h-3.5 w-6 shrink-0 items-center rounded-full bg-primary px-[2px]">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-white"
            animate={reduced ? undefined : { x: [0, 10, 10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
          />
        </span>
      </div>
    </div>
  )
}

/* ---------- 02 · knowledge indexing --------------------------------- */

const DOCS = [
  { name: "pricing-2026.pdf", size: "1.2 MB" },
  { name: "support-faq.md", size: "84 KB" },
  { name: "product-docs.html", size: "612 KB" },
]

function KnowledgeMock() {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduced) {
      setTick(300)
      return
    }
    const id = setInterval(() => setTick((t) => (t + 1) % 300), 40)
    return () => clearInterval(id)
  }, [reduced])

  const progressFor = (i: number) => Math.max(0, Math.min(1, (tick - i * 55) / 55))

  return (
    <div className="flex h-full flex-col gap-1">
      {DOCS.map((d, i) => {
        const p = progressFor(i)
        const done = p >= 1
        return (
          <div
            key={d.name}
            className={cn(
              "shrink-0 rounded-lg px-2 py-1.5 ring-1 transition-colors duration-300",
              done ? "bg-primary/[0.05] ring-primary/15" : "bg-black/[0.03] ring-black/[0.05]",
            )}
          >
            <div className="flex items-center gap-1.5">
              <FileText
                className={cn("h-2.5 w-2.5 shrink-0 transition-colors", done ? "text-primary" : "text-muted-foreground/55")}
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <span className="truncate text-[9px] font-medium text-foreground/75">{d.name}</span>
              <span className="ml-auto shrink-0">
                {done ? (
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="flex h-3 w-3 items-center justify-center rounded-full bg-primary"
                  >
                    <Check className="h-2 w-2 text-white" strokeWidth={4} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <span className="font-mono text-[8px] tabular-nums text-muted-foreground">
                    {Math.round(p * 100)}%
                  </span>
                )}
              </span>
            </div>
            <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-black/[0.06]">
              <span
                className="block h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
                style={{ width: `${p * 100}%` }}
              />
            </div>
          </div>
        )
      })}

      <div className="mt-auto flex shrink-0 items-start gap-1.5 rounded-lg bg-primary/[0.06] px-2 py-1.5 ring-1 ring-primary/15">
        <Quote className="mt-[1px] h-2.5 w-2.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
        <p className="text-[9px] leading-snug text-foreground/70">
          “Standard shipping is 3–5 days.”
          <span className="ml-1 whitespace-nowrap rounded bg-primary/15 px-1 py-px font-mono text-[7px] font-semibold text-primary">
            support-faq.md
          </span>
        </p>
      </div>
    </div>
  )
}

/* ---------- 03 · live traffic --------------------------------------- */

const FEED = [
  "Inbound · +1 (415) 555-0142",
  "Outbound · follow-up queue",
  "Inbound · +1 (206) 555-0119",
  "Inbound · +44 20 7946 0812",
]

function LaunchMock() {
  const reduced = useReducedMotion()
  const [calls, setCalls] = useState(1284)
  const [feedIdx, setFeedIdx] = useState(0)
  const [spark, setSpark] = useState<number[]>([
    0.4, 0.62, 0.35, 0.78, 0.5, 0.9, 0.6, 0.72, 0.45, 0.83, 0.55, 0.68,
  ])
  const n = useRef(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setCalls((c) => c + 1)
      setFeedIdx((f) => (f + 1) % FEED.length)
      n.current += 1
      const k = n.current
      setSpark((s) => [...s.slice(1), 0.35 + 0.6 * Math.abs(Math.sin(k * 0.9) * Math.cos(k * 0.4))])
    }, 1500)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="flex shrink-0 items-center gap-1.5">
        <PhoneCall className="h-2.5 w-2.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
        <span className="font-mono text-[9px] text-foreground/70">+1 (415) 555-0142</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-[2px] text-[8px] font-bold uppercase tracking-wider text-primary">
          <span className="relative flex h-1 w-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1 w-1 rounded-full bg-primary" />
          </span>
          Live
        </span>
      </div>

      <div className="shrink-0">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/70">Calls handled today</p>
        <p className="mt-0.5 font-mono text-[24px] font-bold leading-none tabular-nums text-primary">
          {calls.toLocaleString()}
        </p>
      </div>

      <div className="flex min-h-0 flex-1 items-end gap-[3px]">
        {spark.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0.35, opacity: 0.4 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 origin-bottom rounded-sm bg-primary/70"
            style={{ height: `${Math.max(14, h * 100)}%` }}
          />
        ))}
      </div>

      <div className="h-[24px] shrink-0 overflow-hidden rounded-lg bg-black/[0.03] ring-1 ring-black/[0.05]">
        <AnimatePresence mode="wait">
          <motion.div
            key={feedIdx}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex h-full items-center gap-1.5 px-2"
          >
            <AudioLines className="h-2.5 w-2.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
            <span className="truncate text-[9px] text-foreground/70">{FEED[feedIdx]}</span>
            <span className="ml-auto shrink-0 font-mono text-[8px] text-primary">connected</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- step card (cursor spotlight) ---------------------------- */

function StepCard({
  step,
  index,
  active,
}: {
  step: (typeof steps)[number]
  index: number
  active: boolean
}) {
  const Icon = step.icon
  const Mock = step.Mock
  const ref = useRef<HTMLDivElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, color-mix(in oklch, var(--primary) 9%, transparent), transparent 70%)`

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <div className="group relative h-full">
      {/* faint radial glow behind the card — only shows on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-primary/[0.12] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* animated gradient border wrapper (speeds up on hover, see .uc-border) */}
      <div className="uc-border h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[calc(1.25rem-1.5px)] bg-white p-6 text-center shadow-[0_2px_16px_rgba(17,17,17,0.05)] transition-shadow duration-300 group-hover:shadow-[0_32px_70px_-24px_color-mix(in_oklch,var(--primary)_38%,transparent)] md:text-left"
        >
          {/* cursor spotlight */}
          <motion.span
            aria-hidden
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* glassmorphism highlight sweep */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-1/2 h-full -translate-y-2 bg-gradient-to-b from-white/60 to-transparent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          />
          {/* faint watermark number */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute -bottom-5 right-2 select-none font-serif text-7xl leading-none transition-colors duration-500",
              active ? "text-primary/[0.12]" : "text-primary/[0.07]",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* header — icon integrated inline instead of a floating circle */}
          <div className="relative mb-4 flex items-center justify-center gap-2.5 md:justify-start">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 ease-out group-hover:rotate-6"
              style={{ background: "#FFF5F5", borderColor: "#FFD6D6" }}
            >
              <Icon className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{step.tag}</p>
          </div>

          <div className="relative mb-4">
            <MockWindow label={step.window} active={active}>
              <Mock />
            </MockWindow>
            {/* soft reflection under the window */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-2 left-1/2 h-3 w-[78%] -translate-x-1/2 rounded-[50%] bg-black/15 blur-md transition-opacity duration-500"
              style={{ opacity: active ? 0.5 : 0.28 }}
            />
          </div>

          <h3 className="relative text-lg font-semibold tracking-tight">{step.title}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </motion.div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Wand2,
    tag: "Step 01",
    window: "agent-builder",
    title: "Design your agent",
    description: "Pick a voice, write the prompt, set guardrails. Describe the agent in plain English and ship it.",
    Mock: BuilderMock,
  },
  {
    icon: BookOpen,
    tag: "Step 02",
    window: "knowledge-index",
    title: "Connect your knowledge",
    description:
      "Point the agent at your knowledge base, FAQs, or product docs. It answers from your source of truth.",
    Mock: KnowledgeMock,
  },
  {
    icon: Rocket,
    tag: "Step 03",
    window: "live-traffic",
    title: "Launch & scale",
    description: "Plug in your phone number, route calls, and go live. Scale from one call to thousands.",
    Mock: LaunchMock,
  },
]

export function HowItWorks() {
  const reduced = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), STEP_MS)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section id="how-it-works" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full blur-[120px] [will-change:transform]"
        style={{ background: "var(--ai-violet)", opacity: 0.04 }}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full blur-[120px] [will-change:transform]"
        style={{ background: "var(--ai-magenta)", opacity: 0.035 }}
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-[1700px] px-6 pb-14 pt-8 md:px-10 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-cyan">
            <span className="h-1 w-1 rounded-full bg-primary" />
            How it works
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            From idea to live agent in <span className="text-primary">three steps.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            No infra to spin up, no models to host. Design, connect, and launch — your first agent is taking calls
            before lunch.
          </p>
        </ScrollReveal>

        <div className="relative mt-16">
          <StaggerGroup className="grid items-stretch gap-8 lg:grid-cols-3 lg:gap-10">
            {steps.map((step, i) => (
              <StaggerItem key={step.title} className="h-full">
                <StepCard step={step} index={i} active={activeStep === i} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* step dots — tiny progress affordance under the row */}
          <ScrollReveal className="mt-8 flex items-center justify-center gap-2" delay={0.2}>
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActiveStep(i)}
                aria-label={`Show ${s.title}`}
                className="flex h-10 items-center px-1.5"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeStep === i ? "w-7 bg-primary" : "w-1.5 bg-black/15 hover:bg-black/25",
                  )}
                />
              </button>
            ))}
          </ScrollReveal>
        </div>

        {/* closing CTA */}
        <ScrollReveal className="mt-12 flex flex-col items-center gap-3 text-center">
          <Link
            href="/get-started"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:gap-3"
          >
            Build your first agent
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <p className="text-xs text-muted-foreground">No infrastructure required · live in an afternoon</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
