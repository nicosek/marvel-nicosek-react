import api from "./client";

export const fetchCharacters = async ({ page, limit, name }) => {
  const skip = (page - 1) * limit;

  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit);
  queryParams.append("skip", skip);
  if (name) queryParams.append("name", name);

  const response = await api.get(
    `/api/marvel/characters?${queryParams.toString()}`
  );

  return {
    characters: response.data.results,
    count: response.data.count,
  };
};
