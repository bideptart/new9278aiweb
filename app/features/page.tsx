import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowUpRight, PhoneCall } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Features } from "@/components/sections/features"
import { CtaPanel } from "@/components/ui/cta-panel"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const USE_CASE_PAGES = [
  {
    href: "/features/ai-voice-receptionist",
    title: "AI Receptionist",
    description: "24/7 greeting, intent recognition, FAQ handling, and caller routing.",
    accent: "var(--ai-cyan)",
    Mini: ReceptionistMini,
  },
  {
    href: "/features/appointment-setter",
    title: "Appointment Setter",
    description: "Calendar sync, slot negotiation, rescheduling, and SMS confirmations.",
    accent: "var(--ai-mint)",
    Mini: AppointmentMini,
  },
  {
    href: "/features/answering-services",
    title: "Answering Services",
    description: "After-hours coverage, high-volume overflow, and emergency escalation.",
    accent: "var(--ai-violet)",
    Mini: AnsweringMini,
  },
  {
    href: "/features/call-transfer",
    title: "Call Transfer",
    description: "Warm and cold hand-offs with full context passed to your team.",
    accent: "var(--ai-magenta)",
    Mini: TransferMini,
  },
] as const

export const metadata: Metadata = pageSeo({
  title: "Features",
  description:
    "Sub-300ms latency, carrier-grade telephony, multilingual voices, tools & function calling, live transfer, transcripts, compliance and more — everything you need to ship a real-world AI voice agent.",
  path: "/features",
})

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ]}
      />

      <main className="flex-1">
        <Features />

        {/* Dedicated use-case pages */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="ai-pill-violet">
              <span className="h-1 w-1 rounded-full bg-primary" />
              By use case
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Explore each use case in depth.
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Deep dives on the four calls your agent handles most — with live interactive diagrams.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASE_PAGES.map((page, i) => {
              const Mini = page.Mini
              return (
                <ScrollReveal key={page.href} delay={i * 0.06}>
                  <Link
                    href={page.href}
                    className="usecase-card card-glow group flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-3"
                  >
                    <Mini />
                    <div className="flex-1 px-2">
                      <p className="text-base font-semibold tracking-tight">{page.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{page.description}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 pb-1 text-xs font-medium" style={{ color: page.accent }}>
                      Explore
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        <CtaPanel
          title={
            <>
              Ready to hear it <span className="text-primary">for yourself?</span>
            </>
          }
          description="Spin up an agent in minutes and place a real test call — no credit card to try."
          primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
          secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
        />

        <RelatedLinks
          heading="Keep exploring"
          description="Where teams head next after the feature tour."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/pricing",
              title: "Pricing & per-minute rates",
              description: "Compare Starter, Growth and Scale top-ups and see the full phone-number rate card.",
            },
            {
              href: "/industries",
              title: "Industries — playbooks",
              description: "Real estate, dental, healthcare, home services, restaurants, automotive, and more.",
            },
            {
              href: "/faq",
              title: "Frequently asked questions",
              description: "Pricing, credits, phone numbers, compliance and account access — answered.",
            },
          ]}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

/* Mini mockups — one per USE_CASE_PAGES card. Pure CSS (no client
   component needed): .pulse-ring, .voice-bar, and .matrix-cell are all
   plain @keyframes utilities defined in app/globals.css. */

function ReceptionistMini() {
  return (
    <div
      className="flex h-16 w-full items-center justify-center gap-3 rounded-xl"
      style={{ background: "color-mix(in oklch, var(--ai-cyan) 10%, transparent)" }}
    >
      <div className="relative flex h-7 w-7 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full" style={{ color: "var(--ai-cyan)" }} aria-hidden />
        <span
          className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-white"
          style={{ background: "var(--ai-cyan)" }}
        >
          <PhoneCall className="h-3 w-3" aria-hidden />
        </span>
      </div>
      <div className="flex h-4 items-center gap-[2px]" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className="voice-bar w-[2px] rounded-full"
            style={{ height: `${30 + ((i * 29) % 60)}%`, animationDelay: `${(i * 90) % 700}ms`, background: "var(--ai-cyan)" }}
          />
        ))}
      </div>
    </div>
  )
}

const APPOINTMENT_BOOKED_INDEX = 4

function AppointmentMini() {
  return (
    <div
      className="flex h-16 w-full items-center justify-center rounded-xl"
      style={{ background: "color-mix(in oklch, var(--ai-mint) 10%, transparent)" }}
    >
      <div className="grid grid-cols-3 gap-1" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="h-3.5 w-6 rounded"
            style={{
              background:
                i === APPOINTMENT_BOOKED_INDEX
                  ? "var(--ai-mint)"
                  : "color-mix(in oklch, var(--foreground) 10%, transparent)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function AnsweringMini() {
  return (
    <div
      className="flex h-16 w-full items-center justify-center rounded-xl"
      style={{ background: "color-mix(in oklch, var(--ai-violet) 12%, transparent)" }}
    >
      <div className="grid grid-cols-6 gap-1" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="matrix-cell h-2 w-2 rounded-[1px]"
            style={{ background: "var(--ai-violet)", "--cell-delay": `${(i * 173) % 2000}ms` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}

function TransferMini() {
  return (
    <div
      className="flex h-16 w-full items-center justify-center gap-2 rounded-xl"
      style={{ background: "color-mix(in oklch, var(--ai-magenta) 10%, transparent)" }}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--border)" }} aria-hidden />
      <span className="h-px w-6" style={{ background: "color-mix(in oklch, var(--ai-magenta) 50%, transparent)" }} aria-hidden />
      <span className="h-3 w-3 rounded-full" style={{ background: "var(--ai-magenta)" }} aria-hidden />
      <span className="h-px w-6" style={{ background: "color-mix(in oklch, var(--ai-magenta) 50%, transparent)" }} aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: "var(--ai-magenta)" }} aria-hidden />
    </div>
  )
}
