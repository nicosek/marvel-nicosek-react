import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/client";
import Loader from "../../components/Loader/Loader";
import FavoriteBanner from "../../components/FavoriteBanner/FavoriteBanner";
import "./Comic.css";

const Comic = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const title = comic?.title;
  const description = comic?.description;
  const thumbnail = comic?.thumbnail;
  const imageUrl = thumbnail
    ? `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`
    : "";
  const { token } = useAuth();

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await api.get(`/api/marvel/comic/${id}`);
        setComic(response.data);
        setHasError(false); // ✅ Reset erreur si succès
        window.scrollTo({ top: 0 });
      } catch (error) {
        console.error("Erreur lors du fetch du comic :", error);
        setHasError(true); // ✅ On note l’échec
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  if (hasError && !isLoading) {
    return (
      <p className="comic-show-error">
        Comic not found. It may have vanished into the multiverse..
      </p>
    );
  }

  return (
    <main className="comic-show-page">
      <div className="comic-show-container">
        {/* Titre affiché uniquement quand le comic est chargé */}
        <h1 className="comic-show-title">{title || "Loading..."}</h1>

        {token && comic && (
          <FavoriteBanner resourceId={comic._id} resourceType="comic" />
        )}

        <div className="comic-show-summary">
          {/* Image avec loader */}
          <div className="comic-show-image-wrapper">
            {imageUrl && (
              <img
                className="comic-show-image"
                src={imageUrl}
                alt={title}
                onLoad={() => setImgLoaded(true)}
                style={{ display: imgLoaded ? "block" : "none" }}
              />
            )}
            {!imgLoaded && <Loader />}
          </div>

          {/* Description ou loader */}
          <div className="comic-show-description-wrapper">
            {!comic ? (
              <Loader />
            ) : (
              <p className="comic-show-description">
                {description || "Pas de description disponible pour ce comic."}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Comic;
