"use client"

import { motion } from "motion/react"
import { Sparkles, Printer } from "lucide-react"

interface ReceiptLine {
  label: string
  value: string
}

const LINES: ReceiptLine[] = [
  { label: "Table 12 · Reservation", value: "7:30 PM" },
  { label: "Takeout #482 · Confirmed", value: "18 min" },
  { label: "Private Event · Deposit", value: "14 pax" },
  { label: "Catering #A19 · Locked", value: "Sat 12PM" },
  { label: "Table 09 · Feedback", value: "5-star" },
  { label: "Table 05 · Waitlist Cleared", value: "Seated" },
  { label: "Table 07 · Bill Requested", value: "Closing" },
  { label: "Takeout #491 · Confirmed", value: "22 min" },
]

export function RestaurantReceiptPrinter() {
  const loop = [...LINES, ...LINES]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 -z-10 size-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tl from-primary/15 via-rose-500/10 to-transparent blur-3xl opacity-20"
      />

      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          LIVE KDS PRINTOUT
        </span>
        <h2 className="text-3xl font-serif font-semibold tracking-tight md:text-5xl text-foreground">
          Straight to the pass, <span className="italic text-rose-400 dark:text-rose-400">in real time.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          Every call outcome the AI voice engine handles prints straight to the kitchen ticket rail.
        </p>
      </div>

      <div className="mx-auto flex max-w-xs flex-col items-center [perspective:1100px]">
        <div className="flex w-full flex-col items-center [transform-style:preserve-3d] [transform:rotateX(20deg)_rotateY(-6deg)] drop-shadow-[0_35px_40px_rgba(244,63,94,0.18)]">
          {/* Printer Housing */}
          <div className="relative z-10 w-full rounded-t-2xl border border-b-0 border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 px-4 py-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Printer className="size-3.5 text-slate-500 dark:text-slate-400" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  AI Ticket Printer
                </span>
              </div>
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-400/50 dark:bg-slate-700" />
          </div>

          {/* Receipt Paper Feed */}
          <div className="relative w-[92%] h-[300px] overflow-hidden border-x border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-[0_25px_50px_rgba(0,0,0,0.15)] [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
            <motion.div
              className="flex flex-col divide-y divide-dashed divide-border/50"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 16, ease: "linear", repeat: Infinity }}
            >
              {loop.map((line, i) => (
                <div key={i} className="flex items-center justify-between gap-2 px-4 py-3">
                  <span className="truncate font-mono text-[11px] text-foreground">{line.label}</span>
                  <span className="shrink-0 font-mono text-[11px] font-bold text-rose-400 dark:text-rose-400">{line.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Torn Edge */}
          <div
            aria-hidden
            className="h-4 w-[92%] shrink-0 bg-white dark:bg-slate-950 border-x border-slate-200 dark:border-slate-800"
            style={{
              clipPath:
                "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
