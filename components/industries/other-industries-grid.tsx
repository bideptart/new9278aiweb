"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Check, Sparkles, ArrowUpRight, HelpCircle, DollarSign, Home, Stethoscope, Wrench, UtensilsCrossed, GraduationCap, Car, Scale, ShoppingBag, Dumbbell, HeartPulse } from "lucide-react"
import { INDUSTRIES, getIndustry, Industry } from "@/lib/industries"
import { cn } from "@/lib/utils"

type Props = {
  currentSlug: string
}

export function OtherIndustriesGrid({ currentSlug }: Props) {
  // Get sibling industries excluding current slug
  const siblings = INDUSTRIES.filter((i) => i.slug !== currentSlug)

  // Pick offset depending on currentSlug to make every page show distinct industries!
  let offset = 0
  if (currentSlug === "finance") offset = 4 // Picks Legal, Automotive, Education, Ecommerce
  else if (currentSlug === "home-services") offset = 4 // Picks Automotive, Legal, Education, Ecommerce
  else if (currentSlug === "ecommerce") offset = 2 // Picks Healthcare, Restaurants, Automotive, Legal
  else if (currentSlug === "real-estate") offset = 3 // Picks Restaurants, Automotive, Legal, Education

  const featIndustry = siblings[(offset + 0) % siblings.length] || siblings[0]
  const checklistIndustry = siblings[(offset + 1) % siblings.length] || siblings[1]
  const chatIndustry = siblings[(offset + 2) % siblings.length] || siblings[2]
  const textIndustry = siblings[(offset + 3) % siblings.length] || siblings[3]

  const FeatIcon = featIndustry.icon
  const CheckIcon = checklistIndustry.icon
  const ChatIcon = chatIndustry.icon
  const TextIcon = textIndustry.icon

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-border/40 overflow-hidden">
      {/* Ambient Red Glow Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 size-[600px] -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/15 via-rose-500/10 to-transparent blur-3xl opacity-70"
      />

      {/* Section Header */}
      <div className="mb-12">
        <span className="ai-pill-magenta text-[11px] font-bold tracking-wider mb-3">
          EXPLORE VERTICALS
        </span>
        <h2 className="text-3xl font-serif font-bold tracking-tight md:text-5xl text-foreground">
          Other industries <span className="bg-gradient-to-r from-primary via-rose-600 to-primary bg-clip-text text-transparent underline decoration-primary/30 underline-offset-8">we power</span>
        </h2>
        <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
          Pre-tuned playbooks for the calls your peers in adjacent verticals already automate.
        </p>
      </div>

      {/* Grid Layout (Matching Screenshot 1 & 2) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* ================= CARD 1: Featured Translucent Soft Rose Glass Card (Large) ================= */}
        <div className="md:col-span-7 group relative rounded-3xl border border-rose-200/80 dark:border-rose-900/50 bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:to-slate-950 backdrop-blur-2xl p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:border-rose-300 hover:shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Decorative Subtle Lattice Pattern */}
          <div className="pointer-events-none absolute inset-0 bg-lattice opacity-5" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 shadow-md">
                <FeatIcon className="size-6" />
              </div>
              <span className="rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 px-3.5 py-1 text-xs font-mono font-bold shadow-xs">
                Featured Playbook
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-foreground mb-3">
              AI voice agents for {featIndustry.name.toLowerCase()}
            </h3>

            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-xl mb-6 font-medium">
              {featIndustry.pitch}
            </p>

            {/* Pill Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                24/7 Calling
              </span>
              <span className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                Lead Qualify
              </span>
              <span className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                Appointment Booking
              </span>
            </div>
          </div>

          <Link
            href={`/industries/${featIndustry.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group-hover:translate-x-1 transition-transform"
          >
            Read more <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* ================= CARD 2: Feature Checklist Card ================= */}
        <div className="md:col-span-5 group rounded-3xl border border-white/80 dark:border-white/15 bg-card/85 backdrop-blur-2xl p-7 shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5 border border-primary/20">
              <CheckIcon className="size-5" />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
              AI voice agents for {checklistIndustry.name.toLowerCase()}
            </h3>

            <ul className="space-y-2.5 mb-6 text-xs text-muted-foreground">
              {checklistIndustry.jobs.slice(0, 3).map((job, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="size-4 text-primary shrink-0 stroke-[3] mt-0.5" />
                  <span className="leading-snug">{job}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/industries/${checklistIndustry.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group-hover:translate-x-1 transition-transform"
          >
            Read more <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* ================= CARD 3: Conversational Preview Card ================= */}
        <div className="md:col-span-4 group rounded-3xl border border-white/80 dark:border-white/15 bg-card/85 backdrop-blur-2xl p-6 shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20">
              <ChatIcon className="size-5" />
            </div>

            <h3 className="text-lg font-bold tracking-tight text-foreground mb-3">
              AI voice agents for {chatIndustry.name.toLowerCase()}
            </h3>

            {/* Conversation Snippet Bubble */}
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-xs text-foreground font-medium mb-4 space-y-1">
              <p className="text-[10px] font-bold text-primary">Sample Call Line</p>
              <p className="italic leading-relaxed">&ldquo;{chatIndustry.sampleLines[0]}&rdquo;</p>
            </div>
          </div>

          <Link
            href={`/industries/${chatIndustry.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group-hover:translate-x-1 transition-transform"
          >
            Read more <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* ================= CARD 4: Standard Description Card ================= */}
        <div className="md:col-span-4 group rounded-3xl border border-white/80 dark:border-white/15 bg-card/85 backdrop-blur-2xl p-6 shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20">
              <TextIcon className="size-5" />
            </div>

            <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
              AI voice agents for {textIndustry.name.toLowerCase()}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {textIndustry.short}
            </p>
          </div>

          <Link
            href={`/industries/${textIndustry.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group-hover:translate-x-1 transition-transform"
          >
            Read more <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* ================= CARD 5: Pricing Card ================= */}
        <div className="md:col-span-4 group rounded-3xl border border-primary/30 bg-card/85 backdrop-blur-2xl p-6 shadow-xl transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20">
              <DollarSign className="size-5" />
            </div>

            <p className="text-3xl font-bold font-serif tracking-tight text-foreground mb-1">
              $0.10 <span className="text-xs font-sans font-normal text-muted-foreground">/min</span>
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Three tiers from $20 to $100, with rates from $0.15 down to $0.10/min.
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group-hover:translate-x-1 transition-transform"
          >
            Compare plans <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* ================= CARD 6: FAQ Full-Width Banner (Matching Screenshot 2) ================= */}
        <div className="md:col-span-12 group rounded-3xl border border-white/80 dark:border-white/15 bg-card/85 backdrop-blur-2xl p-6 md:p-8 shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <HelpCircle className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold tracking-tight text-foreground">
                  FAQ — credit, phone numbers, compliance
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1 max-w-2xl">
                  Pricing, credit validity, phone numbers, HIPAA BAA compliance, and TCPA guardrails — answered.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="hidden sm:flex items-center gap-2">
                <span className="rounded-full bg-muted border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  Voice credit
                </span>
                <span className="rounded-full bg-muted border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  Phone numbers
                </span>
                <span className="rounded-full bg-muted border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  HIPAA BAA
                </span>
              </div>

              <Link
                href="/faq"
                className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform group-hover:translate-x-1"
                aria-label="Read FAQ"
              >
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
