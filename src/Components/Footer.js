import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  bottom: 0;
  padding: 30px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.footer};
  text-align: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 20px;
    height: auto;
    min-height: 120px;
  }

  span {
    padding: 5px;
    color: ${(props) => props.theme.colors.footerText};
    display: block;
    margin: 5px 0;
    font-size: 0.8rem;
    line-height: 0.4rem;
  }
`;

function Footer() {
  return (
    <FooterDiv>
      <span>&copy; 2025 Hannah Kim</span>
      <span>Last Updated: 2025.10</span>
    </FooterDiv>
  );
}

export default Footer;
