import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domainURL } from "../static";
import defaultImg from "../../public/Default_Img.jpg";
import { GetImageURL } from "../GetImageURL";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
interface Product {
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: "";
}
const ProductDetails = () => {
  const { darkMode } = useSelector((state: any) => state.products);
  const [product, setProduct] = useState<Product>({
    productName: "",
    productPrice: 0,
    productDescription: "",
    productImage: "",
  });
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${domainURL}/products/details/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <>
      {!loading ? (
        <div
          className={`${
            darkMode ? "bg-[#000000]" : "bg-[#f0f2f6]"
          } p-6 w-full min-h-[91.4vh] flex mt-16 `}
        >
          {/* left */}
          <div
            className={` lg:w-[40%] flex lg:flex-col h-[85.5vh] gap-2  fixed top-15 left-5 w-full`}
          >
            <div
              className={`${
                darkMode ? "border-[#2d2d2d]" : ""
              }  border-[1px]  flex lg:flex-row  h-[70%]`}
            >
              <div
                className={`w-[15%] p-2 border-r-[1px] ${
                  darkMode ? "border-[#2d2d2d]" : ""
                }`}
              >
                <div
                  className={`h-full  ${
                    darkMode ? "bg-[#2d2d2d]" : "bg-white"
                  }`}
                ></div>
              </div>
              <div className="w-[85%]  justify-center items-center flex flex-col">
                <img
                  src={
                    product.productImage
                      ? GetImageURL(product.productImage)
                      : defaultImg
                  }
                  alt=""
                  className="w-96 h-96 hover:shadow-md rounded-sm border hover:scale-[1.008]"
                />
              </div>
            </div>
            <div
              className={` ${
                darkMode ? "bg-[#2d2d2d]  " : " "
              } ml-[5.5rem] flex justify-center items-center gap-4 p-4  `}
            >
              <button className=" w-3/6 py-2 px-4 text-sm text-white bg-green-600 font-semibold">
                ADD TO CART
              </button>
              <button className="w-3/6 py-2 px-4 text-white text-sm bg-green-600 font-semibold">
                BUY NOW
              </button>
            </div>
          </div>

          {/* right */}
          <div
            className={`${
              darkMode ? "bg-[#2d2d2d] text-white " : "bg-[#fff] text-black"
            } lg:w-[60%] p-4 ml-[43%]`}
          >
            <div className="text-2xl w-full">
              {" "}
              Product Name: {product.productName}
            </div>
            <div className="text-md w-full"> Price: {product.productPrice}</div>
            <div className="text-sm w-full">
              Description : {product.productDescription}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductDetails;
