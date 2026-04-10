import React from "react";
import styled from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";

const FooterDiv = styled.div`
  width: 100%;
  bottom: 0;
  padding-top: 80px;
  padding-bottom: 50px;
  height: auto;
  min-height: 150px;
  background-color: ${(props) => props.theme.colors.footer};
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  span {
    padding: 5px;
    color: ${(props) => props.theme.colors.footerText};
    display: block;
    margin: 5px 0;
    font-size: 0.8rem;
    line-height: 0.4rem;
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.footerText};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.3s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

function Footer({ isDarkMode, toggleTheme }) {
  return (
    <FooterDiv>
      <span>&copy; 2026 Hannah Kim</span>
      <span>Last Updated: 2026.04</span>
      <ThemeToggleButton onClick={toggleTheme} aria-label="Toggle Dark Mode">
        <HugeiconsIcon icon={isDarkMode ? Sun03Icon : Moon02Icon} />
      </ThemeToggleButton>
    </FooterDiv>
  );
}

export default Footer;
