import Image from "next/image";
import Courses from "@/components/Courses";
import Faq from "@/components/Faq";
import Header from "@/components/Header";
import HeroText from "@/components/HeroText";
import Marquee from "@/components/Marquee";
import MarqueeScroll from "@/components/MarqueeScroll";
import Wave from "@/components/Wave";

export default function Home() {
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/imgs/imagem.png"
              alt="imagem de estudantes"
              width={1495}
              height={804}
              style={{ marginTop: "50px" }}
            />
          </div>
          <div style={{ zIndex: 1, marginTop: "-100px" }}>
            <MarqueeScroll
              direction="left"
              words={[
                "CONHECIMENTO",
                "SKILLS",
                "CONHECIMENTO",
                "SKILLS",
                "CONHECIMENTO",
                "SKILLS",
              ]}
            />
            <MarqueeScroll
              direction="right"
              italic
              words={[
                "MUITO ALÉM DOS TUTORIAIS",
                "MUITO ALÉM DOS TUTORIAIS",
                "MUITO ALÉM DOS TUTORIAIS",
                "MUITO ALÉM DOS TUTORIAIS",
                "MUITO ALÉM DOS TUTORIAIS",
                "MUITO ALÉM DOS TUTORIAIS",
              ]}
            />
          </div>
        </div>
      </section>
      <div className="desktopOnly">
        <section
          id="section-3"
          style={{ margin: 0, padding: 0, width: "100vw" }}
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
