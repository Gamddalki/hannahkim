import React, { useState, useCallback, useMemo, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderDiv = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 220px;
  background: ${(props) => props.theme.colors.header};
  z-index: 1000;
  border-bottom: 1px solid ${(props) => props.theme.colors.black};

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 20px 50px;
  }
  @media (max-width: 768px) {
    padding: 18px 18px;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;

  @media (max-width: 768px) {
    gap: 2px;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      height: 30px;
    }
  }

  span {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.black};

    @media (max-width: 768px) {
      font-size: 0.75rem;
      line-height: 0.75rem;
      font-weight: 500;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.headerText};
  cursor: pointer;
  font-weight: 400;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 20px;
  height: 14px;
  position: relative;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.colors.black};
    left: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;

    &:nth-child(1) {
      top: 0px;
      transform: ${(props) =>
        props.isOpen
          ? "translateY(6px) rotate(45deg)"
          : "translateY(0) rotate(0deg)"};
    }

    &:nth-child(2) {
      top: 6px;
      opacity: ${(props) => (props.isOpen ? "0" : "1")};
      transform: ${(props) => (props.isOpen ? "scaleX(0)" : "scaleX(1)")};
    }

    &:nth-child(3) {
      top: 12px;
      transform: ${(props) =>
        props.isOpen
          ? "translateY(-6px) rotate(-45deg)"
          : "translateY(0) rotate(0deg)"};
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.header};
  border-bottom: ${(props) =>
    props.isOpen ? `1px solid ${props.theme.colors.headerText}` : "none"};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 20px;
`;

const MobileNavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.headerText};
  cursor: pointer;
  font-weight: 400;
  padding: 8px 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogoClick = useCallback(() => {
    navigate("/");
    setIsMenuOpen(false);
  }, [navigate]);

  const handleNavClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const isActive = useCallback(
    (path) => {
      if (path === "/") {
        return location.pathname === "/";
      }
      return location.pathname.includes(path.toLowerCase());
    },
    [location.pathname]
  );

  // 네비게이션 링크 데이터를 메모이제이션
  const navLinks = useMemo(
    () => [
      { to: "/about", label: "ABOUT" },
      { to: "/projects", label: "PROJECTS" },
      { to: "/publications", label: "PUBLICATIONS" },
      { to: "/arts", label: "ARTS" },
    ],
    []
  );

  return (
    <>
      <HeaderDiv>
        <Logo onClick={handleLogoClick}>
          <img src={`/Heart.png`} alt="HANNAH" />
          <span>
            HANNAH <br />
            KIM
          </span>
        </Logo>

        <Nav>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={isActive(to) ? "active" : ""}>
              {label}
            </NavLink>
          ))}
        </Nav>

        <MobileMenuButton onClick={toggleMenu}>
          <HamburgerIcon isOpen={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </MobileMenuButton>
      </HeaderDiv>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileNav>
          {navLinks.map(({ to, label }) => (
            <MobileNavLink
              key={to}
              to={to}
              onClick={handleNavClick}
              className={isActive(to) ? "active" : ""}
            >
              {label}
            </MobileNavLink>
          ))}
        </MobileNav>
      </MobileMenu>
    </>
  );
});

Header.displayName = "Header";

export default Header;
