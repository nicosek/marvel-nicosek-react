import { useFilters } from "../../contexts/FiltersContext";
import { Link } from "react-router-dom";
import "./ComicCard.css";

const ComicCard = ({ comic }) => {
  const { updateFilters } = useFilters();

  const handleClick = () => {
    updateFilters({ title: "" }); // 👈 reset de la search
  };

  return (
    <Link
      to={`/comic/${comic._id}`}
      className="comic-card-link"
      onClick={handleClick}
    >
      <div className="comic-card">
        <img
          src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <p className="comic-title">{comic.title}</p>
      </div>
    </Link>
  );
};

export default ComicCard;
