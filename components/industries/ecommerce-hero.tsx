"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ShoppingBag,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Mic,
  Volume2,
  MessageSquare,
  Truck,
  RotateCcw,
  Check,
  Bot,
  User,
  ChevronDown,
  ChevronRight,
  Phone,
  RefreshCw,
  MapPin,
  Gift,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ULogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.667 31.69"
    {...props}
  >
    <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
    <path d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)" />
    <path d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)" />
  </svg>
)

export function EcommerceHero() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const scenarios = [
    {
      id: "cod-verify",
      title: "COD Verification",
      orderNo: "Shopify #SHP-9842",
      item: "Nike Air Max 270 (Size 10) · ₹12,995",
      metric: "45% RTO Prevented",
      tag: "COD Confirmed",
      pipelineStatus: "Auto Dispatched",
      steps: [
        { icon: ShoppingBag, label: "COD Placed", status: "Order #9842" },
        { icon: Zap, label: "Voice Verified", status: "Sub-250ms" },
        { icon: Truck, label: "Dispatched", status: "Shiprocket" },
      ],
    },
    {
      id: "wismo-track",
      title: "WISMO Tracking",
      orderNo: "Shopify #SHP-9910",
      item: "Organic Skincare Kit · ₹3,499",
      metric: "180ms API Lookup",
      tag: "Out For Delivery",
      pipelineStatus: "Tracking Pushed",
      steps: [
        { icon: PhoneCall, label: "Inbound Call", status: "Customer" },
        { icon: RefreshCw, label: "Carrier Sync", status: "Delhivery" },
        { icon: MapPin, label: "Map Shared", status: "WhatsApp" },
      ],
    },
    {
      id: "cart-recovery",
      title: "Cart Recovery",
      orderNo: "Shopify #SHP-9945",
      item: "Linen Blazer (Size M) · ₹7,999",
      metric: "+32% Recovery",
      tag: "Cart Recovered",
      pipelineStatus: "UPI Link Sent",
      steps: [
        { icon: Gift, label: "Cart Left", status: "₹7,999 Value" },
        { icon: Zap, label: "10% Promo", status: "Code SAVE10" },
        { icon: CheckCircle2, label: "1-Click Paid", status: "Razorpay" },
      ],
    },
  ]

  // Auto-cycle scenarios every 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % scenarios.length)
      }, 3000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, scenarios.length])

  const curSc = scenarios[activeTab]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background Soft Rose Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/15 via-amber-500/10 to-transparent blur-3xl opacity-70"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <nav aria-label="Breadcrumb" className="mb-2">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/industries" className="hover:text-foreground transition-colors">
                    Industries
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-foreground font-medium">E-Commerce</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
                </span>
                <ShoppingBag className="size-3.5 text-rose-500" />
                <span className="font-bold">E-COMMERCE VOICE REVENUE ENGINE</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md">
                <ShieldCheck className="size-3.5 text-rose-500" />
                Sub-250ms Audio AI
              </span>
            </div>

            <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
              AI voice agents for <span className="italic text-rose-600 dark:text-rose-400">e-commerce stores.</span>
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Automate COD verification, WISMO order tracking, and size exchanges on 24/7 AI voice calls. Connect Shopify, WooCommerce & Shiprocket in 3 minutes.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="group btn-ai h-12 rounded-full px-8 shadow-md font-bold cursor-pointer">
                <Link href="/get-started?industry=ecommerce">
                  Get started <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-8 backdrop-blur-md hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 transition-all font-semibold cursor-pointer"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">45%</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">RTO Reduction</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">&lt; 250ms</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Voice Latency</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-rose-600 dark:text-rose-400 tracking-tight">24/7</p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">Shopify Relay</p>
              </div>
            </div>
          </div>

          {/* Right Column: ADAPTED 3D GLASS CARD COMPONENT WITH DYNAMIC DYNAMIC GRAPHICS */}
          <div className="lg:col-span-6 flex items-center justify-center pt-6 lg:pt-0">
            <div className="group h-[450px] w-full max-w-[360px] md:max-w-[400px] [perspective:1000px]">
              <div className="relative h-full rounded-[45px] bg-gradient-to-br from-white via-rose-50/70 to-slate-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(244,63,94,0.2)_0px_35px_70px_-15px,rgba(0,0,0,0.12)_0px_25px_35px_0px] group-hover:[transform:rotate3d(1,1,0,20deg)]">
                
                {/* 3D Glass Layer */}
                <div className="absolute inset-2 rounded-[40px] border-b border-l border-white/80 dark:border-white/10 bg-gradient-to-b from-white/90 via-white/60 to-rose-50/50 dark:from-slate-900/90 dark:to-slate-900/40 backdrop-blur-md [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]" />

                {/* Content Layer floating in 3D Space */}
                <div className="absolute inset-0 [transform:translate3d(0,0,26px)] flex flex-col justify-between p-7">
                  
                  {/* Top Status & Scenario Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 pr-14">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-mono font-bold text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs truncate">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                        <span>{curSc.tag}</span>
                        <span className="opacity-40">·</span>
                        <span className="text-muted-foreground font-semibold">{curSc.orderNo}</span>
                      </span>
                    </div>

                    <span className="block text-xl font-serif font-bold text-foreground tracking-tight leading-tight">
                      9278 AI Voice Agent
                    </span>

                    {/* DYNAMIC VISUAL 3-STEP ORDER PIPELINE GRAPHIC (CHANGES PER TAB!) */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={curSc.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25 }}
                        className="mt-3 space-y-3"
                      >
                        {/* Live Voice Audio Waveform & Avatars Row */}
                        <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="size-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center font-bold text-[10px]">
                                <Bot className="size-3.5" />
                              </div>
                              <span className="text-[11px] font-mono font-bold text-foreground">Voice AI Relay</span>
                            </div>

                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              ⚡ {curSc.metric}
                            </span>
                          </div>

                          {/* Animated Voice Equalizer Spectrum */}
                          <div className="flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                            <div className="flex items-center gap-1 h-3.5">
                              <span className="w-0.5 h-3 bg-rose-500 animate-pulse rounded-full" />
                              <span className="w-0.5 h-4 bg-rose-500 animate-pulse delay-75 rounded-full" />
                              <span className="w-0.5 h-2 bg-rose-500 animate-pulse delay-150 rounded-full" />
                              <span className="w-0.5 h-4 bg-rose-500 animate-pulse delay-225 rounded-full" />
                              <span className="w-0.5 h-2.5 bg-rose-500 animate-pulse delay-300 rounded-full" />
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground truncate font-medium max-w-[200px]">{curSc.item}</span>
                          </div>
                        </div>

                        {/* DYNAMIC Visual 3-Step Pipeline Graphic */}
                        <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 shadow-xs space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                            <span>Scenario Workflow:</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{curSc.pipelineStatus}</span>
                          </div>

                          {/* Dynamic 3 Step Nodes Graphic */}
                          <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                            {curSc.steps.map((st, i) => {
                              const StepIcon = st.icon
                              return (
                                <div
                                  key={i}
                                  className={cn(
                                    "p-1.5 rounded-xl flex flex-col items-center gap-0.5 shadow-xs border transition-all",
                                    i === 2
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold"
                                      : i === 1
                                      ? "bg-rose-500/15 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold"
                                      : "bg-white dark:bg-slate-900 border-rose-200/60 dark:border-rose-900/40 text-foreground font-medium"
                                  )}
                                >
                                  <StepIcon className={cn("size-3", i === 2 ? "text-emerald-500" : "text-rose-500")} />
                                  <span className="text-[9px] font-mono truncate w-full">{st.label}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Action & Channel Controls */}
                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 [transform-style:preserve-3d]">
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar [transform-style:preserve-3d]">
                      {[
                        { icon: ShieldCheck, label: "COD", scenarioIdx: 0, delay: "300ms" },
                        { icon: Truck, label: "WISMO", scenarioIdx: 1, delay: "500ms" },
                        { icon: Zap, label: "Recovery", scenarioIdx: 2, delay: "700ms" },
                      ].map(({ icon: Icon, label, scenarioIdx, delay }) => {
                        const isActiveBtn = activeTab === scenarioIdx
                        return (
                          <button
                            key={label}
                            type="button"
                            title={label}
                            onClick={() => {
                              setActiveTab(scenarioIdx)
                              setIsPlaying(false)
                            }}
                            className={cn(
                              "group/social relative flex items-center justify-center h-8 px-2.5 rounded-xl border transition-all duration-200 ease-in-out cursor-pointer gap-1 shrink-0",
                              isActiveBtn
                                ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700 font-bold shadow-xs [transform:translate3d(0,0,45px)]"
                                : "border-rose-200/80 dark:border-rose-900/40 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 shadow-xs hover:bg-rose-50/60 dark:hover:bg-rose-950/40 group-hover:[transform:translate3d(0,0,40px)]"
                            )}
                            style={{ transitionDelay: delay }}
                          >
                            <Icon className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400 transition-colors stroke-[2.5] shrink-0" />
                            <span className="text-[10px] font-mono font-bold whitespace-nowrap">{label}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div
                      onClick={() => setActiveTab((prev) => (prev + 1) % scenarios.length)}
                      className="flex items-center gap-0.5 cursor-pointer transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,15px)] text-rose-600 dark:text-rose-400 font-mono font-bold text-[11px] shrink-0 pl-1"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>

                {/* Layered Concentric 3D Circles & Soft Rose Brand Glass Orb */}
                <div className="absolute top-0 right-0 [transform-style:preserve-3d] pointer-events-none">
                  {[
                    { size: "170px", pos: "8px", z: "20px", delay: "0s" },
                    { size: "140px", pos: "12px", z: "40px", delay: "0.3s" },
                    { size: "110px", pos: "18px", z: "60px", delay: "0.6s" },
                    { size: "80px", pos: "24px", z: "80px", delay: "0.9s" },
                  ].map((circle, index) => (
                    <div
                      key={index}
                      className="absolute aspect-square rounded-full bg-rose-500/5 dark:bg-rose-400/5 border border-rose-200/40 dark:border-rose-800/40 transition-all duration-500 ease-in-out"
                      style={{
                        width: circle.size,
                        top: circle.pos,
                        right: circle.pos,
                        transform: `translate3d(0, 0, ${circle.z})`,
                        transitionDelay: circle.delay,
                      }}
                    />
                  ))}

                  <div
                    className="absolute grid aspect-square w-[52px] place-content-center rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-rose-200 dark:border-rose-800 shadow-md backdrop-blur-md transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.2s] group-hover:[transform:translate3d(0,0,130px)]"
                    style={{ top: "28px", right: "28px" }}
                  >
                    <ULogo className="w-5 fill-rose-600 dark:fill-rose-400" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
