import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilters } from "../contexts/FiltersContext";

const NAVIGATING_FILTERS = ["title", "characterId"];

const FiltersListener = () => {
  const { filters, filtersActivated } = useFilters();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search } = location;
    const isComicsPage = pathname.startsWith("/comics");
    const isCharactersPage = pathname.startsWith("/characters");

    // ❌ On ne redirige pas depuis /comics ou /characters
    if (isComicsPage || isCharactersPage || !filtersActivated) return;

    // ✅ On ne redirige que si un filtre "navigant" est présent
    const hasNavigatingFilter = NAVIGATING_FILTERS.some(
      (key) => filters[key] && filters[key] !== ""
    );

    if (!hasNavigatingFilter) return;

    const { characterId, ...query } = filters;
    const params = new URLSearchParams(query);
    const target = characterId
      ? `/comics/${characterId}?${params.toString()}`
      : `/comics?${params.toString()}`;

    const currentURL = `${pathname}${search}`;
    if (target !== currentURL) {
      setTimeout(() => navigate(target), 0);
    }
  }, [filters, location]);

  return null;
};

export default FiltersListener;
