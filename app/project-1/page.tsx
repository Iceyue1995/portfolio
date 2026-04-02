"use client";
import Image from 'next/image';
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

// ── Data ──────────────────────────────────────────────────────────────────────
const metadata = [
  { label: "Role", value: "Product Designer" },
  { label: "Timeline", value: "2024 – 2025" },
  { label: "Project Type", value: "AI & B2B Saas" },
  { label: "Deliverables", value: "End-to-end UX/UI" },
];

const metrics = [
  {
    stat: "+42%",
    description: "Task Completion Increase",
  },
  {
    stat: "<5 min",
    description: "Active users served a at peak launch",
  },
  {
    stat: "73%",
    description: "",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Project1Page() {
  return (
<div className="relative min-h-screen bg-white">
    <Header />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-5xl">
          {/* Overline */}
          <motion.p
            {...fadeUp(0)}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase mb-7"
          >
            Case Study — AI Platform
          </motion.p>

          {/* Main title */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-serif font-normal text-[clamp(2.5rem,5.5vw,4.5rem)]
                       leading-[1.08] tracking-[-0.025em] text-gray-900 mb-8"
          >
            AI Mascot Platform:{" "}
            <span className="text-[#3B82F6] italic">of transformation.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed
                       text-gray-400 font-light max-w-2xl"
          >
            A full end-to-end redesign of an AI-powered commerce platform —
            bridging seller tooling, conversational AI, and intelligent
            automation to serve millions of users across South-East Asia.
          </motion.p>
        </div>
      </section>

      {/* ── Metadata grid ────────────────────────────────────────── */}
      <motion.section
        {...fadeUp(0.3)}
        className="w-full px-6 md:px-12 lg:px-20 pb-20"
      >
        <div className="w-full h-px bg-gray-100 mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {metadata.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10.5px] font-medium tracking-[0.14em] text-gray-400 uppercase mb-2">
                {label}
              </p>
              <p className="text-[14px] font-semibold text-gray-900 tracking-tight">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-gray-100 mt-10" />
      </motion.section>

      {/* ── Metrics cards ─────────────────────────────────────────── */}
      <motion.section
        {...fadeUp(0.4)}
        className="w-full px-6 md:px-12 lg:px-20 pb-28"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map(({ stat, description }) => (
            <div
              key={stat}
              className="rounded-2xl border border-blue-100 bg-blue-50/40
                         px-8 py-8 flex flex-col gap-3"
            >
              <span
                className="font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal
                           leading-none tracking-tight text-[#3B82F6]"
              >
                {stat}
              </span>
              <p className="text-[12.5px] leading-relaxed text-gray-400 font-light max-w-[180px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
   {/* --- The Challenge: Convergence Chasm (100% Design Match) --- */}
   <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-6 md:px-12 lg:px-20 pb-32"
      >
        <div className="mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase block mb-6">THE CHALLENGE</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
            The convergence chasm.
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
            The current landscape is fragmented. Building a custom AI mascot required jumping between Venngage for visuals, Chatbase for logic, and HeyGen for animation. This disjointed workflow created a "chasm" where speed was sacrificed for complexity.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Card: THE OLD WAY */}
          <div className="bg-[#F4F7FA] rounded-[2rem] p-10 md:p-12 border border-slate-100 group">
            <div className="flex items-center gap-3 mb-12">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">THE OLD WAY</span>
            </div>

            <div className="space-y-0">
              <div className="flex justify-between items-center py-6 border-b border-slate-200/60">
                <span className="text-slate-700 font-medium">Fragmented Toolsets</span>
                <span className="px-3 py-1 bg-slate-200/60 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">3+ Apps</span>
              </div>
              <div className="flex justify-between items-center py-6 border-b border-slate-200/60">
                <span className="text-slate-700 font-medium">Development Lifecycle</span>
                <span className="px-3 py-1 bg-slate-200/60 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">4 Weeks</span>
              </div>
              <div className="flex justify-between items-center py-6">
                <span className="text-slate-700 font-medium">Technical Knowledge Requirement</span>
                <span className="px-3 py-1 bg-slate-200/60 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">High</span>
              </div>
            </div>
          </div>

          {/* Right Card: OUR PLATFORM */}
          <div className="bg-white rounded-[2rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-blue-50 relative overflow-hidden group">
            {/* Proprietary Badge */}
            <div className="absolute top-10 right-10">
              <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm">
                PROPRIETARY
              </span>
            </div>

            <div className="flex items-center gap-3 mb-12">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">OUR PLATFORM</span>
            </div>

            <div className="space-y-0">
              <div className="flex justify-between items-center py-6 border-b border-blue-50/60">
                <span className="text-slate-700 font-medium">Unified Ecosystem</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">1 App</span>
              </div>
              <div className="flex justify-between items-center py-6 border-b border-blue-50/60">
                <span className="text-slate-700 font-medium">Instant Generation</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">&lt; 5 Minutes</span>
              </div>
              <div className="flex justify-between items-center py-6">
                <span className="text-slate-700 font-medium">No-Code Intuition</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Zero</span>
              </div>
            </div>
          </div>

        </div>
      </motion.section>
      {/* --- The Trust Problem Section --- */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full py-24 px-6 md:px-12"
      >
        <div className="w-full mx-auto">
          {/* 大圆角容器 */}
          <div className="bg-white rounded-[3rem] md:rounded-[5rem] border border-gray-100 w-full p-16 md:p-28 text-center shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/50 relative overflow-hidden">
            
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-10 tracking-tight">
              The Deeper Trust Problem
            </h3>
            
            <p className="text-3xl md:text-4xl font-serif italic text-slate-500 mb-12 leading-relaxed">
              "Why did the AI say that?"
            </p>
            
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              Trust isn't built on accuracy alone; it's built on predictability. Users felt alienated by the "black box" nature of large language models. Our mission was to peel back the curtain.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Understanding the Ecosystem ───────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="w-full px-6 md:px-12 lg:px-20 pb-32"
      >
        <h2 className="font-serif font-normal text-[clamp(1.5rem,3vw,2.25rem)]
                       leading-[1.15] tracking-[-0.02em] text-gray-900 mb-12">
          Understanding before designing.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Card — LLM Benchmark Analysis */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-10">
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-8">
              LLM Benchmark Analysis
            </p>

            {/* Table */}
            <div className="w-full">
              {/* Header */}
              <div className="grid grid-cols-3 pb-3 border-b border-gray-100 mb-1">
                <span className="text-[10px] font-bold tracking-[0.14em] text-gray-400 uppercase">Model</span>
                <span className="text-[10px] font-bold tracking-[0.14em] text-gray-400 uppercase">Reasoning</span>
                <span className="text-[10px] font-bold tracking-[0.14em] text-gray-400 uppercase">Latency</span>
              </div>

              {/* Row 1 — GPT-4o */}
              <div className="grid grid-cols-3 py-4 border-b border-gray-50 items-center">
                <span className="text-[13.5px] font-medium text-slate-700">GPT-4o</span>
                <span className="text-[13px] text-slate-500 font-light">Exceptional</span>
                <span className="text-[13px] text-slate-500 font-light">Medium</span>
              </div>

              {/* Row 2 — Claude 3.5 Sonnet (highlighted) */}
              <div className="grid grid-cols-3 py-4 border-b border-blue-50 items-center bg-blue-50/50 -mx-2 px-2 rounded-lg">
                <span className="text-[13.5px] font-semibold text-blue-600">Claude 3.5 Sonnet</span>
                <span className="text-[13px] text-blue-500 font-light leading-snug">Superior /<br />Creative</span>
                <span className="text-[13px] text-blue-500 font-light leading-snug">Low<br />(Optimized)</span>
              </div>

              {/* Row 3 — Gemini Pro */}
              <div className="grid grid-cols-3 py-4 items-center">
                <span className="text-[13.5px] font-medium text-slate-700">Gemini Pro</span>
                <span className="text-[13px] text-slate-500 font-light leading-snug">Strong<br />Multi-modal</span>
                <span className="text-[13px] text-slate-500 font-light">Low</span>
              </div>
            </div>
          </div>

          {/* Right Card — The Hybrid Approach Strategy */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-10">
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-8">
              The Hybrid Approach Strategy
            </p>

            {/* Scale diagram */}
            <div className="relative flex items-center justify-between mb-3">
              {/* Fine-tuning side */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold tracking-[0.16em] text-slate-400 uppercase text-center">Fine-Tuning</span>
              </div>

              {/* Connecting line + Hybrid pill */}
              <div className="flex-1 flex items-center justify-center relative mx-4">
                <div className="w-full h-px bg-gradient-to-r from-slate-200 via-blue-300 to-slate-200" />
                <span className="absolute bg-blue-600 text-white text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full shadow-sm shadow-blue-200">
                  Hybrid
                </span>
              </div>

              {/* RAG side */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold tracking-[0.16em] text-slate-400 uppercase text-center">RAG (Retrieval)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[13.5px] text-slate-500 leading-relaxed mt-8 font-light">
              Pure Fine-tuning is rigid. Pure RAG is hallucination-prone. Our{" "}
              <span className="font-semibold text-slate-700">Hybrid Approach</span>{" "}
              uses a base fine-tuned personality model with dynamic RAG for real-time accuracy.
            </p>
          </div>

        </div>
      </motion.section>
      {/* ── Core Strategies ───────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="w-full px-6 md:px-12 lg:px-20 pb-20"
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase mb-7">
          The Solution
        </p>
        <div className="max-w-4xl">
          <h2 className="font-serif font-normal text-[clamp(1.75rem,3.5vw,3rem)]
                         leading-[1.12] tracking-[-0.02em] text-gray-900 mb-6">
            Three strategies,one trust architecture.
          </h2>
          <p className="font-sans text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.85]
                        text-gray-500 font-light max-w-2xl">
                          
          </p>
        </div>
      </motion.section>
      {/* Strategy 01 核心内容插入 */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-20"> {/* 确保内容在灰色数字上方 */}
          
          {/* 1. 插入蓝色胶囊标签 */}
          <div className="inline-block px-3 py-1 bg-[#4A86E8] text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 shadow-sm">
            STRATEGY 01
          </div>
          
          {/* 2. 替换为正确的标题 */}
          <h3 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 mb-6 tracking-tight">
            Four-Layer Transparency System
          </h3>
          
          {/* 3. 替换为正确的文案 */}
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-light">
            A multi-layered architectural approach to demystifying AI logic, from raw ingestion to real-time performance refinement.
          </p>
          
        </div>

      {/* ── UI Showcase 01 — Text left, Image right ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="w-full px-6 md:px-12 lg:px-20 mt-16 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none
                             text-gray-100 font-normal mb-4 select-none">
              01
            </span>
            <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] font-semibold text-gray-900
                           tracking-tight mb-4">
              Knowledge Upload
            </h3>
            <p className="text-[13.5px] leading-relaxed text-gray-500 font-light max-w-sm">
            Ingest raw data with semantic parsing.
            Supports multi-format documentation with instant processing metrics.
            </p>
          </div>
          {/* Step 01 image */}
          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 aspect-[4/3] relative overflow-hidden">
            <Image src="/images/step-1-persona.png" alt="Knowledge Upload" fill className="object-contain p-4" />
          </div>
        </div>
      </motion.div>

      {/* ── UI Showcase 02 — Image left, Text right ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="w-full px-6 md:px-12 lg:px-20 mt-16 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Step 02 image */}
          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 aspect-[4/3] relative overflow-hidden order-2 md:order-1">
            <Image src="/images/step-2-prompt.png" alt="Prompt Tuning" fill className="object-contain p-4" />
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <span className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none
                             text-gray-100 font-normal mb-4 select-none">
              02
            </span>
            <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] font-semibold text-gray-900
                           tracking-tight mb-4">
              Review Structured Knowledge
            </h3>
            <p className="text-[13.5px] leading-relaxed text-gray-500 font-light max-w-sm">
              Introduced an inline explainability panel that surfaces why the
              AI made a recommendation — building trust without disrupting the
              core workflow or adding cognitive load.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── UI Showcase 03 — Text left, Image right ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="w-full px-6 md:px-12 lg:px-20 mt-16 mb-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none
                             text-gray-100 font-normal mb-4 select-none">
              03
            </span>
            <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] font-semibold text-gray-900
                           tracking-tight mb-4">
              Simulation Testing
            </h3>
            <p className="text-[13.5px] leading-relaxed text-gray-500 font-light max-w-sm">
            Run batch simulations across edge cases.Test agent behavior against expected answers in real-time.
            </p>
          </div>
          {/* Step 03 image */}
          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 aspect-[4/3] relative overflow-hidden">
            <Image src="/images/step-3-tools.png" alt="Integrating Tools" fill className="object-contain p-4" />
          </div>
        </div>
      </motion.div>
      {/* ── UI Showcase 04 — Image left, Text right ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
        className="w-full px-6 md:px-12 lg:px-20 mt-16 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Step 04 image */}
          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 aspect-[3/4] relative overflow-hidden order-2 md:order-1">
            <Image src="/images/step-4-health.png" alt="Health Dashboard" fill className="object-contain p-4" />
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center order-1 md:order-2">
            <span className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none
                             text-gray-100 font-normal mb-4 select-none">
              04
            </span>
            <h3 className="text-[clamp(1.1rem,2vw,1.4rem)] font-semibold text-gray-900
                           tracking-tight mb-4">
              Health Dashboard
            </h3>
            <p className="text-[13.5px] leading-relaxed text-gray-500 font-light max-w-sm">
            Identify issues from simulations and refine configuration. A centralized hub for improving agent performance.
            </p>
          </div>
        </div>
      </motion.div>
{/* =========================================
          STRATEGY 02: Dual-Mode Architecture
      ========================================= */}
      <motion.section
        {...fadeInUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="mb-12">
          <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            STRATEGY 02
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            Dual-Mode Architecture
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
            Recognizing that not all users are AI experts, we designed two distinct workspaces. Beginner Mode uses intuitive, natural language prompts, while Pro Studio offers granular control over temperature, top-p sampling, and vector search parameters.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-center">
          {/* Beginner Mode */}
          <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">BEGINNER MODE</h4>
            <p className="text-slate-500 text-sm">Linear & Guided Workflow</p>
          </div>
          {/* Pro Studio */}
          <div className="bg-white rounded-2xl p-10 border border-blue-200 shadow-md shadow-blue-50 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h4 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2">PRO STUDIO</h4>
            <p className="text-slate-500 text-sm">Modular & Non-Linear Control</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="text-[10px] font-bold tracking-widest text-slate-900 uppercase mb-4">COMPARISON OF BEGINNER VS. PRO MODE</div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-slate-800">
                <th className="py-4 pr-6 w-1/4">Feature</th>
                <th className="py-4 pr-6 w-3/8">Beginner Mode (Quick Start)</th>
                <th className="py-4 w-3/8">Pro Mode (Pro Studio)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Workflow</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Linear & Guided</span>A step-by-step wizard (Steps 1-4) designed for speed.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Modular & Non-linear</span>Tab-based navigation allowing deep dives into any section at any time.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Persona & Tone</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Preset-based</span>Choose from 8 fixed archetypes.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Granular Control</span>Uses Tone Sliders (Professionalism, Humor, Empathy).</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Voice Settings</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Standard Presets</span>Selection from a library of pre-recorded AI voices.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Voice Cloning</span>Allows uploading custom audio files to replicate a specific brand voice.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Speech Tech (ASR)</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Automatic</span>System-optimized defaults.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Model Selection</span>Manual choice of ASR engines (Whisper, Deepgram, etc).</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Knowledge Base</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Basic Uploads</span>Supports PDFs, Docs, and URLs.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Advanced System</span>Deep integration with complex knowledge hierarchies.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Relational Logic</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Static Interaction</span>Limited to conversational responses.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Dynamic Integration</span>Includes Tools (API calls) and Guardrails.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-5 pr-6 font-medium text-slate-800">Testing/QA</td>
                <td className="py-5 pr-6 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Basic Simulation</span>High-level accuracy score.</td>
                <td className="py-5 text-slate-500"><span className="font-semibold text-slate-700 block mb-1">Deep Diagnostics</span>Detailed breakdown of performance.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>


      {/* =========================================
          STRATEGY 03: AI Copilot Guidance
      ========================================= */}
      <motion.section
        {...fadeInUp}
        className="w-full px-6 md:px-12 lg:px-20 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div>
          <div className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
            STRATEGY 03
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            AI Copilot Guidance
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed">
            AI is not merely a tool, but an intelligent Copilot embedded throughout the entire user journey. We embrace an AI-native philosophy, deeply integrating AI into the creation workflow rather than treating it as an add-on feature. During the creation process, AI provides real-time guidance and structured suggestions to reduce cognitive load and friction. At the same time, based on the user's initial inputs and contextual signals, AI can intelligently pre-fill and auto-complete content, significantly minimizing manual effort while improving completion efficiency and overall conversion rates.
          </p>
        </div>
        {/* Placeholder for Copilot UI Image */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 aspect-[4/3] relative">
           <video src="/videos/copilot-guidance.mp4" autoPlay loop muted playsInline className="w-full h-full object-contain p-4" />
        </div>
      </motion.section>


      {/* =========================================
          FULL WIDTH DASHBOARD MOCKUP
      ========================================= */}
      <motion.section
        {...fadeInUp}
        className="w-full px-6 md:px-12 lg:px-20 py-12"
      >
        <div className="bg-[#EBF2F9] rounded-[2rem] p-8 md:p-16 aspect-video relative overflow-hidden flex items-center justify-center">
            {/* 这里的图片你需要丢进 public/images/ 里面 */}
            <Image src="/images/dashboard-full.png" alt="Aquamind Dashboard Mockup" fill className="object-contain p-8 md:p-16 drop-shadow-2xl" />
        </div>
      </motion.section>


      {/* =========================================
          PROVEN TRUST IMPACT
      ========================================= */}
      <motion.section
        {...fadeInUp}
        className="w-full px-6 md:px-12 lg:px-20 py-32 flex flex-col md:flex-row justify-between items-center gap-16"
      >
        <div className="max-w-md">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            Proven Trust Impact
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed">
            By prioritizing transparency, we successfully shifted user sentiment from skepticism to creative confidence.
          </p>
        </div>

        <div className="flex items-center gap-6 md:gap-12">
          {/* Before */}
          <div className="text-center">
            <span className="text-6xl md:text-7xl font-serif font-light text-slate-300 block mb-2">35%</span>
            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">BEFORE IMPLEMENTATION</span>
          </div>
          
          {/* Arrow */}
          <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>

          {/* After */}
          <div className="text-center">
            <span className="text-6xl md:text-7xl font-serif font-light text-blue-500 block mb-2">73%</span>
            <span className="text-[9px] font-bold tracking-widest text-blue-500 uppercase">POST-LAUNCH TRUST INDEX</span>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
