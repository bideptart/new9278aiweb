"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Globe2,
  PhoneForwarded,
  ShieldCheck,
  PhoneIncoming,
  PhoneOutgoing,
  Check,
  Wifi,
  Gauge,
  ChevronDown,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { cn } from "@/lib/utils"

// Below lg, hover and the 3s auto-cycle don't make sense (no cursor, no
// desktop mockup panel) — the mobile accordion is tap-only instead.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

/* ==================================================================
   Full redesign — the old clay/podium illustrations (orbiting tiles,
   dashed leader lines, flattened 3D slabs) are gone. Each mockup now
   sits inside the same plain "window chrome" used elsewhere on the
   site (agent-builder, knowledge-index, etc.) so this section reads
   as a real product screen instead of a decorative graphic.
   ================================================================== */

function MockWindow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-1.5 border-b border-black/[0.05] bg-black/[0.015] px-3 py-2">
        <span className="flex gap-[3px]">
          <span className="h-[6px] w-[6px] rounded-full bg-primary/60" />
          <span className="h-[6px] w-[6px] rounded-full bg-primary/35" />
          <span className="h-[6px] w-[6px] rounded-full bg-primary/35" />
        </span>
        <span aria-hidden />
        <span className="flex justify-end">
          <span className="truncate font-mono text-[9px] tracking-wide text-muted-foreground/70">{label}</span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1 p-4 sm:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,color-mix(in_oklch,var(--primary)_6%,transparent),transparent_62%)]"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  )
}

/* ---------- 01 · bring your own number ------------------------------ */

function CarrierNumberMockup() {
  const reduced = useReducedMotion()
  const checks = ["No porting required", "Instant activation", "Keep your billing"]

  return (
    <MockWindow label="carrier-connect">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-2.5 rounded-xl bg-black/[0.03] px-3 py-2.5 ring-1 ring-black/[0.05]">
          <PhoneForwarded className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" />
          <span className="font-mono text-[13px] font-medium text-foreground/80">+1 (415) 555-0142</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-[3px] text-[10px] font-bold uppercase tracking-wider text-primary">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            Connected
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2.5">
          {checks.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-[13px] text-foreground/75">{c}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-black/[0.06] pt-3 text-[10.5px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3 text-primary" strokeWidth={2.25} aria-hidden="true" />
          Works with the carrier you already use — nothing to migrate.
        </div>
      </div>
    </MockWindow>
  )
}

/* ---------- 02 · inbound and outbound -------------------------------- */

function InboundOutboundMockup() {
  const reduced = useReducedMotion()
  const [inbound, setInbound] = useState(842)
  const [outbound, setOutbound] = useState(316)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setInbound((v) => v + 1)
      if (Math.random() > 0.5) setOutbound((v) => v + 1)
    }, 1400)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <MockWindow label="call-routing">
      <div className="flex h-full flex-col justify-center gap-3">
        <div className="flex items-center gap-3 rounded-xl bg-black/[0.03] p-3 ring-1 ring-black/[0.05]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <PhoneIncoming className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-foreground/85">Inbound</p>
            <p className="text-[10.5px] text-muted-foreground">Answered automatically, 24/7</p>
          </div>
          <span className="shrink-0 font-mono text-lg font-bold tabular-nums text-primary">{inbound}</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-black/[0.03] p-3 ring-1 ring-black/[0.05]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <PhoneOutgoing className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-foreground/85">Outbound</p>
            <p className="text-[10.5px] text-muted-foreground">Campaigns and follow-ups</p>
          </div>
          <span className="shrink-0 font-mono text-lg font-bold tabular-nums text-primary">{outbound}</span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-primary" />
          One agent, one number, both directions
        </div>
      </div>
    </MockWindow>
  )
}

/* ---------- 03 · carrier-grade voice --------------------------------- */

const REGIONS = ["US", "UK", "IN", "AU", "DE", "BR", "AE", "SG"]

function CarrierGradeVoiceMockup() {
  return (
    <MockWindow label="network-status">
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-1 rounded-lg bg-black/[0.03] px-2 py-1 text-[10.5px] font-semibold text-foreground/70 ring-1 ring-black/[0.05]"
            >
              <span className="h-1 w-1 rounded-full bg-primary" />
              {r}
            </span>
          ))}
          <span className="inline-flex items-center rounded-lg bg-primary/10 px-2 py-1 text-[10.5px] font-semibold text-primary">
            +52 more
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-black/[0.06] rounded-xl bg-black/[0.03] ring-1 ring-black/[0.05]">
          <div className="flex flex-col items-center gap-1 px-2 py-3">
            <Globe2 className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden="true" />
            <span className="font-mono text-[13px] font-bold text-foreground">60+</span>
            <span className="text-center text-[9px] leading-tight text-muted-foreground">countries</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 py-3">
            <Gauge className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden="true" />
            <span className="font-mono text-[13px] font-bold text-foreground">&lt;150ms</span>
            <span className="text-center text-[9px] leading-tight text-muted-foreground">latency</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 py-3">
            <Wifi className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} aria-hidden="true" />
            <span className="font-mono text-[13px] font-bold text-foreground">99.99%</span>
            <span className="text-center text-[9px] leading-tight text-muted-foreground">uptime</span>
          </div>
        </div>

        <p className="text-center text-[10.5px] text-muted-foreground">
          Your provider's network carries the call — we handle the brain.
        </p>
      </div>
    </MockWindow>
  )
}

/* ------------------------------------------------------------------ */

const items = [
  {
    icon: PhoneForwarded,
    title: "Bring your own number",
    description:
      "Already have a carrier account? Connect it and your existing numbers route through 9278.ai instantly — no porting, no downtime.",
  },
  {
    icon: Globe2,
    title: "Inbound and outbound",
    description:
      "One number, both directions. Trigger outbound campaigns or answer every incoming call automatically — same dashboard, same agent.",
  },
  {
    icon: ShieldCheck,
    title: "Carrier-grade voice",
    description:
      "Your provider's global network carries the call. We handle the brain. You keep the relationship, the billing, and the porting rights.",
  },
]

function MockupFor({ index }: { index: number }) {
  if (index === 1) return <InboundOutboundMockup />
  if (index === 2) return <CarrierGradeVoiceMockup />
  return <CarrierNumberMockup />
}

export function Connectivity() {
  const [active, setActive] = useState(0)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)
  const isDesktop = useIsDesktop()

  // Auto-cycle the mockup every 3s, desktop only. Restarts from whatever is
  // active whenever it changes (hover or auto-advance), so hovering doesn't
  // fight the cycle — it just gives that item a fresh 3s before advancing.
  useEffect(() => {
    if (!isDesktop) return
    const id = setTimeout(() => setActive((a) => (a + 1) % items.length), 3000)
    return () => clearTimeout(id)
  }, [active, isDesktop])

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:px-6 md:pb-10 md:pt-14">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* LEFT: Copy + items */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <span className="ai-pill-violet">
                <Globe2 className="h-3 w-3" />
                Phone numbers
              </span>
              <h2 className="mt-4 text-balance text-3xl font-serif font-normal leading-[1.1] tracking-tight md:text-4xl">
                Your carrier account, <span className="text-primary">supercharged.</span>
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                We don't sell phone numbers. We connect to the carrier you already use — so your numbers, billing, and
                porting stay exactly where they are.
              </p>
            </ScrollReveal>

            <StaggerGroup className="mt-6 flex flex-col gap-2">
              {items.map((item, i) => {
                const Icon = item.icon
                return (
                  <StaggerItem key={item.title}>
                    <motion.div
                      onMouseEnter={() => isDesktop && setActive(i)}
                      onClick={() => {
                        setActive(i)
                        setMobileExpanded((cur) => (cur === i ? null : i))
                      }}
                      className={`group card-glow relative flex items-start gap-4 rounded-2xl p-4 transition-colors ${
                        active === i ? "border-primary/30" : ""
                      }`}
                      animate={
                        isDesktop ? { x: active === i ? 6 : 0, scale: active === i ? 1.03 : 1 } : { x: 0, scale: 1 }
                      }
                      style={{ transformOrigin: "left center" }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors ${
                          active === i
                            ? "bg-primary text-primary-foreground ring-primary/30"
                            : "bg-primary/10 text-primary ring-primary/20"
                        }`}
                      >
                        <Icon
                          className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold tracking-tight transition-colors group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{item.description}</p>
                      </div>
                      <motion.span
                        animate={{ rotate: mobileExpanded === i ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-0.5 shrink-0 text-muted-foreground lg:hidden"
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    </motion.div>

                    {/* Mobile-only accordion — the matching mockup drops down right under the tapped row */}
                    <AnimatePresence initial={false}>
                      {mobileExpanded === i && (
                        <motion.div
                          key="mobile-mockup"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="relative mt-3 overflow-hidden rounded-2xl" style={{ height: 300 }}>
                            <MockupFor index={i} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>

          {/* RIGHT: swaps with whichever item is hovered — desktop/tablet only */}
          <ScrollReveal className="hidden lg:col-span-6 lg:block">
            <div className="relative min-h-[340px] overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-primary/[0.08] blur-3xl"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-[340px]"
                >
                  <MockupFor index={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
