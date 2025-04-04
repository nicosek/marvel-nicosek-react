import ComicCard from "../../components/ComicCard/ComicCard";
import Loader from "../../components/Loader/Loader";
import "./GallerySection.css";

const GallerySection = ({
  comics = [],
  title = "Discover Comics",
  className,
  isLoading = false,
}) => {
  return (
    <section className={`gallery-section ${className || ""}`}>
      <h2 className="gallery-title">{title}</h2>

      {isLoading ? (
        <div className="gallery-loader-wrapper">
          <Loader />
        </div>
      ) : comics.length > 0 ? (
        <div className="carousel-wrapper">
          <div className="comics-carousel">
            {comics.map((comic) => (
              <ComicCard key={comic._id} comic={comic} className={className} />
            ))}
          </div>
        </div>
      ) : (
        <p className="no-comics">No comics found.</p>
      )}
    </section>
  );
};

export default GallerySection;
