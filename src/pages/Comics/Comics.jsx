import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComics } from "../../api/comics";
import usePageFilters from "../../hooks/usePageFilters";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import ComicCard from "../../components/ComicCard/ComicCard";
import ComicsToolbar from "../../components/ComicsToolbar/ComicsToolbar";
import "./Comics.css";
import { DEFAULT_COMICS_LIMIT } from "../../constants/filters";
import Loader from "../../components/Loader/Loader";

const Comics = () => {
  const { filters, setFilters } = usePageFilters();
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || DEFAULT_COMICS_LIMIT;
  const title = filters.title;
  const { characterId = "" } = useParams();

  const [comics, setComics] = useState([]);
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
  }, []);

  const loadComicsData = async (params) => {
    try {
      const { comics, count } = await fetchComics(params);
      window.scrollTo({ top: 0 });
      setComics(comics);
      setCount(count);
    } catch (e) {
      console.error("Error loading comics (filters):", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔁 Changement de filtre (hors character)
  useEffect(() => {
    if (!characterId) {
      loadComicsData({ page, limit, title });
    }
  }, [page, limit, title]);

  // 🔁 Changement de character
  useEffect(() => {
    if (characterId) {
      loadComicsData({ characterId });
    }
  }, [characterId]);

  return (
    <main className="comics-page">
      <div className="sticky-pagination">
        <h2 className="comics-title">All Marvel Comics</h2>
        <ComicsToolbar totalCount={count} />
      </div>

      {isLoading ? (
        <div className="comics-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <ItemGrid items={comics} RenderItem={ComicCard} propName="comic" />
      )}
    </main>
  );
};

export default Comics;
