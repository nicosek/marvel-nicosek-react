import ComicCard from "../../components/ComicCard/ComicCard";
import "./GallerySection.css";

const GallerySection = ({
  comics = [],
  title = "Discover Comics",
  className,
}) => {
  if (!comics.length) return null;

  return (
    <section className={`gallery-section ${className || ""}`}>
      <h2 className="gallery-title">{title}</h2>
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
