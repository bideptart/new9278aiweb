"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShoppingBag,
  Sparkles,
  Percent,
  CheckCircle2,
  PhoneCall,
  Gift,
  ArrowRight,
  Play,
  Pause,
  Bot,
  User,
  Zap,
  Tag,
  Volume2,
  Check,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function EcommerceCartRecoverySuite() {
  const [activeScenario, setActiveScenario] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const scenarios = [
    {
      id: "cart-recovery",
      title: "High-Value Abandoned Cart Recovery",
      tag: "32% RECOVERY RATE",
      cartValue: "₹14,999",
      cartItems: "Premium Noise-Canceling Headphones",
      shopper: "Ananya Roy · Mumbai",
      abandonedTime: "12 mins ago",
      badge: "High Intent Buyer",
      agentText: "“Hi Ananya! I noticed you left the Headphones in your cart. If you checkout right now, I’ll add a free leather travel pouch worth ₹1,200!”",
      shopperText: "“That sounds great! Please confirm the order with free pouch.”",
      outcome: "Cart Recovered · Order #RE-9012 Confirmed · Free Gift Added",
      stats: [
        { label: "Cart Recoveries", value: "+32%" },
        { label: "Call Latency", value: "< 240ms" },
        { label: "Avg Revenue Boost", value: "₹4,200 / call" },
      ],
    },
    {
      id: "instant-coupon",
      title: "Voice-Activated Flash Coupon Relay",
      tag: "INSTANT PROMO CONVERSION",
      cartValue: "₹6,499",
      cartItems: "Organic Silk Saree (Pastel Pink)",
      shopper: "Priya Sharma · Delhi",
      abandonedTime: "8 mins ago",
      badge: "Price-Sensitive Shopper",
      agentText: "“Hello Priya! I can apply an exclusive 10% instant promo code `SAVE10` + Free Express Shipping. Sending WhatsApp link now!”",
      shopperText: "“Awesome, clicking the link now to pay via UPI.”",
      outcome: "WhatsApp Payment Link Delivered · 10% Promo Applied",
      stats: [
        { label: "Checkout Speed", value: "< 45 sec" },
        { label: "WhatsApp CTR", value: "88%" },
        { label: "Promo Conversion", value: "4.1x" },
      ],
    },
    {
      id: "size-fit-consultant",
      title: "AI Voice Size & Fit Advisor",
      tag: "FIT & RETURNS DEFENSE",
      cartValue: "₹9,800",
      cartItems: "Italian Wool Tailored Suit",
      shopper: "Vikram Mehta · Gurgaon",
      abandonedTime: "15 mins ago",
      badge: "Fit Hesitation Detected",
      agentText: "“Hi Vikram! For a 42-inch chest, 42R slim fit gives an Italian tailored drape. Updating your cart size to 42R right now!”",
      shopperText: "“Perfect, update it to 42R and send invoice.”",
      outcome: "Size Adjusted to 42R · Zero Return Risk · Order Placed",
      stats: [
        { label: "Size Return Rate", value: "-78%" },
        { label: "Buyer Confidence", value: "99.4%" },
        { label: "AOV Increase", value: "+18%" },
      ],
    },
    {
      id: "vip-concierge",
      title: "VIP Back-in-Stock Voice Concierge",
      tag: "HIGH-MARGIN CONCIERGE",
      cartValue: "₹24,500",
      cartItems: "Limited Edition Chronograph Watch",
      shopper: "Rohan Kapoor · Pune",
      abandonedTime: "2 mins ago",
      badge: "VIP Waitlist Buyer",
      agentText: "“Hello Rohan! The Chronograph Watch just restocked with 5 units. I’ve added custom R.K. engraving at zero cost & reserved it!”",
      shopperText: "“Thank you so much! Paying right away via UPI.”",
      outcome: "VIP Stock Reserved · Engraving Added · Paid via UPI",
      stats: [
        { label: "Pre-order Sales", value: "₹1.2M / mo" },
        { label: "VIP Retention", value: "95%" },
        { label: "Reservation Speed", value: "Instant" },
      ],
    },
  ]

  // Auto-cycle scenarios every 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveScenario((prev) => (prev + 1) % scenarios.length)
      }, 3000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, scenarios.length])

  const cur = scenarios[activeScenario]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Background Soft Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent blur-3xl opacity-20"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
          <Gift className="size-3.5 text-rose-300 animate-bounce" />
          <span>AUTOMATED CART RECOVERY & VOICE SALES ENGINE</span>
        </span>
        <h2 className="mt-4 text-balance text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground leading-[1.1]">
          Turn high-intent cart abandoners into <span className="italic text-rose-400 dark:text-rose-400">instant paid orders.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Our AI Voice Concierge dials shoppers minutes after they abandon their cart, answers fit questions, offers customized promo codes, and texts 1-click checkout links.
        </p>
      </div>

      {/* Completely Open Fluid Layout — NO Enclosing Box! */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Open Interactive Timeline Steps */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              SELECT RECOVERY SCENARIO
            </span>
          </div>

          <div className="space-y-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-rose-200 dark:before:bg-rose-900/40">
            {scenarios.map((sc, idx) => {
              const isSelected = activeScenario === idx
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    setActiveScenario(idx)
                    setIsPlaying(false)
                  }}
                  className={cn(
                    "w-full text-left pl-12 pr-4 py-3.5 rounded-2xl transition-all duration-300 relative cursor-pointer font-medium flex flex-col gap-1",
                    isSelected
                      ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 font-bold scale-[1.01]"
                      : "text-muted-foreground hover:text-rose-400 dark:hover:text-rose-400 hover:bg-rose-50/40 dark:hover:bg-rose-950/20"
                  )}
                >
                  {/* Step Node Dot */}
                  <span
                    className={cn(
                      "absolute left-3.5 top-1/2 -translate-y-1/2 size-3 rounded-full transition-all duration-300 border-2",
                      isSelected
                        ? "bg-rose-500 border-rose-200 dark:border-rose-900 ring-4 ring-rose-500/20 scale-125"
                        : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    )}
                  />

                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold truncate">{sc.title}</span>
                    <span className="text-[10px] font-mono font-bold text-rose-400 dark:text-rose-400 shrink-0">{sc.cartValue}</span>
                  </div>

                  <p className="text-[11px] text-muted-foreground font-normal line-clamp-1">
                    {sc.cartItems} · {sc.shopper}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Open Floating Speech Bubbles & Stats (No outer box!) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Info Tag */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 px-3.5 py-1 text-xs font-mono font-bold text-rose-400 dark:text-rose-400 shadow-xs">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE CALL PREVIEW · {cur.shopper}</span>
            </span>

            <span className="text-xs font-mono font-bold text-muted-foreground">
              Abandoned {cur.abandonedTime}
            </span>
          </div>

          {/* Floating Dialogue Speech Bubbles (Directly on canvas) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Cart Snapshot Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs font-medium shadow-xs">
                <ShoppingBag className="size-4 text-rose-300 shrink-0" />
                <span className="text-foreground font-semibold">{cur.cartItems}</span>
                <span className="font-mono font-bold text-rose-400 dark:text-rose-400">({cur.cartValue})</span>
              </div>

              {/* Agent Bubble (Floating) */}
              <div className="flex items-start gap-3 max-w-[92%]">
                <div className="size-9 rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Bot className="size-4.5" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-xs bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs md:text-sm text-foreground font-medium leading-relaxed shadow-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-rose-400 dark:text-rose-400 mb-1">
                    <span>9278 Voice AI Concierge</span>
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">Sub-240ms</span>
                  </div>
                  {cur.agentText}
                </div>
              </div>

              {/* Shopper Response Bubble (Floating) */}
              <div className="flex items-start gap-3 max-w-[92%] ml-auto flex-row-reverse">
                <div className="size-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0 shadow-xs border border-slate-200 dark:border-slate-700 mt-0.5">
                  <User className="size-4.5" />
                </div>
                <div className="p-4 rounded-2xl rounded-tr-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs md:text-sm text-foreground font-medium leading-relaxed text-right shadow-xs">
                  <div className="text-[10px] font-mono text-muted-foreground mb-1">
                    Shopper Answer
                  </div>
                  {cur.shopperText}
                </div>
              </div>

              {/* Outcome Badge */}
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between shadow-xs">
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500 stroke-[3]" />
                  <span>{cur.outcome}</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full font-sans font-bold">SUCCESS</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Open Stats Nodes (No surrounding card box!) */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {cur.stats.map((st, i) => (
              <div key={i} className="text-center p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-200/60 dark:border-rose-900/30">
                <p className="text-[10px] font-mono text-muted-foreground uppercase">{st.label}</p>
                <p className="text-lg md:text-xl font-serif font-bold text-rose-400 dark:text-rose-400 mt-0.5">{st.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-14 text-center">
        <Button asChild size="lg" className="btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md font-bold cursor-pointer">
          <Link href="/get-started?industry=ecommerce">
            Deploy E-Commerce Voice Agent <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
