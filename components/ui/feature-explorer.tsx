"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Bell, CalendarRange, Check, Clock, Lock, MessageSquare, RefreshCw, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

function CalendarSyncPreview() {
  const services = ["Google Calendar", "Outlook", "Cal.com", "Calendly"]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {services.map((s) => (
        <span key={s} className="rounded-full border border-border/50 bg-background px-3 py-1.5 text-xs font-medium text-foreground">
          {s}
        </span>
      ))}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <Check className="size-3.5" aria-hidden="true" />
        Synced
      </span>
    </div>
  )
}

function DoubleBookingPreview() {
  const days = Array.from({ length: 7 }, (_, i) => i + 1)
  return (
    <div className="w-full max-w-[16rem] rounded-xl border border-border/40 bg-background/60 p-4">
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <span
            key={d}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-md text-xs font-medium",
              d === 4 ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground",
            )}
          >
            {d === 4 ? <Lock className="size-3" aria-hidden="true" /> : d}
          </span>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">Slot locked in real time during the call</p>
    </div>
  )
}

function SmsReceiptPreview() {
  return (
    <div className="w-full max-w-[16rem] rounded-2xl rounded-bl-md border border-border/40 bg-background/60 px-4 py-3 text-left shadow-sm">
      <p className="text-xs text-foreground">You're booked for Thu, Oct 26 at 11:30 AM.</p>
      <p className="mt-1 text-xs text-primary underline underline-offset-2">calendar.9278.ai/confirm/8841</p>
      <p className="mt-2 text-[10px] text-muted-foreground">Delivered · just now</p>
    </div>
  )
}

function ReschedulePreview() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
        <RefreshCw className="size-3.5" aria-hidden="true" />
        Reschedule
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
        Cancel
      </span>
      <span className="ml-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
        <Clock className="size-3" aria-hidden="true" />
        24/7
      </span>
    </div>
  )
}

function BufferPreview() {
  const blocks = [
    { label: "9:00", width: 26, kind: "busy" },
    { label: "", width: 10, kind: "buffer" },
    { label: "9:45", width: 26, kind: "busy" },
    { label: "", width: 10, kind: "buffer" },
    { label: "10:30", width: 26, kind: "busy" },
  ]
  return (
    <div className="w-full max-w-[18rem]">
      <div className="flex h-8 overflow-hidden rounded-lg">
        {blocks.map((b, i) => (
          <div
            key={i}
            className={cn("flex items-center justify-center text-[9px] font-medium", b.kind === "busy" ? "bg-primary/70 text-primary-foreground" : "bg-muted")}
            style={{ width: `${b.width}%` }}
          >
            {b.label}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">15-min buffer auto-inserted between bookings</p>
    </div>
  )
}

function IntakePreview() {
  const items = ["Full name & phone", "Reason for visit", "Insurance provider"]
  return (
    <div className="w-full max-w-[16rem] space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.05, delay: i * 0.02 }}
          className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-xs text-foreground"
        >
          <Check className="size-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
          {item}
        </motion.div>
      ))}
    </div>
  )
}

const features = [
  {
    icon: CalendarRange,
    title: "Direct Calendar Integration",
    description: "Syncs bi-directionally with Google Calendar, Outlook, Cal.com, Calendly, and CRMs — no manual entry, ever.",
    Preview: CalendarSyncPreview,
  },
  {
    icon: ShieldCheck,
    title: "Zero Double-Booking Guard",
    description: "Locks time slots in real time the moment they're offered on the call, so two callers can never grab the same slot.",
    Preview: DoubleBookingPreview,
  },
  {
    icon: Bell,
    title: "Instant SMS Receipts",
    description: "Sends an instant SMS confirmation with a calendar link the second the call ends.",
    Preview: SmsReceiptPreview,
  },
  {
    icon: RefreshCw,
    title: "24/7 Rescheduling & Cancels",
    description: "Callers can change or cancel an appointment anytime — no hold music, no waiting for office hours.",
    Preview: ReschedulePreview,
  },
  {
    icon: Clock,
    title: "Custom Buffer & Lead Times",
    description: "Set buffer times between appointments and daily booking caps so your team never gets overbooked.",
    Preview: BufferPreview,
  },
  {
    icon: MessageSquare,
    title: "Intelligent Intake Questions",
    description: "Collects client details, insurance info, or service requirements automatically before the slot is confirmed.",
    Preview: IntakePreview,
  },
]

const AUTOPLAY_MS = 500

export function FeatureExplorer() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  // A self-rescheduling timeout (not setInterval) so a manual click resets the countdown —
  // otherwise autoplay can yank the selection away moments after the user picks one themselves.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((i) => (i + 1) % features.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [Boolean(reduced)])

  const feature = features[active]
  const Preview = feature.Preview

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-4">
      {/* Feature list — no boxes, just an active-state rail */}
      <div className="lg:col-span-5">
        {features.map((f, i) => {
          const Icon = f.icon
          const isActive = i === active
          return (
            <button
              key={f.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "group flex w-full items-center gap-3.5 border-l-2 py-3.5 pl-4 text-left transition-all duration-100",
                isActive ? "border-primary" : "border-border/40 hover:border-border",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-100",
                  isActive ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground group-hover:text-foreground",
                )}
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <span className={cn("text-sm font-medium transition-colors duration-100", isActive ? "text-foreground" : "text-muted-foreground")}>
                {f.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detail panel — one large focal preview, not another card grid */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="flex min-h-[20rem] flex-col justify-center border-t border-border/50 py-10 lg:border-t-0 lg:border-l lg:py-0 lg:pl-12"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
              <feature.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-normal tracking-tight text-foreground">{feature.title}</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{feature.description}</p>
            <div className="mt-8">
              <Preview />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
