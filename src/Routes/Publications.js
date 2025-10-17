import React from "react";
import { useNavigate } from "react-router-dom";
import publicationData from "../data/publications.json";
import PageContainer from "../Components/PageContainer";
import Grid from "../Components/Grid";

function Publications() {
  const navigate = useNavigate();

  const handleCardClick = (publication) => {
    navigate(`/publications/${publication.id}`);
  };

  // Helper functions for Grid
  const getImageSrc = (publication) =>
    `${process.env.PUBLIC_URL}/${publication.thumbnail}`;
  const getTitle = (publication) => publication.title;
  const getSubtitle = (publication) => publication.subtitle;
  const getMetaTags = (publication) => publication.indexTerms;
  const getKey = (publication) => publication.id;

  return (
    <PageContainer title="PUBLICATIONS">
      <Grid
        items={publicationData}
        onItemClick={handleCardClick}
        getImageSrc={getImageSrc}
        getTitle={getTitle}
        getSubtitle={getSubtitle}
        getMetaTags={getMetaTags}
        getKey={getKey}
        tagField="indexTerms"
        sortField="date"
      />
    </PageContainer>
  );
}

export default Publications;
