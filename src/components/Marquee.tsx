"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import styles from "./Marquee.module.scss";

export default function Marquee({ text }: { text: string }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const init = () => {
      const totalWidth = el.scrollWidth / 2;
      gsap.set(el, { x: 0 });
      gsap.to(el, {
        x: `-=${totalWidth}`,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const v = parseFloat(x) % totalWidth;
            return v;
          }),
        },
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(init);
    } else {
      requestAnimationFrame(init);
    }

    const onResize = () => {
      gsap.killTweensOf(el);
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={marqueeRef} className={styles.track} aria-hidden>
        <div className={styles.chunk}>
          <span className={`${styles.item} ${styles.outlineText}`}>{text}</span>
        </div>
        <div className={styles.chunk}>
          <span className={`${styles.item} ${styles.outlineText}`}>{text}</span>
        </div>
      </div>
    </div>
  );
}
