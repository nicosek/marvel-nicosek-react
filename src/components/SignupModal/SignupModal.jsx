import { useState } from "react";
import { signup } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import "./SignupModal.css";

const SignupModal = () => {
  const { isSignupModalOpen, openLoginModal, closeModals } = useModal();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isSignupModalOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await signup({ email, password });

      if (data.token) {
        handleLogin(data.token);
        handleClose();
      } else {
        setError("Aucun token reçu.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    closeModals();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✖
        </button>
        <h2>S'inscrire</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="newsletter-info">
            En m'inscrivant je confirme avoir lu et accepté les{" "}
            <a href="#">Termes & Conditions</a> et{" "}
            <a href="#">Politique de Confidentialité</a>. <br />
            Je confirme avoir au moins 18 ans.
          </p>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">S'inscrire</button>

          <p className="modal-footer">
            Tu as déjà un compte ?{" "}
            <span
              className="switch-modal"
              onClick={() => {
                handleClose();
                openLoginModal();
              }}
            >
              Connecte-toi ici
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
