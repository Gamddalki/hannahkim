import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
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
  background-color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    padding: 5px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: white;
  size: 1x;
  padding: 5px;
`;

function Footer() {
  return (
    <FooterDiv>
      <span>&copy; 2025 Hannah Kim</span>
      <a
        href="https://www.linkedin.com/in/hannah-kim-b03272322/"
        target={"_blank"}
      >
        <Icon icon={faLinkedinIn} />
      </a>
      <a href="https://github.com/Gamddalki/" target={"_blank"}>
        <Icon icon={faGithub} />
      </a>
      <a href="https://www.instagram.com/llorjjrk/" target={"_blank"}>
        <Icon icon={faInstagram} />
      </a>
      <a href="https://www.youtube.com/@dahae01" target={"_blank"}>
        <Icon icon={faYoutube} />
      </a>
    </FooterDiv>
  );
}

export default Footer;
