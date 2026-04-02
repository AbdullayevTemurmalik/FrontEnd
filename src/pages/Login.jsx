import React, { useState } from "react";
import API from "../api/axios"; // <--- Buni qo'shdik (o'zingni axios configing)
import { UserLock, Eye, EyeOff } from "lucide-react";
import "../assets/Login.css";

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ESKI: axios.post("http://localhost:5000/api/admin/login", credentials);
      // YANGI: API orqali yuboramiz, baseURL avtomat Render URL-ni qo'yadi
      const res = await API.post("/admin/login", credentials);

      if (res.data.success) {
        setAuth(true);
        localStorage.setItem("isAdminAuth", "true");
      }
    } catch (err) {
      // Xatoni aniqroq ko'rsatish uchun alertni o'zgartirdik
      alert(err.response?.data?.message || "Login yoki Parol xato! ❌");
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-icon">
            <UserLock size={40} color="#fff" />
          </div>
          <h2>Admin Kirish</h2>

          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Tizimga kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
