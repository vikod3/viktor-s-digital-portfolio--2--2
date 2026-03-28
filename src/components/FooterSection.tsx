import React from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Documentation", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Status", href: "#" },
];

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
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-extralight uppercase tracking-tight text-white mb-3">
                Automation<br />Machines
              </h2>
              <p className="text-xs text-white/40 font-light max-w-xs leading-relaxed">
                Engineering the future of web infrastructure. Built by developers, for developers.
              </p>
            </div>

            <div className="flex flex-col gap-3 pointer-events-auto">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors duration-300"
                >
                  <span className="font-mono tracking-wider">{link.label}</span>
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>

            <div className="pointer-events-auto">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 block mb-4">
                Connect
              </span>
              <div className="flex gap-3">
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
          </div>

          <div className="mt-16 pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] font-mono tracking-wider text-white/20">
              &copy; 2026 Automation Machines. All systems operational.
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
