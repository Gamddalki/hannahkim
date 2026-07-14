import React, { useState, useCallback, memo } from "react";
import styled from "styled-components";
import ProjectRow from "../Components/ProjectRow";
import MoreButton from "../Components/MoreButton";
import trajectoryData from "../data/trajectory.json";

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

const Trajectory = memo(() => {
  const [showAll, setShowAll] = useState(false);
  const { journeyData: trajectoryItems } = trajectoryData;

  const visibleItems = showAll
    ? trajectoryItems
    : trajectoryItems.slice(0, INITIAL_ITEMS_COUNT);

  const handleToggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <SectionContainer>
      <ListContainer>
        {visibleItems.map((item, index) => {
          const Icon =
            item.icon || (trajectoryData.icons && trajectoryData.icons[item.type]);
          return (
            <ProjectRow
              key={index}
              year={item.year}
              title={item.title}
              category={item.type}
              link={item.link}
              icon={Icon}
              isTrajectory={true}
              clickable={false}
            />
          );
        })}
      </ListContainer>
      {trajectoryItems.length > INITIAL_ITEMS_COUNT && (
        <MoreButton onClick={handleToggleShowAll}>
          {showAll ? "Hide" : "More"}
        </MoreButton>
      )}
    </SectionContainer>
  );
});

Trajectory.displayName = "Trajectory";

export default Trajectory;
