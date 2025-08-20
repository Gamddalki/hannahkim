import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  height: 100vh;

  h1 {
    font-size: 10rem;
    font-weight: 900;
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    margin-top: 150px;
  }
`;

function Home() {
  return (
    <Main>
      <h1>This is me</h1>
    </Main>
  );
}

export default Home;
