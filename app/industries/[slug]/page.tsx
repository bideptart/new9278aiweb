import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle2, MessageSquareQuote, Sparkles, Volume2, ShieldCheck, Zap, PhoneCall, Play } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { AmbientGlow } from "@/components/industries/ambient-glow"
import { VoiceOrb } from "@/components/animation/voice-orb"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

import { IndustryInteractiveShowcase } from "@/components/industries/industry-interactive-showcase"
import { HeroAgentConsoleMockup, HeroMetricsCard } from "@/components/industries/hero-agent-console-mockup"
import { IndustryPlaybooksPreview } from "@/components/industries/industry-playbooks-preview"
import { IndustryLiveMetricsSection } from "@/components/industries/industry-live-metrics-section"
import { IndustryRolloutPhases } from "@/components/industries/industry-rollout-phases"
import { OtherIndustriesGrid } from "@/components/industries/other-industries-grid"
import { RealEstateFolderGalleryHero } from "@/components/industries/real-estate-folder-gallery-hero"
import { RealEstatePlatformFeatures } from "@/components/industries/real-estate-platform-features"
import { RealEstateCallSimulator } from "@/components/industries/real-estate-call-simulator"
import { RealEstateAdvancedCapabilities } from "@/components/industries/real-estate-advanced-capabilities"
import { EcommerceHero } from "@/components/industries/ecommerce-hero"
import { EcommerceConversionEngine } from "@/components/industries/ecommerce-conversion-engine"
import { EcommerceCartRecoverySuite } from "@/components/industries/ecommerce-cart-recovery-suite"
import { EcommerceEcosystemIntegrations } from "@/components/industries/ecommerce-ecosystem-integrations"
import { FinanceHero } from "@/components/industries/finance-hero"
import { FinanceVaultMatrix } from "@/components/industries/finance-vault-matrix"
import { FinanceSettlementHub } from "@/components/industries/finance-settlement-hub"
import { FinanceCoreIntegrations } from "@/components/industries/finance-core-integrations"
import { HomeServicesHero } from "@/components/industries/home-services-hero"
import { HomeServicesDispatchMatrix } from "@/components/industries/home-services-dispatch-matrix"
import { HomeServicesDispatchSimulator } from "@/components/industries/home-services-dispatch-simulator"
import { HomeServicesIntegrations } from "@/components/industries/home-services-integrations"
import { RestaurantHospitalityHero } from "@/components/industries/restaurant-hospitality-hero"
import { HealthcareHero } from "@/components/industries/healthcare-hero"

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}

  return pageSeo({
    title: `AI Voice Agents for ${industry.name} | 24/7 Inbound & Outbound Calling`,
    description: industry.pitch,
    path: `/industries/${industry.slug}`,
  })
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const Icon = industry.icon

  // Pick three sibling industries for the related-links module.
  const related = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3)

  return (
    <main className="min-h-dvh bg-background text-foreground overflow-hidden">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`AI voice agents for ${industry.name.toLowerCase()}`}
        description={industry.pitch}
        path={`/industries/${industry.slug}`}
        serviceType="AI voice agent"
      />

      {/* Hero Section */}
      {industry.slug === "real-estate" ? (
        <RealEstateFolderGalleryHero />
      ) : industry.slug === "ecommerce" ? (
        <EcommerceHero />
      ) : industry.slug === "finance" ? (
        <FinanceHero />
      ) : industry.slug === "home-services" ? (
        <HomeServicesHero />
      ) : industry.slug === "restaurants" ? (
        <RestaurantHospitalityHero />
      ) : industry.slug === "healthcare" || industry.slug === "dental" ? (
        <HealthcareHero />
      ) : (
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          {/* Ambient Lighting Background */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/4 -z-10 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-rose-500/10 to-transparent blur-3xl opacity-75"
          />

          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline & Value Prop */}
              <ScrollReveal className="lg:col-span-6">
                <nav aria-label="Breadcrumb" className="mb-6">
                  <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                    <li>
                      <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                      </Link>
                    </li>
                    <li aria-hidden>/</li>
                    <li>
                      <Link href="/industries" className="hover:text-foreground transition-colors">
                        Industries
                      </Link>
                    </li>
                    <li aria-hidden>/</li>
                    <li className="text-foreground font-medium">{industry.name}</li>
                  </ol>
                </nav>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="ai-pill-magenta inline-flex items-center gap-2 shadow-xs">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-primary" />
                    </span>
                    <Icon className="size-3.5 text-primary" aria-hidden />
                    <span className="font-bold">{industry.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-mono font-medium text-muted-foreground backdrop-blur-md">
                    <ShieldCheck className="size-3.5 text-primary" />
                    24/7 Voice AI Engine
                  </span>
                </div>

                <h1 className="text-balance text-4xl font-serif font-normal leading-[1.06] tracking-tight md:text-6xl text-foreground">
                  AI voice agents for <span className="italic text-primary">{industry.name.toLowerCase()}.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {industry.pitch}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="group btn-ai !text-rose-400 dark:!text-rose-300 h-12 rounded-full px-7 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all">
                    <Link href={`/get-started?industry=${industry.slug}`}>
                      Get started <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-border/70 bg-card/50 px-7 backdrop-blur-md hover:border-primary/40 hover:bg-card/80 transition-all font-medium"
                  >
                    <Link href="/pricing">View pricing</Link>
                  </Button>
                </div>

                {/* Hero Metrics Bar (Matching 9278.io design) */}
                <HeroMetricsCard />
              </ScrollReveal>

              {/* Right Column: Agent Console Stack */}
              <ScrollReveal delay={0.15} className="lg:col-span-6 flex justify-center pt-6 lg:pt-0">
                <HeroAgentConsoleMockup industryName={industry.name} slug={industry.slug} />
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* Real Estate / E-Commerce / Finance / Home Services Interactive Feature Showcase */}
      {industry.slug === "real-estate" ? (
        <RealEstatePlatformFeatures />
      ) : industry.slug === "ecommerce" ? (
        <EcommerceConversionEngine />
      ) : industry.slug === "finance" ? (
        <FinanceVaultMatrix />
      ) : industry.slug === "home-services" ? (
        <HomeServicesDispatchMatrix />
      ) : (
        <IndustryInteractiveShowcase industryName={industry.name} />
      )}

      {/* Real Estate Live Call Simulator / E-Commerce Cart Recovery Suite / Finance Settlement Hub / Home Services Dispatch Simulator / Playbooks Preview */}
      {industry.slug === "real-estate" ? (
        <RealEstateCallSimulator />
      ) : industry.slug === "ecommerce" ? (
        <EcommerceCartRecoverySuite />
      ) : industry.slug === "finance" ? (
        <FinanceSettlementHub />
      ) : industry.slug === "home-services" ? (
        <HomeServicesDispatchSimulator />
      ) : (
        <IndustryPlaybooksPreview industryName={industry.name} slug={industry.slug} />
      )}



      {/* Live Animated Metrics Section */}
      <IndustryLiveMetricsSection industryName={industry.name} />

      {/* E-Commerce Ecosystem Integrations / Finance Core Banking / Home Services Field Integrations & ROI Estimator / PHASE 01 & PHASE 02 Rollout */}
      {industry.slug === "ecommerce" ? (
        <EcommerceEcosystemIntegrations />
      ) : industry.slug === "finance" ? (
        <FinanceCoreIntegrations />
      ) : industry.slug === "home-services" ? (
        <HomeServicesIntegrations />
      ) : industry.slug !== "real-estate" ? (
        <IndustryRolloutPhases industryName={industry.name} slug={industry.slug} />
      ) : null}

      {/* Enterprise Real Estate AI Engine / Other Industries We Power Grid */}
      {industry.slug === "real-estate" ? (
        <RealEstateAdvancedCapabilities />
      ) : (
        <OtherIndustriesGrid currentSlug={industry.slug} />
      )}

      <SiteFooter />
    </main>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md shadow-xs transition-all hover:border-primary/40 hover:bg-card/60">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-muted-foreground">
        <Sparkles className="size-4 text-primary" aria-hidden />
        {label}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{sub}</p>
    </div>
  )
}
