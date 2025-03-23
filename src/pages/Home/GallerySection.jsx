import { useEffect, useState } from "react";
import api from "../../api/client";
import ComicCard from "../../components/ComicCard/ComicCard";
import "./GallerySection.css";

const GallerySection = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await api.get("/api/marvel/comics?limit=10&skip=200");
        setComics(response.data.results);
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    fetchComics();
  }, []);

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Discover Comics</h2>
      <div className="carousel-wrapper">
        <div className="comics-carousel">
          {comics.map((comic) => (
            <ComicCard key={comic._id} comic={comic} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
