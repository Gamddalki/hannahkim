import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import projectData from "../data/projects.json";

const Container = styled.div`
  padding: 50px;
  background-color: #181617;
  h1 {
    margin-top: 70px;
  }
  h2 {
    margin-top: 5px;
  }
  h3 {
    margin-top: 5px;
    margin-bottom: 20px;
  }
  span {
    margin: 20px;
  }
  a {
    color: white;
    margin: 20px;
    cursor: pointer;
    &:hover {
      color: #f36766;
    }
  }
`;

const Image = styled.img`
  width: 60%;
  max-width: 500px;
  height: auto;
  margin: 20px;
`;

const Details = () => {
  const { id } = useParams();
  const project = projectData.find((p) => p.id.toString() === id);

  if (!project) {
    return <Container>Can't find the details.</Container>;
  }

  return (
    <Container>
      <h1>{project.title}</h1>
      <h2>{project.subtitle}</h2>
      <h3>
        {project.where} ({project.startDate} ~ {project.endDate})
      </h3>
      <Image src={project.thumbnail} alt={project.title} />
      <span>👩🏻‍💻 Tech Stack: {project.techStack}</span>
      <span>{project.content}</span>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          🔗 Link to Project
        </a>
      )}
    </Container>
  );
};

export default Details;
