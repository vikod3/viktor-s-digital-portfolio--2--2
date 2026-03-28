import React from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { Cpu, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Intelligent Runtime",
    stat: "< 12ms",
    statLabel: "Response",
  },
  {
    icon: Globe,
    title: "Edge Distribution",
    stat: "200+",
    statLabel: "Nodes",
  },
  {
    icon: Shield,
    title: "Zero-Trust Security",
    stat: "256-bit",
    statLabel: "Encryption",
  },
];

const FeatureCard: React.FC<{
  feature: (typeof features)[0];
  index: number;
}> = ({ feature, index }) => {
  const { ref, isInView } = useInView(0.1);
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative p-6 md:p-8 border border-white/[0.06] rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 hover:border-white/[0.12] pointer-events-auto"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
          <Icon size={18} className="text-white/60 group-hover:text-white transition-colors duration-500" />
        </div>
        <div className="text-right">
          <div className="text-lg font-mono font-medium text-white tracking-tight">{feature.stat}</div>
          <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/40">{feature.statLabel}</div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-white tracking-wide">{feature.title}</h3>
    </motion.div>
  );
};

export const FeaturesSection: React.FC = () => {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="features" className="relative z-10 pointer-events-none min-h-screen py-24 md:py-32 px-4 md:px-8 lg:px-12">
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
                Core Systems
              </span>
            </div>
            <h2 className="text-[32px] md:text-[48px] font-display font-extralight tracking-tight uppercase leading-[0.95]">
              <span className="bg-gradient-to-r from-white/40 to-white bg-clip-text text-transparent">
                Built for
              </span>
              <br />
              <span className="text-white">Performance</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
