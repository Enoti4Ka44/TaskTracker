import { useNavigate } from "react-router-dom";
import accountLogo from "../../icons/account-logo.png";
import "./Header.css";
import { useState } from "react";

export default function HeaderElement(props) {
  const navigate = useNavigate();

  function handleLogout() {
    return localStorage.removeItem("token"), navigate("/login");
  }

  return (
    <header>
      <div className="header-left">
        <h2 className="header-logo">Task Tracker</h2>
        <h2 className="header-logo-mobile">T</h2>
        <button
          className={`header-btn btn_border-grey ${
            props.activeSection === "cards" ? `btn_active` : ""
          } `}
          onClick={() => props.onRender("cards")}
        >
          Задачи
        </button>
        <button
          className={`header-btn btn_border-grey ${
            props.activeSection === "categories" ? `btn_active` : ""
          } `}
          onClick={() => props.onRender("categories")}
        >
          Категории
        </button>
      </div>
      <div className="header-right">
        <button className="header-btn btn_border-red" onClick={handleLogout}>
          Выйти
        </button>

        <button className="btn-account">
          <img
            src={accountLogo}
            alt=""
            className="account-logo-img"
            onClick={() => props.onIsOpen(true)}
          />
        </button>
      </div>
    </header>
  );
}
