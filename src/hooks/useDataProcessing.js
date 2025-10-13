import { useMemo } from "react";
import projectsData from "../data/projects.json";
import publicationsData from "../data/publications.json";
import artsData from "../data/arts.json";

const processData = () => {
  // Selected works - 더 효율적인 필터링
  const selectedWorks = [
    ...projectsData
      .filter((project) => project.selected)
      .map((project) => ({ ...project, category: "projects" })),
    ...publicationsData
      .filter((publication) => publication.selected)
      .map((publication) => ({ ...publication, category: "publications" })),
    ...artsData
      .filter((art) => art.selected)
      .map((art) => ({ ...art, category: "arts" })),
  ];

  // More works - 미리 정의된 매핑 사용
  const categoryMapping = {
    projects: { category: "projects", categoryDisplayName: "Projects" },
    publications: {
      category: "publications",
      categoryDisplayName: "Publications",
    },
    arts: { category: "arts", categoryDisplayName: "Arts" },
  };

  const moreWorks = [
    ...projectsData
      .filter((project) => project.more === true)
      .map((project) => ({ ...project, ...categoryMapping.projects })),
    ...publicationsData
      .filter((publication) => publication.more === true)
      .map((publication) => ({
        ...publication,
        ...categoryMapping.publications,
      })),
    ...artsData
      .filter((art) => art.more === true)
      .map((art) => ({ ...art, ...categoryMapping.arts })),
  ];

  return { selectedWorks, moreWorks };
};

export const useDataProcessing = () => {
  const processedData = useMemo(() => {
    return processData();
  }, []);

  return processedData;
};
