import React from "react";
import { Link } from "react-router-dom";

interface ProductCardViewProps {
  product: any;
  route: string;
  onDeleteClick: (id: string) => void;
}

const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  route,
  onDeleteClick,
}) => {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.productImage}
        alt="Product Preview"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.productName}</h2>
        <p className="text-gray-600">{product.productDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/${route}/${product._id}`}
            className="text-blue-600 hover:underline"
          >
            View
          </Link>
          <div>
            <Link
              to={`/${route}/edit/${product._id}`}
              className="text-blue-600 mr-2 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => onDeleteClick(product._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardView;
