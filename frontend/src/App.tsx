import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/HomePage/Navbar";
import "./styles/styles.css";

import LoginPage from "./pages/LoginPage";
import ProductCollection from "./pages/ProductCollection";
import ProductDetails from "./pages/ProductDetails";
import PrivateRoute from "./components/PrivateRoute";
import MyOrders from "./components/MyProfilePage/MyOrders";
import Admin from "./pages/Admin";
import MyProfile from "./pages/MyProfile";
import MyCart from "./pages/MyCart";
import ProductForm from "./components/AdminPage/ProductForm";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="w-full min-h-[calc(100vh-3.5rem)] mt-[3.5rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Public Route */}
          <Route
            path="/products/collection/:collection"
            element={<ProductCollection />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* Private Routes */}
          <Route
            path="/admin"
            element={<PrivateRoute element={<Admin />} />}
          />{" "}
          <Route
            path="/myorders"
            element={<PrivateRoute element={<MyOrders />} />}
          />
          <Route
            path="/myprofile"
            element={<PrivateRoute element={<MyProfile />} />}
          />
          <Route
            path="/mycart"
            element={<PrivateRoute element={<MyCart />} />}
          />
          <Route
            path="/checkout"
            element={<PrivateRoute element={<Checkout />} />}
          />
          <Route
            path="/products/create"
            element={<PrivateRoute element={<ProductForm mode="create" />} />}
          />
          <Route
            path="/products/edit/:id"
            element={<PrivateRoute element={<ProductForm mode="edit" />} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
