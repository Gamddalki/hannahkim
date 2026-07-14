import React, { useState, useCallback, memo } from "react";
import styled from "styled-components";
import ProjectRow from "../Components/ProjectRow";
import MoreButton from "../Components/MoreButton";
import journeyData from "../data/journey.json";

const INITIAL_ITEMS_COUNT = 7;

const SectionContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
      <ListContainer>
        {visibleItems.map((item, index) => {
          const Icon =
            item.icon || (journeyData.icons && journeyData.icons[item.type]);
          return (
            <ProjectRow
              key={index}
              year={item.year}
              title={item.title}
              category={item.type}
              link={item.link}
              icon={Icon}
              isNews={true}
              clickable={false}
            />
          );
        })}
      </ListContainer>
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
