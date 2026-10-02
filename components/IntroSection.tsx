"use client";

import { motion } from "framer-motion";

const scrollFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

const pillars = [
  {
    title: "Problem before capability",
    description:
      "Start with the user problem, not what the model can do.",
  },
  {
    title: "Design for imperfect AI",
    description:
      "Make uncertainty, correction, and failure states understandable and manageable.",
  },
  {
    title: "Control before automation",
    description:
      "Use AI to reduce effort without removing context, visibility, or user agency.",
  },
];

export default function IntroSection() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-[max(3rem,calc((100vw_-_1280px)/2_+_3rem))] py-24 md:py-32">
      <div className="w-full h-px bg-gray-100 mb-24" />

      <div className="flex flex-col md:flex-row gap-16 md:gap-12 lg:gap-20">
        {/* ── Left: intro paragraph ── */}
        <motion.div {...scrollFadeUp(0)} className="md:w-[58%]">
          <p
            className="font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.75]
                       text-gray-700 font-normal"
          >
            Good AI products are built on judgment, not just capability.
          </p>
          <p
            className="font-serif text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.75]
                       text-gray-700 font-normal mt-6"
          >
            I focus on identifying the real problem, deciding where AI genuinely
            adds value, and shaping workflows that keep users informed and in
            control. I build quickly, test assumptions early, and care as much
            about what not to build as what to automate.
          </p>
        </motion.div>

        {/* ── Right: core pillars ── */}
        <div className="md:w-[42%]">
          <motion.p
            {...scrollFadeUp(0.1)}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase mb-8"
          >
            Core Pillars
          </motion.p>

          <ul className="flex flex-col gap-8">
            {pillars.map(({ title, description }, i) => (
              <motion.li key={title} {...scrollFadeUp(0.15 + i * 0.1)}>
                <p className="text-[14px] font-semibold text-gray-900 mb-1.5 tracking-tight">
                  {title}
                </p>
                <p className="text-[13.5px] leading-relaxed text-gray-400 font-light">
                  {description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
