import usePageFilters from "../../hooks/usePageFilters";
import { Link } from "react-router-dom";
import "./ComicCard.css";

const ComicCard = ({ comic }) => {
  const { setFilters } = usePageFilters();

  const handleClick = () => {
    setFilters({ title: "" });
  };

  return (
    <Link
      to={`/comic/${comic._id}`}
      className="comic-card-link"
      onClick={handleClick}
    >
      <div className="comic-card">
        {comic.description && (
          <div className="comic-bubble">
            <p className="comic-bubble-text">{comic.description}</p>
          </div>
        )}

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
