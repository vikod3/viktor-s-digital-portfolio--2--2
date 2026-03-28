import React from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { Terminal, Rocket } from "lucide-react";

const steps = [
  {
    icon: Terminal,
    number: "01",
    title: "Initialize & Develop",
    details: ["TypeScript + Vite", "HMR < 50ms"],
  },
  {
    icon: Rocket,
    number: "02",
    title: "Deploy & Monitor",
    details: ["Zero-config CI/CD", "Live metrics"],
  },
];

const ProcessStep: React.FC<{
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}> = ({ step, index, isLast }) => {
  const { ref, isInView } = useInView(0.2);
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="relative pointer-events-auto"
    >
      <div className="flex gap-6 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black relative z-10">
            <Icon size={18} className="text-white/70" />
          </div>
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
              className="w-px h-full bg-gradient-to-b from-white/20 to-transparent origin-top"
            />
          )}
        </div>

        <div className="pb-16 md:pb-20 flex-1">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/30">{step.number}</span>
            <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-wide text-white">
              {step.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {step.details.map((detail) => (
              <span
                key={detail}
                className="px-3 py-1.5 text-[10px] font-mono tracking-wider border border-white/[0.08] rounded-full text-white/50 bg-white/[0.02]"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProcessSection: React.FC = () => {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="process" className="relative z-10 pointer-events-none min-h-screen py-24 md:py-32 px-4 md:px-8 lg:px-12">
      <div className="w-full md:w-[50%]">
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
              Workflow
            </span>
          </div>
          <h2 className="text-[32px] md:text-[48px] font-display font-extralight tracking-tight uppercase leading-[0.95]">
            <span className="bg-gradient-to-r from-white/40 to-white bg-clip-text text-transparent">
              From Idea
            </span>
            <br />
            <span className="text-white">To Production</span>
          </h2>
        </motion.div>

        <div>
          {steps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
