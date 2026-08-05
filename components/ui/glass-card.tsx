"use client"

import * as React from "react"
import { Phone, ShoppingBag, MessageSquare, Zap, ChevronRight, Bot, ShieldCheck, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

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

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  badgeText?: string
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, title = "9278.ai Voice Concierge", subtitle = "Shopify order verification, WISMO tracking & COD fraud defense in < 250ms.", badgeText = "Shopify Live Sync", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("group h-[380px] w-full max-w-[340px] md:max-w-[360px] [perspective:1000px]", className)}
        {...props}
      >
        <div className="relative h-full rounded-[45px] bg-gradient-to-br from-white via-rose-50/60 to-slate-100 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(244,63,94,0.15)_0px_30px_60px_-15px,rgba(0,0,0,0.1)_0px_20px_30px_0px] group-hover:[transform:rotate3d(1,1,0,18deg)]">
          {/* Glass Layer */}
          <div className="absolute inset-2 rounded-[40px] border-b border-l border-white/60 dark:border-white/10 bg-gradient-to-b from-white/90 via-white/50 to-rose-50/40 dark:from-slate-900/90 dark:to-slate-900/40 backdrop-blur-md [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
          
          {/* Main Content Layer */}
          <div className="absolute inset-0 [transform:translate3d(0,0,26px)] flex flex-col justify-between p-7">
            {/* Top Status */}
            <div>
              <div className="flex items-center gap-2 mb-3 pr-14">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-mono font-normal text-rose-400 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs truncate">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  {badgeText}
                </span>
              </div>
              <span className="block text-2xl font-serif font-normal text-foreground tracking-tight leading-tight">
                {title}
              </span>
              {/* Rich Visual 3-Step Order Pipeline & Voice Graphic */}
              <div className="mt-3 space-y-3">
                {/* Live Voice Audio Waveform & Avatars Row */}
                <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-rose-500/15 text-rose-400 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center justify-center font-normal text-[10px]">
                        <Bot className="size-3.5" />
                      </div>
                      <span className="text-[11px] font-mono font-normal text-foreground">Voice AI Relay</span>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-normal bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      ⚡ Sub-250ms
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
                    <span className="text-[10px] font-mono text-muted-foreground truncate font-medium max-w-[200px]">{subtitle}</span>
                  </div>
                </div>

                {/* Visual 3-Step Pipeline Graphic */}
                <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono font-normal text-rose-400 dark:text-rose-400">
                    <span>Live Order Pipeline:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-normal">Auto Dispatched</span>
                  </div>

                  {/* 3 Step Nodes Graphic */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                    <div className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200/60 dark:border-rose-900/40 flex flex-col items-center gap-0.5 shadow-xs">
                      <ShoppingBag className="size-3 text-rose-300" />
                      <span className="text-[9px] font-mono font-normal text-foreground">Placed</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-rose-500/15 border border-rose-300 dark:border-rose-800 flex flex-col items-center gap-0.5 shadow-xs">
                      <Zap className="size-3 text-rose-400 dark:text-rose-400" />
                      <span className="text-[9px] font-mono font-normal text-rose-400 dark:text-rose-300">Verified</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center gap-0.5 shadow-xs">
                      <Truck className="size-3 text-emerald-500" />
                      <span className="text-[9px] font-mono font-normal text-emerald-600 dark:text-emerald-400">Dispatched</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls & Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800 [transform-style:preserve-3d]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar [transform-style:preserve-3d]">
                {[
                  { icon: ShieldCheck, label: "COD", delay: "300ms" },
                  { icon: Truck, label: "WISMO", delay: "500ms" },
                  { icon: Zap, label: "Recovery", delay: "700ms" },
                ].map(({ icon: Icon, label, delay }, index) => (
                  <button
                    key={index}
                    type="button"
                    title={label}
                    className="group/social relative flex items-center justify-center h-8 px-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-white dark:bg-slate-900 text-rose-400 dark:text-rose-400 shadow-xs transition-all duration-200 ease-in-out group-hover:[box-shadow:rgba(244,63,94,0.3)_-5px_15px_10px_0px] group-hover:[transform:translate3d(0,0,40px)] hover:bg-rose-500 hover:text-white cursor-pointer gap-1 shrink-0"
                    style={{ transitionDelay: delay }}
                  >
                    <Icon className="h-3.5 w-3.5 transition-colors stroke-[2.5] shrink-0" />
                    <span className="text-[10px] font-mono font-normal whitespace-nowrap">{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-0.5 cursor-pointer transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,15px)] text-rose-400 dark:text-rose-400 font-mono font-normal text-[11px] shrink-0 pl-1">
                <span>Demo</span>
                <ChevronRight className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Concentric Floating 3D Circles & Brand Orb */}
          <div className="absolute top-0 right-0 [transform-style:preserve-3d] pointer-events-none">
            {[
              { size: "160px", pos: "8px", z: "20px", delay: "0s" },
              { size: "130px", pos: "12px", z: "40px", delay: "0.3s" },
              { size: "100px", pos: "18px", z: "60px", delay: "0.6s" },
              { size: "70px", pos: "24px", z: "80px", delay: "0.9s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="absolute aspect-square rounded-full bg-rose-500/10 dark:bg-rose-400/10 border border-rose-300/30 dark:border-rose-700/30 transition-all duration-500 ease-in-out"
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
              className="absolute grid aspect-square w-[52px] place-content-center rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-rose-200 dark:border-rose-800 shadow-md backdrop-blur-md transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.2s] group-hover:[transform:translate3d(0,0,120px)]"
              style={{ top: "28px", right: "28px" }}
            >
              <ULogo className="w-5 fill-rose-600 dark:fill-rose-400" />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export default GlassCard
