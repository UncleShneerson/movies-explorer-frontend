import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import burger from "../../images/burger_menu.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import MenuMobile from "../MenuMobile/MenuMobile";

function Header() {
  const { loggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleSignInClick() {
    navigate("/signin");
  }

  function handleSignUpClick() {
    navigate("/signup");
  }

  function changeMenuVisibility() {
    setIsMenuOpen(!isMenuOpen);
  }

  const lacation = useLocation().pathname;
  return (
    <>
      <header
        className={`content content_size_l header ${
          lacation === "/" ? "header_type_promo" : ""
        }`}
      >
        <div className="header__menu">
          <Logo />
          {loggedIn && <Menu type="desk" />}
        </div>
        {!loggedIn ? (
          <div className="header__buttons">
            <button
              className="header__btn header__btn_type_tex hover-link"
              onClick={handleSignUpClick}
            >
              Регистрация
            </button>
            <button
              className="header__btn header__btn_type_btn hover-button"
              onClick={handleSignInClick}
            >
              Войти
            </button>
          </div>
        ) : (
          <button
            className="header__menu-burger hover-link"
            style={{ backgroundImage: `url(${burger})` }}
            onClick={changeMenuVisibility}
            text="Меню"
          />
        )}
      </header>
      {isMenuOpen && (
        <MenuMobile isOpen={isMenuOpen} onClose={changeMenuVisibility} />
      )}
    </>
  );
}

export default Header;
