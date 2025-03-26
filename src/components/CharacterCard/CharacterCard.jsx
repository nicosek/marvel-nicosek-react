import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
  const { name, description, thumbnail } = character;
  const imageUrl = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link to={`/character/${character._id}`} className="character-card">
      <div className="card-face card-front">
        {!imgLoaded && (
          <div className="character-card-loader">
            <Loader />
          </div>
        )}

        <img
          src={imageUrl}
          alt={name}
          className="character-img"
          onLoad={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? "block" : "none" }}
        />

        <div className="character-name-glitch">{name}</div>
      </div>

      <div className="card-face card-back">
        <div className="character-back-content">
          <h3 className="character-back-name">{name}</h3>
          <p className="character-back-description">
            {description ? description : "No description available."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
