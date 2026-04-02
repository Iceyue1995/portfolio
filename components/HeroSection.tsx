"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

export default function HeroSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl">
        <motion.h1
          {...fadeUp(0)}
          className="font-serif font-normal text-[clamp(2.75rem,6vw,5rem)] leading-[1.08] tracking-[-0.025em]
                     text-gray-800 mb-8"
        >
          From Insight to{" "}
          <span className="text-[#3B82F6] italic">intelligence.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="font-sans text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed
                     text-gray-500 max-w-2xl font-light"
        >
          AI Product Designer specializing in LLM-powered platforms, RAG
          architecture, and conversational UX. I bridge the gap between
          cutting-edge AI technology and real user needs.
        </motion.p>
      </div>
    </section>
  );
}
