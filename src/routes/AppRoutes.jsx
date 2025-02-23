import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Mission from "../pages/Mission";
import Articles from "../pages/Articles";
import Cart from "../pages/Cart";
import Admin from "../pages/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
