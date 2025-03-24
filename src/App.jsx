import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/elements/elements.css";
import "./components/LogReg/Form.css";
import RegisterForm from "./components/LogReg/RegisterForm";
import LoginForm from "./components/LogReg/LoginForm";
import MainPage from "./components/main/MainPage/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
