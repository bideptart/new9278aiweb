import type { Metadata } from "next"
import Link from "next/link"
import { FaqItem } from "@/components/ui/faq-item"
import { ProcessFlowTrack } from "@/components/ui/process-flow-track"
import { 
  PhoneForwarded, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Users, 
  Volume2, 
  PhoneCall, 
  Zap, 
  ShieldCheck, 
  Radio,
  Sliders,
  User,
  Bot,
  ChevronDown,
  PhoneOff,
  Check
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { CtaPanel } from "@/components/ui/cta-panel"

export const metadata: Metadata = pageSeo({
  title: "Call Transfer AI — Instant Warm & Cold Phone Routing",
  description:
    "Intelligent AI call transfer engine with warm whisper announcements, multi-extension round-robin, and fallback message handling.",
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
          { name: "Call Transfer AI", path: "/features/call-transfer" },
        ]}
      />
      <ServiceJsonLd
        name="Call Transfer AI"
        description="Instant warm whisper transfer and intelligent caller routing to live staff numbers."
        path="/features/call-transfer"
        serviceType="AI Telephony Routing Service"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.15),transparent_70%)]"
          />
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal>
              <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-foreground transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/features" className="hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-foreground font-medium">Call Transfer</li>
                </ol>
              </nav>

              <div className="flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary shadow-xs">
                  <PhoneForwarded className="size-3.5" aria-hidden />
                  Warm Whisper & Cold Call Transfer Engine
                </span>

                <h1 className="text-balance text-4xl font-serif font-normal tracking-tight sm:text-5xl md:text-6xl max-w-4xl leading-[1.08]">
                  Seamless <span className="italic text-primary">Call Transfer</span> to live staff with full context.
                </h1>

                <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-xl">
                  Qualify callers with AI first, then patch urgent or high-value leads directly to your cell phone or team extensions with an instant audio summary whispered before connection.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="btn-ai h-12 px-7 rounded-full shadow-lg shadow-black/20 hover:shadow-black/30 text-base font-semibold">
                    <Link href="/get-started?feature=call-transfer">
                      Test Call Transfer Live <ArrowRight className="ml-2 size-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-7 rounded-full border-border/80 hover:bg-accent text-base">
                    <Link href="/pricing">View Pricing & Rates</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Call Transfer Simulator */}
            <div className="mt-12 md:mt-16">
              <ScrollReveal>
                <div className="relative rounded-2xl border border-border/70 bg-card/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-emerald-500"></span>
                      </div>
                      <span className="text-sm font-semibold text-foreground tracking-wide">Live Telephony Bridge — Warm Transfer Flow</span>
                    </div>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                      SIP & PSTN Supported
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Step-by-Step Bridge Visualizer */}
                    <div className="space-y-3 font-sans text-sm">
                      <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/70 p-3.5 shadow-xs">
                        <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">1</div>
                        <div>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Caller Intake & Qualification</span>
                          <p className="text-foreground font-medium mt-0.5">Caller asks to speak with Senior Attorney Regarding Commercial Lease.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5 shadow-xs">
                        <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
                        <div>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider block">AI Warm Whisper Announcement</span>
                          <p className="text-foreground font-medium mt-0.5">AI puts caller on hold, dials Attorney Marcus, and whispers: "Incoming VIP lead John Smith regarding commercial lease dispute."</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 shadow-xs">
                        <div className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                        <div>
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">Live Audio Bridge Connected</span>
                          <p className="text-foreground font-medium mt-0.5">Caller and Attorney Marcus connected seamlessly with zero audio clipping.</p>
                        </div>
                      </div>
                    </div>

                    {/* Bridge Telephony Stats */}
                    <div className="flex flex-col justify-between rounded-xl border border-border/50 bg-background/50 p-5">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                          <Radio className="size-4 animate-pulse" /> Telephony Bridge Status
                        </div>

                        <div className="rounded-lg bg-card border border-border/60 p-4 space-y-2 text-xs">
                          <div className="flex justify-between pb-1.5 border-b border-border/30">
                            <span className="text-muted-foreground">Transfer Type:</span>
                            <span className="font-semibold text-primary">Warm Whisper Bridge</span>
                          </div>
                          <div className="flex justify-between pb-1.5 border-b border-border/30">
                            <span className="text-muted-foreground">Transfer Speed:</span>
                            <span className="font-mono text-xs text-foreground">1.4 seconds</span>
                          </div>
                          <div className="flex justify-between pb-1.5 border-b border-border/30">
                            <span className="text-muted-foreground">Fallback Protection:</span>
                            <span className="font-semibold text-emerald-500">Active (Auto-Message if Unanswered)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Audio Codec:</span>
                            <span className="font-mono text-xs text-foreground">G.711 / Opus HD Audio</span>
                          </div>
                        </div>
                      </div>

                      <Button asChild size="sm" className="w-full mt-4 btn-ai">
                        <Link href="/get-started">Configure Call Transfer Rules</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 md:py-24 bg-card/10">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="ai-pill-magenta">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Telephony Logic
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Advanced Telephony Routing & <span className="italic text-primary">Transfer Features</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Equip your phone system with carrier-grade transfer logic, whisper summaries, and smart fallback rules.
              </p>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CapabilityCard
                icon={Volume2}
                title="Warm Whisper Announcement"
                description="The AI whispers caller context, name, and reason for calling to your staff member before bridging the caller."
              />
              <CapabilityCard
                icon={Users}
                title="Multi-Staff Round Robin"
                description="Dial multiple team members sequentially or simultaneously until an available staff member accepts the call."
              />
              <CapabilityCard
                icon={PhoneOff}
                title="Smart Fallback Protection"
                description="If staff doesn't answer or is busy, the AI gracefully re-engages the caller to take a detailed message."
              />
              <CapabilityCard
                icon={Zap}
                title="Sub-2s Routing Latency"
                description="Outbound call leg initialization completes in under 2 seconds for instantaneous transfer speed."
              />
              <CapabilityCard
                icon={ShieldCheck}
                title="PSTN & SIP Trunking Support"
                description="Transfers calls to standard cell phones, landlines, softphones, or enterprise SIP endpoints."
              />
              <CapabilityCard
                icon={Radio}
                title="Custom Keyword Triggers"
                description="Trigger transfers based on spoken keywords like 'speak to agent', 'emergency', or specific staff names."
              />
            </div>
          </div>
        </section>

        {/* Sample Real-world Dialogues */}
        <section className="py-16 md:py-24 border-y border-border/50">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="max-w-3xl mb-12">
              <span className="ai-pill-magenta">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Transfer Scenarios
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Real Call Transfer <span className="italic text-primary">Dialogues</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                See how AI handles the transition between AI qualification and live staff pickup.
              </p>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              <TranscriptCard
                tag="Sales & Enterprise"
                scenario="High-Value Enterprise Lead Transfer"
                callerQuote="We're looking to deploy 50 AI voice agents across our call centers. Who can I speak with?"
                aiQuote="That sounds like a great fit for Vice President Alex. I am patching you directly to Alex right now — please stay on the line for 5 seconds."
              />
              <TranscriptCard
                tag="Healthcare & Medical"
                scenario="Urgent Triage & On-Call Nurse Bridge"
                callerQuote="My post-surgery wound is showing signs of high fever. Should I come in?"
                aiQuote="I am putting you on brief hold and transferring you directly to Triage Nurse Miller right now. Please hold for one moment."
              />
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-card/30">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <StatBox label="Transfer Latency" value="< 1.8s" sub="Sub-2 second bridge setup" />
              <StatBox label="Context Retained" value="100%" sub="Full whisper summary delivered" />
              <StatBox label="Call Drop Rate" value="0%" sub="Smart fallback protection" />
              <StatBox label="Supported Protocols" value="SIP & PSTN" sub="Twilio, Plivo, Cisco, & Cell" />
            </div>
          </div>
        </section>

        {/* Deployment Steps — Sticky Auto-Progressing Box-Less Track */}
        <ProcessFlowTrack
          eyebrow="Quick Configuration"
          headingTitle="Configure Call Transfers in"
          headingAccent="4 Easy Steps"
          subtitle="Set up intelligent staff call routing in under 10 minutes."
          nodes={[
            {
              number: "01",
              iconName: "phone",
              title: "Add Staff Numbers",
              description: "Enter staff mobile phone numbers, desk extensions, or SIP URIs.",
            },
            {
              number: "02",
              iconName: "sliders",
              title: "Set Transfer Rules",
              description: "Define which intent or keywords trigger a live transfer to which team member.",
            },
            {
              number: "03",
              iconName: "volume",
              title: "Enable Whisper",
              description: "Turn on warm whisper mode so AI announces the caller's topic before bridging.",
            },
            {
              number: "04",
              iconName: "shield",
              title: "Set Fallback",
              description: "Configure AI fallback instructions in case the staff member is busy or unavailable.",
            },
          ]}
        />

        {/* FAQ Section */}
        <section className="py-16 md:py-24 border-t border-border/50 bg-card/20">
          <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
            <ScrollReveal className="text-center mb-12">
              <span className="ai-pill-magenta">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Got Questions?
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Frequently Asked <span className="italic text-primary">Questions</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">Everything you need to know about AI call transfers.</p>
            </ScrollReveal>

            <div className="space-y-4">
              <FaqItem
                index={0}
                question="What is the difference between a Warm Transfer and a Cold Transfer?"
                answer="In a Warm Transfer, the AI dials your staff first, whispers a caller summary, and asks if you're ready to accept before bridging. In a Cold Transfer, the AI instantly forwards the call directly to your extension without an announcement."
              />
              <FaqItem
                index={1}
                question="What happens if the staff member does not answer the transferred call?"
                answer="Our system includes smart fallback protection. If your staff's line rings for more than X seconds or goes to voicemail, the AI re-engages the caller, explains staff is currently occupied, and takes a structured message."
              />
              <FaqItem
                index={2}
                question="Can I transfer calls to cell phone numbers?"
                answer="Yes! You can transfer calls to any standard mobile number, office landline, or international phone number."
              />
              <FaqItem
                index={3}
                question="Does the caller hear hold music during the transfer?"
                answer="Yes. While the AI is placing the outbound leg to your staff, the caller hears customizable hold audio or a realistic 'Connecting you to staff now...' voice line."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaPanel
          title={
            <>
              Connect callers to your <span className="text-primary">team instantly.</span>
            </>
          }
          description="Build and test AI Call Transfer rules in minutes. Place a live test call directly to your cell."
          primary={{ label: "Get started for free", href: "/get-started?feature=call-transfer", icon: "arrow" }}
          secondary={{ label: "View pricing & plans", href: "/pricing", variant: "outline" }}
        />

        {/* Related Feature Links */}
        <RelatedLinks
          heading="Explore Related AI Voice Solutions"
          description="Discover our full range of intelligent call handling tools."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/features/ai-voice-receptionist",
              title: "AI Voice Receptionist",
              description: "Answer 100% of inbound calls 24/7 with zero latency.",
            },
            {
              href: "/features/answering-services",
              title: "Answering Services",
              description: "24/7 automated call answering and instant team alert dispatching.",
            },
            {
              href: "/pricing",
              title: "Pricing & Per-Minute Rates",
              description: "Transparent rates from $0.15 down to $0.10/min with no setup fees.",
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

function TranscriptCard({ tag, scenario, callerQuote, aiQuote }: { tag: string; scenario: string; callerQuote: string; aiQuote: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{tag}</span>
          <span className="text-xs text-muted-foreground font-mono">{scenario}</span>
        </div>
        <div className="space-y-3 text-sm">
          <div className="bg-background/60 p-3 rounded-xl border border-border/40">
            <span className="text-xs font-bold text-muted-foreground block mb-1">Caller:</span>
            <p className="text-foreground italic">"{callerQuote}"</p>
          </div>
          <div className="bg-primary/5 p-3 rounded-xl border border-primary/20">
            <span className="text-xs font-bold text-primary block mb-1">AI Voice Agent:</span>
            <p className="text-foreground font-medium">"{aiQuote}"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
      <p className="text-3xl font-extrabold text-primary/75 tracking-tight">{value}</p>
      <p className="text-sm font-semibold text-foreground mt-1">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </div>
  )
}

function ProcessStepNode({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string
  icon: any
  title: string
  description: string
}) {
  return (
    <div className="group relative flex flex-col items-center text-center px-2 z-10">
      {/* Node Icon Circle */}
      <div className="relative mb-5 flex size-14 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-md shadow-primary/5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
        <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        {/* Step Number Tag */}
        <span className="absolute -top-2 -right-1 font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30 group-hover:bg-background group-hover:text-primary transition-colors">
          {number}
        </span>
      </div>

      {/* Content — 100% Box-Less! */}
      <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-[220px]">
        {description}
      </p>
    </div>
  )
}

