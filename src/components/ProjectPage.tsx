import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectPageProps {
  onBack: () => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden relative"
    >
      {/* Video Background / Header */}
      <div className="relative md:absolute md:inset-0 z-0 overflow-hidden pointer-events-none h-[50vh] md:h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260304_102019_f84678ca-ffe7-49a5-895a-75ac1f71ad46.mp4" type="video/mp4" />
        </video>
        
        {/* Desktop-only Vignette Overlay */}
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Mobile-only Transition Gradients */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-6 right-6 md:top-8 md:right-12 flex items-center gap-4 md:gap-8 z-20">
        <button 
          onClick={onBack}
          className="text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-2 hover:text-white/60 transition-colors"
        >
          <ArrowLeft size={12} /> Back Home
        </button>
      </div>

      <main className="container mx-auto px-6 md:px-12 pt-12 md:pt-48 min-h-screen flex flex-col justify-between pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {/* Left Side: Large Titles */}
          <div className="col-span-1 md:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-[60px] sm:text-[80px] md:text-[120px] leading-[0.85] font-medium tracking-tighter uppercase font-display">
                PROJECTY <br />
                ENGINE
              </h1>
              <p className="text-xl md:text-3xl font-light max-w-2xl leading-tight text-white/90">
                We create high-performance <br /> digital architectures.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Description */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-start md:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                Projecty is our flagship React engine, built for extreme speed and modularity. 
                It redefines how modern web applications are structured, focusing on V8 optimization 
                and pixel-perfect rendering pipelines. Our final results are brilliant.
              </p>
              <button className="text-[10px] font-mono tracking-[0.3em] uppercase border-b border-white/40 pb-1 hover:border-white transition-all w-fit">
                Read More
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-24 md:mt-0 items-end">
          {/* Bottom Left: Info Blocks */}
          <div className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4 border-t border-white/20 pt-6"
            >
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white">
                01 // CORE ARCHITECTURE
              </h4>
              <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
                Check office in <br /> Los Angeles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="space-y-4 border-t border-white/20 pt-6"
            >
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-white">
                02 // PERFORMANCE METRICS
              </h4>
              <p className="text-[11px] text-white/50 uppercase tracking-widest leading-relaxed">
                Our effective SEO <br /> Positioning
              </p>
            </motion.div>
          </div>

          {/* Bottom Right: Meta Info */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-end space-y-8">
            <div className="flex gap-6">
              <button className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                <ArrowLeft size={16} />
              </button>
              <button className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="text-right space-y-2">
              <p className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
                25 March 2026 | Project
              </p>
              <p className="text-sm md:text-base font-light italic text-white/80 max-w-[200px] md:max-w-none">
                Photographs that attract attention.
              </p>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};
