import { Link } from "react-router-dom";

const ProductTable = ({ products, onDeleteClick }: any) => {
  return (
    <table className="table-auto w-full bg-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-purple-600 text-white">
        <tr>
          <th className="p-4">Product ID</th>
          <th className="p-4">Product Name</th>
          <th className="p-4">Product Description</th>
          <th className="p-4">Product Price</th>
          <th className="p-4">View</th>
          <th className="p-4">Edit</th>
          <th className="p-4">Delete</th>
        </tr>
      </thead>
      {products?.length > 0 && (
        <tbody>
          {products.map((product: any) => (
            <tr key={product._id} className="border-b text-center">
              <td className="p-4">{product._id}</td>
              <td className="p-4">{product.productName}</td>
              <td className="p-4">{product.productDescription}</td>
              <td className="p-4">{product.productPrice}</td>
              <td className="p-4 space-x-2">
                <Link
                  to={`/products/${product._id}`}
                  className="text-blue-600 hover:underline"
                >
                  <i className="fas fa-eye mr-1"></i> View
                </Link>
              </td>
              <td>
                <Link
                  to={`/products/edit/${product._id}`}
                  className="text-yellow-600 hover:underline"
                >
                  <i className="fas fa-edit mr-1"></i> Edit
                </Link>
              </td>
              <td>
                <button
                  onClick={() => onDeleteClick(product._id)}
                  className="text-red-600 hover:underline"
                >
                  <i className="fas fa-trash-alt mr-1"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default ProductTable;
