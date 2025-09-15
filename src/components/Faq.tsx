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
      "Os pré-requisitos variam conforme o curso, mas não exigem formação prévia.",
  },
  {
    question: "VOU RECEBER CERTIFICADO DE CONCLUSÃO DE CURSO?",
    answer: "Sim, todos os cursos dão direito a certificado reconhecido.",
  },
];

export default function FaqSection() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      FAQS.forEach((_, i) => {
        const answerEl = `.answer-${i}`;
        const barEl = `.bar-${i}`;

        if (active === i) {
          gsap.to(answerEl, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(barEl, {
            width: "100%",
            backgroundColor: "#e91e63",
            duration: 0.4,
          });
        } else {
          gsap.to(answerEl, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
          gsap.to(barEl, {
            width: "40px",
            backgroundColor: "#666",
            duration: 0.4,
          });
        }
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
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
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
