import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import Grid from "../Components/Grid";
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

const DemoVideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 5 / 1;
  overflow: hidden;
  margin-bottom: 120px;

  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`;

const DemoVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SectionTitle = styled.h3`
  margin: 80px 0 20px 0;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    margin: 40px 0 20px 0;
    font-size: 1.2rem;
  }
`;

const SECTION_TITLE = "Selected Works";

const Home = memo(() => {
  const { selectedWorks } = useDataProcessing();

  const getImageSrc = useCallback((item) => item.thumbnail, []);
  const getTitle = useCallback((item) => item.title, []);
  const getSubtitle = useCallback((item) => item.subtitle, []);
  const getKey = useCallback((item) => item.id, []);

  const gridProps = useMemo(
    () => ({
      items: selectedWorks,
      getImageSrc,
      getTitle,
      getSubtitle,
      getKey,
      showFilter: false,
      showSeeAllUnderCard: true,
      showPins: false,
      showOverlay: false,
      skipTwoColumn: true,
      uniformAspect: "4/3",
      disableSort: true,
    }),
    [selectedWorks, getImageSrc, getTitle, getSubtitle, getKey]
  );

  return (
    <>
      <Main>

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
