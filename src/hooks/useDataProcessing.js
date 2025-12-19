import { useMemo } from "react";
import projectsData from "../data/projects.json";
import publicationsData from "../data/publications.json";
import artsData from "../data/arts.json";

export const useDataProcessing = () => {
  const selectedWorks = useMemo(() => {
    return [
      ...publicationsData.map((item) => ({
        ...item,
        itemCategory: "publications",
      })),
      ...projectsData.map((item) => ({ ...item, itemCategory: "projects" })),
      ...artsData.map((item) => ({ ...item, itemCategory: "arts" })),
    ];
  }, []);

  return { selectedWorks };
};
