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
  background: ${(props) => props.theme.colors.header};
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.headerText};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

function Header() {
  return (
    <HeaderDiv>
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
        <NavLink to="contact" smooth={true} duration={500}>
          Contact
        </NavLink>
      </Nav>
    </HeaderDiv>
  );
}

export default Header;
