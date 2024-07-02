import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { domainURL } from "../static";
import ProductCard from "./ProductCard.tsx";
import ProductTable from "./ProductTable.tsx";
import DeleteProduct from "./DeleteProduct";

import Loading from "../components/Loading.tsx";
import { useSelector } from "react-redux";
const AdminHome = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const { products, loading } = useSelector((state: any) => state.products);

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
        products.filter((product: any) => product._id !== deleteProductId);
        setIsDeleteModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex mt-16  flex-col items-center p-4 bg-gray-200 min-h-screen">
        <h1 className="text-4xl font-bold text-purple-700 p-4">Products</h1>
        <Link
          to={`/products/create`}
          className="py-2 px-4 bg-green-500 text-white rounded-md mb-4 hover:bg-green-600 transition duration-300"
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Create Product
        </Link>
        <div className="m-4 w-full max-w-7xl scroll-m-0">
          {isLargeScreen ? (
            <ProductTable
              products={products}
              onDeleteClick={handleDeleteClick}
            />
          ) : products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                showOptions={true}
                product={product}
                onDeleteClick={handleDeleteClick}
              />
            ))
          ) : (
            !loading && (
              <p className="text-2xl text-red-400 p-4 text-center">
                No data found
              </p>
            )
          )}
          {loading && <Loading />}
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

export default AdminHome;
