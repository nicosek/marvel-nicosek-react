import "./AutocompleteInput.css";
import { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/useSuggestions";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const AutocompleteInput = ({
  placeholder = "Search comics by hero name",
  fetchSuggestions,
  onSelect,
  displayField = "name",
  keyField = "_id",
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { results, loading } = useSuggestions(fetchSuggestions, query);
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    const isCharacterPage = pathname === `/comics/${params.characterId}`;
    if (!isCharacterPage) {
      setQuery("");
    }
  }, [pathname, params.characterId]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (item) => {
    setQuery(item[displayField]);
    onSelect(item);
    setShowSuggestions(false);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className="autocomplete-input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />

      {showSuggestions && query.length > 0 && (
        <ul className="autocomplete-suggestions">
          {loading ? (
            <li className="autocomplete-loader-wrapper">
              <Loader />
            </li>
          ) : results.length > 0 ? (
            results.map((item) => (
              <li
                key={item[keyField]}
                className="autocomplete-item"
                onClick={() => handleSelect(item)}
              >
                {item[displayField]}
              </li>
            ))
          ) : (
            <li className="autocomplete-empty">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
