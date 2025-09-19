import React, { useEffect, useRef, memo, useCallback } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import ScrollIndicator from "../Components/ScrollIndicator";
import OptimizedThumbnail from "../Components/OptimizedThumbnail";
import { useDataProcessing } from "../hooks/useDataProcessing";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(ScrollTrigger);

/* Main Text Animation */
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
  transform: translateZ(0); /*Activate GPU acceleration*/
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
  transform: translateZ(0); /* Activate GPU acceleration */
`;

/* Selected Works Section */
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
    padding: 5rem 0 1rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 1.5rem 0 1rem 0;
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
  transform: translateZ(0); /* Activate GPU acceleration */

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

/* More Works Section */
const MoreWorksSection = styled.section`
  width: 100%;
  height: 60vh;
  padding: 0 280px 200px 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0); /* Activate GPU acceleration */

  @media (max-width: 1024px) {
    height: 50vh;
    padding: 0 50px 200px 50px;
  }
  @media (max-width: 768px) {
    height: 70vh;
    padding: 0 30px 100px 30px;
  }
`;

const MoreWorksGrid = styled.div`
  display: flex;
  gap: 2rem;
  height: 40%;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 3vh;
  will-change: transform;
  transform: translateZ(0); /* Activate GPU acceleration */

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const MoreWorkCard = styled.div`
  flex: 1;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.text};
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ease;
  will-change: transform;
  transform: translateZ(0); /* Activate GPU acceleration */

  &:hover {
    transform: scale(1.02) translateZ(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MoreWorkTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  padding: 0 1rem;
  color: white;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Home = memo(() => {
  const navigate = useNavigate();
  const { selectedWorks, moreWorks } = useDataProcessing();
  const { selectedWorksRef, projectsContainerRef } =
    useHorizontalScroll(selectedWorks);

  const fromLettersRef = useRef([]);
  const personalStoryLettersRef = useRef(null);
  const toLettersRef = useRef([]);
  const sharedLettersRef = useRef([]);
  const pulseWordRef = useRef(null);

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
        <ScrollIndicator />
      </Main>

      <div>
        <SelectedWorksSection ref={selectedWorksRef}>
          <SectionTitle>Selected Works</SectionTitle>
          <HorizontalScrollContainer>
            <ProjectsContainer ref={projectsContainerRef}>
              {selectedWorks.map((work, index) => (
                <ProjectCard
                  key={work.id}
                  onClick={() => navigate(`/${work.category}/${work.id}`)}
                  data-more-hover
                >
                  <ProjectThumbnail>
                    <OptimizedThumbnail
                      src={`${process.env.PUBLIC_URL}${work.thumbnail}`}
                      alt={work.title}
                      priority={index < 2} // 첫 2개 이미지는 우선 로딩
                      layout="cover"
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

      <MoreWorksSection>
        <SectionTitle>More Works of...</SectionTitle>
        <MoreWorksGrid>
          {moreWorks.map((work, index) => (
            <MoreWorkCard
              data-more-hover
              key={work.id}
              onClick={() => navigate(`/${work.categoryDisplayName}`)}
            >
              <OptimizedThumbnail
                src={`${process.env.PUBLIC_URL}${work.thumbnail}`}
                alt={work.title}
                priority={index < 2} // 첫 2개는 우선 로딩
                layout="cover"
              />
              <ProjectInfo>
                <MoreWorkTitle>{work.categoryDisplayName}</MoreWorkTitle>
              </ProjectInfo>
            </MoreWorkCard>
          ))}
        </MoreWorksGrid>
      </MoreWorksSection>
    </>
  );
});

Home.displayName = "Home";

export default Home;
