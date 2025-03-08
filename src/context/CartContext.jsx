import { createContext, useContext, useState } from "react";

// 建立 Context
const CartContext = createContext();

// 提供購物車狀態的 Provider
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // 加入購物車的函式
  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  // 移除購物車的函式
  const removeToCart = () => {
    setCartCount((prevCount) => prevCount - 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, addToCart, removeToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 自訂 Hook 讓其他元件更方便使用購物車狀態
export const useCart = () => useContext(CartContext);