"use client"

import { useEffect, useState } from "react"
import { Languages } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Human-like, multilingual greetings — an editorial pull-quote, not a
 * dashboard card. A borderless marquee of every supported language drifts
 * past overhead; underneath, an oversized serif quotation mark sits beside
 * a crossfading greeting line, styled like a magazine callout rather than
 * a bordered panel.
 */

const LANGUAGES = ["English", "Español", "Français", "Deutsch", "Português", "Italiano", "हिन्दी", "中文", "日本語"] as const

const GREETINGS = [
  {
    lang: "English",
    tone: "Friendly",
    text: "Thanks for calling Horizon Realty, this is Aria — how can I help you find your next home?",
  },
  {
    lang: "Español",
    tone: "Warm",
    text: "Gracias por llamar a Horizon Realty, soy Aria. ¿En qué puedo ayudarle hoy?",
  },
  {
    lang: "Français",
    tone: "Professional",
    text: "Merci d'avoir appelé Horizon Realty, ici Aria. Comment puis-je vous aider aujourd'hui ?",
  },
] as const

const STEP_MS = 3200

export function LanguageShowcase() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [reduced])

  const active = GREETINGS[index]

  return (
    <div className="relative">
      {/* Ambient language ticker — drifts past overhead, no frame around it */}
      <div className="relative -mx-1 overflow-hidden py-1" aria-hidden>
        <div
          className={cn(
            "flex w-max items-center gap-6 whitespace-nowrap px-1 text-sm font-medium text-muted-foreground/60",
            !reduced && "marquee",
          )}
        >
          {[...LANGUAGES, ...LANGUAGES].map((name, i) => (
            <span key={i} className="inline-flex items-center gap-6">
              {name}
              <span className="text-primary/40">·</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Languages className="h-3.5 w-3.5 text-primary" aria-hidden />
        Auto-detected across 60+ languages — no menu, no delay.
      </p>

      {/* Editorial pull-quote — oversized serif glyph, no card, no border box */}
      <div className="relative mt-8 pl-9 sm:pl-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-1 -top-6 select-none font-serif text-8xl leading-none text-primary/20 sm:-top-8 sm:text-9xl"
        >
          "
        </span>

        <div className="relative min-h-[7rem] sm:min-h-[6rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.lang}
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-normal uppercase tracking-[0.16em] text-primary">
                {active.lang} · {active.tone}
              </span>
              <p className="mt-2 text-pretty font-serif text-xl italic leading-relaxed text-foreground sm:text-2xl">
                {active.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
