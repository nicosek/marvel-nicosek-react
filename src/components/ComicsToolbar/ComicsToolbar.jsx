import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";
import Pagination from "../Pagination/Pagination";
import "./ComicsToolbar.css";
import api from "../../api/client";
import usePageFilters from "../../hooks/usePageFilters";
import { useNavigate } from "react-router-dom";

const ComicsToolbar = ({ totalCount }) => {
  const { setFilters } = usePageFilters();
  const navigate = useNavigate();

  const fetchCharacterSuggestions = async (query) => {
    const response = await api.get(`/api/marvel/characters?name=${query}`);
    return response.data.results;
  };

  const handleCharacterSelect = (character) => {
    const characterId = character._id;
    setFilters({ page: 1 });
    navigate(`/comics/${characterId}`);
  };

  return (
    <div className="comics-toolbar">
      <div className="toolbar-zone left">
        <AutocompleteInput
          fetchSuggestions={fetchCharacterSuggestions}
          onSelect={handleCharacterSelect}
        />
      </div>
      <div className="toolbar-zone center">
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
};

export default ComicsToolbar;
