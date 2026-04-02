import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

function App() {
  // Sahifa yuklanganda localStorage-dan tekshiramiz
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("isAdminAuth") === "true";
  });

  // isAuth o'zgarganda uni localStorage-ga yozib qo'yamiz
  useEffect(() => {
    localStorage.setItem("isAdminAuth", isAuth);
  }, [isAuth]);

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAdminAuth"); // Chiqish bosilgandagina o'chiradi
  };

  return (
    <>
      <Navbar isAuth={isAuth} setIsAuth={handleLogout} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              !isAuth ? <Login setAuth={setIsAuth} /> : <Navigate to="/admin" />
            }
          />

          <Route
            path="/admin"
            element={isAuth ? <AdminPanel /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
