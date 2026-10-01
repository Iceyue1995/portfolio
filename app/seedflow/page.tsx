"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ── Animation helpers ─────────────────────────────────────────────────────────
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

// ── Data ──────────────────────────────────────────────────────────────────────
const metadata = [
  { label: "ROLE",     value: "Product Builder" },
  { label: "TYPE",     value: "Creator Tool" },
  { label: "PLATFORM", value: "Mobile Web / App" },
  { label: "STATUS",   value: "Active Development" },
];

const steps = [
  {
    icon: "/images/sf-icon-understand.svg",
    title: "1. Understand",
    desc: "Account analysis to identify the creator's unique style, tone, and audience positioning.",
  },
  {
    icon: "/images/sf-icon-create.svg",
    title: "2. Create",
    desc: "Upload raw images and assets to receive a personalized post package with copy and tag suggestions.",
  },
  {
    icon: "/images/sf-icon-support.svg",
    title: "3. Support",
    desc: "Final checklist and copy-paste functionality to streamline the publishing process on Xiaohongshu.",
  },
];

const coreFlow = [
  {
    icon: "/images/sf-icon-account.svg",
    title: "Account Logic",
    desc: "Fetches historical data to maintain brand consistency.",
    active: false,
  },
  {
    icon: "/images/sf-icon-visual.svg",
    title: "Visual Matching",
    desc: "Recommends post topics based on the visual quality of uploaded assets.",
    active: false,
  },
  {
    icon: "/images/sf-icon-publish.svg",
    title: "Publishing Readiness",
    desc: "Generates formatted titles, body text, and relevant hashtags.",
    active: true,
  },
];

const decisions = [
  {
    title: "Personalisation before generation",
    desc: "We realized that the value isn't in 'generating a post', but in 'generating your post'. Analysis happens first.",
  },
  {
    title: "Confidence, not full automation",
    desc: "The AI provides suggestions and scores (like '91% match') to build creator confidence rather than replacing their judgment.",
  },
  {
    title: "One complete MVP journey",
    desc: "Focusing on the end-to-end path from raw image to clipboard-ready text to ensure immediate utility for the creator.",
  },
];

// ── Phase 02 data ─────────────────────────────────────────────────────────────
const phase2Research = [
  "User conversations",
  "52 business accounts analysed",
  "Public account and content patterns",
  "Manual validation with real business cases",
];

const phase2Decisions = [
  {
    title: "Diagnose before generating",
    desc: "Identify missing profile, booking, and business information before creating content.",
  },
  {
    title: "Different strategies for different account states",
    desc: "Existing-account revival and 0→1 account launch follow different content logic and trust-building paths.",
  },
  {
    title: "Finished content, not just ideas",
    desc: "Each output includes full copy, hashtags, shooting guidance, and the reasoning behind the recommendation.",
  },
];

const notBuilt = [
  "No auto-publishing",
  "No image / video generation",
  "No multi-account collaboration",
  "No full subscription infrastructure",
];

const successSignals = [
  {
    title: "Willingness to pay",
    desc: "Would small-business owners pay, even at a low trial price?",
  },
  {
    title: "Publishing completion",
    desc: "Would users actually publish the generated content?",
  },
  {
    title: "Repeat usage",
    desc: "Would they come back for another batch?",
  },
];

// Research snapshot data
const researchInputs = [
  "User conversations",
  "Public account & content patterns",
  "Manual business-case validation",
];

const recurringFrictions = [
  "Incomplete account structure",
  "Topic exhaustion",
  "Weak content format",
];

// Final product screenshot crop, absolutely positioned inside a frame (percent-based)
function Shot({
  src, w, h, alt, style,
}: { src: string; w: number; h: number; alt: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute overflow-hidden rounded-2xl border border-[rgba(207,196,197,0.5)] bg-white shadow-[0px_6px_20px_-10px_rgba(0,0,0,0.12)]"
      style={style}
    >
      <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 30vw, 90vw" className="w-full h-auto block" />
    </div>
  );
}

const frameClass =
  "relative w-full rounded-[32px] border border-[rgba(207,196,197,0.3)] bg-[#fcf9f4] overflow-hidden";

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SeedFlowPage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-white text-[#101e18] overflow-x-hidden`}>
      <Header />

      {/* Outer container — matches Figma Main gap-[64px] */}
      <div className="flex flex-col gap-16 px-6 md:px-12 lg:px-20 py-14">

        {/* ── Hero + Metadata ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">

          {/* Hero Section — Figma: h-832px, py-100px, gap-64px */}
          <motion.div
            className="flex flex-col md:flex-row gap-16 items-center"
            style={{ paddingTop: 'clamp(40px, 8vw, 100px)', paddingBottom: 'clamp(40px, 8vw, 100px)', minHeight: 'clamp(500px, 65vw, 832px)' }}
          >
            {/* Left */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">
              <motion.div {...fadeUp(0)}>
                <div className="inline-flex items-center gap-3 border border-[rgba(207,196,197,0.3)] px-4 py-2 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#848484] shrink-0" />
                  <span className="text-[#4c4546] text-[12px] font-medium tracking-[0.1em] uppercase whitespace-nowrap">
                    FEATURED CASE STUDY
                  </span>
                </div>
              </motion.div>

              <motion.h1
                {...fadeUp(0.1)}
                className="text-[clamp(3rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-[#101e18]"
              >
                SeedFlow
              </motion.h1>

              <motion.p
                {...fadeUp(0.2)}
                className="text-[18px] font-normal leading-[1.6] text-[#4c4546] max-w-[403px]"
              >
                SeedFlow bridges the gap between raw creative assets and viral social content
                by understanding the creator&rsquo;s unique DNA.
              </motion.p>

              <motion.div {...fadeUp(0.3)}>
                <a
                  href="https://seedflow-live-test.yuwen1.chatgpt.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white text-[14px] font-semibold tracking-[0.05em] h-[56px] px-10 rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                >
                  View MVP Demo
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/sf-icon-arrow.svg" alt="" className="w-3 h-3" />
                </a>
              </motion.div>
            </div>

            {/* Right — Phone mockup stack */}
            <motion.div
              {...fadeUp(0.15)}
              className="flex-1 flex items-center justify-center min-w-0"
            >
              {/* 448×600 container matching Figma */}
              <div className="relative w-full max-w-[448px] h-[600px]">

                {/* Back-left phone: -6deg, opacity-25 (lighter than front) */}
                <div
                  className="absolute -rotate-6 opacity-25"
                  style={{ left: "-1px", top: "3px", width: "339px", height: "606px", zIndex: 1 }}
                >
                  <div className="w-[260px] h-[540px] bg-black border-[7px] border-black rounded-[36px] overflow-hidden shadow-[0px_12px_32px_-8px_rgba(0,0,0,0.15)] relative">
                    <Image src="/images/seedflow-welcome.png" alt="" fill className="object-cover" sizes="260px" />
                  </div>
                </div>

                {/* Back-right phone: +6deg, opacity-25 */}
                <div
                  className="absolute rotate-6 opacity-25"
                  style={{ left: "130px", top: "3px", width: "339px", height: "606px", zIndex: 1 }}
                >
                  <div className="w-[260px] h-[540px] bg-black border-[7px] border-black rounded-[36px] overflow-hidden shadow-[0px_12px_32px_-8px_rgba(0,0,0,0.15)] relative">
                    <Image src="/images/seedflow-welcome.png" alt="" fill className="object-cover" sizes="260px" />
                  </div>
                </div>

                {/* Front center phone: pink screen fills edge-to-edge inside frame */}
                <div
                  className="absolute scale-105"
                  style={{ left: "66.5px", top: "-25.5px", width: "315px", height: "651px", zIndex: 2 }}
                >
                  <div className="w-[300px] h-[620px] bg-black border-[12px] border-black rounded-[48px] overflow-hidden shadow-[0px_20px_48px_-12px_rgba(0,0,0,0.18)] relative">
                    {/* Screen fills full inner area — no padding, inner radius = outer(48) - border(12) = 36px */}
                    <div className="relative w-full h-full rounded-[36px] overflow-hidden">
                      <Image
                        src="/images/seedflow-welcome.png"
                        alt="SeedFlow welcome screen — Let your assets grow into content"
                        fill
                        className="object-cover"
                        sizes="276px"
                        priority
                      />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

          {/* Metadata row — border-t matching Figma HorizontalBorder */}
          <motion.div
            {...fadeUp(0.4)}
            className="border-t border-[rgba(207,196,197,0.3)] pt-8 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8"
          >
            {metadata.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <p className="text-[#7e7576] text-[12px] font-medium tracking-[0.05em] uppercase">
                  {label}
                </p>
                <p className="text-[#101e18] text-[16px] font-normal leading-[24px]">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Section 1: The Problem ────────────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="flex flex-col gap-8 pt-16">
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            Creating consistently is harder than generating text
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              The primary barrier for creators isn&rsquo;t a lack of tools, but a lack of clarity. Creators constantly
              struggle with three core questions:{" "}
              <strong className="font-bold">&ldquo;What should I post?&rdquo;</strong>,{" "}
              <strong className="font-bold">&ldquo;How do I express this in my own voice?&rdquo;</strong>
              , and{" "}
              <strong className="font-bold">&ldquo;What actually works on Xiaohongshu?&rdquo;</strong>
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              Generic AI models often fail here. They produce generic, sterile copy that lacks the specific
              &lsquo;vibe&rsquo; and visual language required to resonate with a niche audience. They don&rsquo;t
              understand the context of an individual&rsquo;s account history or their unique aesthetic positioning.
            </p>
          </div>
        </motion.section>

        {/* ── Section 2: Product Experience ────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="flex flex-col gap-8 pt-16">
          {/* Centred heading */}
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] text-center">
            From account understanding to a publish-ready post
          </h2>

          {/* 3-step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(207,196,197,0.2)] rounded-2xl overflow-hidden">
            {steps.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`flex flex-col gap-4 p-8 md:p-10 ${i < 2 ? "md:border-r border-[rgba(207,196,197,0.2)]" : ""} ${i > 0 ? "border-t md:border-t-0 border-[rgba(207,196,197,0.2)]" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="" className="w-[18px] h-[18px]" />
                </div>
                <h3 className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">{title}</h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Core flow */}
          <div className="flex flex-col gap-8 max-w-[672px] pt-8">
            {/* THE CORE FLOW label */}
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sf-icon-coreflow.svg" alt="" className="w-5 h-5" />
              <span className="text-[14px] font-bold tracking-[0.1em] uppercase text-[#101e18]">
                THE CORE FLOW
              </span>
            </div>

            <h3 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
              A personalized bridge to content
            </h3>

            {/* Bullet items with connector */}
            <div className="flex flex-col gap-4 relative">
              {/* Connector lines */}
              <div className="absolute left-[23px] top-[48px] h-[34px] w-[2px] bg-[rgba(207,196,197,0.3)]" />
              <div className="absolute left-[23px] top-[131px] h-[34px] w-[2px] bg-[rgba(207,196,197,0.3)]" />

              {coreFlow.map(({ icon, title, desc, active }) => (
                <div key={title} className="flex gap-4 items-start relative z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      active
                        ? "bg-black shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                        : "border border-[rgba(207,196,197,0.5)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-white"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" className="w-5 h-5" />
                  </div>
                  <div className="pt-2 flex flex-col gap-1">
                    <p className="text-[18px] font-bold text-[#101e18] leading-[1.6]">{title}</p>
                    <p className="text-[16px] font-normal text-[#4c4546] leading-[1.625]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Section 3: Key Product Decisions ─────────────────────────────── */}
        <motion.section
          {...scrollFadeUp}
          className="flex flex-col gap-8 border-t border-b border-[rgba(207,196,197,0.3)] py-16"
        >
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            Key Product Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {decisions.map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <h3 className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">{title}</h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546]">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 4: Current Status ─────────────────────────────────────── */}
        <motion.section {...scrollFadeUp}>
          <div className="bg-[#fcf9f4] rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
            {/* Left */}
            <div className="flex-1 flex flex-col gap-2">
              {/* PHASE 01 badge */}
              <div className="self-start bg-black text-white text-[12px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-2">
                PHASE 01
              </div>
              <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] mt-2">
                Building and validating the first release
              </h2>
              <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546] max-w-[576px] mt-2">
                SeedFlow is an independent product currently in active development. We are validating
                core workflows with real creators to refine the account-matching algorithm and visual
                analysis engine.
              </p>
            </div>

            {/* Right — frosted circle with leaf */}
            <div className="shrink-0 w-[178px] h-[178px] rounded-full bg-[rgba(255,255,255,0.5)] border border-white backdrop-blur-[2px] flex items-center justify-center">
              <div className="relative w-[45px] h-[45px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/sf-icon-leaf.svg" alt="SeedFlow" className="w-full h-full" />
                <div className="absolute inset-[12.5%] rounded-full bg-[rgba(0,0,0,0.05)]" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Phase 02 · 1: What changed after validation ───────────────────── */}
        <motion.section {...scrollFadeUp} className="flex flex-col gap-8 pt-16">
          <div className="flex flex-col gap-2">
            <div className="self-start bg-black text-white text-[12px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-2">
              PHASE 02
            </div>
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] mt-2">
              What changed after validation
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-[672px]">
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              The first release showed that content generation was only part of the problem.
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              Through user feedback, account analysis, and observation of Xiaohongshu small-business accounts,
              I found a broader challenge: many owners struggled to publish consistently, present their business
              clearly, and turn content into something that could support business outcomes.
            </p>
          </div>
          <div className="border-t border-[rgba(207,196,197,0.3)] pt-8 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
            {phase2Research.map((item) => (
              <p key={item} className="text-[#101e18] text-[16px] font-normal leading-[24px]">{item}</p>
            ))}
          </div>
        </motion.section>

        {/* ── Research Snapshot ─────────────────────────────────────────────── */}
        <motion.section {...scrollFadeUp}>
          <div className="bg-[#fcf9f4] rounded-[32px] p-6 md:p-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#848484] shrink-0" />
              <p className="text-[#4c4546] text-[12px] font-medium tracking-[0.1em] uppercase">
                RESEARCH SNAPSHOT
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0">
              {/* Left — main metric */}
              <div className="md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-start md:justify-center gap-4 md:gap-2 md:pr-8">
                <p className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.06em] text-[#101e18]">
                  52
                </p>
                <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546] max-w-[220px]">
                  Xiaohongshu business accounts analysed
                </p>
              </div>

              {/* Right — inputs + frictions */}
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:border-l border-[rgba(207,196,197,0.3)] md:pl-8">
                {/* Research inputs */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#101e18]">
                    Research inputs
                  </h3>
                  <div className="flex flex-col border-t border-[rgba(207,196,197,0.3)]">
                    {researchInputs.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 py-3 border-b border-[rgba(207,196,197,0.3)]"
                      >
                        <span className="w-[6px] h-[6px] rounded-full bg-[#848484] shrink-0 mt-[9px]" />
                        <p className="text-[15px] font-normal leading-[1.5] text-[#101e18]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recurring frictions */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#101e18]">
                    Recurring frictions
                  </h3>
                  <div className="flex flex-col border-t border-[rgba(207,196,197,0.3)]">
                    {recurringFrictions.map((item, i) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 py-3 border-b border-[rgba(207,196,197,0.3)]"
                      >
                        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[11px] font-semibold">
                          {i + 1}
                        </span>
                        <p className="text-[15px] font-normal leading-[1.5] text-[#101e18] pt-[1px]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion strip */}
            <div className="bg-[rgba(255,255,255,0.5)] border border-white rounded-2xl px-5 py-4 flex items-center gap-5">
              {/* Abstract synthesis schematic: several generic cards → one refined card */}
              <div aria-hidden="true" className="hidden sm:flex items-center gap-2 shrink-0">
                <div className="relative w-[36px] h-[28px]">
                  <div className="absolute left-0 top-0 w-[22px] h-[16px] rounded-[5px] border border-[rgba(207,196,197,0.5)] bg-white" />
                  <div className="absolute left-[7px] top-[6px] w-[22px] h-[16px] rounded-[5px] border border-[rgba(207,196,197,0.5)] bg-white" />
                  <div className="absolute left-[14px] top-[12px] w-[22px] h-[16px] rounded-[5px] border border-[rgba(207,196,197,0.5)] bg-white" />
                </div>
                <div className="w-4 h-[2px] bg-[rgba(207,196,197,0.8)]" />
                <div className="w-[28px] h-[28px] rounded-lg bg-black flex flex-col items-center justify-center gap-[3px]">
                  <span className="w-[12px] h-[2px] rounded-full bg-white" />
                  <span className="w-[8px] h-[2px] rounded-full bg-white/60" />
                </div>
              </div>
              <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546]">
                These patterns informed the shift from a creator-focused content assistant to a small-business
                growth workflow.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Phase 02 · 2: Reframing SeedFlow ──────────────────────────────── */}
        <motion.section
          {...scrollFadeUp}
          className="flex flex-col md:flex-row gap-12 md:gap-16 items-center pt-16"
        >
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
              From content assistant to growth workflow
            </h2>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546] max-w-[576px]">
              SeedFlow evolved into an AI-assisted workflow for Xiaohongshu small businesses:
            </p>
            <p className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">
              Diagnose → Generate → Publish
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546] max-w-[576px]">
              The final MVP focused on identifying account gaps, generating context-aware content, and helping
              owners move from recommendation to actual publishing.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0">
            <div className={`${frameClass} aspect-[4/5]`}>
              <Image src="/images/sf6-flow.webp" width={1600} height={2000}
                alt="Diagnose, generate, publish: the SeedFlow workflow"
                sizes="(min-width: 768px) 40vw, 90vw" className="w-full h-auto block" />
            </div>
            <p className="mt-3 text-[12px] font-normal leading-[1.5] text-[#7e7576]">
              Final MVP interface — designed for Xiaohongshu small-business users.
            </p>
          </div>
        </motion.section>

        {/* ── Phase 02 · 3: Key Product Decisions ───────────────────────────── */}
        <motion.section
          {...scrollFadeUp}
          className="flex flex-col gap-8 border-t border-b border-[rgba(207,196,197,0.3)] py-16"
        >
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            Phase 02 decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {phase2Decisions.map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <h3 className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">{title}</h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546]">{desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Diagnose before generating */}
            <div className={`${frameClass} aspect-[3/4]`}>
              <Shot src="/images/sf4-diagnosis-top.webp" w={780} h={1205} alt="Final MVP: homepage diagnosis and screenshot upload"
                style={{ left: "14%", top: "5%", width: "72%" }} />
            </div>
            {/* Different strategies for different account states */}
            <div className={`${frameClass} aspect-[3/4]`}>
              <Shot src="/images/sf4-state-full.webp" w={776} h={1274} alt="Final MVP: choose between reviving an existing account and launching a new one"
                style={{ left: "14%", top: "5%", width: "72%" }} />
            </div>
            {/* Finished content, not just ideas */}
            <div className={`${frameClass} aspect-[3/4]`}>
              <Shot src="/images/sf2-output-card.webp" w={684} h={1160} alt="Final MVP: finished post with title, copy and hashtags"
                style={{ left: "14%", top: "5%", width: "72%" }} />
            </div>
          </div>
        </motion.section>

        {/* ── Phase 02 · 4: MVP scope ───────────────────────────────────────── */}
        <motion.section {...scrollFadeUp}>
          <div className="bg-[#fcf9f4] rounded-[32px] p-10 md:p-16 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="self-start bg-black text-white text-[12px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-2">
                MVP SCOPE
              </div>
              <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] mt-2">
                What I deliberately did not build
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[rgba(207,196,197,0.3)]">
              {notBuilt.map((item) => (
                <p
                  key={item}
                  className="text-[18px] font-semibold leading-[1.6] text-[#101e18] py-5 border-b border-[rgba(207,196,197,0.3)]"
                >
                  {item}
                </p>
              ))}
            </div>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              The MVP was designed to validate behaviour, not feature breadth.
            </p>
          </div>
        </motion.section>

        {/* ── Phase 02 · 5: What success means ──────────────────────────────── */}
        <motion.section
          {...scrollFadeUp}
          className="flex flex-col gap-8 border-t border-b border-[rgba(207,196,197,0.3)] py-16"
        >
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            What success means
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {successSignals.map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <h3 className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">{title}</h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546]">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Phase 02 · 6: Reflection ──────────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="flex flex-col gap-8 pt-8 pb-8">
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            What I learned
          </h2>
          <div className="flex flex-col gap-4 max-w-[672px]">
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              SeedFlow started as a content-generation product. It became stronger when I stopped asking what
              else AI could generate, and started asking what behaviour the product needed to change.
            </p>
            <p className="text-[18px] font-bold leading-[1.6] text-[#101e18]">
              The biggest shift was not visual. It was redefining the product problem.
            </p>
          </div>
        </motion.section>

      </div>

      <Footer />
    </main>
  );
}
