import "./SearchBar.css";
import { useState, useEffect } from "react";
import usePageFilters from "../../hooks/usePageFilters";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { filters, setFilters } = usePageFilters();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const isResultsPage = ["/comics", "/characters"].includes(location.pathname);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newParams = { title: search, page: 1 };

    if (!isResultsPage) {
      const searchString = new URLSearchParams(newParams).toString();
      navigate(`/comics?${searchString}`);
    } else {
      setFilters(newParams);
    }
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
