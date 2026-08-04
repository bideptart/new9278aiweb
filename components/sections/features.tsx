"use client"

import Link from "next/link"
import {
  PhoneCall,
  Languages,
  Repeat,
  ShieldCheck,
  Webhook,
  CalendarClock,
  Network,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Search,
  Bell,
  ShieldAlert,
  PhoneForwarded,
  FileText,
  Waypoints,
  Headphones,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { FeaturesLivePreview } from "@/components/sections/features-live-preview"

const trustPills = [
  { icon: Zap, label: "Sub-300ms latency" },
  { icon: Languages, label: "60+ languages" },
  { icon: PhoneCall, label: "Carrier-grade telephony" },
  { icon: ShieldCheck, label: "SOC 2-aligned" },
  { icon: Network, label: "Unlimited concurrency" },
]

const floatingIcons = [
  {
    Icon: PhoneCall,
    top: "4%",
    left: "-4%",
    duration: 4.5,
    delay: 0,
    title: "AI Receptionist",
    description: "Greets every caller in real time.",
    tooltip: "bottom",
  },
  {
    Icon: CalendarClock,
    top: "6%",
    left: "104%",
    duration: 5,
    delay: 0.6,
    title: "Appointment Setter",
    description: "Books and confirms on the call.",
    tooltip: "bottom",
  },
  {
    Icon: Headphones,
    top: "102%",
    left: "-2%",
    duration: 4.2,
    delay: 1.1,
    title: "Answering Services",
    description: "Unlimited concurrent coverage.",
    tooltip: "top",
  },
  {
    Icon: PhoneForwarded,
    top: "100%",
    left: "102%",
    duration: 5.4,
    delay: 1.6,
    title: "Call Transfer",
    description: "Warm hand-off with full context.",
    tooltip: "top",
  },
] as const

const features: {
  icon: LucideIcon
  title: string
  description: string
  tag: (typeof featureCategories)[number]
  href: string
  accent: string
}[] = [
  {
    icon: Zap,
    title: "Sub-300ms greeting",
    description: "Callers hear a warm, human greeting before the first ring finishes.",
    tag: "Receptionist",
    href: "/features/ai-voice-receptionist",
    accent: "var(--ai-cyan)",
  },
  {
    icon: Languages,
    title: "60+ languages, auto-detected",
    description: "No menu, no delay — the agent matches the caller's language mid-call.",
    tag: "Receptionist",
    href: "/features/ai-voice-receptionist",
    accent: "var(--ai-cyan)",
  },
  {
    icon: Search,
    title: "Instant FAQ lookup",
    description: "Hours, pricing, and policy questions answered straight from your knowledge base.",
    tag: "Receptionist",
    href: "/features/ai-voice-receptionist",
    accent: "var(--ai-cyan)",
  },
  {
    icon: CalendarClock,
    title: "Two-way calendar sync",
    description: "Google Calendar and Outlook stay in lockstep — no double-books, no stale slots.",
    tag: "Appointment",
    href: "/features/appointment-setter",
    accent: "var(--ai-mint)",
  },
  {
    icon: Repeat,
    title: "Smart slot negotiation",
    description: "When a time's taken, the agent offers the nearest alternative in the same breath.",
    tag: "Appointment",
    href: "/features/appointment-setter",
    accent: "var(--ai-mint)",
  },
  {
    icon: Bell,
    title: "Automated SMS reminders",
    description: "24-hour and 1-hour reminders cut no-shows by 35%, no human required.",
    tag: "Appointment",
    href: "/features/appointment-setter",
    accent: "var(--ai-mint)",
  },
  {
    icon: Network,
    title: "Unlimited concurrency",
    description: "The hundredth caller gets the same instant pickup as the first.",
    tag: "Answering",
    href: "/features/answering-services",
    accent: "var(--ai-violet)",
  },
  {
    icon: ShieldAlert,
    title: "Custom emergency escalation",
    description: "Define what counts as urgent — it escalates to a human in under 15 seconds.",
    tag: "Answering",
    href: "/features/answering-services",
    accent: "var(--ai-violet)",
  },
  {
    icon: Webhook,
    title: "Instant CRM logging",
    description: "Every summary lands in HubSpot, Salesforce, or Zendesk the moment the call ends.",
    tag: "Answering",
    href: "/features/answering-services",
    accent: "var(--ai-violet)",
  },
  {
    icon: PhoneForwarded,
    title: "Warm & cold transfer modes",
    description: "Brief a human live, or hand off with a written summary — your call, every time.",
    tag: "Transfer",
    href: "/features/call-transfer",
    accent: "var(--ai-magenta)",
  },
  {
    icon: FileText,
    title: "Pre-transfer AI summary",
    description: "Caller identity, reason, and sentiment are on screen before the agent says hello.",
    tag: "Transfer",
    href: "/features/call-transfer",
    accent: "var(--ai-magenta)",
  },
  {
    icon: Waypoints,
    title: "3-tier fallback routing",
    description: "Agent A → Agent B → voicemail, queue, or callback — never a dead end.",
    tag: "Transfer",
    href: "/features/call-transfer",
    accent: "var(--ai-magenta)",
  },
]

const featureCategories = ["All", "Receptionist", "Appointment", "Answering", "Transfer"] as const

export function Features() {
  const [activeIcon, setActiveIcon] = useState(0)
  const [activeCategory, setActiveCategory] = useState<(typeof featureCategories)[number]>("All")
  const [isCategoryPaused, setIsCategoryPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Auto-rotation is a desktop-only flourish — on mobile it just fights the user's thumb.
  // The "All" pill is hidden on mobile, so default to "Receptionist" there instead of an empty list.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)")
    if (mql.matches) setActiveCategory((cur) => (cur === "All" ? "Receptionist" : cur))
    setIsMobile(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (isCategoryPaused || isMobile) return
    const interval = setInterval(() => {
      setActiveCategory((cur) => {
        const idx = featureCategories.indexOf(cur)
        return featureCategories[(idx + 1) % featureCategories.length]
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [activeCategory, isCategoryPaused, isMobile])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((cur) => (cur + 1) % floatingIcons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        id="features-hero"
        className="relative flex items-center overflow-hidden border-t border-border/40 py-14 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.10),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-6 lg:self-start lg:-mt-10">
            <span className="ai-pill-magenta">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Features
            </span>
            <h1 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.05] tracking-tight md:text-6xl">
              Four calls. <span className="text-primary">One agent, built in.</span>
            </h1>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground md:text-lg">
              Greet the caller, book the appointment, cover the after-hours overflow, and hand off to a human with
              full context — every dedicated flow ships production-ready, on one platform.
            </p>

            <div className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3">
              <Button
                asChild
                size="lg"
                className="group btn-ai h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-sm transition-all sm:h-12 sm:px-7 sm:text-base"
              >
                <Link href="/get-started">
                  Build your first agent
                  <ArrowRight className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group h-10 shrink-0 whitespace-nowrap rounded-full border-border/70 bg-card/30 px-4 text-sm backdrop-blur-md hover:border-primary/50 hover:bg-card/50 sm:h-12 sm:px-7 sm:text-base"
              >
                <Link href="/contact">
                  <PhoneCall className="mr-1.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:rotate-12 sm:mr-2 sm:h-4 sm:w-4" aria-hidden="true" />
                  Talk to sales
                </Link>
              </Button>
            </div>

            <StaggerGroup className="mt-5 flex flex-wrap gap-2.5">
              {trustPills.map((p) => {
                const Icon = p.icon
                return (
                  <StaggerItem key={p.label}>
                    <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 py-1.5 pl-1.5 pr-3.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-xs font-medium text-muted-foreground">{p.label}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </ScrollReveal>

          {/* Live preview — cycles through the four dedicated feature pages */}
          <ScrollReveal delay={0.1} className="lg:col-span-6">
            <div className="relative mx-auto h-[300px] w-full max-w-[500px] sm:h-[380px]">
              {/* Floating feature icons — one per dedicated feature page, drifting slowly */}
              {floatingIcons.map(({ Icon, top, left, duration, delay, title, description }, i) => (
                <motion.span
                  key={i}
                  className="absolute z-20 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-card text-primary md:flex"
                  style={{ top, left }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />

                  <AnimatePresence>
                    {activeIcon === i && (
                      <motion.div
                        role="tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-32 -translate-x-1/2 rounded-lg border border-border/60 bg-popover/95 p-2 text-left backdrop-blur-md"
                      >
                        <p className="text-[10px] font-semibold text-foreground">{title}</p>
                        <p className="mt-0.5 text-[9px] leading-snug text-muted-foreground">{description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.span>
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <FeaturesLivePreview />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid — feature cards */}
      <section id="features" className="relative overflow-hidden border-t border-border/40">
        <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 md:px-6 md:pb-28 md:pt-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="ai-pill-cyan">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Capabilities
            </span>
            <h2 className="mt-3 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
              Every flow, <span className="text-primary">built in.</span>
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Three capabilities each for the AI Receptionist, Appointment Setter, Answering Services, and Call
              Transfer — tap any card to see it running on its own dedicated page.
            </p>
          </ScrollReveal>

          <div className="mt-6 flex flex-nowrap items-center justify-center gap-1.5 px-4 sm:flex-wrap sm:gap-2.5 sm:px-0">
            {featureCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-xs ${
                  category === "All" ? "hidden sm:inline-flex" : ""
                } ${
                  activeCategory === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div
            onMouseEnter={() => setIsCategoryPaused(true)}
            onMouseLeave={() => setIsCategoryPaused(false)}
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => {
              const Icon = f.icon
              const isMatch = activeCategory === "All" || f.tag === activeCategory

              // Mobile: truly filter the list (no dimmed, still-occupying-space items), no animation.
              // The "All" pill is hidden on mobile, so "All" shows nothing instead of everything —
              // only a picked category (Receptionist/Appointment/Answering/Transfer) renders its list.
              if (isMobile) {
                if (activeCategory === "All" || !isMatch) return null
                return (
                  <Link key={f.title} href={f.href} className="group flex w-full flex-row items-start gap-3">
                    <Icon className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: f.accent }} aria-hidden="true" />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <p className="text-sm font-medium tracking-tight group-hover:text-primary">{f.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Link>
                )
              }

              // Desktop: original behaviour — every card stays in the grid, non-matching ones just dim.
              return (
                <motion.div
                  key={f.title}
                  animate={{ opacity: isMatch ? 1 : 0.25 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={f.href} className="group flex w-full flex-row items-start gap-3">
                    <Icon className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: f.accent }} aria-hidden="true" />
                    <div className="flex flex-1 flex-col gap-0.5">
                      <p className="text-sm font-medium tracking-tight group-hover:text-primary">{f.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
