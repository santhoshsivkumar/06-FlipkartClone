import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { domainURL } from "../static";
const CreateProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleCreateProduct = (e: any) => {
    e.preventDefault();
    axios
      .post(`${domainURL}/products/create`, product)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className=" text-2xl font-bold text-black-700 text-center m-6">
        Create Product
      </h1>
      <form className=" w-3/5 flex flex-col border-2 border-blue-800 p-4 rounded-md items-center m-4">
        <div className="mb-2 justify-center">
          <input
            value={product.productName}
            type="text"
            name="productName"
            className="py-2 px-4 outline-none border-blue-400 border-2 text-purple-600 rounded-md"
            placeholder="Product Name"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-2 justify-center">
          <input
            value={product.productDescription}
            type="text"
            name="productDescription"
            className="py-2 px-4 outline-none border-blue-400 border-2 text-purple-600 rounded-md"
            placeholder="Product Description"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-2 justify-center">
          <input
            value={product.productPrice}
            type="number"
            name="productPrice"
            className="py-2 px-4 outline-none border-blue-400 border-2 text-purple-600 rounded-md"
            placeholder="Product Price"
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <button
          className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
