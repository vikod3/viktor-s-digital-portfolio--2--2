import { Suspense, lazy, useRef, useEffect, useState, useCallback } from "react";
import type { Application } from "@splinetool/runtime";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { ProcessSection } from "./ProcessSection";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { Navbar } from "./Navbar";

const Spline = lazy(() => import("@splinetool/react-spline"));

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getSplineTransform(p: number) {
  if (p < 0.25) return { x: 28, y: 0, s: 1.1 };
  if (p < 0.38) {
    const t = (p - 0.25) / 0.13;
    return { x: lerp(28, -30, t), y: lerp(0, -2, t), s: lerp(1.1, 1.05, t) };
  }
  if (p < 0.55) return { x: -30, y: -2, s: 1.05 };
  if (p < 0.68) {
    const t = (p - 0.55) / 0.13;
    return { x: lerp(-30, 30, t), y: lerp(-2, 0, t), s: lerp(1.05, 1.1, t) };
  }
  return { x: 30, y: 0, s: 1.1 };
}

export function ProjectPage() {
  const splineRef = useRef<Application | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tf, setTf] = useState({ x: 28, y: 0, s: 1.1 });

  const onSplineLoad = useCallback((app: Application) => {
    splineRef.current = app;
  }, []);

  useEffect(() => {
    let rafId: number;
    let last = -1;

    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (Math.abs(p - last) < 0.001) return;
        last = p;

        setTf(getSplineTransform(p));

        const app = splineRef.current;
        if (app) {
          const objs = app.getAllObjects();
          if (objs.length > 0) {
            objs[0].rotation.y = p * Math.PI * 2;
            objs[0].rotation.x = Math.sin(p * Math.PI) * 0.2;
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
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({ left: 0, top: e.deltaY, behavior: "instant" });
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      window.scrollBy({ left: 0, top: dy, behavior: "instant" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const interactiveChildren = "[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto";

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black overflow-x-hidden relative">
      <ScrollProgressBar />

      <div
        ref={wrapperRef}
        className="fixed inset-0 z-20"
        style={{
          transform: `translateX(${tf.x}%) translateY(${tf.y}%) scale(${tf.s})`,
          willChange: "transform, opacity",
          transition: "opacity 0.15s ease-out",
        }}
      >
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline
            scene="https://prod.spline.design/PIgTjpRFA03yfLyK/scene.splinecode"
            onLoad={onSplineLoad}
          />
        </Suspense>
      </div>

      <Navbar />

      <div className={`relative z-10 pointer-events-none ${interactiveChildren}`}>
        <HeroSection />
      </div>

      <div className={`relative z-30 pointer-events-none ${interactiveChildren}`}>
        <FeaturesSection />
        <ProcessSection />
      </div>
    </div>
  );
}
