import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { setProducts } from "../slices/productSlice";
import axios from "axios";
import { domainURL } from "../static";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import Loading from "../components/Loading";
import AppliancesImg from "../assets/Header Images/appliances.png";
import BeautyImg from "../assets/Header Images/Beautytoyandmore.webp";
import ElectronicsImg from "../assets/Header Images/Electronis.webp";
import FasionImg from "../assets/Header Images/Fasion.webp";
import GroceryImg from "../assets/Header Images/Grocery.webp";
import HomeAndFurnitures from "../assets/Header Images/Homefurnitures.png";
import MobilesImg from "../assets/Header Images/mobiles.webp";
import TravelImg from "../assets/Header Images/Travel.webp";
import TwoWeelersImg from "../assets/Header Images/Twoweelers.webp";

const ImagesData = [
  { img: GroceryImg, title: "Grocery" },
  { img: MobilesImg, title: "Mobiles" },
  { img: FasionImg, title: "Fashion" },
  { img: ElectronicsImg, title: "Electronics" },
  { img: HomeAndFurnitures, title: "Home & Furnitures" },
  { img: AppliancesImg, title: "Appliances" },
  { img: TravelImg, title: "Travel" },
  { img: BeautyImg, title: "Beauty, Toys & More" },
  { img: TwoWeelersImg, title: "Two Wheelers" },
];
const HomePage = () => {
  const { products } = useSelector((state: any) => state.products);
  const [loading, setLoading] = useState(false);
  const images = {};
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${domainURL}/products`)
      .then((response: any) => {
        dispatch(setProducts(response.data.data));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className={`theme min-h-[100vh] space-y-4 p-4 `}>
      <div
        className={`theme_container border-[1px] font-semibold theme_border h-40 p-4 shadow-sm rounded-sm`}
      >
        <div className="flex w-full h-full overflow-auto gap-10 pt-4 px-6 theme_text justify-center items-center">
          {ImagesData.map((item: any, index: any) => {
            return (
              <a
                key={index}
                className="flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-
                    20"
                />
                <p className="text-sm ">{item.title}</p>
              </a>
            );
          })}
        </div>
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
