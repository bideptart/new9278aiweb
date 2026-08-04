"use client"

import type React from "react"
import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface CircularTestimonial {
  quote: string
  name: string
  designation: string
  /** Either an image URL, or initials to render as an avatar badge. */
  src?: string
  initials?: string
}

interface Colors {
  name?: string
  designation?: string
  testimony?: string
  arrowBackground?: string
  arrowForeground?: string
  arrowHoverBackground?: string
}

interface FontSizes {
  name?: string
  designation?: string
  quote?: string
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[]
  autoplay?: boolean
  colors?: Colors
  fontSizes?: FontSizes
  className?: string
}

function calculateGap(width: number) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86
  if (width <= minWidth) return minGap
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

/** One "photo" slot in the stack — a real image if `src` is given, else a
    soft gradient badge with initials, so this works without stock photos. */
function TestimonialAvatar({
  testimonial,
  style,
}: {
  testimonial: CircularTestimonial
  style: React.CSSProperties
}) {
  if (testimonial.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={testimonial.src || "/placeholder.svg"}
        alt={testimonial.name}
        className="absolute h-full w-full rounded-[1.5rem] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        style={style}
      />
    )
  }
  return (
    <div
      className="absolute flex h-full w-full items-center justify-center rounded-[1.5rem] text-4xl font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:text-6xl"
      style={{
        ...style,
        backgroundImage:
          "radial-gradient(circle at 32% 26%, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
      }}
    >
      {testimonial.initials ?? testimonial.name.charAt(0)}
    </div>
  )
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) {
  const colorName = colors.name ?? "var(--foreground)"
  const colorDesignation = colors.designation ?? "var(--muted-foreground)"
  const colorTestimony = colors.testimony ?? "color-mix(in oklch, var(--foreground) 78%, transparent)"
  const colorArrowBg = colors.arrowBackground ?? "color-mix(in oklch, var(--foreground) 6%, white)"
  const colorArrowFg = colors.arrowForeground ?? "var(--foreground)"
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "var(--primary)"
  const fontSizeName = fontSizes.name ?? "1.375rem"
  const fontSizeDesignation = fontSizes.designation ?? "0.875rem"
  const fontSizeQuote = fontSizes.quote ?? "1.0625rem"

  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials])
  const activeTestimonial = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials])

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength)
      }, 5000)
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
    }
  }, [autoplay, testimonialsLength])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [testimonialsLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [testimonialsLength])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handlePrev, handleNext])

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.8
    const isActive = index === activeIndex
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index
    const isRight = (activeIndex + 1) % testimonialsLength === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className={cn("w-full max-w-4xl p-4 md:p-8", className)}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-20">
        {/* photo stack */}
        <div ref={imageContainerRef} className="relative h-64 w-full [perspective:1000px] md:h-96">
          {testimonials.map((testimonial, index) => (
            <TestimonialAvatar
              key={testimonial.name}
              testimonial={testimonial}
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* content */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-bold" style={{ color: colorName, fontSize: fontSizeName }}>
                {activeTestimonial.name}
              </h3>
              <p className="mb-6 mt-1" style={{ color: colorDesignation, fontSize: fontSizeDesignation }}>
                {activeTestimonial.designation}
              </p>
              <p className="leading-relaxed" style={{ color: colorTestimony, fontSize: fontSizeQuote }}>
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-6 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
            >
              <ArrowLeft className="h-5 w-5" style={{ color: hoverPrev ? "white" : colorArrowFg }} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300"
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
            >
              <ArrowRight className="h-5 w-5" style={{ color: hoverNext ? "white" : colorArrowFg }} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircularTestimonials
