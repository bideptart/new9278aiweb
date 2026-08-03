import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FaqItem } from "@/components/ui/faq-item"
import { ProcessFlowTrack } from "@/components/ui/process-flow-track"
import { 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  PhoneIncoming, 
  FileText,
  User,
  Bot,
  Volume2,
  ChevronDown,
  Building,
  Check,
  AlertCircle
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { CtaPanel } from "@/components/ui/cta-panel"
import { TranscriptCard3D } from "@/components/ui/transcript-card-3d"

export const metadata: Metadata = pageSeo({
  title: "AI Answering Services — 24/7 Virtual Answering Service",
  description:
    "Automate 100% of after-hours and overflow call answering. Professional 24/7 AI virtual answering service with instant SMS/Email message dispatch.",
  path: "/features/answering-services",
})

export default function AnsweringServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Features", item: "/features" },
          { name: "Answering Services", item: "/features/answering-services" },
        ]}
      />
      <ServiceJsonLd
        name="9278.ai Answering Services"
        description="Professional 24/7 AI virtual answering service that automates after-hours calls, captures structured notes, and dispatches urgent alerts."
        path="/features/answering-services"
      />
      <SiteHeader />

      <main className="flex-1 overflow-x-clip">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[450px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(220,38,38,0.12),transparent_70%)]"
          />
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                {/* Left Column: Hero Text Content */}
                <div className="lg:col-span-5 flex flex-col items-start gap-4">
                  <nav aria-label="Breadcrumb" className="mb-1 text-xs text-muted-foreground">
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
                      <li className="text-foreground font-medium">Answering Services</li>
                    </ol>
                  </nav>

                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
                    <Headphones className="size-3.5" aria-hidden />
                    24/7/365 AI Virtual Answering Service
                  </span>

                  <h1 className="text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-[1.08]">
                    Professional 24/7 <span className="italic text-primary">AI Answering Services</span> for your business.
                  </h1>

                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Replace expensive call centers and voicemail backlogs. Our AI answering agents answer every call instantly, capture structured notes, and dispatch urgent alerts to your team.
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Button asChild size="lg" className="btn-ai h-11 px-6 rounded-full shadow-md text-sm font-semibold">
                      <Link href="/get-started?feature=answering-services">
                        Test Answering Service Live <ArrowRight className="ml-2 size-4" aria-hidden />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-11 px-6 rounded-full border-border/80 hover:bg-accent text-sm">
                      <Link href="/pricing">View Pricing & Rates</Link>
                    </Button>
                  </div>
                </div>

                {/* Right Column: Compact Live Dispatch Console Simulator */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5 backdrop-blur-xl shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="relative flex size-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
                        </div>
                        <span className="text-xs font-semibold text-foreground tracking-wide">Live Dispatch Console — After-Hours Answering</span>
                      </div>
                      <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
                        Instant SMS / Email Dispatch
                      </span>
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2">
                      {/* Transcript Simulation */}
                      <div className="space-y-2.5 font-sans text-xs">
                        <div className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-background/70 p-3 shadow-xs">
                          <User className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">After-Hours Caller</span>
                            <p className="text-foreground font-medium mt-0.5 text-xs leading-snug">"We have a burst water pipe in our basement. Need an emergency plumber ASAP!"</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 rounded-xl border border-primary/30 bg-primary/5 p-3 shadow-xs">
                          <Bot className="size-4 text-primary shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">AI Answering Service</span>
                            <p className="text-foreground font-medium mt-0.5 text-xs leading-snug">"I understand this is an emergency. I have logged your address and dispatched an urgent alert to our on-call technician."</p>
                          </div>
                        </div>
                      </div>

                      {/* Instant Dispatch Alert Card */}
                      <div className="flex flex-col justify-between rounded-xl border border-border/50 bg-background/50 p-3.5">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-500 uppercase tracking-wider mb-2">
                            <span className="flex items-center gap-1"><AlertCircle className="size-3.5" /> Emergency Dispatch Sent</span>
                            <span className="font-mono text-[9px] text-muted-foreground">0.4s ago</span>
                          </div>

                          <div className="rounded-lg bg-card border border-border/60 p-3 space-y-1.5 text-[11px]">
                            <div className="flex justify-between pb-1 border-b border-border/30">
                              <span className="text-muted-foreground">Priority:</span>
                              <span className="font-semibold text-red-500 uppercase tracking-wider text-[10px]">High / Emergency</span>
                            </div>
                            <div className="flex justify-between pb-1 border-b border-border/30">
                              <span className="text-muted-foreground">Caller:</span>
                              <span className="font-semibold text-foreground text-[10px] truncate max-w-[120px]">Robert Vance (+1 415-555-0198)</span>
                            </div>
                            <div className="flex justify-between pb-1 border-b border-border/30">
                              <span className="text-muted-foreground">Dispatched To:</span>
                              <span className="font-mono text-[10px] text-foreground">On-Call Tech Team (SMS & Push)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transcript Logged:</span>
                              <span className="font-semibold text-emerald-500 text-[10px]">Saved to Portal</span>
                            </div>
                          </div>
                        </div>

                        <Button asChild size="sm" className="w-full mt-3 btn-ai text-xs h-8">
                          <Link href="/get-started">Start 24/7 Answering for Your Business</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 md:py-24 bg-card/10">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="ai-pill-magenta">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Core Capabilities
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Comprehensive 24/7 <span className="italic text-primary">Call Answering Features</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Ensure every customer inquiry is greeted warmly, correctly categorized, and routed to the right person without human delay.
              </p>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <CapabilityCard
                icon={Clock}
                title="100% After-Hours Coverage"
                description="Never send calls to voicemail again. Answer inquiries 24 hours a day, 365 days a year with flawless voice quality."
              />
              <CapabilityCard
                icon={Send}
                title="Instant SMS & Email Dispatch"
                description="Receive structured summaries, caller contact info, and audio recording links directly in your email, SMS, or Slack."
              />
              <CapabilityCard
                icon={AlertCircle}
                title="Emergency Triage & Escalation"
                description="Recognizes urgent calls and instantly triggers emergency phone calls or push alerts to on-call staff."
              />
              <CapabilityCard
                icon={Building}
                title="Multi-Department Routing"
                description="Greets callers, understands their department need, and dispatches messages to billing, sales, or support."
              />
              <CapabilityCard
                icon={FileText}
                title="Structured Lead Capture"
                description="Collects key customer intake data (name, email, issue, account number) in clean JSON format."
              />
              <CapabilityCard
                icon={ShieldCheck}
                title="HIPAA & Security Compliant"
                description="Built to comply with strict medical and legal privacy standards for sensitive caller information."
              />
            </div>
          </div>
        </section>

        {/* Sample Real-world Dialogues */}
        <section className="py-16 md:py-24 border-y border-border/50">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-xs backdrop-blur-md ring-1 ring-primary/20">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <MessageSquare className="size-3.5 text-black" aria-hidden />
                Answering Playbooks
              </span>
              <h2 className="mt-5 text-balance text-3xl font-serif font-normal tracking-tight sm:text-4xl md:text-5xl leading-[1.12]">
                Real Answering Service <span className="italic text-primary">Conversations</span>
              </h2>
              <p className="mt-3 text-pretty text-base md:text-lg leading-relaxed text-muted-foreground/90">
                See how the AI answering agent takes complete messages and dispatches team alerts.
              </p>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              <TranscriptCard
                tag="Property Management"
                scenario="Weekend Maintenance Request"
                callerQuote="The main entrance gate isn't opening for residents. Can someone look into it?"
                aiQuote="I've logged this as an urgent property maintenance request for the Main Entrance Gate. I am dispatching a text alert to Property Manager Dave right now."
              />
              <TranscriptCard
                tag="Legal & Accounting"
                scenario="New Client Intake Message"
                callerQuote="I would like to inquire about your corporate tax advisory retainer rates."
                aiQuote="Thank you for calling. I have recorded your inquiry regarding corporate tax advisory services. Senior Accountant Sarah will review your message and email you our service guide first thing Monday morning."
              />
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-card/30">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <StatBox label="Answer Rate" value="100%" sub="Zero voicemails or dropped calls" />
              <StatBox label="Hold Time" value="0 Seconds" sub="Immediate caller greeting" />
              <StatBox label="Cost Saved" value="Up to 90%" sub="Compared to traditional answering services" />
              <StatBox label="Alert Speed" value="< 1 Second" sub="Instant SMS/Email notification" />
            </div>
          </div>
        </section>

        {/* Deployment Steps — Sticky Auto-Progressing Box-Less Track */}
        <ProcessFlowTrack
          eyebrow="Quick Deployment"
          headingTitle="Get Started with AI Answering in"
          headingAccent="4 Steps"
          subtitle="Set up your virtual answering service in under 10 minutes."
          nodes={[
            {
              number: "01",
              iconName: "phoneIncoming",
              title: "Forward Calls",
              description: "Set up conditional or after-hours forwarding from your existing office phone line.",
            },
            {
              number: "02",
              iconName: "fileText",
              title: "Define Script",
              description: "Provide business hours, custom greeting, and message intake questions.",
            },
            {
              number: "03",
              iconName: "send",
              title: "Set Alerts",
              description: "Specify phone numbers and emails where instant call summaries should be sent.",
            },
            {
              number: "04",
              iconName: "sparkles",
              title: "Sit Back",
              description: "Let your AI Answering Service take 100% of after-hours and overflow calls smoothly.",
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
              <p className="mt-4 text-muted-foreground text-base md:text-lg">Everything you need to know about AI virtual answering services.</p>
            </ScrollReveal>

            <div className="space-y-4">
              <FaqItem
                index={0}
                question="How does the AI deliver messages to my team?"
                answer="As soon as a call ends, the AI generates a structured message summary and sends it instantly via SMS, Email, Slack, or directly into your CRM via Webhook."
              />
              <FaqItem
                index={1}
                question="Can it distinguish emergency calls from routine inquiries?"
                answer="Yes! You can define emergency keywords or criteria (e.g. water leaks, urgent medical pain, server outages). When detected, the AI executes emergency escalation protocols."
              />
              <FaqItem
                index={2}
                question="Is there a monthly contract or minimum order?"
                answer="No contracts! All plans are pay-as-you-go with transparent per-minute rates and 60-day voice credit validity."
              />
              <FaqItem
                index={3}
                question="Can it handle multiple simultaneous calls?"
                answer="Yes. Unlike a human front-desk worker or single virtual receptionist, our AI answering service handles unlimited concurrent inbound calls simultaneously."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaPanel
          title={
            <>
              Never miss an after-hours <span className="text-primary">call again.</span>
            </>
          }
          description="Build and test your AI Answering Service in under 10 minutes. Place a live test call to experience it yourself."
          primary={{ label: "Get started for free", href: "/get-started?feature=answering-services", icon: "arrow" }}
          secondary={{ label: "View pricing & plans", href: "/pricing", variant: "outline" }}
        />

        {/* Related Feature Links */}
        <RelatedLinks
          heading="Explore Related AI Voice Solutions"
          description="Explore our full suite of automated phone solutions."
          variant="flip"
          showNumber={false}
          links={[
            {
              href: "/features/ai-voice-receptionist",
              title: "AI Voice Receptionist",
              description: "24/7 inbound caller greeting, intake, and live staff warm transfers.",
            },
            {
              href: "/features/call-transfer",
              title: "Call Transfer AI",
              description: "Instant warm and cold call routing to live team extensions.",
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
            <span className="text-xs font-bold text-primary block mb-1">AI Answering Agent:</span>
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

