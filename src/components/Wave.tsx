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

  const render = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = context.current;
    if (!canvas || !ctx) return;

    const img = images.current[index];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.current = canvas.getContext("2d");

    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    images.current = loadedImages;

    loadedImages[0].onload = () => render(0);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollDistance = frameCount * 20;

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
      });

      return () => st.kill();
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(0);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mm.kill();
    };
  }, [isDesktop, render]);

  if (!isDesktop) return null;

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
