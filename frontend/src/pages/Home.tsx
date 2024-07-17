import { useEffect, useState } from "react";
import axios from "axios";
import { siteURL } from "../static/Data";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

import Carousel from "../components/HomePage/Carousel";

const HomePageImages = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FGrocery.webp?alt=media&token=ecae1617-0d40-49b1-b6bb-92562e7ce215",
    title: "Grocery",
    link: "/products/collection/grocery",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FMobiles.webp?alt=media&token=8c1e02c3-f827-4a8b-8c53-8032addc92d1",
    link: "/products/collection/smartphones",
    title: "Mobiles",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FFashion.webp?alt=media&token=cba2594b-4a40-4a14-9d04-3fe311304700",
    link: "/products/collection/fashion",
    title: "Fashion",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FElectronics.webp?alt=media&token=a7a6eb67-df6c-40b3-b46e-1717fe12a87e",
    link: "/products/collection/electronics",
    title: "Electronics",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FHomeAndFurnitures.png?alt=media&token=a91fc701-9157-408b-a9d3-d9ad2458569d",
    link: "/products/collection/home & furnitures",
    title: "Home & Furnitures",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FAppliances.png?alt=media&token=0070637e-93ec-4bdf-b5d4-2dd87cd01899",
    link: "/products/collection/appliances",
    title: "Appliances",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FTravel.webp?alt=media&token=998fbc64-da4d-42d8-a4c8-2fc4fcfc7184",
    link: "/products/collection/travel",
    title: "Travel",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FBeautyAndMore.webp?alt=media&token=5a3ab4e6-ac2d-4c40-8486-a09bbd54bca2",
    link: "/products/collection/beauty&more",
    title: "Beauty, Toys & More",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FTwoWheelers.webp?alt=media&token=4578df9a-9c06-4edd-aac4-05607117a101",
    link: "/products/collection/two wheelers",
    title: "Two Wheelers",
  },
];
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${siteURL}/products/categories`)
      .then((response: any) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className={`theme min-h-[100vh] space-y-2 md:space-y-4 p-0 md:p-4 `}>
      <div
        className={`w-full gap-12 overflow-x-scroll flex theme_container justify-center items-center font-semibold h-32 shadow-sm rounded-sm`}
      >
        {HomePageImages.map((item: any, index: any) => {
          return (
            <a
              key={index}
              href={item.link}
              title={item.title}
              className="flex hover:scale-[1.05]  flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="w-20 h-20" />
              <p className="text-sm theme_text">{item.title}</p>
            </a>
          );
        })}
      </div>
      <Carousel />

      <div className={`justify-center flex rounded-sm md:min-h-[15rem]`}>
        {loading ? (
          <div className="flex items-center justify-center ">
            <Loading />
          </div>
        ) : categories?.length > 0 ? (
          <div
            className={`relative grid justify-center items-center grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2  rounded-sm `}
          >
            {categories.map((category: any, index: number) => (
              <Link
                to={`/products/collection/${category.categoryName}`}
                key={index}
              >
                <div
                  className={` theme_container m-1 theme_border border-[1px] product_card flex flex-col justify-center shadow-sm items-center cursor-pointer rounded-sm p-4`}
                >
                  <img
                    src={
                      category.categoryImage ||
                      "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2FDefault_Img.jpg?alt=media&token=37ae8d9f-967d-4779-8790-95150b46a06f"
                    }
                    alt="Product Preview"
                    className="rounded-sm p-4 hover:scale-[1.1]"
                    style={{ width: "150px", height: "175px" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-2xl flex items-center justify-center text-red-400">
            No data found
          </p>
        )}
      </div>
    </div>
  );
};
export default Home;
