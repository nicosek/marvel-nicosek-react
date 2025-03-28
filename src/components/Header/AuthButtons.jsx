import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthButtons.css";

const AuthButtons = () => {
  const { openLoginModal, openSignupModal } = useModal();
  const { token, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    if (!token) {
      openLoginModal();
    } else {
      navigate("/favorites");
    }
  };

  return (
    <div className="auth-buttons">
      {token ? (
        <>
          <button
            type="button"
            className="auth-btn favorites"
            onClick={handleFavoritesClick}
            title="View favorites"
          >
            ⭐ Favorites
          </button>
          <button
            type="button"
            className="auth-btn logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="auth-btn login"
            onClick={openLoginModal}
          >
            Login
          </button>
          <button
            type="button"
            className="auth-btn signup"
            onClick={openSignupModal}
          >
            Signup
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
