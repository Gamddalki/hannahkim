import React, { memo } from "react";
import styled from "styled-components";
import PageContainer from "../Components/PageContainer";

const BigIntroTitle = styled.h1`
  font-size: 3.2rem;
  line-height: 1.25;
  color: ${(props) => props.theme.colors.black};
  margin-top: 40px;
  margin-bottom: 30px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const IntroDescription = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  display: block;
  text-align: right;
  margin-bottom: 40px;

  i {
    font-style: italic;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
`;

const HighlightLink = styled.a`
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }
`;

const FlatImageWrapper = styled.div`
  width: 100%;
  height: 320px;
  overflow: hidden;
  margin: 50px 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 75%;
    filter: grayscale(100%);
    transition: filter 0.5s ease;

    &:hover {
      filter: grayscale(0%);
    }

    @media (max-width: 768px) {
      filter: none;
    }
  }

  @media (max-width: 768px) {
    height: 180px;
    margin: 30px 0;
  }
`;

const InterestsMarquee = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 18px 0;
  margin: 50px 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 12px 0;
    margin: 30px 0;
  }

  h2 {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.black};
    text-transform: uppercase;
  }
`;

const About = memo(() => {
  return (
    <PageContainer>
      <BigIntroTitle>
        Crafting immersive
        <br />
        narrative experiences
        <br />
        through affective and
        <br />
        user-centered systems.
      </BigIntroTitle>

      <FlatImageWrapper>
        <img src="/img/hannah.heic" alt="Hannah Kim horizontal B&W profile" />
      </FlatImageWrapper>

      <IntroDescription>
        I am a <i>Creative Technologist</i> and <i>Narrative Architect</i>{" "}
        <br />
        designing environments where narratives are experienced through sound,
        space, and interactive media. <br />
        Grounded in a dual background in Computer Science and Media, <br />I
        bridge artistic vision with engineering feasibility. <br />
        <br /> As an incoming{" "}
        <HighlightLink
          href="https://ccrma.stanford.edu/"
          target="_blank"
          rel="noreferrer"
        >
          M.A./M.S.T. at Stanford CCRMA
        </HighlightLink>
        , my current interests lie in:
        <br />
        1) exploring audio and computation as expressive mediums for shaping
        human perception.
        <br />
        2) designing spatial and interactive mechanics for immersive
        storytelling.
        <br />
        <br />
        Beyond the code, you will often find me <br />
        on stage as the lead guitarist and composer for the band RGBN <br />
        or behind a camera. <br />I simply love crafting experiences that move
        people! {"<3"}
      </IntroDescription>

      <InterestsMarquee>
        <h2>
          Affective Computing ✦ Spatial Computing ✦ Experiential Narrative ✦
          Intermedia ✦ Human-Centered AI ✦ Collective Immersion
        </h2>
      </InterestsMarquee>
    </PageContainer>
  );
});

About.displayName = "About";

export default About;
