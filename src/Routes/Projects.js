import React from "react";
import { useNavigate } from "react-router-dom";
import projectData from "../data/projects.json";
import PageContainer from "../Components/PageContainer";
import MasonryGrid from "../Components/MasonryGrid";

function Projects() {
  const navigate = useNavigate();

  const handleCardClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  // Helper functions for MasonryGrid
  const getImageSrc = (project) =>
    `${process.env.PUBLIC_URL}/${project.thumbnail}`;
  const getTitle = (project) => project.title;
  const getSubtitle = (project) => project.subtitle;
  const getMetaTags = (project) => project.techStack;
  const getKey = (project) => project.id;

  return (
    <PageContainer title="PROJECTS">
      <MasonryGrid
        items={projectData}
        onItemClick={handleCardClick}
        getImageSrc={getImageSrc}
        getTitle={getTitle}
        getSubtitle={getSubtitle}
        getMetaTags={getMetaTags}
        getKey={getKey}
        tagField="techStack"
        sortField="startDate"
      />
    </PageContainer>
  );
}

export default Projects;
