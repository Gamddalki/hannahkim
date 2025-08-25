import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const lineReveal = keyframes`
  0% {
    opacity: 0;
    clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
  }
  100% {
    opacity: 1;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  margin-top: 30px;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
    margin-top: 15px;
  }
`;

const Circle = styled.img`
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
  right: 0;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  z-index: 1;

  @media (max-width: 768px) {
    width: 125px;
    height: 125px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const Line = styled.img`
  position: absolute;
  width: 179px;
  height: 171px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: ${lineReveal} 1.5s ease-in-out forwards;
  animation-delay: 1s;
  z-index: 2;

  @media (max-width: 768px) {
    width: 149px;
    height: 143px;
  }

  @media (max-width: 480px) {
    width: 119px;
    height: 114px;
  }
`;

const Fruit = styled.img`
  position: absolute;
  width: 170px;
  height: 176px;
  bottom: 0;
  left: -5%;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 2s;
  z-index: 3;

  @media (max-width: 768px) {
    width: 142px;
    height: 147px;
  }

  @media (max-width: 480px) {
    width: 113px;
    height: 117px;
  }
`;

const TechnologyText = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.content};
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 0s;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    top: -12%;
    right: -8%;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    top: -12%;
    right: -6%;
  }
`;

const StorytellingText = styled.div`
  position: absolute;
  top: 10%;
  left: -10%;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.content};
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 1s;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    top: 8%;
    left: -8%;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    top: 6%;
    left: -6%;
  }
`;

const ArtText = styled.div`
  position: absolute;
  bottom: 5%;
  left: -10%;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.content};
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 2s;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    bottom: 4%;
    left: -8%;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    bottom: 3%;
    left: -6%;
  }
`;

const TextContainer = styled.div`
  margin-top: 80px;
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 3s;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
    line-height: 1.2;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 3.5s;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

function Home() {
  return (
    <Main>
      <AnimationContainer>
        <ImageContainer>
          <Circle
            src={`${process.env.PUBLIC_URL}/circle.svg`}
            alt="Technology"
          />
          <TechnologyText>TECHNOLOGY</TechnologyText>
          <Line src={`${process.env.PUBLIC_URL}/line.svg`} alt="Storytelling" />
          <StorytellingText>STORYTELLING</StorytellingText>
          <Fruit src={`${process.env.PUBLIC_URL}/fabicon.svg`} alt="Art" />
          <ArtText>ART</ArtText>
        </ImageContainer>
      </AnimationContainer>

      <TextContainer>
        <Title>
          From Technology <br />
          towards Art
        </Title>
        <Description>
          Crafting Narrative-driven User Experiences <br />
          at the Intersection of Technology and Art
        </Description>
      </TextContainer>
    </Main>
  );
}

export default Home;
