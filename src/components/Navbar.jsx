import React , { useState }  from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/Navbar.scss";
import uncleLogo from "../assets/Logo.svg";
import cartIcon from "../assets/cart_icon.svg";
import { useCart } from "../context/CartContext"; // 使用購物車狀態

const closeIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );

const Navbar = () => {
    const location = useLocation(); // ✅ 取得當前路徑
    const isHomePage = location.pathname === "/"; // 判斷是否為首頁
    // ✅ 定義 menuOpen 狀態
    const [menuOpen, setMenuOpen] = useState(false);

    // ✅ 點擊漢堡選單時，切換 menuOpen 的狀態
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const { cartCount } = useCart(); // 取得購物車數量
  return (
    <>
      <nav className={`navbar navbar-expand-xxl navbar-light d-none d-md-block ${
        isHomePage ? "navbar-transparent" : "navbar-gray"
      }`}>
        <div className="container">
          {/* 左側 LOGO，點擊回到首頁 */}
          <Link className="navbar-brand ml-5" to="/">
            <img className="ms-xl-1 ms-md-5 ps-md-5" src={ uncleLogo } alt="" />
          </Link>

          {/* 選單按鈕 */}
          <div>
            <Link className="me-4 fw-bold text-dark text-decoration-none navbar-link" to="/mission">大叔接招</Link>
            <Link className="me-4 fw-bold text-dark text-decoration-none navbar-link" to="/articles">精選文章</Link>
            <Link className="cart-icon-link" to="/cart">
              <img src={ cartIcon } alt="購物車" />
              {/* 如果購物車有東西，就顯示數量徽章 */}
              {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#73DB6A",
                  color: "white",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      {/* ✅ 手機版 Navbar（MD 以下） */}
      <nav className="navbar navbar-light d-md-none">
        <div className="container d-flex align-items-center">
          {/* 漢堡選單按鈕 */}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            {menuOpen ? closeIcon : "☰"}
          </button>

          {/* LOGO */}
          <Link className="navbar-brand" to="/">
            <img src={ uncleLogo } style={{ width: '100px' }} alt="大叔出任務" />
          </Link>
          {/* 購物車 */}
          <Link className="cart-icon-link ms-auto" to="/cart">
            <img src={ cartIcon } alt="購物車" />
            {/* 如果購物車有東西，就顯示數量徽章 */}
            {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#73DB6A",
                color: "white",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
            )}
          </Link>
        </div>

        {/* ✅ 手機版選單（滑動展開） */}
        <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="menu-item" to="/mission" onClick={toggleMenu}>
                大叔接招
              </Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/articles" onClick={toggleMenu}>
                精選文章
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
