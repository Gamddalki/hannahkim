import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import projectData from "../data/projects.json";
import researchData from "../data/researches.json";

const Section = styled.section`
  background-color: #181617;
  display: flex;
  justify-content: center;
`;

const ContentsWrapper = styled.div`
  padding: 100px 0;
  width: 60%;
  max-width: 820px;
  h1 {
    margin-top: 70px;
  }
  h2 {
    margin-top: 5px;
  }
  h3 {
    margin-top: 5px;
    margin-bottom: 40px;
  }
  span {
    margin: 20px 0;
  }
  a {
    color: white;
    margin: 20px 0;
    display: block;
    cursor: pointer;
    &:hover {
      color: #f36766;
    }
  }
`;

const ContentBlock = styled.div`
  margin: 40px 0;
`;

const Image = styled.img`
  max-height: 500px;
  width: 100%;
  object-fit: contain;
  margin: 10px;
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
      <ContentsWrapper>
        <h1>{item.title}</h1>
        <h2>{item.subtitle}</h2>
        <h3>
          {category === "project"
            ? `${item.where} (${item.startDate} ~ ${item.endDate})`
            : `${item.where} | ${item.date}`}
        </h3>
        <span>{item.summary}</span>
        {category === "project" ? (
          <span>👩🏻‍💻 Tech Stack: {item.techStack}</span>
        ) : (
          <span>🏷️ Index Terms: {item.indexTerms}</span>
        )}
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {category === "project" ? "🔗 Link to Project" : "🔗 Link to Paper"}
        </a>

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
