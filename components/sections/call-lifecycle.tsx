"use client"

import { useEffect, useState } from "react"
import { Headset, TrendingUp, Languages, CalendarClock, PhoneIncoming, Search, Check } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

/* ==================================================================
   Four-card capability grid: inbound, outbound, multilingual, and
   scheduling — each card carries a tiny working mockup so the claim
   reads as a product screenshot, not a marketing adjective.
   ================================================================== */

function FrontDeskMock() {
  const reduced = useReducedMotion()
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f8] p-3">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="flex flex-col items-center">
          <span className="font-mono text-[13px] font-normal leading-none text-primary">24/7</span>
          <span className="mt-0.5 text-[6.5px] font-normal uppercase tracking-[0.14em] text-muted-foreground">
            Always on
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 rounded-full bg-white px-2 py-1 ring-1 ring-black/[0.06]">
        <PhoneIncoming className="h-2.5 w-2.5 text-primary" strokeWidth={2.5} aria-hidden="true" />
        <span className="font-mono text-[8px] text-foreground/70">14:08</span>
        <span className="h-1 w-1 rounded-full bg-primary" />
        <span className="text-[8px] font-medium text-primary">answered</span>
      </div>
    </div>
  )
}

function GrowthMock() {
  const reduced = useReducedMotion()
  const [calls, setCalls] = useState(4137)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setCalls((c) => c + 1), 1800)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-[#f7f7f8] p-2.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/70">Calls placed</p>
          <p className="font-mono text-[15px] font-normal leading-none text-primary">{calls.toLocaleString()}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-[3px] text-[7px] font-normal uppercase tracking-wider text-primary">
          Outbound
        </span>
      </div>
      <svg viewBox="0 0 100 34" className="mt-2 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,28 L14,24 L28,26 L42,16 L56,19 L70,9 L84,12 L100,3 L100,34 L0,34 Z" fill="url(#growthFill)" />
        <path
          d="M0,28 L14,24 L28,26 L42,16 L56,19 L70,9 L84,12 L100,3"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-1 flex items-center justify-between text-[7px] text-muted-foreground/70">
        <span>Speed-to-lead</span>
        <span className="font-medium text-primary">Dialling…</span>
      </div>
    </div>
  )
}

const LANGS = ["EN", "ES", "FR", "HI", "RU"]

function MultilingualMock() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % LANGS.length), 1600)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#f7f7f8] p-3">
      <motion.span
        key={active}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 20 }}
        className="flex h-11 w-11 items-center justify-center rounded-full text-white"
        style={{
          backgroundImage: "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 60%, white), var(--primary))",
        }}
      >
        <Languages className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
      </motion.span>
      <div className="text-center leading-tight">
        <p className="font-serif text-[13px] font-normal text-foreground">Hello</p>
        <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Detected · English
        </p>
      </div>
      <div className="flex gap-1">
        {LANGS.map((l, i) => (
          <span
            key={l}
            className={cn(
              "rounded-md px-1.5 py-[3px] text-[7px] font-normal transition-colors duration-300",
              i === active ? "bg-primary text-white" : "bg-black/[0.05] text-muted-foreground",
            )}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

const AGENDA = [
  { time: "09:00", label: "Team standup", state: "done" },
  { time: "10:30", label: "Sarah M. · Consultation", state: "booked" },
  { time: "13:00", label: "Site visit · Elm St", state: "open" },
]

function CalendarMock() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-[#f7f7f8] p-2.5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/70">Friday agenda</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-[3px] text-[7px] font-normal uppercase tracking-wider text-primary">
          <Search className="h-2 w-2" strokeWidth={2.5} aria-hidden="true" />
          Searching
        </span>
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-1.5">
        {AGENDA.map((a) => (
          <div key={a.time} className="flex items-center gap-1.5 rounded-lg bg-white px-1.5 py-1 ring-1 ring-black/[0.05]">
            <span className="font-mono text-[7px] text-muted-foreground/70">{a.time}</span>
            <span className="min-w-0 flex-1 truncate text-[7.5px] font-medium text-foreground/80">{a.label}</span>
            {a.state === "done" && <Check className="h-2 w-2 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />}
            {a.state === "booked" && (
              <span className="shrink-0 rounded-full bg-primary px-1.5 py-[1px] text-[6px] font-normal uppercase text-white">
                Booked
              </span>
            )}
            {a.state === "open" && (
              <span className="shrink-0 rounded-full bg-black/[0.06] px-1.5 py-[1px] text-[6px] font-normal uppercase text-muted-foreground">
                Open
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-1.5 flex items-center gap-1 text-[6.5px] text-muted-foreground/70">
        <span className="h-1 w-1 rounded-full bg-primary" />
        Calendar + CRM synced
      </p>
    </div>
  )
}

const capabilities = [
  {
    icon: Headset,
    tag: "Inbound",
    title: "24/7 virtual front desk",
    description: "Greets every caller, answers from your knowledge base, escalates only when needed.",
    Mock: FrontDeskMock,
  },
  {
    icon: TrendingUp,
    tag: "Outbound",
    title: "Proactive growth",
    description: "Lead generation, lead revival, and instant speed-to-lead callbacks — one dashboard.",
    Mock: GrowthMock,
  },
  {
    icon: Languages,
    tag: "Global",
    title: "Multilingual fluency",
    description: "Detects the caller's language and switches mid-conversation. No extra setup.",
    Mock: MultilingualMock,
  },
  {
    icon: CalendarClock,
    tag: "Scheduling",
    title: "Books your calendar",
    description: "Checks real availability, offers open slots, writes the booking straight back.",
    Mock: CalendarMock,
  },
]

export function CallLifecycle() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_75%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="ai-pill-magenta">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Inbound &amp; outbound
          </span>
          <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
            Inbound, outbound, and multilingual <span className="text-primary">— covered.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From the first hello to the follow-up that closes the deal — 9278.ai handles the entire call lifecycle.
          </p>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => {
            const Icon = c.icon
            const Mock = c.Mock
            return (
              <StaggerItem key={c.title}>
                <div className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-black/[0.05] px-2 py-[3px] text-[9px] font-normal uppercase tracking-wider text-muted-foreground">
                      {c.tag}
                    </span>
                  </div>

                  <div className="mt-3.5 h-[126px] shrink-0">
                    <Mock />
                  </div>

                  <div className="relative mt-4">
                    <span className="pointer-events-none absolute -left-0.5 -top-1 font-mono text-[10px] font-normal text-primary/50">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="pl-6 text-[15px] font-normal tracking-tight">{c.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
