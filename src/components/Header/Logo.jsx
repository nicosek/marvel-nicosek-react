import "./Logo.css";
import { Link } from "react-router-dom";
import { useFilters } from "../../contexts/FiltersContext";

const Logo = () => {
  const { updateFilters } = useFilters();

  const handleClick = () => {
    updateFilters({ title: "" }); // 👈 reset de la search
  };

  return (
    <Link className="logo-link" to="/" onClick={handleClick}>
      <img
        src="/logo-marvel-nicosek.png"
        alt="Marvel by NicoSek"
        className="logo"
      />
    </Link>
  );
};

export default Logo;
