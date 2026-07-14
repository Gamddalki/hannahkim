import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${(props) => props.theme.colors.footer};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 80px 30px 40px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 50px 20px 30px;
  }
`;

const EditorialBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    gap: 5px;
  }

  h1 {
    color: ${(props) => props.theme.colors.black};
  }
`;

const EditorialRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  @media (max-width: 1024px) {
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const EditorialRow = styled.a`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  font-size: 1.8rem;
  gap: 3px;
  color: ${(props) => props.theme.colors.black};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  width: fit-content;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    gap: 6px;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    line-height: 1;
    color: ${(props) => props.theme.colors.black};
    text-decoration: line-through;
    text-decoration-color: transparent;
    text-decoration-thickness: 2px;
    transition: text-decoration-color 0.25s ease;
  }

  &:hover h1 {
    text-decoration-color: ${(props) => props.theme.colors.primary};
  }
`;

const SymbolWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: flex-end;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 60%;
    height: 2px;
    background-color: ${(props) => props.theme.colors.primary};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
    pointer-events: none;
  }

  a:hover &::after {
    transform: scaleX(1);
  }
`;

const Symbol = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  display: inline-block;
  filter: ${(props) => (props.$isDarkMode ? "invert(1)" : "none")};
  position: relative;
  top: 4.5px;

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`;

const Coordinates = styled.span`
  font-size: 0.5em;
  display: inline-flex;
  flex-direction: column;
  line-height: 1;
  color: ${(props) => props.theme.colors.text};
  position: relative;
  top: 2px;
  text-decoration: line-through;
  text-decoration-color: transparent;
  text-decoration-thickness: 1.5px;
  transition: text-decoration-color 0.25s ease;

  a:hover & {
    text-decoration-color: ${(props) => props.theme.colors.primary};
  }

  span + span {
    margin-top: -8px;
  }

  @media (max-width: 768px) {
    font-size: 0.6em;
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ThemeIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;
  filter: ${(props) => (props.$isDarkMode ? "invert(1)" : "none")};

  @media (max-width: 768px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 25px;

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.footerText};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

function Footer({ isDarkMode, toggleTheme }) {
  return (
    <FooterContainer>
      <FooterContent>
        <EditorialBlock>
          <EditorialRow
            id="location"
            href="https://www.google.com/maps/place/CCRMA+Stanford+Center+for+Computer+Research+in+Music+and+Acoustics/@37.4210115,-122.1749574,17z/data=!3m1!4b1!4m6!3m5!1s0x808fbad3423a5f69:0x817ca309c517ce7!8m2!3d37.4210115!4d-122.1723825!16s%2Fg%2F11b7k8bq2y?entry=ttu&g_ep=EgoyMDI2MDcxMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
          >
            <h1>Currently in</h1>
            <SymbolWrapper>
              <Symbol
                src="/img/icons/arrow.svg"
                alt="arrow"
                $isDarkMode={isDarkMode}
              />
            </SymbolWrapper>
            <Coordinates>
              33 Daeshin-dong <br />
              Seodaemun-gu ←
            </Coordinates>
            <h1>Seoul</h1>
          </EditorialRow>

          <EditorialRowContainer>
            <EditorialRow id="email" href="mailto:khn@stanford.edu">
              <h1>khn</h1>
              <SymbolWrapper>
                <Symbol
                  src="/img/icons/at.svg"
                  alt="at"
                  $isDarkMode={isDarkMode}
                />
              </SymbolWrapper>
              <h1>stanford.edu</h1>
            </EditorialRow>

            <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle Theme">
              <ThemeIcon
                src={
                  isDarkMode ? "/img/icons/light.svg" : "/img/icons/dark.svg"
                }
                alt={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
                $isDarkMode={isDarkMode}
              />
            </ThemeToggleButton>
          </EditorialRowContainer>
        </EditorialBlock>

        <BottomRow>
          <span>Last Updated: JUL 2026</span>
          <span>&copy; 2026 Hannah Kim. All Rights Reserved.</span>
        </BottomRow>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
