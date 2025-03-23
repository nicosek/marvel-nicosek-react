import "./Header.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavToggle from "./NavToggle";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <SearchBar />
      <NavToggle />
      <AuthButtons />
    </header>
  );
};

export default Header;
