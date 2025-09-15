import Image from "next/image";
import Courses from "@/components/Courses";
import Faq from "@/components/Faq";
import Header from "@/components/Header";
import HeroText from "@/components/HeroText";
import List from "@/components/List";
import Marquee from "@/components/Marquee";
import MarqueeScroll from "@/components/MarqueeScroll";
import Wave from "@/components/Wave";

export default function Home() {
  return (
    <div style={{ background: "#000" }}>
      <Header />
      <section
        id="section-1"
        className="page-section"
        style={{ height: "50vh" }}
      >
        <HeroText />
      </section>
      <section
        id="section-2"
        className="page-section"
        style={{ height: "100vh" }}
      >
        <Marquee text="CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO." />
        <Marquee text="TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO." />
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
              words={["CONHECIMENTO", "SKILLS"]}
            />
            <MarqueeScroll
              direction="right"
              italic
              words="MUITO ALÉM DOS TUTORIAIS"
            />
          </div>
        </div>
      </section>
      <section
        id="section-3"
        className="page-section"
        style={{ height: "100vh" }}
      >
        <Wave />
      </section>
      <section
        id="section-4"
        className="page-section"
        style={{ height: "100vh" }}
      >
        <Courses />
      </section>
      <section
        id="section-5"
        className="page-section"
        style={{ height: "100vh" }}
      >
        <Faq />
      </section>
      <section
        id="section-6"
        className="page-section"
        style={{ height: "100vh" }}
      >
        <List />
      </section>
    </div>
  );
}
