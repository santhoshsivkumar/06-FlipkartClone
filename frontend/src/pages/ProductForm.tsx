import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { domainURL } from "../static";
import BackButton from "./BackButton";

const ProductForm = ({ mode }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`${domainURL}/products/details/${id}`)
        .then((response) => {
          const { productName, productDescription, productPrice } =
            response.data;
          setProduct({ productName, productDescription, productPrice });
        })
        .catch((error) => console.log(error));
    }
  }, [mode, id]);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (mode === "create") {
      axios
        .post(`${domainURL}/products/create`, product)
        .then((res) => {
          navigate("/");
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else if (mode === "edit" && id) {
      axios
        .put(`${domainURL}/products/edit/${id}`, product)
        .then(() => {
          navigate("/");
          console.log("product updated");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex  pt-6 items-center flex-col bg-gray-100 min-h-screen py-6">
      <h1 className="text-4xl font-bold text-purple-700">
        {mode === "create" ? "Create Product" : "Edit Product"}
      </h1>
      <BackButton />
      <form
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            value={product.productName}
            type="text"
            name="productName"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Product Name"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productDescription"
          >
            Product Description
          </label>
          <input
            value={product.productDescription}
            type="text"
            name="productDescription"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Product Description"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productPrice"
          >
            Product Price
          </label>
          <input
            value={product.productPrice}
            type="number"
            name="productPrice"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Product Price"
            onChange={handleOnChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
        >
          <i className="fas fa-save mr-2"></i>
          {mode === "create" ? "Create Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
