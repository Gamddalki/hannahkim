import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const FooterDiv = styled.div`
  width: 100%;
  min-width: 820px;
  bottom: 0;
  padding: 30px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.footer};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    padding: 5px;
    color: ${(props) => props.theme.colors.footerText};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.footerText};
  size: 1x;
  padding: 5px;
`;

function Footer() {
  return (
    <FooterDiv>
      <span>&copy; 2025 Hannah Kim</span>
      <a
        href="https://www.linkedin.com/in/hannahk01/"
        target={"_blank"}
        rel="noreferrer"
      >
        <Icon icon={faLinkedinIn} />
      </a>
      <a
        href="https://github.com/Gamddalki/"
        target={"_blank"}
        rel="noreferrer"
      >
        <Icon icon={faGithub} />
      </a>
      <a
        href="https://www.youtube.com/@dahae01"
        target={"_blank"}
        rel="noreferrer"
      >
        <Icon icon={faYoutube} />
      </a>
    </FooterDiv>
  );
}

export default Footer;
