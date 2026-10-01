'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const pastProjects = [
  { product: "SeedFlow", model: "B2C / SMB", role: "Product Founder / Owner", domain: "AI growth workflow for Xiaohongshu small businesses" },
  { product: "Growth Daily", model: "B2C", role: "Product Founder / Owner", domain: "Multi-model AI learning platform" },
  { product: "GodGPT", model: "B2C", role: "Product Development Manager", domain: "Conversational AI / spiritual reflection product" },
  { product: "AI Mascot Platform", model: "B2B SaaS", role: "Sole Product Designer", domain: "Configurable AI agent / knowledge platform" },
  { product: "Shopee Chatbot Builder", model: "B2B", role: "Product Designer", domain: "Conversational AI platform for regional operators" },
  { product: "Genesis Digital Ecosystem", model: "B2C", role: "UX Manager / Design Lead", domain: "Luxury automotive website + mini-program ecosystem" },
  { product: "Brandar Radar", model: "B2B", role: "Senior UI/UX Designer", domain: "BI / social intelligence and permission-management platform" },
  { product: "BMW Digital Products", model: "B2B / B2C", role: "UI/UX Designer", domain: "Automotive digital experiences and enterprise workflows" },
  { product: "Huawei Digital Platforms", model: "B2B / B2C", role: "UX / Product Designer", domain: "Enterprise and consumer digital products" },
];

const clientLogos = [
  { name: "BMW", src: "/images/logos/bmw.png", s: 1.25 },
  { name: "Huawei", src: "/images/logos/huawei.png", s: 1.05 },
  { name: "Hyundai", src: "/images/logos/hyundai.png", s: 1.3 },
  { name: "LVMH", src: "/images/logos/lvmh.png", s: 1 },
  { name: "L'Oréal", src: "/images/logos/loreal.png", s: 1.1 },
  { name: "Lexus", src: "/images/logos/lexus.png", s: 1.05 },
  { name: "Siemens", src: "/images/logos/siemens.png", s: 1.1 },
  { name: "P&G", src: "/images/logos/pg.png", s: 1 },
  { name: "Apple", src: "/images/logos/apple.png", s: 0.95 },
  { name: "McDonald's", src: "/images/logos/mcdonalds-mark.png", s: 1.05, dim: true },
];

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  };

  return (
    <main className="relative min-h-screen">
      <Header />

      {/* Hero Section */}
      <motion.section 
        className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="lg:col-span-7">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-10">
            Designing with{" "}
            <span className="text-blue-400 italic font-light tracking-tight">judgment</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl">
            AI is getting better at producing answers. The harder part is deciding what is actually worth building around them.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            I’m increasingly focused on product judgment: identifying the real problem behind a request, deciding where AI genuinely adds value, designing for imperfect outputs, and knowing when not to automate. I build and test quickly, but I care just as much about what to remove, what to validate, and what users actually perceive as valuable.
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] bg-gray-200 rounded-[2rem] overflow-hidden relative shadow-2xl shadow-gray-200/50 border border-gray-100">
            <Image 
              src="/images/portrait-bw.webp" 
              alt="Yue Yuwen - Portrait"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Selected Projects */}
      <motion.section 
        {...fadeInUp}
        className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-gray-200"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">Selected Projects</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastProjects.map(({ product, model, role, domain }) => (
            <li
              key={product}
              className="group flex flex-col gap-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-serif font-bold text-slate-900 leading-snug transition-colors group-hover:text-blue-600">{product}</h3>
                <span className="shrink-0 mt-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-600">{model}</span>
              </div>
              <p className="text-sm font-medium text-slate-800">{role}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{domain}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Why I Design for AI */}
      <motion.section 
        {...fadeInUp}
        className="max-w-7xl mx-auto px-6 md:px-12 py-24"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-16">Why I Design for AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-[2rem] p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-8">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Human-Centric Agency</h3>
            <p className="text-gray-500 text-sm leading-relaxed">AI should amplify human intelligence, not replace it. I design systems that empower users with control and clarity.</p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-8">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Algorithmic Clarity</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Designing the black box to be transparent. I focus on making AI decision-making explainable and trustworthy.</p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-8">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Generative Fluidity</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Interfaces should be as dynamic as the models behind them, adapting seamlessly to intent and context.</p>
          </div>
        </div>
      </motion.section>

      {/* Expertise & Toolkit */}
      <motion.section 
        {...fadeInUp}
        className="max-w-7xl mx-auto px-6 md:px-12 py-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">Selected clients</h2>
        <div className="bg-[#F4F7FB] rounded-[2.5rem] px-6 py-10 md:px-12 md:py-12 flex flex-wrap items-center justify-center gap-y-8 md:gap-y-10">
          {clientLogos.map(({ name, src, s, dim }) => (
            <div key={name} className="w-1/2 md:w-1/5 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={name}
                style={{ width: 140 * s, height: 44 * s }}
                className={`max-w-[80%] object-contain mix-blend-multiply grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100 ${dim ? "brightness-[0.6] hover:brightness-100" : ""}`}
              />
            </div>
          ))}
        </div>
      </motion.section>

{/* Beyond the Screen */}
<motion.section 
        {...fadeInUp}
        className="max-w-7xl mx-auto px-6 md:px-12 py-24"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">Beyond the Screen</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Photo 1 */}
          <div className="aspect-square rounded-[2rem] overflow-hidden relative border border-gray-100 shadow-sm group">
            <Image 
              src="/images/photo-1.png" 
              alt="Photography by Yue Yuwen"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          {/* Photo 2 */}
          <div className="aspect-square rounded-[2rem] overflow-hidden relative border border-gray-100 shadow-sm group">
            <Image 
              src="/images/photo-2.png" 
              alt="Photography by Yue Yuwen"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          {/* Photo 3 */}
          <div className="aspect-square rounded-[2rem] overflow-hidden relative border border-gray-100 shadow-sm group">
            <Image 
              src="/images/photo-3.png" 
              alt="Photography by Yue Yuwen"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          When I am not designing, you will find me exploring remote landscapes through my camera lens or deeply immersed in books about philosophy and cognitive science. I believe that being a great designer requires a constant curiosity for the world beyond digital boundaries.
        </p>
      </motion.section>

      <Footer />
    </main>
  );
}