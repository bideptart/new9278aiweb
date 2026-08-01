"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Globe2,
  PhoneForwarded,
  ShieldCheck,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  CreditCard,
  ArrowLeftRight,
  AudioLines,
  UserRound,
  Link2,
  Lock,
  MessagesSquare,
  BarChart3,
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

/* ------------------------------------------------------------------
   01 · Bring your own number
   ------------------------------------------------------------------
   Soft-3D "clay" illustration: a flattened isometric podium carrying
   the account tile, ringed by orbiting capability tiles on dashed
   leaders, with three fact chips along the bottom.

   The 3D read comes from gradients + `rotate(45deg) scaleY(0.56)` on
   stacked slabs — no images, no WebGL, nothing to download. Every
   moving part is transform-only and stops under reduced motion.
   ------------------------------------------------------------------ */

/** Warm pink backdrop + breathing centre glow, shared by all three cards. */
function ClayCanvas({ reduced }: { reduced: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 42%, color-mix(in oklch, var(--primary) 7%, white), color-mix(in oklch, var(--primary) 3%, white) 70%, white 100%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.13] blur-[80px]"
        animate={reduced ? undefined : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </>
  )
}

/** A floating clay tile with a caption underneath. */
function LabeledTile({
  icon: Icon,
  label,
  pos,
  delay,
  size = 46,
}: {
  icon: typeof Phone
  label: string
  pos: string
  delay: number
  size?: number
}) {
  const reduced = useReducedMotion()
  return (
    <div className={cn("absolute z-20 flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5", pos)}>
      <motion.span
        className="flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundImage:
            "linear-gradient(150deg, #fff 0%, #fff 45%, color-mix(in oklch, var(--primary) 10%, white) 100%)",
          boxShadow:
            "0 10px 20px -8px color-mix(in oklch, var(--primary) 32%, transparent), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
      >
        <Icon
          className="text-primary"
          style={{ width: size * 0.42, height: size * 0.42 }}
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </motion.span>
      <span className="text-center text-[9px] font-medium leading-tight text-muted-foreground">{label}</span>
    </div>
  )
}

/** Orbiting capability tile. `pos` places it, `delay` staggers the float. */
function OrbitTile({
  icon: Icon,
  pos,
  delay,
  size = 46,
}: {
  icon: typeof Phone
  pos: string
  delay: number
  size?: number
}) {
  const reduced = useReducedMotion()
  // Centring lives on a plain wrapper; Motion owns `transform` on the inner
  // element, so the two never fight over the same property.
  return (
    <div className={cn("absolute z-20 -translate-x-1/2 -translate-y-1/2", pos)}>
      <motion.span
        className="flex items-center justify-center rounded-[30%]"
        style={{
          width: size,
          height: size,
          backgroundImage:
            "linear-gradient(150deg, #fff 0%, #fff 45%, color-mix(in oklch, var(--primary) 9%, white) 100%)",
          boxShadow:
            "0 10px 20px -8px color-mix(in oklch, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
        animate={reduced ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
      >
        <Icon
          className="text-primary"
          style={{ width: size * 0.42, height: size * 0.42 }}
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </motion.span>
    </div>
  )
}

/** One flattened slab of the podium. */
function Slab({
  w,
  y,
  from,
  to,
  z,
}: {
  w: number
  y: number
  from: string
  to: string
  z: number
}) {
  return (
    <span
      className="absolute left-1/2 top-1/2 rounded-[26%]"
      style={{
        width: w,
        height: w,
        zIndex: z,
        transform: `translate(-50%, -50%) translateY(${y}px) rotate(45deg) scaleY(0.56)`,
        backgroundImage: `linear-gradient(145deg, ${from}, ${to})`,
      }}
    />
  )
}

function CarrierPhoneMockup() {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-3xl">
      <ClayCanvas reduced={!!reduced} />

      {/* dashed orbit rings — circles flattened into ellipses */}
      {[
        { w: "84%", s: 0.4, o: "border-primary/25", dur: 38 },
        { w: "58%", s: 0.42, o: "border-primary/20", dur: 26 },
      ].map((ring, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 top-[46%] aspect-square rounded-full border border-dashed",
            ring.o,
          )}
          style={{ width: ring.w }}
          initial={{ rotate: 0 }}
          animate={reduced ? undefined : { rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: ring.dur, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          // scaleY flattens the circle; the translate keeps it centred.
          transformTemplate={({ rotate }) =>
            `translate(-50%, -50%) scaleY(${ring.s}) rotate(${rotate ?? "0deg"})`
          }
        />
      ))}

      {/* dashed leaders from the podium out to each tile */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          { x2: "52%", y2: "20%" },
          { x2: "21%", y2: "33%" },
          { x2: "80%", y2: "34%" },
          { x2: "25%", y2: "63%" },
          { x2: "78%", y2: "62%" },
        ].map((l, i) => (
          <line
            key={i}
            x1="50%"
            y1="46%"
            {...l}
            stroke="url(#connGrad)"
            strokeWidth="1"
            strokeDasharray="3 5"
            className={reduced ? undefined : "conn-flow"}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
        <defs>
          <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.12" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── podium ── */}
      <div className="absolute left-1/2 top-[46%] z-10 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-full w-full"
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {/* contact shadow on the floor */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[52px] w-[130px] rounded-[50%] bg-primary/20 blur-xl"
            style={{ transform: "translate(-50%, 18px)" }}
          />
          <Slab w={132} y={26} from="color-mix(in oklch, var(--primary) 42%, white)" to="color-mix(in oklch, var(--primary) 22%, white)" z={1} />
          <Slab w={132} y={16} from="color-mix(in oklch, var(--primary) 20%, white)" to="color-mix(in oklch, var(--primary) 10%, white)" z={2} />
          <Slab w={124} y={4} from="#ffffff" to="color-mix(in oklch, var(--primary) 8%, white)" z={3} />

          {/* the account tile, floating just above the podium */}
          <span
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ marginTop: -14 }}
          >
            <motion.span
              className="flex h-[62px] w-[62px] items-center justify-center rounded-[30%]"
              style={{
                backgroundImage:
                  "linear-gradient(150deg, #fff 0%, #fff 40%, color-mix(in oklch, var(--primary) 12%, white) 100%)",
                boxShadow:
                  "0 16px 26px -12px color-mix(in oklch, var(--primary) 45%, transparent), inset 0 1px 0 rgba(255,255,255,0.95)",
              }}
              animate={reduced ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <UserRound className="h-6 w-6 text-primary" strokeWidth={2.1} aria-hidden="true" />
            </motion.span>
          </span>
        </motion.div>
      </div>

      {/* ── orbiting capability tiles ── */}
      <OrbitTile icon={ShieldCheck} pos="left-[52%] top-[20%]" delay={0} size={44} />
      <OrbitTile icon={CreditCard} pos="left-[21%] top-[33%]" delay={0.9} size={46} />
      <OrbitTile icon={Globe2} pos="left-[80%] top-[34%]" delay={1.8} size={46} />
      <OrbitTile icon={Phone} pos="left-[25%] top-[63%]" delay={2.7} size={44} />
      <OrbitTile icon={AudioLines} pos="left-[78%] top-[62%]" delay={3.6} size={44} />

      {/* ── bottom fact chips ── */}
      <div className="relative z-30 mt-auto grid grid-cols-3 gap-2 p-4">
        {[
          { icon: ShieldCheck, title: "No porting", sub: "Keep everything as is." },
          { icon: Link2, title: "Works on what", sub: "you already use." },
          { icon: Globe2, title: "Global coverage", sub: "60+ countries" },
        ].map((c) => (
          <div
            key={c.title}
            className="flex items-start gap-2 rounded-xl bg-white/85 px-2.5 py-2 ring-1 ring-black/[0.05] backdrop-blur-sm"
          >
            <c.icon className="mt-[1px] h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.25} aria-hidden="true" />
            <span className="min-w-0 leading-tight">
              <span className="block text-[9.5px] font-semibold leading-tight text-foreground">{c.title}</span>
              <span className="block text-[8.5px] leading-tight text-muted-foreground">{c.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   02 · Inbound and outbound — two lanes, one agent
   ------------------------------------------------------------------ */

function InboundOutboundDashboardMockup() {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-3xl">
      <ClayCanvas reduced={!!reduced} />

      {/* dashed leaders: in → hub → out, then hub down to the three outputs */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M19,29 Q33,29 41,37",
          "M81,29 Q67,29 59,37",
          "M50,56 L50,63 Q50,68 44,68 L23,68 Q20,68 20,71",
          "M50,56 L50,71",
          "M50,56 L50,63 Q50,68 56,68 L77,68 Q80,68 80,71",
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity="0.38"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
            className={reduced ? undefined : "conn-flow"}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {/* direction tiles */}
      <LabeledTile icon={PhoneIncoming} label="Inbound" pos="left-[19%] top-[29%]" delay={0} size={46} />
      <LabeledTile icon={PhoneOutgoing} label="Outbound" pos="left-[81%] top-[29%]" delay={1.1} size={46} />

      {/* ── hub podium ── */}
      <div className="absolute left-1/2 top-[44%] z-10 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-full w-full"
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[48px] w-[122px] rounded-[50%] bg-primary/20 blur-xl"
            style={{ transform: "translate(-50%, 16px)" }}
          />
          <Slab w={124} y={24} from="color-mix(in oklch, var(--primary) 42%, white)" to="color-mix(in oklch, var(--primary) 22%, white)" z={1} />
          <Slab w={124} y={14} from="color-mix(in oklch, var(--primary) 20%, white)" to="color-mix(in oklch, var(--primary) 10%, white)" z={2} />
          <Slab w={116} y={3} from="#ffffff" to="color-mix(in oklch, var(--primary) 8%, white)" z={3} />

          <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ marginTop: -16 }}>
            <motion.span
              className="flex h-[64px] w-[64px] items-center justify-center rounded-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
                boxShadow:
                  "0 16px 28px -12px color-mix(in oklch, var(--primary) 55%, transparent), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
              animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
              transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ArrowLeftRight className="h-6 w-6 text-white" strokeWidth={2.4} aria-hidden="true" />
            </motion.span>
          </span>
        </motion.div>
      </div>

      {/* hub caption */}
      <div className="absolute left-1/2 top-[58%] z-20 -translate-x-1/2 text-center">
        <p className="text-[10px] font-semibold leading-tight text-primary">One agent</p>
        <p className="text-[9px] leading-tight text-muted-foreground">one number</p>
      </div>

      {/* what the hub drives */}
      <LabeledTile icon={AudioLines} label="Live call handling" pos="left-[20%] top-[78%]" delay={0.5} size={44} />
      <LabeledTile icon={MessagesSquare} label="Smart routing" pos="left-[50%] top-[78%]" delay={1.6} size={44} />
      <LabeledTile icon={BarChart3} label="Real-time analytics" pos="left-[80%] top-[78%]" delay={2.7} size={44} />
    </div>
  )
}

/* ------------------------------------------------------------------
   03 · Carrier-grade voice — the call path
   ------------------------------------------------------------------ */

function CarrierGradeVoiceMockup() {
  const reduced = useReducedMotion()

  return (
    <div className="relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-3xl">
      <ClayCanvas reduced={!!reduced} />

      {/* dashed orbit around the globe */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[47%] aspect-square w-[76%] rounded-full border border-dashed border-primary/25"
        initial={{ rotate: 0 }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 44, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        transformTemplate={({ rotate }) => `translate(-50%, -50%) scaleY(0.38) rotate(${rotate ?? "0deg"})`}
      />

      {/* ── globe on a tiered podium ── */}
      <div className="absolute left-1/2 top-[47%] z-10 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-full w-full"
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[46px] w-[140px] rounded-[50%] bg-primary/20 blur-xl"
            style={{ transform: "translate(-50%, 44px)" }}
          />

          {/* concentric discs */}
          {[
            { w: 150, y: 52, from: "color-mix(in oklch, var(--primary) 38%, white)", to: "color-mix(in oklch, var(--primary) 20%, white)" },
            { w: 124, y: 44, from: "color-mix(in oklch, var(--primary) 22%, white)", to: "color-mix(in oklch, var(--primary) 12%, white)" },
            { w: 100, y: 36, from: "#ffffff", to: "color-mix(in oklch, var(--primary) 9%, white)" },
          ].map((d) => (
            <span
              key={d.w}
              aria-hidden
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: d.w,
                height: d.w,
                transform: `translate(-50%, -50%) translateY(${d.y}px) scaleY(0.3)`,
                backgroundImage: `linear-gradient(145deg, ${d.from}, ${d.to})`,
              }}
            />
          ))}

          {/* the sphere */}
          <span
            className="absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
            style={{
              marginTop: -12,
              backgroundImage:
                "radial-gradient(circle at 32% 26%, #fff 0%, color-mix(in oklch, var(--primary) 14%, white) 45%, color-mix(in oklch, var(--primary) 42%, white) 100%)",
              boxShadow:
                "0 18px 30px -14px color-mix(in oklch, var(--primary) 55%, transparent), inset -6px -8px 18px color-mix(in oklch, var(--primary) 22%, transparent)",
            }}
          >
            {/* dotted landmass, drifting to suggest rotation */}
            <motion.span
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in oklch, var(--primary) 60%, transparent) 1px, transparent 1px)",
                backgroundSize: "6px 6px",
                maskImage: "radial-gradient(circle at 42% 40%, #000 55%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(circle at 42% 40%, #000 55%, transparent 78%)",
              }}
              animate={reduced ? undefined : { backgroundPositionX: ["0px", "48px"] }}
              transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* latitude hairlines */}
            {[30, 50, 70].map((t) => (
              <span
                key={t}
                aria-hidden
                className="absolute left-0 w-full border-t border-white/40"
                style={{ top: `${t}%` }}
              />
            ))}
          </span>
        </motion.div>
      </div>

      {/* four guarantees, one per corner */}
      <LabeledTile icon={ShieldCheck} label="Carrier verified" pos="left-[17%] top-[24%]" delay={0} size={46} />
      <LabeledTile icon={AudioLines} label="Crystal clear voice" pos="left-[83%] top-[24%]" delay={1} size={46} />
      <LabeledTile icon={Lock} label="Secure by default" pos="left-[17%] top-[76%]" delay={2} size={46} />
      <LabeledTile icon={Globe2} label="Global scale reliability" pos="left-[83%] top-[76%]" delay={3} size={46} />
    </div>
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
  if (index === 1) return <InboundOutboundDashboardMockup />
  if (index === 2) return <CarrierGradeVoiceMockup />
  return <CarrierPhoneMockup />
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
                          <div
                            className="ring-gradient card-glow relative mt-3 overflow-hidden rounded-3xl"
                            style={{ height: 430 }}
                          >
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
            <div className="ring-gradient card-glow relative min-h-[460px] overflow-hidden rounded-3xl sm:aspect-[4/3] sm:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
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
