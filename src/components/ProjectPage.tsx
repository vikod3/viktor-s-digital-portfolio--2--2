import React, { Suspense, lazy, useRef, useEffect, useState, useCallback } from "react";
import type { Application } from "@splinetool/runtime";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { ProcessSection } from "./ProcessSection";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { Navbar } from "./Navbar";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineTransform {
  translateX: number;
  translateY: number;
  scale: number;
  opacity: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function getSplineTransform(scrollProgress: number): SplineTransform {
  // Hero (0 - 0.25): Spline on the RIGHT, large
  if (scrollProgress < 0.25) {
    return { translateX: 28, translateY: 0, scale: 1.1, opacity: 1 };
  }
  // Hero -> Features (0.25 - 0.38): Slide RIGHT to LEFT
  if (scrollProgress < 0.38) {
    const t = (scrollProgress - 0.25) / 0.13;
    return {
      translateX: lerp(28, -30, t),
      translateY: lerp(0, -2, t),
      scale: lerp(1.1, 1.05, t),
      opacity: 1,
    };
  }
  // Features (0.38 - 0.55): Hold LEFT, large
  if (scrollProgress < 0.55) {
    return { translateX: -30, translateY: -2, scale: 1.05, opacity: 1 };
  }
  // Features -> Process (0.55 - 0.68): Slide LEFT to RIGHT
  if (scrollProgress < 0.68) {
    const t = (scrollProgress - 0.55) / 0.13;
    return {
      translateX: lerp(-30, 30, t),
      translateY: lerp(-2, 0, t),
      scale: lerp(1.05, 1.1, t),
      opacity: 1,
    };
  }
  // Process (0.68 - 1.0): Hold RIGHT, large
  return { translateX: 30, translateY: 0, scale: 1.1, opacity: 1 };
}

export const ProjectPage: React.FC = () => {
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineWrapperRef = useRef<HTMLDivElement>(null);
  const [splineTransform, setSplineTransform] = useState<SplineTransform>({
    translateX: 28,
    translateY: 0,
    scale: 1.1,
    opacity: 1,
  });

  const handleSplineLoad = useCallback((splineApp: Application) => {
    splineRef.current = splineApp;
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastProgress = -1;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;

        if (Math.abs(scrollProgress - lastProgress) < 0.001) return;
        lastProgress = scrollProgress;

        setSplineTransform(getSplineTransform(scrollProgress));

        if (splineRef.current) {
          const allObjects = splineRef.current.getAllObjects();
          if (allObjects.length > 0) {
            const mainObj = allObjects[0];
            mainObj.rotation.y = scrollProgress * Math.PI * 2;
            mainObj.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const wrapper = splineWrapperRef.current;
    if (!wrapper) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({ left: 0, top: e.deltaY, behavior: "instant" });
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      window.scrollBy({ left: 0, top: deltaY, behavior: "instant" });
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white selection:bg-white selection:text-black overflow-x-hidden relative"
    >
      <ScrollProgressBar />

      <div
        ref={splineWrapperRef}
        className="fixed inset-0 z-20"
        style={{
          transform: `translateX(${splineTransform.translateX}%) translateY(${splineTransform.translateY}%) scale(${splineTransform.scale})`,
          opacity: splineTransform.opacity,
          willChange: "transform, opacity",
          transition: "opacity 0.15s ease-out",
        }}
      >
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline
            scene="https://prod.spline.design/PIgTjpRFA03yfLyK/scene.splinecode"
            onLoad={handleSplineLoad}
          />
        </Suspense>
      </div>

      <Navbar />

      <div className="relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto">
        <HeroSection />
      </div>

      <div className="relative z-30 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto">
        <FeaturesSection />
        <ProcessSection />
      </div>
    </div>
  );
};
