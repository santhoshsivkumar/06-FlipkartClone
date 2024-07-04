import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { setProducts } from "../slices/productSlice";
import axios from "axios";
import { domainURL } from "../static";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import Loading from "../components/Loading";
const HomePage = () => {
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
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className={`theme space-y-4 p-4 `}>
      <div
        className={`theme_container border-[1px] theme_border h-40 p-4 shadow-sm rounded-sm justify-center flex items-center`}
      >
        <h1 className="theme_text text-2xl font-semibold text-center  ">
          {" "}
          Working on...
        </h1>
      </div>
      <div
        className={`theme_container border-[1px] theme_border h-40 p-4 shadow-sm rounded-sm justify-center flex items-center`}
      >
        <h1 className="theme_text text-2xl font-semibold text-center  ">
          {" "}
          Working on...
        </h1>
      </div>

      <div
        className={`theme_container min-h-[63vh] justify-center flex items-center p-4 shadow-md rounded-sm`}
      >
        {products.length > 0 ? (
          <div
            className={`theme grid grid-cols-1 p-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  rounded-sm `}
          >
            {" "}
            {products.map((product: any) => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <ProductCard product={product} showOptions={false} />
              </Link>
            ))}
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          <p className="text-2xl text-red-400">No data found</p>
        )}
      </div>
    </div>
  );
};
export default HomePage;
