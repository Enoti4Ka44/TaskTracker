import { Suspense, useState } from "react";
import FormInput from "../elements/FormInput";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/");
  };

  const handleMainRedirect = () => {
    navigate("/main");
  };

  const handleLogin = async () => {
    setError("");
    setSucsess("");

    if (!password || !username) {
      setError("Логин и пароль не могут быть пустыми");
      return;
    }

    try {
      const response = await fetch("http://89.22.225.116:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        setSucsess("Вход успешно выполнен");
        handleMainRedirect();
      } else {
        if (data.message === "Invalid password") {
          setError("Неверный пароль");
        } else if (data.message === "User not found") {
          setError("Пользователь с таким логином не найден");
        } else {
          setError("Ошибка входа");
        }
      }
    } catch (error) {
      setError("Ошибка сети");
    }
  };

  return (
    <section className="form-container">
      <h2 className="logo">Task Tracker</h2>
      <div className="left-form-wrapper">
        <form
          className="left-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h2 className="title">Вход</h2>
          <FormInput
            id="username"
            placeholder="Логин"
            ariaLabel="username"
            type="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormInput
            placeholder="Пароль"
            ariaLabel="password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              name="show-password"
              id="show-password"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label style={{ marginLeft: 8 }} htmlFor="show-password">
              Показать пароль
            </label>
          </div>

          {error && <p className="message red">{error}!</p>}
          {sucsess && <p className="message green">{sucsess}!</p>}
          <button type="submit" className="btn-reg_log">
            Войти
          </button>
          <button className="btn-reg_log transparent-back adaptive">
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="right-side">
        <h2 className="title">Привет!</h2>
        <p className="form-description">
          Нет аккаунта ? Нажми кнопку "Зарегистрироваться" и начни свое
          путешествие с <b>TaskTracker</b>
        </p>
        <button
          onClick={handleRegisterRedirect}
          className="btn-reg_log transparent-back"
        >
          Зарегистрироваться
        </button>
      </div>
    </section>
  );
}
