import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { setLoading, setProducts } from "../slices/productSlice";
import axios from "axios";
import { domainURL } from "../static";
import { Link } from "react-router-dom";

export const UserHomePage = () => {
  const { products, loading, darkMode } = useSelector(
    (state: any) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(`${domainURL}/products`)
      .then((response: any) => {
        dispatch(setProducts(response.data.data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-[#000000]" : "bg-[#f0f2f6]"
      } space-y-4 p-4 gap-4 min-h-[91.2vh] mt-16`}
    >
      <div
        className={`${
          darkMode ? "bg-[#2d2d2d]" : "bg-[white]"
        } h-40 p-4 shadow-sm rounded-sm justify-center flex items-center`}
      >
        <h1 className="text-3xl font-semibold text-center  "> Working on...</h1>
      </div>

      <div
        className={`${
          darkMode ? "bg-[#2d2d2d]" : "bg-[white]"
        } p-4 shadow-md rounded-sm`}
      >
        <div
          className={`${
            darkMode ? "bg-[#000]" : "bg-[#f0f2f6]"
          } grid grid-cols-1 p-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-[87vh] rounded-sm shadow-md`}
        >
          {products.length > 0
            ? products.map((product: any) => (
                <Link to={`/products/${product._id}`} key={product._id}>
                  <ProductCard product={product} showOptions={false} />
                </Link>
              ))
            : !loading && (
                <p className="text-2xl text-red-400 p-4 text-center">
                  No data found
                </p>
              )}
        </div>
      </div>
    </div>
  );
};
