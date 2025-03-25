import "./AutocompleteInput.css";
import { useState, useEffect } from "react";
import { useSuggestions } from "../../hooks/useSuggestions";
import { useLocation, useParams } from "react-router-dom";

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

      {showSuggestions && results.length > 0 && (
        <ul className="autocomplete-suggestions">
          {results.map((item) => (
            <li
              key={item[keyField]}
              className="autocomplete-item"
              onClick={() => handleSelect(item)}
            >
              {item[displayField]}
            </li>
          ))}
        </ul>
      )}

      {loading && <div className="autocomplete-loading">Loading...</div>}
    </div>
  );
};

export default AutocompleteInput;
