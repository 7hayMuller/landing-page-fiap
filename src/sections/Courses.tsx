"use client";

import { gsap } from "gsap";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { TiPlusOutline } from "react-icons/ti";
import styles from "./Courses.module.scss";

type TabKey = "tecnologia" | "inovacao" | "negocios";

const COURSES: Record<TabKey, ReactNode[]> = {
  tecnologia: [
    <>
      <span>Big Data Ecosystem</span>
      <small>REMOTO • LIVE</small>
    </>,
    <>
      <span>Creating Dashboards for BI</span>
      <small>REMOTO • LIVE + MULTIMÍDIA</small>
    </>,
    <>
      <span>Big Data Science - Machine Learning & Data Mining</span>
      <small>REMOTO • LIVE</small>
    </>,
    <>
      <span>Storytelling</span>
      <small>REMOTO • LIVE + MULTIMÍDIA</small>
    </>,
  ],
  inovacao: [
    <>
      <span>UX</span>
      <small>REMOTO • LIVE</small>
    </>,
    <>
      <span>UX Writing</span>
      <small>REMOTO</small>
    </>,
    <>
      <span>Chatbots</span>
      <small>REMOTO • LIVE + MULTIMÍDIA</small>
    </>,
  ],
  negocios: [
    <>
      <span>Agile Culture</span>
      <small>LIVE</small>
    </>,
    <>
      <span>DPO Data Protection Officer</span>
      <small>REMOTO • LIVE</small>
    </>,
    <>
      <span>IT Business Partner</span>
      <small>REMOTO • LIVE + MULTIMÍDIA</small>
    </>,
    <>
      <span>Perícia Forense Computacional</span>
      <small>REMOTO • LIVE + MULTIMÍDIA</small>
    </>,
    <>
      <span>Growth Hacking</span>
      <small>REMOTO</small>
    </>,
  ],
};

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("tecnologia");

  const [openSections, setOpenSections] = useState<Record<TabKey, boolean>>({
    tecnologia: false,
    inovacao: false,
    negocios: false,
  });

  const contentRef = useRef<HTMLDivElement | null>(null);
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (!contentRef.current || isMobileOrTablet) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          autoAlpha: 0,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeTab, isMobileOrTablet]);

  const panelRefs = useRef<Record<TabKey, HTMLUListElement | null>>({
    tecnologia: null,
    inovacao: null,
    negocios: null,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: This should run only once on mount
  useEffect(() => {
    (Object.keys(panelRefs.current) as TabKey[]).forEach((tab) => {
      const el = panelRefs.current[tab];
      if (!el) return;

      if (openSections[tab]) {
        el.style.height = "auto";
        el.style.opacity = "1";
        el.style.overflow = "visible";
      } else {
        el.style.height = "0";
        el.style.opacity = "0";
        el.style.overflow = "hidden";
      }
    });
  }, []);

  const animatePanel = (tab: TabKey, opening: boolean) => {
    const el = panelRefs.current[tab];
    if (!el) return;

    gsap.killTweensOf(el);

    if (opening) {
      const h = el.scrollHeight || 0;
      gsap.fromTo(
        el,
        { height: 0, autoAlpha: 0, overflow: "hidden" },
        {
          height: h,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            el.style.height = "auto";
            el.style.overflow = "visible";
          },
        }
      );
    } else {
      const h = el.scrollHeight || 0;
      gsap.fromTo(
        el,
        { height: h, autoAlpha: 1, overflow: "hidden" },
        {
          height: 0,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power3.inOut",
        }
      );
    }
  };

  const toggleSection = (tab: TabKey) => {
    setOpenSections((prev) => {
      const opening = !prev[tab];
      animatePanel(tab, opening);
      return { ...prev, [tab]: opening };
    });
  };

  return (
    <section className={styles.coursesSection}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Cursos</h2>
          <p className={styles.subtitle}>Cursos de Curta Duração</p>
        </div>

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
                {tab === "inovacao"
                  ? "INOVAÇÃO"
                  : tab === "negocios"
                  ? "NEGÓCIOS"
                  : tab.toUpperCase()}
              </button>
            ))}
          </nav>
        )}
      </div>

      {!isMobileOrTablet ? (
        <div className={styles.content} ref={contentRef}>
          <h2 className={styles.courseTitle}>
            {activeTab === "inovacao"
              ? "Inovação"
              : activeTab === "negocios"
              ? "Negócios"
              : "Tecnologia"}
          </h2>
          <ul key={activeTab} className={styles.list}>
            {COURSES[activeTab].map((course) => (
              <li key={crypto.randomUUID()} className={styles.item}>
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
                aria-expanded={openSections[tab]}
                aria-controls={`panel-${tab}`}
              >
                {tab === "inovacao"
                  ? "INOVAÇÃO"
                  : tab === "negocios"
                  ? "NEGÓCIOS"
                  : tab.toUpperCase()}
                <span
                  className={`${styles.icon} ${
                    openSections[tab] ? styles.active : ""
                  }`}
                >
                  {openSections[tab] ? <FaMinus /> : <TiPlusOutline />}
                </span>
              </button>

              <ul
                id={`panel-${tab}`}
                ref={(el) => {
                  panelRefs.current[tab] = el;
                }}
                className={`${styles.list} ${styles.panel}`}
                data-open={openSections[tab] ? "true" : "false"}
              >
                {COURSES[tab].map((course) => (
                  <li key={crypto.randomUUID()} className={styles.item}>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
