import { Link } from "react-router-dom";
import Loading from "../Loading";
import { formatRelativeTime } from "../../static/Functions";

const ProductImage = ({ imageUrl }: { imageUrl: string }) => (
  <td className="p-4 justify-center flex items-center">
    <img
      src={imageUrl}
      alt="Product Preview"
      className="mt-2 rounded-md border-[1px] p-1 theme_border"
      style={{
        maxWidth: "100%",
        maxHeight: "200px",
        width: "250px",
        height: "100px",
      }}
    />
  </td>
);

const ProductLink = ({ to, iconClass }: { to: string; iconClass: string }) => (
  <td className="p-4 space-x-2">
    <Link
      to={to}
      className={`${
        iconClass === "fas fa-eye mr-1" ? `text-yellow-500` : `text-blue-500`
      }`}
    >
      <i className={iconClass}></i>
    </Link>
  </td>
);

const headers = [
  "Product ID",
  "Product Image",
  "Product Name",
  "Product Description",
  "Product Price",
  "Category",
  "Company",
  "Seller",
  "Created At",
  "View",
  "Edit",
  "Delete",
];

const ProductTable = ({ products, onDeleteClick }: any) => {
  const renderRows = () => {
    if (!products || products.length === 0) {
      return (
        <tr>
          <td colSpan={headers.length} className="p-4 text-center">
            <Loading />
          </td>
        </tr>
      );
    }

    return products.map((product: any) => (
      <tr key={product._id} className="border-b theme_border text-center">
        <td className="p-4">{product._id}</td>
        <ProductImage imageUrl={product.productImage} />
        {[
          "productName",
          "productDescription",
          "productPrice",
          "category",
          "company",
          "seller",
          "createdAt",
        ].map((field, index) => (
          <td key={index} className="p-4">
            {field === "productDescription"
              ? product[field]?.substring(0, 15)
              : field === "createdAt"
              ? product[field]
                ? formatRelativeTime(product[field])
                : product[field]
              : product[field]}
          </td>
        ))}
        <ProductLink
          to={`/products/${product._id}`}
          iconClass="fas fa-eye mr-1"
        />
        <ProductLink
          to={`/products/edit/${product._id}`}
          iconClass="fas fa-edit mr-1"
        />
        <td className="p-4">
          <button
            title="Delete"
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
          {headers.map((header, index) => (
            <th key={index} className="p-4">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default ProductTable;
