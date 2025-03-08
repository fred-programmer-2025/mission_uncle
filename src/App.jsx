import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <>
    <CartProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
    </CartProvider>
    </>
  );
};

export default App;