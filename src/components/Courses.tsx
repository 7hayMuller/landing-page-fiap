"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import styles from "./Courses.module.scss";

type TabKey = "tecnologia" | "inovacao" | "negocios";

const COURSES: Record<TabKey, string[]> = {
  tecnologia: [
    "Big Data Ecosystem — REMOTO • LIVE",
    "Creating Dashboards for BI — REMOTO • LIVE • MULTIMÍDIA",
    "Big Data Science - Machine Learning & Data Mining — REMOTO • LIVE",
    "Storytelling — REMOTO • LIVE • MULTIMÍDIA",
  ],
  inovacao: [
    "Design Thinking — REMOTO • LIVE",
    "Prototipagem Rápida — REMOTO • LIVE",
    "Criatividade Aplicada — REMOTO • LIVE",
  ],
  negocios: [
    "Gestão Ágil — REMOTO • LIVE",
    "Liderança Estratégica — REMOTO • LIVE • MULTIMÍDIA",
    "Finanças Corporativas — REMOTO • LIVE",
  ],
};

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // roda logo no início
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("tecnologia");
  const [openSections, setOpenSections] = useState<Record<TabKey, boolean>>({
    tecnologia: true,
    inovacao: false,
    negocios: false,
  });

  const contentRef = useRef<HTMLDivElement | null>(null);
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (contentRef.current && !isMobileOrTablet) {
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [isMobileOrTablet]);

  // alternar accordion no mobile
  const toggleSection = (tab: TabKey) => {
    setOpenSections((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <section className={styles.coursesSection}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Cursos</h2>
          <p className={styles.subtitle}>Cursos de Curta Duração</p>
        </div>

        {/* Desktop: tabs */}
        {!isMobileOrTablet && (
          <nav className={styles.tabs}>
            {(["tecnologia", "inovacao", "negocios"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.active : ""
                }`}
                type="button"
                onMouseEnter={() => setActiveTab(tab)}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Conteúdo */}
      {!isMobileOrTablet ? (
        <div className={styles.content} ref={contentRef}>
          <h2>{activeTab.toUpperCase()}</h2>
          <ul className={styles.list}>
            {COURSES[activeTab].map((course) => (
              <li key={course} className={styles.item}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.accordion}>
          {(["tecnologia", "inovacao", "negocios"] as TabKey[]).map((tab) => (
            <div key={tab} className={styles.accordionSection}>
              <button
                type="button"
                className={styles.accordionHeader}
                onClick={() => toggleSection(tab)}
              >
                {tab.toUpperCase()}
                <span
                  className={`${styles.icon} ${
                    openSections[tab] ? styles.active : ""
                  }`}
                >
                  {openSections[tab] ? "−" : "+"}
                </span>
              </button>
              {openSections[tab] && (
                <ul className={styles.list}>
                  {COURSES[tab].map((course) => (
                    <li key={course} className={styles.item}>
                      {course}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
