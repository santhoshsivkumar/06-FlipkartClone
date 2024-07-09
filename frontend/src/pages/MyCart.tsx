import axios from "axios";
import { useEffect, useState } from "react";
import { siteURL } from "../static/Data";
import { find30percent, formatPrice } from "../static/Functions";
import { initialAddressState } from "../static/initialStates";
import { BiMinus, BiPlus } from "react-icons/bi";

const MyCart = () => {
  const userId = localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState(initialAddressState);
  useEffect(() => {
    axios
      .get(`${siteURL}/users/details/${userId}`)
      .then((response: any) => {
        console.log(response.data);
        setProducts(response.data.cart);
        setAddress(response.data.addressData[0]);
        setTotalPrice(calculateTotalPrice(response.data.cart));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="theme theme_text w-full min-h-[calc(100vh-3.5rem)] gap-4 flex py-6 px-6 lg:px-28">
        <div className="flex flex-col gap-4 w-3/5  lg:w-2/3 ">
          <div className="theme_container shadow-sm theme_color flex justify-center items-center p-4">
            {" "}
            Zencart {`(${products.length})`}
          </div>
          <div className="theme_container text-sm theme_text justify-between p-2 ">
            <div className="p-2">
              <p className="flex gap-2 font-semibold items-center">
                <span>Deliver to:</span>
                <span>{address.name},</span>
                <span>{address.pincode}</span>
                <p className="font-semibold text-xs theme_bg rounded-sm p-1 h-fit w-fit">
                  {address.addressType ? address.addressType : "HOME"}
                </p>
              </p>
              <p className="py-2 text-xs">{address.address}</p>
              <p className="text-xs">
                {address.city}, {address.state}
              </p>
            </div>
          </div>
          <div className="theme_container p-2">
            {products.map((product: any) => {
              return (
                <div
                  key={product.productId}
                  className="border-b-[1px] flex gap-4 p-4 theme_border items-center justify-between "
                >
                  <div className="flex  gap-4 ">
                    <img src={product.productImage} className="w-15 h-20" />
                    <p className=" flex flex-col gap-3">
                      <p className="text-md">{product.productName}</p>
                      <p className="text-sm flex gap-4">
                        <span>
                          {formatPrice(product.quantity * product.productPrice)}
                        </span>
                        <span className="font-semibold">₹30 Off</span>
                        <span>{find30percent(product.productPrice)} off</span>
                        <p className="bg-green-600 text-white w-fit rounded-sm px-[2px] flex gap-2 justify-center items-center">
                          1 offer
                        </p>
                      </p>
                    </p>
                  </div>
                  <div className="border-[1px] rounded-md theme_border flex">
                    <button className="px-4 py-2 theme_color theme_border border-r-[1px]">
                      <BiMinus />
                    </button>
                    <span className="px-4 py-2 theme_text">
                      {product.quantity}
                    </span>
                    <button className="px-4 py-2 theme_color theme_border border-l-[1px] ">
                      <BiPlus />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-2/5 lg:w-1/3 h-fit text-md theme_container shadow-sm rounded-sm flex flex-col">
          <h1 className="text-gray-500 font-semibold theme_border p-4 border-b-[1px]">
            PRICE DETAILS
          </h1>
          <div className="space-y-4 p-4">
            <div className="flex justify-between items-center">
              <h3>MRP {`(${products.length}  items)`}</h3>
              <h3 className="font-semibold">{formatPrice(totalPrice)}</h3>
            </div>
            <div className="flex justify-between items-center">
              <h3>Product Discount</h3>
              <h3 className="text-green-600 font-semibold">
                -{formatPrice(find30percent(totalPrice))}
              </h3>
            </div>
            <div className="flex justify-between items-center">
              <h3>Delivery Fee </h3>
              <h3 className="text-green-600 font-semibold">Free</h3>
            </div>
          </div>
          <div className="flex justify-between border-dashed theme_border border-y-[1px] p-4 items-center">
            <h3 className="theme_text font-bold text-lg">Total Amount</h3>
            <h3 className=" font-bold">
              {formatPrice(totalPrice - find30percent(totalPrice))}
            </h3>
          </div>
          <span className="p-4 text-green-600 font-semibold">
            You will save {formatPrice(find30percent(totalPrice))} on this order
          </span>
        </div>
        <div>
          {" "}
          <button
            title="ADD TO CART"
            className={`bg-orange-400 py-2 px-4 text-sm text-white flex justify-center gap-2 items-center font-semibold`}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </>
  );
};

export default MyCart;

const calculateTotalPrice = (items: any) => {
  return items.reduce((total: any, item: any) => {
    // Calculate total price per item (assuming price is fetched from backend)
    const itemPrice = item.quantity * item.productPrice; // Adjust as per your data structure
    return total + itemPrice;
  }, 0);
};
