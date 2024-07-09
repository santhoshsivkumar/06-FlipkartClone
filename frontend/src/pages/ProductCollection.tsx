import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { siteURL } from "../static/Data";
import { find30percent, find70percent, formatPrice } from "../static/Functions";
import FilterBar from "../components/FilterBar";
import SortBy from "../components/ProductsPage/SortBy";
import { Product } from "../static/interface";
import Loading from "../components/Loading";

const ProductCollection = () => {
  const [productCollection, setProductCollection] = useState([]);
  const { collection } = useParams<{ collection: string }>();
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${siteURL}/products/?category=${collection}`)
      .then((res) => {
        setProductCollection(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [collection]);

  return (
    <div className="theme w-full  min-h-[100vh]">
      <FilterBar />
      <div className="flex min-h-[100vh] h-full w-full gap-2 lg:p-4">
        <div className="lg:w-[19.2%] md:w-3/12 theme_container  hidden md:block p-4 shadow-sm ">
          {" "}
        </div>
        <div className="lg:w-[80.8%] w-full md:w-9/12 relative theme_container pt-4 shadow-sm ">
          <div className="pl-4 font-md theme_text font-semibold">
            Showing 1 – {productCollection.length} of {productCollection.length}{" "}
            results for {collection}
          </div>
          <SortBy />
          {loading ? (
            <div className="absolute inset-0 flex gap-2 flex-col items-center justify-center theme_container  z-10">
              <Loading />
            </div>
          ) : (
            productCollection.map((product: Product) => {
              return (
                <Link
                  to={`/products/${product._id}`}
                  className="flex theme_text p-4 theme_border border-b-[0.5px] h-25  md:h-80"
                  key={product._id}
                >
                  <div className="lg:w-[25%] w-4/12 flex  p-4 justify-center items-center">
                    <img src={product.productImage} alt="" className="" />
                  </div>
                  <div className="flex flex-col lg:w-[75%] w-8/12 lg:flex-row ">
                    <div className=" px-4">
                      <h3 className="font-semibold lg:text-xl text-sm">
                        {product.productName}
                      </h3>
                      <div className="text-[12px] flex gap-2 lg:gap-4 py-2 text-gray-400 font-semibold">
                        <p className="bg-green-600 text-[8px] lg:text-xs h-fit text-white lg:w-[3rem] px-1 rounded-sm  flex gap-2 justify-center items-center">
                          4.2
                          <i className="fa fa-star " aria-hidden="true"></i>
                        </p>
                        <p className="text-[8px] lg:text-sm">
                          37,446 Ratings & 1,758 Reviews
                        </p>
                      </div>
                      <ul className="text-xs lg:text-sm space-y-2 list-disc ml-6 hidden lg:block ">
                        <li>6 GB RAM | 128 GB ROM | Expandable Upto 2 TB</li>
                        <li>16.94 cm (6.67 inch) Full HD+ Display</li>
                        <li>50MP + 2MP | 16MP Front Camera</li>
                        <li>5000 mAh Battery </li>
                        <li>Dimensity 7050 Processor</li>
                        <li>
                          1 Year Manufacturer Warranty for Device and 6 Months
                          Manufacturer Warranty for Inbox Accessories
                        </li>
                      </ul>
                    </div>
                    <div className="flex px-4 flex-col gap-1">
                      <div className="flex flex-row items-center lg:items-start gap-2 lg:flex-col">
                        {" "}
                        <div className="lg:text-2xl text-[10px] font-bold">
                          {formatPrice(product.productPrice)}
                        </div>
                        <div className="lg:text-sm  text-[10px] flex gap-2 lg:gap-4">
                          <span className="text-gray-500 line-through">
                            {formatPrice(find30percent(product.productPrice))}
                          </span>
                          <span className="text-green-500 font-semibold">
                            30% off
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] lg:text-sm">
                        Free delivery by{" "}
                        <span className="font-semibold">Tomorrow</span>
                      </div>
                      <div className="text-[10px] lg:text-sm  text-green-500 font-semibold">
                        Save extra with combo offers
                      </div>
                      <div className="text-[10px] lg:text-sm ">
                        Upto{" "}
                        <span className="font-semibold">
                          {formatPrice(find70percent(product.productPrice))}
                        </span>{" "}
                        Off on Exchange
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
