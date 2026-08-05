import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Globe2, PhoneCall, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CtaPanel } from "@/components/ui/cta-panel"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { AmbientGlow } from "@/components/industries/ambient-glow"
import { HeroVoiceAura } from "@/components/features/ai-receptionist/hero-voice-aura"
import { PipelineFlow } from "@/components/features/ai-receptionist/pipeline-flow"
import { LanguageShowcase } from "@/components/features/ai-receptionist/language-showcase"
import { FaqLookupDemo } from "@/components/features/ai-receptionist/faq-lookup-demo"
import { ROUTING_RULES, RoutingCard } from "@/components/features/ai-receptionist/routing-grid"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "AI Receptionist",
  description:
    "A 24/7 AI receptionist that greets every caller by name of business, understands intent instantly, answers FAQs from your knowledge base, and routes calls to the right place — sub-300ms latency, 60+ languages.",
  path: "/features/ai-voice-receptionist",
})

export default function AiReceptionistPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "AI Receptionist", path: "/features/ai-voice-receptionist" },
        ]}
      />
      <ServiceJsonLd
        name="AI Receptionist"
        description="24/7 automated greeting, intent recognition, FAQ handling, and caller routing for inbound phone calls."
        path="/features/ai-voice-receptionist"
        serviceType="AI voice agent"
      />

      {/* Hero — text left, live-demo mockup right */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="bg-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)]"
        />
        <AmbientGlow />

        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <ScrollReveal>
              <span className="ai-pill-cyan">
                <Sparkles className="size-3.5" aria-hidden />
                AI Receptionist
              </span>
              <h1 className="mt-6 text-balance font-serif text-[10.5vw] font-normal leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
                Every call greeted, understood, and routed —{" "}
                <span className="text-aurora text-aurora-flow italic">in real time.</span>
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                An always-on AI receptionist that answers the phone like your best front-desk hire: a natural greeting,
                instant intent recognition, sub-second FAQ answers, and a clean hand-off to the right person — 24 hours
                a day, every day.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/get-started">
                    Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <HeroVoiceAura />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.16} className="mx-auto mt-14 max-w-2xl">
            <PipelineFlow />
          </ScrollReveal>
        </div>
      </section>

      {/* Human-like greetings & multi-language */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <ScrollReveal>
            <span className="ai-pill-violet">
              <Globe2 className="size-3.5" aria-hidden />
              Greetings
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
              A human-sounding greeting,{" "}
              <span className="text-aurora text-aurora-flow italic">in whatever language they call in.</span>
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              No robotic menu, no dead air. Every caller hears a warm, on-brand greeting within a second of the ring
              — auto-detected and delivered in their language, with the tone your business runs on: friendly, warm,
              or strictly professional.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <LanguageShowcase />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ knowledge-base lookup */}
      <section className="border-y border-border/50 bg-card/20">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
            <ScrollReveal className="order-2 md:order-1">
              <FaqLookupDemo />
            </ScrollReveal>
            <ScrollReveal delay={0.08} className="order-1 md:order-2">
              <span className="ai-pill-magenta">
                <Sparkles className="size-3.5" aria-hidden />
                Knowledge base
              </span>
              <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Instant answers,{" "}
                <span className="text-aurora text-aurora-flow italic">pulled straight from your knowledge base.</span>
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Hours, pricing, policies, walk-in availability, directions — your agent searches your knowledge base
                and answers in under a second, so callers never sit on hold for something a document already knows.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call routing breakdown */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
        <ScrollReveal>
          <span className="ai-pill-cyan">
            <PhoneCall className="size-3.5" aria-hidden />
            Routing
          </span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Once intent is clear,{" "}
            <span className="text-aurora text-aurora-flow italic">the call goes exactly where it should.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            Every routing rule below is configured once and runs automatically — by department, by intent, or by
            urgency — with full call context passed along so nobody repeats themselves.
          </p>
        </ScrollReveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {ROUTING_RULES.map((rule) => (
            <StaggerItem key={rule.title}>
              <RoutingCard {...rule} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Stats / trust row */}
      <section className="border-y border-border/50 bg-card/20">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <Stat icon={Sparkles} label="First response" value="< 300ms" sub="Callers hear a greeting before the first ring finishes." />
            <Stat icon={Clock} label="Availability" value="24/7 · 365" sub="Every call answered, including nights, weekends & holidays." />
            <Stat icon={Globe2} label="Languages" value="60+" sub="Auto-detected mid-call, no menu required." />
            <Stat icon={ShieldCheck} label="Concurrent calls" value="Up to 3" sub="Handle simultaneous callers on the Scale plan." />
          </ScrollReveal>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Never miss <span className="text-primary">another caller.</span>
          </>
        }
        description="Every ring gets a warm, human-sounding greeting, an instant answer, or a perfect hand-off — 24 hours a day, 365 days a year."
        primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
        secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
      />

      <RelatedLinks
        heading="Keep exploring 9278.ai"
        description="Other features that pair naturally with the AI receptionist."
        variant="flip"
        showNumber={false}
        links={[
          {
            href: "/features/appointment-setter",
            title: "Appointment Setter",
            description: "Books, confirms, and reschedules appointments straight from the call.",
          },
          {
            href: "/features/answering-services",
            title: "Answering Services",
            description: "After-hours and overflow coverage so no call ever rings out to voicemail.",
          },
          {
            href: "/features/call-transfer",
            title: "Call Transfer",
            description: "Warm or cold hand-offs to the right teammate, with full context passed along.",
          },
          {
            href: "/pricing",
            title: "Pricing & per-minute rates",
            description: "Compare Starter, Growth, and Scale plans and see the full rate card.",
          },
        ]}
      />

      <SiteFooter />
    </main>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {label}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  )
}
