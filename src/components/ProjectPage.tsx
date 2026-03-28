import React, { Suspense, lazy, useRef, useEffect, useState, useCallback } from "react";
import type { Application } from "@splinetool/runtime";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { ProcessSection } from "./ProcessSection";
import { StatsSection } from "./StatsSection";
import { FooterSection } from "./FooterSection";
import { ScrollProgressBar } from "./ScrollProgressBar";

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
  // Hero (0 - 0.15): Spline on the RIGHT, large
  if (scrollProgress < 0.15) {
    return { translateX: 28, translateY: 0, scale: 1.1, opacity: 1 };
  }
  // Hero -> Features (0.15 - 0.25): Slide RIGHT to LEFT, shrink
  if (scrollProgress < 0.25) {
    const t = (scrollProgress - 0.15) / 0.1;
    return {
      translateX: lerp(28, -30, t),
      translateY: lerp(0, -2, t),
      scale: lerp(1.1, 0.75, t),
      opacity: 1,
    };
  }
  // Features (0.25 - 0.38): Hold LEFT, small
  if (scrollProgress < 0.38) {
    return { translateX: -30, translateY: -2, scale: 0.75, opacity: 1 };
  }
  // Features -> Process (0.38 - 0.48): Slide LEFT to RIGHT, grow
  if (scrollProgress < 0.48) {
    const t = (scrollProgress - 0.38) / 0.1;
    return {
      translateX: lerp(-30, 30, t),
      translateY: lerp(-2, 0, t),
      scale: lerp(0.75, 1.0, t),
      opacity: 1,
    };
  }
  // Process (0.48 - 0.58): Hold RIGHT, medium
  if (scrollProgress < 0.58) {
    return { translateX: 30, translateY: 0, scale: 1.0, opacity: 1 };
  }
  // Process -> Stats (0.58 - 0.68): Slide RIGHT to LEFT, shrink
  if (scrollProgress < 0.68) {
    const t = (scrollProgress - 0.58) / 0.1;
    return {
      translateX: lerp(30, -28, t),
      translateY: lerp(0, -3, t),
      scale: lerp(1.0, 0.65, t),
      opacity: 1,
    };
  }
  // Stats (0.68 - 0.80): Hold LEFT, smallest
  if (scrollProgress < 0.80) {
    return { translateX: -28, translateY: -3, scale: 0.65, opacity: 1 };
  }
  // Stats -> Footer (0.80 - 0.90): Center + grow, fade out
  if (scrollProgress < 0.90) {
    const t = (scrollProgress - 0.80) / 0.1;
    return {
      translateX: lerp(-28, 0, t),
      translateY: lerp(-3, -5, t),
      scale: lerp(0.65, 1.2, t),
      opacity: lerp(1, 0.3, t),
    };
  }
  // Footer (0.90 - 1.0): Center, large, faded
  const t = (scrollProgress - 0.90) / 0.1;
  return {
    translateX: 0,
    translateY: lerp(-5, -8, t),
    scale: lerp(1.2, 1.3, t),
    opacity: lerp(0.3, 0, t),
  };
}

export const ProjectPage: React.FC = () => {
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={containerRef}
      className="bg-black text-white selection:bg-white selection:text-black overflow-x-hidden relative"
    >
      <ScrollProgressBar />

      <div
        className="fixed inset-0 z-0"
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

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <StatsSection />
        <FooterSection />
      </div>
    </div>
  );
};
