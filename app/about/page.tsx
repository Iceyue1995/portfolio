'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
            Designing at the intersection of <br />
            <span className="text-blue-400 italic font-light tracking-tight">human intent</span> and <br />
            AI capability.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl">
            Independent AI Design Consultant. I specialize in bridging the gap between complex algorithmic structures and intuitive human experiences.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            With a background spanning UX management and AI chatbot optimization, I focus on building LLM-powered interfaces and ethical frameworks that empower rather than replace human agency.
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] bg-gray-200 rounded-[2rem] overflow-hidden relative shadow-2xl shadow-gray-200/50 border border-gray-100">
            <Image 
              src="/images/yue-portrait.png" 
              alt="Yue Yuwen - Portrait"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Chronology Section */}
      <motion.section 
        {...fadeInUp}
        className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-gray-200"
      >
        <span className="text-xs font-bold tracking-widest text-blue-500 uppercase block mb-16">Chronology</span>
        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3">
              <span className="text-sm font-medium text-gray-500">2024 - Present</span>
            </div>
            <div className="md:col-span-9 max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Independent AI Design Consultant</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Providing AI consulting services for Publicis Group and various startups, focusing on AI agent platforms and strategic design.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3">
              <span className="text-sm font-medium text-gray-500">2022 - 2024</span>
            </div>
            <div className="md:col-span-9 max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">UX Manager at Publicis Group</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Managed a team of designers handling alternative and luxury brands. Translated complex business requirements into intuitive digital ecosystem designs, focusing on Information Architecture and logical content structure.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3">
              <span className="text-sm font-medium text-gray-500">2020 - 2022</span>
            </div>
            <div className="md:col-span-9 max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Product Designer (AI Chatbot) at Shopee</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Optimized chatbot decision tree logic and user flows, improving CSAT by 20%. Designed backend configuration interfaces for operations teams to manage bot rules and FAQ retrieval accuracy.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            <div className="md:col-span-3">
              <span className="text-sm font-medium text-gray-500">2016 - 2020</span>
            </div>
            <div className="md:col-span-9 max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sr. UI/UX Designer at Publicis Group</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Delivered SaaS/PaaS product interfaces and complex data visualization dashboards for global Fortune 500 clients including BMW, L'Oreal, and Microsoft.</p>
            </div>
          </div>
        </div>
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
        <div className="bg-[#F4F7FB] rounded-[2.5rem] p-12 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-500 uppercase block mb-10">Expertise</span>
            <ul className="space-y-5">
              <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div><span className="font-semibold text-slate-800">LLM-powered Interface Design</span></li>
              <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="font-medium text-slate-700">Prompt Engineering Strategy</span></li>
              <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="font-medium text-slate-700">RAG Architecture Visualization</span></li>
              <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="font-medium text-slate-700">Model Selection & Evaluation</span></li>
              <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div><span className="font-medium text-slate-700">AI Strategy & Iteration</span></li>
            </ul>
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-500 uppercase block mb-10">Toolkit</span>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">Figma</span>
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">Prototyping</span>
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">Python (Basic)</span>
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">React</span>
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">User Research</span>
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">Systems Design</span>
              <span className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-gray-100">LLM Prompting</span>
            </div>
          </div>
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