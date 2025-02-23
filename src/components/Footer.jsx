import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center p-3 bg-light">
      <p>Copyright © 2024 大叔出任務 All Rights Reserved.</p>
      <Link className="d-block text-decoration-none" to="/admin">管理後台</Link>
    </footer>
  );
};

export default Footer;
