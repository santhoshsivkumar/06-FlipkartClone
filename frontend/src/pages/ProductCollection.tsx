import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { siteURL } from "../static/Data";
import { formatPrice } from "../static/Functions";
import Loading from "../components/Loading";
import "../styles/styles.css";
import FilterBar from "../components/FilterBar";
import SortBy from "../components/ProductsPage/SortBy";
import { Product } from "../static/interface";

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
      <div className="flex min-h-[100vh] h-full w-full gap-2 p-2">
        <div className="lg:w-[19.2%] theme_container p-4 shadow-sm "> </div>
        <div className="lg:w-[80.8%] theme_container pt-4 shadow-sm ">
          <SortBy collection={collection} />
          {productCollection.map((product: Product) => {
            return (
              <Link
                to={`/products/${product._id}`}
                className="flex theme_text p-4 border-[0.5px] h-80"
                key={product._id}
              >
                <div className="w-[25%]  flex theme_border p-4 border-[1px] justify-center items-center">
                  <img src={product.productImage} alt="" className="" />
                </div>
                <div className="w-[45%]  px-4">
                  <h3 className="font-semibold text-xl">
                    {product.productName}
                  </h3>
                  <div className="text-[12px] flex gap-4 py-2 text-gray-400 font-semibold">
                    <p className="bg-green-600 text-white w-[3rem] rounded-sm px-4  flex gap-2 justify-center items-center">
                      4.2
                      <i className="fa fa-star " aria-hidden="true"></i>
                    </p>
                    <p className="text-sm">37,446 Ratings & 1,758 Reviews</p>
                  </div>
                  <ul className="text-sm space-y-2 list-disc ml-6">
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
                <div className="w-[30%] flex px-4 flex-col gap-1">
                  <div className="text-2xl font-bold">
                    {formatPrice(product.productPrice)}
                  </div>
                  <div className="text-sm flex gap-4">
                    <span className="text-gray-500 line-through">
                      {formatPrice(off30percent(product.productPrice))}
                    </span>
                    <span className="text-green-500 font-semibold">
                      30% off
                    </span>
                  </div>
                  <div className="text-sm">
                    Free delivery by{" "}
                    <span className="font-semibold">Tomorrow</span>
                  </div>
                  <div className="text-sm text-green-500 font-semibold">
                    Save extra with combo offers
                  </div>
                  <div className="text-sm">
                    Upto{" "}
                    <span className="font-semibold">
                      {formatPrice(upto70percent(product.productPrice))}
                    </span>{" "}
                    Off on Exchange
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;

const off30percent = (price: any) => {
  return price + (30 / 100) * price;
};
const extra5percent = (price: any) => {
  return (5 / 100) * price;
};

const upto70percent = (price: any) => {
  return (70 / 100) * price;
};
