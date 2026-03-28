import React from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const stats = [
  { value: "99.9", suffix: "%", label: "Uptime SLA" },
  { value: "<12", suffix: "ms", label: "Avg Response" },
  { value: "200", suffix: "+", label: "Edge Nodes" },
  { value: "10", suffix: "M+", label: "Requests / Day" },
];

const StatItem: React.FC<{ stat: (typeof stats)[0]; index: number }> = ({ stat, index }) => {
  const { ref, isInView } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="text-center md:text-left pointer-events-auto group"
    >
      <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
        <span className="text-[40px] md:text-[56px] font-display font-extralight tracking-tight text-white leading-none">
          {stat.value}
        </span>
        <span className="text-lg md:text-xl font-display font-extralight text-white/50">
          {stat.suffix}
        </span>
      </div>
      <div className="h-px w-full bg-white/[0.06] group-hover:bg-white/[0.12] transition-colors duration-500 mb-3" />
      <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
        {stat.label}
      </span>
    </motion.div>
  );
};

export const StatsSection: React.FC = () => {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="stats" className="relative z-10 pointer-events-none py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              Performance
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h2 className="text-[32px] md:text-[48px] font-display font-extralight tracking-tight uppercase leading-[0.95]">
            <span className="bg-gradient-to-r from-white/40 via-white to-white/40 bg-clip-text text-transparent">
              Numbers That
            </span>
            <br />
            <span className="text-white">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 md:mt-28 p-8 md:p-12 border border-white/[0.06] rounded-2xl bg-white/[0.02] pointer-events-auto"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-wide text-white mb-2">
                Ready to Ship?
              </h3>
              <p className="text-sm text-white/50 font-light max-w-md leading-relaxed">
                Deploy your first project in under 5 minutes. Zero configuration, instant global distribution.
              </p>
            </div>
            <button className="px-8 py-3.5 bg-white text-black text-xs font-mono tracking-[0.15em] uppercase rounded-full hover:bg-white/90 transition-colors duration-300 whitespace-nowrap">
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
