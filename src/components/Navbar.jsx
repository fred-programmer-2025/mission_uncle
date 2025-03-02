import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Navbar.scss";
import uncleLogo from "../assets/Logo.svg";
import cartIcon from "../assets/cart_icon.svg";

const Navbar = () => {
  const location = useLocation(); // ✅ 取得當前路徑
  const isHomePage = location.pathname === "/"; // 判斷是否為首頁
  return (
    <nav className={`navbar navbar-expand-xxl navbar-light ${
      isHomePage ? "navbar-transparent" : "navbar-gray"
    }`}>
      <div className="container">
        {/* 左側 LOGO，點擊回到首頁 */}
        <Link className="navbar-brand ml-5" to="/">
          <img className="ms-xl-1 ms-md-5 ps-md-5" src={ uncleLogo } alt="" />
        </Link>

        {/* 選單按鈕 */}
        <div>
          <Link className="me-4 fw-bold text-dark text-decoration-none navbar-link" to="/challenge">大叔接招</Link>
          <Link className="me-4 fw-bold text-dark text-decoration-none navbar-link" to="/articles">精選文章</Link>
          <Link className="cart-icon-link" to="/cart">
            <img src={ cartIcon} alt="" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
