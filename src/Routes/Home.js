import React, { memo } from "react";
import styled from "styled-components";
import MasonryGrid from "../Components/MasonryGrid";
import { useDataProcessing } from "../hooks/useDataProcessing";

const Main = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;
  padding: 160px 300px 100px 300px;

  @media (max-width: 1200px) {
    padding: 140px 60px 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 120px 24px 60px 24px;
  }
`;

const Hero = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 50px;
`;

const RightHeadline = styled.h1`
  margin: 0;
  font-size: clamp(0.8rem, 4vw, 2rem);
  line-height: 1.2;
  white-space: pre;
  overflow-wrap: normal;
  word-break: normal;
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 480px) {
    white-space: pre-line;
  }
`;

const RightSub = styled.p`
  margin: 16px 0 0 0;
  font-size: 1rem;
  line-height: 1.4;
  text-align: right;
  color: ${(props) => props.theme.colors.subText};
  max-width: 44ch;
  align-self: flex-end;

  @media (max-width: 768px) {
    margin: 8px 0 0 0;
    font-size: 0.9rem;
  }
`;

const SectionTitle = styled.h3`
  margin: 80px 0 20px 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    margin: 40px 0 20px 0;
    font-size: 1.2rem;
  }
`;

const Home = memo(() => {
  const { selectedWorks } = useDataProcessing();

  return (
    <>
      <Main>
        <Hero>
          <RightHeadline>
            {`Crafting experiential narrative architecture\nthrough affective + user-centered systems`}
          </RightHeadline>
          <RightSub>
            Hannah is a creative technologist who leverages her
            interdisciplinary background to expand narrative experiences.
          </RightSub>
        </Hero>

        <SectionTitle>Selected Works</SectionTitle>
        <MasonryGrid
          items={selectedWorks}
          getImageSrc={(item) => `${process.env.PUBLIC_URL}${item.thumbnail}`}
          getTitle={(item) => item.title}
          getSubtitle={(item) => item.subtitle}
          getKey={(item) => item.id}
          showFilter={false}
          showSeeAllUnderCard={true}
          showPins={false}
          showOverlay={false}
          skipTwoColumn={true}
          uniformAspect="4/3"
        />
      </Main>
    </>
  );
});

Home.displayName = "Home";

export default Home;
