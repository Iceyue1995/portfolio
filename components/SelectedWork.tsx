"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const scrollFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

const projects = [
  {
    number: "01",
    title: "AI Agent Platform",
    tags: "UX/UI  •  CONVERSATIONAL DESIGN  •  2024",
    image: "/project-1.png",
    imageAlt: "AI Agent Platform project screenshot",
    imageLeft: false,
    href: "/project-1",
    description: undefined as string | undefined,
    eyebrow: undefined as string | undefined,
  },
  {
    number: "02",
    title: "Shopee AI Chatbot Builder",
    tags: "AI COMMERCE  •  PRODUCT DESIGN  •  2024",
    image: "/project-2.png",
    imageAlt: "Shopee AI Chatbot Builder project screenshot",
    imageLeft: true,
    href: "/project-2",
    description: undefined as string | undefined,
    eyebrow: undefined as string | undefined,
  },
  {
    number: "03",
    title: "Vibe Coding Project",
    tags: "CONSUMER AI  •  CREATOR TOOLS  •  2025",
    image: "/seedflow-hero.png",
    imageAlt: "SeedFlow app mockup — account health score 62 out of 100 with content analysis and hashtag suggestions",
    imageLeft: false,
    href: "/seedflow",
    description: "AI creation assistant for Xiaohongshu creators — turning personal images into platform-ready posts.",
    eyebrow: "SeedFlow",
  },
];

function TextCol({ number, title, tags, description, eyebrow }: { number: string; title: string; tags: string; description?: string; eyebrow?: string }) {
  return (
    <motion.div
      {...scrollFadeUp(0)}
      className="w-full md:w-1/2 flex flex-col justify-center"
    >
      <span className="text-[11px] font-mono text-gray-300 mb-5 tracking-widest">
        {number}
      </span>
      {eyebrow && (
        <span className="text-[10px] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-gray-900 mb-5 group-hover:text-[#3B82F6] transition-colors duration-300">
        {title}
      </h2>
      {description && (
        <p className="text-[14px] leading-relaxed text-gray-500 font-light mb-5">
          {description}
        </p>
      )}
      <p className="text-[10.5px] font-medium tracking-[0.16em] text-gray-300 uppercase">
        {tags}
      </p>
    </motion.div>
  );
}

function ImageCol({ image, imageAlt }: { image: string; imageAlt: string }) {
  return (
    <motion.div
      {...scrollFadeUp(0.15)}
      className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
}

export default function SelectedWork() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 mt-32 pb-24">
      <motion.p
        {...scrollFadeUp(0)}
        className="text-[11px] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase mb-20"
      >
        Selected Work
      </motion.p>

      <div className="flex flex-col gap-y-32">
        {projects.map(({ number, title, tags, image, imageAlt, imageLeft, href, description, eyebrow }) => {
          const inner = (
            <>
              {!imageLeft && (
                <>
                  <TextCol number={number} title={title} tags={tags} description={description} eyebrow={eyebrow} />
                  <ImageCol image={image} imageAlt={imageAlt} />
                </>
              )}
              {imageLeft && (
                <>
                  <ImageCol image={image} imageAlt={imageAlt} />
                  <TextCol number={number} title={title} tags={tags} description={description} eyebrow={eyebrow} />
                </>
              )}
            </>
          );

          const rowClass =
            "flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24 group";

          return href ? (
            <Link
              key={number}
              href={href}
              className={`${rowClass} cursor-pointer`}
            >
              {inner}
            </Link>
          ) : (
            <div key={number} className={rowClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
