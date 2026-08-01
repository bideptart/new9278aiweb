"use client"

/**
 * Hero backdrop — four stacked, cheap layers:
 *
 *   1. AI grid, radially masked so it dissolves before the edges
 *   2. Three drifting aurora orbs (transform-only, GPU composited)
 *   3. A neural-line SVG whose dashes flow along the paths
 *   4. A spotlight that follows the cursor
 *
 * Everything animates transform/opacity only, so the compositor handles it
 * and the main thread stays free. The whole thing collapses to a static
 * gradient under `prefers-reduced-motion`.
 */

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"

const ORBS = [
  {
    className: "-left-32 top-[-10%] h-[520px] w-[520px]",
    color: "var(--primary)",
    opacity: 0.14,
    path: { x: [0, 80, -40, 0], y: [0, -50, 40, 0], scale: [1, 1.12, 0.95, 1] },
    duration: 22,
  },
  {
    className: "right-[-12%] top-[8%] h-[460px] w-[460px]",
    color: "var(--ai-magenta)",
    opacity: 0.12,
    path: { x: [0, -70, 35, 0], y: [0, 55, -30, 0], scale: [1, 0.92, 1.1, 1] },
    duration: 26,
  },
  {
    className: "left-[38%] bottom-[-20%] h-[560px] w-[560px]",
    color: "var(--ai-mint)",
    opacity: 0.08,
    path: { x: [0, 50, -60, 0], y: [0, -35, 25, 0], scale: [1, 1.08, 0.94, 1] },
    duration: 30,
  },
]

/** Hand-authored bezier "synapses". Dashes drift so they read as signal. */
const NEURAL_PATHS = [
  "M 0 180 C 180 120, 300 260, 520 190 S 860 90, 1200 210",
  "M 0 420 C 220 330, 380 500, 640 400 S 960 300, 1200 380",
  "M 120 0 C 200 160, 120 320, 260 460 S 420 640, 380 800",
  "M 980 0 C 900 180, 1040 340, 940 500 S 820 660, 900 800",
]

export function HeroBackground() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  // Cursor spotlight. Written straight to CSS custom properties inside a rAF
  // so pointer moves never trigger a React render.
  useEffect(() => {
    if (reduced) return
    const el = rootRef.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let frame = 0
    let x = 0
    let y = 0

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x = ((e.clientX - rect.left) / rect.width) * 100
      y = ((e.clientY - rect.top) / rect.height) * 100
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty("--spot-x", `${x}%`)
        el.style.setProperty("--spot-y", `${y}%`)
        el.style.setProperty("--spot-o", "1")
      })
    }

    const onLeave = () => el.style.setProperty("--spot-o", "0")

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [reduced])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ "--spot-x": "50%", "--spot-y": "35%", "--spot-o": "0" } as React.CSSProperties}
    >
      {/* 1 — masked AI grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black_5%,transparent_75%)]" />

      {/* 2 — drifting aurora orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] [will-change:transform] ${orb.className}`}
          style={{ background: orb.color, opacity: orb.opacity }}
          animate={reduced ? undefined : orb.path}
          transition={{
            duration: orb.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 3 — neural signal lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_80%)]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-synapse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--ai-magenta)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {NEURAL_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="url(#hero-synapse)"
            strokeWidth="1"
            strokeDasharray="4 14"
            className={reduced ? undefined : "conn-flow"}
            style={{ animationDuration: `${2 + i * 0.45}s` }}
          />
        ))}
      </svg>

      {/* 4 — cursor spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--spot-o)",
          background:
            "radial-gradient(600px circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)",
        }}
      />

      {/* Fine noise so the gradients never band */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
