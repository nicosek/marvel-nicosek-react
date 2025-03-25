import { useEffect, useState } from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import IntroSection from "./IntroSection";
import GallerySection from "./GallerySection";
import api from "../../api/client";

const Home = () => {
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
    <main className="home-page">
      <HeroSection />
      <GallerySection comics={comics} title="Discover Comics" />
      <IntroSection />
    </main>
  );
};

export default Home;
