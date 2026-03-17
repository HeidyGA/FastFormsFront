import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Home from "./pages/Home";
import Register from "./pages/Register";
import CreateSurvey from "./pages/CreateSurvey";
import { Routes, Route } from "react-router-dom"; // ← sin BrowserRouter

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-survey" element={<CreateSurvey />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App
