/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { siteURL } from "../static/Data";
import { find30percent, find70percent, formatPrice } from "../static/Functions";
import FilterBar from "../components/FilterBar";
import SortBy from "../components/ProductsPage/SortBy";
import Loading from "../components/Loading";
import FilterSection from "../components/ProductCollectionPage/FilterSection";

// Define the type for a product
interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  company: string;
  updatedAt: string;
}

// Define the type for filters
interface Filters {
  brands: string[];
  priceRange: [number, number];
}

const ProductCollection = () => {
  const [productCollection, setProductCollection] = useState<Product[]>([]);
  const { collection } = useParams<{ collection: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state for managing sidebar visibility on small screens
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    priceRange: [0, 0],
  }); // state for managing filters
  const [sortOption, setSortOption] = useState<string>("Relevance");
  console.log(collection);
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
        setLoading(false);
      });
  }, [collection]);

  useEffect(() => {
    if (productCollection.length > 0) {
      const prices = productCollection.map((p) => p.productPrice);
      setFilters((prev) => ({
        ...prev,
        priceRange: [Math.min(...prices), Math.max(...prices)],
      }));
    }
  }, [productCollection]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sortProducts = (products: Product[], sortOption: string) => {
    switch (sortOption) {
      case "Price -- Low to High":
        return [...products].sort((a, b) => a.productPrice - b.productPrice);
      case "Price -- High to Low":
        return [...products].sort((a, b) => b.productPrice - a.productPrice);
      case "Newest First":
        return [...products].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      default:
        return products;
    }
  };

  const applyFilters = (products: Product[]) => {
    return products.filter((product) => {
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.company);
      const matchesPrice =
        product.productPrice >= filters.priceRange[0] &&
        product.productPrice <= filters.priceRange[1];
      return matchesBrand && matchesPrice;
    });
  };

  const filteredProducts = applyFilters(productCollection);
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  return (
    <div className="theme w-full  min-h-[100vh] ">
      <FilterBar />
      <div className="flex min-h-[100vh] h-full w-full gap-2 p-0 md:p-4">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden`}
          onClick={toggleSidebar}
        ></div>
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-y-0 left-0 theme_container w-64 p-1 md:p-4 z-30 md:flex md:relative md:w-4/12 lg:w-[25%] h-[100vh] overflow-y-scroll flex-col gap-2 shadow-md`}
        >
          <FilterSection
            productCollection={productCollection}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="flex z-5 absolute pl-1 rounded-r-2xl md:hidden justify-end">
          <button onClick={toggleSidebar} className="">
            <i
              className="fa fa-chevron-right mt-2 theme_color nav_btn p-2 theme_border border-2 cursor-pointer rounded-2xl"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <div className="lg:w-[80.8%] w-full md:w-9/12 md:relative theme_container pt-12 md:pt-4 shadow-sm ">
          <div className="pl-4 pb-4 font-md border-b-[1px] theme_border theme_text font-semibold">
            Showing 1 – {sortedProducts.length} of {sortedProducts.length}{" "}
            results for {collection}
          </div>
          <SortBy setSortOption={setSortOption} />
          {loading ? (
            <div className="absolute inset-0 flex gap-2 flex-col items-center justify-center theme_container  z-10">
              <Loading />
            </div>
          ) : sortedProducts.length ? (
            sortedProducts.map((product: Product) => {
              return (
                <Link
                  to={`/products/${product._id}`}
                  className="flex theme_text p-4 theme_border border-b-[1px] "
                  key={product._id}
                >
                  <div className="lg:w-[25%] w-4/12 flex justify-center items-center">
                    <img
                      src={product.productImage}
                      alt=""
                      className="max-h-32 "
                    />
                  </div>
                  <div className="flex flex-col lg:w-[75%] w-8/12 lg:flex-row ">
                    <div className=" px-4">
                      <h3 className="font-semibold block md:hidden lg:text-xl">
                        {product.productName?.substring(0, 20)}
                      </h3>
                      <h3 className="font-semibold hidden md:block lg:text-xl">
                        {product.productName}
                      </h3>
                      <div className="text-[12px] items-center flex gap-2 lg:gap-4 py-2 text-gray-400 font-semibold">
                        <p className="bg-green-600 text-[8px] lg:text-xs h-fit text-white lg:w-[3rem] px-1 rounded-sm  flex gap-2 justify-center items-center">
                          4.2
                          <i className="fa fa-star " aria-hidden="true"></i>
                        </p>
                        <p className="text-[11px] lg:text-sm">
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
                        <div className="lg:text-2xl text-sm font-bold">
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

                      <div className="text-xs lg:text-sm ">
                        Upto{" "}
                        <span className="font-semibold">
                          {formatPrice(find70percent(product.productPrice))}
                        </span>{" "}
                        Off on Exchange
                      </div>
                      <div className="text-xs lg:text-sm">
                        Free delivery by{" "}
                        <span className="font-semibold">Tomorrow</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="absolute text-red-600 inset-0 flex gap-2 flex-col items-center justify-center theme_container  z-10">
              No products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
