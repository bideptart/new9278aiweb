import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Gauge, PhoneIncoming, ShieldAlert, Siren, Timer } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { CtaPanel } from "@/components/ui/cta-panel"
import { RelatedLinks } from "@/components/seo/related-links"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { pageSeo } from "@/lib/seo"
import { HeroOpsPanel } from "@/components/features/answering-services/hero-ops-panel"
import { ConcurrencyComparison } from "@/components/features/answering-services/concurrency-comparison"
import { EscalationDemo } from "@/components/features/answering-services/escalation-demo"
import { IntegrationsRow } from "@/components/features/answering-services/integrations-row"

export const metadata: Metadata = pageSeo({
  title: "Answering Services",
  description:
    "24/7 AI answering service with unlimited concurrency, custom emergency escalation, and instant call summaries logged straight to your CRM. Zero busy signals, zero dropped calls.",
  path: "/features/answering-services",
})

export default function AnsweringServicesPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Answering Services", path: "/features/answering-services" },
        ]}
      />
      <ServiceJsonLd
        name="AI answering service"
        description="24/7 AI-powered call answering with unlimited concurrency, emergency escalation, and CRM logging."
        path="/features/answering-services"
        serviceType="AI voice agent"
      />

      {/* Hero — uses the site's normal background/foreground tokens (light
          or dark, whichever the visitor has set) instead of a forced-dark
          "ops console" surface, so it reads like the rest of 9278.ai. */}
      <section className="relative overflow-hidden border-b border-border/50 bg-background text-foreground">
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--ai-violet)_14%,transparent),transparent_72%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[280px] bg-[radial-gradient(55%_55%_at_50%_100%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_75%)]"
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
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
                <li className="text-foreground">Answering Services</li>
              </ol>
            </nav>

            <span className="ai-pill-violet">
              <Siren className="size-3.5" aria-hidden />
              24/7 answering services
            </span>

            <h1 className="mt-6 max-w-xl text-balance font-serif text-[10.5vw] font-normal leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
              Never miss a call. <span className="text-aurora text-aurora-flow italic">Ever.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              After-hours coverage, high-volume overflow, and emergency escalations — answered the instant they come
              in, with a summary already sitting in your CRM before you pick up your phone.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/get-started?feature=answering-services">
                  Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <HeroOpsPanel />
          </ScrollReveal>
        </div>
      </section>

      {/* Unlimited concurrency */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
        <ScrollReveal>
          <span className="ai-pill-cyan">
            <PhoneIncoming className="size-3.5" aria-hidden />
            Zero busy signals
          </span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Unlimited concurrency.{" "}
            <span className="text-aurora text-aurora-flow italic">Every caller gets through.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            A traditional answering service runs out of lines the moment volume spikes. 9278.ai scales with the
            call — the hundredth caller gets the same instant pickup as the first.
          </p>
          <div className="mt-8">
            <ConcurrencyComparison />
          </div>
        </ScrollReveal>
      </section>

      {/* Emergency escalation */}
      <section className="border-y border-border/50 bg-card/20">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal>
            <span className="ai-pill-violet">
              <ShieldAlert className="size-3.5" aria-hidden />
              Custom escalation triggers
            </span>
            <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Urgent calls get routed to a human.{" "}
              <span className="text-aurora text-aurora-flow italic">Instantly.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
              You define what counts as urgent — a burst pipe, a security alarm, a VIP account. Everything else
              gets answered, logged, and queued for business hours; anything on your trigger list escalates to a
              live transfer or an SMS page the moment it's detected.
            </p>
            <div className="mt-8">
              <EscalationDemo />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integrations */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
        <ScrollReveal>
          <h2 className="text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Every call summary,{" "}
            <span className="text-aurora text-aurora-flow italic">logged the instant it ends</span>
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            No manual data entry. As soon as a call wraps, the summary, caller intent, and any escalation are
            written straight into the tools your team already lives in.
          </p>
          <div className="mt-8">
            <IntegrationsRow />
          </div>
        </ScrollReveal>
      </section>

      {/* Stats / trust row */}
      <section className="border-y border-border/50 bg-card/20">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <Stat icon={Gauge} label="Concurrent capacity" value="100+ calls" sub="Elastic capacity — no busy signal, no hold queue, ever." />
            <Stat icon={Timer} label="Average answer time" value="< 0.3s" sub="Every call picked up before the first ring finishes." />
            <Stat icon={ShieldAlert} label="Escalation response" value="< 15s" sub="From trigger detected to a human notified or live-transferred." />
            <Stat icon={PhoneIncoming} label="Platform uptime" value="99.99%" sub="Carrier-grade telephony, monitored around the clock." />
          </ScrollReveal>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Never drop a call <span className="text-primary">again.</span>
          </>
        }
        description="Spin up a 24/7 answering agent in minutes — after-hours coverage, overflow handling, and emergency escalation, all logged automatically. No credit card to try."
        primary={{ label: "Get started", href: "/get-started?feature=answering-services", icon: "arrow" }}
        secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
      />

      <RelatedLinks
        heading="Explore the rest of the platform"
        description="Answering Services pairs naturally with these other 9278.ai capabilities."
        variant="flip"
        showNumber={false}
        links={[
          {
            href: "/features/ai-voice-receptionist",
            title: "AI Receptionist",
            description: "A receptionist that greets every caller by name and routes them to the right place.",
          },
          {
            href: "/features/appointment-setter",
            title: "Appointment Setter",
            description: "Books, reschedules, and confirms appointments straight into your calendar.",
          },
          {
            href: "/features/call-transfer",
            title: "Call Transfer",
            description: "Warm or cold hands off any call to the right teammate, with full context passed along.",
          },
          {
            href: "/pricing",
            title: "Compare plans and per-minute rates",
            description: "Three tiers from $20 to $100, with rates from $0.15 down to $0.10/min.",
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
  icon: typeof Gauge
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
