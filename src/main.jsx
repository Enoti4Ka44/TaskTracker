import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/LogReg/RegisterForm";
import LoginForm from "./components/LogReg/LoginForm";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="app-container">
      <App />
    </div>
  </BrowserRouter>
);
