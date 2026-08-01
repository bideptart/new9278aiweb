"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Truck,
  RotateCcw,
  CreditCard,
  PhoneCall,
  Smartphone,
  Zap,
  ArrowRight,
  Play,
  Pause,
  Activity,
  CheckCheck,
  Bot,
  User,
  Package,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function EcommerceOrderDispatchMatrix() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const modules = [
    {
      id: "cod-verification",
      title: "COD Verification & Fraud Guard",
      tag: "RTO REDUCTION ENGINE",
      badge: "45% RTO REDUCTION",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40",
      description:
        "Automatically calls COD buyers 5 seconds after checkout to confirm order details, address accuracy, and delivery intent before dispatching inventory.",
      orderNo: "Shopify #SHP-8921",
      customer: "Amitabh Malhotra · Mumbai",
      item: "Nike Air Max 270 (Size 10) · ₹12,995 COD",
      voiceCall: {
        agent: "“Hi Amitabh! Confirming your COD order for Nike Air Max 270. Should we dispatch to Bandra West address?”",
        customer: "“Yes, please confirm! Will be available on Saturday.”",
        status: "COD Verified · Address Pinned · Dispatched to Shiprocket",
      },
      stats: [
        { label: "RTO Reduction", value: "45%" },
        { label: "Verification Time", value: "< 8 sec" },
        { label: "Courier Savings", value: "₹45k / mo" },
      ],
    },
    {
      id: "wismo-tracking",
      title: "Instant WISMO Order Tracking",
      tag: "SHIPROCKET & DELHIVERY SYNC",
      badge: "SUB-250ms API LOOKUP",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40",
      description:
        "Answers 'Where is my order?' calls instantly by connecting to your logistics API and sharing live courier location without human intervention.",
      orderNo: "Shopify #SHP-9043",
      customer: "Sneha Roy · Bangalore",
      item: "Organic Skincare Serum Kit · ₹3,499 Prepaid",
      voiceCall: {
        agent: "“Hi Sneha! Your order #9043 is out for delivery with Delhivery. Rider Rajesh will arrive before 4 PM today!”",
        customer: "“Great! Can I get the rider's phone number?”",
        status: "Live Tracking Synced · WhatsApp Map Pin Sent",
      },
      stats: [
        { label: "Support Tickets Saved", value: "85%" },
        { label: "API Sync Latency", value: "180ms" },
        { label: "Customer CSAT", value: "4.9 / 5" },
      ],
    },
    {
      id: "returns-exchanges",
      title: "Automated Return & Size Exchange",
      tag: "ZERO-FRICTION RETURNS",
      badge: "REVERSE PICKUP GENERATED",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40",
      description:
        "Qualifies return reasons, verifies policy eligibility, creates reverse pickup labels, and offers instant size exchanges over a 30-second voice call.",
      orderNo: "Shopify #SHP-9102",
      customer: "Karan Patel · Ahmedabad",
      item: "Slim Fit Linen Blazer (Size M) · ₹7,999",
      voiceCall: {
        agent: "“Hi Karan! Need a size exchange for your Linen Blazer? Size L is in stock and can be delivered on Thursday!”",
        customer: "“Yes, Size M is tight. Please exchange for L.”",
        status: "Exchange Approved · Pickup Scheduled for Tomorrow",
      },
      stats: [
        { label: "Return Processing", value: "30 sec" },
        { label: "Inventory Saved", value: "92%" },
        { label: "Exchange Upsell", value: "+28%" },
      ],
    },
    {
      id: "prepaid-conversion",
      title: "COD to Prepaid WhatsApp Converter",
      tag: "CASH FLOW ACCELERATOR",
      badge: "+34% PREPAID CONVERSION",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/40",
      description:
        "Offers a 5% instant discount during the COD confirmation call and sends a direct Razorpay UPI payment link via WhatsApp while on the phone.",
      orderNo: "Shopify #SHP-9234",
      customer: "Deepika Sharma · Delhi",
      item: "Wireless Noise-Canceling Earbuds · ₹6,999",
      voiceCall: {
        agent: "“Deepika, if you convert to UPI payment right now, we’ll apply ₹350 instant discount and priority dispatch!”",
        customer: "“That sounds good, send me the UPI link on WhatsApp.”",
        status: "Razorpay Link Delivered · ₹350 Discount Applied",
      },
      stats: [
        { label: "Prepaid Conversion", value: "+34%" },
        { label: "Cash Flow Boost", value: "2.4x" },
        { label: "RTO Prevented", value: "100%" },
      ],
    },
  ]

  // Auto-cycle tabs every 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % modules.length)
      }, 3000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, modules.length])

  const curModule = modules[activeTab]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Light Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent blur-3xl opacity-60"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 shadow-xs">
          <ShoppingBag className="size-3.5 text-rose-500 animate-pulse" />
          <span>SHOPIFY & LOGISTICS VOICE DISPATCH MATRIX</span>
        </span>
        <h2 className="mt-4 text-balance text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground leading-[1.1]">
          Automated order verification, tracking & <span className="italic text-rose-600 dark:text-rose-400">RTO defense hub.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Power your e-commerce store with 24/7 AI voice dispatchers that verify COD orders, track packages, handle returns, and convert buyers to prepaid.
        </p>
      </div>

      {/* Module Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {modules.map((mod, idx) => {
          const isSelected = activeTab === idx
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                setActiveTab(idx)
                setIsPlaying(false)
              }}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md",
                isSelected
                  ? "border-rose-300 dark:border-rose-700 bg-rose-50/90 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 shadow-md scale-[1.02]"
                  : "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-muted-foreground hover:text-foreground hover:bg-rose-50/40 dark:hover:bg-rose-950/20 hover:border-rose-200 dark:hover:border-rose-900/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider", isSelected ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground")}>
                  MODULE 0{idx + 1}
                </span>
                <span className={cn("size-2 rounded-full", isSelected ? "bg-rose-500 animate-ping" : "bg-slate-300 dark:bg-slate-700")} />
              </div>

              <div>
                <p className={cn("text-xs md:text-sm font-bold leading-tight", isSelected ? "text-rose-900 dark:text-rose-100" : "text-foreground")}>
                  {mod.title}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeModuleIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Main Glassmorphic Display Card */}
      <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 md:p-10 shadow-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={curModule.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-xs", curModule.badgeColor)}>
                <Sparkles className="size-3.5" />
                <span>{curModule.badge}</span>
              </span>

              <h3 className="text-2xl md:text-3xl font-serif font-normal text-foreground leading-tight">
                {curModule.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {curModule.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {curModule.stats.map((st, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 backdrop-blur-md shadow-xs">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">{st.label}</p>
                    <p className="text-base font-bold text-rose-600 dark:text-rose-400 mt-1">{st.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Live Call Preview Card */}
            <div className="lg:col-span-7">
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 shadow-lg backdrop-blur-xl space-y-4">
                {/* Header & Controls */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                      Live E-Commerce Voice Agent
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40 hover:bg-rose-100 transition-colors cursor-pointer"
                    title={isPlaying ? "Pause Auto-Cycle" : "Play Auto-Cycle"}
                  >
                    {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  </button>
                </div>

                {/* Order Details Chip */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between text-xs">
                  <div>
                    <p className="font-mono font-bold text-rose-600 dark:text-rose-400">{curModule.orderNo}</p>
                    <p className="text-[11px] text-muted-foreground font-medium">{curModule.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground truncate max-w-[200px]">{curModule.item}</p>
                  </div>
                </div>

                {/* Agent & Customer Bubbles */}
                <div className="space-y-3 pt-1">
                  {/* Agent Bubble */}
                  <div className="flex items-start gap-2.5 max-w-[92%]">
                    <div className="size-7 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="size-4" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-xs bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-foreground font-medium leading-relaxed">
                      <p className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 mb-0.5">9278 Voice AI Agent</p>
                      {curModule.voiceCall.agent}
                    </div>
                  </div>

                  {/* Customer Bubble */}
                  <div className="flex items-start gap-2.5 max-w-[92%] ml-auto flex-row-reverse">
                    <div className="size-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0 shadow-xs border border-slate-200 dark:border-slate-700">
                      <User className="size-4" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tr-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-foreground font-medium leading-relaxed text-right shadow-xs">
                      <p className="text-[10px] font-mono text-muted-foreground mb-0.5">Customer Response</p>
                      {curModule.voiceCall.customer}
                    </div>
                  </div>
                </div>

                {/* Status Result Bar */}
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCheck className="size-4 text-emerald-500" />
                    {curModule.voiceCall.status}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full">Sub-250ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <Button asChild size="lg" className="btn-ai h-12 rounded-full px-8 shadow-md font-bold cursor-pointer">
          <Link href="/get-started?industry=ecommerce">
            Deploy E-Commerce Voice Agent <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
