import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/crudPage/RegisterForm";
import LoginForm from "./components/crudPage/LoginForm";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <div className="app-container">
    <App />
    </div>
    </BrowserRouter>
  </StrictMode>,
)
