/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Snowflake, Maximize, Zap, ChevronRight } from "lucide-react";
import { LoadingScreen } from "./components/LoadingScreen";
import { ProjectPage } from "./components/ProjectPage";
import { AboutPage } from "./components/AboutPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"hero" | "project" | "about">("hero");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden overflow-y-auto relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === "hero" ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Video Background / Header */}
            <div className="relative md:absolute md:inset-0 z-0 overflow-hidden pointer-events-none h-[60vh] md:h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260304_101127_49ce07b7-f19a-4882-b19c-1d2a27d97ac3.mp4" type="video/mp4" />
              </video>

              {/* Desktop-only Vignette Overlay */}
              <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(0,0,0,0.7)_100%)]" />

              {/* Mobile-only Transition Gradients */}
              <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
            </div>

            {/* Top Navigation */}
            <div className="absolute top-6 right-6 md:top-8 md:right-12 flex items-center gap-4 md:gap-8 z-20">
              <div className="hidden sm:flex items-center gap-4">
                <span className="text-xs font-mono tracking-widest text-white">1/03</span>
                <div className="w-16 md:w-24 h-[1px] bg-white/20 relative">
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-white" />
                </div>
              </div>
              <button
                onClick={() => setView("project")}
                className="text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-2 hover:text-white transition-colors"
              >
                Next Project
              </button>
            </div>

            {/* Main Content Grid */}
            <main className="container mx-auto px-6 md:px-12 pt-12 md:pt-24 min-h-screen md:h-screen flex flex-col justify-between pb-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                {/* Left Column: Title and Description */}
                <div className="col-span-1 md:col-span-9 space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <h1 className="text-[40px] sm:text-[56px] md:text-[72px] leading-[1] md:leading-[0.9] font-medium tracking-tighter uppercase max-w-xl font-display">
                      Viktor-O // <br />
                      Modern Architect
                    </h1>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm text-white max-w-md leading-relaxed font-light"
                  >
                    Developed with high-end skills and a pixel-perfect frame for those who don't just browse the web—they build it. Code your dreams....
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex gap-4"
                  >
                    {[Snowflake, Maximize, Zap].map((Icon, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors cursor-pointer"
                      >
                        <Icon size={16} className="text-white/80" />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right Column: Technical Specs */}
                <div className="col-span-1 md:col-span-3 flex flex-col justify-start md:pt-32">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white font-display">
                      Technical Specs
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Stack ", value: "React + Node + SQL" },
                        { label: "Logic", value: "V8 - Runtime Logic" },
                        { label: "Uptime", value: "99.9% High-Avail " },
                        { label: "Scale", value: "Responsive Modern Layout" },
                      ].map((spec, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-end border-b border-white/20 pb-2 group cursor-default"
                        >
                          <span className="text-xs text-white group-hover:text-white transition-colors">
                            {spec.label}
                          </span>
                          <span className="text-xs font-mono tracking-tight text-white">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 mt-16 md:mt-0">
                {/* Product Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-4 md:p-6 flex gap-4 md:gap-6 w-full md:max-w-md group hover:bg-white/10 transition-all"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden bg-zinc-900 relative">
                    <img
                      src="https://picsum.photos/seed/tech/200/200"
                      alt="Project Preview"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/40 to-transparent mix-blend-overlay" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono tracking-widest uppercase font-display">
                        VK-01: React Engine
                      </h4>
                      <p className="text-[11px] text-white leading-tight max-w-[200px]">
                        High-performance builds and a clean stack for speed and stability.
                      </p>
                    </div>
                    <button className="mt-2 text-[10px] font-mono uppercase tracking-widest border border-white/20 rounded-lg px-4 py-2 w-fit hover:bg-white hover:text-black transition-all">
                      View Project
                    </button>
                  </div>
                </motion.div>

                {/* Feature Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="flex items-center w-full md:w-auto"
                >
                  <div className="flex flex-wrap gap-2 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-full p-2 border border-white/5 w-full md:w-auto">
                    <span className="px-4 py-2 text-[10px] font-mono tracking-widest bg-white text-black rounded-full md:rounded-l-full md:rounded-r-sm">
                      TS/JS
                    </span>
                    <span className="px-3 py-2 text-[10px] font-mono tracking-widest border border-white/20 rounded-full">
                      V1
                    </span>
                    <span className="px-4 py-2 text-[10px] font-mono tracking-widest border border-white/20 rounded-full">
                      Full-Stack
                    </span>
                    <span className="px-4 py-2 text-[10px] font-mono tracking-widest border border-white/20 rounded-full">
                      Cloud-Ready
                    </span>
                  </div>
                </motion.div>
              </div>
            </main>
          </motion.div>
        ) : view === "project" ? (
          <ProjectPage key="project" onBack={() => setView("hero")} onNext={() => setView("about")} />
        ) : (
          <AboutPage key="about" onBack={() => setView("project")} onHome={() => setView("hero")} />
        )}
      </AnimatePresence>
    </div>
  );
}
