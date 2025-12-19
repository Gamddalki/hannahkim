import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { PinIcon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import OptimizedThumbnail from "./OptimizedThumbnail";

const HashtagFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 5px;
    margin-bottom: 30px;
  }
`;

const HashtagFilterTag = styled.span`
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.hashText};
  background: transparent;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(
      ${(props) => (props.$skipTwoColumn ? "3" : "2")},
      1fr
    );
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ProjectCard = styled.div`
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    h3 {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  overflow: hidden;
  ${(props) => (props.$aspect ? `aspect-ratio: ${props.$aspect};` : "")}

  ${ProjectCard}:hover & img {
    filter: none;
  }
`;

const ProjectInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectMetaTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const MetaTag = styled.span`
  color: ${(props) => props.theme.colors.hashText};
  border: 1px solid ${(props) => props.theme.colors.hashText};
  padding: 2px 8px;
  font-size: 0.65rem;
  border-radius: 999px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin: 15px 0 7px 0;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 10px 0 5px 0;
  }
`;

const ProjectSubtitle = styled.h4`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.subText};
  font-weight: normal;
  opacity: 0.8;
  margin-bottom: 15px;
  line-height: 1.3;
`;

const PinIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  color: ${(props) => props.theme.colors.white};
  transition: color 0.3s ease;

  ${ProjectCard}:hover & {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Grid = ({
  items,
  onItemClick,
  getImageSrc,
  getTitle,
  getSubtitle,
  getMetaTags,
  getKey,
  tagField = "techStack",
  sortField = "startDate",
  showFilter = true,
  showSeeAllUnderCard = false,
  showPins = true,
  skipTwoColumn = false,
  disableSort = false,
}) => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  // Calculate tag counts and sort by frequency
  const allTags = useMemo(() => {
    const tagCounts = {};
    items.forEach((item) => {
      const itemTags = getMetaTags ? getMetaTags(item) : item[tagField];
      if (itemTags && Array.isArray(itemTags)) {
        itemTags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const tags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
      .map(([tag]) => tag);

    return tags;
  }, [items, getMetaTags, tagField]);

  const handleCardClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      const category = item.itemCategory || item.category || "projects";
      const id = getKey ? getKey(item) : item.id;
      navigate(`/${category}/${id}`);
    }
  };

  // Helper functions to reduce repetition
  const getItemValue = (item, getter, fallback) => {
    return getter ? getter(item) : item[fallback];
  };

  const handleTagClick = (tag) => {
    if (tag === "All") {
      setSelectedTags([]);
    } else if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredItems = useMemo(() => {
    const filtered =
      selectedTags.length > 0
        ? items.filter((item) => {
            const itemTags = getMetaTags ? getMetaTags(item) : item[tagField];
            return (
              itemTags && selectedTags.every((tag) => itemTags.includes(tag))
            );
          })
        : items;

    if (disableSort) {
      return filtered;
    }

    return filtered.sort((a, b) => {
      // Prioritize pinned items, then sort by date
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b[sortField]) - new Date(a[sortField]);
    });
  }, [selectedTags, items, getMetaTags, tagField, sortField, disableSort]);

  return (
    <>
      {/* Hashtag Filter */}
      {showFilter && (
        <HashtagFilterContainer>
          <HashtagFilterTag
            $isActive={selectedTags.length === 0}
            onClick={() => handleTagClick("All")}
          >
            All
          </HashtagFilterTag>
          {allTags.map((tag, index) => (
            <HashtagFilterTag
              key={index}
              $isActive={selectedTags.includes(tag)}
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </HashtagFilterTag>
          ))}
        </HashtagFilterContainer>
      )}

      <ProjectsGrid $skipTwoColumn={skipTwoColumn}>
        {filteredItems.map((item, index) => {
          const itemKey = getItemValue(item, getKey, "id");
          const itemTitle = getItemValue(item, getTitle, "title");
          const itemImageSrc = getItemValue(item, getImageSrc, "thumbnail");
          const itemMetaTags = getItemValue(item, getMetaTags, tagField);
          const isPriority = index < 3; // prioritize the first 3 items

          return (
            <ProjectCard key={itemKey} onClick={() => handleCardClick(item)}>
              {item.pinned && showPins && (
                <PinIconWrapper>
                  <HugeiconsIcon icon={PinIcon} size={20} />
                </PinIconWrapper>
              )}
              <ProjectImage $aspect="16/9">
                <OptimizedThumbnail
                  src={itemImageSrc}
                  alt={itemTitle}
                  showOverlay={false}
                  priority={isPriority}
                />
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{itemTitle}</ProjectTitle>
                {getSubtitle && (
                  <ProjectSubtitle>{getSubtitle(item)}</ProjectSubtitle>
                )}
                <ProjectMetaTags>
                  {itemMetaTags &&
                    itemMetaTags.map((tech, techIndex) => (
                      <MetaTag
                        key={techIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagClick(tech);
                        }}
                      >
                        #{tech}
                      </MetaTag>
                    ))}
                </ProjectMetaTags>
              </ProjectInfo>
            </ProjectCard>
          );
        })}
      </ProjectsGrid>
    </>
  );
};

export default Grid;
