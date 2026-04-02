import React, { useState } from "react";
import axios from "axios";
import { UserLock, Eye, EyeOff } from "lucide-react"; // Ikonkalarni qo'shdik
import "../assets/Login.css";

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Parolni ko'rsatish holati

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials,
      );
      if (res.data.success) {
        setAuth(true);
        localStorage.setItem("isAdminAuth", "true"); // Brauzer xotirasiga muhrlaymiz
      }
    } catch (err) {
      alert("Login yoki Parol xato!");
    }
  };

  return (
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
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"} // Holatga qarab type o'zgaradi
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)} // Ko'z ikonkasini bosganda almashadi
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="submit-btn">
          Tizimga kirish
        </button>
      </form>
    </div>
  );
};

export default Login;
