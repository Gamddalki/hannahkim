import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "../data/projects.json";
import researchesData from "../data/researches.json";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;
  padding: 0 300px;

  @media (max-width: 1024px) {
    padding: 0 50px;
  }

  @media (max-width: 480px) {
    padding: 0 30px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  gap: 2rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  gap: 2rem;
`;

const LeftText = styled.h1`
  text-align: left;
  margin: 0;
  align-self: flex-start;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
    line-height: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    line-height: 0.5rem;
  }
`;

const RightText = styled.h1`
  text-align: right;
  margin: 0;
  align-self: flex-end;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  line-height: inherit;
  will-change: opacity;
`;

const ScrambleText = styled.span`
  display: inline-block;
  opacity: 1;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  line-height: inherit;
  will-change: transform, opacity;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.7;
  animation: bounce 2s infinite;
  z-index: 10;
  align-items: center;
  display: flex;
  flex-direction: column;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    bottom: 30px;
    font-size: 0.8rem;
  }
`;

const SelectedWorksSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.text};
  padding: 5rem 0 1.5rem 0;
  text-align: center;
  z-index: 2;
  position: relative;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 2rem 0 1.5rem 0;
  }
`;

const HorizontalScrollContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 65vh;
  }

  @media (max-width: 480px) {
    height: 60vh;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  gap: 3rem;
  height: 100%;
  align-items: center;
  padding: 0 2rem;
  will-change: transform;

  @media (max-width: 1024px) {
    gap: 2rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const ProjectCard = styled.div`
  flex-shrink: 0;
  width: 900px;
  height: 90%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  border: 1px solid ${(props) => props.theme.colors.text};

  &:hover {
    transform: scale(1.02);

    img {
      filter: none;
    }
  }

  @media (max-width: 1024px) {
    width: 640px;
  }

  @media (max-width: 768px) {
    width: 560px;
  }

  @media (max-width: 480px) {
    width: 350px;
  }
`;

const ProjectThumbnail = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(95%) hue-rotate(-30deg) saturate(3);
    transition: filter 0.3s ease;
    @media (max-width: 768px) {
      filter: none;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const ProjectInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  color: white;
  z-index: 1;
  text-align: center;
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  color: white;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ProjectSubtitle = styled.p`
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.3;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

function Home() {
  const fromLettersRef = useRef([]);
  const personalStoryLettersRef = useRef(null);
  const toLettersRef = useRef([]);
  const sharedLettersRef = useRef([]);
  const pulseWordRef = useRef(null);
  const selectedWorksRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const selectedProjects = projectsData.filter((project) => project.selected);
  const selectedResearches = researchesData.filter(
    (research) => research.selected
  );
  const selectedWorks = [...selectedProjects, ...selectedResearches];

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        tl.kill();
      },
    });

    const allLetters = [
      ...(fromLettersRef.current || []),
      ...(toLettersRef.current || []),
      ...(sharedLettersRef.current || []),
    ].filter(Boolean);

    gsap.set([allLetters, pulseWordRef.current], {
      opacity: 0,
    });

    tl.to(fromLettersRef.current, {
      opacity: 1,
      duration: 0.25,
      stagger: 0.05,
    })
      .to(personalStoryLettersRef.current, {
        scrambleText: {
          text: "Personal Story",
          chars: "lowerCase",
          speed: 0.3,
        },
        duration: 2,
        ease: "none",
      })
      .to(toLettersRef.current, {
        opacity: 1,
        duration: 0.12,
        stagger: 0.05,
      })
      .to(sharedLettersRef.current, {
        opacity: 1,
        duration: 0.12,
        stagger: 0.05,
      })
      .to(pulseWordRef.current, {
        opacity: 1,
        scale: 0.9,
        duration: 0.4,
      })
      .to(pulseWordRef.current, {
        scale: 1,
        duration: 0.3,
      });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!selectedWorksRef.current || !projectsContainerRef.current) return;

    const container = selectedWorksRef.current;
    const projectsContainer = projectsContainerRef.current;

    const getCardWidth = () => {
      if (window.innerWidth <= 480) return 350;
      if (window.innerWidth <= 768) return 560;
      if (window.innerWidth <= 1024) return 640;
      return 900;
    };

    const getGap = () => {
      if (window.innerWidth <= 768) return 24;
      if (window.innerWidth <= 1024) return 32;
      return 48;
    };

    const cardWidth = getCardWidth();
    const gap = getGap();
    const totalWidth =
      selectedWorks.length * cardWidth + (selectedWorks.length - 1) * gap;

    gsap.set(projectsContainer, {
      x: 0,
      width: totalWidth,
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentCardWidth = getCardWidth();
        const currentGap = getGap();
        const currentTotalWidth =
          selectedWorks.length * currentCardWidth +
          (selectedWorks.length - 1) * currentGap;
        const maxScroll = currentTotalWidth - window.innerWidth;
        const x = -maxScroll * progress;
        gsap.set(projectsContainer, {
          x,
          ease: "power2.out",
        });
      },
    });

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newCardWidth = getCardWidth();
        const newGap = getGap();
        const newTotalWidth =
          selectedWorks.length * newCardWidth +
          (selectedWorks.length - 1) * newGap;

        gsap.set(projectsContainer, {
          width: newTotalWidth,
        });

        scrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      scrollTrigger.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedWorks.length]);

  return (
    <>
      <Main>
        <ContentContainer>
          <TextContainer>
            <LeftText>
              {Array.from("From").map((letter, index) => (
                <Letter
                  key={index}
                  ref={(el) => (fromLettersRef.current[index] = el)}
                >
                  {letter}
                </Letter>
              ))}{" "}
              <ScrambleText ref={personalStoryLettersRef}></ScrambleText>
            </LeftText>

            <RightText>
              {Array.from("To").map((letter, index) => (
                <Letter
                  key={index}
                  ref={(el) => (toLettersRef.current[index] = el)}
                >
                  {letter}
                </Letter>
              ))}{" "}
              {Array.from("Shared").map((letter, index) => (
                <Letter
                  key={index}
                  ref={(el) => (sharedLettersRef.current[index] = el)}
                >
                  {letter}
                </Letter>
              ))}{" "}
              <ScrambleText ref={pulseWordRef}>Pulse</ScrambleText>
            </RightText>
          </TextContainer>
        </ContentContainer>
        <ScrollIndicator>
          <span>Scroll for more</span>
          <span>|</span>
        </ScrollIndicator>
      </Main>
      <div>
        <SelectedWorksSection ref={selectedWorksRef}>
          <SectionTitle>Selected Works</SectionTitle>
          <HorizontalScrollContainer>
            <ProjectsContainer ref={projectsContainerRef}>
              {selectedWorks.map((work) => (
                <ProjectCard key={work.id} data-more-hover>
                  <ProjectThumbnail>
                    <img
                      src={`${process.env.PUBLIC_URL}${work.thumbnail}`}
                      alt={work.title}
                    />
                  </ProjectThumbnail>
                  <ProjectInfo>
                    <ProjectTitle>{work.title}</ProjectTitle>
                    <ProjectSubtitle>{work.subtitle}</ProjectSubtitle>
                  </ProjectInfo>
                </ProjectCard>
              ))}
            </ProjectsContainer>
          </HorizontalScrollContainer>
        </SelectedWorksSection>
      </div>
    </>
  );
}

export default Home;
