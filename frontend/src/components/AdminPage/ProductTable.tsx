import { Link } from "react-router-dom";
import Loading from "../Loading";

// Component for rendering product image
const ProductImage = ({ imageUrl }: { imageUrl: string }) => (
  <td className="p-4 justify-center flex items-center">
    <img
      src={imageUrl}
      alt="Product Preview"
      className="mt-2 rounded-md border-[1px] p-1 theme_border"
      style={{
        maxWidth: "100%",
        maxHeight: "200px",
        width: "auto",
        height: "100px",
      }}
    />
  </td>
);

// Reusable link component
const ProductLink = ({
  to,
  text,
  iconClass,
}: {
  to: string;
  text: string;
  iconClass: string;
}) => (
  <td className="p-4 space-x-2">
    <Link to={to} className="text-blue-600">
      <i className={iconClass}></i> {text}
    </Link>
  </td>
);

const ProductTable = ({ products, onDeleteClick }: any) => {
  const renderRows = () => {
    if (!products || products.length === 0) {
      return (
        <tr>
          <td colSpan={8} className="p-4 text-center">
            <Loading />
          </td>
        </tr>
      );
    }

    return products.map((product: any) => (
      <tr key={product._id} className="border-b theme_border text-center">
        <td className="p-4">{product._id}</td>
        <ProductImage imageUrl={product.productImage} />
        <td className="p-4">{product.productName}</td>
        <td className="p-4">{product.productDescription.substring(0, 15)}</td>
        <td className="p-4">{product.productPrice}</td>
        <td className="p-4">{product.category}</td>
        <td className="p-4">{product.company}</td>
        <td className="p-4">{product.seller}</td>
        <ProductLink
          to={`/products/${product._id}`}
          text=""
          iconClass="fas fa-eye mr-1"
        />
        <ProductLink
          to={`/products/edit/${product._id}`}
          text=""
          iconClass="fas fa-edit mr-1"
        />
        <td className="p-4">
          <button
            onClick={() => onDeleteClick(product._id)}
            className="text-red-600"
          >
            <i className="fas fa-trash-alt mr-1"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <table className="table-auto w-full theme_container theme_text shadow-md rounded-md overflow-hidden">
      <thead className="theme_bg text-white">
        <tr>
          <th className="p-4">Product ID</th>
          <th className="p-4">Product Image</th>
          <th className="p-4">Product Name</th>
          <th className="p-4">Product Description</th>
          <th className="p-4">Product Price</th>
          <th className="p-4">Category</th>
          <th className="p-4">Company</th>
          <th className="p-4">Seller</th>
          <th className="p-4">View</th>
          <th className="p-4">Edit</th>
          <th className="p-4">Delete</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default ProductTable;
