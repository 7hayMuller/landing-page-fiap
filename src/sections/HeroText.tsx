"use client";

import { gsap } from "gsap";
import { useEffect } from "react";
import styles from "./HeroText.module.scss";

export default function HeroText() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      `.${styles.line1}`,
      { y: "2rem", opacity: 0 },
      { y: "0rem", opacity: 1, duration: 1 }
    );

    tl.fromTo(
      `.${styles.line2}`,
      { y: "2rem", opacity: 0 },
      { y: "0rem", opacity: 1, duration: 1 }
    );

    tl.fromTo(
      `.${styles.backText}`,
      { y: "2rem", opacity: 0 },
      { y: "0rem", opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <span className={styles.backText}>SOBRE</span>
        <div className={styles.front}>
          <h2 className={styles.line1}>A Melhor Faculdade</h2>
          <h2 className={styles.line2}>de Tecnologia</h2>
        </div>
      </div>
    </div>
  );
}
