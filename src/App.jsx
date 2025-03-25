import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useLocation, useParams } from "react-router-dom";
import "./App.css";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";

// Composants UI
import Layout from "./components/Layout/Layout";
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
        <Router>
          <SignupModal />
          <LoginModal />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/comics" element={<Comics />} />
              <Route path="/comics/:characterId" element={<Comics />} />
              <Route path="/comic/:id" element={<Comic />} />
            </Route>
          </Routes>
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App;
