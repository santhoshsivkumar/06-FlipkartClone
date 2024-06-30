import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/create" element={<ProductForm mode="create" />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/edit/:id" element={<ProductForm mode="edit" />} />
    </Routes>
  );
};

export default App;
