import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
  });
  useEffect(() => {
    axios
      .get(`https://mern-app-xi-five.vercel.app/products/details/${id}`)
      .then((response) =>
        setProductData({
          productName: response.data.productName,
          productDescription: response.data.productDescription,
          productPrice: response.data.productPrice,
        })
      )
      .catch((e) => console.log(e));
  }, []);
  const handleOnChange = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleUpdateProduct = (e: any) => {
    console.log(productData);
    e.preventDefault();
    axios
      .put(`http://localhost:5555/products/edit/${id}`, productData)
      .then(() => {
        console.log("product updated");
        navigate("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className=" text-2xl font-bold text-black-700 text-center m-6">
        Edit Product
      </h1>
      <form className=" w-3/5 flex flex-col border-2 border-blue-800 p-4 rounded-md items-center m-4">
        <div className="mb-2 justify-center">
          <input
            value={productData.productName}
            type="text"
            name="productName"
            className="py-2 px-4 outline-none border-blue-400 border-2 text-purple-600 rounded-md"
            placeholder="Product Name"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-2 justify-center">
          <input
            value={productData.productDescription}
            type="text"
            name="productDescription"
            className="py-2 px-4 outline-none border-blue-400 border-2 text-purple-600 rounded-md"
            placeholder="Product Description"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-2 justify-center">
          <input
            value={productData.productPrice}
            type="number"
            name="productPrice"
            className="py-2 px-4 outline-none border-blue-400 border-2 text-purple-600 rounded-md"
            placeholder="Product Price"
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <button
          className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700"
          onClick={handleUpdateProduct}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
