import { useSearchParams } from "react-router-dom";

const DEFAULTS = {
  page: 1,
  limit: 25,
  title: "",
};
const usePageFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = Object.fromEntries(searchParams.entries());

  const setFilters = (newFilters) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries({ ...filters, ...newFilters })) {
      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, value);
      }
    }

    setSearchParams(params);
  };

  return { filters, setFilters };
};

export default usePageFilters;
