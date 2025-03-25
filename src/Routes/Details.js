import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import projectData from "../data/projects.json";
import researchData from "../data/researches.json";

const Section = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 820px;
`;

const ContentsWrapper = styled.div`
  padding: 100px 0;
  width: 60%;
  max-width: 820px;
  h1 {
    margin: 50px 0;
    font-size: 50px;
  }
  h4 {
    margin-top: 5px;
  }
  h5 {
    margin-top: 5px;
  }
  span {
    margin: 20px 0;
  }
  a {
    font-family: "GmarketSansMedium", -apple-system, sans-serif;
    line-height: 20px;
    font-size: 15px;
    color: ${(props) => props.theme.colors.primary};
    margin: 20px 0;
    display: block;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.colors.hover};
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
`;

const InfoBlock = styled.div`
  h5 {
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 7px;
    line-height: 20px;
    font-size: 15px;
  }
`;

const ContentBlock = styled.div`
  margin: 40px 0;
  span {
    color: ${(props) => props.theme.colors.content};
  }
`;

const Image = styled.img`
  max-height: 500px;
  width: 100%;
  object-fit: contain;
  margin: 10px;
`;

const ToHome = styled(Link)`
  span {
    margin-top: 50px;
    position: absolute;
    color: ${(props) => props.theme.colors.primary};
    &:hover {
      color: ${(props) => props.theme.colors.hover};
    }
  }
`;

const Details = () => {
  const { category, id } = useParams();
  let data;

  if (category === "project") {
    data = projectData;
  } else if (category === "research") {
    data = researchData;
  }

  console.log(category, id);

  const item = data ? data.find((i) => i.id.toString() === id) : null;

  if (!item) {
    return <ContentsWrapper>Can't find the details.</ContentsWrapper>;
  }

  return (
    <Section>
      <ToHome to={"/"}>
        <span>&lt; Home</span>
      </ToHome>
      <ContentsWrapper>
        <h1>{item.title}</h1>
        <h4>{item.subtitle}</h4>
        <h5>{item.where}</h5>
        <h5>
          {category === "project"
            ? `(${item.startDate} ~ ${item.endDate})`
            : `(${item.date})`}
        </h5>
        <span>{item.summary}</span>

        <InfoGrid>
          <InfoBlock>
            {category === "project" ? (
              <>
                <h5>👩🏻‍💻 Tech Stack</h5>
                <ul>
                  {item.techStack.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h5>🏷️ Index Terms</h5>
                <ul>
                  {item.indexTerms.map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </ul>
              </>
            )}
          </InfoBlock>
          <InfoBlock>
            <h5>🍓 My Role</h5>
            <ul>
              {item.myRole.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </InfoBlock>
          <InfoBlock>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {category === "project"
                ? "🔗 Link to Project"
                : "🔗 Link to Paper"}
            </a>
          </InfoBlock>
        </InfoGrid>

        <ContentBlock>
          {item.content.map((i, index) =>
            i.type === "text" ? (
              <span key={index}>{i.value}</span>
            ) : (
              <Image key={index} src={i.value} alt="Project img" />
            )
          )}
        </ContentBlock>
      </ContentsWrapper>
    </Section>
  );
};

export default Details;
