"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Rocket, Phone, ArrowRight, ShieldCheck, Check, Sparkles, Volume2, Globe, Lock, Play, Pause, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  industryName: string
  slug: string
}

export function IndustryRolloutPhases({ industryName, slug }: Props) {
  const [selectedLang, setSelectedLang] = useState(0)
  const [isSimulatingCall, setIsSimulatingCall] = useState(false)
  const [activePlan, setActivePlan] = useState<"starter" | "growth" | "scale">("starter")

  const isRealEstate = slug === "real-estate" || industryName.toLowerCase().includes("real estate")

  const indianLanguages = [
    { name: "Hindi", flag: "🇮🇳", text: "नमस्ते! कोथरुड 2BHK की जानकारी के लिए धन्यवाद। क्या आप साइट विजिट बुक करना चाहेंगे?" },
    { name: "Marathi", flag: "🇮🇳", text: "नमस्कार! कोथरूड मधील 2BHK बद्दल चौकशी केल्याबद्दल धन्यवाद. तुम्ही साईट व्हिजिट बुक करू इच्छिता का?" },
    { name: "English", flag: "🇬🇧", text: "Hello! Thank you for inquiring about the 2BHK in Kothrud. Would you like to schedule a site visit?" },
    { name: "Gujarati", flag: "🇮🇳", text: "નમસ્તે! પ્રોપર્ટી પૂછપરછ માટે આભાર. શું તમે આ અઠવાડિયે સાઇટ વિઝિટ બુક કરવા માંગો છો?" },
    { name: "Tamil", flag: "🇮🇳", text: "வணக்கம்! சொத்து விசாரணைக்கு நன்றி. இந்த வாரம் தளப் பார்வையை பதிவு செய்ய விரும்புகிறீர்களா?" },
    { name: "Telugu", flag: "🇮🇳", text: "నమస్కారం! ప్రాపర్టీ విచారణకు ధన్యవాదాలు. మీరు సైట్ విజిట్ బుక్ చేయాలనుకుంటున్నారా?" },
    { name: "Kannada", flag: "🇮🇳", text: "ನಮಸ್ಕಾರ! ಪ್ರಾಪರ್ಟಿ ವಿಚಾರಣೆಗಾಗಿ ಧನ್ಯವಾದಗಳು. ನೀವು ಸೈಟ್ ಭೇಟಿಯನ್ನು ಬುಕ್ ಮಾಡಲು ಬಯಸುತ್ತೀರಾ?" },
    { name: "Punjabi", flag: "🇮🇳", text: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਪ੍ਰਾਪਰਟੀ ਪੁੱਛਗਿੱਛ ਲਈ ਧੰਨਵਾਦ। ਕੀ ਤੁਸੀਂ ਸਾਈਟ ਵਿਜ਼ਿਟ ਬੁੱਕ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?" },
  ]

  const globalLanguages = [
    { name: "English", flag: "🇺🇸", text: "Hello! Sunrise Health Assistant here. How can I assist with your appointment today?" },
    { name: "Spanish", flag: "🇪🇸", text: "¡Hola! Asistente de Sunrise Health. ¿En qué puedo ayudarle con su cita médica hoy?" },
    { name: "French", flag: "🇫🇷", text: "Bonjour! Assistant de santé Sunrise. Comment puis-je vous aider avec votre rendez-vous?" },
    { name: "German", flag: "🇩🇪", text: "Guten Tag! Sunrise Health Assistent. Wie kann ich Ihnen bei Ihrem Termin helfen?" },
    { name: "Japanese", flag: "🇯🇵", text: "こんにちは！サンライズヘルスアシスタントです。本日のご予約についてどのようにお手伝いできますか？" },
    { name: "Mandarin", flag: "🇨🇳", text: "您好！日出健康助手为您服务。今天有什么可以为您预约的？" },
    { name: "Arabic", flag: "🇸🇦", text: "مرحباً! مساعد سانرايز الصحي هنا. كيف يمكنني مساعدتك في موعدك اليوم؟" },
    { name: "Portuguese", flag: "🇧🇷", text: "Olá! Assistente de Saúde Sunrise. Como posso ajudar com a sua consulta hoje?" },
  ]

  const languages = isRealEstate ? indianLanguages : globalLanguages
  const currentLang = languages[selectedLang]

  const realEstateCompliance = [
    { title: "TRAI Calling-Window Enforcement", status: "Enforced", detail: "Automatic DND screening & legal calling-window enforcement" },
    { title: "DPDP Act 2023 Compliance", status: "Compliant", detail: "Consent management, data minimization & audit logging" },
    { title: "CRM Auto-Sync (Salesforce & HubSpot)", status: "Active", detail: "Real-time buyer budget & pre-approval intake sync" },
    { title: "Indian Carrier Direct Connectivity", status: "Verified", detail: "Low-latency direct SIP peering with Airtel, Jio & Vodafone" },
  ]

  const healthcareCompliance = [
    { title: "HIPAA BAA agreement", status: "Enforced", detail: "Signed BAA & zero data retention option" },
    { title: "TCPA & consent guardrails", status: "Compliant", detail: "Automatic DNC list screening & time-of-day checks" },
    { title: "AES-256 encrypted audio logs", status: "Active", detail: "End-to-end TLS 1.3 in-transit and at-rest encryption" },
    { title: "EHR integration security", status: "Verified", detail: "SOC 2 Type II certified FHIR/HL7 Epic & Athena sync" },
  ]

  const complianceItems = isRealEstate ? realEstateCompliance : healthcareCompliance
  const [selectedCompliance, setSelectedCompliance] = useState(0)

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24 border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Soft Light Rose Ambient Wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent blur-3xl opacity-60"
      />

      <div className="space-y-24">
        {/* ==================== PHASE 01 ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Dynamic Stats */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 shadow-xs border border-rose-200 dark:border-rose-900/50">
                PHASE 01
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
                <Globe className="size-3 text-rose-500" />
                Live Multilingual AI
              </span>
            </div>

            <h2 className="text-3xl font-serif font-bold tracking-tight md:text-5xl text-foreground">
              How {industryName.toLowerCase()} teams <span className="italic text-rose-600 dark:text-rose-400">roll out 9278.io</span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Most {industryName.toLowerCase()} customers start by{" "}
              <Link href="/get-started" className="text-rose-600 dark:text-rose-400 font-semibold underline-offset-4 hover:underline">
                spinning up a Starter agent
              </Link>{" "}
              with a single phone number, then upgrade to{" "}
              <Link href="/pricing" className="text-rose-600 dark:text-rose-400 font-semibold underline-offset-4 hover:underline">
                Growth or Scale
              </Link>{" "}
              once the inbound playbooks prove out.
            </p>
          </div>

          {/* Right Column: Interactive Multilingual Language Selector Box */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-xl space-y-5 transition-all duration-300 hover:border-rose-300 dark:hover:border-rose-800">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
                    <Globe className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Multilingual Native Voice Engine</h4>
                    <p className="text-xs text-muted-foreground font-mono">Indian & Global Dialects</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Zap className="size-3 text-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Language Chips Grid */}
              <div className="space-y-2">
                <p className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  Select Language Stream:
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {languages.map((lang, idx) => {
                    const isSelected = idx === selectedLang
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedLang(idx)}
                        className={cn(
                          "py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer border",
                          isSelected
                            ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-xs scale-102"
                            : "bg-slate-50 dark:bg-slate-800/80 text-muted-foreground border-slate-200/80 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-900/40 hover:text-rose-600 dark:hover:text-rose-400"
                        )}
                      >
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span className="text-[11px] truncate w-full text-center">{lang.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Live Greeting Voice Box */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLang}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/20 p-3 text-xs space-y-1.5 mt-2"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-rose-600 dark:text-rose-400">
                      <span className="flex items-center gap-1">
                        <Volume2 className="size-3.5 text-rose-500" />
                        Live Voice Audio · {currentLang.name}
                      </span>
                      <span className="font-mono text-[9px]">Sub-300ms</span>
                    </div>
                    <p className="text-foreground/90 italic font-medium leading-relaxed">
                      &ldquo;{currentLang.text}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Launch Action CTA Button */}
              <Button asChild size="lg" className="w-full btn-ai h-11 rounded-2xl shadow-md text-xs font-bold cursor-pointer">
                <Link href={`/get-started?industry=${slug}`}>
                  Launch {industryName} agent <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ==================== PHASE 02: COMPLIANCE & GOVERNANCE ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 border-t border-slate-200/60 dark:border-slate-800/60">
          {/* Left Column: Interactive Compliance Cards */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-md rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 shadow-xl space-y-4 transition-all duration-300 hover:border-rose-300 dark:hover:border-rose-800">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 shadow-xs">
                    <Lock className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Compliance & Privacy Standards</h4>
                    <p className="text-xs text-muted-foreground font-mono">Healthcare & Enterprise Certified</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  Audited
                </span>
              </div>

              {/* Compliance Item Chips */}
              <div className="space-y-2">
                {complianceItems.map((item, idx) => {
                  const isSelected = idx === selectedCompliance
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCompliance(idx)}
                      className={cn(
                        "w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer",
                        isSelected
                          ? "bg-rose-500/10 border-rose-300 dark:border-rose-800 text-foreground shadow-xs font-bold"
                          : "border-slate-200/80 dark:border-slate-800 text-muted-foreground hover:border-rose-200 dark:hover:border-rose-900/40 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Check className={cn("size-4 shrink-0", isSelected ? "text-rose-600 dark:text-rose-400 stroke-[3]" : "text-muted-foreground/40")} />
                        <span className="text-xs truncate font-medium">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {item.status}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Detailed Compliance Context Box */}
              <div className="rounded-2xl border border-rose-200/60 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-950/20 p-4 text-xs space-y-1">
                <p className="font-bold text-rose-600 dark:text-rose-400 text-[11px] uppercase tracking-wider">
                  {complianceItems[selectedCompliance].title}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {complianceItems[selectedCompliance].detail}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Compliance Content */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50/80 dark:bg-rose-950/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 shadow-xs border border-rose-200 dark:border-rose-900/50">
                PHASE 02
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="size-3 text-emerald-500" />
                Explore & Compare
              </span>
            </div>

            <h2 className="text-3xl font-serif font-bold tracking-tight md:text-5xl text-foreground">
              Explore more. <span className="italic text-rose-600 dark:text-rose-400">Compare with confidence.</span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Curious about voice credit, phone numbers, or HIPAA compliance? The{" "}
              <Link href="/faq" className="text-rose-600 dark:text-rose-400 font-semibold underline-offset-4 hover:underline">
                FAQ answers the questions
              </Link>{" "}
              ops teams ask most — and you can browse{" "}
              <Link href="/industries" className="text-rose-600 dark:text-rose-400 font-semibold underline-offset-4 hover:underline">
                every other industry
              </Link>{" "}
              we support to compare playbooks.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="btn-ai h-12 rounded-full px-7 shadow-lg shadow-primary/25 font-bold cursor-pointer">
                <Link href={`/get-started?industry=${slug}`}>
                  Launch a real estate agent <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border/70 bg-card/50 px-7 backdrop-blur-md hover:border-primary/40 hover:bg-card/80 transition-all font-medium cursor-pointer"
              >
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
