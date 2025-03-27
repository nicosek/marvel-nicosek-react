import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthButtons.css";

const AuthButtons = () => {
  const { openLoginModal, openSignupModal } = useModal();
  const { token, userEmail, handleLogout } = useAuth();

  const getUsername = () => {
    if (!userEmail) return "Logged In";
    return userEmail.split("@")[0];
  };

  return (
    <div className="auth-buttons">
      {token ? (
        <>
          <span className="auth-username">🦸 {getUsername()}</span>
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
