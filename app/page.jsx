"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailInbox from "./components/EmailInbox";

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="white" fillOpacity="0.06" />
      <path
        d="M7 10l7 5 7-5M7 10v8a1 1 0 001 1h12a1 1 0 001-1v-8"
        stroke="#ededed"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6l-10 7L2 6" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#888" strokeWidth="1.5"/>
      <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="#888" strokeWidth="1.5"/>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#888" strokeWidth="1.5"/>
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Home() {
  const [view, setView] = useState("landing");

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "inbox" ? (
          <motion.div
            key="inbox"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="min-h-screen"
          >
            <div className="border-b border-[#1e1e1e] bg-[#0a0a0a]">
              <div className="mx-auto max-w-6xl px-6 py-3">
                <motion.button
                  whileHover={{ x: -2, color: "#ededed" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView("landing")}
                  className="text-xs text-[#555] flex items-center gap-1.5 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 8H3M7 12L3 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </motion.button>
              </div>
            </div>
            <EmailInbox />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col"
          >
            <nav className="border-b border-[#1e1e1e]">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 py-4">
                <div className="flex items-center gap-3">
                  <LogoIcon />
                  <span className="text-sm font-semibold tracking-tight">composio task</span>
                </div>
                <div className="flex items-center gap-4">
                  {/* <a href="https://docs.composio.dev" target="_blank" rel="noopener noreferrer" className="text-xs text-[#555] transition-colors hover:text-[#ededed]">Docs</a> */}
                  {/* <a href="https://github.com/composiohq/composio" target="_blank" rel="noopener noreferrer" className="text-xs text-[#555] transition-colors hover:text-[#ededed]">GitHub</a> */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView("inbox")}
                    className="flex h-8 items-center gap-2 rounded-lg bg-white px-3.5 text-xs font-medium text-black cursor-pointer"
                  >
                    Open Inbox
                  </motion.button>
                </div>
              </div>
            </nav>

            <main className="flex-1">
              <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-14 pb-12 sm:pt-24 sm:pb-20">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1e1e1e] bg-white/[0.03] px-3.5 py-1.5 text-xs text-[#888]">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                    Powered by Composio
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl text-[2rem] sm:text-5xl font-semibold leading-[1.15] sm:leading-[1.1] tracking-tight"
                >
                  Your Gmail inbox,{" "}
                  <span className="gradient-text">fetched live</span>,{" "}
                  served via API.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#888]"
                >
                  A simple Django service that fetches your latest 5 emails from Gmail
                  through Composio and serves them via a clean API.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setView("inbox")}
                    className="flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/90 cursor-pointer"
                  >
                    Try the demo
                    <ArrowIcon />
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://composio.dev"
                    target="_blank"
                    className="flex h-11 items-center gap-2 rounded-full border border-[#1e1e1e] bg-transparent px-6 text-sm font-medium text-[#ededed] transition-colors hover:bg-white/[0.03]"
                  >
                    Get API Key
                  </motion.a>
                </motion.div>
              </section>


              <section className="mx-auto max-w-5xl px-5 sm:px-6 py-10 sm:py-16">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-xs font-mono uppercase tracking-widest text-[#555] mb-6"
                >
                  API Endpoints
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-px rounded-xl border border-[#1e1e1e] overflow-hidden"
                >
                  {[
                    { method: "GET", path: "/compt/emails/", desc: "Fetch 5 emails from Gmail via Composio and return as JSON" },
                  ].map(({ method, path, desc }) => (
                    <div
                      key={path}
                      className="flex items-center gap-3 bg-[#111] px-4 sm:px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="shrink-0 w-12 text-center text-[10px] font-mono font-bold uppercase tracking-wider rounded-md py-0.5 bg-emerald-500/10 text-emerald-400">
                        {method}
                      </span>
                      <code className="text-xs sm:text-sm font-mono text-[#ededed] truncate">{path}</code>
                      <span className="hidden sm:block ml-auto shrink-0 text-xs text-[#555]">{desc}</span>
                    </div>
                  ))}
                </motion.div>
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


