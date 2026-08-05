"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Sparkles, Phone, Building2, Calendar, CheckCircle2, ShieldCheck, Home, Key, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroMetricsCard } from "@/components/industries/hero-agent-console-mockup"
import { cn } from "@/lib/utils"

type ImageItem = {
  id: number
  x: number
  y: number
  rotation: number
  src: string
  title: string
  tag: string
}

export function RealEstateMouseTrailHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trailItems, setTrailItems] = useState<ImageItem[]>([])
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const counterRef = useRef(0)

  const cardsData = [
    {
      src: "/images/real-estate/villa.jpg",
      title: "Modern Luxury Villa",
      tag: "Lead Qualified · $2.4M Listing",
    },
    {
      src: "/images/real-estate/interior.jpg",
      title: "Penthouse Suite Interior",
      tag: "Site Visit Booked · 4:00 PM",
    },
    {
      src: "/images/real-estate/pool.jpg",
      title: "Infinity Pool House",
      tag: "Buyer Budget Verified",
    },
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Distance threshold before spawning next trail image
    if (distance > 70) {
      lastPosRef.current = { x, y }
      counterRef.current += 1
      const itemData = cardsData[counterRef.current % cardsData.length]
      const newItem: ImageItem = {
        id: Date.now() + Math.random(),
        x,
        y,
        rotation: (Math.random() - 0.5) * 24, // -12deg to +12deg random rotation
        src: itemData.src,
        title: itemData.title,
        tag: itemData.tag,
      }

      setTrailItems((prev) => [...prev.slice(-4), newItem]) // Keep max 5 items in trail
    }
  }

  // Remove trail items automatically after 1.8 seconds
  useEffect(() => {
    if (trailItems.length === 0) return
    const timer = setTimeout(() => {
      setTrailItems((prev) => prev.slice(1))
    }, 1800)
    return () => clearTimeout(timer)
  }, [trailItems])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-6xl mx-auto px-4 pt-28 pb-16 md:px-6 md:pt-36 md:pb-24 overflow-hidden select-none cursor-crosshair"
    >
      {/* Ambient Red Blur Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-amber-500/10 blur-3xl opacity-20"
      />

      {/* 21st.dev Image Mouse Trail Container Layer */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <AnimatePresence>
          {trailItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.4, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: item.rotation }}
              exit={{ opacity: 0, scale: 0.7, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: item.x - 110,
                top: item.y - 75,
              }}
              className="w-56 rounded-2xl border border-white/80 dark:border-white/20 bg-card/95 backdrop-blur-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-1.5 left-1.5 rounded-full bg-primary/90 px-2 py-0.5 text-[9px] font-normal text-white shadow-xs">
                  AI Lead Qualified
                </span>
              </div>
              <div className="px-1">
                <p className="text-xs font-normal text-foreground truncate">{item.title}</p>
                <p className="text-[10px] text-primary font-normal truncate">{item.tag}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Header Content */}
      <div className="text-center max-w-4xl mx-auto space-y-6 z-10 relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-normal uppercase tracking-wider text-primary border border-primary/20 shadow-xs backdrop-blur-md">
          <Building2 className="size-4 text-primary" />
          <span>AI Voice Agents for Real Estate</span>
          <span className="size-1.5 rounded-full bg-primary animate-ping" />
        </div>

        <h1 className="text-4xl font-serif font-normal tracking-tight sm:text-6xl md:text-7xl text-foreground leading-[1.1]">
          Qualify buyer & seller leads <span className="bg-gradient-to-r from-primary via-rose-600 to-primary bg-clip-text text-transparent underline decoration-primary/30 underline-offset-8">24/7</span>, book site visits instantly
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Most leads die because no one picks up in the first five minutes. 9278.ai answers every inbound call, qualifies buyer budget, and books property showings directly on your calendar.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="group btn-ai !text-rose-400 dark:!text-rose-300 h-13 rounded-full px-8 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all text-sm font-normal">
            <Link href="/get-started?industry=real-estate">
              Launch a real estate agent <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 rounded-full border-border/70 bg-card/60 px-8 backdrop-blur-md hover:border-primary/40 hover:bg-card/90 transition-all font-normal text-sm"
          >
            <Link href="/pricing">Compare plans & rates</Link>
          </Button>
        </div>

        {/* Hover Cue Banner */}
        <div className="pt-3">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-normal text-muted-foreground/80 bg-muted/40 px-3.5 py-1 rounded-full border border-border/40">
            <Sparkles className="size-3.5 text-primary animate-pulse" />
            Move cursor anywhere to trigger real estate property mouse-trail
          </span>
        </div>
      </div>

      {/* Floating Metrics Bar */}
      <div className="mt-12 z-10 relative">
        <HeroMetricsCard />
      </div>
    </section>
  )
}
