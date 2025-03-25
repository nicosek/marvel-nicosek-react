import Header from "../Header/Header";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../LoginModal/LoginModal";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Header />
      <SignupModal />
      <LoginModal />
      <Outlet />
    </>
  );
};

export default Layout;
