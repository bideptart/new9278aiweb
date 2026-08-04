import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarClock, Repeat, Sparkles, TimerReset } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CtaPanel } from "@/components/ui/cta-panel"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { HeroSplit } from "@/components/features/appointment-setter/hero-split"
import { SyncDiagram } from "@/components/features/appointment-setter/sync-diagram"
import { NegotiationFlow } from "@/components/features/appointment-setter/negotiation-flow"
import { ReminderTimeline } from "@/components/features/appointment-setter/reminder-timeline"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Appointment Setter",
  description:
    "An AI voice agent that syncs your calendar in real time, negotiates time slots on the call, reschedules without a human, and sends SMS confirmations — so every open slot gets filled.",
  path: "/features/appointment-setter",
})

export default function AppointmentSetterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Appointment Setter", path: "/features/appointment-setter" },
        ]}
      />
      <ServiceJsonLd
        name="AI Appointment Setter"
        description="Autonomous calendar syncing, time-slot negotiation, rescheduling, and SMS confirmations handled entirely by voice AI."
        path="/features/appointment-setter"
        serviceType="AI voice agent"
      />

      <main className="flex-1">
        {/* Hero — split screen: live call on the left, calendar on the right */}
        <section className="bg-neural relative overflow-hidden border-b border-border/50">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--ai-mint)_14%,transparent),transparent_70%)]"
          />
          <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <ScrollReveal>
              <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-foreground">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/features" className="hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-foreground">Appointment Setter</li>
                </ol>
              </nav>

              <span className="ai-pill-cyan">
                <CalendarClock className="size-3.5" aria-hidden />
                Appointment Setter
              </span>
              <h1 className="mt-6 max-w-3xl text-balance font-serif text-[10.5vw] font-normal leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
                Fill every open slot{" "}
                <span className="text-aurora text-aurora-flow italic">without lifting a finger.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Your AI agent checks live availability, proposes alternatives when a time is taken, reschedules on
                request, and texts a confirmation the moment a booking is locked in — all inside the call.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/get-started?feature=appointment-setter">
                    Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="mt-12 md:mt-16">
              <HeroSplit />
            </ScrollReveal>
          </div>
        </section>

        {/* Calendar sync */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <ScrollReveal>
              <span className="ai-pill-violet">
                <Repeat className="size-3.5" aria-hidden />
                Two-way sync
              </span>
              <h2 className="mt-5 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Real-time Google Calendar{" "}
                <span className="text-aurora text-aurora-flow italic">and Outlook sync</span>
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Every booking, cancellation, or reschedule made anywhere — by your team, by the customer, by another
                app — reflects in the agent's view within seconds. It never double-books, and it never offers a slot
                that just got taken.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  Two-way push and pull — no polling delay, no stale slots.
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  Works alongside your existing calendar, no migration required.
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <SyncDiagram />
            </ScrollReveal>
          </div>
        </section>

        {/* Negotiation logic */}
        <section className="border-y border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <ScrollReveal>
              <span className="ai-pill-magenta">
                <TimerReset className="size-3.5" aria-hidden />
                Smart negotiation
              </span>
              <h2 className="mt-5 max-w-2xl text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
                When the first time doesn't work,{" "}
                <span className="text-aurora text-aurora-flow italic">it doesn't hang up</span>
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
                The agent checks the requested time against live availability, and if it's taken, it proposes the
                nearest open alternatives in the same breath — no hold music, no callback needed.
              </p>
            </ScrollReveal>

            <div className="mt-10">
              <NegotiationFlow />
            </div>
          </div>
        </section>

        {/* Reminders */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal>
            <span className="ai-pill-cyan">
              <CalendarClock className="size-3.5" aria-hidden />
              Follow-up automation
            </span>
            <h2 className="mt-5 max-w-2xl text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Automated reminders{" "}
              <span className="text-aurora text-aurora-flow italic">that keep the seat filled</span>
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
              Every booking kicks off its own reminder sequence over SMS or WhatsApp — no-shows drop, and every visit
              ends with a follow-up instead of silence.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            <ReminderTimeline />
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <ScrollReveal className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <Stat
                label="Confirmation rate"
                value="98%"
                sub="Of negotiated bookings get a same-second SMS confirmation."
              />
              <Stat
                label="Avg. negotiation time"
                value="< 15 sec"
                sub="From requested time to confirmed slot, on the call."
              />
              <Stat
                label="No-show reduction"
                value="35%"
                sub="With automated 24h and 1h reminders switched on."
              />
              <Stat
                label="Reschedule automation"
                value="100%"
                sub="Every reschedule request handled without a human touch."
              />
            </ScrollReveal>
          </div>
        </section>

        <CtaPanel
          title={
            <>
              Fill your calendar <span className="text-primary">on autopilot.</span>
            </>
          }
          description="Launch an appointment-setting agent that syncs, negotiates, and confirms — while you focus on the visit, not the booking."
          primary={{ label: "Get started", href: "/get-started?feature=appointment-setter", icon: "arrow" }}
          secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
        />

        <RelatedLinks
          heading="Keep exploring 9278.ai"
          description="Other calls your AI agent can pick up alongside booking."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/features/ai-voice-receptionist",
              title: "AI Receptionist",
              description: "Greets every caller and routes them to the right place, 24/7.",
            },
            {
              href: "/features/answering-services",
              title: "Answering Services",
              description: "After-hours and overflow calls answered so nothing goes to voicemail.",
            },
            {
              href: "/features/call-transfer",
              title: "Call Transfer",
              description: "Warm and cold hand-offs to your team when a call needs a human.",
            },
            {
              href: "/pricing",
              title: "Compare plans and per-minute rates",
              description: "Three tiers from $20 to $100, with rates from $0.15 down to $0.10/min.",
            },
          ]}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Sparkles className="size-4 text-primary" aria-hidden />
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  )
}
