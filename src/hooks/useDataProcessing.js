import { useMemo } from "react";
import projectsData from "../data/projects.json";
import publicationsData from "../data/publications.json";
import artsData from "../data/arts.json";

const CATEGORY_MAPPING = {
  projects: { category: "projects", categoryDisplayName: "Projects" },
  publications: {
    category: "publications",
    categoryDisplayName: "Publications",
  },
  arts: { category: "arts", categoryDisplayName: "Arts" },
};

// helper functions
const processSelectedWorks = (data, category) => {
  return data
    .filter((item) => item.selected)
    .map((item) => ({ ...item, category }));
};

const processMoreWorks = (data, categoryMapping) => {
  return data
    .filter((item) => item.more === true)
    .map((item) => ({ ...item, ...categoryMapping }));
};

const processData = () => {
  const selectedWorks = [
    ...processSelectedWorks(publicationsData, "publications"),
    ...processSelectedWorks(projectsData, "projects"),
    ...processSelectedWorks(artsData, "arts"),
  ];

  const moreWorks = [
    ...processMoreWorks(projectsData, CATEGORY_MAPPING.projects),
    ...processMoreWorks(publicationsData, CATEGORY_MAPPING.publications),
    ...processMoreWorks(artsData, CATEGORY_MAPPING.arts),
  ];

  return { selectedWorks, moreWorks };
};

export const useDataProcessing = () => {
  const processedData = useMemo(() => {
    return processData();
  }, []);

  return processedData;
};
