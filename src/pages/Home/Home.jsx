import "./Home.css";
import HeroSection from "./HeroSection";
import IntroSection from "./IntroSection";
import GallerySection from "./GallerySection";

const Home = () => {
  return (
    <main className="home-page">
      <HeroSection />
      <GallerySection />
      <IntroSection />
    </main>
  );
};

export default Home;
