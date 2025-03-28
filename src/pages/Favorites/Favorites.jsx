import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ComicCard from "../../components/ComicCard/ComicCard";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import api from "../../api/client";
import "./Favorites.css";

const Favorites = () => {
  const { userData } = useAuth();
  const [leftCol, setLeftCol] = useState([]);
  const [rightCol, setRightCol] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (
      !userData?.favorites?.length ||
      currentIndex >= userData.favorites.length
    )
      return;

    const fetchNext = async () => {
      const fav = userData.favorites[currentIndex];

      try {
        const response = await api.get(
          `/api/marvel/${fav.type}/${fav.marvelId}`
        );

        const data = response.data;
        const element =
          fav.type === "comic" ? (
            <div className="container-card" key={fav._id}>
              <ComicCard comic={data} />
            </div>
          ) : (
            <div className="container-card" key={fav._id}>
              <CharacterCard character={data} />
            </div>
          );

        if (fav.type === "comic") {
          setLeftCol((prev) => [...prev, element]);
        } else {
          setRightCol((prev) => [...prev, element]);
        }
      } catch (err) {
        console.error(`Error fetching ${fav.type} ${fav.marvelId}:`, err);
      } finally {
        setCurrentIndex((prev) => prev + 1);
      }
    };

    fetchNext();
  }, [currentIndex, userData]);

  return (
    <main className="favorites-page">
      <div className="favorites-column">
        <h2 className="favorites-title">Comics</h2>
        <div className="favorites-grid">{leftCol}</div>
      </div>
      <div className="favorites-column">
        <h2 className="favorites-title">Characters</h2>
        <div className="favorites-grid">{rightCol}</div>
      </div>
    </main>
  );
};

export default Favorites;
