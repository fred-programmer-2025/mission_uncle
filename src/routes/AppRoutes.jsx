import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UncleInfoPage from "../pages/UncleInfoPage";
import UncleInfoDetailPage from "../pages/UncleInfoDetailPage";
import Articles from "../pages/ArticlePage";
import Admin from "../pages/Admin";
import CartPage from "../pages/CartPage";
import CartFormPage from "../pages/CartFormPage";
import OrderPage from "../pages/OrderPage"
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission" element={<UncleInfoPage />} />
      <Route path="/mission/:id" element={<UncleInfoDetailPage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cartForm" element={<CartFormPage />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
};

export default AppRoutes;
