import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import projectData from "../data/projects.json";
import PageContainer from "../Components/PageContainer";

const ProjectsGrid = styled.div`
  column-count: 3;
  column-gap: 30px;
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
  background: ${(props) => props.theme.colors.cardBackground || "#fff"};
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  margin-bottom: 30px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
    filter: grayscale(95%) hue-rotate(-30deg) saturate(3);
    @media (max-width: 768px) {
      filter: none;
    }
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
    filter: none;
  }
`;

const ProjectInfo = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectMetaTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
`;

const SelectedTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SelectedTag = styled.span`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    color: white;
  }
  &:hover {
    background: ${(props) => props.theme.colors.hover};
    transform: translateY(-2px);
  }
`;

const MetaTag = styled.span`
  color: ${(props) => props.theme.colors.hashText};
  border: 1px solid ${(props) => props.theme.colors.hashText};
  padding: 3px 9px;
  font-size: 0.65rem;
  font-weight: 500;
  border-radius: 20px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.primary};
`;

const ProjectSubtitle = styled.h4`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.subText};
  font-weight: normal;
  opacity: 0.8;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 12px;
  flex-grow: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
`;

const Tag = styled.span`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 500;
`;

function Projects() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCardClick = (projectId) => {
    navigate(`/projects/${projectId}`);
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

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return projectData.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
    }

    return projectData
      .filter(
        (project) =>
          project.techStack &&
          selectedTags.every((tag) => project.techStack.includes(tag))
      )
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  }, [selectedTags]);

  return (
    <PageContainer title="PROJECTS">
      {selectedTags.length > 0 && (
        <SelectedTagContainer data-no-hover>
          {selectedTags.map((tag, index) => (
            <SelectedTag key={index} onClick={() => handleRemoveTag(tag)}>
              #{tag}
              <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
            </SelectedTag>
          ))}
        </SelectedTagContainer>
      )}

      <ProjectsGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            onClick={() => handleCardClick(project.id)}
            data-more-hover
          >
            <ProjectImage>
              <img
                src={`${process.env.PUBLIC_URL}/${project.thumbnail}`}
                alt={project.title}
              />
            </ProjectImage>
            <ProjectInfo>
              <ProjectMetaTags>
                {project.techStack &&
                  project.techStack.map((tech, techIndex) => (
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
              <ProjectTitle>{project.title}</ProjectTitle>
              {project.subtitle && (
                <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
              )}
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.tags &&
                  project.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>{tag}</Tag>
                  ))}
              </ProjectTags>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PageContainer>
  );
}

export default Projects;
