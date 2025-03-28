// src/hooks/useFavoriteStatus.js
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/client";
import {
  addFavoriteToUserStorage,
  removeFavoriteFromUserStorage,
} from "../utils/favoritesStorage";

export const useFavoriteStatus = (resourceId, resourceType = "comic") => {
  const { token, userData, setUserData } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (userData?.favorites) {
      const exists = userData.favorites.some(
        (fav) => fav.marvelId === resourceId
      );
      setIsFavorite(exists);
    }
  }, [userData, resourceId]);

  const toggleFavorite = async () => {
    if (!token) return;

    try {
      if (isFavorite) {
        const favoriteToRemove = userData.favorites.find(
          (fav) => fav.marvelId === resourceId && fav.type === resourceType
        );

        if (!favoriteToRemove) return;

        await api.delete(`/api/favorites/${favoriteToRemove._id}`);
        const updatedUser = removeFavoriteFromUserStorage(favoriteToRemove._id);
        setUserData(updatedUser);
        setIsFavorite(false);
      } else {
        const response = await api.post("/api/favorites", {
          marvelId: resourceId,
          type: resourceType,
        });
        const newFavorite = response.data;
        const updatedUser = addFavoriteToUserStorage(newFavorite);
        setUserData(updatedUser);
        setIsFavorite(true);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return { isFavorite, toggleFavorite, animate };
};
