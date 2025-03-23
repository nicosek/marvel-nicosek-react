import { useEffect, useState } from "react";
import { useFilters } from "../../contexts/FiltersContext";
import api from "../../api/client";
import ComicsFilters from "../../components/ComicsFilters/ComicsFilters";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import Pagination from "../../components/Pagination/Pagination";
import ComicCard from "../../components/ComicCard/ComicCard";
import "./Comics.css";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [_isLoading, setIsLoading] = useState(false);
  const { filters, updateFilters } = useFilters();
  const { page = 1, limit = 25, characterId = "", title = "" } = filters;

  useEffect(() => {
    const fetchComics = async () => {
      const skip = (page - 1) * limit;
      const queryParams = new URLSearchParams();
      queryParams.append("limit", limit);
      queryParams.append("skip", skip);
      if (characterId) queryParams.append("characterId", characterId);
      if (title) queryParams.append("title", title);

      try {
        const response = await api.get(
          `/api/marvel/comics?${queryParams.toString()}`
        );
        setComics(response.data.results);
        window.scrollTo({ top: 0 });
      } catch (err) {
        console.error("Error fetching comics:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComics();
  }, [limit, page, characterId, title]);

  return (
    <main className="comics-page">
      <div className="sticky-filters-pagination">
        <h2 className="comics-title">All Marvel Comics</h2>
        <div className="filters-and-pagination">
          <ComicsFilters
            limit={filters.limit}
            setLimit={(val) => updateFilters({ limit: val })}
            characterId={filters.characterId}
            setCharacterId={(val) => updateFilters({ characterId: val })}
            resetPage={() => updateFilters({ page: 1 })}
          />

          <Pagination
            page={filters.page}
            setPage={(val) => updateFilters({ page: val })}
            hasNextPage={comics.length === filters.limit}
          />
        </div>
      </div>

      <ItemGrid items={comics} RenderItem={ComicCard} propName="comic" />
    </main>
  );
};

export default Comics;
