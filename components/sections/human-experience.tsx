"use client"

import { Split, Waves } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { ExperienceMockup } from "@/components/sections/experience-phone"

/* ------------------------------------------------------------------ */

const facts = [
  {
    icon: Waves,
    title: "Zero-lag conversations",
    description:
      "Native audio-to-audio modeling delivers natural warmth and real-time fluidity. No robotic dead air while a transcription pipeline catches up — every response streams back in under 300ms.",
  },
  {
    icon: Split,
    title: "Smart interruptions",
    description:
      "Customers can talk over the agent at any moment. It stops, listens, and responds the way a real human would. Barge-in detection kicks in instantly — no talking over, no dead air.",
  },
]

export function HumanExperience() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          aria-hidden="true"
          className="h-full w-full rounded-full bg-primary/[0.03] blur-[110px] [will-change:transform]"
          animate={reduced ? undefined : { scale: [1, 1.18, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── left: the 3D product mockup ─────────────────────── */}
          <ScrollReveal className="order-1 flex justify-center">
            <ExperienceMockup />
          </ScrollReveal>

          {/* ── right: the copy ──────────────────────────────────── */}
          <div className="order-2">
            <ScrollReveal>
              <span className="ai-pill-cyan">
                <span className="h-1 w-1 rounded-full bg-primary" />
                The human-kind experience
              </span>
              <h2 className="mt-6 text-balance text-4xl font-serif font-normal leading-[1.1] tracking-tight md:text-5xl">
                Conversations indistinguishable from <span className="text-primary">your best agent.</span>
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                9278.ai skips the brittle speech-to-text and text-to-speech relay and runs on a single audio-native
                engine — so your callers hear pauses, emotion, and timing that feel right.
              </p>
            </ScrollReveal>

            <div className="mt-9 flex flex-col gap-7">
              {facts.map((f, i) => {
                const Icon = f.icon
                return (
                  <ScrollReveal key={f.title} delay={0.1 + i * 0.1}>
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                        <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                          0{i + 1}
                        </span>
                        <h3 className="mt-1.5 text-xl font-normal tracking-tight">{f.title}</h3>
                        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
