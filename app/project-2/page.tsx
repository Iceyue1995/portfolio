"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// Animation helpers
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

const scrollFadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

const scrollFadeUpFar = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const metadata = [
  { label: "Role",         value: "Lead Product Designer" },
  { label: "Timeline",     value: "2022 – 2023"           },
  { label: "Context",      value: "eCommerce / AI"         },
  { label: "Deliverables", value: "End-to-end UX/UI"       },
];

const coreNeeds = [
  {
    title: "Instant Answers",
    description: "Buyers expect immediate, accurate responses to product queries without navigating complex menu trees or waiting for human agents.",
  },
  {
    title: "Contextual Awareness",
    description: "The AI must understand order history, browsing context, and user intent — responding with relevance rather than generic scripted replies.",
  },
  {
    title: "Seamless Escalation",
    description: "When the AI reaches its limits, handoff to a live agent must feel frictionless — preserving full conversation context and user trust.",
  },
];

const designGoals = [
  { title: "Consistency",   desc: "Every interaction pattern maps to a familiar mental model — zero relearning across the builder." },
  { title: "Efficiency",    desc: "Common tasks — launching a bot, adding a node, editing a reply — should take under 10 seconds." },
  { title: "Accessibility", desc: "Non-technical merchants must be able to build and deploy a bot without reading a single line of docs." },
  { title: "Scalability",   desc: "The architecture must support flows from 3 nodes to 3,000 without performance or UX degradation." },
];

const coreFeatures = [
  { title: "Visual Flow Builder",   desc: "Drag-and-drop node canvas replaces JSON config. Build a full chatbot tree in minutes, not days." },
  { title: "AI Intent Suggestions", desc: "The builder detects gaps in your flow and recommends intent nodes based on common buyer questions." },
  { title: "One-click Publishing",  desc: "Deploy to Shopee Chat, in-app banners, and landing pages simultaneously with a single action." },
];

const finalImpact = [
  { stat: "×4.2",   label: "Increase in merchant self-serve chatbot creation" },
  { stat: "−68%",   label: "Reduction in chatbot-related support tickets"     },
  { stat: "11 min", label: "Average time to publish a fully configured bot"   },
  { stat: "94%",    label: "Merchant satisfaction score post-launch"          },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Project2Page() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900 overflow-x-hidden">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-5xl">
          <motion.p
            {...fadeUp(0)}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase mb-7"
          >
            Case Study — Shopee AI
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif font-normal text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.08] tracking-[-0.025em] text-slate-900 mb-8"
          >
            From Complexity{" "}
            <span className="text-[#3B82F6] italic">to Clarity.</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-[#3B82F6] font-light max-w-2xl"
          >
            Redesigning Shopee&rsquo;s AI-powered chatbot builder to empower
            non-technical merchants — turning complex conversation flows into
            an intuitive, visual, drag-and-drop experience used by millions
            across South-East Asia.
          </motion.p>
        </div>
      </section>

      {/* ── Metadata grid ──────────────────────────────────────────────────── */}
      <motion.section
        {...fadeUp(0.3)}
        className="w-full px-6 md:px-12 lg:px-20 pb-20"
      >
        <div className="w-full h-px bg-slate-200 mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {metadata.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10.5px] font-medium tracking-[0.14em] text-slate-400 uppercase mb-2">{label}</p>
              <p className="text-[14px] font-semibold text-slate-900 tracking-tight">{value}</p>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-slate-200 mt-10" />
      </motion.section>

      {/* ── The Challenge ──────────────────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUpFar}
        className="w-full px-6 md:px-12 lg:px-20 pt-8 pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-red-400 uppercase mb-7">The Context</p>
            <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.12] tracking-[-0.02em] text-slate-900 mb-7">
              Scaling Support Across Borders.
            </h2>
            <p className="text-[clamp(0.9rem,1.3vw,1rem)] leading-[1.85] text-slate-500 font-light mb-6">
            Shopee’s rapid expansion across Southeast Asia and Latin America created a
monumental challenge: localized customer support at scale. Each region required
unique conversational flows, logic, and language nuances.            </p>
            <p className="text-[clamp(0.9rem,1.3vw,1rem)] leading-[1.85] text-slate-500 font-light">
            However, the underlying infrastructure was fragmented. Regional teams couldn't deploy updates themselves, leading to a massive bottleneck at the central
engineering level. We needed a system that could handle global complexity while
remaining simple enough for local operators.            </p>
          </div>
          {/* Right Side: Two Mobile UI Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 w-full">
            {/* Card 1 */}
            <div className="bg-[#18181B] rounded-[2rem] p-4 md:p-6 shadow-2xl flex items-center justify-center">
              <div className="relative w-full aspect-[9/19] rounded-[1rem] overflow-hidden border border-gray-800/50">
                <Image src="/images/shopee-chat-1.png" alt="Shopee Chat UI 1" fill className="object-cover" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#18181B] rounded-[2rem] p-4 md:p-6 shadow-2xl flex items-center justify-center">
              <div className="relative w-full aspect-[9/19] rounded-[1rem] overflow-hidden border border-gray-800/50">
                <Image src="/images/shopee-chat-2.png" alt="Shopee Chat UI 2" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Section 1: The Challenge ───────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-red-400 uppercase mb-7">The Challenge</p>
            <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.12] tracking-[-0.02em] text-slate-900">
              Slow and Engineering-Dependent Deployment
            </h2>
          </div>

          {/* Right: Timeline + Quote */}
          <div className="flex flex-col gap-12 lg:gap-16 w-full mt-8 md:mt-0">
            {/* Timeline Block */}
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase block mb-4">
                THE OLD WAY (7-9 WEEKS)
              </span>
              <div className="bg-white border border-gray-200 py-10 px-4 md:px-8">
                <div className="flex items-start justify-between relative">
                  {/* Background connecting line */}
                  <div className="absolute left-6 right-6 top-[11px] h-[1px] bg-gray-200 z-0"></div>

                  {/* Step Nodes */}
                  {[
                    "REQUIREMENT",
                    "DEV SIZING",
                    "BACKLOG",
                    "CODE & QA",
                    "DEPLOYMENT"
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 relative z-10 bg-white px-2 max-w-[80px]">
                      <div className="w-6 h-6 rounded-full bg-[#F06260]"></div>
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider text-center leading-tight">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <blockquote className="border-l-[3px] border-[#F06260] pl-6 lg:pl-8">
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-slate-600">
                "If we cannot change a simple greeting message in less than a month, we are losing the trust of our millions of customers."
              </p>
            </blockquote>
          </div>
        </div>
      </motion.section>

      {/* ── Section 2: The Solution ────────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24 border-t border-b border-gray-100"
      >
        {/* Top: centered heading */}
        <div className="text-center mb-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-500 uppercase mb-5">The Solution</p>
          <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.025em] text-slate-900 max-w-3xl mx-auto">
            One-Stop Conversational Platform
          </h2>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { num: "01", title: "Build", desc: "Drag-and-drop visual canvas to create complex conversation flows without writing a single line of code." },
            { num: "02", title: "Localize", desc: "Adapt flows for any language or region in minutes. Local ops teams deploy without engineering." },
            { num: "03", title: "Analyze", desc: "Real-time drop-off heatmaps and intent accuracy scores surface exactly where bots fail." },
            { num: "04", title: "Deploy", desc: "One-click publishing with staged rollouts and instant rollback across all markets simultaneously." },
          ].map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col gap-4">
              <span className="font-serif text-[clamp(2rem,3.5vw,2.75rem)] leading-none text-blue-100 font-normal select-none">{num}</span>
              <p className="text-[14px] font-semibold text-slate-900 tracking-tight">{title}</p>
              <p className="text-[13px] leading-relaxed text-slate-500 font-light">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Section 3: Dark Capabilities Block ────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="bg-[#18181B] rounded-[2.5rem] p-12 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                title: "Speed of Content",
                desc: "Regional ops need to update support dialogues daily to respond to seasonal campaigns and local events.",
              },
              {
                title: "Logic Ownership",
                desc: "Regional operators override tone, vocabulary, and logic without touching the base template. Campaign-specific variants go live in under 15 minutes.",
              },
              {
                title: "Global Scalability",
                desc: "The same platform serves micro-sellers in Indonesia and enterprise brands in Brazil. Modular architecture means adding a new market takes hours, not sprints.",
              },
            ].map(({ title, desc }) => (
              <div key={title}>
                <div className="w-8 h-px bg-blue-500 mb-8" />
                <p className="text-[15px] font-semibold text-white mb-4 tracking-tight">{title}</p>
                <p className="text-[13px] leading-relaxed text-gray-400 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Section 4: Selecting the Architecture ─────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32"
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-500 uppercase mb-14">
          Selecting the Architecture
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 — Form-based */}
          <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-6">Option 01</p>
            <h3 className="text-[18px] font-semibold text-slate-900 mb-3 tracking-tight">Form-based</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed font-light">
              Simple dropdowns and text fields to configure dialogue trees. Fast to build, but rigid — operators hit a ceiling within weeks as flow complexity grows.
            </p>
            <span className="inline-block mt-8 text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 py-1 bg-slate-200/60 rounded-full">
              Inefficient
            </span>
          </div>

          {/* Card 2 — Script-based */}
          <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-6">Option 02</p>
            <h3 className="text-[18px] font-semibold text-slate-900 mb-3 tracking-tight">Script-based</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed font-light">
              YAML or JSON config files edited directly by operators. Full power, zero abstraction — requires engineering support for every change and blocks self-serve entirely.
            </p>
            <span className="inline-block mt-8 text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 py-1 bg-slate-200/60 rounded-full">
              Too Complex
            </span>
          </div>

          {/* Card 3 — Drag-and-drop (WINNER) */}
          <div className="bg-slate-50 rounded-[2rem] p-10 border-2 border-blue-500 relative">
            <div className="absolute top-5 right-5">
              <span className="bg-blue-500 text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                The Winner
              </span>
            </div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-6">Option 03</p>
            <h3 className="text-[18px] font-semibold text-slate-900 mb-3 tracking-tight">Drag-and-drop</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed font-light">
              Visual canvas where nodes represent intents, actions, and conditions. Non-technical operators build and edit complex flows without any developer involvement.
            </p>
            <span className="inline-block mt-8 text-[10px] font-bold tracking-widest text-blue-500 uppercase px-3 py-1 bg-blue-50 rounded-full">
              Visual Canvas
            </span>
          </div>

        </div>
      </motion.section>

      {/* ── Section 5: The Visual Flow Builder ────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32 border-t border-gray-100"
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-500 uppercase mb-6">
          The Solution V1.0
        </p>
        <h2 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.025em] text-slate-900 mb-14 max-w-3xl">
          The Visual Flow Builder
        </h2>

        {/* Hero image */}
        <div className="w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/60 relative mb-20">
          <Image src="/images/flow-builder.png" alt="Visual Flow Builder" fill className="object-cover" />
        </div>

        {/* Core Features — 3-col text grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            {
              label: "Infinite Canvas",
              desc: "Pan and zoom across any conversation scale — from a single FAQ node to a 200-branch enterprise routing tree — without losing context or clarity.",
            },
            {
              label: "Node Editor",
              desc: "Click any node to configure its intent triggers, response variants, fallback paths, and API webhooks from a single focused side-panel.",
            },
            {
              label: "Live Simulation",
              desc: "Run a conversation in real-time directly on the canvas. Watch each node light up as the bot traverses the flow, surfacing logic gaps instantly.",
            },
          ].map(({ label, desc }) => (
            <div key={label}>
              <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">{label}</p>
              <p className="text-[14px] text-slate-500 leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Section 6: Evolution Timeline ─────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32 border-t border-gray-100"
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-500 uppercase text-center mb-20">
          Evolution Timeline
        </p>

        <div className="relative flex items-start justify-between gap-0">
          {/* Connecting line */}
          <div className="absolute top-[7px] left-[10%] right-[10%] h-px bg-gray-200" />

          {[
            {
              title: "MVP Launch",
              desc: "Core canvas, 40+ intent node types, and one-click deploy shipped to pilot markets across SEA.",
            },
            {
              title: "Expansion",
              desc: "Multi-language support, A/B flow testing, and bulk template publishing rolled out to LATAM.",
            },
            {
              title: "Enterprise",
              desc: "Role-based permissions, audit logs, API integrations, and custom variable management for Tier-1 brands.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center flex-1 px-6 relative z-10">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white shadow-sm mb-6" />
              <p className="text-[15px] font-semibold text-slate-900 mb-3 tracking-tight">{title}</p>
              <p className="text-[13px] text-slate-400 leading-relaxed font-light max-w-[200px]">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Section 7: Impact & Scale ──────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32 border-t border-gray-100"
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-500 uppercase text-center mb-10">
          Impact &amp; Scale
        </p>

        <div className="text-center mb-6">
          <span className="font-serif text-[clamp(5rem,14vw,10rem)] leading-none text-slate-900 font-normal tracking-tight">
            300+
          </span>
        </div>
        <p className="text-center text-[16px] text-slate-500 font-light mb-24">
          Unique Components Developed Across 12 Markets
        </p>

        {/* Version metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { version: "Version 1.0",     count: "40+",  label: "Functions" },
            { version: "Version 1.1–1.2", count: "20+",  label: "Functions" },
            { version: "Version 1.3–1.4", count: "20+",  label: "Functions" },
            { version: "Version 1.5–1.6", count: "10+",  label: "Functions" },
          ].map(({ version, count, label }) => (
            <div key={version} className="bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100 flex flex-col gap-3">
              <p className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase">{version}</p>
              <span className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none text-slate-900 font-normal">{count}</span>
              <p className="text-[12px] text-slate-400 font-light">{label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Hitting the Performance Wall ───────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="bg-[#4A90E2] rounded-[2.5rem] p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-200 uppercase mb-6">
              Problem Deep Dive
            </p>
            <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white mb-8">
              Hitting the Performance Wall
            </h2>
            <p className="text-[15px] text-blue-100 leading-relaxed font-light max-w-lg">
              As the platform scaled across Southeast Asia and Latin America, the underlying architecture began to buckle. Deployment cycles stretched to weeks, regional teams lost autonomy, and engineering became the bottleneck for every content change.
            </p>
          </div>

          {/* Right — translucent card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-blue-200 uppercase mb-6">
              The Bottleneck
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Every chatbot update required a full engineering sprint to deploy",
                "Regional ops teams had zero self-serve capability for content changes",
                "No sandbox environment — all QA happened against production bots",
                "Rollback required a full re-deploy rather than a simple config revert",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-[13px] text-blue-100 leading-relaxed font-light">
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── Target Audience ────────────────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24 bg-slate-50"
      >
        <p className="text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase mb-5">
          Core Users
        </p>
        <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.12] tracking-[-0.02em] text-slate-900 mb-5 max-w-xl">
          Target Audience
        </h2>
        <p className="text-[15px] text-slate-500 leading-relaxed font-light max-w-2xl mb-16">
          Three distinct personas drive every design decision — from the builder canvas to the granularity of the analytics dashboard.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-[3px] border-slate-100 p-1">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden relative">
                  <Image src="/images/persona-1.png" alt="Junior" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-3 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10">
                JUNIOR
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-10">CS Representatives</h3>
            <p className="text-sm text-slate-500 mt-2">Front-line Support Team</p>

            <div className="w-full text-left bg-slate-50 border-l-[3px] border-slate-300 rounded-r-xl p-5 mt-8 min-h-[120px]">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <span className="text-[11px] font-bold tracking-widest uppercase">PAIN POINT</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-relaxed">"1,000+ paths shown on the same page, hard to find issue node."</p>
            </div>

            <div className="w-full text-left mt-8">
              <div className="flex items-center gap-2 mb-3 text-[#E85D22]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span className="text-[11px] font-bold tracking-widest uppercase">EXPECTATION</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-relaxed">Easy-to-use, intuitive interface that focuses on navigation clarity.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-[3px] border-slate-100 p-1">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden relative">
                  <Image src="/images/persona-2.png" alt="Advanced" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-3 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10">
                ADVANCED
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-10">CS Representatives</h3>
            <p className="text-sm text-slate-500 mt-2">Tier 2 Resolution Team</p>

            <div className="w-full text-left bg-slate-50 border-l-[3px] border-slate-300 rounded-r-xl p-5 mt-8 min-h-[120px]">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 19h16v2H4v-2zm2-4h3v4H6v-4zm5-7h3v11h-3V8zm5 3h3v8h-3v-8z"></path></svg>
                <span className="text-[11px] font-bold tracking-widest uppercase">PAIN POINT</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-relaxed">"Users rely on node metrics but can't use them well due to layout."</p>
            </div>

            <div className="w-full text-left mt-8">
              <div className="flex items-center gap-2 mb-3 text-[#E85D22]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                <span className="text-[11px] font-bold tracking-widest uppercase">EXPECTATION</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-relaxed">Visualize and analyze metrics systematically for data-driven fixes.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-[3px] border-slate-100 p-1">
                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden relative">
                  <Image src="/images/persona-3.png" alt="Specialist" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-3 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10">
                SPECIALIST
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-10">Technical Support</h3>
            <p className="text-sm text-slate-500 mt-2">Root Cause Engineering</p>

            <div className="w-full text-left bg-slate-50 border-l-[3px] border-slate-300 rounded-r-xl p-5 mt-8 min-h-[120px]">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                <span className="text-[11px] font-bold tracking-widest uppercase">PAIN POINT</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-relaxed">"Hard to trace related nodes from a target node in deep stacks."</p>
            </div>

            <div className="w-full text-left mt-8">
              <div className="flex items-center gap-2 mb-3 text-[#E85D22]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                <span className="text-[11px] font-bold tracking-widest uppercase">EXPECTATION</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-relaxed">Filter key information to isolate and analyze dependencies.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Diagnostic Framework ───────────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24"
      >
        <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-5">
          Framework
        </p>
        <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.12] tracking-[-0.02em] text-slate-900 mb-16 max-w-xl">
          Diagnostic Framework
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              color: "bg-red-400",
              title: "Deployment Friction Audit",
              points: [
                "Tracked every step between a content change request and production availability",
                "Found an average of 9 manual handoffs per release cycle",
                "Mapped stakeholder dependencies causing 3–5 day approval queues",
              ],
            },
            {
              color: "bg-orange-400",
              title: "Regional Autonomy Gaps",
              points: [
                "Surveyed 8 regional ops leads across SEA and LATAM markets",
                "Only 2 of 8 teams could self-serve any content update independently",
                "Identified 23 recurring ticket types requiring central engineering",
              ],
            },
            {
              color: "bg-amber-400",
              title: "Builder UX Heuristics",
              points: [
                "Ran heuristic evaluation of the legacy JSON-based config tool",
                "Identified 14 critical usability violations across 5 severity levels",
                "Benchmarked against best-in-class no-code workflow builders",
              ],
            },
          ].map(({ color, title, points }) => (
            <div key={title} className="bg-white shadow-sm border border-gray-100 rounded-[2rem] p-8 flex flex-col gap-6">
              <div className={`w-8 h-8 rounded-lg ${color}`} />
              <p className="text-[15px] font-semibold text-slate-900 tracking-tight">{title}</p>
              <ul className="flex flex-col gap-3">
                {points.map((pt) => (
                  <li key={pt} className="flex gap-3 items-start text-[12.5px] text-slate-500 font-light leading-relaxed">
                    <span className="mt-[5px] w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── The Solution Strategy ──────────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="bg-[#18181B] rounded-[2.5rem] p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
              Solution Strategy
            </p>
            <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white mb-8">
              The Solution Strategy
            </h2>
            <p className="text-[15px] text-gray-400 leading-relaxed font-light max-w-lg">
              A two-layer response: replace the JSON config tool with a visual node-based canvas, and introduce a localisation layer that gives regional teams full content autonomy — without touching the core conversation engine.
            </p>
          </div>

          {/* Right — two dark cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#27272A] border border-gray-700 p-6 rounded-xl flex gap-5 items-start">
              <div className="shrink-0 flex flex-col gap-1.5 pt-1">
                <div className="w-8 h-2 rounded-full bg-orange-400" />
                <div className="w-5 h-2 rounded-full bg-orange-300/50" />
                <div className="w-6 h-2 rounded-full bg-orange-200/30" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white mb-2 tracking-tight">Visual Node Canvas</p>
                <p className="text-[12px] text-gray-400 leading-relaxed font-light">
                  Replace the JSON builder with a drag-and-drop flow editor. Merchants map intents, responses, and escalation paths visually — no engineering required.
                </p>
              </div>
            </div>

            <div className="bg-[#27272A] border border-gray-700 p-6 rounded-xl flex gap-5 items-start">
              <div className="shrink-0 grid grid-cols-2 gap-1 pt-1">
                <div className="w-3 h-3 rounded bg-orange-400" />
                <div className="w-3 h-3 rounded bg-orange-300/50" />
                <div className="w-3 h-3 rounded bg-orange-200/30" />
                <div className="w-3 h-3 rounded bg-orange-400/70" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white mb-2 tracking-tight">Regional Localisation Layer</p>
                <p className="text-[12px] text-gray-400 leading-relaxed font-light">
                  A self-serve config interface that translates UI actions into versioned locale overrides — giving local ops full autonomy while preserving central audit and governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Design for Every Skill Level ──────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32"
      >
        {/* Centered heading */}
        <div className="text-center mb-24">
          <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-5">
            Flow Builder
          </p>
          <h2 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.025em] text-slate-900 max-w-2xl mx-auto">
            Design for Every Skill Level
          </h2>
        </div>

        {/* Showcases */}
        <div className="flex flex-col gap-24">
          {[
            {
              label: "Easy",
              title: "Contextual Hinting",
              desc: "Inline suggestions guide first-time merchants through flow construction — surfacing the right node type at each decision point so they never face a blank canvas.",
              src: "/images/skill-level-1.png",
            },
            {
              label: "Medium",
              title: "Scalable Logic",
              desc: "Conditional branching, variable interpolation, and reusable sub-flows let growing teams build robust multi-language bots without writing a single line of code.",
              src: "/images/skill-level-2.png",
            },
            {
              label: "Hard",
              title: "Advanced Auditing",
              desc: "Version history, diff views, and per-node performance breakdowns give power users full visibility into how a flow has changed and exactly where drop-offs occur.",
              src: "/images/skill-level-3.png",
            },
          ].map(({ label, title, desc, src }) => (
            <div key={title}>
              <div className="w-full rounded-[2rem] overflow-hidden shadow-lg bg-gray-100 flex mb-10">
                <Image src={src} alt={title} width={1600} height={1200} className="w-full h-auto block" />
              </div>
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-3">{label}</p>
                <h3 className="font-serif font-normal text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] tracking-[-0.02em] text-slate-900 mb-4">
                  {title}
                </h3>
                <p className="text-[15px] text-slate-500 leading-relaxed font-light">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Before & After + Final Impact (dark block) ─────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full bg-[#18181B] text-white"
      >
        {/* Before & After */}
        <div className="px-6 md:px-12 lg:px-20 py-32">
          <div className="text-center mb-20">
            <p className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-5">
              Reducing Cognitive Load
            </p>
            <h2 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.025em] text-white">
              Before &amp; After
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl mx-auto mt-16">
  {/* Before Card */}
  <div className="flex flex-col gap-5">
    <div className="w-full rounded-2xl overflow-hidden bg-white shadow-2xl flex">
      <Image src="/images/shopee-before.png" alt="Old Way" width={1600} height={1200} className="w-full h-auto block" />
    </div>
    <p className="text-sm text-gray-400 text-center font-light">
      Old Way: Engineering-heavy flows and manual JSON configurations.
    </p>
  </div>

  {/* After Card */}
  <div className="flex flex-col gap-5">
    <div className="w-full rounded-2xl overflow-hidden bg-white shadow-2xl flex">
      <Image src="/images/shopee-after.png" alt="New Way" width={1600} height={1200} className="w-full h-auto block" />
    </div>
    <p className="text-sm text-gray-400 text-center font-light">
      New Way: Visual logic builder empowering local operators.
    </p>
  </div>
</div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* Final Impact */}
        <div className="px-6 md:px-12 lg:px-20 py-32">
          <div className="text-center mb-20">
            <p className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase mb-5">
              The Business Impact
            </p>
            <h2 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.025em] text-white mb-5">
              Final Impact
            </h2>
            <p className="text-[15px] text-gray-500 font-light">
              Quantifying Operational Efficiency at Shopee
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { stat: "+20%", label: "CSAT Increase" },
              { stat: "$3M",  label: "Annual Cost Savings" },
              { stat: "2wks", label: "Deployment Time" },
              { stat: "100%", label: "Market Adoption" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <span className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none text-orange-400 block mb-4">
                  {stat}
                </span>
                <p className="text-[10px] font-bold tracking-[0.18em] text-gray-500 uppercase">{label}</p>
              </div>
            ))}
          </div>

          {/* Blockquote */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-serif text-[4rem] leading-none text-orange-400/60 block mb-2">&ldquo;</span>
            <blockquote className="font-serif italic text-[clamp(1.1rem,2vw,1.4rem)] leading-relaxed text-gray-300">
              The platform transformed our operational bottleneck into a competitive advantage.
            </blockquote>
          </div>
        </div>
      </motion.section>

      {/* ── Reflection ─────────────────────────────────────────────────────── */}
      <motion.section
        {...scrollFadeUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32 bg-slate-50"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-6">
            Reflection
          </p>
          <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.12] tracking-[-0.02em] text-slate-900 mb-12">
            Technical Debt &amp; Operational Culture
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
            The most significant challenge wasn't the design itself — it was convincing stakeholders that the bottleneck was cultural, not purely technical. Regional teams had adapted their entire workflow around the constraints of the old system. Introducing self-serve tooling required as much change management as it did interface design.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            If I were to revisit this project, I'd invest more time upfront in co-design sessions with local ops leads across different markets. Their institutional knowledge of edge cases and regional nuances would have accelerated several design decisions that we arrived at only through iterative testing post-launch.
          </p>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
