import { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({ page: 1, limit: 25 });
  const [filtersActivated, setFiltersActivated] = useState(false);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setFiltersActivated(true); // ✅ signal d'intention utilisateur
  };

  return (
    <FiltersContext.Provider
      value={{ filters, updateFilters, filtersActivated }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
