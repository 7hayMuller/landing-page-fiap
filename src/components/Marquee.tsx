"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import styles from "./Marquee.module.scss";

type MarqueeProps = {
  text: string;
  direction?: "left" | "right";
  speed?: number;
};

export default function Marquee({
  text,
  direction = "left",
  speed = 50,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const init = () => {
      const contentWidth = track.scrollWidth / 2;
      if (!contentWidth) return;

      const duration = contentWidth / speed;

      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });

      const wrapX = gsap.utils.wrap(-contentWidth, 0);

      gsap.to(track, {
        x: direction === "left" ? -contentWidth : contentWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => `${wrapX(parseFloat(x))}px`,
        },
      });
    };

    const doc = document as Document & { fonts?: FontFaceSet };
    if (doc.fonts?.ready) {
      doc.fonts.ready.then(init);
    } else {
      requestAnimationFrame(init);
    }

    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      gsap.killTweensOf(track);
    };
  }, [direction, speed]);

  const repeated = Array.from({ length: 50 }, (_) => (
    <div key={crypto.randomUUID()} className={styles.block}>
      <span>{text}</span>
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.marquee}>
        <div ref={trackRef} className={styles.track}>
          {repeated}
          {repeated}
        </div>
      </div>
    </div>
  );
}
