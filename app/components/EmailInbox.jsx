"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = "https://api.siddz.com/compt";

function MailIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function RefreshIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M20.015 4.356v4.992" />
    </svg>
  );
}

function linkify(text) {
  if (!text) return [];
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      urlRegex.lastIndex = 0;
      const display = part.length > 60 ? part.slice(0, 57) + "..." : part;
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline break-all">
          {display}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function EmailInbox() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/emails/`);
      if (!res.ok) throw new Error();
      setEmails(await res.json());
    } catch {
      setError("Could not load emails. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmails(); }, [fetchEmails]);

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    const now = new Date();
    if (date.toDateString() === now.toDateString())
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const getName = (s) => {
    if (!s) return "Unknown";
    const m = s.match(/^(.+?)\s*</);
    return m ? m[1].replace(/"/g, "") : s.split("@")[0];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="border-b border-[#1e1e1e] px-4 sm:px-6 py-4"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
              <MailIcon className="w-4 h-4 text-[#888]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight">compos</span>
              <span className="text-[#333]">/</span>
              <span className="text-sm text-[#888]">inbox</span>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchEmails}
            disabled={loading}
            className="group flex h-8 items-center gap-2 rounded-lg border border-[#333] bg-transparent px-3 text-xs text-[#888] transition-colors hover:border-[#555] hover:text-[#ededed] disabled:opacity-40 cursor-pointer"
          >
            <RefreshIcon className={`w-3.5 h-3.5 transition-transform ${loading ? "animate-spin" : "group-hover:rotate-45"}`} />
            {loading ? "Fetching…" : "Fetch Emails"}
          </motion.button>
        </div>
      </motion.header>

      <main className="flex-1 mx-auto w-full max-w-6xl p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading && emails.length === 0 && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-px rounded-xl border border-[#1e1e1e] overflow-hidden"
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 bg-[#111] px-3 sm:px-5 py-3 sm:py-4">
                  <div className="h-9 w-9 rounded-full bg-[#1e1e1e] animate-pulse" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="h-3 w-24 sm:w-32 rounded bg-[#1e1e1e] animate-pulse" />
                    <div className="h-3 w-40 sm:w-64 rounded bg-[#1e1e1e] animate-pulse" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {!loading && emails.length === 0 && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-[#1e1e1e] mb-6"
              >
                <MailIcon className="w-7 h-7 text-[#555]" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-lg font-medium mb-2"
              >
                No emails yet
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-[#555] mb-6 text-center max-w-xs"
              >
                Click &quot;Fetch Emails&quot; to pull the latest 5 from your Gmail via Composio.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchEmails}
                disabled={loading}
                className="group flex h-9 items-center gap-2 rounded-lg bg-white text-black px-4 text-sm font-medium hover:bg-white/90 disabled:opacity-40 cursor-pointer"
              >
                <RefreshIcon className={`w-3.5 h-3.5 transition-transform ${loading ? "animate-spin" : "group-hover:rotate-45"}`} />
                {loading ? "Fetching…" : "Fetch Emails"}
              </motion.button>
            </motion.div>
          )}

          {!loading && emails.length > 0 && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-[#1e1e1e] overflow-hidden"
            >
              {emails.map((email, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  key={email.id}
                  onClick={() => setSelected(selected?.id === email.id ? null : email)}
                  className={`flex w-full items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 text-left transition-all border-b border-[#1e1e1e] last:border-b-0 hover:bg-white/[0.02] cursor-pointer ${
                    selected?.id === email.id ? "bg-white/[0.04]" : ""
                  } ${email.is_read ? "opacity-60" : ""}`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    !email.is_read
                      ? "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                      : "bg-white/[0.06] text-[#666]"
                  }`}>
                    {getName(email.sender).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm truncate ${!email.is_read ? "font-semibold" : "text-[#999]"}`}>
                        {getName(email.sender)}
                      </span>
                      {!email.is_read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse-dot shrink-0" />
                      )}
                    </div>
                    <span className={`text-sm truncate block ${!email.is_read ? "text-[#ccc]" : "text-[#666]"}`}>
                      {email.subject}
                    </span>
                  </div>
                  <span className="text-xs text-[#555] shrink-0">{formatDate(email.date)}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selected && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start justify-between mb-4"
                >
                  <div className="min-w-0 flex-1 mr-4">
                    <h2 className="text-base sm:text-lg font-semibold mb-1 break-words">{selected.subject}</h2>
                    <p className="text-sm text-[#888]">
                      From <span className="text-[#ccc]">{selected.sender}</span>
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelected(null)}
                    className="text-[#555] hover:text-[#ededed] text-lg leading-none cursor-pointer"
                  >
                    ✕
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-[#1e1e1e] pt-4"
                >
                  <p className="text-sm leading-relaxed text-[#aaa] whitespace-pre-wrap break-words">
                    {linkify(selected.body || selected.snippet || "No body content.")}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-t border-[#1e1e1e] px-6 py-4"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-[#555]">
          <span>Powered by Composio × Django</span>
          <span>{emails.length} emails</span>
        </div>
      </motion.footer>
    </div>
  );
}
