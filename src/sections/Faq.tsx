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
    answer:
      "Você pode se matricular em qualquer dia e hora, basta acessar a página do curso e se inscrever.",
  },
  {
    question: "QUAL A DURAÇÃO DOS CURSOS?",
    answer: "De 6 a 42 horas.",
  },
  {
    question: "POSSO FAZER DOIS OU MAIS CURSOS AO MESMO TEMPO?",
    answer:
      "Sim. Apenas atente-se às datas, elas devem ser diferentes, porque cada curso tem sua dinâmica",
  },
  {
    question: "PRECISO LEVAR ALGUM MATERIAL PARA AS AULAS?",
    answer:
      "Não. Os materiais utilizados em sala de aula são fornecidos pela FIAP e as aulas mais técnicas são realizadas em nossos próprios laboratórios. Sugerimos somente que traga o que preferir para suas anotações.",
  },
  {
    question: "QUAIS OS PRÉ-REQUISITOS?",
    answer:
      "Cada curso tem seus pré-requisitos descritos na própria página. Identifique-os, para que você obtenha um melhor aproveitamento do seu SHIFT.",
  },
  {
    question: "VOU RECEBER CERTIFICADO DE CONCLUSÃO DE CURSO?",
    answer:
      "Sim. Ao cumprir pelo menos 75% da carga horária do curso, você receberá um Certificado Digital, que poderá ser acessado na plataforma.",
  },
];

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
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>FAQ</h2>
          <p className={styles.subtitle}>Dúvidas Frequentes</p>
        </div>
      </div>

      <div className={styles.grid}>
        {FAQS.map((faq, i) => (
          <button
            key={faq.question}
            type="button"
            className={`${styles.card} ${active === i ? styles.active : ""}`}
            onMouseEnter={!isMobile ? () => setActive(i) : undefined}
            onMouseLeave={!isMobile ? () => setActive(null) : undefined}
            onClick={
              isMobile ? () => setActive(active === i ? null : i) : undefined
            }
          >
            <div className={`${styles.bar} bar-${i}`} />
            <h3
              className={`${styles.question} ${
                active === i ? styles.questionActive : ""
              }`}
            >
              {faq.question}
            </h3>
            <div className={`${styles.answer} answer-${i}`}>
              <p>{faq.answer}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
