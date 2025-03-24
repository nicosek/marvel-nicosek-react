import usePageFilters from "../../hooks/usePageFilters";
import {
  COMICS_LIMIT_OPTIONS,
  DEFAULT_COMICS_LIMIT,
} from "../../constants/filters";
import "./Pagination.css";

const Pagination = ({ totalCount }) => {
  const { filters, setFilters } = usePageFilters();
  const { page = 1, limit = DEFAULT_COMICS_LIMIT } = filters;

  const lastPage = Math.ceil(totalCount / limit);
  const hasNextPage = page < lastPage;

  const setPage = (p) => {
    const safePage = Math.max(1, Math.min(lastPage, p));
    setFilters({ page: safePage });
  };

  const handleLimitChange = (e) => {
    setFilters({ limit: Number(e.target.value), page: 1 });
  };

  return (
    <div className="pagination-container">
      <div className="pagination-placeholder" />

      <div className="pagination-controls">
        {page > 1 && (
          <>
            <button onClick={() => setPage(1)}>«</button>
            <button onClick={() => setPage(page - 10)}>‹‹</button>
            <button onClick={() => setPage(page - 1)}>‹</button>
          </>
        )}

        <span className="current-page">
          Page {page} / {lastPage}
        </span>

        {hasNextPage && (
          <>
            <button onClick={() => setPage(page + 1)}>›</button>
            <button onClick={() => setPage(page + 10)}>››</button>
            <button onClick={() => setPage(lastPage)}>»</button>
          </>
        )}
      </div>

      <div className="pagination-limit">
        <label htmlFor="limit-select">Comics per page:</label>
        <select
          id="limit-select"
          className="limit-select"
          value={limit}
          onChange={handleLimitChange}
        >
          {COMICS_LIMIT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
