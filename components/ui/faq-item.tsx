"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqItemProps {
  index?: number
  question: string
  answer: string
  defaultOpen?: boolean
}

export function FaqItem({ index, question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      onMouseLeave={() => setIsOpen(false)}
      className={`rounded-2xl transition-all duration-300 ${
        isOpen
          ? "border border-primary/40 bg-primary/5 shadow-md shadow-primary/10"
          : "border border-border/60 bg-card/40 hover:border-primary/30"
      } p-5`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <span className="flex items-center gap-3.5 pr-4">
          {index !== undefined && (
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-normal transition-colors ${
                isOpen
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-primary/10 text-primary ring-1 ring-primary/20"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span className={`text-base font-normal transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
            {question}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className={`mt-3.5 border-t border-border/40 pt-3.5 text-sm leading-relaxed text-muted-foreground ${index !== undefined ? "pl-9" : ""}`}>
          {answer}
        </div>
      )}
    </div>
  )
}
