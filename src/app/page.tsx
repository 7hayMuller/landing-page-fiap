"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import MarqueeScroll from "@/components/MarqueeScroll";
import Courses from "@/sections/Courses";
import Faq from "@/sections/Faq";
import HeroText from "@/sections/HeroText";
import Wave from "@/sections/Wave";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const studentImgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (studentImgRef.current) {
      gsap.fromTo(
        studentImgRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: studentImgRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);
  return (
    <>
      <Header />
      <section id="section-1">
        <HeroText />
      </section>
      <section id="section-2">
        <Marquee
          direction="left"
          text="CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO."
        />
        <Marquee
          direction="right"
          text="TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO."
        />
        <div className="desktopOnly">
          <div
            ref={studentImgRef}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image
              src="/imgs/imagem.png"
              alt="imagem de estudantes"
              width={1495}
              height={804}
              style={{
                maxWidth: 1900,
                width: "100%",
                paddingInline: 100,
                height: "auto",
                marginTop: "50px",
              }}
            />
          </div>
          <div style={{ zIndex: 1, marginTop: "-100px" }}>
            <MarqueeScroll
              direction="left"
              words={["CONHECIMENTO", "SKILLS"]}
            />
            <MarqueeScroll
              direction="right"
              italic
              words={["MUITO ALÉM DOS TUTORIAIS"]}
            />
          </div>
        </div>
      </section>
      <div className="desktopOnly">
        <section
          id="section-3"
          style={{ margin: 0, padding: 0, width: "100vw", height: "100vh" }}
        >
          <Wave />
        </section>
      </div>
      <div className="container">
        <section id="section-4">
          <Courses />
        </section>
        <section id="section-5">
          <Faq />
        </section>
      </div>
    </>
  );
}
