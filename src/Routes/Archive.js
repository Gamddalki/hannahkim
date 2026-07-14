import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProjectRow from "../Components/ProjectRow";
import MoreButton from "../Components/MoreButton";

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
    margin-bottom: 25px;
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

const CATEGORY_ICONS = {
  Works: "/img/icons/code.svg",
  Publications: "/img/icons/paper.svg",
  "Visual Design": "/img/icons/design.svg",
  Music: "/img/icons/music.svg",
  Performance: "/img/icons/guitar.svg",
};

const Archive = memo(() => {
  const navigate = useNavigate();
  const [activeKeyword, setActiveKeyword] = useState("ALL");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    return list.sort((a, b) => {
      const startA = a.startDate || "";
      const startB = b.startDate || "";
      if (startA !== startB) {
        return startB.localeCompare(startA);
      }
      return a.title.localeCompare(b.title);
    });
  }, []);

  const uniqueKeywords = useMemo(() => {
    const keysSet = new Set();
    allItems.forEach((item) => {
      if (item.keywords && Array.isArray(item.keywords)) {
        item.keywords.forEach((kw) => keysSet.add(kw));
      }
    });
    return ["ALL", ...Array.from(keysSet).sort()];
  }, [allItems]);

  const filteredItems = useMemo(() => {
    if (activeKeyword === "ALL") return allItems;
    return allItems.filter(
      (item) => item.keywords && item.keywords.includes(activeKeyword),
    );
  }, [activeKeyword, allItems]);

  const visibleItems = useMemo(() => {
    if (!isMobile) return filteredItems;
    return showAll ? filteredItems : filteredItems.slice(0, 5);
  }, [isMobile, showAll, filteredItems]);

  const handleToggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <ArchiveContainer>
      <FilterWrapper>
        {uniqueKeywords.map((kw) => (
          <FilterButton
            key={kw}
            $active={activeKeyword === kw}
            onClick={() => {
              setActiveKeyword(kw);
              setShowAll(false);
            }}
          >
            {kw}
          </FilterButton>
        ))}
      </FilterWrapper>

      <TableBody>
        {visibleItems.map((item) => {
          return (
            <ProjectRow
              key={item.id}
              title={item.title}
              category={item.categoryName}
              subtitle={item.shortSubtitle || "—"}
              clickable={true}
              onClick={() => navigate(`/${item.id}`)}
              thumbnail={item.thumbnail}
              icon={CATEGORY_ICONS[item.categoryName]}
              isArchive={true}
            />
          );
        })}
      </TableBody>
      {isMobile && filteredItems.length > 5 && (
        <MoreButton onClick={handleToggleShowAll}>
          {showAll ? "Hide" : "More"}
        </MoreButton>
      )}
    </ArchiveContainer>
  );
});

Archive.displayName = "Archive";

export default Archive;
