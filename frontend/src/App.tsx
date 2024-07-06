import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import ProductForm from "./components/AdminPage/ProductForm.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./components/HomePage/Navbar.tsx";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ProductCollection from "./pages/ProductCollection.tsx";
const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="w-full min-h-[calc(100vh-3.5rem)] mt-[3.5rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin view" element={<Admin />} />
          <Route
            path="/products/create"
            element={<ProductForm mode="create" />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/products/collection/:collection"
            element={<ProductCollection />}
          />
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
