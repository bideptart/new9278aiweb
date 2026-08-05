import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Timer, Waypoints } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CtaPanel } from "@/components/ui/cta-panel"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { AmbientGlow } from "@/components/industries/ambient-glow"
import { HeroTransferGraph } from "@/components/features/call-transfer/hero-transfer-graph"
import { WarmColdToggle } from "@/components/features/call-transfer/warm-cold-toggle"
import { AgentScreenCard } from "@/components/features/call-transfer/agent-screen-card"
import { FallbackRouting } from "@/components/features/call-transfer/fallback-routing"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "Call Transfer",
  description:
    "Warm and cold call transfers with full context hand-off. 9278.ai's AI voice agents brief your human agents live or send a written summary instantly — zero cold pickups, always-on fallback routing.",
  path: "/features/call-transfer",
})

export default function CallTransferPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Call Transfer", path: "/features/call-transfer" },
        ]}
      />

      <main className="flex-1">
        {/* Hero — open canvas node graph, not a bordered panel */}
        <section className="relative overflow-hidden">
          <AmbientGlow variant="brand" />
          <div className="mx-auto w-full max-w-5xl px-4 pt-16 md:px-6 md:pt-24">
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
                  <li className="text-foreground">Call Transfer</li>
                </ol>
              </nav>

              <span className="ai-pill-magenta">
                <Waypoints className="size-3.5" aria-hidden />
                Call Transfer
              </span>
              <h1 className="mt-6 max-w-3xl text-balance font-serif text-[10.5vw] font-normal leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
                Hand off calls with{" "}
                <span className="text-aurora text-aurora-flow italic">full context, every time.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Warm or cold, every transfer arrives with an AI-generated summary already in hand — so your human
                agents never pick up a call cold, and no caller ever has to repeat themselves.
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
          </div>

          <div className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
            <HeroTransferGraph />
          </div>
        </section>

        {/* Warm vs. cold transfer */}
        <section className="border-t border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
            <ScrollReveal>
              <span className="ai-pill-cyan">
                <Sparkles className="size-3" aria-hidden />
                Two ways to transfer
              </span>
              <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Warm vs. cold transfer —{" "}
                <span className="text-aurora text-aurora-flow italic">your call.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
                Flip the toggle to see how each mode moves a caller from the AI agent to a human — and what the human
                agent sees when they pick up.
              </p>
              <div className="mt-8">
                <WarmColdToggle />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pre-transfer AI summary injection */}
        <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
            <ScrollReveal>
              <h2 className="text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
                No cold pickups. <span className="text-aurora text-aurora-flow italic">Ever.</span>
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                By the time a transferred call rings on a human agent's line, the AI has already written up who's
                calling, why, and how they sound — populated on screen before the agent says a single word.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  Caller identity, reason for the call, and sentiment — every time.
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  Delivered to whatever softphone or CRM screen-pop your team already uses.
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  Written the instant the transfer fires — no lag between ring and read.
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <AgentScreenCard />
            </ScrollReveal>
          </div>
        </section>

        {/* Fallback routing */}
        <section className="border-t border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
            <ScrollReveal>
              <span className="ai-pill-violet">
                <Timer className="size-3" aria-hidden />
                Never a dead end
              </span>
              <h2 className="mt-4 text-balance font-serif text-3xl font-normal leading-tight tracking-tight md:text-5xl lg:text-6xl">
                If a human doesn't pick up,{" "}
                <span className="text-aurora text-aurora-flow italic">the call keeps moving.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
                Fallback rules run automatically — no dispatcher, no dropped call, no dead air.
              </p>
              <div className="mt-8">
                <FallbackRouting />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <ScrollReveal className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <Stat label="Transfer success rate" value="98.6%" sub="Reaches a live human or resolves via fallback — no dead ends." />
            <Stat label="Average hand-off time" value="< 4 seconds" sub="From transfer trigger to context on the human agent's screen." />
            <Stat label="Context-retention rate" value="100%" sub="Every transfer arrives with an AI summary. Zero cold pickups." />
            <Stat label="Fallback coverage" value="3 tiers deep" sub="Agent A → Agent B → voicemail, queue, or callback offer." />
          </ScrollReveal>
        </section>

        <CtaPanel
          title={
            <>
              Hand off calls with <span className="text-primary">full context, every time.</span>
            </>
          }
          description="Spin up an agent that transfers with confidence — warm or cold, briefed or noted, never blind."
          primary={{ label: "Get started", href: "/get-started", icon: "arrow" }}
          secondary={{ label: "View pricing", href: "/pricing", variant: "outline" }}
        />

        <RelatedLinks
          heading="Keep exploring"
          description="Other features that pair with call transfer inside a 9278.ai agent."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/features/ai-voice-receptionist",
              title: "AI Receptionist",
              description: "Greets every caller, answers FAQs, and routes them to the right place before a human ever picks up.",
            },
            {
              href: "/features/appointment-setter",
              title: "Appointment Setter",
              description: "Books, reschedules, and confirms appointments straight into your calendar in real time.",
            },
            {
              href: "/features/answering-services",
              title: "Answering Services",
              description: "After-hours and overflow coverage so no call goes to voicemail, day or night.",
            },
            {
              href: "/pricing",
              title: "Pricing & per-minute rates",
              description: "Compare Starter, Growth and Scale plans and see the full phone-number rate card.",
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
      <p className="mt-3 text-2xl font-normal tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  )
}
