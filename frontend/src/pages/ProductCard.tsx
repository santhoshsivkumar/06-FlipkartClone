import { Link } from "react-router-dom";
import { GetImageURL } from "../GetImageURL";
import Default_Img from "../../public/Default_Img.jpg";
import { useSelector } from "react-redux";
const ProductCard = ({ product, onDeleteClick, showOptions }: any) => {
  const { darkMode } = useSelector((state: any) => state.products);
  return (
    <div
      className={`${
        darkMode ? "bg-[#2d2d2d]" : "bg-[white]"
      } border-[1px] hover:scale-[1.018] hover:border-red-600 flex flex-col justify-center shadow-sm items-center cursor-pointer  border-gray-200 rounded-sm p-4`}
    >
      <img
        src={
          product.productImage ? GetImageURL(product.productImage) : Default_Img
        }
        alt="Product Preview"
        className="rounded-sm p-4 "
        style={{ width: "200px", height: "225px" }}
      />
      <div className="text-md font-bold text-red-500 pt-2">
        {product.productName}
      </div>
      <div className={`${!darkMode ? "text-[#2d2d2d]" : "text-[white]"}`}>
        <strong>Price:</strong> ${product.productPrice.toFixed(2)}
      </div>
      {showOptions && (
        <div className="flex justify-between">
          <Link
            to={`/products/${product._id}`}
            className="text-blue-600 hover:underline"
          >
            <i className="fas fa-eye mr-1"></i> View
          </Link>
          <Link
            to={`/products/edit/${product._id}`}
            className="text-yellow-600 hover:underline"
          >
            <i className="fas fa-edit mr-1"></i> Edit
          </Link>
          <button
            onClick={() => onDeleteClick(product._id)}
            className="text-red-600 hover:underline"
          >
            <i className="fas fa-trash-alt mr-1"></i> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
