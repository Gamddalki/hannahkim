import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { PinIcon } from "@hugeicons/core-free-icons";
import OptimizedThumbnail from "./OptimizedThumbnail";

const ProjectsGrid = styled.div`
  column-count: 3;
  column-gap: 40px;
  margin-top: 40px;

  @media (max-width: 1200px) {
    column-count: 2;
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

const SelectedTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SelectedTag = styled.span`
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: 6px 12px;
  font-size: 0.8rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
  }
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

const PinIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  color: ${(props) => props.theme.colors.primary};
  transition: color 0.3s ease;

  ${ProjectCard}:hover & {
    color: ${(props) => props.theme.colors.white};
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
}) => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCardClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      const category = item.category || "projects";
      const id = getKey ? getKey(item) : item.id;
      navigate(`/${category}/${id}`);
    }
  };

  const handleMetaTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
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
      {selectedTags.length > 0 && (
        <SelectedTagContainer data-no-hover>
          {selectedTags.map((tag, index) => (
            <SelectedTag key={index} onClick={() => handleRemoveTag(tag)}>
              #{tag}
            </SelectedTag>
          ))}
        </SelectedTagContainer>
      )}

      <ProjectsGrid>
        {filteredItems.map((item, index) => (
          <ProjectCard
            key={getKey ? getKey(item) : index}
            onClick={() => handleCardClick(item)}
            data-more-hover
          >
            {item.pinned && (
              <PinIconWrapper>
                <HugeiconsIcon icon={PinIcon} size={20} />
              </PinIconWrapper>
            )}
            <ProjectImage>
              <OptimizedThumbnail
                src={getImageSrc ? getImageSrc(item) : item.thumbnail}
                alt={getTitle ? getTitle(item) : item.title}
                layout="auto"
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
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </>
  );
};

export default MasonryGrid;
