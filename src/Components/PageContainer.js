import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  @media (min-width: 769px) and (max-width: 1024px) {
    padding-top: 50px;
  }
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 70px 30px;

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 70px 50px;
  }
  @media (max-width: 768px) {
    padding: 70px 30px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 60px;
  color: ${(props) => props.theme.colors.black};

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  @media (max-width: 768px) {
    font-size: 1.7rem;
    margin-bottom: 20px;
  }
`;

function PageContainer({ children, title }) {
  return (
    <Container>
      <Content>
        {title && <Title>{title}</Title>}
        {children}
      </Content>
    </Container>
  );
}

export default PageContainer;
