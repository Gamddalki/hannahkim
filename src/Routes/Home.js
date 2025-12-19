import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import Grid from "../Components/Grid";
import { useDataProcessing } from "../hooks/useDataProcessing";

const Main = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;
  padding: 170px 300px 100px 300px;

  @media (max-width: 1200px) {
    padding: 150px 60px 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 130px 24px 60px 24px;
  }
`;

const Hero = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 100px;
`;

const RightHeadline = styled.h1`
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 2.5rem);
  line-height: 1.2;
  color: ${(props) => props.theme.colors.primary};
`;

const RightSub = styled.p`
  margin: 16px 0 0 0;
  font-size: 1rem;
  line-height: 1.4;
  text-align: right;
  font-weight: 400;
  color: ${(props) => props.theme.colors.subText};
  max-width: 46ch;
  align-self: flex-end;
  white-space: pre-line;
  opacity: 0.8;

  @media (max-width: 768px) {
    margin: 8px 0 0 0;
    font-size: 0.9rem;
  }
`;

const DemoVideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 5 / 1;
  overflow: hidden;
  margin-bottom: 150px;

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

const DemoVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SectionTitle = styled.h3`
  margin: 80px 0 20px 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    margin: 40px 0 20px 0;
    font-size: 1.3rem;
  }
`;

const HERO_HEADLINE = `Crafting immersive narrative experiences through affective and user‑centered systems`;
const HERO_SUBTITLE =
  "I am Hannah Kim, a creative technologist who blends computer science, arts and music to build emotionally resonant interactive worlds.";
const SECTION_TITLE = "Selected Works";

const Home = memo(() => {
  const { selectedWorks } = useDataProcessing();

  const getImageSrc = useCallback((item) => item.thumbnail, []);
  const getTitle = useCallback((item) => item.title, []);
  const getSubtitle = useCallback((item) => item.subtitle, []);
  const getKey = useCallback((item) => item.id, []);
  const getMetaTags = useCallback((item) => {
    if (item.itemCategory === "publications") {
      return item.type;
    }
    return item.category;
  }, []);

  const gridProps = useMemo(
    () => ({
      items: selectedWorks,
      getImageSrc,
      getTitle,
      getSubtitle,
      getKey,
      getMetaTags,
      showFilter: true,
      showPins: false,
      showOverlay: false,
      skipTwoColumn: true,
      uniformAspect: "4/3",
      disableSort: true,
    }),
    [selectedWorks, getImageSrc, getTitle, getSubtitle, getKey, getMetaTags]
  );

  return (
    <>
      <Main>
        <Hero>
          <RightHeadline>{HERO_HEADLINE}</RightHeadline>
          <RightSub>{HERO_SUBTITLE}</RightSub>
        </Hero>

        <DemoVideoWrapper>
          <DemoVideo src="/demo.mp4" autoPlay loop muted playsInline />
        </DemoVideoWrapper>

        <SectionTitle>{SECTION_TITLE}</SectionTitle>
        <Grid {...gridProps} />
      </Main>
    </>
  );
});

Home.displayName = "Home";

export default Home;
