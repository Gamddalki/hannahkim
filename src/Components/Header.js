import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderDiv = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.background};
  z-index: 1000;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  height: 80px;
  display: flex;
  align-items: center;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  @media (max-width: 768px) {
    height: 70px;
  }
`;

const ContentsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const GridItemLeft = styled.div`
  justify-self: start;
  display: flex;
  align-items: center;
`;

const GridItemCenter = styled.div`
  justify-self: center;
  display: flex;
  align-items: center;
`;

const GridItemRight = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
`;

const HeaderButton = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.25em;
  color: ${(props) => props.theme.colors.headerText};
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 10px 0;
  transition: color 0.2s ease;
  z-index: 1001;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 0;
  z-index: 1001;

  h2 {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black};
    margin: 0;
    line-height: 1;
    transition: color 0.2s ease;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const HeartIcon = styled.img`
  position: absolute;
  top: -5px;
  right: -10px;
  width: 15px;
  height: auto;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.6) rotate(-10deg);
  transition:
    opacity 0.2s ease,
    transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.2);

  ${Logo}:hover & {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  @media (max-width: 768px) {
    top: -10px;
    right: -18px;
    width: 16px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-15px)"};
  transition:
    opacity 0.4s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.2, 1),
    background 0.2s ease;
`;

const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  padding: 40px;

  @media (max-width: 768px) {
    gap: 20px;
    padding: 24px;
  }
`;

const MenuItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuNumber = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.footerText};
  margin-right: 25px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-right: 10px;
    width: 32px;
    height: 32px;
  }
`;

const MenuLinkText = styled.span`
  font-family: "PlayfairDisplay", serif;
  font-size: 3.8rem;
  font-weight: 300;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  position: relative;
  display: inline-block;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const InfoContent = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 40px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;

  @media (max-width: 768px) {
    padding: 24px;
    gap: 20px;
  }
`;

const InfoLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const InfoLinkItem = styled.a`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  display: inline-flex;
  gap: 10px;
  transition: color 0.2s ease;
  width: fit-content;

  &:hover {
    cursor: pointer;
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    letter-spacing: 0.1em;
  }
`;

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState(() => {
    if (location.pathname === "/" && location.hash) {
      return location.hash.replace("#", "");
    }
    return "about";
  });

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    if (location.hash) {
      setActiveSection(location.hash.replace("#", ""));
    } else {
      setActiveSection("about");
    }

    const sections = ["about", "featured", "archive", "trajectory"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, location.hash]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setIsInfoOpen(false);
  }, []);

  const toggleInfo = useCallback(() => {
    setIsInfoOpen((prev) => !prev);
    setIsMenuOpen(false);
  }, []);

  const handleLogoClick = useCallback(() => {
    navigate("/");
    setIsMenuOpen(false);
    setIsInfoOpen(false);
  }, [navigate]);

  const handleLinkClick = useCallback(
    (id) => {
      setIsMenuOpen(false);
      setIsInfoOpen(false);
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/#${id}`);
      }
    },
    [location.pathname, navigate],
  );

  const navLinks = useMemo(
    () => [
      { id: "about", label: "ABOUT" },
      { id: "featured", label: "FEATURED" },
      { id: "archive", label: "ARCHIVE" },
      { id: "trajectory", label: "TRAJECTORY" },
    ],
    [],
  );

  return (
    <>
      <HeaderDiv>
        <ContentsGrid>
          <GridItemLeft>
            <HeaderButton
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? "CLOSE" : "MENU"}
            </HeaderButton>
          </GridItemLeft>

          <GridItemCenter>
            <Logo onClick={handleLogoClick}>
              <h2>Hannah Kim</h2>
              <HeartIcon src="/Heart.png" alt="Heart ornament" />
            </Logo>
          </GridItemCenter>

          <GridItemRight>
            <HeaderButton
              onClick={toggleInfo}
              aria-label="Toggle Contact Information"
            >
              {isInfoOpen ? "CLOSE" : "INFO"}
            </HeaderButton>
          </GridItemRight>
        </ContentsGrid>
      </HeaderDiv>

      {/* Navigation Overlay */}
      <Overlay $isOpen={isMenuOpen}>
        <MenuList>
          {navLinks.map(({ id, label }, index) => {
            const currentActive =
              location.pathname === "/" && activeSection === id;
            const formattedNum = `0${index + 1}.`;

            return (
              <MenuItemContainer key={id}>
                <MenuNumber>{formattedNum}</MenuNumber>
                <MenuLinkText
                  $isActive={currentActive}
                  onClick={() => handleLinkClick(id)}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </MenuLinkText>
              </MenuItemContainer>
            );
          })}
        </MenuList>
      </Overlay>

      {/* Info Overlay */}
      <Overlay $isOpen={isInfoOpen}>
        <InfoContent>
          <InfoLinks>
            <InfoLinkItem href="mailto:khn@stanford.edu">
              khn@stanford.edu
            </InfoLinkItem>
            <InfoLinkItem
              href="https://www.linkedin.com/in/hannahk01/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </InfoLinkItem>
            <InfoLinkItem
              href="https://github.com/Gamddalki/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </InfoLinkItem>
            <InfoLinkItem
              href="https://www.youtube.com/@rgbnband"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </InfoLinkItem>
            <InfoLinkItem
              href="https://soundcloud.com/llorjjrk"
              target="_blank"
              rel="noreferrer"
            >
              SoundCloud
            </InfoLinkItem>
            <InfoLinkItem
              href="https://drive.google.com/file/d/1AN7czPQ9Luthc7XB2-_fs5AvhHvxp1rV/view"
              target="_blank"
              rel="noreferrer"
            >
              CV
            </InfoLinkItem>
          </InfoLinks>
        </InfoContent>
      </Overlay>
    </>
  );
});

Header.displayName = "Header";

export default Header;
