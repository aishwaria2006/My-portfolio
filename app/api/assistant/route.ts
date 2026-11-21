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

// Both providers speak the OpenAI chat-completions format. NVIDIA is used when its key is set.
function provider() {
  if (process.env.NVIDIA_API_KEY) {
    return {
      name: "NVIDIA",
      key: process.env.NVIDIA_API_KEY,
      url: "https://integrate.api.nvidia.com/v1/chat/completions",
      model: process.env.NVIDIA_MODEL || "nvidia/nemotron-3.5-lightning-30b-a3b",
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      name: "Groq",
      key: process.env.GROQ_API_KEY,
      url: "https://api.groq.com/openai/v1/chat/completions",
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    };
  }
  return null;
}

export async function POST(req: Request) {
  const p = provider();
  if (!p) {
    return NextResponse.json({ error: "The assistant is not configured yet. Add NVIDIA_API_KEY or GROQ_API_KEY to the environment." }, { status: 503 });
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
    const res = await fetch(p.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${p.key}` },
      body: JSON.stringify({
        model: p.model,
        // Nemotron models reason out loud by default; switch it off so replies are fast and land in `content`.
        ...(p.model.includes("nemotron") ? { chat_template_kwargs: { enable_thinking: false } } : {}),
        temperature: 0.3,
        max_tokens: 300,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      console.error(`${p.name} error`, res.status, await res.text());
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
