import { useSearchParams } from "react-router-dom";

const DEFAULTS = {
  page: 1,
  limit: 25,
  title: "",
  characterId: "",
};

const usePageFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Lecture des filtres actuels
  const filters = {
    page: Number(searchParams.get("page")) || DEFAULTS.page,
    limit: Number(searchParams.get("limit")) || DEFAULTS.limit,
    title: searchParams.get("title") || DEFAULTS.title,
    characterId: searchParams.get("characterId") || DEFAULTS.characterId,
  };

  // 🔹 Mise à jour des filtres
  const setFilters = (newFilters) => {
    const merged = { ...filters, ...newFilters };
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(merged)) {
      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value);
      }
    }

    setSearchParams(params);
  };

  return { filters, setFilters };
};

export default usePageFilters;
