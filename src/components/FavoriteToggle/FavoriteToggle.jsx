import { Star } from "lucide-react";
import { useFavoriteStatus } from "../../hooks/useFavoriteStatus";
import "./FavoriteToggle.css";

const FavoriteToggle = ({ resourceId, resourceType }) => {
  const { isFavorite, toggleFavorite, animate } = useFavoriteStatus(
    resourceId,
    resourceType
  );

  return (
    <button
      className={`favorite-toggle ${isFavorite ? "favorited" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={animate ? "animated-star" : ""}
        size={40}
        fill={isFavorite ? "gold" : "white"}
        stroke="black"
        style={isFavorite ? {} : { opacity: 0.6 }}
      />
    </button>
  );
};

export default FavoriteToggle;
