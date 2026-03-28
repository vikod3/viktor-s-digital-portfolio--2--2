import React from "react";
import { motion } from "motion/react";
import { Snowflake, Maximize, Zap } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-between px-4 md:px-8 lg:px-12 pt-6 md:pt-10 pb-6 relative z-10 pointer-events-none">
      <div className="max-w-[50%] space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] leading-[1] md:leading-[0.9] font-extralight tracking-tight uppercase font-display bg-gradient-to-r from-white/20 via-white/70 to-white bg-clip-text text-transparent">
            Automation <br />
            Machines &bull;
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
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors cursor-pointer pointer-events-auto"
            >
              <Icon size={16} className="text-white/80" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[50%]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="p-6 md:p-8 w-full pointer-events-auto"
        >
          <h3 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/60 mb-5">
            Technical Specs
          </h3>
          <div className="space-y-4">
            {[
              { label: "Stack", value: "React + Node + SQL" },
              { label: "Logic", value: "V8 - Runtime Logic" },
              { label: "Uptime", value: "99.9% High-Avail" },
              { label: "Scale", value: "Responsive Modern Layout" },
            ].map((spec, i) => (
              <div
                key={i}
                className="flex justify-between items-end border-b border-white/10 pb-3 group cursor-default"
              >
                <span className="text-xs text-white/70 group-hover:text-white transition-colors">
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
    </section>
  );
};
