import React, { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDataProcessing } from "../hooks/useDataProcessing";
import About from "./About";
import Featured from "./Featured";
import News from "./News";
import Archive from "./Archive";

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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const SectionTitle = styled.h2`
  margin: 80px 0 50px 0;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    margin: 50px 0 30px 0;
    font-size: 2rem;
  }
`;

const Home = memo(() => {
  const { selectedWorks } = useDataProcessing();
  const location = useLocation();

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
    <HomeContainer>
      <AnchorDiv id="about">
        <About />
      </AnchorDiv>

      <AnchorDiv id="featured">
        <Main>
          <SectionTitle>FEATURED</SectionTitle>
          <Featured items={selectedWorks} />
        </Main>
      </AnchorDiv>

      <AnchorDiv id="archive">
        <Main>
          <SectionTitle>ARCHIVE</SectionTitle>
          <Archive />
        </Main>
      </AnchorDiv>

      <AnchorDiv id="news">
        <Main>
          <SectionTitle>NEWS</SectionTitle>
          <News />
        </Main>
      </AnchorDiv>
    </HomeContainer>
  );
});

Home.displayName = "Home";

export default Home;
