"use client"

import { useEffect, useState } from "react"
import { animate, useReducedMotion } from "motion/react"
import { Gauge, PhoneIncoming, Timer } from "lucide-react"

/**
 * Live stats row for the Answering Services hero. Each number drifts
 * gently in an infinite loop (same pattern as the "Active Calls" counter in
 * hero-call-console.tsx) rather than counting up once and going static, so
 * the panel reads as a live ops dashboard. Reduced-motion visitors get the
 * resting baseline values with no animation loop at all.
 */

const BASE_ANSWERED = 4812
const BASE_WAIT = 0.2
const BASE_CAPACITY = 128

export function StatsTicker() {
  const reduced = useReducedMotion()
  const [answered, setAnswered] = useState(BASE_ANSWERED)
  const [wait, setWait] = useState(BASE_WAIT)
  const [capacity, setCapacity] = useState(BASE_CAPACITY)

  useEffect(() => {
    if (reduced) return

    const controls = [
      animate(
        BASE_ANSWERED,
        [BASE_ANSWERED + 46, BASE_ANSWERED + 12, BASE_ANSWERED + 83, BASE_ANSWERED + 58, BASE_ANSWERED + 101],
        {
          duration: 26,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          onUpdate: (v) => setAnswered(Math.round(v)),
        },
      ),
      animate(BASE_WAIT, [0.4, 0.0, 0.3, 0.1, BASE_WAIT], {
        duration: 9,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        onUpdate: (v) => setWait(Math.max(0, v)),
      }),
      animate(BASE_CAPACITY, [BASE_CAPACITY + 14, BASE_CAPACITY - 9, BASE_CAPACITY + 6, BASE_CAPACITY], {
        duration: 13,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        onUpdate: (v) => setCapacity(Math.round(v)),
      }),
    ]
    return () => controls.forEach((c) => c.stop())
  }, [reduced])

  const items = [
    { icon: PhoneIncoming, label: "Calls answered today", value: answered.toLocaleString("en-US") },
    { icon: Timer, label: "Average wait time", value: `${wait.toFixed(1)}s` },
    { icon: Gauge, label: "Concurrent capacity", value: `${capacity} lines` },
  ]

  return (
    <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 sm:flex-col sm:items-start sm:justify-start sm:gap-1"
        >
          <dt className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <Icon className="size-3 text-primary" aria-hidden />
            {label}
          </dt>
          <dd className="font-mono text-lg font-semibold tabular-nums text-foreground sm:text-xl">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
