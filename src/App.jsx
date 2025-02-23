import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
