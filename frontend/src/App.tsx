import { Routes, Route } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";
import LoginPage from "./pages/LoginPage";
import { UserHomePage } from "./pages/UserHomePage";
import Navbar from "./components/Navbar.tsx";
import { useState } from "react";
import "./App.css";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = (value: boolean) => {
    setShowLogin(!showLogin);
  };
  return (
    <>
      <Navbar handleShowLogin={handleShowLogin} />
      {showLogin && <LoginPage handleShowLogin={handleShowLogin} />}
      <Routes>
        <Route path="/" element={!showLogin && <UserHomePage />} />
        <Route path="/admin view" element={<AdminHome />} />
        <Route
          path="/products/create"
          element={<ProductForm mode="create" />}
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/products/edit/:id"
          element={<ProductForm mode="edit" />}
        />
      </Routes>
    </>
  );
};

export default App;
