import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Stats", href: "#stats" },
];

function smoothScroll(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScroll(href);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto ${
        scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-[72px]">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="text-white font-display text-sm md:text-base tracking-[0.15em] uppercase hover:text-white/80 transition-colors"
        >
          Automation
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="text-[11px] font-mono tracking-[0.15em] uppercase text-black bg-white px-5 py-2 rounded-full hover:bg-white/90 transition-colors duration-300"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/[0.06]"
        >
          <div className="px-5 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-xs font-mono tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#hero"
              onClick={(e) => handleClick(e, "#hero")}
              className="text-xs font-mono tracking-[0.15em] uppercase text-black bg-white px-5 py-2.5 rounded-full text-center hover:bg-white/90 transition-colors mt-2"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
