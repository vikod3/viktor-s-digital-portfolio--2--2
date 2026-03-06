import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Terminal, Layers, Globe, Code2 } from "lucide-react";

interface AboutPageProps {
  onBack: () => void;
  onHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onHome }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden relative"
    >
      {/* Background — subtle radial gradient, no video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(242,125,38,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,125,38,0.05)_0%,transparent_50%)]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
        <button
          onClick={onBack}
          className="text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-2 hover:text-white/60 transition-colors"
        >
          <ArrowLeft size={12} /> Back
        </button>
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-12 z-20">
        <button
          onClick={onHome}
          className="text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-2 hover:text-white/60 transition-colors"
        >
          Home
        </button>
      </div>

      <main className="container mx-auto px-6 md:px-12 pt-24 md:pt-40 min-h-screen flex flex-col justify-between pb-12 relative z-10">
        {/* Header Section */}
        <div className="space-y-16 md:space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Title */}
            <div className="col-span-1 md:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-[48px] sm:text-[72px] md:text-[100px] leading-[0.85] font-medium tracking-tighter uppercase font-display">
                  ABOUT // <br />
                  THE <br />
                  ARCHITECT
                </h1>
                <div className="w-24 h-[1px] bg-brand-orange" />
              </motion.div>
            </div>

            {/* Intro */}
            <div className="col-span-1 md:col-span-4 flex flex-col justify-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm md:text-base text-white/70 leading-relaxed font-light"
              >
                A full-stack architect obsessed with clean code, scalable systems, and interfaces 
                that feel as good as they look. Every pixel placed with purpose. Every function 
                optimized for performance.
              </motion.p>
            </div>
          </div>

          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="col-span-1 md:col-span-4">
              <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-6 font-display">
                Design Philosophy
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                I believe the best digital products emerge at the intersection of engineering 
                precision and artistic expression. Code should be poetry — readable, elegant, 
                and performant. Interfaces should feel alive — responsive, intuitive, and 
                memorable.
              </p>
            </div>

            <div className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Terminal,
                  num: "01",
                  title: "CLEAN ARCHITECTURE",
                  desc: "Modular, testable code built on SOLID principles and modern patterns.",
                },
                {
                  icon: Layers,
                  num: "02",
                  title: "SCALABLE SYSTEMS",
                  desc: "Infrastructure that grows seamlessly from prototype to production.",
                },
                {
                  icon: Globe,
                  num: "03",
                  title: "PIXEL-PERFECT UI",
                  desc: "Every component crafted with attention to spacing, type, and motion.",
                },
                {
                  icon: Code2,
                  num: "04",
                  title: "PERFORMANCE FIRST",
                  desc: "Optimized bundles, lazy loading, and V8-tuned runtime execution.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  className="border-t border-white/10 pt-6 group hover:border-white/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon
                      size={14}
                      className="text-brand-orange/70 group-hover:text-brand-orange transition-colors"
                    />
                    <span className="text-[10px] font-mono tracking-widest text-white/30">
                      {item.num}
                    </span>
                  </div>
                  <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white mb-2 font-display">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 mt-24 md:mt-16"
        >
          {/* Status bar */}
          <div className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-full p-2 border border-white/5">
            {["React", "Node.js", "TypeScript", "SQL", "Cloud"].map(
              (tech, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 text-[10px] font-mono tracking-widest rounded-full ${
                    i === 0
                      ? "bg-brand-orange text-black"
                      : "border border-white/20 text-white/70"
                  }`}
                >
                  {tech}
                </span>
              )
            )}
          </div>

          {/* Meta */}
          <div className="text-right space-y-2">
            <p className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
              Portfolio V1.0 // 2026
            </p>
            <p className="text-sm font-light italic text-white/80">
              Building the future, one commit at a time.
            </p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};
