import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import homeBg from "../img/home.jpg";
import aboutBg from "../img/about.jpg";
import projectData from "../data/projects.json";
import researchData from "../data/researches.json";

const Section = styled.section`
  height: ${(props) => props.secHeight || "100vh"};
  width: 100%;
  min-width: 820px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${(props) =>
    props.bgUrl
      ? `url(${props.bgUrl}) center/cover no-repeat`
      : props.bgColor || "#181617"};
  padding: 0 300px;
`;

const ContentsWrapper = styled.div`
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  z-index: 1;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GalleryTitle = styled.h1`
  text-align: center;
  margin: 20px;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 80%;
  min-width: 820px;
`;

const Thumbnail = styled.div`
  background: ${(props) =>
    props.bgImg ? `url(${props.bgImg}) center/cover no-repeat` : "gray"};
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`;

const TitleOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const Text = styled.div`
  min-width: 500px;
  width: 100%;
  span {
    margin: 20px;
  }
`;

const AboutText = styled(Text)`
  width: 50%;
  min-width: 400px;
  margin-left: 50%;
`;

function Home() {
  const nav = useNavigate();

  const sortedProjectData = projectData.sort((a, b) => {
    return b.startDate.localeCompare(a.startDate);
  });

  React.useEffect(() => {
    const contentsWrappers = document.querySelectorAll(".contents-wrapper");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    contentsWrappers.forEach((wrapper) => observer.observe(wrapper));
    return () =>
      contentsWrappers.forEach((wrapper) => observer.unobserve(wrapper));
  }, []);

  return (
    <>
      <Section id="home" secHeight="600px" bgUrl={homeBg}>
        <h1>On a Journey to Discover and Pursue My Passion</h1>
      </Section>
      <Section id="project" secHeight="1300px" bgColor="#045739">
        <ContentsWrapper className="contents-wrapper">
          <GalleryTitle>Projects</GalleryTitle>
          <Gallery>
            {sortedProjectData.map((project) => (
              <Thumbnail
                key={project.id}
                bgImg={project.thumbnail}
                onClick={() => nav(`/project/${project.id}`)}
              >
                <TitleOverlay>
                  <h3>{project.title}</h3>
                  <span>{project.subtitle}</span>
                </TitleOverlay>
              </Thumbnail>
            ))}
          </Gallery>
        </ContentsWrapper>
      </Section>
      <Section id="research" secHeight="700px" bgColor="#C42E2F">
        <ContentsWrapper className="contents-wrapper">
          <GalleryTitle>Researches</GalleryTitle>
          <Gallery>
            {researchData.map((research) => (
              <Thumbnail
                key={research.id}
                bgImg={research.thumbnail}
                onClick={() => nav(`/research/${research.id}`)}
              >
                <TitleOverlay>
                  <h3>{research.title}</h3>
                  <span>{research.subtitle}</span>
                </TitleOverlay>
              </Thumbnail>
            ))}
          </Gallery>
        </ContentsWrapper>
      </Section>
      <Section id="about" bgUrl={aboutBg}>
        <ContentsWrapper className="contents-wrapper">
          <AboutText>
            <h1>Hannah Kim</h1>
            <span>
              I am a multidisciplinary researcher exploring the intersection of
              technology, arts, and user experience. With a background in
              Computer Science & Engineering and Humanities, I have worked on
              interactive media, immersive technology, and AI-driven
              experiences. My academic journey includes international research
              experiences in Europe, where I studied digital media, performance
              technology, and human-computer interaction. Professionally, I have
              contributed to Edu-tech startups and research labs, focusing on
              innovative applications of AI, VR, and data-driven UX.
            </span>
            <span>
              My research interests revolve around immersive performance
              technology, AI-powered interaction, and data-driven design. I am
              particularly interested in how emerging technologies like XR,
              spatial computing, and AI can enhance storytelling and audience
              engagement. By integrating real-time data analysis and adaptive
              systems, I aim to create seamless, interactive, and personalized
              experiences in digital media, entertainment, and beyond.
            </span>
            <h2>Skills</h2>
            <span>
              HCI, Project Management, Content Development
              <br />
              Front-end: TypeScript, React
              <br />
              Back-end: Python, Node.js, MySQL, MongoDB, Firebase
              <br />
              UX/UI: Figma
              <br />
              XR: Unity, C#
            </span>
          </AboutText>
        </ContentsWrapper>
      </Section>
      <Section id="contact" secHeight="400px" bgColor="#C42E2F">
        <ContentsWrapper className="contents-wrapper">
          <Text>
            <h2>Contact</h2>
            <span>Email: hanahk01@ewha.ac.kr</span>
          </Text>
        </ContentsWrapper>
      </Section>
    </>
  );
}

export default Home;
