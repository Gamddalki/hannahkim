import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrambleTextPlugin);

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
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
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
    font-size: 2.5rem;
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

function Home() {
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
    </Main>
  );
}

export default Home;
