import { Link } from "react-router-dom";
import("./HeroSection.css");

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Explore the{" "}
        <img
          src="/logo-marvel-nicosek-bis.png"
          alt="Marvel"
          className="hero-title-logo"
        />{" "}
        Universe
      </h1>
      <p className="hero-desc">
        Discover heroes, villains and legendary comics.
      </p>
      <div className="hero-buttons">
        <Link to="/comics" className="hero-btn">
          Browse Comics
        </Link>
        <Link to="/characters" className="hero-btn">
          See Characters
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
