"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react"
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
  MessageSquare,
  CreditCard,
  Layers,
  Database,
  ShieldCheck,
  Check,
  Play,
  Pause,
  DollarSign,
  TrendingUp,
  Activity,
  Cpu,
  Globe,
  Calculator,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function EcommerceEcosystemIntegrations() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [isPlayingCategory, setIsPlayingCategory] = useState(true)

  // ROI Calculator State & Auto-Change Setup
  const [monthlyOrders, setMonthlyOrders] = useState(3500)
  const [isAutoCalculating, setIsAutoCalculating] = useState(true)

  // 3D Motion Tilt Setup for Top Integration Card
  const topCardRef = useRef<HTMLDivElement>(null)
  const topMouseX = useMotionValue(0)
  const topMouseY = useMotionValue(0)
  const springConfig = { stiffness: 200, damping: 20 }
  const topRotateX = useSpring(useTransform(topMouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const topRotateY = useSpring(useTransform(topMouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handleTopMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!topCardRef.current) return
    const rect = topCardRef.current.getBoundingClientRect()
    topMouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    topMouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleTopMouseLeave = () => {
    topMouseX.set(0)
    topMouseY.set(0)
  }

  // 3D Motion Tilt Setup for ROI Calculator Card
  const roiCardRef = useRef<HTMLDivElement>(null)
  const roiMouseX = useMotionValue(0)
  const roiMouseY = useMotionValue(0)
  const roiRotateX = useSpring(useTransform(roiMouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const roiRotateY = useSpring(useTransform(roiMouseX, [-0.5, 0.5], [-6, 6]), springConfig)

  const handleRoiMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!roiCardRef.current) return
    const rect = roiCardRef.current.getBoundingClientRect()
    roiMouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    roiMouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleRoiMouseLeave = () => {
    roiMouseX.set(0)
    roiMouseY.set(0)
  }

  const integrations = [
    {
      id: "storefronts",
      category: "E-Commerce Platforms",
      icon: ShoppingBag,
      tag: "1-CLICK STOREFRONT SYNC",
      title: "Shopify, WooCommerce & Custom Storefront Integration",
      description:
        "Connect 9278 Voice AI to your storefront in under 3 minutes. Automatically reads live stock availability, customer order history, and applies custom discount tags.",
      apps: ["Shopify Plus", "WooCommerce", "Magento", "Custom REST API"],
      liveFeature: "Real-time SKU lookup & order status retrieval in < 180ms",
      impact: "Zero manual data entry for customer service reps",
    },
    {
      id: "logistics",
      category: "Logistics & Carriers",
      icon: Truck,
      tag: "REAL-TIME LOGISTICS PEERING",
      title: "Shiprocket, Delhivery & Bluedart Direct Tracking Relay",
      description:
        "Direct API peering with top logistics carriers. Voice AI answers tracking queries, schedules reverse pickups, and verifies COD delivery addresses before dispatch.",
      apps: ["Shiprocket", "Delhivery", "Bluedart", "FedEx", "Pickrr"],
      liveFeature: "Automated reverse pickup label & AWB generation during call",
      impact: "Reduces RTO losses by 45% across all COD shipments",
    },
    {
      id: "whatsapp-payments",
      category: "Payments & WhatsApp",
      icon: CreditCard,
      tag: "POST-CALL CONVERSION RELAY",
      title: "WhatsApp Business API & Razorpay Instant Payment Relay",
      description:
        "Sends 1-click Razorpay/PhonePe UPI links, invoice PDFs, and product catalog carousels directly to the caller’s WhatsApp while still on the phone call.",
      apps: ["WhatsApp Cloud API", "Razorpay", "PhonePe", "Stripe", "Paytm"],
      liveFeature: "Instant 1-click UPI payment link delivered in 2 seconds",
      impact: "Converts 34% of COD buyers to instant prepaid orders",
    },
    {
      id: "crm-marketing",
      category: "CRM & Retention",
      icon: Database,
      tag: "OMNICHANNEL RETENTION SYNC",
      title: "Klaviyo, HubSpot & Webengage Customer Data Platform",
      description:
        "Logs buyer call transcript, sentiment score, product preferences, and CSAT rating back into your CRM to trigger personalized SMS & email flows.",
      apps: ["Klaviyo", "HubSpot", "Webengage", "Clevertap", "Zoho CRM"],
      liveFeature: "Automated call sentiment & tag logging into customer profile",
      impact: "Increases customer lifetime value (LTV) by +28%",
    },
  ]

  // Auto-cycle categories every 2.2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlayingCategory) {
      timer = setInterval(() => {
        setSelectedCategory((prev) => (prev + 1) % integrations.length)
      }, 2200)
    }
    return () => clearInterval(timer)
  }, [isPlayingCategory, integrations.length])

  // Auto-cycle ROI slider values every 2.2 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    const presetSteps = [1500, 3500, 7500, 15000, 25000]
    if (isAutoCalculating) {
      timer = setInterval(() => {
        setMonthlyOrders((prev) => {
          const idx = presetSteps.indexOf(prev)
          if (idx === -1 || idx === presetSteps.length - 1) return presetSteps[0]
          return presetSteps[idx + 1]
        })
      }, 2200)
    }
    return () => clearInterval(timer)
  }, [isAutoCalculating])

  const curInt = integrations[selectedCategory]

  // Calculator Math based on Monthly Orders
  const rtoSaved = Math.round(monthlyOrders * 0.12 * 180)
  const cartsRecovered = Math.round(monthlyOrders * 0.08 * 1450)
  const totalSavings = rtoSaved + cartsRecovered

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Background Soft Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent blur-3xl opacity-20"
      />

      {/* SECTION 1: E-Commerce Integrations Ecosystem */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-4 py-1.5 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
            <Zap className="size-3.5 text-rose-300 animate-pulse" />
            <span>NATIVE E-COMMERCE TECH STACK INTEGRATIONS</span>
          </span>
          <h2 className="text-balance text-3xl font-serif font-normal tracking-tight md:text-5xl text-foreground leading-[1.1]">
            Plugs into your store in 3 minutes. <span className="italic text-rose-400 dark:text-rose-400">Zero code required.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            9278 Voice AI natively syncs with your storefront, logistics carriers, payment gateways, and WhatsApp Business API.
          </p>
        </div>

        {/* Responsive Category Selector Pills with Play/Pause Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-full">
            {integrations.map((item, idx) => {
              const isSelected = selectedCategory === idx
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(idx)
                    setIsPlayingCategory(false)
                  }}
                  className={cn(
                    "px-3.5 py-2 rounded-full text-xs font-normal transition-all duration-300 flex items-center gap-2 cursor-pointer border shadow-xs backdrop-blur-md",
                    isSelected
                      ? "bg-rose-500/15 text-rose-400 dark:text-rose-300 border-rose-300 dark:border-rose-800 scale-105 shadow-sm"
                      : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 text-muted-foreground hover:text-rose-400 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/40"
                  )}
                >
                  <Icon className="size-3.5 text-rose-300 shrink-0" />
                  <span className="truncate">{item.category}</span>
                  {isSelected && <span className="size-1.5 rounded-full bg-rose-500 animate-ping" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Motion Tilt Card Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={curInt.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2"
          >
            {/* Left Column: Feature Title & App Badges */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-normal bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 shadow-xs">
                <Sparkles className="size-3.5 text-rose-300 animate-pulse" />
                {curInt.tag}
              </span>

              <h3 className="text-2xl md:text-3xl font-serif font-normal text-foreground leading-tight">
                {curInt.title}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {curInt.description}
              </p>

              {/* Native Apps Badges Grid */}
              <div>
                <p className="text-xs font-mono font-normal uppercase tracking-wider text-muted-foreground mb-2.5">
                  Supported Native Tools & APIs:
                </p>
                <div className="flex flex-wrap gap-2">
                  {curInt.apps.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs font-normal text-foreground flex items-center gap-1.5 shadow-xs hover:border-rose-300 transition-colors"
                    >
                      <Check className="size-3.5 text-rose-400 dark:text-rose-400 stroke-[3]" />
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Motion Card with Live Visualizers */}
            <div className="lg:col-span-6">
              <motion.div
                ref={topCardRef}
                onMouseMove={handleTopMouseMove}
                onMouseLeave={handleTopMouseLeave}
                style={{
                  rotateX: topRotateX,
                  rotateY: topRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="p-6 md:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-2xl space-y-5 transition-all duration-200 group hover:border-rose-300 dark:hover:border-rose-800"
              >
                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-normal text-foreground uppercase tracking-wider">
                      Live 3D Integration Node
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-normal bg-rose-50 text-rose-400 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 px-2.5 py-0.5 rounded-full shadow-xs">
                    Automated Relay
                  </span>
                </div>

                {/* Capability & ROI Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3.5">
                    <div className="size-8 rounded-2xl bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Zap className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-normal text-rose-400 dark:text-rose-400 uppercase">Live Technical Feature</p>
                      <p className="text-xs md:text-sm font-normal text-foreground mt-0.5">{curInt.liveFeature}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="size-8 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <TrendingUp className="size-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-normal text-emerald-600 dark:text-emerald-400 uppercase">Measurable Business Impact</p>
                      <p className="text-xs md:text-sm font-normal text-rose-400 dark:text-rose-400 mt-0.5">{curInt.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Animated Equalizer Visual Bar */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-normal">API Sync Latency</span>
                  <div className="flex items-center gap-1 h-3">
                    <span className="w-1 h-3 bg-rose-500 animate-pulse rounded-full" />
                    <span className="w-1 h-4 bg-rose-500 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-rose-500 animate-pulse delay-150 rounded-full" />
                    <span className="w-1 h-4 bg-rose-500 animate-pulse delay-225 rounded-full" />
                    <span className="w-1 h-2.5 bg-rose-500 animate-pulse delay-300 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SECTION 2: Responsive & 3D Auto-Changing E-Commerce ROI Estimator */}
        <div className="pt-16 border-t border-slate-200/60 dark:border-slate-800/60 mt-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-normal uppercase tracking-wider text-rose-400 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
              <DollarSign className="size-3.5 text-rose-300 animate-pulse" />
              <span>INTERACTIVE 3D E-COMMERCE ROI ESTIMATOR</span>
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-normal text-foreground">
              Calculate your store's <span className="italic text-rose-400 dark:text-rose-400">monthly RTO & cart savings.</span>
            </h3>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive 3D Responsive Slider Card */}
            <div className="lg:col-span-6">
              <motion.div
                ref={roiCardRef}
                onMouseMove={handleRoiMouseMove}
                onMouseLeave={handleRoiMouseLeave}
                style={{
                  rotateX: roiRotateX,
                  rotateY: roiRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="space-y-5 p-6 md:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-2xl transition-all duration-200 group hover:border-rose-300 dark:hover:border-rose-800"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="size-4 text-rose-300" />
                    <label htmlFor="orders-slider" className="text-xs font-mono font-normal uppercase text-foreground">
                      Monthly Store Orders
                    </label>
                  </div>
                  <span className="text-base md:text-xl font-mono font-normal text-rose-400 dark:text-rose-400 bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 px-3 py-1 rounded-full shadow-xs">
                    {monthlyOrders.toLocaleString()} / mo
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <input
                    id="orders-slider"
                    type="range"
                    min="500"
                    max="25000"
                    step="500"
                    value={monthlyOrders}
                    onChange={(e) => {
                      setMonthlyOrders(Number(e.target.value))
                      setIsAutoCalculating(false)
                    }}
                    className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />

                  <div className="flex justify-between text-[10px] font-mono font-normal text-muted-foreground pt-1">
                    <span>500 orders</span>
                    <span>10,000 orders</span>
                    <span>25,000+ orders</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                  <span>Assumed RTO Prevention: 12%</span>
                  <span className="font-normal text-rose-400 dark:text-rose-400">Assumed Recovery: 8%</span>
                </div>
              </motion.div>
            </div>

            {/* Estimated Savings Display Cards with Live Animated Numbers */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`rto-${monthlyOrders}`}
                  initial={{ scale: 0.96, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-900/40 text-center shadow-lg backdrop-blur-xl"
                >
                  <p className="text-[10px] font-mono text-muted-foreground uppercase font-normal">RTO Courier Savings</p>
                  <p className="text-xl md:text-2xl font-normal font-serif text-rose-400 dark:text-rose-400 mt-1">
                    ₹{rtoSaved.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">Direct Courier Relief</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`cart-${monthlyOrders}`}
                  initial={{ scale: 0.96, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-900/40 text-center shadow-lg backdrop-blur-xl"
                >
                  <p className="text-[10px] font-mono text-muted-foreground uppercase font-normal">Cart Revenue Recovered</p>
                  <p className="text-xl md:text-2xl font-normal font-serif text-rose-400 dark:text-rose-400 mt-1">
                    ₹{cartsRecovered.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">Recovered Sales</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`total-${monthlyOrders}`}
                  initial={{ scale: 0.96, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="col-span-2 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center shadow-xl backdrop-blur-xl"
                >
                  <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-normal uppercase tracking-wider">
                    ESTIMATED TOTAL MONTHLY BUSINESS IMPACT
                  </p>
                  <p className="text-2xl md:text-4xl font-normal font-serif text-emerald-600 dark:text-emerald-400 mt-1">
                    + ₹{totalSavings.toLocaleString()} / month
                  </p>
                  <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-mono font-medium mt-1">
                    ROI multiplier: 4.8x average account cost
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-8">
          <Button asChild size="lg" className="btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-8 shadow-md font-normal cursor-pointer">
            <Link href="/get-started?industry=ecommerce">
              Integrate Your E-Commerce Store <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
