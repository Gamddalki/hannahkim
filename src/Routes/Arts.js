import React, { useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import artsData from "../data/arts.json";
import PageContainer from "../Components/PageContainer";
import Grid from "../Components/Grid";

const PAGE_TITLE = "ARTS";
const TAG_FIELD = "category";
const SORT_FIELD = "startDate";

const Arts = memo(() => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (art) => {
      navigate(`/arts/${art.id}`);
    },
    [navigate]
  );

  const getImageSrc = useCallback((art) => art.thumbnail, []);
  const getTitle = useCallback((art) => art.title, []);
  const getSubtitle = useCallback((art) => art.subtitle, []);
  const getMetaTags = useCallback((art) => art.category, []);
  const getKey = useCallback((art) => art.id, []);

  const gridProps = useMemo(
    () => ({
      items: artsData,
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

Arts.displayName = "Arts";

export default Arts;
