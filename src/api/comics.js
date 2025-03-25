import api from "./client";

export const fetchComics = async ({ characterId, page, limit, title }) => {
  if (characterId) {
    const response = await api.get(`/api/marvel/comics/${characterId}`);
    const comics = response.data.comics || [];

    return {
      comics,
      count: comics.length,
    };
  }

  const skip = (page - 1) * limit;
  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit);
  queryParams.append("skip", skip);
  if (title) queryParams.append("title", title);

  const response = await api.get(
    `/api/marvel/comics?${queryParams.toString()}`
  );

  return {
    comics: response.data.results,
    count: response.data.count,
  };
};
