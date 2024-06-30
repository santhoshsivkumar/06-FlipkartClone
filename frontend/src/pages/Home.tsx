import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { domainURL } from "../static";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${domainURL}/products`)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center my-6">
        <h1 className="font-bold p-2">Products</h1>
        <Link
          to={`/products/create`}
          className="py-2 px-4 bg-purple-600 text-white rounded-md"
        >
          Create product
        </Link>
        <div className="m-4">
          <table className=" table table-auto ">
            <thead className="border border-red-600">
              <tr className="p-4">
                <th className="p-2">Product ID</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Product Description</th>
                <th className="p-2">Product Price</th>
                <th className="p-2">Operations</th>
              </tr>
            </thead>
            {products?.length > 0 && (
              <tbody className="border border-red-600">
                {products.map((product: any) => (
                  <tr key={product._id} className="p-2">
                    <td className="p-2">{product?._id}</td>
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.productDescription}</td>
                    <td className="p-2">{product.productPrice}</td>
                    <td className="p-2 space-x-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="text-blue-600 underline"
                      >
                        {" "}
                        View
                      </Link>
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="text-blue-600 underline"
                      >
                        {" "}
                        Edit
                      </Link>
                      <Link
                        to={`/products/delete/${product._id}`}
                        className="text-blue-600 underline"
                      >
                        {" "}
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!products?.length && !loading && (
            <p className="text-2xl text-red-400 p-4 text-center">
              No data found
            </p>
          )}
          {loading && (
            <p className="text-2xl text-red-400 p-4 text-center">Loading</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
