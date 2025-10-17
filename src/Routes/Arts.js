import React from "react";
import { useNavigate } from "react-router-dom";
import artsData from "../data/arts.json";
import PageContainer from "../Components/PageContainer";
import Grid from "../Components/Grid";

function Arts() {
  const navigate = useNavigate();

  const handleCardClick = (art) => {
    navigate(`/arts/${art.id}`);
  };

  // Helper functions for MasonryGrid
  const getImageSrc = (art) => `${process.env.PUBLIC_URL}/${art.thumbnail}`;
  const getTitle = (art) => art.title;
  const getSubtitle = (art) => art.subtitle;
  const getMetaTags = (art) => art.category;
  const getKey = (art) => art.id;

  return (
    <PageContainer title="ARTS">
      <Grid
        items={artsData}
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

export default Arts;
