import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

// White-label support agent endpoint (bs-miedema-support, via chat.<domain>).
const API_URL = "https://chat.miedemapropertymanagement.com/chat";
const SESSION_KEY = "mpm_chat_session_id";
const AGENT_TAG_RE = /<\/?(lead|escalate|abuse|book_meeting)>[\s\S]*?(<\/(lead|escalate|abuse|book_meeting)>|$)/gi;

type Msg = { role: "user" | "assistant"; text: string };

// On-brand palettes (oklch, matching the site's design tokens). The widget renders
// the OPPOSITE of the site's current theme: site dark -> cream widget, site light -> espresso widget.
const PALETTES = {
  cream: {
    panel: "oklch(0.92 0.024 78)", text: "oklch(0.235 0.028 50)",
    header: "oklch(0.405 0.082 55)", headerText: "oklch(0.972 0.012 80)",
    bot: "oklch(0.862 0.028 78)", botText: "oklch(0.235 0.028 50)",
    user: "oklch(0.575 0.115 55)", userText: "oklch(0.972 0.012 80)",
    border: "oklch(0.768 0.028 65)", accent: "oklch(0.575 0.115 55)",
    inputBg: "oklch(0.97 0.014 80)",
  },
  espresso: {
    panel: "oklch(0.245 0.024 50)", text: "oklch(0.918 0.022 78)",
    header: "oklch(0.405 0.082 55)", headerText: "oklch(0.972 0.012 80)",
    bot: "oklch(0.295 0.024 50)", botText: "oklch(0.918 0.022 78)",
    user: "oklch(0.665 0.115 60)", userText: "oklch(0.198 0.022 50)",
    border: "oklch(0.325 0.022 50)", accent: "oklch(0.718 0.135 60)",
    inputBg: "oklch(0.275 0.02 50)",
  },
};

// Strip agent tags; collapse runs of spaces/tabs but PRESERVE line breaks
// (the agent uses blank lines for breathing room) — cap at one blank line.
const clean = (t: string) =>
  t.replace(AGENT_TAG_RE, "").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").replace(/^\s+/, "");

// Typing indicator — 3 bouncing dots (self-contained; matches the TalkAbilities chat).
function TypingDots() {
  return (
    <span aria-label="typing" style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "3px 0" }}>
      <style>{`@keyframes mpm-chat-bounce{0%,80%,100%{transform:scale(.7);opacity:.35}40%{transform:scale(1);opacity:.9}}@media (prefers-reduced-motion:reduce){.mpm-chat-dot{animation:none!important}}`}</style>
      {[0, 0.15, 0.3].map((d, i) => (
        <span key={i} className="mpm-chat-dot"
          style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: 0.35,
            animation: `mpm-chat-bounce 1.2s ${d}s infinite ease-in-out` }} />
      ))}
    </span>
  );
}

export function ChatWidget() {
  const { theme } = useTheme();
  const p = PALETTES[theme === "dark" ? "cream" : "espresso"]; // opposite of the site

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I'm the Miedema Property Management assistant — here 24/7. Are you a current resident, looking to rent, or a property owner?" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [banned, setBanned] = useState(false);

  const sessionId = useRef<string>("");
  const openedAt = useRef<number>(0);
  const firstMsgAt = useRef<number>(0);
  const mouseEvents = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let s = localStorage.getItem(SESSION_KEY);
    if (!s) { s = crypto.randomUUID(); localStorage.setItem(SESSION_KEY, s); }
    sessionId.current = s;
    if (localStorage.getItem("mpm_chat_banned") === "1") setBanned(true);
  }, []);

  useEffect(() => {
    if (open && !openedAt.current) openedAt.current = Date.now();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy || banned) return;
    if (!firstMsgAt.current) firstMsgAt.current = Date.now();
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }, { role: "assistant", text: "" }]);
    setBusy(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId.current,
          message: text,
          website_url: honeypot.current?.value || "",
          widget_opened_at: openedAt.current,
          first_message_at: firstMsgAt.current,
          mouse_events: mouseEvents.current,
          message_length: text.length,
        }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let acc = "";
      let shownFirst = false;
      const startedAt = Date.now();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n");
        buf = parts.pop() || "";
        for (const line of parts) {
          const s = line.trim();
          if (!s.startsWith("data:")) continue;
          let evt: { type?: string; text?: string };
          try { evt = JSON.parse(s.slice(5).trim()); } catch { continue; }
          if (evt.type === "delta" && evt.text) {
            acc += evt.text;
            // Let the typing dots breathe ~700ms before the first text lands.
            if (!shownFirst) {
              shownFirst = true;
              const wait = 700 - (Date.now() - startedAt);
              if (wait > 0) await new Promise((r) => setTimeout(r, wait));
            }
            const shown = clean(acc);
            setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: shown }; return c; });
          } else if (evt.type === "banned") {
            localStorage.setItem("mpm_chat_banned", "1");
            setBanned(true);
            setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: "This chat has been closed." }; return c; });
          } else if (evt.type === "error") {
            setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: "Sorry — something went wrong. Please email us at garren@miedemapropertymanagement.com and we'll follow up." }; return c; });
          }
        }
      }
      if (!clean(acc)) {
        setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: "Thanks — I've noted that. Anything else I can help with?" }; return c; });
      }
    } catch {
      setMsgs((m) => { const c = [...m]; c[c.length - 1] = { role: "assistant", text: "I couldn't reach our assistant just now. Please try again in a moment." }; return c; });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      onMouseMove={() => { mouseEvents.current++; }}
      onClick={() => { mouseEvents.current++; }}
      style={{ position: "fixed", bottom: "1.25rem", right: "1.25rem", zIndex: 60, fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif' }}
    >
      {/* hidden honeypot */}
      <input ref={honeypot} name="website_url" tabIndex={-1} autoComplete="off"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, width: 0, pointerEvents: "none" }} aria-hidden="true" />

      {open && (
        <div role="dialog" aria-label="Miedema Property Management chat"
          style={{ position: "absolute", bottom: "4.25rem", right: 0, width: "min(92vw, 23rem)", height: "min(70vh, 32rem)",
            display: "flex", flexDirection: "column", background: p.panel, color: p.text,
            border: `1px solid ${p.border}`, borderRadius: "1rem", overflow: "hidden",
            boxShadow: "0 18px 50px -12px rgba(40,28,16,0.45)" }}>
          <div style={{ background: p.header, color: p.headerText, padding: "0.8rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Miedema Assistant</div>
              <div style={{ fontSize: "0.72rem", opacity: 0.85 }}>Typically replies instantly · 24/7</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"
              style={{ background: "transparent", border: "none", color: p.headerText, cursor: "pointer", fontSize: "1.25rem", lineHeight: 1, padding: "0 0.25rem" }}>×</button>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "0.9rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%",
                background: m.role === "user" ? p.user : p.bot, color: m.role === "user" ? p.userText : p.botText,
                padding: "0.55rem 0.8rem", borderRadius: m.role === "user" ? "0.9rem 0.9rem 0.2rem 0.9rem" : "0.9rem 0.9rem 0.9rem 0.2rem",
                fontSize: "0.9rem", lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {m.text ? m.text : busy && i === msgs.length - 1 ? <TypingDots /> : ""}
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${p.border}`, padding: "0.6rem", display: "flex", gap: "0.5rem" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} disabled={banned}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder={banned ? "Chat closed" : "Type your message…"}
              style={{ flex: 1, background: p.inputBg, color: p.text, border: `1px solid ${p.border}`, borderRadius: "0.6rem",
                padding: "0.55rem 0.7rem", fontSize: "0.9rem", outline: "none" }} />
            <button onClick={send} disabled={busy || banned || !input.trim()} aria-label="Send"
              style={{ background: p.accent, color: p.userText, border: "none", borderRadius: "0.6rem", padding: "0 0.9rem",
                cursor: busy || banned ? "default" : "pointer", fontWeight: 600, opacity: busy || banned ? 0.6 : 1 }}>↑</button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Open chat"}
        style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: p.header, color: p.headerText,
          border: `2px solid ${p.accent}`, cursor: "pointer", boxShadow: "0 10px 28px -8px rgba(40,28,16,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
        {open ? (
          <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>×</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
