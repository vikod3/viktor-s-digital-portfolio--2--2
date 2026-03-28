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
      className="pointer-events-auto group"
    >
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-[36px] md:text-[48px] font-display font-extralight tracking-tight text-white leading-none">
          {stat.value}
        </span>
        <span className="text-lg font-display font-extralight text-white/50">
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
    <section id="stats" className="relative z-10 pointer-events-none py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="flex justify-end">
        <div className="w-full md:w-[55%]">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
                Performance
              </span>
            </div>
            <h2 className="text-[32px] md:text-[48px] font-display font-extralight tracking-tight uppercase leading-[0.95]">
              <span className="text-white">Numbers That Speak</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:gap-10">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
