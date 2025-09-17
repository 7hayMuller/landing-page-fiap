"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 192;

function currentFrame(index: number) {
  return `/imgs/water_${String(index).padStart(3, "0")}.jpg`;
}

export default function Wave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const aspectRef = useRef<number>(9 / 16);

  const render = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = context.current;
    if (!canvas || !ctx) return;

    const img = images.current[index];
    if (!img) return;

    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;

    ctx.clearRect(0, 0, cssW, cssH);

    ctx.drawImage(img, 0, 0, cssW, cssH);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const loadFrames = () => {
      const loaded: HTMLImageElement[] = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        loaded.push(img);
      }
      images.current = loaded;

      loaded[0].onload = () => {
        aspectRef.current = loaded[0].height / loaded[0].width;
        resizeCanvas();
        render(0);
      };
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = window.innerWidth;
      const cssHeight = Math.round(cssWidth * aspectRef.current);

      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.current = ctx;

      render(0);
    };

    loadFrames();

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
      const scrollDistance = frameCount * 5;
      const st = ScrollTrigger.create({
        trigger: "#section-3",
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(self.progress * frameCount)
          );
          requestAnimationFrame(() => render(frameIndex));
        },

        onRefresh: () => render(0),
      });
      return () => st.kill();
    });

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      mm.kill();
    };
  }, [isDesktop, render]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "auto",
        marginTop: -20,
        marginBottom: "8vh",
      }}
    />
  );
}
