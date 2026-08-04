"use client"

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react"

/** Thin brand progress bar pinned to the very top of the viewport —
    fills left→right as you scroll the page. Spring-smoothed so it
    glides instead of ticking. */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left"
      style={{
        scaleX,
        backgroundImage:
          "linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 55%, var(--ai-magenta)))",
      }}
    />
  )
}
