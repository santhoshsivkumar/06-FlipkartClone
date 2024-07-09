import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ConvertToBase64 } from "../../static/Functions";
import { siteURL } from "../../static/Data";
import Loading from "../Loading";
import InputField from "../InputField"; // New component for input fields

const initialState = {
  productName: "",
  productDescription: "",
  productPrice: "",
  category: "",
  company: "",
  seller: "",
  productImage: "",
};
const categories = [
  "shampoo",
  "smartphones",
  "smartwatches",
  "laptops",
  "tablets",
  "accessories",
]; // Static categories

const ProductForm = ({ mode }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState(initialState);

  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`${siteURL}/products/details/${id}`)
        .then((response) => {
          setProduct(response.data);
          if (response.data && response.data.productImage) {
            setImagePreview(response.data.productImage);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [mode, id]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Img: any = await ConvertToBase64(file);
      setImagePreview(base64Img);
      setProduct((prevState) => ({
        ...prevState,
        productImage: base64Img,
      }));
    } else {
      setImagePreview(null);
      setProduct((prevState) => ({
        ...prevState,
        productImage: "",
      }));
    }
  };

  const validateFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!product.productImage) {
      newErrors.productImage = "Product Image is required";
      isValid = false;
    }
    if (!product.productName) {
      newErrors.productName = "Product Name is required";
      isValid = false;
    }
    if (!product.productDescription) {
      newErrors.productDescription = "Product Description is required";
      isValid = false;
    }
    if (!product.productPrice || isNaN(Number(product.productPrice))) {
      newErrors.productPrice = "Valid Product Price is required";
      isValid = false;
    }
    if (!product.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!product.company) {
      newErrors.company = "Company is required";
      isValid = false;
    }
    if (!product.seller) {
      newErrors.seller = "Seller Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    const url =
      mode === "create"
        ? `${siteURL}/products/create`
        : `${siteURL}/products/edit/${id}`;
    axios({
      method: mode === "create" ? "post" : "put",
      url: url,
      data: product,
    })
      .then(() => {
        setLoading(false);
        navigate("/admin");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-[100vh] items-center flex-col gap-4 theme theme_color py-4">
      <h1 className="text-2xl font-bold theme_text">
        {mode === "create" ? "Create Product" : "Edit Product"}
      </h1>
      <form
        className="lg:w-[65vw] w-[90vw] grid grid-cols-1 md:grid-cols-2 gap-2 justify-center items-center theme_container shadow-md rounded-md p-4"
        onSubmit={handleSubmit}
      >
        {/* Product Image */}
        <div className=" rounded-md p-4 theme flex justify-center items-center flex-col col-span-full">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="productImage"
          >
            Product Image
          </label>
          <div className="flex justify-center items-center lg:flex-row gap-4 flex-col">
            <label className="max-w-[8.5rem] py-2 px-4 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-100">
              <span className="block text-center text-black bg-gray-200 border-black border-[1px] text-sm py-1 px-2">
                {product.productImage ? "Choose New" : "Choose File"}
              </span>
              <input
                type="file"
                name="productImage"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <div className="flex flex-col justify-center items-center gap-4 text-md">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-2 rounded-md border-[1px] p-1 border-gray-400"
                  style={{ maxWidth: "50%", maxHeight: "200px" }}
                />
              )}
            </div>
            {errors.productImage && (
              <p className="text-red-500 text-xs mt-1">{errors.productImage}</p>
            )}
          </div>
        </div>

        {/* Input Fields */}
        <InputField
          label="Product Name"
          name="productName"
          value={product.productName}
          onChange={handleOnChange}
          error={errors.productName}
        />
        <InputField
          label="Product Description"
          name="productDescription"
          value={product.productDescription}
          onChange={handleOnChange}
          error={errors.productDescription}
          isTextarea={true}
        />
        <InputField
          label="Product Price"
          name="productPrice"
          value={product.productPrice}
          onChange={handleOnChange}
          error={errors.productPrice}
        />
        <InputField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleOnChange}
          error={errors.category}
          options={categories}
          isSelect={true}
        />
        <InputField
          label="Company"
          name="company"
          value={product.company}
          onChange={handleOnChange}
          error={errors.company}
        />
        <InputField
          label="Seller Name"
          name="seller"
          value={product.seller}
          onChange={handleOnChange}
          error={errors.seller}
        />

        {/* Submit Button */}
        <button
          title="Submit"
          type="submit"
          className="col-span-full mt-2 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {!loading ? (
            <i className="fas fa-save mr-2"></i>
          ) : (
            <Loading width={25} height={25} />
          )}
          {!loading
            ? mode === "create"
              ? "Create Product"
              : "Update Product"
            : ""}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
