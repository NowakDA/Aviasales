import "./Header.scss";
import logo from "../assets/mainLogo.svg";

const Header = () => {
  return (
    <>
      <div>
        <img className="header-logo" src={logo} alt="Logo" />
      </div>
    </>
  );
};

export default Header;
