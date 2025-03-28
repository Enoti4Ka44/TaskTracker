import accountLogo from "../../icons/account-logo.png";
import "./Header.css";

export default function HeaderElement(props) {
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

      <button className="btn-account">
        <img
          src={accountLogo}
          alt=""
          className="account-logo-img"
          onClick={() => props.onIsOpen(true)}
        />
      </button>
    </header>
  );
}
