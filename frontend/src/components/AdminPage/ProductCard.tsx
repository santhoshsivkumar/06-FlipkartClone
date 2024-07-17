import { Link } from "react-router-dom";
import { formatPrice } from "../../static/Functions";

const ProductCard = ({ products, onDeleteClick }: any) => {
  return (
    <div className="grid grid-cols-1 theme_text md:grid-cols-2 lg:grid-cols-5 gap-4">
      {products.map((product: any) => (
        <div
          key={product._id}
          className="theme_container gap-1 flex flex-col justify-center items-center p-4 rounded-md shadow-md "
        >
          <img
            src={product.productImage}
            alt="Product"
            className="size-12 rounded-md"
          />
          <h3 className="font-bold mt-2">
            {product.productName?.substring(0, 20)}...
          </h3>
          <p className="font-semibold">{formatPrice(product.productPrice)}</p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Link
              to={`/products/${product._id}`}
              className="text-blue-500 hover:text-blue-600 mr-4"
            >
              <i className="fas fa-eye mr-1"></i> View
            </Link>
            <Link
              to={`/products/edit/${product._id}`}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <i className="fas fa-edit mr-1"></i> Edit
            </Link>
            <button
              title="Delete"
              onClick={() => onDeleteClick(product._id)}
              className="text-red-600"
            >
              <i className="fas fa-trash-alt mr-1"></i> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
