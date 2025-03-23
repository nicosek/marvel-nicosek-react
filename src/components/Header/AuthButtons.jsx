import { useModal } from "../../contexts/ModalContext";
import "./AuthButtons.css";

const AuthButtons = () => {
  const { openLoginModal, openSignupModal } = useModal();

  return (
    <div className="auth-buttons">
      <button type="button" className="auth-btn login" onClick={openLoginModal}>
        Login
      </button>
      <button
        type="button"
        className="auth-btn signup"
        onClick={openSignupModal}
      >
        Signup
      </button>
    </div>
  );
};

export default AuthButtons;
