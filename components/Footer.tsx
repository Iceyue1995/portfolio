"use client";

import Link from "next/link";

type NextProject = { href: string; title: string };

export default function Footer({ next }: { next?: NextProject }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full px-6 md:px-12 lg:px-[max(3rem,calc((100vw_-_1280px)/2_+_3rem))] pt-32 pb-12">
      {next && (
        <Link
          href={next.href}
          className="group flex items-end justify-between gap-6 mb-12 pb-10 border-b border-gray-100"
        >
          <div className="flex flex-col gap-3 min-w-0">
            <span className="text-[12px] font-medium tracking-[0.14em] text-gray-400 uppercase">
              Next project
            </span>
            <span className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-gray-900 group-hover:text-blue-600 transition-colors">
              {next.title}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 text-3xl md:text-4xl text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
          >
            →
          </span>
        </Link>
      )}

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-[11px] text-gray-300 tracking-[0.1em] uppercase">
          © 2026 Yue Yuwen Portfolio
        </p>
        <button
          onClick={scrollToTop}
          className="text-[11px] text-gray-300 tracking-[0.1em] uppercase
                     hover:text-gray-600 transition-colors text-left sm:text-right"
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
}
