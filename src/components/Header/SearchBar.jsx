import "./SearchBar.css";
import { useState } from "react";
import { useFilters } from "../../contexts/FiltersContext";

const SearchBar = () => {
  const { updateFilters } = useFilters();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters({ title: search, page: 1 }); // reset page aussi
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        className="search-bar"
        placeholder="Search comics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
};

export default SearchBar;
