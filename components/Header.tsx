"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Sparkle / node icon — a small SVG that matches a blue "connection node" aesthetic */
function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Central dot */}
      <circle cx="9" cy="9" r="2.25" fill="#2563EB" />
      {/* Four radiating spokes */}
      <rect x="8.1" y="1" width="1.8" height="4.5" rx="0.9" fill="#2563EB" />
      <rect x="8.1" y="12.5" width="1.8" height="4.5" rx="0.9" fill="#2563EB" />
      <rect x="1" y="8.1" width="4.5" height="1.8" rx="0.9" fill="#2563EB" />
      <rect x="12.5" y="8.1" width="4.5" height="1.8" rx="0.9" fill="#2563EB" />
      {/* Diagonal connector dots */}
      <circle cx="4.2" cy="4.2" r="1.1" fill="#93C5FD" />
      <circle cx="13.8" cy="4.2" r="1.1" fill="#93C5FD" />
      <circle cx="4.2" cy="13.8" r="1.1" fill="#93C5FD" />
      <circle cx="13.8" cy="13.8" r="1.1" fill="#93C5FD" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative w-full px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
      {/* ── Logo ── */}
      <Link
        href="/"
        className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
      >
        <SparkleIcon />
        <span>Yue Yuwen</span>
      </Link>

      {/* ── Desktop nav ── */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`text-[14px] font-medium transition-colors ${
              pathname === href
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Mobile hamburger ── */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span
          className={`block w-5 h-[1.5px] bg-gray-700 transition-transform duration-200 origin-center
            ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-gray-700 transition-opacity duration-200
            ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-gray-700 transition-transform duration-200 origin-center
            ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
        />
      </button>

      {/* ── Mobile menu drawer ── */}
      {menuOpen && (
        <nav
          className="md:hidden absolute top-[68px] left-0 right-0 z-50 bg-white border-t border-gray-100
                     shadow-lg px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-[15px] font-medium ${
                pathname === href
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}

        </nav>
      )}
    </header>
  );
}
