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
  font-weight: 500;
  border-radius: 999px;
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
  column-count: 3;
  column-gap: 40px;
  margin-top: 40px;

  @media (max-width: 1200px) {
    column-count: ${(props) => (props.$skipTwoColumn ? "3" : "2")};
  }

  @media (max-width: 768px) {
    column-count: 1;
    column-gap: 25px;
  }
`;

const ProjectCard = styled.div`
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  margin-bottom: 50px;
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
  font-weight: 500;
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
`;

const ProjectSubtitle = styled.h4`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.subText};
  font-weight: normal;
  opacity: 0.8;
  margin-bottom: 15px;
  line-height: 1.3;
`;

const SeeAllButton = styled.button`
  align-self: flex-end;
  background: transparent;
  color: ${(props) => props.theme.colors.hashText};
  border-bottom: 1px solid ${(props) => props.theme.colors.hashText};
  padding: 2px 0;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 2px;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
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

const MasonryGrid = ({
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
  showOverlay = true,
  skipTwoColumn = false,
  uniformAspect = null,
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

    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
      .map(([tag]) => tag);
  }, [items, getMetaTags, tagField]);

  const handleCardClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      const category = item.category || "projects";
      const id = getKey ? getKey(item) : item.id;
      navigate(`/${category}/${id}`);
    }
  };

  const handleHashtagFilterClick = (tag) => {
    if (tag === "All") {
      setSelectedTags([]);
    } else if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleMetaTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (selectedTags.length > 0) {
      filtered = items.filter((item) => {
        const itemTags = getMetaTags ? getMetaTags(item) : item[tagField];
        return itemTags && selectedTags.every((tag) => itemTags.includes(tag));
      });
    }

    return filtered.sort((a, b) => {
      // First, prioritize pinned items
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      // Then sort by date
      return new Date(b[sortField]) - new Date(a[sortField]);
    });
  }, [selectedTags, items, getMetaTags, tagField, sortField]);

  return (
    <>
      {/* Hashtag Filter */}
      {showFilter && (
        <HashtagFilterContainer data-no-hover>
          <HashtagFilterTag
            $isActive={selectedTags.length === 0}
            onClick={() => handleHashtagFilterClick("All")}
          >
            All
          </HashtagFilterTag>
          {allTags.map((tag, index) => (
            <HashtagFilterTag
              key={index}
              $isActive={selectedTags.includes(tag)}
              onClick={() => handleHashtagFilterClick(tag)}
            >
              #{tag}
            </HashtagFilterTag>
          ))}
        </HashtagFilterContainer>
      )}

      <ProjectsGrid $skipTwoColumn={skipTwoColumn}>
        {filteredItems.map((item, index) => (
          <ProjectCard
            key={getKey ? getKey(item) : index}
            onClick={() => handleCardClick(item)}
            data-more-hover
          >
            {item.pinned && showPins && (
              <PinIconWrapper>
                <HugeiconsIcon icon={PinIcon} size={20} />
              </PinIconWrapper>
            )}
            <ProjectImage $aspect={uniformAspect}>
              <OptimizedThumbnail
                src={getImageSrc ? getImageSrc(item) : item.thumbnail}
                alt={getTitle ? getTitle(item) : item.title}
                layout={uniformAspect ? "cover" : "auto"}
                showOverlay={showOverlay}
                priority={false}
              />
            </ProjectImage>
            <ProjectInfo>
              <ProjectTitle>
                {getTitle ? getTitle(item) : item.title}
              </ProjectTitle>
              {getSubtitle && (
                <ProjectSubtitle>{getSubtitle(item)}</ProjectSubtitle>
              )}
              <ProjectMetaTags>
                {getMetaTags &&
                  getMetaTags(item) &&
                  getMetaTags(item).map((tech, techIndex) => (
                    <MetaTag
                      key={techIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMetaTagClick(tech);
                      }}
                      data-no-hover
                    >
                      #{tech}
                    </MetaTag>
                  ))}
              </ProjectMetaTags>
            </ProjectInfo>
            {showSeeAllUnderCard && (
              <SeeAllButton
                data-no-hover
                onClick={(e) => {
                  e.stopPropagation();
                  const category = item.category || "projects";
                  navigate(`/${category}`);
                }}
              >
                See all{" "}
                {item.category
                  ? item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)
                  : "Projects"}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
              </SeeAllButton>
            )}
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </>
  );
};

export default MasonryGrid;
