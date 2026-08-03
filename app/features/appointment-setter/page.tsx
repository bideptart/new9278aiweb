import type { Metadata } from "next"
import Link from "next/link"
import { FaqItem } from "@/components/ui/faq-item"
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  CalendarCheck,
  User,
  Bot,
  Volume2,
  ChevronDown,
  Zap,
  Check,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { CtaPanel } from "@/components/ui/cta-panel"
import { LiveCallShowcase, type CallScenario } from "@/components/ui/live-call-showcase"
import { BookingEngineCard } from "@/components/ui/booking-engine-card"
import { FeatureExplorer } from "@/components/ui/feature-explorer"
import { DeploymentTimeline, type TimelineStep } from "@/components/ui/deployment-timeline"

const appointmentSteps: TimelineStep[] = [
  {
    title: "Connect Calendar",
    description: "Link your Google Calendar, Outlook, Calendly, or custom API webhook.",
    iconName: "calendar",
    checklist: ["Authorize your calendar in one click", "Two-way sync confirmed instantly", "Works with custom API webhooks too"],
  },
  {
    title: "Set Working Hours",
    description: "Define available booking windows, buffer times between appointments, and service durations.",
    iconName: "clock",
    checklist: ["Set booking windows per day", "Add buffer time between slots", "Cap daily bookings per service"],
  },
  {
    title: "Configure SMS Texts",
    description: "Customize automated SMS booking confirmations, address details, and reminder texts.",
    iconName: "message",
    checklist: ["Write your confirmation template", "Add address & parking details", "Schedule reminder send times"],
  },
  {
    title: "Assign Phone Line",
    description: "Forward your business line or assign a dedicated phone number to start booking callers 24/7.",
    iconName: "phone",
    checklist: ["Forward your existing number", "Or claim a new dedicated line", "You're live — booking calls 24/7"],
  },
]

const appointmentScenarios: CallScenario[] = [
  {
    tag: "Real Estate",
    iconName: "home",
    caller: "Priya N.",
    lines: [
      { speaker: "caller", text: "I saw the listing on Maple Street. Can I schedule a walkthrough visit this Friday afternoon?" },
      {
        speaker: "ai",
        text: "I'd be happy to set that up! I have 3:00 PM and 5:15 PM available this Friday for the Maple Street walkthrough. Which time suits your schedule better?",
      },
    ],
    outcome: "Showing booked · Friday 3:00 PM",
    sentiment: "Positive · Booked",
  },
  {
    tag: "Automotive & Services",
    iconName: "wrench",
    caller: "Jordan M.",
    lines: [
      { speaker: "caller", text: "My AC unit is blowing warm air. I need a technician to come inspect it tomorrow." },
      {
        speaker: "ai",
        text: "We can certainly help with that. I have an emergency HVAC technician available tomorrow between 9:00 and 11:00 AM. Shall I lock that in for you?",
      },
    ],
    outcome: "Service call booked · Tomorrow, 9–11 AM",
    sentiment: "Urgent · Resolved",
  },
  {
    tag: "Dental & Medical",
    iconName: "stethoscope",
    caller: "Alan K.",
    lines: [
      { speaker: "caller", text: "I need to reschedule my cleaning appointment — something came up for Tuesday." },
      {
        speaker: "ai",
        text: "No problem at all. I have openings Wednesday at 10:00 AM or Thursday at 2:00 PM — which works better for you?",
      },
    ],
    outcome: "Appointment rescheduled · Thursday 2:00 PM",
    sentiment: "Positive · Rescheduled",
  },
  {
    tag: "Fitness & Wellness",
    iconName: "dumbbell",
    caller: "Sam T.",
    lines: [
      { speaker: "caller", text: "Hi, I'd like to book a personal training session for this weekend." },
      {
        speaker: "ai",
        text: "Great! I have Saturday at 9:00 AM with Coach Alex, or Sunday at 11:00 AM with Coach Priya. Any preference?",
      },
    ],
    outcome: "Session booked · Saturday 9:00 AM",
    sentiment: "Positive · Booked",
  },
]

export const metadata: Metadata = pageSeo({
  title: "AI Appointment Setter — Automated 24/7 Phone Booking",
  description:
    "Turn incoming phone calls into confirmed calendar bookings 24/7. Integrates with Google Calendar, Outlook, EHR/CRM, and sends instant SMS confirmations.",
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
          { name: "Appointment Setter AI", path: "/features/appointment-setter" },
        ]}
      />
      <ServiceJsonLd
        name="AI Appointment Setter"
        description="Autonomous 24/7 phone appointment scheduling, calendar sync, and SMS reminder agent."
        path="/features/appointment-setter"
        serviceType="AI Scheduling Service"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.15),transparent_70%)]"
          />
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Hero Text Column */}
            <ScrollReveal className="lg:col-span-6">
              <div className="flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <Calendar className="size-3.5 text-black" aria-hidden />
                  Appointment Setter
                </span>

                <h1 className="text-balance text-4xl font-serif font-normal tracking-tight sm:text-5xl md:text-6xl leading-[1.08]">
                  Turn every phone call into a <span className="italic text-primary">booked appointment.</span>
                </h1>

                <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  Automate 100% of your phone scheduling, time slot negotiations, calendar sync, reschedules, and SMS confirmations without human intervention.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="h-12 px-7 rounded-full border border-neutral-600/80 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 text-white font-bold shadow-md hover:from-neutral-700 hover:to-neutral-700 hover:border-neutral-500 transition-all text-base">
                    <Link href="/get-started?feature=appointment-setter">
                      Test Appointment Setter Live <ArrowRight className="ml-2 size-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-7 rounded-full border-border/80 hover:bg-accent text-base">
                    <Link href="/pricing">View Pricing & Rates</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Compact Animated Real-Time Calendar Booking Engine Card */}
            <ScrollReveal className="lg:col-span-6">
              <BookingEngineCard />
            </ScrollReveal>
          </div>
        </section>

        {/* Core Capabilities — an interactive feature explorer, not a card grid */}
        <section className="py-16 md:py-24 border-y border-border/50 bg-card/10">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <Sparkles className="size-3.5 text-black" aria-hidden />
                Core Capabilities
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Complete Autonomous <span className="italic text-primary">Phone Scheduling</span> System
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                No more phone tag, hold music, or lost leads. Your AI Appointment Setter handles everything from slot negotiation to SMS booking receipts.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <FeatureExplorer />
            </ScrollReveal>
          </div>
        </section>

        {/* Sample Real-world Dialogues */}
        <section className="py-16 md:py-24 border-y border-border/50">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <MessageSquare className="size-3.5 text-black" aria-hidden />
                Real Scheduling Conversations
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                See How the AI Negotiates <span className="italic text-primary">Time Slots</span>
              </h2>
              <p className="mt-3 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground/90">
                Real conversation transcripts of 9278.ai appointment setters handling client calls.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <LiveCallShowcase scenarios={appointmentScenarios} aiLabel="AI Appointment Setter" />
            </ScrollReveal>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-card/20 border-y border-border/40">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <StatBox label="Booking Conversion" value="3x" sub="Zero caller drop-offs" />
              <StatBox label="No-Show Rate" value="-70%" sub="Via automated SMS reminders" />
              <StatBox label="Call Duration" value="< 60s" sub="Fast & hassle-free booking" />
              <StatBox label="Calendar Sync" value="Instant" sub="Real-time slot locking" />
            </div>
          </div>
        </section>

        {/* Deployment Steps */}
        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <Sparkles className="size-3.5 text-black" aria-hidden />
                Deployment Workflow
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Set Up Your AI Appointment Setter in <span className="italic text-primary">4 Simple Steps</span>
              </h2>
              <p className="mt-3 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">
                Connect your existing calendar and start booking appointments automatically.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <DeploymentTimeline steps={appointmentSteps} />
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 border-t border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
            <ScrollReveal className="text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <Sparkles className="size-3.5 text-black" aria-hidden />
                Got Questions?
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Frequently Asked <span className="italic text-primary">Questions</span>
              </h2>
              <p className="mt-3 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">Common questions about AI phone appointment scheduling.</p>
            </ScrollReveal>

            <div className="space-y-4">
              <FaqItem
                index={0}
                question="What calendar software does 9278.ai integrate with?"
                answer="We natively support Google Calendar, Microsoft Outlook / Office 365, Cal.com, Calendly, Acuity, and offer custom webhook integrations for healthcare EHRs and custom CRMs."
              />
              <FaqItem
                index={1}
                question="How does it prevent double-booking?"
                answer="Our engine performs a live calendar availability lookup during the phone call and places a temporary real-time hold on the selected slot before confirming with the caller."
              />
              <FaqItem
                index={2}
                question="Can callers reschedule or cancel an existing appointment over the phone?"
                answer="Yes! Callers can dial back anytime, provide their name or phone number, and the AI agent will locate their existing booking to modify or cancel it according to your cancellation rules."
              />
              <FaqItem
                index={3}
                question="Can the AI collect custom intake questions before confirming?"
                answer="Absolutely. You can configure required intake questions (such as reason for visit, address, referral source, or insurance provider) that the AI must collect before finalizing the appointment."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaPanel
          title={
            <>
              Ready to automate your <span className="text-primary">phone bookings?</span>
            </>
          }
          description="Build and test your AI Appointment Setter in under 10 minutes. Test a real scheduling call on your own phone."
          primary={{ label: "Get started for free", href: "/get-started?feature=appointment-setter", icon: "arrow" }}
          secondary={{ label: "View pricing & plans", href: "/pricing", variant: "outline" }}
        />

        {/* Related Feature Links */}
        <RelatedLinks
          heading="Explore Related AI Voice Solutions"
          description="Combine appointment setting with 24/7 receptionist coverage and multi-tier pricing."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/features/ai-voice-receptionist",
              title: "AI Voice Receptionist",
              description: "Answer 100% of inbound calls 24/7 with zero latency and warm staff transfers.",
            },
            {
              href: "/pricing",
              title: "Pricing & Per-Minute Rates",
              description: "Transparent rates from $0.15 down to $0.10/min with no setup fees.",
            },
            {
              href: "/industries",
              title: "Industry Playbooks",
              description: "Explore tailored scheduling workflows for dental, medical, real estate, and home services.",
            },
          ]}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

function CapabilityCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-lg hover:-translate-y-1">
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 border border-primary/20">
        <Icon className="size-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function StatBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-white/70 dark:bg-card/50 p-6 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xs min-h-[140px]">
      <p className="text-3xl font-serif font-bold text-primary/75 tracking-tight">{value}</p>
      <p className="text-sm font-bold text-foreground mt-2">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  )
}

