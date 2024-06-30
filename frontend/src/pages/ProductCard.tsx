import { Link } from "react-router-dom";

const ProductCard = ({ product, onDeleteClick }: any) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="text-xl font-bold text-purple-700 mb-2">
        {product.productName}
      </div>
      <div className="text-lg text-gray-800 mb-2">
        <strong>Price:</strong> ${product.productPrice.toFixed(2)}
      </div>
      <div className="text-md text-gray-600 mb-4">
        <strong>Description:</strong> {product.productDescription}
      </div>
      <div className="flex justify-between">
        <Link
          to={`/products/${product._id}`}
          className="text-blue-600 hover:underline"
        >
          <i className="fas fa-eye mr-1"></i> View
        </Link>
        <Link
          to={`/products/edit/${product._id}`}
          className="text-yellow-500 hover:underline"
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
    </div>
  );
};

export default ProductCard;
