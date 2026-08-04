"use client"

import { useEffect, useState } from "react"

interface TypewriterTextProps {
  phrases: string[]
  className?: string
  typingSpeedMs?: number
  deletingSpeedMs?: number
  holdMs?: number
  pauseMs?: number
}

export function TypewriterText({
  phrases,
  className,
  typingSpeedMs = 55,
  deletingSpeedMs = 28,
  holdMs = 1800,
  pauseMs = 400,
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState("")
  const [phase, setPhase] = useState<"typing" | "deleting">("typing")

  useEffect(() => {
    if (phrases.length <= 1) {
      setText(phrases[0] ?? "")
      return
    }

    const current = phrases[phraseIndex % phrases.length]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeedMs)
      } else {
        timeout = setTimeout(() => setPhase("deleting"), holdMs)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeedMs)
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length)
          setPhase("typing")
        }, pauseMs)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, phraseIndex, phrases, typingSpeedMs, deletingSpeedMs, holdMs, pauseMs])

  return (
    <span className={className}>
      {text}
      <span aria-hidden="true" className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-pulse bg-current align-middle" />
    </span>
  )
}
