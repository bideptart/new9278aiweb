"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  Check,
  Sparkles,
  Building2,
  PhoneForwarded,
  Calendar,
  DollarSign,
  UserCheck,
  Clock,
  Smartphone,
  CheckCheck,
  Zap,
  Activity,
  Award,
  Sliders,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function RealEstateAdvancedCapabilities() {
  // State for Interactive Buyer Qualification Profiles (Working & Auto-Cycling)
  const [activeProfileIdx, setActiveProfileIdx] = useState(0)
  const [isAutoCycling, setIsAutoCycling] = useState(true)

  const buyerProfiles = [
    {
      name: "High Intent Luxury Buyer",
      tag: "READY TO BUY",
      budget: "₹2.40 Cr",
      loan: 100,
      loanLabel: "VERIFIED (100%)",
      timeline: 90,
      timelineLabel: "15 DAYS POSSESSION",
      score: 98,
      scoreLabel: "98 / 100 HIGH INTENT",
      color: "from-primary to-rose-600",
    },
    {
      name: "NRI Investor Lead",
      tag: "ALL-CASH BUYER",
      budget: "₹3.80 Cr",
      loan: 100,
      loanLabel: "ALL-CASH FUNDED",
      timeline: 70,
      timelineLabel: "30 DAYS CLOSING",
      score: 94,
      scoreLabel: "94 / 100 INVESTOR",
      color: "from-rose-600 to-rose-700",
    },
    {
      name: "First-Time Homebuyer",
      tag: "PRE-APPROVED LOAN",
      budget: "₹1.15 Cr",
      loan: 85,
      loanLabel: "HDFC APPROVED (85%)",
      timeline: 60,
      timelineLabel: "45 DAYS TIMELINE",
      score: 89,
      scoreLabel: "89 / 100 QUALIFIED",
      color: "from-primary to-rose-500",
    },
  ]

  // Automatic 2.5-Second Rotation across Buyer Profiles
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoCycling) {
      interval = setInterval(() => {
        setActiveProfileIdx((prev) => (prev + 1) % buyerProfiles.length)
      }, 2500)
    }
    return () => clearInterval(interval)
  }, [isAutoCycling, buyerProfiles.length])

  const curProfile = buyerProfiles[activeProfileIdx]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-32 border-t border-border/40 overflow-hidden">
      {/* Soft Glowing 3D Ambient Red Mesh Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 size-[800px] -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/25 via-rose-500/15 to-transparent blur-3xl opacity-80"
      />

      {/* Section Header */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 mb-4 shadow-xs border border-rose-200 dark:border-rose-900/50 backdrop-blur-md">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          ENTERPRISE REAL ESTATE AI ENGINE
        </span>
        <h2 className="text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground leading-tight">
          Advanced Real Estate AI Capabilities <br className="hidden sm:inline" />
          <span className="italic text-rose-400 dark:text-rose-400">
            Interactive live qualification matrix.
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Scale your real estate operations with 24/7 lead intake, live broker calendar booking, instant WhatsApp relays, and automated warm handoffs.
        </p>
      </div>

      {/* Spatial Glass Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* ================= FEATURE 1: 24/7 After-Hours Lead Capture & WhatsApp Relay (Hero Card) ================= */}
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:col-span-7 group relative rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-8 shadow-xl hover:border-rose-300 dark:hover:border-rose-800 transition-all duration-300 flex flex-col justify-between overflow-hidden transform-gpu"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative size-14 rounded-2xl bg-rose-500/15 border border-rose-200 dark:border-rose-800 text-rose-400 dark:text-rose-400 flex items-center justify-center shadow-xs">
                <Clock className="size-7 animate-pulse" />
                <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 px-3.5 py-1 text-xs font-mono font-bold shadow-xs">
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                24/7/365 INBOUND AGENT
              </span>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground mb-3">
                After-hours & weekend lead capture
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium">
                Over 60% of property buyer inquiries happen after 7 PM and on weekends. 9278.ai answers every incoming call within 3 seconds, qualifies budget & loan status, and dispatches WhatsApp floor plans automatically.
              </p>
            </div>

            {/* Live WhatsApp Dispatch Glass Ribbon */}
            <div className="p-4.5 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 shadow-sm backdrop-blur-xl space-y-2 relative overflow-hidden group-hover:border-rose-300 dark:group-hover:border-rose-800 transition-colors">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-rose-400 dark:text-rose-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="size-3.5 text-emerald-500 animate-bounce" />
                  WHATSAPP AUTOMATION RELAY
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCheck className="size-3.5 stroke-[3]" /> Delivered
                </span>
              </div>
              <p className="text-xs text-foreground font-mono font-medium">
                “Sent 2BHK FloorPlan.pdf + Location Pin to Rahul Deshmukh (+91 98230XXXXX)”
              </p>
            </div>

            {/* Soft Rose Pill Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full bg-rose-500/10 text-rose-400 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 px-3 py-1 text-xs font-bold font-mono shadow-xs">
                ✓ 24/7 Availability
              </span>
              <span className="rounded-full bg-rose-500/10 text-rose-400 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 px-3 py-1 text-xs font-bold font-mono shadow-xs">
                ✓ WhatsApp PDF Relay
              </span>
              <span className="rounded-full bg-rose-500/10 text-rose-400 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 px-3 py-1 text-xs font-bold font-mono shadow-xs">
                ✓ Google Maps Pins
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <Link
              href="/get-started?industry=real-estate"
              className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 dark:text-rose-400 hover:underline group-hover:translate-x-1 transition-transform"
            >
              Deploy 24/7 Inbound Agent <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        {/* ================= FEATURE 2: 3D INTERACTIVE BUYER QUALIFICATION MATRIX ================= */}
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:col-span-5 group rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-7 shadow-xl hover:border-rose-300 dark:hover:border-rose-800 transition-all duration-300 flex flex-col justify-between transform-gpu"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
                <UserCheck className="size-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rose-400 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Activity className="size-3 animate-pulse text-rose-300" /> LIVE SCORING ENGINE
              </span>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold tracking-tight text-foreground mb-1">
                Automated buyer qualification standards
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                Click a profile tab below to see live score changes in real time.
              </p>
            </div>

            {/* Interactive Buyer Profile Selection Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              {buyerProfiles.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveProfileIdx(idx)
                    setIsAutoCycling(false)
                  }}
                  className={cn(
                    "flex-1 py-1.5 text-[10px] font-mono font-bold rounded-lg transition-all duration-200 cursor-pointer text-center border",
                    activeProfileIdx === idx
                      ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-xs"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  )}
                >
                  P0{idx + 1}
                </button>
              ))}
            </div>

            {/* DYNAMIC PROGRESS METERS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={curProfile.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-xs font-bold border-b border-rose-200/60 dark:border-rose-900/30 pb-2">
                  <span className="text-foreground flex items-center gap-1.5">
                    <Award className="size-3.5 text-rose-300" />
                    {curProfile.name}
                  </span>
                  <span className="text-rose-400 dark:text-rose-400 font-mono text-[11px] bg-rose-500/10 border border-rose-200 dark:border-rose-800/40 px-2 py-0.5 rounded-full">
                    {curProfile.tag} • {curProfile.budget}
                  </span>
                </div>

                {/* Progress Bar 1: Home Loan Pre-Approval */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono font-bold mb-1.5">
                    <span className="text-muted-foreground">HOME LOAN PRE-APPROVAL</span>
                    <span className="text-rose-400 dark:text-rose-400 font-bold">{curProfile.loanLabel}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${curProfile.loan}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-rose-400 dark:bg-rose-500 rounded-full shadow-xs"
                    />
                  </div>
                </div>

                {/* Progress Bar 2: Target Timeline */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono font-bold mb-1.5">
                    <span className="text-muted-foreground">TARGET POSSESSION TIMELINE</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{curProfile.timelineLabel}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${curProfile.timeline}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full shadow-xs"
                    />
                  </div>
                </div>

                {/* Progress Bar 3: Buyer Intent Score */}
                <div>
                  <div className="flex justify-between text-[10px] font-mono font-bold mb-1.5">
                    <span className="text-muted-foreground">BUYER INTENT SCORE</span>
                    <span className="text-rose-400 dark:text-rose-400 font-bold">{curProfile.scoreLabel}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${curProfile.score}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-rose-500 rounded-full shadow-xs"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <Link
              href="/get-started?industry=real-estate"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 dark:text-rose-400 hover:underline group-hover:translate-x-1 transition-transform"
            >
              Learn qualification criteria <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ================= FEATURE 3: Broker Calendar Sync Card ================= */}
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:col-span-4 group rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-md hover:border-rose-300 dark:hover:border-rose-800 transition-all duration-300 flex flex-col justify-between transform-gpu"
        >
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
              <Calendar className="size-6" />
            </div>

            <h3 className="text-lg font-serif font-bold tracking-tight text-foreground">
              Broker calendar & tour dispatch
            </h3>

            <p className="text-muted-foreground text-xs leading-relaxed font-medium">
              2-way Google & Outlook Calendar sync for senior brokers. Reserves 30-min walkthrough slots and dispatches automated SMS reminders 2 hours prior to the site visit.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <Link
              href="/get-started?industry=real-estate"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 dark:text-rose-400 hover:underline group-hover:translate-x-1 transition-transform"
            >
              Read calendar specs <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ================= FEATURE 4: Live Sales Manager Warm Transfer ================= */}
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:col-span-4 group rounded-[2.5rem] border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-md hover:border-rose-300 dark:hover:border-rose-800 transition-all duration-300 flex flex-col justify-between transform-gpu"
        >
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
              <PhoneForwarded className="size-6" />
            </div>

            <h3 className="text-lg font-serif font-bold tracking-tight text-foreground">
              Live sales manager warm transfer
            </h3>

            <p className="text-muted-foreground text-xs leading-relaxed font-medium">
              High-intent buyers (₹2 Cr+ budget or cash buyers) are warm-transferred live to the senior sales manager in under 3 seconds with full conversation context.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <Link
              href="/get-started?industry=real-estate"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 dark:text-rose-400 hover:underline group-hover:translate-x-1 transition-transform"
            >
              Read handoff specs <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* ================= FEATURE 5: Real Estate Pricing Card ================= */}
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:col-span-4 group rounded-[2.5rem] border border-rose-200/80 dark:border-rose-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-md hover:border-rose-300 dark:hover:border-rose-800 transition-all duration-300 flex flex-col justify-between transform-gpu"
        >
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
              <DollarSign className="size-6" />
            </div>

            <div>
              <p className="text-3xl font-serif font-bold text-foreground tracking-tight">
                ₹10 <span className="text-xs text-muted-foreground font-sans font-normal">/ min</span>
              </p>
              <p className="text-[10px] font-mono font-bold text-rose-400 dark:text-rose-400 uppercase mt-0.5">TRANSPARENT BILLING</p>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed font-medium">
              Transparent pay-as-you-go rate for real estate teams. Zero setup fees, up to 40 concurrent lines, and 99.9% SLA uptime.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 dark:text-rose-400 hover:underline group-hover:translate-x-1 transition-transform"
            >
              View pricing plans <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-16 text-center">
        <Button asChild size="lg" className="btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md font-bold cursor-pointer">
          <Link href="/get-started?industry=real-estate">
            Deploy Real Estate Engine <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
