import type { Metadata } from "next"
import Link from "next/link"
import {
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  Globe,
  PhoneForwarded,
  MessageSquareQuote,
  Zap,
  Sliders,
  Database,
  Headphones,
  HelpCircle,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FaqItem } from "@/components/ui/faq-item"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { CtaPanel } from "@/components/ui/cta-panel"
import { CallRoutingOrbit } from "@/components/ui/call-routing-orbit"
import { CapabilityCard } from "@/components/ui/capability-card"
import { AfterHoursPreview } from "@/components/ui/after-hours-preview"
import { LiveCallShowcase } from "@/components/ui/live-call-showcase"
import { StatBoxLoop } from "@/components/ui/stat-box-loop"
import { DeploymentTimeline } from "@/components/ui/deployment-timeline"

export const metadata: Metadata = pageSeo({
  title: "AI Voice Receptionist — 24/7 Inbound Call Automation",
  description:
    "Answer 100% of inbound business calls 24/7 with zero latency, natural human voice, instant warm transfers, and automatic CRM lead intake.",
  path: "/features/ai-voice-receptionist",
})

export default function AiVoiceReceptionistPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "AI Voice Receptionist", path: "/features/ai-voice-receptionist" },
        ]}
      />
      <ServiceJsonLd
        name="AI Voice Receptionist"
        description="24/7 automated inbound call handling, customer intake, and caller transfer."
        path="/features/ai-voice-receptionist"
        serviceType="AI Voice Service"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.15),transparent_70%)]"
          />
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-8">
            <ScrollReveal className="lg:col-span-7">
              <div className="flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 px-4 py-1.5 text-xs font-bold tracking-wide text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20 transition-all hover:border-primary/50 hover:shadow-primary/20">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <PhoneCall className="size-3.5 text-black" aria-hidden />
                  AI Voice Receptionist
                </span>

                <h1 className="text-balance text-4xl font-serif font-normal tracking-tight sm:text-5xl md:text-6xl max-w-4xl leading-[1.08]">
                  Never miss another inbound call with an <span className="italic text-primary">AI Voice Receptionist.</span>
                </h1>

                <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-xl">
                  Answer 100% of incoming phone calls instantly with human-like accuracy, sub-300ms response speeds, intelligent intake, and seamless live staff call transfers.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="h-12 px-7 rounded-full border border-neutral-600/80 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 text-white font-bold shadow-md hover:from-neutral-700 hover:to-neutral-700 hover:border-neutral-500 transition-all text-base">
                    <Link href="/get-started?feature=ai-voice-receptionist">
                      Test AI Receptionist Live <ArrowRight className="ml-2 size-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-7 rounded-full border-border/80 hover:bg-accent text-base">
                    <Link href="/pricing">View Pricing & Rates</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-5">
              <CallRoutingOrbit />
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-card/10">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <Sparkles className="size-3.5 text-black animate-pulse" aria-hidden />
                Core Capabilities
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Built for <span className="italic text-primary">High-Volume</span> Business Phone Lines
              </h2>
              <p className="mt-4 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto">
                Replace rigid IVR menus and missed voicemails with an intelligent voice agent that converses like a trained front-desk professional.
              </p>
            </ScrollReveal>

            <StaggerGroup className="grid gap-4 md:grid-cols-12">
              <StaggerItem className="md:col-span-7">
                <CapabilityCard
                  icon={Clock}
                  label="Speed"
                  title="Zero-Latency Responses"
                  description="Sub-300ms response speed guarantees speech flows naturally without robot delays, awkward pauses, or overlap."
                >
                  <LatencyPreview />
                </CapabilityCard>
              </StaggerItem>
              <StaggerItem className="md:col-span-5">
                <CapabilityCard
                  icon={Globe}
                  label="Language"
                  title="Multilingual Fluency"
                  description="Recognizes and responds in 30+ languages automatically, serving diverse caller demographics."
                >
                  <LanguagePreview />
                </CapabilityCard>
              </StaggerItem>

              <StaggerItem className="md:col-span-4">
                <CapabilityCard
                  icon={PhoneForwarded}
                  label="Routing"
                  title="Intelligent Live Transfer"
                  description="Transfers urgent calls to your team with an AI summary delivered before pickup."
                >
                  <TransferPreview />
                </CapabilityCard>
              </StaggerItem>
              <StaggerItem className="md:col-span-4">
                <CapabilityCard
                  icon={Database}
                  label="Data"
                  title="Automatic CRM Sync"
                  description="Extracts caller details and logs complete transcripts straight to your CRM."
                >
                  <CrmPreview />
                </CapabilityCard>
              </StaggerItem>
              <StaggerItem className="md:col-span-4">
                <CapabilityCard
                  icon={Sliders}
                  label="Voice"
                  title="Custom Voice & Persona"
                  description="Tailor greetings and voice personas to match your company's tone."
                >
                  <VoicePreview />
                </CapabilityCard>
              </StaggerItem>

              <StaggerItem className="md:col-span-12">
                <CapabilityCard
                  icon={Headphones}
                  label="Coverage"
                  title="After-Hours & Overflow"
                  description="Handles 100% of after-hours calls and takes over automatically when your line is busy."
                  wide
                >
                  <AfterHoursPreview />
                </CapabilityCard>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Sample Real-world Dialogues */}
        <section className="py-16 md:py-24 border-y border-border/50">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <MessageSquareQuote className="size-3.5 text-black" aria-hidden />
                Proven Call Playbooks
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                See How the AI Receptionist Handles <span className="italic text-primary">Real Scenarios</span>
              </h2>
              <p className="mt-3 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground/90">
                Real conversation transcripts generated by 9278.ai voice agents across industries.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <LiveCallShowcase initialIndex={3} />
            </ScrollReveal>
          </div>
        </section>

        {/* Impact Stats (Clean Minimal Stat Strip with Centered Top Badge) */}
        <section className="py-12 md:py-16 border-y border-border/50 bg-background/50">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <Zap className="size-3.5 text-black" aria-hidden />
                Measurable Impact
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/60">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
                  0<span className="text-primary">%</span>
                </p>
                <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Missed Calls
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
                  &lt; 280<span className="text-primary">ms</span>
                </p>
                <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Average Latency
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
                  80<span className="text-primary">%</span>
                </p>
                <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Cost Reduction
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-foreground">
                  24/7<span className="text-primary">/365</span>
                </p>
                <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Availability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment Steps */}
        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <CheckCircle2 className="size-3.5 text-black" aria-hidden />
                Setup Checklist
              </span>

              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Deploy Your AI Receptionist in <span className="italic text-primary">4 Easy Steps</span>
              </h2>

              <p className="mt-4 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto">
                No complex coding or hardware needed. Launch a fully functional phone agent in under 10 minutes.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <DeploymentTimeline />
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 border-t border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
            <ScrollReveal className="text-center mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <HelpCircle className="size-3.5 text-black" aria-hidden />
                Frequently Asked Questions
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Everything You Need to <span className="italic text-primary">Know</span>
              </h2>
              <p className="mt-3 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto">
                Clear answers to common questions about setting up your AI Voice Receptionist.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="w-full space-y-3">
                {faqs.map((item, i) => (
                  <FaqItem
                    key={item.question}
                    index={i}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <CtaPanel
          title={
            <>
              Ready to automate your <span className="text-primary">front desk calls?</span>
            </>
          }
          description="Build and test your AI Voice Receptionist in minutes. Place a live test call directly to your phone."
          primary={{ label: "Get started for free", href: "/get-started?feature=ai-voice-receptionist", icon: "arrow" }}
          secondary={{ label: "View pricing & plans", href: "/pricing", variant: "outline" }}
        />

        {/* Related Feature Links */}
        <RelatedLinks
          heading="Explore Related AI Voice Solutions"
          description="Combine receptionist intelligence with calendar booking and call analytics."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/features/appointment-setter",
              title: "Appointment Setter AI",
              description: "Automate calendar scheduling, slot negotiations, and instant SMS confirmations.",
            },
            {
              href: "/pricing",
              title: "Pricing & Per-Minute Rates",
              description: "Transparent pricing tiers with no hidden fees or extra hardware costs.",
            },
            {
              href: "/industries",
              title: "Industry Playbooks",
              description: "Pre-tuned AI voice agents for healthcare, real estate, dental, and legal practices.",
            },
          ]}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

const faqs = [
  {
    question: "Can the AI Voice Receptionist transfer callers to my real staff?",
    answer:
      "Yes! You can define custom transfer rules (e.g. transfer VIP leads, emergency calls, or specific departments). The AI will put the caller on brief hold, dial your staff, announce the caller's details, and complete a warm transfer.",
  },
  {
    question: "Will callers know they are talking to an AI?",
    answer:
      "Our voice agents use sub-second audio generation with realistic breath sounds, natural pauses, and human inflection. Most callers cannot distinguish them from human staff, but you can also configure an explicit AI disclosure greeting.",
  },
  {
    question: "Can I keep my current business phone number?",
    answer:
      "Absolutely. You can simply turn on call forwarding from your existing carrier (Twilio, Verizon, AT&T, Comcast, etc.) to your 9278.ai receptionist line.",
  },
  {
    question: "What happens if a caller asks a complex question not in the prompt?",
    answer:
      "The AI agent is instructed to gracefully capture the caller's request, log their contact information, and send an urgent notification to your team via SMS, Email, or Slack.",
  },
]







function LatencyPreview() {
  const heights = [30, 55, 90, 45, 100, 65, 40, 80, 50, 95, 35, 70]
  return (
    <div className="rounded-xl border border-border/40 bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Response time</span>
        <span className="font-mono text-sm font-semibold tabular-nums text-primary">184ms</span>
      </div>
      <div className="mt-3 flex h-9 items-end gap-[3px]" aria-hidden="true">
        {heights.map((h, i) => (
          <span
            key={i}
            className="voice-bar w-[3px] rounded-full bg-primary/70"
            style={{ height: `${h}%`, animationDelay: `${i * 70}ms`, animationDuration: `${900 + (i % 4) * 100}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function LanguagePreview() {
  const langs = ["🇺🇸 English", "🇪🇸 Español", "🇫🇷 Français", "🇩🇪 Deutsch"]
  return (
    <div className="flex flex-wrap items-center gap-2">
      {langs.map((l) => (
        <span key={l} className="rounded-full border border-border/50 bg-background px-3 py-1 text-xs font-medium text-foreground">
          {l}
        </span>
      ))}
      <span className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">+26 more</span>
    </div>
  )
}

function TransferPreview() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/60 p-3.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
        <PhoneCall className="size-3.5" aria-hidden="true" />
      </span>
      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground ring-1 ring-border/50">
        <PhoneForwarded className="size-3.5" aria-hidden="true" />
      </span>
      <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Live
      </span>
    </div>
  )
}

function CrmPreview() {
  return (
    <div className="rounded-xl border border-border/40 bg-background/60 p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">HubSpot · Salesforce · Webhooks</span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
          Synced
        </span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">Lead name, phone & transcript logged automatically</p>
    </div>
  )
}

function VoicePreview() {
  const voices = [
    { name: "Aria", active: true },
    { name: "Ravi", active: false },
    { name: "Noah", active: false },
  ]
  return (
    <div className="flex items-center gap-2.5">
      {voices.map((v) => (
        <span
          key={v.name}
          className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
            v.active
              ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-card"
              : "bg-muted text-muted-foreground ring-1 ring-border/50"
          }`}
        >
          {v.name[0]}
        </span>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">Aria — Female, US</span>
    </div>
  )
}

