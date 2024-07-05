import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { siteURL } from "../static/Data";
import defaultImg from "../../public/Default_Img.jpg";
import { formatPrice } from "../static/Functions";
import Loading from "../components/Loading";
import { headerItems } from "../static/Data";
import "../styles/styles.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: 0,
    productDescription: "",
    productImage: "",
    seller: "",
  });
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${siteURL}/products/details/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [id]);
  const off30pcent = product.productPrice + (30 / 100) * product.productPrice;
  const extra5pcent = (5 / 100) * product.productPrice;
  return (
    <div className="theme min-h-[100vh]">
      <div className="px-4 h-10 theme_container gap-12 flex items-center justify-center theme_border shadow-md border-b">
        {headerItems.map((item, index) => {
          return (
            <div className=" flex items-center justify-center gap-1">
              <span className="theme_text text-sm font-semibold" key={index}>
                {item}
              </span>
              <i
                className="fa fa-angle-down mt-1 text-gray-400"
                aria-hidden="true"
              ></i>
            </div>
          );
        })}
      </div>

      {!loading ? (
        <div className="lg:mx-6 p-4 theme_container">
          <div className={`flex lg:flex-row flex-col `}>
            {/* left */}
            <div
              className={`lg:w-[37.3%] h-[65vh] w-full contents lg:flex flex-col  lg:sticky top-[4.5rem]`}
            >
              <div
                className={`theme_border border-[1px] flex flex-col-reverse lg:flex-row h-[100%]`}
              >
                <div
                  className={` lg:w-[15%] lg:border-r-[1px] theme_border lg:border-t-0 border-t-[1px]`}
                >
                  <div className={`h-full p-6`}></div>
                </div>
                <div className=" lg:w-[85%] h-full p-4 justify-center items-center flex">
                  <img
                    src={product.productImage || defaultImg}
                    alt=""
                    className="lg:size-full md:max-h-96 md:max-w-96 hover:shadow-rounded-sm  hover:scale-[1.008]"
                  />
                </div>
              </div>
              <div className={`lg:ml-[4.7rem] flex gap-2 p-4`}>
                <button className=" w-3/6 py-2 px-4 text-sm text-white theme_btn font-semibold">
                  ADD TO CART
                </button>
                <button className="w-3/6 py-2 px-4 text-white text-sm theme_btn font-semibold">
                  BUY NOW
                </button>
              </div>
            </div>

            {/* right */}
            <div
              className={`theme_container theme_text w-full lg:w-[62.3%] px-8`}
            >
              <div className="text-lg w-full"> {product.productName}</div>
              <div className="text-[12px] flex gap-4 py-2 text-gray-400 font-semibold">
                <p className="bg-green-600 text-white w-[3rem] rounded-sm px-4  flex gap-2 justify-center items-center">
                  4.2
                  <i className="fa fa-star " aria-hidden="true"></i>
                </p>
                <p className="text-sm">37,446 Ratings & 1,758 Reviews</p>
              </div>
              <div className="text-sm font-semibold text-green-600">
                Extra {formatPrice(extra5pcent)} off
              </div>
              <div className=" flex gap-4 items-center">
                <span className="text-3xl font-bold ">
                  ₹{product.productPrice}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  {formatPrice(off30pcent)}
                </span>
                <span className="text-xl font-semibold text-green-600">
                  30% off
                </span>
              </div>
              <div className="mt-4 gap-2 flex-col flex">
                <span className="text-md font-bold ">Available offers</span>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Bank Offer</span> Get ₹50
                  Instant Discount on first Flipkart UPI transaction on order of
                  ₹200 and above{" "}
                  <span className="theme_color font-semibold">T&C</span>
                </div>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Bank Offer</span> 5% Cashback
                  on Flipkart Axis Bank Card
                  <span className="theme_color font-semibold"> T&C</span>
                </div>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Special Price</span> Get extra
                  ₹5500 off (price inclusive of cashback/coupon)
                  <span className="theme_color font-semibold"> T&C</span>
                </div>
                <div className="text-sm">
                  <i
                    className="fa fa-tag text-green-600 mr-2"
                    aria-hidden="true"
                  ></i>
                  <span className="font-semibold">Partner Offer</span> Sign-up
                  for Flipkart Pay Later & get free Times Prime Benefits worth
                  ₹20,000*
                  <span className="theme_color font-semibold"> T&C</span>
                </div>
              </div>
              <div className="w-full mt-4 flex flex-col">
                <span className="font-bold text-md">Seller</span>
                {product.seller}
              </div>
              <div className="w-full mt-4 flex flex-col">
                <span className="font-bold text-md">Description</span>
                {product.productDescription}
              </div>
              <div className="w-full mt-4 flex flex-col">
                <span className="font-bold text-md">Specification</span>
                Dhanlaxmi Kirana Certified 128 GB) 4.3(8,308) ₹10,685₹13,99923%
                off REDMI 12 (Pastel Blue, 128 GB) 4.2(48,166) ₹9,999₹15,99937%
                off REDMI 12 5G (Moonstone Silver, 128 GB) 4.3(9,446)
                ₹11,999₹15,99925% off REDMI 12 5G (Jade Black, 256 GB)
                4.2(19,788) ₹13,999₹19,99930% off vivo T3x 5G (Crimson Bliss,
                128 GB) 4.5(8,323) ₹13,499₹17,49922% off Bought together Selfie
                Sticks All Categories Screen Guards Mobile Skin Stickers Plain
                Cases & Covers Designer Cases & Covers Power Banks Hold up
                Wireless R1 Bluetooth Selfie Stick 4(59,922) ₹199₹99980% off
                Recently ViewedVIEW ALL REDMI 12 5G (Pastel Blue, 128 GB)
                4.2(37,446) ₹12,499₹17,99930% off POCO M6 Pro 5G (Power Black,
                128 GB) 4.2(1,05,403) ₹9,999₹16,99941% off Crompton
                ACGM-DS500W3J BLK 500 W Mixer Grinder (3 Jars, Black & G...
                4.2(2,836) ₹1,799₹3,50048% off Top Stories:Brand Directory MOST
                SEARCHED IN MOBILES & ACCESSORIES:HTC DESIRE 616 REVIEWCANVAS
                PLAYAMAZON MOBILE COVERSPOWER BANKSLAVA MOBILESLENOVO MOBILE
                WITH PRICEMI SMART PHONENOKIA MOBSAMSUNG ANDROID MOBILE PRICE IN
                INDIASMARTPHONE PRICEASHA 501PANASONIC ELUGA I PRICESAMSUNG
                GALAXY A3 PRICE IN INDIASAMSUNG NEO PLUSJ2 SAMSUNG PRICESAMSUNG
                S DUOS 3 PRICE IN INDIASAMSUNG GALAXY S4 PRICESAMSUNG GALAXY S5
                PRICEGALAXY S6 PRICE IN INDIASAMSUNG E1282SONY XPERIA Z1 COMPACT
                PRICEVIDEOCONMI MOBILE PRICEMOTO X PLAY 32GBOPPO F3+ PRICEXIAOMI
                REDMI NOTESAMSUNG GALAXY JBUY SWIPE ELITE MAX ABOUT Contact Us
                About Us Careers Flipkart Stories Press Corporate Information
                GROUP COMPANIES Myntra Cleartrip Shopsy HELP Payments Shipping
                Cancellation & Returns FAQ Report Infringement CONSUMER POLICY
                Cancellation & Returns Terms Of Use Security Privacy Sitemap
                Grievance Redressal EPR Compliance Mail Us: Flipkart Internet
                Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech
                Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru,
                560103, Karnataka, India Social Registered Office Address:
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
                Village, Bengaluru, 560103, Karnataka, India CIN :
                U51109KA2012PTC066107 Telephone: 044-45614700 / 044-67415800
                Become a Seller Advertise Gift Cards Help Center © 2007-2024
                Flipkart.com Price details Maximum Retail Price (incl. of all
                taxes) ₹ 17999.00 Selling Price ₹ 17999.00 Special Price ₹
                12499.00
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-[100vh] justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
