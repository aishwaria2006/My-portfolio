import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/knowledge";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

// Simple per-IP rate limit. On Vercel each server instance keeps its own memory,
// so this is a soft limit that stops casual abuse; use a shared store (e.g. Upstash
// Redis) if you need a strict one.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 15;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "The assistant is not configured yet. Add GROQ_API_KEY to the environment." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "You've asked a lot of questions in a short time. Please try again in a few minutes." }, { status: 429 });
  }

  let messages: Msg[];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Msg) => (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string")
      .slice(-8)
      .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 600) }));
  } catch {
    return NextResponse.json({ error: "The request couldn't be read." }, { status: 400 });
  }
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Ask a question to get started." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 300,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      console.error("Groq error", res.status, await res.text());
      return NextResponse.json({ error: "The assistant couldn't answer right now. Please try again." }, { status: 502 });
    }
    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() || "";
    return NextResponse.json({ reply: reply || "I don't have an answer for that one." });
  } catch (e) {
    console.error("Assistant request failed", e);
    return NextResponse.json({ error: "The assistant took too long to answer. Please try again." }, { status: 504 });
  }
}
