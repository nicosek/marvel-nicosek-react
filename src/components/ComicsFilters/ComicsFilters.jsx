import { useFilters } from "../../contexts/FiltersContext";
import "./ComicsFilters.css";

const ComicsFilters = () => {
  const { filters, updateFilters } = useFilters();

  const handleLimitChange = (e) => {
    updateFilters({ limit: Number(e.target.value), page: 1 });
  };

  const handleCharacterChange = (e) => {
    updateFilters({ characterId: e.target.value, page: 1 });
  };

  console.log(
    "[Filters] limit =",
    filters.limit,
    "typeof =",
    typeof filters.limit
  );

  return (
    <div className="comics-filters">
      <div className="filter-group">
        <label htmlFor="limit-select">Comics per page:</label>
        <select
          id="limit-select"
          value={filters.limit || 25}
          onChange={handleLimitChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="character-select">Filter by character:</label>
        <select
          id="character-select"
          value={filters.characterId}
          onChange={handleCharacterChange}
        >
          <option value="">All Characters</option>
          <option value="fake-1">Spider-Man</option>
          <option value="fake-2">Iron Man</option>
          <option value="fake-3">Captain Marvel</option>
        </select>
      </div>
    </div>
  );
};

export default ComicsFilters;
