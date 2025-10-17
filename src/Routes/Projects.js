import React from "react";
import { useNavigate } from "react-router-dom";
import projectData from "../data/projects.json";
import PageContainer from "../Components/PageContainer";
import Grid from "../Components/Grid";

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
  const getMetaTags = (project) => project.category;
  const getKey = (project) => project.id;

  return (
    <PageContainer title="PROJECTS">
      <Grid
        items={projectData}
        onItemClick={handleCardClick}
        getImageSrc={getImageSrc}
        getTitle={getTitle}
        getSubtitle={getSubtitle}
        getMetaTags={getMetaTags}
        getKey={getKey}
        tagField="category"
        sortField="startDate"
      />
    </PageContainer>
  );
}

export default Projects;
