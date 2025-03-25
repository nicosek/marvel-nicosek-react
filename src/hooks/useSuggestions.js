import { useEffect, useState } from "react";

export const useSuggestions = (fetchFn, query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 1) return;

    const run = async () => {
      setLoading(true);
      try {
        const data = await fetchFn(query);
        setResults(data);
      } catch (e) {
        console.error("Suggestion error:", e);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(run, 300);
    return () => clearTimeout(debounce);
  }, [query, fetchFn]);

  return { results, loading };
};
