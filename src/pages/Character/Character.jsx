import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/client";
import GallerySection from "../Home/GallerySection";
import Loader from "../../components/Loader/Loader";
import { fetchComics } from "../../api/comics";
import FavoriteBanner from "../../components/FavoriteBanner/FavoriteBanner";
import "./Character.css";

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [characterComics, setCharacterComics] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await api.get(`/api/marvel/character/${id}`);
        setCharacter(response.data);
        window.scrollTo({ top: 0 });
      } catch (err) {
        console.error("Error fetching character:", err);
      }
    };

    fetchCharacter();
  }, [id]);

  useEffect(() => {
    const fetchCharacterComics = async () => {
      try {
        const { comics } = await fetchComics({ characterId: character._id });
        setCharacterComics(comics);
      } catch (err) {
        console.error("Error fetching character's comics:", err);
      }
    };

    if (character?._id) {
      fetchCharacterComics();
    }
  }, [character]);

  const bgImage =
    character?.thumbnail?.path &&
    `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;

  return (
    <main
      className="character-show"
      style={imgLoaded ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="character-overlay" />

      <div className="character-content">
        <div className="character-left">
          {bgImage && (
            <img
              src={bgImage}
              alt={character?.name || "character"}
              className="character-show-image"
              onLoad={() => setImgLoaded(true)}
              style={{ display: imgLoaded ? "block" : "none" }}
            />
          )}
          {!imgLoaded && <Loader />}
        </div>

        <div className="character-right">
          {!character ? (
            <Loader />
          ) : (
            <>
              <h1 className="character-show-name">{character.name}</h1>
              <p className="character-show-description">
                {character.description ||
                  `Mysterious and powerful, ${character.name} remains an enigma in the Marvel Universe.`}
              </p>
              {token && (
                <FavoriteBanner
                  resourceId={character._id}
                  resourceType="character"
                />
              )}
            </>
          )}

          <GallerySection
            comics={characterComics}
            title={`Featured in these comics`}
            className="compact"
            isLoading={!characterComics.length}
          />
        </div>
      </div>
    </main>
  );
};

export default Character;
