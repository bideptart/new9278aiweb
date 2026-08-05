"use client"

import { CheckCircle2, MessageSquareText } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

/**
 * Animated SMS confirmation toast — slides/fades in when the current step
 * books a slot, holds, then slides back out. Synced entirely off the
 * `show` flag HeroSplit derives from the shared step timeline, so it never
 * needs its own timer.
 */
export function SmsToast({ show, reduced }: { show: boolean; reduced: boolean }) {
  if (reduced) {
    if (!show) return null
    return (
      <div className="absolute bottom-3 right-3 left-3 z-20 flex items-center gap-3 rounded-2xl border border-[var(--ai-mint)]/40 bg-card/95 p-3 shadow-none backdrop-blur-md sm:left-auto sm:w-72">
        <ToastBody />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex justify-end sm:inset-x-auto sm:right-3">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl border border-[var(--ai-mint)]/40 bg-card/95 p-3 backdrop-blur-md sm:w-72"
          >
            <ToastBody />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ToastBody() {
  return (
    <>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
        style={{ background: "var(--ai-mint)" }}
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <MessageSquareText className="h-2.5 w-2.5" aria-hidden />
          SMS confirmation
        </p>
        <p className="mt-0.5 truncate text-xs font-normal text-foreground">Appointment booked for 3:00 PM!</p>
      </div>
    </>
  )
}
