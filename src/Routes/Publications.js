import React, { useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import publicationData from "../data/publications.json";
import PageContainer from "../Components/PageContainer";
import Grid from "../Components/Grid";

const PAGE_TITLE = "PUBLICATIONS";
const TAG_FIELD = "indexTerms";
const SORT_FIELD = "date";

const Publications = memo(() => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (publication) => {
      navigate(`/publications/${publication.id}`);
    },
    [navigate]
  );

  const getImageSrc = useCallback(
    (publication) => publication.thumbnail,
    []
  );
  const getTitle = useCallback((publication) => publication.title, []);
  const getSubtitle = useCallback((publication) => publication.subtitle, []);
  const getMetaTags = useCallback((publication) => publication.indexTerms, []);
  const getKey = useCallback((publication) => publication.id, []);

  const gridProps = useMemo(
    () => ({
      items: publicationData,
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

Publications.displayName = "Publications";

export default Publications;
