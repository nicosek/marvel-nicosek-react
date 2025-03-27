import { useEffect, useState } from "react";
import { fetchCharacters } from "../../api/characters";
import usePageFilters from "../../hooks/usePageFilters";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Pagination from "../../components/Pagination/Pagination";
import "./Characters.css";
import { DEFAULT_COMICS_LIMIT } from "../../constants/filters";
import Loader from "../../components/Loader/Loader";

const Characters = () => {
  const { filters, setFilters } = usePageFilters();
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || DEFAULT_COMICS_LIMIT;
  const name = filters.name;

  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPageMissing = filters.page === undefined;
    const isLimitMissing = filters.limit === undefined;

    if (isPageMissing || isLimitMissing) {
      setFilters({
        page: filters.page || 1,
        limit: filters.limit || DEFAULT_COMICS_LIMIT,
      });
    }
  });

  const loadCharactersData = async (params) => {
    try {
      const { characters, count } = await fetchCharacters(params);
      window.scrollTo({ top: 0 });
      setCharacters(characters);
      setCount(count);
    } catch (e) {
      console.error("Error loading characters:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadCharactersData({ page, limit, name });
  }, [page, limit, name]);

  return (
    <main className="characters-page">
      <div className="sticky-pagination">
        <h2 className="characters-title">Marvel Characters</h2>
        <div className="pagination-toolbar">
          <div className="pagination-left-space" />
          <div className="pagination-right-space">
            <Pagination totalCount={count} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="characters-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <ItemGrid
          items={characters}
          RenderItem={CharacterCard}
          propName="character"
        />
      )}
    </main>
  );
};

export default Characters;
