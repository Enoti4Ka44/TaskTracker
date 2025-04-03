import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import plusIcon from "../../icons/plus.png";
import editIcon from "../../icons/edit.png";
import runIcon from "../../icons/run.png";
import "./Profile.css";
import { fetchUserData } from "../../data/data";

export default function Profile(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogout() {
    return localStorage.removeItem("token"), navigate("/login");
  }

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        toast.error("Ошибка при получении данных пользователя");
      }
    };

    loadUserData();
  }, []);

  const handleSubmitChanges = async () => {
    if (email !== userData.email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        toast.warn("Неверно введен email");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://89.22.225.116:8080/api/user/email",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Почта изменена:", data);
          toast.success("Почта успешно изменена");
        } else {
          const errorData = await response.json();
          if (errorData.message === "Email is already in use by another user") {
            toast.error("Такая почта уже используется");
          }
          console.error("Ошибка сервера:", errorData);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
        toast.error("Ошибка сети");
      }
    }

    if (username !== userData.username) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://89.22.225.116:8080/api/user/username",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Логин изменен:", data);
          toast.success("Логин успешно изменен");
        } else {
          const errorData = await response.json();
          console.error("Ошибка сервера:", errorData);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
        toast.error("Ошибка сети");
      }
    }

    if (password && password.length > 0) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://89.22.225.116:8080/api/user/password",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Пароль изменен:", data);
          toast.success("Пароль успешно изменен");
        } else {
          const errorData = await response.json();
          console.error("Ошибка сервера:", errorData);
          toast.error("Ошибка сервера");
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
        toast.error("Ошибка сети");
      }
    }

    if (
      email === userData.email &&
      username === userData.username &&
      !password
    ) {
      toast.info("Нет изменений для сохранения");
    }
  };

  return (
    <div className="overlay" onClick={() => props.onIsOpen(false)}>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        closeOnClick
        onClick={(e) => e.stopPropagation()}
      />

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
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <label className="profile-modal__label" htmlFor="username">
            Логин:
          </label>
          <input
            className="profile-modal__input"
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="profile-modal__label" htmlFor="password">
            Пароль:
          </label>
          <input
            className="profile-modal__input"
            type="password"
            id="password"
            name="password"
            placeholder="Введите свой пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="profile-modal__label" htmlFor="email">
            Email:
          </label>
          <input
            className="profile-modal__input"
            type="email"
            id="email"
            name="email"
            value={email ? email : ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="profile-modal__btn-wrapper">
            <button className="profile-modal__btn" onClick={handleLogout}>
              <img src={runIcon} alt="runner icon" />
              Выйти
            </button>
            <button className="btn-card" onClick={handleSubmitChanges}>
              Применить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
