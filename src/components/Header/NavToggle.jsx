import { useLocation, useNavigate } from "react-router-dom";
import "./NavToggle.css";

const NavToggle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  return (
    <div className="nav-toggle">
      <button
        className={currentPath === "/characters" ? "active" : ""}
        onClick={() => navigate("/characters")}
      >
        Characters
      </button>
      <button
        className={currentPath === "/comics" ? "active" : ""}
        onClick={() => navigate("/comics")}
      >
        Comics
      </button>
    </div>
  );
};

export default NavToggle;
