import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
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
      } catch (error) {
        console.error("Erreur lors du fetch du comic :", error);
      } finally {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchComic();
  }, [id]);

  if (isLoading) return <p>Chargement...</p>;
  if (!comic) return <p>Comic introuvable.</p>;

  const { title, description, thumbnail } = comic;
  const imageUrl = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;

  return (
    <div className="comic-show-container">
      <h1 className="comic-title">{title}</h1>
      <img className="comic-thumbnail" src={imageUrl} alt={title} />
      <p className="comic-description">
        {description || "Pas de description disponible pour ce comic."}
      </p>
    </div>
  );
};

export default Comic;
