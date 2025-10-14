import React, { useState } from "react";
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

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease, filter 0.3s ease;

    @media (max-width: 768px) {
      height: 25px;
    }
  }

  span {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.black};

    @media (max-width: 768px) {
      display: none;
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
  font-weight: 500;
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
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.colors.black};
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: ${(props) => (props.isOpen ? "6px" : "0px")};
      transform: ${(props) =>
        props.isOpen ? "rotate(45deg)" : "rotate(0deg)"};
    }

    &:nth-child(2) {
      top: 6px;
      opacity: ${(props) => (props.isOpen ? "0" : "1")};
      transform: ${(props) => (props.isOpen ? "scaleX(0)" : "scaleX(1)")};
    }

    &:nth-child(3) {
      top: ${(props) => (props.isOpen ? "6px" : "12px")};
      transform: ${(props) =>
        props.isOpen ? "rotate(-45deg)" : "rotate(0deg)"};
    }

    &:nth-child(4) {
      top: 6px;
      opacity: ${(props) => (props.isOpen ? "0" : "1")};
      transform: ${(props) => (props.isOpen ? "scaleX(0)" : "scaleX(1)")};
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
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.includes(path.toLowerCase());
  };

  return (
    <>
      <HeaderDiv data-no-hover>
        <Logo onClick={handleLogoClick} data-no-hover>
          <img src={`${process.env.PUBLIC_URL}/Heart.svg`} alt="HANNAH" />
          <span>
            HANNAH <br />
            KIM
          </span>
        </Logo>

        <Nav data-no-hover>
          <NavLink
            to="/about"
            className={isActive("/about") ? "active" : ""}
            data-no-hover
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/projects"
            className={isActive("/projects") ? "active" : ""}
            data-no-hover
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/publications"
            className={isActive("/publications") ? "active" : ""}
            data-no-hover
          >
            PUBLICATIONS
          </NavLink>
          <NavLink
            to="/arts"
            className={isActive("/arts") ? "active" : ""}
            data-no-hover
          >
            ARTS
          </NavLink>
        </Nav>

        <MobileMenuButton onClick={toggleMenu} data-no-hover>
          <HamburgerIcon isOpen={isMenuOpen} data-no-hover>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </MobileMenuButton>
      </HeaderDiv>

      <MobileMenu isOpen={isMenuOpen}>
        <MobileNav>
          <MobileNavLink
            to="/about"
            onClick={handleNavClick}
            className={isActive("/about") ? "active" : ""}
            data-no-hover
          >
            ABOUT
          </MobileNavLink>
          <MobileNavLink
            to="/projects"
            onClick={handleNavClick}
            className={isActive("/projects") ? "active" : ""}
            data-no-hover
          >
            PROJECTS
          </MobileNavLink>
          <MobileNavLink
            to="/publications"
            onClick={handleNavClick}
            className={isActive("/publications") ? "active" : ""}
            data-no-hover
          >
            PUBLICATIONS
          </MobileNavLink>
          <MobileNavLink
            to="/arts"
            onClick={handleNavClick}
            className={isActive("/arts") ? "active" : ""}
            data-no-hover
          >
            ARTS
          </MobileNavLink>
        </MobileNav>
      </MobileMenu>
    </>
  );
}

export default Header;
