import React, { useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import studioData from "../data/studio.json";
import PageContainer from "../Components/PageContainer";
import Grid from "../Components/Grid";

const PAGE_TITLE = "STUDIO";
const TAG_FIELD = "category";
const SORT_FIELD = "startDate";

const Studio = memo(() => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (project) => {
      navigate(`/studio/${project.id}`);
    },
    [navigate]
  );

  const getImageSrc = useCallback((project) => project.thumbnail, []);
  const getTitle = useCallback((project) => project.title, []);
  const getSubtitle = useCallback((project) => project.subtitle, []);
  const getMetaTags = useCallback((project) => project.category, []);
  const getKey = useCallback((project) => project.id, []);

  const gridProps = useMemo(
    () => ({
      items: studioData,
      onItemClick: handleCardClick,
      getImageSrc,
      getTitle,
      getSubtitle,
      getMetaTags,
      getKey,
      tagField: TAG_FIELD,
      sortField: SORT_FIELD,
    }),
    [handleCardClick, getImageSrc, getTitle, getSubtitle, getMetaTags, getKey]
  );

  return (
    <PageContainer title={PAGE_TITLE}>
      <Grid {...gridProps} />
    </PageContainer>
  );
});

Studio.displayName = "Studio";

export default Studio;
