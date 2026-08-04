"use client"

import type React from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

/* ==================================================================
   Shared scroll-entrance system. One easing, one recipe — every
   section on the page inherits the same "soft focus" reveal:
   rise + fade + blur-to-sharp, on a long expo-out curve.
   ================================================================== */

const EASE = [0.16, 1, 0.3, 1] as const

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
}

export function ScrollReveal({ children, className, delay = 0, y = 28 }: ScrollRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={cn(className)}>{children}</div>

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y, scale: 0.98, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: EASE, delay },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
  /** Delay between each direct child */
  stagger?: number
}

export function StaggerGroup({ children, className, stagger = 0.09 }: StaggerProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={cn(className)}>{children}</div>

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.08 },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  )
}
