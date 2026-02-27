"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What patterns drive the highest completion rates?",
  "How can AI improve recommendations?",
  "What does churn prediction look like?",
  "How can AI improve dynamic pricing strategies?",
];

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I'm StreamIQ, your AI analyst built by Lotus AI. I can help you understand performance trends, audience segmentation, monetization strategy, and how AI can transform your operations. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const json = line.slice(6).trim();
            if (json === "[DONE]") continue;
            try {
              const e = JSON.parse(json);
              if (e.type === "content_block_delta" && e.delta?.type === "text_delta") {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: updated[updated.length - 1].content + e.delta.text,
                  };
                  return updated;
                });
              }
            } catch (_) {}
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Unable to connect to the AI service. Please check your ANTHROPIC_API_KEY environment variable.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <p className="section-label">AI Analyst</p>
      <h2 className="section-title">
        Ask anything about
        <br />
        <em style={{ fontStyle: "italic", color: "var(--gold)" }}>your data &amp; AI.</em>
      </h2>
      <p className="section-sub" style={{ marginBottom: "1.25rem" }}>
        StreamIQ&apos;s AI analyst can help you explore your data, understand trends, and
        discover how AI can transform your operations.
      </p>

      {/* Suggestion pills */}
      <div className="pill-nav" style={{ marginBottom: "1rem" }}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className="pill"
            style={{ fontSize: "0.72rem" }}
            onClick={() => {
              setInput(s);
              inputRef.current?.focus();
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        className="card"
        style={{ padding: 0, display: "flex", flexDirection: "column", height: "min(520px,65vh)" }}
      >
        <div
          style={{
            padding: "0.875rem 1rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <img
            src="/lotus-logo.png"
            alt="Lotus AI"
            style={{ width: 24, height: 24, flexShrink: 0, objectFit: "contain" }}
          />
          <div style={{ fontSize: "0.8rem", color: "var(--text)", flex: 1 }}>
            StreamIQ AI Analyst
          </div>
          <span
            className="animate-pulse"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--teal)",
              display: "inline-block",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
              style={{ animation: "fadeUp 0.3s ease" }}
            >
              {m.role === "assistant" && (
                <div
                  style={{
                    fontSize: "0.62rem",
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.3rem",
                  }}
                >
                  StreamIQ
                </div>
              )}
              {m.content || (
                <span className="animate-pulse" style={{ color: "var(--text-dim)" }}>
                  ▍
                </span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div
          style={{
            padding: "0.875rem 1rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <input
            ref={inputRef}
            className="input-field"
            style={{ flex: 1 }}
            placeholder="Ask about your data, trends, AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          />
          <button
            className="btn-primary"
            style={{ padding: "0.875rem 1rem", minWidth: 44, flexShrink: 0 }}
            onClick={send}
            disabled={loading}
          >
            {loading ? "…" : "→"}
          </button>
        </div>
      </div>

      {/* CTA card */}
      <div
        className="card"
        style={{ marginTop: "1rem", background: "var(--gold-dim)", borderColor: "rgba(201,168,76,0.2)" }}
      >
        <div
          style={{
            fontSize: "0.68rem",
            color: "var(--gold)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          Lotus AI
        </div>
        <div
          style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "0.5rem" }}
        >
          Want this AI analyst trained on your specific content library and data?
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          We build production-grade AI systems for M&E organizations. →
        </div>
      </div>
    </div>
  );
}
