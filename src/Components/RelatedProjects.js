import React, { useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import OptimizedThumbnail from "./OptimizedThumbnail";

const RelatedProjectsContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.black};
  padding-top: 70px;

  @media (max-width: 768px) {
    padding-top: 50px;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 25px;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

const ProjectsGrid = styled.div`
  display: flex;
  gap: 2rem;
  height: 150px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    height: 300px;
  }
`;

const ProjectCard = styled.div`
  flex: 1;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ease;
  will-change: transform;
  transform: translateZ(0);

  img {
    filter: grayscale(95%) hue-rotate(-30deg) saturate(3);
  }

  &:hover {
    transform: scale(1.02) translateZ(0);
    img {
      filter: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    img {
      filter: none;
    }
  }
`;

const ProjectInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  color: white;
  z-index: 1;
  text-align: center;
  width: 90%;

  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  padding: 0 1rem;
  color: white;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 1.1rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 768px) {
    line-height: 1;
  }
`;

const ProjectSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.3;
  text-align: center;
  color: white;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    line-height: 1.2;
  }
`;

const RelatedProjects = ({ currentItem, allData, category, maxItems = 3 }) => {
  const navigate = useNavigate();

  const relatedProjects = useMemo(() => {
    if (!currentItem || !allData) return [];

    // Get all tags from current item
    const currentTags = new Set();

    // Collect tags from different fields
    if (currentItem.category && Array.isArray(currentItem.category)) {
      currentItem.category.forEach((tag) => currentTags.add(tag.toLowerCase()));
    }
    if (currentItem.tools && Array.isArray(currentItem.tools)) {
      currentItem.tools.forEach((tag) => currentTags.add(tag.toLowerCase()));
    }
    if (currentItem.framework && Array.isArray(currentItem.framework)) {
      currentItem.framework.forEach((tag) =>
        currentTags.add(tag.toLowerCase())
      );
    }
    if (currentItem.indexTerms && Array.isArray(currentItem.indexTerms)) {
      currentItem.indexTerms.forEach((tag) =>
        currentTags.add(tag.toLowerCase())
      );
    }

    // Calculate similarity with other projects
    const scoredProjects = allData
      .filter((item) => item.id !== currentItem.id) // Exclude current project
      .map((item) => {
        const itemTags = new Set();

        // Collect tags from the item
        if (item.category && Array.isArray(item.category)) {
          item.category.forEach((tag) => itemTags.add(tag.toLowerCase()));
        }
        if (item.tools && Array.isArray(item.tools)) {
          item.tools.forEach((tag) => itemTags.add(tag.toLowerCase()));
        }
        if (item.framework && Array.isArray(item.framework)) {
          item.framework.forEach((tag) => itemTags.add(tag.toLowerCase()));
        }
        if (item.indexTerms && Array.isArray(item.indexTerms)) {
          item.indexTerms.forEach((tag) => itemTags.add(tag.toLowerCase()));
        }

        // Count common tags
        let commonCount = 0;
        currentTags.forEach((tag) => {
          if (itemTags.has(tag)) commonCount++;
        });

        return { item, score: commonCount };
      })
      .filter((scored) => scored.score > 0) // Only keep items with at least 1 common tag
      .sort((a, b) => {
        // First sort by score (descending)
        if (b.score !== a.score) return b.score - a.score;

        // If same score, prioritize pinned
        if (a.item.pinned && !b.item.pinned) return -1;
        if (!a.item.pinned && b.item.pinned) return 1;

        // Then sort by date
        const dateA = new Date(a.item.startDate || a.item.date);
        const dateB = new Date(b.item.startDate || b.item.date);
        return dateB - dateA;
      })
      .slice(0, maxItems)
      .map((scored) => scored.item);

    return scoredProjects;
  }, [currentItem, allData, maxItems]);

  const handleProjectClick = (item) => {
    const itemCategory =
      item.category && Array.isArray(item.category)
        ? category // Use the same category page
        : category;
    navigate(`/${itemCategory}/${item.id}`);
    window.scrollTo(0, 0);
  };

  if (relatedProjects.length === 0) {
    return null; // Don't show section if no related projects
  }

  return (
    <RelatedProjectsContainer>
      <Title>Related Projects</Title>
      <ProjectsGrid>
        {relatedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            onClick={() => handleProjectClick(project)}
            data-more-hover
          >
            <OptimizedThumbnail
              src={`${process.env.PUBLIC_URL}${project.thumbnail}`}
              alt={project.title}
              layout="cover"
              priority={false}
            />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </RelatedProjectsContainer>
  );
};

export default RelatedProjects;
