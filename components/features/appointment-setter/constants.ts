/**
 * Shared script for the Appointment Setter hero.
 *
 * A single linear timeline drives three synced surfaces — the call
 * transcript, the calendar grid, and the SMS confirmation toast — so the
 * "conversation" and the "calendar" always agree on what's happening. Each
 * step lists which slot ids are being scanned ("checking"), which are the
 * narrowed-down options ("candidates"), and — on the final step — which
 * slot gets booked. HeroSplit walks this array on a timer and every child
 * component derives its visuals from the current step alone.
 */

export type SlotId = "9:00" | "10:00" | "11:30" | "1:00" | "2:00" | "3:00" | "3:30" | "4:30"

export type SlotDef = {
  id: SlotId
  label: string
  /** Baseline occupancy before the agent starts negotiating. */
  initial: "busy" | "free"
}

export const DAY_LABEL = "Thursday, Aug 6"

export const SLOTS: SlotDef[] = [
  { id: "9:00", label: "9:00 AM", initial: "busy" },
  { id: "10:00", label: "10:00 AM", initial: "free" },
  { id: "11:30", label: "11:30 AM", initial: "free" },
  { id: "1:00", label: "1:00 PM", initial: "busy" },
  { id: "2:00", label: "2:00 PM", initial: "free" },
  { id: "3:00", label: "3:00 PM", initial: "free" },
  { id: "3:30", label: "3:30 PM", initial: "free" },
  { id: "4:30", label: "4:30 PM", initial: "free" },
]

export type Step = {
  duration: number
  speaker: "caller" | "agent"
  line: string
  checking: SlotId[]
  candidates: SlotId[]
  booked?: SlotId
  toast: boolean
}

export const STEPS: Step[] = [
  {
    duration: 2600,
    speaker: "caller",
    line: "Do you have anything Thursday afternoon?",
    checking: [],
    candidates: [],
    toast: false,
  },
  {
    duration: 2200,
    speaker: "agent",
    line: "Let me check the calendar...",
    checking: ["2:00", "3:00", "3:30"],
    candidates: [],
    toast: false,
  },
  {
    duration: 2800,
    speaker: "agent",
    line: "I have 2:00 or 3:30 PM open — which works?",
    checking: [],
    candidates: ["2:00", "3:00", "3:30"],
    toast: false,
  },
  {
    duration: 2000,
    speaker: "caller",
    line: "3:00 works great, thanks!",
    checking: [],
    candidates: ["3:00"],
    toast: false,
  },
  {
    duration: 3600,
    speaker: "agent",
    line: "Perfect — you're all set for Thursday at 3:00 PM.",
    checking: [],
    candidates: [],
    booked: "3:00",
    toast: true,
  },
]

export type SlotStatus = "busy" | "free" | "checking" | "candidate" | "booked"

export function statusFor(slot: SlotDef, step: Step): SlotStatus {
  if (step.booked === slot.id) return "booked"
  if (step.checking.includes(slot.id)) return "checking"
  if (step.candidates.includes(slot.id)) return "candidate"
  return slot.initial
}
