import React from "react";
import logo from "../images/header__logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, userData, signOut }) {
  const match = useLocation();

  function switchButton(url) {
    switch (url) {
      case "/sign-in":
        return (
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        );
      case "/sign-up":
        return (
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        );
      case "/":
        return (
          loggedIn && (
            <>
              <p className="header__user">{userData.email}</p>
              <button
                onClick={signOut}
                className="header__link header__link_signout"
              >
                Выйти
              </button>
            </>
          )
        );
      default:
        return;
    }
  }

  return (
    <header className="header page__header">
      <img src={logo} alt="Место" className="header__logo" />
      {switchButton(match.pathname)}
    </header>
  );
}

export default Header;
