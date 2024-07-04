import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { domainURL } from "../static";
import ProductCard from "./ProductCard.tsx";
import ProductTable from "./ProductTable.tsx";
import DeleteProduct from "./DeleteProduct";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../slices/productSlice.tsx";
const AdminHome = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const { products } = useSelector((state: any) => state.products);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${domainURL}/products`)
      .then((response: any) => {
        dispatch(setProducts(response.data.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
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
        products.filter((product: any) => product._id !== deleteProductId);
        setIsDeleteModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col items-center p-4 theme">
        <h1 className="text-4xl font-bold theme_color p-4">Products</h1>
        <div className="flex justify-end w-[92.5%]">
          <Link
            to={`/products/create`}
            className="py-2 px-4 theme_btn text-white rounded-md mb-4 transition duration-300"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Item
          </Link>
        </div>
        <div className=" w-full max-w-7xl scroll-m-0">
          {isLargeScreen ? (
            <ProductTable
              products={products}
              onDeleteClick={handleDeleteClick}
            />
          ) : products.length > 0 ? (
            products.map((product: any) => (
              <div
                className={`theme grid grid-cols-1 p-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  rounded-sm shadow-md`}
              >
                <ProductCard
                  key={product._id}
                  showOptions={true}
                  product={product}
                  onDeleteClick={handleDeleteClick}
                />
              </div>
            ))
          ) : (
            !loading && (
              <p className="text-2xl text-red-400 p-4 text-center">
                No data found
              </p>
            )
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

export default AdminHome;
