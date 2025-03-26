import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./ComicCard.css";

const ComicCard = ({ comic }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageUrl = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;

  return (
    <Link to={`/comic/${comic._id}`} className="comic-card-link">
      <div className="comic-card">
        {!imgLoaded && (
          <div className="comic-card-loader">
            <Loader />
          </div>
        )}

        {comic.description && (
          <div className="comic-bubble">
            <p className="comic-bubble-text">{comic.description}</p>
          </div>
        )}

        <img
          src={imageUrl}
          alt={comic.title}
          onLoad={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? "block" : "none" }}
        />

        <p className="comic-title">{comic.title}</p>
      </div>
    </Link>
  );
};

export default ComicCard;
