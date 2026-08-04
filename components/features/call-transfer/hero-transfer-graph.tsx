"use client"

import { useEffect, useState } from "react"
import { Bot, CheckCircle2, Headset, User } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { ContextSummaryCard } from "./context-summary-card"

/**
 * HeroTransferGraph
 *
 * The page's centerpiece: a three-node call-transfer pipeline —
 * Customer → AI Agent → Human Agent — connected by glowing SVG paths, with
 * the AI's context summary visibly traveling to the human node before that
 * connector "completes". Runs as a small looping state machine (idle →
 * connect → gather → handoff → connected → idle…), each phase driving node
 * highlight state, path opacity, a traveling SMIL dot, and the summary
 * card's docked position.
 *
 * Desktop lays the three nodes out left-to-right; mobile restructures them
 * top-to-bottom (not just a shrunk version of the same layout) — the whole
 * coordinate set swaps via `useIsDesktop`, and the connecting paths are
 * recomputed from those coordinates every render.
 *
 * `useReducedMotion()` short-circuits the interval entirely and pins the
 * phase at "connected" — the settled end state (summary already docked at
 * the human node, both paths solid) renders once with no loops.
 */

type Phase = "idle" | "connect" | "gather" | "handoff" | "connected"
const PHASES: Phase[] = ["idle", "connect", "gather", "handoff", "connected"]
const DURATIONS: Record<Phase, number> = {
  idle: 700,
  connect: 1400,
  gather: 1500,
  handoff: 1500,
  connected: 2200,
}
const STATUS: Record<Phase, string> = {
  idle: "Waiting for next call…",
  connect: "Connecting to AI agent…",
  gather: "AI gathering context…",
  handoff: "Handing off with full context…",
  connected: "Live with human agent",
}

type Point = { x: number; y: number }
type NodeKey = "customer" | "ai" | "human"

const DESKTOP_NODES: Record<NodeKey, Point> = {
  customer: { x: 8, y: 50 },
  ai: { x: 50, y: 50 },
  human: { x: 92, y: 50 },
}
const MOBILE_NODES: Record<NodeKey, Point> = {
  customer: { x: 50, y: 9 },
  ai: { x: 50, y: 50 },
  human: { x: 50, y: 91 },
}

const NODE_META: Array<{ key: NodeKey; label: string; icon: typeof User }> = [
  { key: "customer", label: "Customer", icon: User },
  { key: "ai", label: "AI Agent", icon: Bot },
  { key: "human", label: "Human Agent", icon: Headset },
]

/** Quadratic bezier bowed perpendicular to the a→b run, same technique as
    the hero call console's inbound arcs, adapted for node-to-node paths. */
function curvedPath(a: Point, b: Point, bow: number) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const px = -dy / len
  const py = dx / len
  const cx = mx + px * len * bow
  const cy = my + py * len * bow
  return `M ${a.x} ${a.y} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${b.x} ${b.y}`
}

/** Keeps the traveling summary card's horizontal anchor inboard of the
    human node on desktop so its width never clips the container edge. */
const clampCardX = (x: number) => Math.min(Math.max(x, 15), 84)

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

export function HeroTransferGraph() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const nodes = isDesktop ? DESKTOP_NODES : MOBILE_NODES
  const bow = isDesktop ? -0.16 : 0.16

  const [phaseIndex, setPhaseIndex] = useState(() => (reduced ? PHASES.indexOf("connected") : 0))
  const phase = PHASES[phaseIndex]

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setPhaseIndex((i) => (i + 1) % PHASES.length), DURATIONS[PHASES[phaseIndex]])
    return () => clearTimeout(t)
  }, [phaseIndex, reduced])

  const custAiPath = curvedPath(nodes.customer, nodes.ai, bow)
  const aiHumanPath = curvedPath(nodes.ai, nodes.human, bow)

  const custAiLive = phase !== "idle"
  const aiHumanActive = phase === "handoff" || phase === "connected"
  const cardVisible = phase === "gather" || phase === "handoff" || phase === "connected"
  const cardAtHuman = phase === "handoff" || phase === "connected"

  const active: Record<NodeKey, boolean> = {
    customer: custAiLive,
    ai: phase === "connect" || phase === "gather" || phase === "handoff",
    human: aiHumanActive,
  }

  const cardTarget = cardAtHuman ? nodes.human : nodes.ai
  const cardLeft = clampCardX(cardTarget.x)
  const cardTop = isDesktop ? cardTarget.y : cardTarget.y - 14

  return (
    <div className="relative mx-auto mt-10 h-[440px] w-full max-w-sm sm:max-w-md md:h-[300px] md:max-w-4xl lg:max-w-5xl">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={custAiPath}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity={custAiLive ? 0.55 : 0.15}
          strokeWidth="0.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="transition-[stroke-opacity] duration-500"
        />
        <path
          d={aiHumanPath}
          fill="none"
          stroke="var(--ai-magenta)"
          strokeOpacity={aiHumanActive ? 0.7 : 0.12}
          strokeWidth="0.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="transition-[stroke-opacity] duration-500"
        />
        {!reduced && custAiLive && (
          <circle r="0.9" fill="var(--primary)">
            <animateMotion dur="1.6s" repeatCount="indefinite" path={custAiPath} />
          </circle>
        )}
        {!reduced && phase === "handoff" && (
          <circle r="0.9" fill="var(--ai-magenta)">
            <animateMotion dur="1.3s" repeatCount="indefinite" path={aiHumanPath} />
          </circle>
        )}
      </svg>

      {NODE_META.map(({ key, label, icon: Icon }) => {
        const pos = nodes[key]
        const isActive = active[key]
        return (
          <div
            key={key}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div
              className={cn(
                "glass card-glow relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-500 md:h-16 md:w-16",
                isActive ? "border-primary/50" : "border-border/50",
              )}
            >
              {isActive && !reduced && (
                <span className="pulse-ring absolute inset-0 rounded-2xl text-primary/50" aria-hidden />
              )}
              <Icon className={cn("relative size-6 md:size-7", isActive ? "text-primary" : "text-muted-foreground")} aria-hidden />
              {key === "ai" && phase === "gather" && (
                <span className="absolute -bottom-1.5 -right-1.5 flex gap-0.5 rounded-full border border-border/60 bg-card px-1.5 py-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="dot-float size-1 rounded-full bg-primary"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
              )}
              {key === "human" && phase === "connected" && (
                <span className="absolute -bottom-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="size-3" aria-hidden />
                </span>
              )}
            </div>
            <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground md:text-xs">{label}</span>
          </div>
        )
      })}

      <div
        className="absolute z-20"
        style={{
          left: `${cardLeft}%`,
          top: `${cardTop}%`,
          transform: "translate(-50%, -130%)",
          transitionProperty: "left, top",
          transitionDuration: reduced ? "0ms" : "1200ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <AnimatePresence>
          {cardVisible && (
            <motion.div
              key="summary-card"
              initial={reduced ? false : { opacity: 0, scale: 0.85, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.85, y: -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContextSummaryCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center md:bottom-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={phase}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="rounded-full border border-border/60 bg-card/85 px-3 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-md"
          >
            {STATUS[phase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
