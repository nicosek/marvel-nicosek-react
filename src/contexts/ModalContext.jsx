import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null); // "login", "signup", or null

  const openSignupModal = () => setActiveModal("signup");
  const openLoginModal = () => setActiveModal("login");
  const closeModals = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{
        isSignupModalOpen: activeModal === "signup",
        isLoginModalOpen: activeModal === "login",
        openSignupModal,
        openLoginModal,
        closeModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
