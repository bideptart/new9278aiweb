import { FLAT_FAQ } from "@/lib/faq"
import { INDUSTRIES } from "@/lib/industries"

export type KBEntry = {
  /** Extra words that should count toward a match beyond what's already in q/a. */
  keywords?: string[]
  q: string
  a: string
  /** Related question ids to suggest as follow-ups once this one is answered. */
  related?: string[]
  id?: string
}

/* ------------------------------------------------------------------ */
/* 1 — everything already public on /faq                                */
/* ------------------------------------------------------------------ */

const FAQ_ENTRIES: KBEntry[] = FLAT_FAQ.map((f) => ({ q: f.q, a: f.a }))

/* ------------------------------------------------------------------ */
/* 2 — the full feature catalogue (mirrors components/sections/features.tsx) */
/* ------------------------------------------------------------------ */

const FEATURE_DETAILS: { title: string; description: string; tag: string }[] = [
  { title: "Sub-300ms latency", tag: "Voice", description: "Real-time WebRTC audio over a globally distributed media network — conversations feel instant, never delayed." },
  { title: "Natural turn-taking", tag: "Voice", description: "Smart endpointing, barge-in, and interruption handling let the agent listen, pause, and respond like a person, not a script." },
  { title: "Carrier-grade telephony", tag: "Telephony", description: "Inbound and outbound PSTN calling over SIP on your own carrier account, with intelligent routing across 60+ countries." },
  { title: "Multilingual voices", tag: "Voice", description: "Natural-sounding voices in dozens of languages and accents. The agent auto-detects the caller's language and switches mid-call if they do." },
  { title: "Tools & function calling", tag: "Integrations", description: "The agent calls the same APIs your team does — looking up CRMs, booking calendars, taking payments, checking inventory — live, on the call." },
  { title: "Live transfer & handoff", tag: "Telephony", description: "Warm-transfer to a human, swap between specialist agents, and pass full context so the customer never repeats themselves." },
  { title: "Background noise removal", tag: "Voice", description: "AI-powered noise and echo cancellation so callers from a busy street, café, or car still come through cleanly." },
  { title: "Live transcripts & analytics", tag: "Operations", description: "Every call streamed to text with speaker labels, sentiment, intents, and conversion events — searchable from day one." },
  { title: "Recording, redaction & compliance", tag: "Operations", description: "Configurable PII/PHI redaction, encrypted storage, retention controls, and SOC 2-aligned infrastructure out of the box." },
  { title: "Scheduling & calendars", tag: "Integrations", description: "Native Google Calendar, Microsoft 365, and Calendly integrations — book, reschedule, and confirm, all over voice." },
  { title: "Webhooks & APIs", tag: "Integrations", description: "Trigger workflows on call start, transcript chunks, tool calls, or completion — pipe data into your stack in real time." },
  { title: "Massive concurrency", tag: "Operations", description: "Scale from one call to thousands running in parallel without provisioning servers — burst capacity is built in." },
]

const FEATURE_ENTRIES: KBEntry[] = FEATURE_DETAILS.map((f) => ({
  q: f.title,
  keywords: [f.tag.toLowerCase(), "feature"],
  a: f.description,
}))

/* ------------------------------------------------------------------ */
/* 3 — one entry per industry, drawn straight from lib/industries.ts    */
/* ------------------------------------------------------------------ */

const INDUSTRY_ENTRIES: KBEntry[] = INDUSTRIES.map((i) => ({
  q: `How does 9278.ai help ${i.name.toLowerCase()}?`,
  keywords: [i.slug.replace("-", " "), i.name.toLowerCase(), "industry"],
  a: `${i.pitch} On day one it typically: ${i.jobs.slice(0, 3).join("; ")}.`,
}))

/* ------------------------------------------------------------------ */
/* 4 — things people ask that aren't phrased as FAQ items               */
/* ------------------------------------------------------------------ */

const EXTRA_ENTRIES: KBEntry[] = [
  {
    keywords: ["what", "9278", "product", "company", "do", "explain"],
    q: "What is 9278.ai?",
    a: "9278.ai is an AI voice agent platform. It answers phone calls on your existing number and carrier with a voice that sounds human — holding a real conversation, booking meetings, and updating your CRM — 24/7, with sub-second response times. It's self-hosted, so your call data stays inside your own environment.",
  },
  {
    keywords: ["feature", "features", "capabilities", "everything", "what can it do", "list"],
    q: "What features does 9278.ai have?",
    a: `Across voice, telephony, integrations, and operations: ${FEATURE_DETAILS.map((f) => f.title).join(", ")}. Ask me about any one of these and I'll go deeper.`,
  },
  {
    keywords: ["pricing", "plans", "cost", "price", "how much", "tier", "tiers"],
    q: "What are the pricing plans?",
    a: "Three plans: Starter ($0.15/min, 1 concurrent agent), Growth ($0.12/min, 2 concurrent agents, most popular), and Scale ($0.10/min, 3+ concurrent agents). You top up $20/$50/$100 of voice credit — no setup fees, no contracts, no monthly platform fee. Credit is valid for 60 days from purchase.",
  },
  {
    keywords: ["industries", "industry", "who is this for", "use case", "use cases", "verticals", "customers"],
    q: "What industries does 9278.ai work for?",
    a: `9278.ai is built for ${INDUSTRIES.map((i) => i.name).join(", ")}, and more — anywhere a missed call means a missed customer. Ask "how does it help [industry]?" for specifics.`,
  },
  {
    keywords: ["demo", "try it", "hear a demo", "listen", "sample"],
    q: "Can I hear a demo?",
    a: 'Yes — hit "Hear a Live Demo" on the homepage to listen to a real 9278.ai agent handling a call, or go to /get-started to build your own agent and test it in the playground for free.',
  },
  {
    keywords: ["get started", "sign up", "start", "onboarding", "build an agent", "how do i begin"],
    q: "How do I get started?",
    a: 'Click "Build Your AI Agent" to create your first agent — most teams are live in under 5 minutes. Your dashboard lives at voice.9278.ai once you\'re set up, and migrating a full 24/7 inbound flow with CRM integration usually takes 1–3 days.',
  },
  {
    keywords: ["contact", "talk to sales", "human", "support email", "reach", "email"],
    q: "How do I contact the team?",
    a: "You can reach us directly:\n\n• Support — support@9278.ai\n• Sales — sales@9278.ai\n\nStarter includes email support, Growth adds priority email + chat, and Scale gets a dedicated success manager — all with 24/7 response on billing or outage issues. You can also book a walkthrough from the homepage.",
  },
  {
    keywords: ["dashboard", "login", "log in", "sign in", "portal", "control panel", "account"],
    q: "Where is the dashboard?",
    a: "Your dashboard lives at https://voice.9278.ai — sign in there to review usage, top up credit, manage phone numbers, edit agent prompts, and download transcripts.",
  },
  {
    keywords: ["help", "issue", "problem", "trouble", "stuck", "error", "not working", "complaint", "bug"],
    q: "I need help with a problem",
    a: "Sorry you're running into trouble! The fastest way to get it fixed:\n\n• Email support@9278.ai — billing and outage issues get 24/7 response on every plan\n• For sales or plan questions: sales@9278.ai\n• Check your dashboard at https://voice.9278.ai for usage and call logs\n\nGrowth adds priority chat support, and Scale includes a dedicated success manager.",
  },
  {
    keywords: ["security", "safe", "safety", "secure"],
    q: "How secure is the platform?",
    a: "SOC 2-aligned infrastructure, encrypted regional storage (US East / EU West), configurable PII/PHI redaction, sandboxed agents with jailbreak detection, and a 24/7 trust & safety team monitoring for abuse.",
  },
  {
    keywords: ["accent", "voice quality", "sound human", "natural"],
    q: "Does it really sound human?",
    a: "Yes — natural turn-taking (smart endpointing, barge-in, interruption handling), background noise cancellation, and sub-300ms latency mean the conversation feels like talking to a real person, not a script reading a menu.",
  },
  {
    keywords: ["difference", "vs", "compare", "competitor", "better than"],
    q: "How is 9278.ai different from other AI voice tools?",
    a: "Three things stand out: it's self-hosted (your call data never leaves your environment), it plugs into the carrier account and phone numbers you already have instead of selling you new ones, and it gives you real function/tool calling so the agent can act, not just talk.",
  },
]

/* ------------------------------------------------------------------ */
/* 5 — small talk, so the assistant doesn't feel like a search box      */
/* ------------------------------------------------------------------ */

type SmallTalkRule = { test: RegExp; a: string }

export const SMALL_TALK: SmallTalkRule[] = [
  { test: /^(hi|hello|hey|yo|sup|hola)\b/i, a: "Hey there! I'm the 9278.ai assistant. Ask me anything about the product — pricing, features, industries, integrations, security, anything." },
  { test: /\b(thank|thanks|thx|shukriya|dhanyavad)\b/i, a: "Anytime! Anything else you'd like to know about 9278.ai?" },
  { test: /\bwho are you\b|\bwhat are you\b/i, a: "I'm the 9278.ai product assistant — a lightweight guide built from our public FAQ and product docs, so I can answer questions about pricing, features, industries, integrations, compliance, and getting started, without ever making something up." },
  { test: /\bbye\b|\bgoodbye\b|\bsee ya\b/i, a: "Take care! Come back anytime if you have more questions about 9278.ai." },
  { test: /\bhow are you\b/i, a: "Running smoothly, thanks for asking! What would you like to know about 9278.ai?" },
]

/* ------------------------------------------------------------------ */

export const KNOWLEDGE_BASE: KBEntry[] = [
  ...EXTRA_ENTRIES,
  ...FEATURE_ENTRIES,
  ...INDUSTRY_ENTRIES,
  ...FAQ_ENTRIES,
]

/* ------------------------------------------------------------------ */
/* matching                                                             */
/* ------------------------------------------------------------------ */

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "do", "does", "did", "can", "i", "you", "your", "my",
  "what", "how", "when", "where", "why", "which", "to", "of", "for", "on", "in", "it",
  "with", "and", "or", "me", "about", "there", "any", "will", "be", "have", "has",
  "please", "tell", "know", "want", "would", "like", "get", "im", "am",
])

/** A few synonym clusters so phrasing differences don't tank the score. */
const SYNONYMS: Record<string, string[]> = {
  price: ["cost", "pricing", "expensive", "cheap", "rate", "rates"],
  language: ["languages", "multilingual", "accent", "accents"],
  crm: ["hubspot", "salesforce", "pipedrive", "integration", "integrations", "connect"],
  fast: ["quick", "speed", "latency", "instant"],
  secure: ["security", "safe", "safety", "privacy", "compliant", "compliance"],
  start: ["begin", "onboard", "onboarding", "setup", "launch"],
  agent: ["agents", "ai", "bot", "assistant"],
  number: ["numbers", "phone", "carrier", "sip"],
}

function expand(token: string): string[] {
  const out = [token]
  for (const [key, list] of Object.entries(SYNONYMS)) {
    if (key === token || list.includes(token)) {
      out.push(key, ...list)
    }
  }
  return out
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
}

export type MatchResult = { entry: KBEntry; score: number }

/** Keyword-overlap scorer with light synonym expansion and stem credit — no
    network call, no API key, runs entirely client-side. */
export function findAnswer(query: string): MatchResult | null {
  const qTokensRaw = tokenize(query)
  if (qTokensRaw.length === 0) return null
  const qTokens = Array.from(new Set(qTokensRaw.flatMap(expand)))

  let best: MatchResult | null = null

  for (const entry of KNOWLEDGE_BASE) {
    const haystack = tokenize(`${entry.q} ${entry.a} ${(entry.keywords ?? []).join(" ")}`)
    const haystackExpanded = new Set(haystack.flatMap(expand))
    let score = 0
    for (const t of qTokens) {
      if (haystackExpanded.has(t)) score += 1
      else if (haystack.some((h) => h.startsWith(t) || t.startsWith(h))) score += 0.5
    }
    const normalized = score / Math.sqrt(qTokensRaw.length)
    if (!best || normalized > best.score) best = { entry, score: normalized }
  }

  if (!best || best.score < 0.55) return null
  return best
}

export function matchSmallTalk(query: string): string | null {
  const trimmed = query.trim()
  for (const rule of SMALL_TALK) {
    if (rule.test.test(trimmed)) return rule.a
  }
  return null
}

/** High-priority intents checked BEFORE the keyword scorer, so "where do I
    log in" or "I have a problem" always land on the right answer instead of
    whatever the fuzzy match likes best. */
const PRIORITY_RULES: { test: RegExp; answer: string }[] = [
  {
    test: /\b(dashboard|log ?in|sign ?in|portal|control panel|my account)\b/i,
    answer:
      "Your dashboard lives at https://voice.9278.ai — sign in there to review usage, top up credit, manage phone numbers, edit agent prompts, and download transcripts.",
  },
  {
    test: /\b(support|complaint|refund|not working|broken|problem|issue|error|help me|need help|bug|stuck|trouble)\b/i,
    answer:
      "Sorry you're running into trouble! The fastest way to get it fixed:\n\n• Email support@9278.ai — billing and outage issues get 24/7 response on every plan\n• For sales or plan questions: sales@9278.ai\n• Check your dashboard at https://voice.9278.ai for usage and call logs\n\nGrowth adds priority chat support, and Scale includes a dedicated success manager.",
  },
  {
    test: /\b(email|contact|reach (you|out)|talk to (sales|someone|a human|human))\b/i,
    answer:
      "You can reach us directly:\n\n• Support — support@9278.ai\n• Sales — sales@9278.ai\n\nOr book a 20-minute walkthrough from the homepage. Support responds 24/7 to billing and outage issues on every plan.",
  },
]

export function matchPriority(query: string): string | null {
  for (const rule of PRIORITY_RULES) {
    if (rule.test.test(query)) return rule.answer
  }
  return null
}

export const SUGGESTED_QUESTIONS = [
  "What are the pricing plans?",
  "Which languages are supported?",
  "Does it connect to my CRM?",
  "How fast can I launch?",
]

/** Pulled up as quick follow-ups once the user has already asked something. */
export const FOLLOW_UP_POOL = [
  "What features does 9278.ai have?",
  "How secure is the platform?",
  "What industries does it work for?",
  "Can I bring my existing phone numbers?",
  "Does it integrate with my CRM and calendar?",
  "How is 9278.ai different from other AI voice tools?",
  "How fast can I be live?",
]
