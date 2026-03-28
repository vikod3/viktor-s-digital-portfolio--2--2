import React from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

export const FooterSection: React.FC = () => {
  const { ref, isInView } = useInView(0.1);

  return (
    <footer id="footer" className="relative z-10 pointer-events-none py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-xl md:text-2xl font-display font-extralight uppercase tracking-tight text-white">
              Automation Machines
            </h2>
            <div className="flex gap-3 pointer-events-auto">
              {["X", "GH", "DS"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.04] flex justify-between items-center">
            <span className="text-[10px] font-mono tracking-wider text-white/20">
              &copy; 2026 Automation Machines
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider text-white/30">
                All systems nominal
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
