"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sparkles,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  ArrowRight,
  RefreshCw,
  Clock,
  PackageCheck,
  Play,
  Pause,
  Activity,
  Mic,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function EcommerceConversionEngine() {
  // Master unified step index: 0 to 15 (4 features x 4 steps)
  const [globalIndex, setGlobalIndex] = useState(0)
  const [isLivePlaying, setIsLivePlaying] = useState(true)

  const features = [
    {
      id: "cart-recovery",
      badge: "REVENUE RECOVERY",
      title: "Abandoned Checkout Voice Recovery",
      description:
        "When a high-value customer abandons checkout, 9278 AI automatically places a polite voice check-in call within 15 minutes to answer questions, offer phone promo codes, and complete orders over the phone.",
      metric: "+24.8%",
      metricLabel: "Recovered Cart Revenue",
      icon: ShoppingCart,
      badgeClass: "bg-primary/10 text-primary border-primary/30",
      workflow: [
        { label: "Checkout Abandoned", sub: "$180 Nike Air Max in Cart", details: "Cart dropped 12 mins ago" },
        { label: "AI Voice Call Triggered", sub: "Outbound Voice AI Dialed", details: "Sub-250ms voice latency" },
        { label: "Phone Discount Applied", sub: "5% Promo Code Offered", details: "Instant caller verification" },
        { label: "Order Recovered", sub: "Shopify Sync Complete", details: "Payment link sent via SMS" },
      ],
      stats: [
        { label: "Avg. Call Duration", value: "48s" },
        { label: "Recovery Rate", value: "24.8%" },
        { label: "Shopify Discount", value: "Instant" },
      ],
    },
    {
      id: "wismo",
      badge: "SUPPORT AUTOMATION",
      title: "24/7 Automated WISMO (Where Is My Order?)",
      description:
        "80% of e-commerce support calls are simple status checks. 9278 AI connects to BlueDart, FedEx & Shiprocket APIs to tell callers exact package ETA and dispatch live GPS tracking to WhatsApp.",
      metric: "88%",
      metricLabel: "Ticket Volume Reduced",
      icon: Truck,
      badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
      workflow: [
        { label: "Inbound Customer Call", sub: "“Where is #ORD-9824?”", details: "Caller ID auto-matched" },
        { label: "Courier API Lookup", sub: "BlueDart Live Dispatch", details: "Real-time API response" },
        { label: "Voice ETA Delivered", sub: "“Out for delivery by 4 PM”", details: "Natural voice response" },
        { label: "WhatsApp GPS Dispatched", sub: "Live Courier Tracking Link", details: "Instant WhatsApp message" },
      ],
      stats: [
        { label: "API Lookup Speed", value: "120ms" },
        { label: "Resolution Rate", value: "99.4%" },
        { label: "Agent Cost Saved", value: "$4.20/call" },
      ],
    },
    {
      id: "returns",
      badge: "INSTANT LOGISTICS",
      title: "Automated Return & Exchange Engine",
      description:
        "Turn costly returns into instant exchanges over voice. Callers swap sizes or colors verbally while the AI updates Shopify, generates prepaid return QR codes on WhatsApp, and schedules pickups.",
      metric: "< 45s",
      metricLabel: "Avg. Exchange Resolution",
      icon: RotateCcw,
      badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      workflow: [
        { label: "Return Request Call", sub: "Size Exchange Needed", details: "Medium → Small requested" },
        { label: "Inventory Auto-Checked", sub: "Size Small Available", details: "Shopify stock confirmed" },
        { label: "Cart & Order Swapped", sub: "Shopify Order Updated", details: "Zero-clutter exchange" },
        { label: "WhatsApp QR Label Sent", sub: "Prepaid Pickup Scheduled", details: "Courier notified" },
      ],
      stats: [
        { label: "Exchange vs Return", value: "68% Saved" },
        { label: "Customer Rating", value: "98.5%" },
        { label: "Label Gen Speed", value: "Instant" },
      ],
    },
    {
      id: "cod-guard",
      badge: "RTO LOSS PREVENTION",
      title: "COD Verification & RTO Fraud Guard",
      description:
        "Eliminate expensive Return-To-Origin (RTO) shipping losses. 9278 AI automatically calls COD customers before shipping to verify delivery address and purchase intent, slashing failed deliveries.",
      metric: "32%",
      metricLabel: "RTO Shipping Loss Cut",
      icon: ShieldCheck,
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      workflow: [
        { label: "COD Order Placed", sub: "Unverified Address", details: "$120 COD Order" },
        { label: "Automated Voice Call", sub: "Address Verification", details: "Outbound verification call" },
        { label: "Customer Confirmed", sub: "Voice Verified: 'Yes'", details: "Intent & address locked" },
        { label: "Priority Dispatch", sub: "0% RTO Risk Marked", details: "Shopify status updated" },
      ],
      stats: [
        { label: "Verification Accuracy", value: "99.8%" },
        { label: "RTO Reduction", value: "-32%" },
        { label: "Margin Saved", value: "14.2%" },
      ],
    },
  ]

  const totalSteps = features.length * 4 // 16 total steps
  const activeTab = Math.floor(globalIndex / 4) % features.length
  const activeStep = globalIndex % 4

  // Master serial timer: advances globalIndex strictly by 1 every 2.2 seconds (2200ms)
  useEffect(() => {
    if (!isLivePlaying) return
    const timer = setInterval(() => {
      setGlobalIndex((prev) => (prev + 1) % totalSteps)
    }, 2200)
    return () => clearInterval(timer)
  }, [isLivePlaying, totalSteps])

  const curFeature = features[activeTab]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Soft Light Rose Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent blur-3xl opacity-20"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 dark:border-rose-900/50 bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-400 shadow-xs">
          <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
          <span>E-COMMERCE VOICE REVENUE & AUTOMATION ENGINE</span>
        </span>
        <h2 className="mt-4 text-balance text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground leading-[1.1]">
          Turn missed calls & abandoned checkouts into <span className="italic text-rose-400 dark:text-rose-400">pure revenue.</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Connect 9278 Voice AI to Shopify, WooCommerce & Custom ERPs to handle support inquiries, recover lost sales, and verify COD orders 24/7.
        </p>
      </div>

      {/* Feature Selector Tabs (Light Rose Tints & Soft Hover Effects) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {features.map((feat, idx) => {
          const isSelected = activeTab === idx
          const Icon = feat.icon
          return (
            <button
              key={feat.id}
              type="button"
              onClick={() => {
                setGlobalIndex(idx * 4) // Jump directly to Tab idx, Step 01
              }}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md",
                isSelected
                  ? "border-rose-300 dark:border-rose-700 bg-rose-50/90 dark:bg-rose-950/40 text-rose-400 dark:text-rose-300 shadow-md scale-[1.02]"
                  : "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-muted-foreground hover:text-foreground hover:bg-rose-50/40 dark:hover:bg-rose-950/20 hover:border-rose-200 dark:hover:border-rose-900/40"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "size-9 rounded-xl flex items-center justify-center border transition-colors",
                    isSelected
                      ? "bg-rose-500/15 border-rose-300 dark:border-rose-800 text-rose-400 dark:text-rose-400"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <span className={cn("text-[10px] font-mono font-bold uppercase tracking-wider", isSelected ? "text-rose-400 dark:text-rose-400" : "text-muted-foreground")}>
                  0{idx + 1}
                </span>
              </div>

              <div>
                <p className={cn("text-xs md:text-sm font-bold leading-tight", isSelected ? "text-rose-400 dark:text-rose-100" : "text-foreground")}>
                  {feat.title}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Main Fluid Open Stepper Display — Box-Free Layout */}
      <div className="relative overflow-hidden py-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={curFeature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Value Prop & Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-xs", curFeature.badgeClass)}>
                <Sparkles className="size-3.5" />
                <span>{curFeature.badge}</span>
              </span>

              <h3 className="text-2xl md:text-3xl font-serif font-normal text-foreground leading-tight">
                {curFeature.title}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {curFeature.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {curFeature.stats.map((st, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 backdrop-blur-md shadow-xs">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">{st.label}</p>
                    <p className="text-base font-bold text-foreground mt-1">{st.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: LIVE WORKING INTERACTIVE WORKFLOW STEPPER */}
            <div className="lg:col-span-7">
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg backdrop-blur-xl space-y-4">
                {/* Workflow Header & Live Controls */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-2 rounded-full bg-emerald-500 animate-ping" />
                    <p className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                      Live Voice Workflow Execution
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      <TrendingUp className="size-3.5" />
                      <span>{curFeature.metric} {curFeature.metricLabel}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsLivePlaying(!isLivePlaying)}
                      className="p-1.5 rounded-full bg-rose-50 text-rose-400 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer"
                      title={isLivePlaying ? "Pause Auto-Execution" : "Play Auto-Execution"}
                    >
                      {isLivePlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Step-by-Step Live Stepper */}
                <div className="space-y-2.5">
                  {curFeature.workflow.map((step, idx) => {
                    const isActive = activeStep === idx
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setGlobalIndex(activeTab * 4 + idx)
                          setIsLivePlaying(false)
                        }}
                        className={cn(
                          "p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden",
                          isActive
                            ? "bg-rose-50/90 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 shadow-sm scale-[1.01]"
                            : "bg-white/70 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/60 hover:border-rose-200 dark:hover:border-rose-900/40 hover:bg-rose-50/30 dark:hover:bg-rose-950/10"
                        )}
                      >
                        {/* Step Number & Indicator */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              "size-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs border transition-all duration-300",
                              isActive
                                ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-xs scale-105"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                            )}
                          >
                            0{idx + 1}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={cn("text-xs md:text-sm font-bold truncate", isActive ? "text-rose-400 dark:text-rose-300" : "text-foreground")}>
                                {step.label}
                              </p>
                              {isActive && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                                  ● Active Step
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] font-mono text-muted-foreground truncate">
                              {step.sub}
                            </p>
                          </div>
                        </div>

                        {/* Right Details Pill */}
                        <div className="text-right shrink-0 hidden sm:block">
                          <span className="text-[10px] font-mono font-medium text-muted-foreground bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-2 py-1 rounded-md">
                            {step.details}
                          </span>
                        </div>

                        {/* Active Step Glowing Soft Rose Progress Line */}
                        {isActive && (
                          <motion.div
                            key={globalIndex}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 2.2, ease: "linear" }}
                            style={{ transformOrigin: "top" }}
                            className="absolute left-0 top-0 bottom-0 w-1 bg-rose-400 dark:bg-rose-500 shadow-xs"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Footer Status Bar */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-slate-200/80 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="size-3.5" /> Shopify Sync Active
                  </span>
                  <span className="text-rose-400 dark:text-rose-400 font-bold flex items-center gap-1">
                    <Activity className="size-3.5 animate-pulse" /> 9278 Voice AI Engine
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

