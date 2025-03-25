import "./SearchBar.css";
import { useState, useEffect } from "react";
import usePageFilters from "../../hooks/usePageFilters";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { filters } = usePageFilters();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isResultsPage =
    location.pathname.startsWith("/comics") ||
    location.pathname.startsWith("/characters");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newParams = { title: search, page: 1 };
    const searchString = new URLSearchParams(newParams).toString();
    const destination_pathname = location.pathname.startsWith("/characters")
      ? "/characters"
      : "comics";

    navigate(`${destination_pathname}?${searchString}`);
  };

  useEffect(() => {
    if (isResultsPage) {
      setSearch(filters.title || "");
    }
  }, [filters.title, isResultsPage]);

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
