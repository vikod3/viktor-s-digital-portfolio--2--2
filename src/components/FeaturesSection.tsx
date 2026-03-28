import React from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { Cpu, Globe, Shield, Layers, Workflow, Gauge } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Intelligent Runtime",
    description: "V8-powered execution engine with real-time compilation and adaptive optimization for peak throughput.",
    stat: "< 12ms",
    statLabel: "Response",
  },
  {
    icon: Globe,
    title: "Edge Distribution",
    description: "Global CDN mesh with 200+ edge nodes ensuring sub-50ms latency for every user, everywhere.",
    stat: "200+",
    statLabel: "Nodes",
  },
  {
    icon: Shield,
    title: "Zero-Trust Security",
    description: "End-to-end encryption with automated threat detection, rate limiting, and DDoS mitigation built in.",
    stat: "256-bit",
    statLabel: "Encryption",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Composable micro-services that scale independently. Swap, extend, or replace any layer without downtime.",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  {
    icon: Workflow,
    title: "CI/CD Pipeline",
    description: "Automated build, test, and deploy workflows with rollback capabilities and canary releases.",
    stat: "< 4min",
    statLabel: "Deploy",
  },
  {
    icon: Gauge,
    title: "Real-Time Metrics",
    description: "Live performance dashboards with anomaly detection, custom alerts, and predictive scaling triggers.",
    stat: "1ms",
    statLabel: "Granularity",
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
      <div className="flex items-start justify-between mb-6">
        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
          <Icon size={18} className="text-white/60 group-hover:text-white transition-colors duration-500" />
        </div>
        <div className="text-right">
          <div className="text-lg font-mono font-medium text-white tracking-tight">{feature.stat}</div>
          <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/40">{feature.statLabel}</div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-white mb-2 tracking-wide">{feature.title}</h3>
      <p className="text-xs text-white/50 leading-relaxed font-light">{feature.description}</p>
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export const FeaturesSection: React.FC = () => {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="features" className="relative z-10 pointer-events-none min-h-screen py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
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
          <p className="mt-6 text-sm text-white/50 max-w-lg leading-relaxed font-light">
            Every component engineered for speed, reliability, and scale. No compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
