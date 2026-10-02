"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
  { label: "TYPE",     value: "AI Growth Tool" },
  { label: "PLATFORM", value: "Mobile Web / App" },
  { label: "TARGET AUDIENCE", value: "SME in Singapore / Thailand" },
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
  "52 Xiaohongshu business accounts analysed",
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

const turningFindings = [
  "AI-generated copy still felt generic.",
  "Image-to-copy generation alone was not a defensible product value.",
];

const realProblemFindings = [
  "Inactive or abandoned accounts",
  "Incomplete business and profile information",
  "Inconsistent publishing",
  "Weak understanding of what content fits their business",
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
      <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 30vw, 90vw" className="h-full w-auto block max-w-none" />
    </div>
  );
}

const frameClass =
  "relative w-full rounded-[32px] border border-[rgba(207,196,197,0.3)] bg-[#fcf9f4] overflow-hidden";

// ── Early product screens: three equal screens, staggered reveal + gentle depth on scroll ──
const earlyScreens = [
  { src: "/images/sf-early-landing.webp", h: 1571, alt: "Early SeedFlow screen: landing page, Let your assets grow into content" },
  { src: "/images/sf-early-upload.webp", h: 1558, alt: "Early SeedFlow screen: upload screenshots so SeedFlow can understand your account" },
  { src: "/images/sf-early-output-v2.webp", h: 1563, alt: "Early SeedFlow screen: Today's best seed is ready, with a recommended topic, match score and Generate Post Package" },
];

function EarlyScreens() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const animate = wide && !reduced;
  const y0 = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const y1 = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const y2 = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const ys = [y0, y1, y2];

  return (
    <div
      ref={ref}
      className="flex gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:justify-center py-6 md:py-10 [scrollbar-width:none]"
    >
      {earlyScreens.map(({ src, h, alt }, i) => (
        <motion.div
          key={src}
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.14 }}
          className={`shrink-0 snap-center w-[62%] md:w-[200px]`}
        >
          <motion.div
            style={{ y: animate ? ys[i] : 0 }}
            className="rounded-[26px] md:rounded-[30px] border border-[rgba(207,196,197,0.5)] bg-[#fcf9f4] overflow-hidden shadow-[0px_16px_40px_-24px_rgba(0,0,0,0.18)]"
          >
            <Image src={src} alt={alt} width={720} height={h} sizes="(min-width: 768px) 200px, 62vw" className="w-full h-auto block" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SeedFlowPage() {
  return (
    <main className={`${manrope.className} min-h-screen bg-white text-[#101e18] overflow-x-hidden`}>
      <Header />

      {/* Outer container — matches Figma Main gap-[64px] */}
      <div className="flex flex-col gap-20 md:gap-32 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* ── Hero + Metadata ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">

          {/* Hero Section — Figma: h-832px, py-100px, gap-64px */}
          <motion.div
            className="flex flex-col md:flex-row gap-16 items-center"
            style={{ paddingTop: 'clamp(24px, 4vw, 56px)', paddingBottom: 'clamp(24px, 4vw, 56px)', minHeight: 'clamp(380px, 44vw, 600px)' }}
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

              <motion.div {...fadeUp(0.2)} className="flex flex-col gap-4 max-w-[480px]">
                <p className="text-[20px] font-semibold leading-[1.4] text-[#101e18]">
                  AI growth workflow for Xiaohongshu small businesses
                </p>
                <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
                  SeedFlow started as an AI content assistant and evolved, through real-world validation, into a
                  focused workflow for diagnosing account gaps, deciding what to publish, and helping small
                  businesses create more actionable content.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.3)}>
                <a
                  href="https://seedflow-live-test.yuwen1.chatgpt.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white text-[14px] font-semibold tracking-[0.05em] h-[56px] px-10 rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                >
                  View Test Version
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
              {/* 448×600 container matching Figma (scaled to fit on mobile) */}
              <div className="relative max-md:w-[340px] max-md:h-[460px] md:max-lg:w-[300px] md:max-lg:h-[400px] lg:contents">
              <div className="relative w-full max-w-[448px] h-[600px] max-lg:absolute max-lg:left-1/2 max-lg:top-0 max-lg:w-[448px] max-lg:-translate-x-1/2 max-lg:origin-top max-md:scale-[0.76] md:max-lg:scale-[0.66]">

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

        {/* ── Section 1: The opportunity ────────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] pb-2">
              The opportunity
            </h2>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              SeedFlow started from an observation: Xiaohongshu was increasingly used beyond China, including by
              users and businesses in Southeast Asia, but language, cultural context, and platform conventions
              created a real barrier to participation.
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              The initial question was:
            </p>
            <p className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">
              &ldquo;How might AI help non-native Xiaohongshu users create content that actually fits the platform?&rdquo;
            </p>
          </div>

          {/* Conceptual diagram — abstract, not data */}
          <div
            role="img"
            aria-label="Conceptual diagram: small-business interest and context passes through friction (language, cultural context, platform conventions) to become Xiaohongshu-ready content"
            className="bg-[#fcf9f4] border border-[rgba(207,196,197,0.3)] rounded-[32px] p-6 md:p-8 lg:col-span-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-4 md:gap-5">
              {/* Left — interest / business context */}
              <div className="flex flex-col gap-3">
                <p className="text-[#4c4546] text-[12px] font-medium tracking-[0.1em] uppercase">
                  Interest / business context
                </p>
                <div className="flex flex-row md:flex-col gap-3">
                {["rounded-full", "rounded-lg", "rounded-full"].map((shape, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 bg-white border border-[rgba(207,196,197,0.5)] rounded-2xl px-4 py-3 max-md:flex-1 max-md:justify-center max-md:px-3`}
                  >
                    <span className={`w-8 h-8 ${shape} bg-[rgba(207,196,197,0.45)] shrink-0`} />
                    <div className="flex flex-col gap-[6px] flex-1 max-md:hidden">
                      <span className="h-[6px] w-[70%] rounded-full bg-[rgba(207,196,197,0.7)]" />
                      <span className="h-[6px] w-[45%] rounded-full bg-[rgba(207,196,197,0.4)]" />
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <span aria-hidden="true" className="text-[#848484] text-[20px] leading-none justify-self-center rotate-90 md:rotate-0">→</span>

              {/* Center — friction */}
              <div className="flex flex-col items-center md:items-stretch gap-3">
                <p className="text-[#4c4546] text-[12px] font-medium tracking-[0.1em] uppercase text-center">
                  Friction
                </p>
                <div className="flex flex-wrap justify-center md:flex-col md:items-stretch gap-2 md:gap-3">
                {["Language", "Cultural context", "Platform conventions"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 bg-white border border-dashed border-blue-400/60 rounded-full px-4 py-2 text-[13px] font-medium text-[#101e18] whitespace-nowrap"
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-blue-400 shrink-0" />
                    {label}
                  </span>
                ))}
                </div>
              </div>

              <span aria-hidden="true" className="text-[#848484] text-[20px] leading-none justify-self-center rotate-90 md:rotate-0">→</span>

              {/* Right — platform-ready expression */}
              <div className="flex flex-col gap-3">
                <p className="text-[#4c4546] text-[12px] font-medium tracking-[0.1em] uppercase">
                  Platform-ready expression
                </p>
                <div className="bg-white border border-blue-400/60 rounded-2xl p-4 flex flex-col gap-3">
                  <span className="h-[48px] md:h-[64px] rounded-xl bg-[rgba(207,196,197,0.35)]" />
                  <p className="text-[14px] font-semibold leading-[1.3] text-[#101e18]">
                    Xiaohongshu-ready content
                  </p>
                  <div className="flex flex-col gap-[6px]">
                    <span className="h-[6px] w-[85%] rounded-full bg-[rgba(207,196,197,0.7)]" />
                    <span className="h-[6px] w-[60%] rounded-full bg-[rgba(207,196,197,0.4)]" />
                  </div>
                  <div className="flex gap-2">
                    <span className="h-[14px] w-9 rounded-full bg-blue-400/20" />
                    <span className="h-[14px] w-12 rounded-full bg-blue-400/20" />
                    <span className="h-[14px] w-8 rounded-full bg-blue-400/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Section 2: Product Experience ────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="flex flex-col gap-14">
          {/* Header copy (left) + three equal early screens (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] pb-2">
                First hypothesis
              </h2>
              <p className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">
                Upload image → understand visual context → generate Xiaohongshu-ready content
              </p>
              <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
                The first version focused on helping users turn images into more platform-appropriate content
                without starting from a blank prompt.
              </p>
              <p className="text-[14px] font-normal leading-[1.5] text-[#7e7576] pt-2">
                Early hypothesis: turn assets and account context into platform-ready content.
              </p>
            </div>
            <div className="lg:col-span-7">
              <EarlyScreens />
            </div>
          </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start pt-4">
            <div className="lg:col-span-5 flex flex-col gap-6">
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
            </div>

            {/* Bullet items with connector */}
            <div className="lg:col-span-7 flex flex-col gap-4 relative">
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
          className="flex flex-col gap-12 border-t border-b border-[rgba(207,196,197,0.3)] py-16"
        >
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            Design principles of the first release
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
          <div className="bg-[#fcf9f4] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            {/* Left */}
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
                Testing the first release with potential users
              </h2>
              <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546] max-w-[576px] mt-2">
                After the first release, we put SeedFlow in front of potential users to collect
                feedback and keep testing, using what we learn to adjust the product direction.
              </p>
            </div>

            {/* Right — frosted circle with leaf */}
            <div className="shrink-0 w-[120px] h-[120px] rounded-full bg-[rgba(255,255,255,0.5)] border border-white backdrop-blur-[2px] flex items-center justify-center">
              <div className="relative w-[45px] h-[45px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/sf-icon-leaf.svg" alt="SeedFlow" className="w-full h-full" />
                <div className="absolute inset-[12.5%] rounded-full bg-[rgba(0,0,0,0.05)]" />
              </div>
            </div>
          </div>

          {/* Real feedback from potential users */}
          <div className="mt-8 flex flex-col gap-4">
            <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-[#7e7576]">
              Feedback from potential users
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                "Wow, this is great. I used to do this with ChatGPT. Your product is more convenient.",
                "The copy is so well written.",
                "It would be even better if the copy could be refined to feel less like AI...",
              ].map((quote) => (
                <figure
                  key={quote}
                  className="border border-[rgba(207,196,197,0.3)] rounded-2xl p-6 md:p-8"
                >
                  <blockquote className="text-[18px] font-semibold leading-[1.6] text-[#101e18]">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Turning point ─────────────────────────────────────────────────── */}
        <motion.section {...scrollFadeUp}>
          <div className="bg-black rounded-[32px] p-8 md:p-12 flex flex-col gap-8 text-white">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-white">
              The question that changed the product
            </h2>
            <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] max-w-[760px]">
              &ldquo;If Doubao, ChatGPT, or Gemini can do this too, why should SeedFlow exist?&rdquo;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/20">
              {turningFindings.map((item) => (
                <p key={item} className="text-[18px] font-semibold leading-[1.6] py-4 border-b border-white/20 md:pr-8">
                  {item}
                </p>
              ))}
            </div>
            <p className="text-[18px] font-normal leading-[1.6] text-white/70 max-w-[672px]">
              That forced me to step back from improving generation quality and question whether generation
              itself was the right product.
            </p>
          </div>
        </motion.section>

        {/* ── Back to the market ────────────────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] pb-2">
              Back to the market
            </h2>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              Instead of adding more AI features, I went back to the market to understand why small businesses
              were struggling with Xiaohongshu in the first place.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 border-t border-[rgba(207,196,197,0.3)]">
            {phase2Research.map((item) => (
              <p key={item} className="text-[18px] font-semibold leading-[1.6] text-[#101e18] py-4 border-b border-[rgba(207,196,197,0.3)]">{item}</p>
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

        {/* ── The real problem ──────────────────────────────────────────────── */}
        <motion.section {...scrollFadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] pb-2">
              The real problem
            </h2>
            <p className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">
              &ldquo;Small businesses didn&rsquo;t need more generated content. They needed to know what to fix,
              what to publish, and how to keep going.&rdquo;
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 border-t border-[rgba(207,196,197,0.3)]">
            {realProblemFindings.map((item) => (
              <p key={item} className="text-[18px] font-semibold leading-[1.6] text-[#101e18] py-4 border-b border-[rgba(207,196,197,0.3)]">{item}</p>
            ))}
          </div>
        </motion.section>

        {/* ── Reframing SeedFlow ──────────────────────────────── */}
        <motion.section
          {...scrollFadeUp}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center"
        >
          <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
            <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18] pb-2">
              Reframing SeedFlow
            </h2>
            <p className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">
              Diagnose → Decide → Create → Publish
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              SeedFlow evolved from a content-generation tool into a growth co-pilot that helps a business
              understand its account, identify the next priority, create actionable content, and move toward
              consistent publishing.
            </p>
          </div>
          <div className="lg:col-span-7 w-full min-w-0">
            <div className={`${frameClass} aspect-[3/2]`}>
              <Image src="/images/sf7-flow.webp" fill
                alt="Diagnose, generate, publish: the SeedFlow workflow"
                sizes="(min-width: 1024px) 56vw, 90vw" className="object-cover" />
            </div>
            <p className="mt-3 text-[14px] font-normal leading-[1.5] text-[#7e7576]">
              The SeedFlow workflow, built for Xiaohongshu small-business users.
            </p>
          </div>
        </motion.section>

        {/* ── Phase 02 · 3: Key Product Decisions ───────────────────────────── */}
        <motion.section
          {...scrollFadeUp}
          className="flex flex-col gap-12 border-t border-b border-[rgba(207,196,197,0.3)] py-16"
        >
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            Decisions that shaped the MVP
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {phase2Decisions.map(({ title, desc }) => (
              <div key={title} className="flex flex-col gap-2">
                <h3 className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">{title}</h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#4c4546]">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 pt-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory">
            {/* Diagnose before generating */}
            <div className={`${frameClass} aspect-[4/5] shrink-0 w-[72%] md:w-auto snap-center`}>
              <Shot src="/images/sf3-upload.webp" w={780} h={1205} alt="Final MVP: homepage diagnosis and screenshot upload"
                style={{ left: "50%", top: "50%", height: "88%", transform: "translate(-50%, -50%)" }} />
            </div>
            {/* Different strategies for different account states */}
            <div className={`${frameClass} aspect-[4/5] shrink-0 w-[72%] md:w-auto snap-center`}>
              <Shot src="/images/sf3-state-cards.webp" w={738} h={1050} alt="Final MVP: choose between reviving an existing account and launching a new one"
                style={{ left: "50%", top: "50%", height: "88%", transform: "translate(-50%, -50%)" }} />
            </div>
            {/* Finished content, not just ideas */}
            <div className={`${frameClass} aspect-[4/5] shrink-0 w-[72%] md:w-auto snap-center`}>
              <Shot src="/images/sf-output-post-en.webp" w={692} h={1096} alt="Final MVP: finished post with title, copy and hashtags"
                style={{ left: "50%", top: "50%", height: "88%", transform: "translate(-50%, -50%)" }} />
            </div>
          </div>
        </motion.section>

        {/* ── Phase 02 · 4: MVP scope ───────────────────────────────────────── */}
        <motion.section {...scrollFadeUp}>
          <div className="bg-[#fcf9f4] rounded-[32px] p-8 md:p-12 flex flex-col gap-8">
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
                  className="text-[18px] font-semibold leading-[1.6] text-[#101e18] py-4 border-b border-[rgba(207,196,197,0.3)]"
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
          className="flex flex-col gap-12 border-t border-b border-[rgba(207,196,197,0.3)] py-16"
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
        <motion.section {...scrollFadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start pb-4">
          <h2 className="lg:col-span-5 text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#101e18]">
            What I learned
          </h2>
          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="text-[24px] font-semibold leading-[1.3] text-[#101e18]">
              &ldquo;The biggest shift wasn&rsquo;t improving the AI output. It was realizing that generation itself
              wasn&rsquo;t the product.&rdquo;
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              The real value came from judgment — understanding the business context, identifying what mattered
              next, and turning AI into an actionable workflow.
            </p>
            <p className="text-[18px] font-normal leading-[1.6] text-[#4c4546]">
              SeedFlow became stronger when I stopped asking what else AI could generate, and started asking
              what behaviour the product needed to change.
            </p>
          </div>
        </motion.section>

      </div>

      <Footer next={{ href: "/project-2", title: "Shopee AI Chatbot Builder" }} />
    </main>
  );
}
