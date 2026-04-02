import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import "../assets/Navbar.css";

const Navbar = ({ isAuth, setIsAuth }) => {
  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/">
          <div className="logo">HisobKutob.UZ</div>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {isAuth ? (
            <>
              <Link to="/admin" className="admin-btn">
                <LayoutDashboard size={18} /> Admin Panel
              </Link>
              <button onClick={() => setIsAuth(false)} className="logout-btn">
                <LogOut size={18} /> Chiqish
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              <LogIn size={18} /> Admin Panel (Kirish)
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
