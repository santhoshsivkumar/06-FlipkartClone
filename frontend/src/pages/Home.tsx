import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { domainURL } from "../static";
import ProductCard from "./ProductCard.tsx";
import ProductTable from "./ProductTable.tsx";
import DeleteProduct from "./DeleteProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDeleteClick = (id: any) => {
    setDeleteProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProduct = () => {
    axios
      .delete(`${domainURL}/products/delete/${deleteProductId}`)
      .then(() => {
        console.log("Deleted successfully");
        setProducts(
          products.filter((product: any) => product._id !== deleteProductId)
        );
        setIsDeleteModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-purple-700 p-4">Products</h1>
        <Link
          to={`/products/create`}
          className="py-2 px-4 bg-green-500 text-white rounded-md mb-4 hover:bg-green-600 transition duration-300"
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Create Product
        </Link>
        <div className="m-4 w-full max-w-5xl">
          {isLargeScreen ? (
            <ProductTable
              products={products}
              onDeleteClick={handleDeleteClick}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.length > 0
                ? products.map((product: any) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onDeleteClick={handleDeleteClick}
                    />
                  ))
                : !loading && (
                    <p className="text-2xl text-red-400 p-4 text-center">
                      No data found
                    </p>
                  )}
              {loading && (
                <p className="text-2xl text-red-400 p-4 text-center">
                  Loading...
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <DeleteProduct
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteProduct}
      />
    </>
  );
};

export default Home;
