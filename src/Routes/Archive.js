import React, { useState, useMemo, memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProjectRow from "../Components/ProjectRow";

import worksData from "../data/works.json";
import publicationsData from "../data/publications.json";
import visualData from "../data/visual.json";
import musicData from "../data/music.json";
import performanceData from "../data/performance.json";

const ArchiveContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 0;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 10px 0;
    margin-bottom: 12px;
    gap: 5px;
  }
`;

const FilterButton = styled.button`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  ${(props) =>
    props.$active ? props.theme.colors.black : props.theme.colors.subText};
  color: ${(props) =>
    props.$active ? props.theme.colors.black : props.theme.colors.subText};
  transition: all 0.2s ease;

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

const TableBody = styled.div`
  position: relative;
`;

const CATEGORIES = [
  "ALL",
  "Works",
  "Publications",
  "Visual Design",
  "Music",
  "Performance",
];

const Archive = memo(() => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("ALL");

  const allItems = useMemo(() => {
    const list = [
      ...worksData.map((item) => ({ ...item, categoryName: "Works" })),
      ...publicationsData.map((item) => ({
        ...item,
        categoryName: "Publications",
      })),
      ...visualData.map((item) => ({ ...item, categoryName: "Visual Design" })),
      ...musicData.map((item) => ({ ...item, categoryName: "Music" })),
      ...performanceData.map((item) => ({
        ...item,
        categoryName: "Performance",
      })),
    ];
    return list
      .filter((item) => !item.selected)
      .sort((a, b) => {
        const startA = a.startDate || "";
        const startB = b.startDate || "";
        if (startA !== startB) {
          return startB.localeCompare(startA);
        }
        return a.title.localeCompare(b.title);
      });
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return allItems;
    return allItems.filter((item) => item.categoryName === activeCategory);
  }, [activeCategory, allItems]);

  return (
    <ArchiveContainer>
      <FilterWrapper>
        {CATEGORIES.map((cat) => (
          <FilterButton
            key={cat}
            $active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </FilterButton>
        ))}
      </FilterWrapper>

      <TableBody>
        {filteredItems.map((item) => {
          const keywords = item.keywords ? item.keywords.join(", ") : "—";
          return (
            <ProjectRow
              key={item.id}
              title={item.title}
              category={item.categoryName}
              keywords={keywords}
              clickable={true}
              onClick={() => navigate(`/${item.id}`)}
              thumbnail={item.thumbnail}
            />
          );
        })}
      </TableBody>
    </ArchiveContainer>
  );
});

Archive.displayName = "Archive";

export default Archive;
