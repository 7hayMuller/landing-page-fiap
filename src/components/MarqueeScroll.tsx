"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./MarqueeScroll.module.scss";

gsap.registerPlugin(ScrollTrigger);

type MarqueeScrollProps = {
  words: string[] | string;
  direction: "left" | "right";
  italic?: boolean;
  repeatCount?: number;
};

export default function MarqueeScroll({
  words,
  direction,
  italic = false,
  repeatCount = 4,
}: MarqueeScrollProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const anim = gsap.to(el, {
      x: direction === "left" ? "-100vw" : "100vw",
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [direction]);

  if (typeof words === "string") {
    const repeated = Array.from({ length: repeatCount }, () => words);

    const renderRepeated = () =>
      repeated.map((word, i) => (
        <span key={crypto.randomUUID()} className={styles.group}>
          <span className={styles.item}>{word}</span>
          {i < repeated.length && <span className={styles.dot}>•</span>}
        </span>
      ));

    return (
      <div className={styles.wrapper}>
        <div ref={marqueeRef} className={styles.track} aria-hidden>
          <div
            className={`${styles.chunk} ${styles.outlineText} ${
              italic ? styles.italic : ""
            }`}
          >
            {renderRepeated()}
          </div>
        </div>
      </div>
    );
  }

  const renderWords = () =>
    words.map((word, i) => (
      <span key={crypto.randomUUID()} className={styles.group}>
        <span className={styles.item}>{word}</span>
        {i < words.length && <span className={styles.dot}> • </span>}
      </span>
    ));

  return (
    <div className={styles.wrapper}>
      <div ref={marqueeRef} className={styles.track} aria-hidden>
        <div
          className={`${styles.chunk} ${styles.outlineText} ${
            italic ? styles.italic : ""
          }`}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
}
