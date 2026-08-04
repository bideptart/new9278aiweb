"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Database } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Instant FAQ knowledge-base lookup, mocked as a small self-running demo —
 * a "rail + thread" composition, not a bordered card. A radar-style orb
 * scans while the query types itself out; once a match lands, a signal
 * thread draws downward from the orb to the answer. Loops through a few
 * real-world questions. Reduced motion renders one completed Q/A pair
 * statically, with no timers or sweep animation running.
 */

const PAIRS = [
  {
    q: "What are your hours?",
    a: "We're open Monday–Saturday, 8am–6pm — and I'm here to help 24/7 even after that.",
  },
  {
    q: "Do you take walk-ins?",
    a: "Yes — we hold a few walk-in slots each day. Want me to check today's availability?",
  },
  {
    q: "Where are you located?",
    a: "220 Market Street, Suite 4 — right next to the downtown parking garage.",
  },
] as const

const TYPE_MS = 38
const SEARCH_MS = 900
const ANSWER_HOLD_MS = 2600
const PAUSE_MS = 500

function RadarOrb({ searching, reduced }: { searching: boolean; reduced: boolean }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-primary/15" />
      <span className="absolute inset-[5px] rounded-full border border-primary/15" />

      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, color-mix(in oklch, var(--primary) 65%, transparent), transparent 70%)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 7px), black calc(100% - 6px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 7px), black calc(100% - 6px))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: searching ? 1 : 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      )}

      {searching && !reduced && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary/40"
          initial={{ scale: 0.6, opacity: 0.7 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
        />
      )}

      <span
        className={cn(
          "relative flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300",
          searching ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Database className="h-4 w-4" aria-hidden />
      </span>
    </div>
  )
}

export function FaqLookupDemo() {
  const reduced = useReducedMotion()
  const [pairIndex, setPairIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "searching" | "answered">(reduced ? "answered" : "typing")
  const [typed, setTyped] = useState(reduced ? PAIRS[0].q : "")
  const intervals = useRef<number[]>([])
  const timeouts = useRef<number[]>([])

  useEffect(() => {
    if (reduced) return

    const clearAll = () => {
      intervals.current.forEach((id) => window.clearInterval(id))
      timeouts.current.forEach((id) => window.clearTimeout(id))
      intervals.current = []
      timeouts.current = []
    }

    const runPair = (idx: number) => {
      setPairIndex(idx)
      setPhase("typing")
      setTyped("")
      const question = PAIRS[idx].q
      let i = 0
      const typeId = window.setInterval(() => {
        i += 1
        setTyped(question.slice(0, i))
        if (i >= question.length) {
          window.clearInterval(typeId)
          const t1 = window.setTimeout(() => setPhase("searching"), PAUSE_MS)
          const t2 = window.setTimeout(() => setPhase("answered"), PAUSE_MS + SEARCH_MS)
          const t3 = window.setTimeout(
            () => runPair((idx + 1) % PAIRS.length),
            PAUSE_MS + SEARCH_MS + ANSWER_HOLD_MS,
          )
          timeouts.current.push(t1, t2, t3)
        }
      }, TYPE_MS)
      intervals.current.push(typeId)
    }

    runPair(0)
    return clearAll
  }, [reduced])

  const pair = PAIRS[pairIndex]
  const searching = phase === "searching"
  const answered = phase === "answered"

  return (
    <div className="relative flex gap-4">
      {/* Rail — scanning orb + a signal thread that draws down once a match lands */}
      <div className="relative flex flex-col items-center">
        <RadarOrb searching={searching} reduced={!!reduced} />
        <motion.span
          aria-hidden
          className="mt-1 w-px flex-1 origin-top bg-gradient-to-b from-primary/45 via-primary/20 to-transparent"
          initial={false}
          animate={{ scaleY: answered ? 1 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content — query, status, answer */}
      <div className="min-w-0 flex-1 pb-1">
        <p className="min-h-[1.5rem] font-mono text-sm text-foreground">
          {typed}
          {!reduced && phase === "typing" && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-primary" aria-hidden />
          )}
        </p>

        <p className="mt-2 text-xs font-medium text-foreground">
          {searching ? "Searching knowledge base…" : answered ? "Match found" : "Knowledge base ready"}
        </p>
        <p className="text-[11px] text-muted-foreground">18,000+ indexed answers, docs & policies</p>

        <div className="mt-4 min-h-[5.5rem]">
          {answered && (
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-pretty font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
                {pair.a}
              </p>
              <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Answered in 0.4s
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
