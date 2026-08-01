"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import {
  Zap,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
  UserCheck,
  Mic,
  CheckCircle2,
  Database,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function RealEstatePlatformFeatures() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoCycling, setIsAutoCycling] = useState(true)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // Automatic 2-Second Step Highlight (NO CONTINUOUS SCROLL HIJACKING)
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoCycling) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 6)
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isAutoCycling])

  const steps = [
    {
      num: "01",
      title: "Instant Housing & 99acres Call Intake",
      subtitle: "Housing.com • MagicBricks • 99acres • Web Forms",
      desc: "Answers incoming property buyer enquiries from Housing.com, MagicBricks, and 99acres within 3 seconds 24/7.",
      icon: Zap,
      badge: "SUB-3s PORTAL INTAKE",
      preview: "Housing.com Enquiry ➔ AI Agent dialing buyer Rahul Deshmukh in 2.8s...",
    },
    {
      num: "02",
      title: "Instant AI Voice Qualification",
      subtitle: "Sub-250ms Audio Latency • 24/7 Availability",
      desc: "Handles inbound buyer inquiries naturally with instant context, answering property questions and qualifying buyers live on the call.",
      icon: Mic,
      badge: "24/7 AI VOICE AGENT",
      preview: "“Hello Rahul! Thanks for enquiring about the 2BHK in Kothrud — are you working with an agent yet?”",
    },
    {
      num: "03",
      title: "Budget & Home Loan Qualification",
      subtitle: "Pre-approved Loan • All-Cash • Possession Timeline",
      desc: "Captures target budget, home loan pre-approval status, and 30-day move-in timeline before assigning a Buyer Intent Score.",
      icon: UserCheck,
      badge: "BUYER SCORE 98/100",
      preview: "Target Budget: ₹1.25 Cr – ₹1.50 Cr • Loan: Pre-approved • Score: 98/100 High Intent",
    },
    {
      num: "04",
      title: "Broker Calendar & Site Tour Booking",
      subtitle: "Google Calendar & Outlook 2-Way Sync",
      desc: "Checks senior broker availability live on the call, locks in the site walkthrough slot, and sends calendar invites.",
      icon: Calendar,
      badge: "SITE WALKTHROUGH LOCKED",
      preview: "Site Walkthrough Confirmed for Saturday 11:00 AM ➔ Senior Broker Assigned",
    },
    {
      num: "05",
      title: "Instant WhatsApp Floor Plan & Pin Relay",
      subtitle: "PDF Floor Plans • Price Sheets • Google Maps Pin",
      desc: "Automatically sends property floor plans, price breakdowns, brochure PDFs, and site location pins via WhatsApp right after the call.",
      icon: MessageSquare,
      badge: "WHATSAPP DISPATCH",
      preview: "WhatsApp Sent: 2BHK FloorPlan.pdf + PriceSheet.pdf + Google Maps Site Pin ➔",
    },
    {
      num: "06",
      title: "Instant CRM & Lead Pipeline Sync",
      subtitle: "Salesforce • HubSpot • Custom Webhooks",
      desc: "Automatically syncs all qualified buyer details, call transcripts, audio logs, and site visit schedules directly into your CRM.",
      icon: Database,
      badge: "AUTOMATED CRM SYNC",
      preview: "Qualified Buyer Data & Call Transcript Synced to Salesforce & HubSpot CRM ➔ Broker Notified",
    },
  ]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-24 pb-20 md:px-6 md:pt-32 md:pb-32 border-t border-border/40 overflow-hidden">
      {/* Soft Glowing Ambient Red Mesh Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/25 via-rose-500/15 to-primary/10 blur-3xl opacity-80"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50 backdrop-blur-md">
          <Sparkles className="size-3.5 text-rose-500 animate-pulse" />
          LEAD TO SITE VISIT PIPELINE
        </span>
        <h2 className="text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground leading-[1.1]">
          How our AI voice engine <br className="hidden sm:inline" />
          <span className="italic text-rose-600 dark:text-rose-400">
            turns portal leads into booked site visits.
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          An automated 6-step voice AI pipeline highlighting active steps every 2 seconds.
        </p>
      </div>

      {/* 3D Pipeline Flow Auto-Cycling Every 2 Seconds */}
      <div className="relative">
        {/* Central Connecting Vertical Rose Line (Desktop) */}
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-rose-300 dark:bg-rose-800 hidden md:block rounded-full shadow-xs" />

        {/* Vertical Rose Line for Mobile Layout */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-rose-300 dark:bg-rose-800 md:hidden rounded-full shadow-xs" />

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isEven = idx % 2 === 0
            const isActive = activeStep === idx

            return (
              <div
                key={step.num}
                ref={(el) => {
                  stepRefs.current[idx] = el
                }}
                onMouseEnter={() => {
                  setActiveStep(idx)
                  setIsAutoCycling(false)
                }}
                onMouseLeave={() => setIsAutoCycling(true)}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center cursor-pointer group pl-12 md:pl-0 transform-gpu"
              >
                {/* Text Content Column */}
                <div
                  className={cn(
                    "md:col-span-5 space-y-2.5 text-left transition-all duration-300",
                    isEven ? "md:order-1 md:text-left" : "md:order-3 md:text-left"
                  )}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors duration-300 shadow-xs",
                        isActive
                          ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      STEP {step.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/30 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/40 uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "text-xl md:text-2xl font-serif font-bold transition-colors duration-300 leading-snug",
                      isActive ? "text-rose-600 dark:text-rose-400 scale-102" : "text-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400"
                    )}
                  >
                    {step.title}
                  </h3>

                  <p className="text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Center Soft Rose Pulsing Node */}
                <div className="absolute left-0 md:relative md:left-auto md:col-span-2 flex justify-center md:order-2">
                  <div
                    className={cn(
                      "relative size-12 md:size-14 rounded-2xl md:rounded-3xl bg-rose-500/15 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold shadow-xs transition-all duration-300 group-hover:scale-110",
                      isActive ? "scale-125 ring-4 ring-rose-500/20 bg-rose-500/25" : ""
                    )}
                  >
                    <Icon className="size-5 md:size-6 animate-pulse" />
                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                  </div>
                </div>

                {/* Live Engine Preview Light Glass Card */}
                <div
                  className={cn(
                    "md:col-span-5",
                    isEven ? "md:order-3" : "md:order-1"
                  )}
                >
                  <div
                    className={cn(
                      "relative rounded-2xl md:rounded-[2rem] border p-4 md:p-5 transition-all duration-300 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 shadow-md group-hover:border-rose-300 dark:group-hover:border-rose-800",
                      isActive
                        ? "border-rose-300 dark:border-rose-800 ring-2 ring-rose-500/20 shadow-lg scale-102 bg-rose-50/60 dark:bg-rose-950/20"
                        : "border-slate-200/80 dark:border-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className={cn("size-2 rounded-full bg-rose-500", isActive ? "animate-ping" : "")} />
                        <span className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider">
                          LIVE ENGINE PREVIEW
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">Real Estate Sync</span>
                    </div>

                    <div className="rounded-xl bg-rose-500/10 border border-rose-200 dark:border-rose-900/40 p-3 text-xs font-medium text-foreground italic leading-relaxed shadow-xs">
                      {step.preview}
                    </div>

                    {/* Subtle Interactive Footer */}
                    <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="size-3" />
                        Automated Real Estate Relay
                      </span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold group-hover:underline">Sub-250ms</span>
                    </div>

                    {/* Active Step Progress Indicator Bar (2s) */}
                    {isActive && isAutoCycling && (
                      <motion.span
                        key={activeStep}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                        className="absolute bottom-0 left-4 right-4 h-1 bg-rose-500 rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Light Rose Banner CTA */}
      <div className="mt-20 md:mt-24 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-5 rounded-3xl border border-rose-200/80 dark:border-rose-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="size-11 rounded-2xl bg-rose-500/15 border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Zap className="size-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Ready to automate your real estate lead pipeline?</h4>
              <p className="text-xs text-muted-foreground">Setup takes under 5 minutes with a single phone number.</p>
            </div>
          </div>

          <Button asChild size="lg" className="btn-ai h-11 rounded-full px-7 shadow-md font-bold cursor-pointer shrink-0 w-full sm:w-auto">
            <Link href="/get-started?industry=real-estate">
              Launch real estate agent <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
