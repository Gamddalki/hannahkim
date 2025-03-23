import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

const HeaderDiv = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  background: black;
  z-index: 1000;
`;

const Logo = styled.h1`
  padding: 0 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: #f36766;
  }
`;

function Header() {
  return (
    <HeaderDiv>
      <Logo>Hannah</Logo>
      <Nav>
        <NavLink to="home" smooth={true} duration={500}>
          Home
        </NavLink>
        <NavLink to="project" smooth={true} duration={500}>
          Projects
        </NavLink>
        <NavLink to="research" smooth={true} duration={500}>
          Researches
        </NavLink>
        <NavLink to="about" smooth={true} duration={500}>
          About
        </NavLink>
        <NavLink to="contact" smooth={true} duration={500}>
          Contact
        </NavLink>
      </Nav>
    </HeaderDiv>
  );
}

export default Header;
