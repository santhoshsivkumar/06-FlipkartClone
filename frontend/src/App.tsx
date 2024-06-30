import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/products/delete/:id" element={<DeleteProduct />} />
    </Routes>
  );
};

export default App;
