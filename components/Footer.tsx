"use client";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full px-6 md:px-12 lg:px-20 pt-32 pb-12">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
        <p className="text-[11px] font-medium tracking-[0.14em] text-gray-400 uppercase">
          Yue Yuwen&nbsp;&nbsp;/&nbsp;&nbsp;Crafted in Singapore &amp; Shanghai
        </p>
        <p className="text-[11px] font-medium tracking-[0.14em] text-gray-400 uppercase">
          Available for Work&nbsp;&nbsp;/&nbsp;&nbsp;Singapore&nbsp;|&nbsp;Remote
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100 mb-8" />

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
