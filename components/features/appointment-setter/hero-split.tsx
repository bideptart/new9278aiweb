"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import { CalendarDashboard } from "./calendar-dashboard"
import { CallPanel } from "./call-panel"
import { SmsToast } from "./sms-toast"
import { STEPS } from "./constants"

/**
 * Hero centerpiece — a genuine split screen: a "live call" panel on the
 * left, an interactive calendar dashboard on the right. Both are driven off
 * one shared step index (see ./constants) so the transcript, the slots
 * lighting up as "checking", and the SMS confirmation toast all stay in
 * lockstep, then loop. Reduced-motion visitors get the timeline frozen on
 * its final (booked) frame instead of the looping animation.
 */
export function HeroSplit() {
  const reduced = useReducedMotion()
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => {
      setStepIndex((i) => (i + 1) % STEPS.length)
    }, STEPS[stepIndex].duration)
    return () => clearTimeout(timer)
  }, [stepIndex, reduced])

  const step = STEPS[reduced ? STEPS.length - 1 : stepIndex]

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      <div className="min-h-[360px]">
        <CallPanel step={step} reduced={!!reduced} />
      </div>
      <div className="relative min-h-[360px]">
        <CalendarDashboard step={step} reduced={!!reduced} />
        <SmsToast show={step.toast} reduced={!!reduced} />
      </div>
    </div>
  )
}
