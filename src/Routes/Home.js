import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import HomeBerry from "../img/HomeBerry.svg";
import aboutBg from "../img/about.JPG";
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
    props.bgUrl ? `url(${props.bgUrl}) center/cover no-repeat` : "#FDFFF5"};
  padding: 0 300px;
`;

const VerticalTextLeft = styled.h5`
  writing-mode: vertical-rl;
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
`;

const VerticalTextRight = styled.h5`
  writing-mode: vertical-lr;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
`;

const CircleText = styled.div`
  height: clamp(40px, 4vw, 60px);
  width: clamp(200px, 20vw, 300px);
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px;
  span {
    font-family: "NewYorkRegular", -apple-system, sans-serif;
    font-size: clamp(17px, 2vw, 23px);
    font-style: italic;
    margin-top: 0 !important;
  }
`;

const TypoWrapper = styled.div`
  width: 80%;
  max-width: 900px;
  position: absolute;
  top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-family: "Paperlogy-4Regular", -apple-system, sans-serif;
    text-align: center;
    font-size: clamp(20px, 5vw, 30px);
    line-height: clamp(32px, 5.2vw, 45px);
    font-weight: bold;
    span {
      font-size: clamp(30px, 5vw, 40px);
      line-height: clamp(32px, 5.2vw, 45px);
      display: inline;
    }
  }
  span {
    font-style: italic;
    margin-top: 40px;
  }
  img {
    width: clamp(150px, 23vw, 300px);
  }
`;

const Highlight = styled.span`
  font-family: "NewYorkRegular", -apple-system, sans-serif;
  font-weight: bold;
  margin-right: 4px;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

const TechFont = styled.span`
  font-family: "Paperlogy-8ExtraBold", -apple-system, sans-serif;
  font-size: clamp(25px, 4vw, 35px) !important;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

const Emphasize = styled.span`
  font-weight: bold;
  font-family: "Newsreader", -apple-system, sans-serif;
`;

const LeftTextWrapper = styled.div`
  text-align: left;
  width: 100%;
  a {
    display: block;
    margin: 20px;
    color: ${(props) => props.theme.colors.primary};
    &:hover {
      color: ${(props) => props.theme.colors.hover};
    }
  }
`;

const RightTextWrapper = styled.div`
  text-align: right;
  width: 100%;
  a {
    font-family: "NewYorkRegular", -apple-system, sans-serif;
    color: ${(props) => props.theme.colors.primary};
    line-height: 40px;
    font-size: 30px;
    font-weight: bold;
    display: block;
    margin: 20px;
    &:hover {
      color: ${(props) => props.theme.colors.hover};
    }
  }
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
  margin: 40px;
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
  background: ${(props) => props.theme.colors.thumbnail};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const ContactWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const OvalImg = styled.div`
  height: 250px;
  width: 200px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-right: 30px;
  img {
    object-fit: cover;
    height: 100%;
  }
`;

const Text = styled.div`
  min-width: 450px;
  width: 85%;
  div {
    margin: 50px 0;
  }
`;

function Home() {
  const nav = useNavigate();
  const [showHeader, setShowHeader] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight * 0.8) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {showHeader && <Header />}
      <Section id="home">
        <TypoWrapper>
          <img src={HomeBerry} alt="Main Icon"></img>
          <h1>
            <Highlight>Hannah</Highlight> is a <Highlight>researcher</Highlight>{" "}
            and <Highlight>designer</Highlight>
            <br /> passionate about creating{" "}
            <Emphasize>immersive user experiences</Emphasize> <br />
            that blend <TechFont>technology</TechFont>,{" "}
            <TechFont>storytelling</TechFont>,<br />
            and <TechFont>human computer interaction</TechFont>
          </h1>

          <LeftTextWrapper>
            <span>
              I AM INTERESTED IN IMMERSIVE PERFORMANCE TECHNOLOGY,
              <br />
              AI-DRIVEN INTERACTION, AND DATA-DRIVEN UX
              <br />
              FOR ENHANCING USER EXPERIENCES
              <br />
              IN LIVE PERFORMANCES AND DIGITAL MEDIA.
            </span>
          </LeftTextWrapper>
          <RightTextWrapper>
            <span>
              I AIM TO CREATE SEAMLESS, INTERACTIVE,
              <br />
              AND PERSONALIZED EXPERIENCES
              <br />
              IN ENTERTAINMENT, DIGITAL MEDIA, AND BEYOND.
            </span>
          </RightTextWrapper>
          <CircleText>
            <span>Glad to have you here</span>
          </CircleText>
        </TypoWrapper>
        <VerticalTextLeft>Exploring HCI & UX</VerticalTextLeft>
        <VerticalTextRight>
          Currently B.S. student @ Ewha Womans University
        </VerticalTextRight>
      </Section>
      <Section id="project" secHeight="1000px">
        <ContentsWrapper className="contents-wrapper">
          <GalleryTitle>PROJECTS</GalleryTitle>
          <Gallery>
            {sortedProjectData.map((project) => (
              <Thumbnail
                key={project.id}
                bgImg={project.thumbnail}
                onClick={() => nav(`/project/${project.id}`)}
              >
                <TitleOverlay>
                  <h5>{project.title}</h5>
                  <span>{project.subtitle}</span>
                </TitleOverlay>
              </Thumbnail>
            ))}
          </Gallery>
        </ContentsWrapper>
      </Section>
      <Section id="research" secHeight="500px">
        <ContentsWrapper className="contents-wrapper">
          <GalleryTitle>RESEARCHES</GalleryTitle>
          <Gallery>
            {researchData.map((research) => (
              <Thumbnail
                key={research.id}
                bgImg={research.thumbnail}
                onClick={() => nav(`/research/${research.id}`)}
              >
                <TitleOverlay>
                  <h5>{research.title}</h5>
                  <span>{research.subtitle}</span>
                </TitleOverlay>
              </Thumbnail>
            ))}
          </Gallery>
        </ContentsWrapper>
      </Section>
      <Section id="contact" secHeight="400px">
        <ContentsWrapper className="contents-wrapper">
          <ContactWrapper>
            <OvalImg>
              <img src={aboutBg} alt="Profile" />
            </OvalImg>

            <Text>
              <LeftTextWrapper>
                <h1>Let's create something amazing!</h1>
                <a href="mailto:hanahk01@ewha.ac.kr">hanahk01@ewha.ac.kr</a>
              </LeftTextWrapper>
              <RightTextWrapper>
                <a
                  href="https://drive.google.com/file/d/1ES03UN2SNawUAEug7f3tjniFzFf3jFJk/view?usp=drive_link"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Unfold my journey ↗
                </a>
              </RightTextWrapper>
            </Text>
          </ContactWrapper>
        </ContentsWrapper>
      </Section>
    </>
  );
}

export default Home;
