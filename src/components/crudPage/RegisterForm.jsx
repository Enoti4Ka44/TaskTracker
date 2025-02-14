import { Suspense, useState } from "react";
import FormInput from "../elements/FormInput";
import { Link, useNavigate } from "react-router-dom";


export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sucsess, setSucsess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };


  const handleRegister = async () => {
    setError("");
    setSucsess("");

    if (!password || !username) {
      setError("Логин и пароль не могут быть пустыми");
      return;
    } else if (password.length < 8) {
      setError("Пароль должен содержать не менее 8 символов");
      return;
    } else if (password != checkPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch(
        "http://89.22.225.116:8080/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Ответ:", data);
        setSucsess("Регистрация успешна. Теперь войдите в систему");
      } else {
        const errorData = await response.json();
        console.error("Ошибка:", errorData);
        setError("Такой логин уже занят");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      alert("Ошибка сети");
      setError(error);
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
            handleRegister();
          }}
        >
          <h2 className="title">Регистрация</h2>
          <FormInput
            id="username"
            placeholder="Логин"
            ariaLabel="username"
            type="username"
            value={username}
            onChange={(e) => {
              console.log("Username:", e.target.value);
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
          <FormInput
            placeholder="Повторный пароль"
            ariaLabel="repeat-password"
            type={showPassword ? "text" : "password"}
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
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
            Зарегистрироваться
          </button>
          <button className="btn-reg_log transparent-back adaptive">
            Войти
          </button>
        </form>
      </div>
      <div className="right-side">
        <h2 className="title">Привет, Чмо!</h2>
        <p className="form-description">
          Уже есть аккаунт ? Нажми кнопку “Войти” и продолжи свое путешествие с
          <b>TaskTracker</b>
        </p>
        <button onClick={handleLoginRedirect} className="btn-reg_log transparent-back">Войти</button>
      </div>
    </section>
  );
}
