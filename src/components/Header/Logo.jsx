import "./Logo.css";
import { Link } from "react-router-dom";
import usePageFilters from "../../hooks/usePageFilters";

const Logo = () => {
  const { setFilters } = usePageFilters();

  const handleClick = () => {
    setFilters({ title: "" }); // 👈 reset de la search
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
