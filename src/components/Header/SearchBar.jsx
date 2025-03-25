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
  const isCharacterPage = location.pathname.startsWith("/characters");
  const isComicPage = location.pathname.startsWith("/comics");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newParams = { [isCharacterPage ? "name" : "title"]: search, page: 1 };
    const searchString = new URLSearchParams(newParams).toString();
    const destination_pathname = location.pathname.startsWith("/characters")
      ? "/characters"
      : "comics";

    navigate(`${destination_pathname}?${searchString}`);
  };

  useEffect(() => {
    if (isComicPage || isCharacterPage) {
      setSearch(filters.title || "");
    }
  }, [filters.title, isCharacterPage, isComicPage]);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        className="search-bar"
        placeholder={
          location.pathname.startsWith("/characters")
            ? "Search characters..."
            : "Search comics..."
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
};

export default SearchBar;
