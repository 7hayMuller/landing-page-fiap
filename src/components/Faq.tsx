"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import styles from "./Faq.module.scss";

type FAQ = {
  question: string;
  answer: string;
};

const FAQS: FAQ[] = [
  {
    question: "QUANDO POSSO ME MATRICULAR?",
    answer: "As matrículas estão abertas o ano todo, conforme disponibilidade.",
  },
  {
    question: "QUAL A DURAÇÃO DOS CURSOS?",
    answer:
      "Cada curso tem carga horária específica, variando de semanas a meses.",
  },
  {
    question: "POSSO FAZER DOIS OU MAIS CURSOS AO MESMO TEMPO?",
    answer:
      "Sim. Apenas atente-se às datas, elas devem ser diferentes, porque cada curso tem sua dinâmica.",
  },
  {
    question: "PRECISO LEVAR ALGUM MATERIAL PARA AS AULAS?",
    answer: "Não. Todo o material necessário será fornecido.",
  },
  {
    question: "QUAIS OS PRÉ-REQUISITOS?",
    answer:
      "Conteúdos em vídeos, podcasts, PDFs e quizzes que garantem uma jornada de aprendizado leve e engajadora.",
  },
  {
    question: "VOU RECEBER CERTIFICADO DE CONCLUSÃO DE CURSO?",
    answer: "Sim, todos os cursos dão direito a certificado reconhecido.",
  },
];

/** Hook simples para detectar mobile por largura */
function useIsMobile(max = 767) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${max}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [max]);
  return isMobile;
}

export default function FaqSection() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile(767);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      FAQS.forEach((_, i) => {
        const answerSel = `.answer-${i}`;
        const barSel = `.bar-${i}`;

        const opened = active === i;

        gsap.to(answerSel, {
          opacity: opened ? 1 : 0,
          height: opened ? "auto" : 0,
          duration: opened ? 0.5 : 0.35,
          ease: opened ? "power2.out" : "power2.in",
        });

        gsap.to(barSel, {
          width: opened ? "100%" : "40px",
          backgroundColor: opened ? "#e91e63" : "#666",
          duration: 0.35,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section className={styles.faqSection} ref={containerRef}>
      <h2 className={styles.title}>FAQ</h2>
      <p className={styles.subtitle}>Dúvidas Frequentes</p>

      <div className={styles.grid}>
        {FAQS.map((faq, i) => (
          <button
            key={faq.question}
            type="button"
            className={`${styles.card} ${active === i ? styles.active : ""}`}
            // Desktop/Tablet → hover abre e leave fecha
            onMouseEnter={!isMobile ? () => setActive(i) : undefined}
            onMouseLeave={!isMobile ? () => setActive(null) : undefined}
            // Mobile → clique para alternar
            onClick={
              isMobile ? () => setActive(active === i ? null : i) : undefined
            }
          >
            <div className={`${styles.bar} bar-${i}`} />
            <h3 className={styles.question}>{faq.question}</h3>
            <div className={`${styles.answer} answer-${i}`}>
              <p>{faq.answer}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
