import { useEffect, useState } from "react";
import api from "../../api/client";
import usePageFilters from "../../hooks/usePageFilters";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import ComicCard from "../../components/ComicCard/ComicCard";
import Pagination from "../../components/Pagination/Pagination";
import "./Comics.css";
import { DEFAULT_COMICS_LIMIT } from "../../constants/filters";

const Comics = () => {
  const { filters } = usePageFilters();
  const {
    page = 1,
    limit = DEFAULT_COMICS_LIMIT,
    characterId = "",
    title = "",
  } = filters;

  const [comics, setComics] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const skip = (page - 1) * limit;
        const queryParams = new URLSearchParams();
        queryParams.append("limit", limit);
        queryParams.append("skip", skip);
        if (characterId) queryParams.append("characterId", characterId);
        if (title) queryParams.append("title", title);

        const response = await api.get(
          `/api/marvel/comics?${queryParams.toString()}`
        );
        window.scrollTo({ top: 0 });
        setComics(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    fetchComics();
  }, [page, limit, characterId, title]);

  return (
    <main className="comics-page">
      <div className="sticky-pagination">
        <h2 className="comics-title">All Marvel Comics</h2>
        <Pagination totalCount={count} />
      </div>

      <ItemGrid items={comics} RenderItem={ComicCard} propName="comic" />
    </main>
  );
};

export default Comics;
