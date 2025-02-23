import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* 左側 LOGO，點擊回到首頁 */}
        <Link className="navbar-brand fw-bold" to="/">大叔出任務</Link>

        {/* 選單按鈕 */}
        <div>
          <Link className="btn btn-outline-primary me-2" to="/challenge">大叔接招</Link>
          <Link className="btn btn-outline-secondary me-2" to="/articles">精選文章</Link>
          <Link className="btn btn-outline-dark" to="/cart">購物車</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
