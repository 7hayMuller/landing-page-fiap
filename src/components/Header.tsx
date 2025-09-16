"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Header.module.scss";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const bar = progressRef.current;
    if (!header || !bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;

      const p = Math.max(0, Math.min(1, scrollTop / maxScroll));
      bar.style.transform = `scaleX(${p})`;

      if (scrollTop <= 0) {
        header.classList.remove(styles.scrolled);
      } else {
        header.classList.add(styles.scrolled);
      }
    };

    const onScroll = () => requestAnimationFrame(update);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header} id="main-header">
      <div ref={progressRef} className={styles.progressBar} />
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <Image
            src="/svgs/logo-fiap.svg"
            alt="Logo"
            fill
            sizes="(max-width: 768px) 120px, (max-width: 1200px) 160px, 200px"
            className={styles.logo}
          />
        </div>
      </nav>
    </header>
  );
}
