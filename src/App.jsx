import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { FiltersProvider } from "./contexts/FiltersContext";

// Listeners
import FiltersListener from "./listeners/FiltersListener";

// Composants UI
import Header from "./components/Header/Header";
import SignupModal from "./components/SignupModal/SignupModal";
import LoginModal from "./components/LoginModal/LoginModal";

// Pages;
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Comic from "./pages/Comic/Comic";

const App = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <FiltersProvider>
          <Router>
            <FiltersListener />
            <Header />
            <SignupModal />
            <LoginModal />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comics" element={<Comics />} />
              <Route path="/comic/:id" element={<Comic />} />
            </Routes>
          </Router>
        </FiltersProvider>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App;
