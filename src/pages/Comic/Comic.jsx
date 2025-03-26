import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
import Loader from "../../components/Loader/Loader";
import "./Comic.css";

const Comic = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await api.get(`/api/marvel/comic/${id}`);
        setComic(response.data);
        window.scrollTo({ top: 0 });
      } catch (error) {
        console.error("Erreur lors du fetch du comic :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComic();
  }, [id]);

  if (isLoading) return <Loader />;
  if (!comic) return <p className="comic-show-error">Comic introuvable.</p>;

  const { title, description, thumbnail } = comic;
  const imageUrl = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;

  return (
    <main className="comic-show-page">
      <div className="comic-show-container">
        <h1 className="comic-show-title">{title}</h1>
        <div className="comic-show-summary">
          <img className="comic-show-image" src={imageUrl} alt={title} />
          <p className="comic-show-description">
            {description || "Pas de description disponible pour ce comic."}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Comic;
