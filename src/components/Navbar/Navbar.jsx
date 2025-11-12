import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-a" onClick={() => setMenu("home")}>
        <span className="store-name-only">Nafisa’s Food Store</span>
      </Link>

      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/menu"
            className={menu === "menu" ? "active" : ""}
            onClick={() => setMenu("menu")}
          >
            <img
              src={assets.menu_1}
              alt="menu"
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            
          </Link>
        </li>
        <li>
          <a
            href="#app-download"
            className={menu === "mobileapp" ? "active" : ""}
            onClick={() => setMenu("mobileapp")}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            href="#contact-us"
            className={menu === "contactus" ? "active" : ""}
            onClick={() => setMenu("contactus")}
          >
            Contact Us
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        {/* 🔍 Search Icon */}
        <div className="navbar-search-wrapper">
          <img
            src={assets.search_icon}
            alt="search"
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)}
          />

          {showSearch && (
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search food..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                autoFocus
              />
            </form>
          )}
        </div>

        {/* 🛒 Cart */}
        <div className="navbar-search-icon">
          <Link to="/cart" onClick={() => setMenu("cart")}>
            <img src={assets.bag_icon} alt="cart" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {/* 👤 Profile / Login */}
        {token || localStorage.getItem("Token") ? (
          <div className="navbar-profile">
            <img
              src={assets.profile_icon}
              alt="profile"
              onClick={() => navigate("/myprofile")}
            />
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
