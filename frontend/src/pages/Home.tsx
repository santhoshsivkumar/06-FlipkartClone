import { useEffect, useState } from "react";
import axios from "axios";
import Default_Img from "../../public/Default_Img.jpg";
import { siteURL } from "../static/Data";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { HomePageImages } from "../static/Data";
import Carousel from "../components/HomePage/Carousel";
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
    <div className={`theme min-h-[100vh] space-y-4 p-4 `}>
      <div
        className={`w-full gap-12 overflow-scroll flex theme_container justify-center items-center font-semibold h-32 shadow-sm rounded-sm`}
      >
        {HomePageImages.map((item: any, index: any) => {
          return (
            <a
              key={index}
              className="flex hover:scale-[1.05]  flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <img src={item.img} alt={item.title} className="w-20 h-20" />
              <p className="text-sm theme_text">{item.title}</p>
            </a>
          );
        })}
      </div>
      <Carousel />

      <div
        className={`theme_container justify-center flex p-0 lg:p-4 shadow-none lg:shadow-md rounded-sm`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : categories?.length > 0 ? (
          <div
            className={`relative grid justify-center items-center grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4  rounded-sm `}
          >
            {categories.map((category: any, index: number) => (
              <Link to={`/products/collection/${category}`} key={index}>
                <div
                  className={` theme_border border-[1px] product_card flex flex-col justify-center shadow-sm items-center cursor-pointer rounded-sm p-4`}
                >
                  <img
                    src={Default_Img}
                    alt="Product Preview"
                    className="rounded-sm p-4 hover:scale-[1.1]"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="theme_color text-md font-bold pt-2">
                    {category}
                  </div>
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
