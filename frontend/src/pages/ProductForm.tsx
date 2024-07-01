import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { domainURL } from "../static";
import BackButton from "./BackButton";
import { GetImageURL } from "../GetImageURL";

const ProductForm = ({ mode }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: "", // Assuming productImage is a URL or path
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold image preview URL
  const [fileLabel, setFileLabel] = useState<string>("Choose New"); // Default label for file input

  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`${domainURL}/products/details/${id}`)
        .then((response) => {
          const {
            productName,
            productDescription,
            productPrice,
            productImage,
          } = response.data;
          setProduct({
            productName,
            productDescription,
            productPrice,
            productImage,
          });
          if (productImage) {
            setImagePreview(GetImageURL(productImage)); // Convert image path for preview
            setFileLabel(getFileName(productImage)); // Get file name for display
          }
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setProduct((prevState) => ({
      ...prevState,
      productImage: file,
    }));

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
      setFileLabel(file.name); // Set file name for display
    } else {
      setImagePreview(null);
      setFileLabel("Choose New");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("productDescription", product.productDescription);
    formData.append("productPrice", product.productPrice);
    //@ts-ignore
    if (product.productImage instanceof File) {
      formData.append("productImage", product.productImage);
    }

    if (mode === "create") {
      axios
        .post(`${domainURL}/products/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoading(false);
          navigate("/");
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else if (mode === "edit" && id) {
      axios
        .put(`${domainURL}/products/edit/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setLoading(false);
          navigate("/");
          console.log("Product updated");
        })
        .catch((error) => console.log(error));
    }
  };

  // Function to get file name from path or URL
  const getFileName = (path: string) => {
    const pathParts = path.split("-");
    console.log(pathParts);
    return pathParts[pathParts.length - 1]; // Return last part of the path as file name
  };

  return (
    <div className="flex pt-6 items-center flex-col bg-gray-300 min-h-screen py-6">
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productImage"
          >
            Product Image
          </label>
          <div className="flex justify-center items-center  gap-4 flex-col">
            <label className="w-full py-2 px-4 border border-gray-300 rounded-md cursor-pointer bg-white text-gray-700 hover:bg-gray-100">
              <div className="flex gap-4 items-center justify-start">
                <span className="block text-center text-black bg-gray-200 w-[30%] border-black border-[1px] text-sm py-1 px-2">
                  {product.productImage ? "Choose New" : "Choose File"}
                </span>
                {product.productName && (
                  <span className="block text-gray-700 text-sm font-semibold">
                    {product.productImage ? fileLabel : "Image not provided"}
                  </span>
                )}
              </div>
              <input
                type="file"
                name="productImage"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="mt-2 rounded-md border-[1px] p-1 border-gray-400"
                style={{ maxWidth: "50%", maxHeight: "200px" }}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
        >
          <i className="fas fa-save mr-2"></i>
          {loading
            ? "Processing"
            : mode === "create"
            ? "Create Product"
            : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
