import { useFilters } from "../../contexts/FiltersContext";
import "./Pagination.css";

const Pagination = ({ hasNextPage }) => {
  const { filters, updateFilters } = useFilters();
  const page = filters.page || 1;

  const setPage = (p) => updateFilters({ page: p });

  return (
    <div className="pagination">
      {page > 1 && (
        <>
          <button onClick={() => setPage(1)}>«</button>
          <button onClick={() => setPage(Math.max(1, page - 10))}>‹‹</button>
          <button onClick={() => setPage(page - 1)}>‹</button>
        </>
      )}

      <span className="current-page">Page {page}</span>

      {hasNextPage && (
        <>
          <button onClick={() => setPage(page + 1)}>›</button>
          <button onClick={() => setPage(page + 10)}>››</button>
          <button onClick={() => setPage(9999)}>»</button>
        </>
      )}
    </div>
  );
};

export default Pagination;
