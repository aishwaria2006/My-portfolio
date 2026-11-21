"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING = "Hi, I'm Aishwaria's assistant. Ask me about her projects, her work at Adya AI, her skills or her achievements.";
const STARTERS = ["What does she do at Adya AI?", "Tell me about MachineSpeak", "What has she won?"];

// Minimal typing for the browser speech recognition API (not in TS's DOM lib).
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function getRecognition(): Recognition | null {
  if (typeof window === "undefined") return null;
  const W = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  const Ctor = W.SpeechRecognition || W.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

function Waveform({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const bars = [0.45, 0.9, 0.6, 1, 0.5];
  return (
    <span aria-hidden className="flex h-5 items-center gap-[3px]">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="block w-[3px] rounded-full bg-current"
          style={{ height: `${h * 100}%` }}
          animate={active && !reduce ? { scaleY: [1, 0.35, 1] } : { scaleY: 1 }}
          transition={active && !reduce ? { duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" } : { duration: 0.2 }}
        />
      ))}
    </span>
  );
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const recRef = useRef<Recognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => setMicSupported(!!getRecognition()), []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!voiceOn || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    },
    [voiceOn]
  );

  const close = useCallback(() => {
    setOpen(false);
    stopSpeaking();
    recRef.current?.stop();
    triggerRef.current?.focus();
  }, [stopSpeaking]);

  // Greet on open (the visitor clicked, so speaking is allowed).
  useEffect(() => {
    if (!open) return;
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: GREETING }]);
      speak(GREETING);
    }
    setTimeout(() => inputRef.current?.focus(), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, busy, reduce]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    stopSpeaking();
    const history: Msg[] = [...messages.filter((m) => m.content !== GREETING), { role: "user", content: q }];
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      const reply: string = res.ok ? data.reply : data.error || "The assistant couldn't answer right now. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (res.ok) speak(reply);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "The assistant couldn't be reached. Check your connection and try again." }]);
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = getRecognition();
    if (!rec) return;
    stopSpeaking();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e) => {
      const text = e.results[0]?.[0]?.transcript ?? "";
      if (text) ask(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="assistant-panel"
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 flex items-center gap-3 rounded-full border border-line-strong bg-bg px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-fg transition hover:border-fg md:right-8"
      >
        <span className="text-lavender-deep"><Waveform active={speaking || listening} /></span>
        <span className="sr-only sm:not-sr-only text-[0.95rem]">{open ? "Close assistant" : "Ask about my work"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="assistant-panel"
            role="dialog"
            aria-label="Portfolio assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-3 z-40 flex max-h-[min(34rem,75vh)] w-[calc(100vw-1.5rem)] max-w-[24rem] origin-bottom-right flex-col overflow-hidden rounded-md border border-line-strong bg-bg md:right-8"
          >
            <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3">
              <div>
                <p className="font-serif text-lg leading-tight">Aishwaria&rsquo;s assistant</p>
                <p className="text-xs text-graphite">Answers from her portfolio only</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => { if (voiceOn) stopSpeaking(); setVoiceOn(!voiceOn); }}
                  aria-pressed={!voiceOn}
                  className="rounded-full px-2.5 py-1.5 text-sm text-graphite hover:bg-lavender-wash hover:text-ink"
                >
                  {voiceOn ? "Mute voice" : "Unmute voice"}
                </button>
                <button type="button" onClick={close} aria-label="Close assistant" className="rounded-full px-2.5 py-1.5 text-lg leading-none text-graphite hover:bg-lavender-wash hover:text-ink">
                  ×
                </button>
              </div>
            </div>

            <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`max-w-[88%] rounded-md px-3.5 py-2.5 text-[0.95rem] leading-relaxed ${m.role === "user" ? "ml-auto bg-fg text-bg" : "border border-line text-fg"}`}
                >
                  {m.content}
                </p>
              ))}
              {busy && <p className="text-sm text-graphite">Thinking…</p>}
              {messages.length <= 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((s) => (
                    <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-fg">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); ask(input); }}
              className="flex items-center gap-2 border-t border-rule p-3"
            >
              {micSupported && (
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop listening" : "Ask by voice"}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${listening ? "border-lavender-deep bg-lavender-deep text-paper" : "border-rule text-ink hover:border-lavender-deep"}`}
                >
                  <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="3" width="6" height="12" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                  </svg>
                </button>
              )}
              <label htmlFor="assistant-input" className="sr-only">Your question</label>
              <input
                id="assistant-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={listening ? "Listening…" : "Ask a question"}
                maxLength={600}
                className="h-10 min-w-0 flex-1 rounded-full border border-rule bg-paper px-4 text-[0.95rem] outline-none focus:border-lavender-deep"
              />
              <button type="submit" disabled={busy || !input.trim()} className="h-10 shrink-0 rounded-full bg-accent px-4 text-sm text-bg transition hover:bg-fg disabled:opacity-40">
                Ask
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
