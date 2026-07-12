import React, { useState, useCallback, memo } from "react";
import styled from "styled-components";
import journeyData from "../data/journey.json";

const INITIAL_ITEMS_COUNT = 5;

const SectionContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 80px auto 0;
  padding: 0 30px;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 50px auto 0;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const MoreButton = styled.button`
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 10px 0;
  transition: all 0.2s ease;
  background: none;
  margin: 35px auto 0;
  display: block;
  color: ${(props) => props.theme.colors.hashText};

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
`;

const News = memo(() => {
  const [showAll, setShowAll] = useState(false);
  const { journeyData: journeyItems } = journeyData;

  const visibleItems = showAll
    ? journeyItems
    : journeyItems.slice(0, INITIAL_ITEMS_COUNT);

  const handleToggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <SectionContainer>
      {journeyItems.length > INITIAL_ITEMS_COUNT && (
        <MoreButton onClick={handleToggleShowAll}>
          {showAll ? "Hide" : "More"}
        </MoreButton>
      )}
    </SectionContainer>
  );
});

News.displayName = "News";

export default News;
