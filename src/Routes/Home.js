import React, { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Grid from "../Components/Grid";
import { useDataProcessing } from "../hooks/useDataProcessing";
import About from "./About";
const HomeContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
`;

const AnchorDiv = styled.div`
  scroll-margin-top: 80px;
  @media (max-width: 768px) {
    scroll-margin-top: 70px;
  }
`;

const Main = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;
  padding: 60px 300px 100px 300px;

  @media (max-width: 1200px) {
    padding: 50px 60px 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px 60px 24px;
  }
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
    [selectedWorks, getImageSrc, getTitle, getSubtitle, getKey],
  );
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <>
      <Main>
        <SectionTitle>{SECTION_TITLE}</SectionTitle>
        <Grid {...gridProps} />
      </Main>
    </>
    <HomeContainer>
      <AnchorDiv id="about">
        <About />
      </AnchorDiv>

      <AnchorDiv id="news">
        <Main>
          <SectionTitle>News</SectionTitle>
          <News />
        </Main>
      </AnchorDiv>
    </HomeContainer>
  );
});

Home.displayName = "Home";

export default Home;
