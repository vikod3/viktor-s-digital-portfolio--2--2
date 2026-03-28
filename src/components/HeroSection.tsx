import { motion } from "motion/react";
import { Snowflake, Maximize, Zap } from "lucide-react";

const ICONS = [Snowflake, Maximize, Zap];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 pt-20 pb-6 relative z-10 pointer-events-none"
    >
      <div className="text-center max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[44px] sm:text-[60px] md:text-[80px] leading-[1] md:leading-[0.9] font-extralight tracking-tight uppercase font-display bg-gradient-to-r from-white/20 via-white/70 to-white bg-clip-text text-transparent">
            Automation <br />
            Machines &bull;
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base text-white/70 max-w-lg mx-auto leading-relaxed font-light"
        >
          Developed with high-end skills and a pixel-perfect frame for those who
          don't just browse the web—they build it. Code your dreams....
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          {ICONS.map((Icon, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors cursor-pointer pointer-events-auto"
            >
              <Icon size={16} className="text-white/80" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
