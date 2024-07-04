import { Routes, Route } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop.tsx";
const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="w-full min-h-[calc(100vh-3.5rem)] mt-[3.5rem]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
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
      </div>
    </>
  );
};

export default App;
