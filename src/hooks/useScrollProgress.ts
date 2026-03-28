import { useState, useEffect, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({
    hero: 0,
    features: 0,
    process: 0,
    stats: 0,
    footer: 0,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const totalProgress = Math.min(scrollY / docHeight, 1);
    setProgress(totalProgress);

    const vh = window.innerHeight;
    const sections = ["hero", "features", "process", "stats", "footer"] as const;
    const newSectionProgress: Record<string, number> = {};

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const sectionStart = rect.top + scrollY;
        const sectionHeight = rect.height;
        const relativeScroll = scrollY - sectionStart + vh;
        const sectionProg = Math.max(0, Math.min(relativeScroll / (sectionHeight + vh), 1));
        newSectionProgress[id] = sectionProg;
      } else {
        newSectionProgress[id] = 0;
      }
    });

    setSectionProgress(newSectionProgress as typeof sectionProgress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { progress, sectionProgress };
}
