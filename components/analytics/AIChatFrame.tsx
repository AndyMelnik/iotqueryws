"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { chatResponses } from "@/lib/mockFleetData";

interface Message {
  role: "user" | "assistant";
  content: string;
  sql?: string;
}

const INITIAL: Message = {
  role: "assistant",
  content: `Hello! I'm an AI assistant powered by your telematics data — ready for MCP and custom agents. Ask anything about your fleet, for example:\n\n• "Which vehicles waste the most fuel?"\n• "Which drivers create the highest risk?"\n• "What is the fleet utilization?"\n• "Show me cost analytics"\n\nYour data is queryable via SQL so you can build custom Assistants and Agents with Model Context Protocol (MCP).`,
};

const FALLBACK: Message = {
  role: "assistant",
  content: `I didn't find a specific metric for that query in the demo dataset. Try asking about:\n• **Fuel consumption** per vehicle\n• **Driver risk** rankings\n• **Fleet utilization** right now\n• **Cost analytics** over last 7 days\n\nUse this same SQL-backed data with MCP to build custom AI assistants and agents.`,
};

const SUGGESTED = [
  "Which vehicles waste the most fuel?",
  "Which drivers create the highest risk?",
  "What is the fleet utilization?",
  "Show me cost analytics",
];

export default function AIChatFrame() {
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const respond = (query: string) => {
    const lower = query.toLowerCase();
    const match = chatResponses.find((r) =>
      r.keywords.some((kw) => lower.includes(kw))
    );
    return match
      ? { content: match.answer, sql: match.sql }
      : { content: FALLBACK.content };
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const { content, sql } = respond(q);
      setMessages((m) => [...m, { role: "assistant", content, sql }]);
      setLoading(false);
    }, 900 + Math.random() * 500);
  };

  // Escape HTML to prevent XSS when rendering user or bot content
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const renderContent = (text: string) => {
    // Simple markdown: bold, bullets, table rows. Escapes HTML to prevent XSS.
    return text.split("\n").map((line, i) => {
      if (line.startsWith("|")) {
        const cells = line.split("|").filter(Boolean);
        if (cells.every((c) => c.trim().match(/^[-:]+$/))) return null;
        return (
          <div key={i} className="flex gap-2 text-xs py-0.5">
            {cells.map((c, j) => (
              <span key={j} className="flex-1" style={{ color: j === 0 ? "rgba(224,234,255,0.7)" : "#e0eaff" }}>{c.trim()}</span>
            ))}
          </div>
        );
      }
      const safe = escapeHtml(line);
      const withBold = safe.replace(/\*\*(.+?)\*\*/g, (_, g) => `<strong style="color:#e0eaff">${escapeHtml(g)}</strong>`);
      return (
        <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.75)", minHeight: line ? undefined : "0.5rem" }}
          dangerouslySetInnerHTML={{ __html: withBold }} />
      );
    }).filter(Boolean);
  };

  return (
    <div className="flex flex-col gap-4" style={{ height: "380px" }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(179,0,255,0.2) transparent" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={msg.role === "assistant"
                ? { background: "rgba(179,0,255,0.15)", border: "1px solid rgba(179,0,255,0.3)" }
                : { background: "rgba(0,240,255,0.12)", border: "1px solid rgba(0,240,255,0.25)" }}>
              {msg.role === "assistant" ? <Bot size={14} style={{ color: "#b300ff" }} /> : <User size={14} style={{ color: "#00f0ff" }} />}
            </div>
            {/* Bubble */}
            <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className="rounded-2xl px-4 py-3"
                style={msg.role === "assistant"
                  ? { background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.15)" }
                  : { background: "rgba(179,0,255,0.12)", border: "1px solid rgba(179,0,255,0.25)" }}>
                <div className="flex flex-col gap-0.5">{renderContent(msg.content)}</div>
              </div>
              {msg.sql && (
                <div className="rounded-xl px-3 py-2 text-xs w-full" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,240,255,0.15)", fontFamily: "var(--font-jetbrains-mono)", color: "#00f0ff" }}>
                  <div className="text-[9px] tracking-widest uppercase mb-1" style={{ color: "rgba(0,240,255,0.45)" }}>SQL executed</div>
                  <pre className="whitespace-pre-wrap text-[10px]" style={{ color: "rgba(224,234,255,0.55)" }}>{msg.sql}</pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(179,0,255,0.15)", border: "1px solid rgba(179,0,255,0.3)" }}>
              <Bot size={14} style={{ color: "#b300ff" }} />
            </div>
            <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.15)" }}>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#b300ff", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((s) => (
            <button key={s} type="button" onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
              style={{ background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.6)", cursor: "pointer" }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <Sparkles size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(179,0,255,0.45)" }} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask about your fleet — or build custom Agents with MCP…"
            disabled={loading}
            className="w-full rounded-xl pl-9 pr-4 py-3 text-sm outline-none transition-all duration-200"
            style={{ background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.2)", color: "#e0eaff" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(179,0,255,0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(100,150,255,0.2)")}
          />
        </div>
        <button
          type="button"
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
          style={{
            background: input.trim() && !loading ? "linear-gradient(135deg, #b300ff, #00f0ff)" : "rgba(100,150,255,0.1)",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            opacity: input.trim() && !loading ? 1 : 0.5,
          }}>
          <Send size={15} style={{ color: "#050a22" }} />
        </button>
      </div>
    </div>
  );
}
