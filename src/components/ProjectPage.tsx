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

function getSplineTransform(scrollProgress: number): SplineTransform {
  if (scrollProgress < 0.15) {
    return { translateX: 15, translateY: 0, scale: 1, opacity: 1 };
  }
  if (scrollProgress < 0.35) {
    const t = (scrollProgress - 0.15) / 0.2;
    return {
      translateX: 15 - t * 45,
      translateY: t * -5,
      scale: 1 + t * 0.15,
      opacity: 1,
    };
  }
  if (scrollProgress < 0.55) {
    const t = (scrollProgress - 0.35) / 0.2;
    return {
      translateX: -30 + t * 60,
      translateY: -5 + t * 10,
      scale: 1.15 - t * 0.3,
      opacity: 1 - t * 0.3,
    };
  }
  if (scrollProgress < 0.75) {
    const t = (scrollProgress - 0.55) / 0.2;
    return {
      translateX: 30 - t * 30,
      translateY: 5 - t * 5,
      scale: 0.85 + t * 0.25,
      opacity: 0.7 + t * 0.3,
    };
  }
  const t = (scrollProgress - 0.75) / 0.25;
  return {
    translateX: 0,
    translateY: t * -10,
    scale: 1.1 - t * 0.1,
    opacity: 1 - t * 0.6,
  };
}

export const ProjectPage: React.FC = () => {
  const splineRef = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [splineTransform, setSplineTransform] = useState<SplineTransform>({
    translateX: 15,
    translateY: 0,
    scale: 1,
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
            mainObj.rotation.y = scrollProgress * Math.PI * 1.5;
            mainObj.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.15;
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
        className="fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          transform: `translateX(${splineTransform.translateX}%) translateY(${splineTransform.translateY}%) scale(${splineTransform.scale})`,
          opacity: splineTransform.opacity,
          willChange: "transform, opacity",
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
