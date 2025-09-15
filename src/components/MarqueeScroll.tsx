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
};

export default function MarqueeScroll({
  words,
  direction,
  italic = false,
}: MarqueeScrollProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const anim = gsap.to(el, {
      xPercent: direction === "left" ? -50 : 50,
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
    const renderPhrase = () => (
      <div className={styles.group}>
        <span className={styles.item}>{words}</span>
        <span className={styles.dot}>•</span>
      </div>
    );

    return (
      <div className={styles.wrapper}>
        <div ref={marqueeRef} className={styles.track} aria-hidden>
          <div
            className={`${styles.chunk} ${styles.outlineText} ${
              italic ? styles.italic : ""
            }`}
          >
            {renderPhrase()}
            {renderPhrase()}
          </div>
        </div>
      </div>
    );
  }

  const renderWords = () =>
    words.map((word, i) => (
      <div key={typeof word === "string" ? word : i} className={styles.group}>
        <span className={styles.item}>{word}</span>
        {i < words.length - 1 && <span className={styles.dot}>•</span>}
      </div>
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
