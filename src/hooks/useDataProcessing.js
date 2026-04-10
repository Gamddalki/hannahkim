import { useMemo } from "react";
import worksData from "../data/works.json";
import publicationsData from "../data/publications.json";

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
    ...processSelectedWorks(worksData, "works"),
  ];

  const moreWorks = [
    ...processMoreWorks(worksData, CATEGORY_MAPPING.works),
    ...processMoreWorks(publicationsData, CATEGORY_MAPPING.publications),
  ];

  return { selectedWorks, moreWorks };
};

export const useDataProcessing = () => {
  const processedData = useMemo(() => {
    return processData();
  }, []);

  return processedData;
};
