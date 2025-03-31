import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../icons/plus.png";
import editIcon from "../../icons/edit.png";
import runIcon from "../../icons/run.png";
import "./Profile.css";
import { fetchUserData } from "../../data/data";

export default function Profile(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    loadUserData();
  }, []);

  function handleLogout() {
    return localStorage.removeItem("token"), navigate("/login");
  }

  return (
    <div className="overlay" onClick={() => props.onIsOpen(false)}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-close-modal"
          onClick={() => props.onIsOpen(false)}
        >
          <img src={plusIcon} alt="plus icon" />
        </button>

        <div className="profile-modal__header">
          <div className="profile-modal__img-wrapper">E</div>
          <h2 className="profile-modal__title">Личный кабинет</h2>
        </div>
        <p className="profile-modal__subtitle">
          Информация <img src={editIcon} alt="edit icon" />
        </p>
        <form
          className="profile-modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <label className="profile-modal__label" htmlFor="username">
            Username:
          </label>
          <input
            className="profile-modal__input"
            type="username"
            id="username"
            name="username"
            defaultValue={"Example_Username123"}
          />

          <label className="profile-modal__label" htmlFor="password">
            Password:
          </label>
          <input
            className="profile-modal__input"
            type="password"
            id="password"
            name="password"
            defaultValue={"example"}
          />

          <label className="profile-modal__label" htmlFor="email">
            Email:
          </label>
          <input
            className="profile-modal__input"
            type="email"
            id="email"
            name="email"
            defaultValue={"example@gmail.com"}
          />

          <div className="profile-modal__btn-wrapper">
            <button className="profile-modal__btn" onClick={handleLogout}>
              <img src={runIcon} alt="runner icon" />
              Выйти
            </button>
            <button className="btn-card">Применить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
