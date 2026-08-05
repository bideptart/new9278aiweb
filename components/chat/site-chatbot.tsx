"use client"

/**
 * Site-wide AI assistant — floating bottom-right on every page.
 *
 * ChatGPT-style UX, 100% client-side: streaming replies, auto-growing
 * composer (Enter to send / Shift+Enter newline), slash commands ("/" opens
 * a quick-action menu), a rich welcome screen with quick-start tiles, a
 * manual light/dark toggle (defaults to light — never forces dark), copy +
 * read-aloud + thumbs up/down actions, contextual follow-ups, voice input
 * via the Web Speech API, clickable links/emails, a voice-waveform typing
 * indicator, a conversation that survives page navigation/refresh
 * (localStorage), and a one-time proactive teaser bubble for new visitors.
 *
 * Answers come from `lib/chatbot-knowledge.ts` (product FAQ + full feature
 * catalogue + every industry + support/dashboard intents). No API key, no
 * backend call, and it never invents an answer — if nothing matches
 * confidently it says so and hands over support@9278.ai.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  Building2,
  Check,
  ClipboardList,
  CreditCard,
  LifeBuoy,
  Maximize2,
  Mic,
  Minimize2,
  Moon,
  MoreVertical,
  Plus,
  Send,
  Sparkles,
  Sun,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import {
  findAnswer,
  matchPriority,
  matchSmallTalk,
  FOLLOW_UP_POOL,
} from "@/lib/chatbot-knowledge"

type Message = {
  id: string
  role: "bot" | "user"
  text: string
  streaming?: boolean
  followUps?: string[]
}

const STORAGE_KEY = "9278ai-chat-history"
const TEASER_DISMISSED_KEY = "9278ai-teaser-dismissed"

function loadStoredMessages(): Message[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Message[]
    // never resurrect a mid-stream message — just show the finished text
    return parsed.map((m) => ({ ...m, streaming: false }))
  } catch {
    return []
  }
}

const FALLBACK =
  "I don't have a confident answer for that one from what I know about 9278.ai. Try rephrasing — or email support@9278.ai (support) or sales@9278.ai (sales) and a human will pick it up."

/** Quick-start tiles on the welcome screen + the "/" command menu. */
const QUICK_ACTIONS = [
  { cmd: "/pricing", icon: CreditCard, label: "Pricing plans", q: "What are the pricing plans?" },
  { cmd: "/features", icon: Sparkles, label: "All features", q: "What features does 9278.ai have?" },
  { cmd: "/industries", icon: Building2, label: "Industries", q: "What industries does 9278.ai work for?" },
  { cmd: "/support", icon: LifeBuoy, label: "Get support", q: "I need help with a problem" },
  { cmd: "/demo", icon: Volume2, label: "Hear a demo", q: "Can I hear a demo?" },
  { cmd: "/dashboard", icon: Maximize2, label: "Dashboard", q: "Where is the dashboard?" },
] as const

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function pickFollowUps(askedTexts: string[]): string[] {
  const pool = FOLLOW_UP_POOL.filter((q) => !askedTexts.includes(q))
  const out: string[] = []
  const src = pool.length >= 3 ? pool : FOLLOW_UP_POOL
  for (let i = 0; i < src.length && out.length < 3; i++) {
    if (!out.includes(src[i])) out.push(src[i])
  }
  return out
}

/* ------------------------------------------------------------------ */
/* linkified message text — URLs and emails become real anchors         */
/* ------------------------------------------------------------------ */

const LINK_RE = /(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+|voice\.9278\.ai)/g

function MessageText({ text, onDark }: { text: string; onDark: boolean }) {
  const parts = text.split(LINK_RE)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (i % 2 === 1) {
          const isEmail = part.includes("@") && !part.startsWith("http")
          const href = isEmail ? `mailto:${part}` : part.startsWith("http") ? part : `https://${part}`
          return (
            <a
              key={i}
              href={href}
              target={isEmail ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={cn(
                "font-medium underline underline-offset-2 transition-opacity hover:opacity-75",
                onDark ? "text-white" : "text-primary",
              )}
            >
              {part}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* small pieces                                                         */
/* ------------------------------------------------------------------ */

function VoiceOrb({ size = 22 }: { size?: number }) {
  return (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-[var(--ai-magenta)]" />
      <span className="absolute inset-[22%] rounded-full bg-white/25 blur-[2px]" />
    </span>
  )
}

/** Typing indicator — a tiny live waveform, because this is a voice product. */
function TypingWave({ dark }: { dark: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 items-end gap-[3px] rounded-2xl rounded-bl-sm border px-3.5 py-2 shadow-sm",
        dark ? "border-white/10 bg-[#1f1f24]" : "border-black/[0.06] bg-white",
      )}
    >
      {[8, 14, 10, 16, 7, 12].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-primary/40 to-primary"
          style={{ height: h }}
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ duration: 0.9 + (i % 3) * 0.2, delay: i * 0.08, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}
    </span>
  )
}

/** Icon-only action button (header + under bot messages). */
function ActionButton({
  onClick,
  label,
  dark,
  children,
}: {
  onClick: () => void
  label: string
  dark: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
        dark
          ? "text-white/50 hover:bg-white/10 hover:text-white"
          : "text-muted-foreground/60 hover:bg-black/[0.06] hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* main widget                                                          */
/* ------------------------------------------------------------------ */

export function SiteChatbot() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  /** Manual theme toggle — light by default, dark only if the visitor asks. */
  const [dark, setDark] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [hasNewBadge, setHasNewBadge] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [listening, setListening] = useState(false)
  const [micSupported, setMicSupported] = useState(false)
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({})
  const [showTeaser, setShowTeaser] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [sendPulse, setSendPulse] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [composerFill, setComposerFill] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const streamTimers = useRef<ReturnType<typeof setInterval>[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    setMicSupported(!!SR)
  }, [])

  /* restore the conversation from a previous visit/page, once, on mount */
  useEffect(() => {
    const stored = loadStoredMessages()
    if (stored.length > 0) setMessages(stored)
    setHydrated(true)
  }, [])

  /* persist every change so navigating to another page (or refreshing)
     doesn't lose the conversation */
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      /* storage full or blocked — conversation just won't persist, fine */
    }
  }, [messages, hydrated])

  /* proactive teaser bubble — pops up once, a few seconds in, but only for
     a fresh visitor who hasn't opened the chat or dismissed it before */
  useEffect(() => {
    if (!hydrated) return
    const dismissed = window.localStorage.getItem(TEASER_DISMISSED_KEY)
    if (dismissed || open || messages.length > 0) return
    const id = setTimeout(() => setShowTeaser(true), 4500)
    return () => clearTimeout(id)
  }, [hydrated, open, messages.length])

  function dismissTeaser() {
    setShowTeaser(false)
    window.localStorage.setItem(TEASER_DISMISSED_KEY, "1")
  }

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" })
  }, [messages, typing, reduced])

  useEffect(() => {
    if (open) {
      setHasNewBadge(false)
      const id = setTimeout(() => textareaRef.current?.focus(), 250)
      return () => clearTimeout(id)
    }
    setMenuOpen(false)
  }, [open])

  useEffect(
    () => () => {
      streamTimers.current.forEach(clearInterval)
      recognitionRef.current?.stop?.()
      if (typeof window !== "undefined") window.speechSynthesis?.cancel()
    },
    [],
  )

  function autoGrow() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    const next = Math.min(el.scrollHeight, 120)
    el.style.height = `${next}px`
    // how close the composer is to its 120px cap — drives the thin
    // progress line along the top edge of the input.
    setComposerFill(Math.min(1, el.scrollHeight / 120))
  }

  function streamInto(msgId: string, fullText: string, followUps: string[]) {
    let i = 0
    const chunk = Math.max(1, Math.round(fullText.length / 60))
    if (reduced) {
      setMessages((m) =>
        m.map((msg) => (msg.id === msgId ? { ...msg, text: fullText, streaming: false, followUps } : msg)),
      )
      return
    }
    const timer = setInterval(() => {
      i += chunk
      const done = i >= fullText.length
      setMessages((m) =>
        m.map((msg) =>
          msg.id === msgId
            ? { ...msg, text: done ? fullText : fullText.slice(0, i), streaming: !done, followUps: done ? followUps : undefined }
            : msg,
        ),
      )
      if (done) clearInterval(timer)
    }, 14)
    streamTimers.current.push(timer)
  }

  function respond(question: string) {
    const q = question.trim()
    if (!q) return
    const askedTexts = messages.filter((m) => m.role === "user").map((m) => m.text)
    setMessages((m) => [...m, { id: uid(), role: "user", text: q }])
    setInput("")
    setComposerFill(0)
    if (textareaRef.current) textareaRef.current.style.height = "auto"
    setTyping(true)

    const delay = 380 + Math.min(q.length * 8, 500)
    setTimeout(() => {
      const priority = matchPriority(q)
      const smallTalk = priority ? null : matchSmallTalk(q)
      const match = priority || smallTalk ? null : findAnswer(q)
      const text = priority ?? smallTalk ?? (match ? match.entry.a : FALLBACK)
      const followUps = match ? pickFollowUps([...askedTexts, match.entry.q]) : pickFollowUps(askedTexts)

      setTyping(false)
      const botId = uid()
      setMessages((m) => [...m, { id: botId, role: "bot", text: "", streaming: true }])
      streamInto(botId, text, followUps)
    }, delay)
  }

  /* slash commands — typing "/" opens a quick-action menu */
  const slashOpen = input.startsWith("/")
  const slashMatches = slashOpen
    ? QUICK_ACTIONS.filter((c) => c.cmd.startsWith(input.toLowerCase().trim()) || input.trim() === "/")
    : []

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSendPulse((n) => n + 1)
    if (slashOpen && slashMatches.length > 0) {
      respond(slashMatches[0].q)
      return
    }
    respond(input)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (slashOpen && slashMatches.length > 0) {
        respond(slashMatches[0].q)
        return
      }
      respond(input)
    }
    if (e.key === "Escape" && slashOpen) setInput("")
  }

  function newChat() {
    streamTimers.current.forEach(clearInterval)
    streamTimers.current = []
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setMessages([])
    setTyping(false)
    setFeedback({})
    window.localStorage.removeItem(STORAGE_KEY)
  }

  function rateFeedback(id: string, value: "up" | "down") {
    setFeedback((f) => ({ ...f, [id]: value }))
  }

  const copyMessage = useCallback((id: string, text: string) => {
    void navigator.clipboard?.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1400)
  }, [])

  function speakMessage(id: string, text: string) {
    const synth = window.speechSynthesis
    if (!synth) return
    if (speakingId === id) {
      synth.cancel()
      setSpeakingId(null)
      return
    }
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(text.replace(LINK_RE, " "))
    utter.rate = 1.05
    utter.onend = () => setSpeakingId((s) => (s === id ? null : s))
    utter.onerror = () => setSpeakingId((s) => (s === id ? null : s))
    setSpeakingId(id)
    synth.speak(utter)
  }

  function toggleMic() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SR) return
    if (listening) {
      recognitionRef.current?.stop?.()
      setListening(false)
      return
    }
    const rec = new SR()
    recognitionRef.current = rec
    rec.lang = "en-US"
    rec.interimResults = true
    rec.continuous = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let transcript = ""
      for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript
      setInput(transcript)
      autoGrow()
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    setListening(true)
    rec.start()
  }

  /* theme shorthands */
  const surface = dark ? "bg-[#17171b]" : "bg-white"
  const canvas = dark ? "bg-[#101014]" : "bg-[#f7f7f8]"
  const hairline = dark ? "border-white/10" : "border-black/[0.06]"
  const botBubble = dark
    ? "rounded-bl-sm border border-white/10 bg-[#1f1f24] text-white/90"
    : "rounded-bl-sm border border-black/[0.06] bg-white text-foreground"

  const showWelcome = messages.length === 0

  return (
    <>
      {/* ── proactive teaser bubble — invites a fresh visitor to start ── */}
      <AnimatePresence>
        {showTeaser && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[92px] right-4 z-[69] flex max-w-[220px] items-start gap-2 rounded-2xl rounded-br-sm border border-black/[0.06] bg-white px-3.5 py-3 text-left shadow-[0_18px_44px_-18px_rgba(17,17,17,0.35)] sm:bottom-24 sm:right-6"
          >
            <button
              type="button"
              onClick={() => {
                dismissTeaser()
                setOpen(true)
              }}
              className="text-left text-[12px] leading-snug text-foreground"
            >
              <span className="mb-1 block font-normal">👋 Need help?</span>
              Ask me anything about 9278.ai — pricing, features, or getting started.
            </button>
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:bg-black/[0.06] hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── launcher — a real voice orb: solid, glowing, unmistakable ── */}
      <motion.button
        type="button"
        onClick={() => {
          setOpen((o) => !o)
          if (showTeaser) dismissTeaser()
        }}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.07, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="group fixed bottom-5 right-5 z-[70] flex h-16 w-16 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        {/* soft outer bloom — the thing that makes it pop off any background.
            Deliberately not tied to the (lightened) --primary token: a
            launcher button needs full brand saturation to read at a glance,
            even though the rest of the site now uses a softer red. */}
        {!reduced && (
          <motion.span
            aria-hidden
            className="absolute inset-[-7px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.5),transparent_70%)] blur-lg"
            animate={{ scale: [1, 1.22, 1], opacity: open ? 0.3 : [0.55, 0.9, 0.55] }}
            transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}

        {/* slow rotating conic ring in full brand saturation */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-[1.04]"
          style={{ background: "conic-gradient(from 0deg, #f43f5e 0deg, #dc2626 120deg, #f97316 200deg, #f43f5e 360deg)" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* LED indicator ring — small lights chasing around the rim, like a
            hardware status ring, each one blinking in sequence */}
        {!reduced &&
          !open &&
          Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360
            const rad = (angle * Math.PI) / 180
            const r = 30 // px from center, just outside the orb face
            return (
              <motion.span
                key={i}
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[5px] w-[5px] rounded-full bg-white"
                style={{
                  x: (Math.cos(rad) * r).toFixed(2),
                  y: (Math.sin(rad) * r).toFixed(2),
                  marginLeft: -2.5,
                  marginTop: -2.5,
                  boxShadow: "0 0 6px 1px rgba(255,255,255,0.9)",
                }}
                animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.15, 0.7] }}
                transition={{
                  duration: 1.6,
                  delay: i * 0.15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )
          })}

        {/* solid orb face — vivid, high-contrast, sits just inside the ring */}
        <span
          className="absolute inset-[3px] flex items-center justify-center overflow-hidden rounded-full shadow-[0_16px_38px_-8px_rgba(220,38,38,0.65)]"
          style={{ background: "linear-gradient(135deg, #ef4444, #dc2626 55%, #be123c)" }}
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />

          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="relative"
              >
                <X className="h-6 w-6 text-white" strokeWidth={2.5} />
              </motion.span>
            ) : (
              // logo seal — a crisp white badge so the mark reads clearly
              // against the saturated orb, instead of fighting it for contrast
              <motion.span
                key="logo"
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white px-1 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
              >
                <Logo height={12} src="/logo.png" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {hasNewBadge && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border-[2.5px] border-white bg-emerald-500 shadow-sm" />
          </span>
        )}
      </motion.button>

      {/* ── panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="false"
            aria-label="9278.ai assistant"
            className={cn(
              "fixed z-[70] flex flex-col overflow-hidden rounded-[26px] border shadow-[0_30px_80px_-30px_rgba(17,17,17,0.45)] transition-[width,height] duration-300",
              surface,
              hairline,
              expanded
                ? "inset-3 sm:inset-6"
                : "bottom-[92px] right-4 h-[min(72vh,600px)] w-[calc(100vw-2rem)] max-w-[380px] sm:bottom-24 sm:right-6 sm:max-w-[400px]",
            )}
          >
            {/* animated brand accent along the very top */}
            <span aria-hidden className="relative block h-[3px] w-full overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/40 to-primary/15" />
              {!reduced && (
                <motion.span
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  animate={{ x: ["-120%", "420%"] }}
                  transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", repeatDelay: 1 }}
                />
              )}
            </span>

            {/* header — brand name front and centre */}
            <div className={cn("relative flex items-center gap-3 border-b px-4 py-3", surface, hairline)}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(80%_100%_at_20%_0%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_70%)]"
              />
              <span className="relative flex min-w-0 items-center gap-2.5">
                <span className="relative shrink-0">
                  <Logo height={24} src={dark ? "/logo-white.png" : "/logo.png"} />
                  <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className={cn("relative inline-flex h-2 w-2 rounded-full border bg-emerald-500", dark ? "border-[#17171b]" : "border-white")} />
                  </span>
                </span>
                <span className={cn("h-6 w-px shrink-0", dark ? "bg-white/15" : "bg-black/10")} />
                <span className="min-w-0">
                  <span className="text-aurora block truncate text-[13px] font-normal leading-tight tracking-tight">
                    9278.ai Assistant
                  </span>
                  <span className={cn("block truncate text-[9.5px]", dark ? "text-white/45" : "text-muted-foreground")}>
                    Online · answers instantly
                  </span>
                </span>
              </span>

              {/* desktop — every action inline */}
              <div className="relative ml-auto hidden shrink-0 items-center gap-1 sm:flex">
                <ActionButton onClick={() => setDark((d) => !d)} label={dark ? "Light mode" : "Dark mode"} dark={dark}>
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </ActionButton>
                <ActionButton onClick={newChat} label="New chat" dark={dark}>
                  <Plus className="h-4 w-4" />
                </ActionButton>
                <ActionButton onClick={() => setExpanded((e) => !e)} label={expanded ? "Shrink" : "Expand"} dark={dark}>
                  {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </ActionButton>
                <ActionButton onClick={() => setOpen(false)} label="Close" dark={dark}>
                  <X className="h-4 w-4" />
                </ActionButton>
              </div>

              {/* mobile — a compact dropdown holds the extra actions, Close stays one tap away */}
              <div className="relative ml-auto flex shrink-0 items-center gap-1 sm:hidden">
                <div className="relative">
                  <ActionButton onClick={() => setMenuOpen((v) => !v)} label="More options" dark={dark}>
                    <MoreVertical className="h-4 w-4" />
                  </ActionButton>
                  <AnimatePresence>
                    {menuOpen && (
                      <>
                        <button
                          aria-hidden
                          tabIndex={-1}
                          onClick={() => setMenuOpen(false)}
                          className="fixed inset-0 z-[1] cursor-default"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.96 }}
                          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className={cn(
                            "absolute right-0 top-[calc(100%+8px)] z-[2] w-48 overflow-hidden rounded-2xl border p-1.5 shadow-[0_20px_50px_-20px_rgba(17,17,17,0.4)]",
                            surface,
                            hairline,
                          )}
                        >
                          {[
                            {
                              icon: dark ? Sun : Moon,
                              label: dark ? "Light mode" : "Dark mode",
                              onClick: () => setDark((d) => !d),
                            },
                            { icon: Plus, label: "New chat", onClick: newChat },
                            {
                              icon: expanded ? Minimize2 : Maximize2,
                              label: expanded ? "Shrink" : "Expand",
                              onClick: () => setExpanded((e) => !e),
                            },
                          ].map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => {
                                item.onClick()
                                setMenuOpen(false)
                              }}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium transition-colors",
                                dark ? "text-white/85 hover:bg-white/[0.06]" : "text-foreground hover:bg-black/[0.05]",
                              )}
                            >
                              <item.icon className="h-4 w-4 text-primary" />
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <ActionButton onClick={() => setOpen(false)} label="Close" dark={dark}>
                  <X className="h-4 w-4" />
                </ActionButton>
              </div>
            </div>

            {/* messages — scrollbar hidden but still scrollable */}
            <div
              ref={scrollRef}
              className={cn(
                "flex-1 space-y-4 overflow-y-auto px-3.5 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                canvas,
                expanded && "sm:px-8",
              )}
            >
              <div className={cn("mx-auto space-y-4", expanded && "sm:max-w-2xl")}>
                {/* welcome screen — hero card + quick-start tiles */}
                {showWelcome && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "overflow-hidden rounded-2xl border shadow-sm",
                      dark ? "border-white/10 bg-[#1f1f24]" : "border-black/[0.06] bg-white",
                    )}
                  >
                    <div className="relative px-4 pb-4 pt-5">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_20%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_70%)]"
                      />
                      <div className="relative flex items-center gap-3">
                        <span className="relative">
                          <VoiceOrb size={38} />
                          {!reduced && (
                            <motion.span
                              aria-hidden
                              className="absolute inset-0 rounded-full border border-primary/40"
                              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                            />
                          )}
                        </span>
                        <div>
                          <p className={cn("text-[14px] font-normal leading-tight", dark ? "text-white" : "text-foreground")}>
                            Hi! I&apos;m the 9278.ai Assistant
                          </p>
                          <p className={cn("mt-0.5 text-[11px] leading-snug", dark ? "text-white/55" : "text-muted-foreground")}>
                            Ask me anything about the product — or jump straight in:
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-4 grid grid-cols-2 gap-2">
                        {QUICK_ACTIONS.slice(0, 6).map((qa) => (
                          <button
                            key={qa.cmd}
                            type="button"
                            onClick={() => respond(qa.q)}
                            className={cn(
                              "group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5",
                              dark
                                ? "border-white/10 bg-white/[0.04] hover:border-primary/50 hover:bg-primary/10"
                                : "border-black/[0.07] bg-white hover:border-primary/40 hover:bg-primary/[0.05] hover:shadow-md",
                            )}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                              <qa.icon className="h-3.5 w-3.5" />
                            </span>
                            <span className={cn("text-[11px] font-medium leading-tight", dark ? "text-white/85" : "text-foreground")}>
                              {qa.label}
                            </span>
                          </button>
                        ))}
                      </div>

                      <p className={cn("relative mt-3 text-center text-[9.5px]", dark ? "text-white/35" : "text-muted-foreground/60")}>
                        Tip: type <span className="font-mono font-normal text-primary">/</span> for quick commands
                      </p>
                    </div>
                  </motion.div>
                )}

                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}
                  >
                    <div className={cn("flex items-end gap-2", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                      {m.role === "bot" && (
                        <span className="mb-0.5 shrink-0">
                          <VoiceOrb size={20} />
                        </span>
                      )}
                      <p
                        className={cn(
                          "max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed shadow-sm",
                          m.role === "user"
                            ? "rounded-br-sm bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary)_75%,var(--ai-magenta))] text-white"
                            : botBubble,
                        )}
                      >
                        <MessageText text={m.text} onDark={m.role === "user"} />
                        {m.streaming && (
                          <motion.span
                            className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] bg-primary/70 align-middle"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </p>
                    </div>

                    {m.role === "bot" && !m.streaming && (
                      <div className="ml-7 mt-1 flex items-center gap-0.5">
                        <ActionButton onClick={() => copyMessage(m.id, m.text)} label="Copy answer" dark={dark}>
                          {copiedId === m.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <ClipboardList className="h-3.5 w-3.5" />
                          )}
                        </ActionButton>
                        <ActionButton
                          onClick={() => speakMessage(m.id, m.text)}
                          label={speakingId === m.id ? "Stop reading" : "Read aloud"}
                          dark={dark}
                        >
                          {speakingId === m.id ? (
                            <VolumeX className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <Volume2 className="h-3.5 w-3.5" />
                          )}
                        </ActionButton>

                        <span className={cn("mx-0.5 h-4 w-px", dark ? "bg-white/10" : "bg-black/[0.07]")} />

                        <ActionButton onClick={() => rateFeedback(m.id, "up")} label="Good answer" dark={dark}>
                          <ThumbsUp
                            className={cn("h-3.5 w-3.5", feedback[m.id] === "up" && "fill-emerald-500 text-emerald-500")}
                          />
                        </ActionButton>
                        <ActionButton onClick={() => rateFeedback(m.id, "down")} label="Poor answer" dark={dark}>
                          <ThumbsDown
                            className={cn("h-3.5 w-3.5", feedback[m.id] === "down" && "fill-red-500 text-red-500")}
                          />
                        </ActionButton>
                        {feedback[m.id] && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn("text-[10px]", dark ? "text-white/40" : "text-muted-foreground/70")}
                          >
                            Thanks for the feedback!
                          </motion.span>
                        )}
                      </div>
                    )}

                    {m.followUps && m.followUps.length > 0 && (
                      <div className="ml-7 mt-2 flex flex-wrap gap-1.5">
                        {m.followUps.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => respond(q)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                              dark
                                ? "border-primary/40 bg-primary/15 text-white hover:bg-primary/25"
                                : "border-primary/20 bg-primary/[0.06] text-primary hover:bg-primary/[0.12]",
                            )}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {typing && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                    <VoiceOrb size={20} />
                    <TypingWave dark={dark} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* slash-command menu */}
            <AnimatePresence>
              {slashOpen && slashMatches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className={cn("border-t px-3 py-2", surface, hairline, expanded && "sm:px-8")}
                >
                  <div className={cn("mx-auto space-y-0.5", expanded && "sm:max-w-2xl")}>
                    <p className={cn("px-2 pb-1 text-[9px] font-normal uppercase tracking-wider", dark ? "text-white/35" : "text-muted-foreground/60")}>
                      Quick commands
                    </p>
                    {slashMatches.map((c, i) => (
                      <button
                        key={c.cmd}
                        type="button"
                        onClick={() => respond(c.q)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors",
                          i === 0
                            ? dark
                              ? "bg-primary/15"
                              : "bg-primary/[0.07]"
                            : dark
                              ? "hover:bg-white/[0.06]"
                              : "hover:bg-black/[0.04]",
                        )}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <c.icon className="h-3 w-3" />
                        </span>
                        <span className={cn("font-mono text-[11px] font-normal", dark ? "text-white/85" : "text-foreground")}>
                          {c.cmd}
                        </span>
                        <span className={cn("truncate text-[10.5px]", dark ? "text-white/45" : "text-muted-foreground")}>
                          {c.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* composer */}
            <form onSubmit={onSubmit} className={cn("flex items-end gap-2 border-t p-3", surface, hairline, expanded && "sm:px-8")}>
              <div className={cn("mx-auto flex w-full items-end gap-2", expanded && "sm:max-w-2xl")}>
                <div
                  className={cn(
                    "relative flex flex-1 items-end gap-1 overflow-hidden rounded-2xl border px-2 py-1 transition-colors focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15",
                    dark ? "border-white/10 bg-white/[0.04]" : "border-black/[0.08] bg-black/[0.02]",
                  )}
                >
                  {/* fill progress — how close the composer is to its max height */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden",
                      dark ? "bg-white/[0.06]" : "bg-black/[0.05]",
                    )}
                  >
                    <motion.span
                      className="block h-full origin-left bg-primary"
                      animate={{ scaleX: composerFill }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      style={{ width: "100%" }}
                    />
                  </span>
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value)
                      autoGrow()
                    }}
                    onKeyDown={onKeyDown}
                    rows={1}
                    placeholder={listening ? "Listening…" : "Ask anything — or type / for commands"}
                    className={cn(
                      "max-h-[120px] flex-1 resize-none bg-transparent px-2 py-1.5 text-[12.5px] leading-relaxed focus:outline-none",
                      "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                      dark ? "text-white placeholder:text-white/35" : "text-foreground placeholder:text-muted-foreground/70",
                    )}
                    aria-label="Ask the 9278.ai assistant a question"
                  />
                  {micSupported && (
                    <button
                      type="button"
                      onClick={toggleMic}
                      aria-label={listening ? "Stop voice input" : "Ask by voice"}
                      aria-pressed={listening}
                      className={cn(
                        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        listening
                          ? "bg-primary text-white"
                          : dark
                            ? "text-white/50 hover:bg-white/10 hover:text-white"
                            : "text-muted-foreground/60 hover:bg-black/[0.06] hover:text-foreground",
                      )}
                    >
                      {listening && !reduced && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full border border-primary"
                          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                          transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                        />
                      )}
                      <Mic className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send"
                  whileHover={input.trim() ? { scale: 1.08 } : undefined}
                  whileTap={input.trim() ? { scale: 0.88 } : undefined}
                  className="group/send relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed"
                >
                  {/* glow bloom — only alive once there's something to send */}
                  {input.trim() && !reduced && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-[-4px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.55),transparent_70%)] blur-md"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
                      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  )}

                  {/* rotating brand ring — spins up fast on hover, like the launcher */}
                  {input.trim() && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full transition-transform duration-300 group-hover/send:scale-[1.06]"
                      style={{ background: "conic-gradient(from 0deg, #f43f5e 0deg, #dc2626 120deg, #f97316 200deg, #f43f5e 360deg)" }}
                      animate={reduced ? undefined : { rotate: 360 }}
                      transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  )}

                  {/* solid face */}
                  <span
                    className={cn(
                      "absolute inset-[2.5px] flex items-center justify-center overflow-hidden rounded-full transition-colors duration-300",
                      !input.trim() && (dark ? "bg-white/[0.06]" : "bg-black/[0.05]"),
                    )}
                    style={
                      input.trim()
                        ? { background: "linear-gradient(135deg, #ef4444, #dc2626 55%, #be123c)" }
                        : undefined
                    }
                  >
                    {input.trim() && (
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                    )}

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={sendPulse}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 10, y: -10, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        <Send
                          className={cn(
                            "h-4 w-4 -translate-x-px translate-y-px",
                            input.trim() ? "text-white" : dark ? "text-white/25" : "text-muted-foreground/40",
                          )}
                        />
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.button>
              </div>
            </form>

            <p
              className={cn(
                "flex items-center justify-center gap-1 pb-2.5 text-center text-[9px]",
                surface,
                dark ? "text-white/30" : "text-muted-foreground/60",
              )}
            >
              <Sparkles className="h-2.5 w-2.5" /> Answers from 9278.ai product info · Enter to send · support@9278.ai
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
