import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UncleInfoPage from "../pages/UncleInfoPage";
import Articles from "../pages/Articles";
import Cart from "../pages/Cart";
import Admin from "../pages/Admin";
import CartPage from "../pages/CartPage";
import CartFormPage from "../pages/CartFormPage";
import OrderPage from "../pages/OrderPage"
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission" element={<UncleInfoPage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cartForm" element={<CartFormPage />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
};

export default AppRoutes;
