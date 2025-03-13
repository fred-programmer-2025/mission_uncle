import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

// 建立 Context
const CartContext = createContext();

// 提供購物車狀態的 Provider
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
        setCartCount(res.data.data.carts.length);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);
  
  // 加入購物車的函式
  const addToCart = () => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
        setCartCount(res.data.data.carts.length);
      } catch (error) {
        alert(error);
      }
    })();
  };

  // 移除購物車的函式
  const removeToCart = () => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
        setCartCount(res.data.data.carts.length);
      } catch (error) {
        alert(error);
      }
    })();
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, addToCart, removeToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 自訂 Hook 讓其他元件更方便使用購物車狀態
export const useCart = () => useContext(CartContext);