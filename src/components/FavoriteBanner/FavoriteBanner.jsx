import { useFavoriteStatus } from "../../hooks/useFavoriteStatus";
import "./FavoriteBanner.css";

const FavoriteBanner = ({ resourceId, resourceType }) => {
  const { isFavorite, toggleFavorite, animate } = useFavoriteStatus(
    resourceId,
    resourceType
  );

  return (
    <div
      className={`favorite-banner ${
        isFavorite ? "favorited" : "not-favorited"
      }`}
    >
      <button
        className={`favorite-banner-btn ${animate ? "animated-star" : ""}`}
        onClick={toggleFavorite}
      >
        {isFavorite ? "★ Favorite" : "☆ Add to Favorites"}
      </button>
    </div>
  );
};

export default FavoriteBanner;
