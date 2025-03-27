import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../../api/client";
import "./FavoriteToggle.css";
import {
  addFavoriteToUserStorage,
  removeFavoriteFromUserStorage,
} from "../../utils/favoritesStorage";
import { Star } from "lucide-react";

const FavoriteToggle = ({ resourceId, resourceType = "comic" }) => {
  const { token, userData, setUserData } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [animateStar, setAnimateStar] = useState(false);

  useEffect(() => {
    if (userData?.favorites) {
      const exists = userData.favorites.some(
        (fav) => fav.marvelId === resourceId
      );
      setIsFavorite(exists);
    }
  }, [userData, resourceId]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) return;

    try {
      if (isFavorite) {
        const favoriteToRemove = userData.favorites.find(
          (fav) => fav.marvelId === resourceId && fav.type === resourceType
        );

        if (!favoriteToRemove) {
          console.warn("Favorite not found in local userData");
          return;
        }

        await api.delete(`/api/favorites/${favoriteToRemove._id}`);

        const updatedUser = removeFavoriteFromUserStorage(favoriteToRemove._id);
        setUserData(updatedUser);
      } else {
        const response = await api.post("/api/favorites", {
          marvelId: resourceId,
          type: resourceType,
        });
        const newFavorite = response.data;
        const updatedUser = addFavoriteToUserStorage(newFavorite);
        setUserData(updatedUser);
        setAnimateStar(true);
        setTimeout(() => setAnimateStar(false), 500);
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <button
      className={`favorite-toggle ${isFavorite ? "favorited" : ""}`}
      onClick={toggleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {/* {isFavorite ? (
        <Star size={40} fill="gold" stroke="black" />
      ) : (
        <Star size={40} fill="white" stroke="black" style={{ opacity: 0.6 }} />
      )} */}
      <Star
        className={animateStar ? "animated-star" : ""}
        size={40}
        fill={isFavorite ? "gold" : "white"}
        stroke="black"
        style={isFavorite ? {} : { opacity: 0.6 }}
      />
    </button>
  );
};

export default FavoriteToggle;
