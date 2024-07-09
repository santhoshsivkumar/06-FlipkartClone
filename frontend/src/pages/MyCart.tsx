import axios from "axios";
import { useEffect, useState } from "react";
import { siteURL } from "../static/Data";
import { find30percent, formatPrice } from "../static/Functions";
import { initialAddressState } from "../static/initialStates";
import { BiMinus, BiPlus } from "react-icons/bi";
import Loading from "../components/Loading";

const MyCart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState(initialAddressState);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${siteURL}/users/details/${userId}`)
      .then((response: any) => {
        console.log(response.data.cart);
        setCartItems(response.data.cart);
        setAddress(response.data.addressData[0]);
        setTotalPrice(calculateTotalPrice(response.data.cart));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handlePlusBtn = async (e: any, product: any) => {
    e.preventDefault();
    setLoadingStates((prev) => ({ ...prev, [product.productId]: true }));
    try {
      const response = await axios.post(
        `${siteURL}/cart/${userId}/add`,
        product
      );
      setCartItems(response.data);
      setTotalPrice(calculateTotalPrice(response.data));
      setLoadingStates((prev) => ({ ...prev, [product.productId]: false }));
    } catch (error) {
      console.log(error);
      setLoadingStates((prev) => ({ ...prev, [product.productId]: false }));
    }
  };

  const handleMinusBtn = async (e: any, product: any) => {
    e.preventDefault();
    setLoadingStates((prev) => ({ ...prev, [product.productId]: true }));
    try {
      const response = await axios.post(
        `${siteURL}/cart/${userId}/remove`,
        product
      );
      setCartItems(response.data);
      setTotalPrice(calculateTotalPrice(response.data));
      setLoadingStates((prev) => ({ ...prev, [product.productId]: false }));
    } catch (error) {
      console.log(error);
      setLoadingStates((prev) => ({ ...prev, [product.productId]: false }));
    }
  };
  return (
    <>
      <div className="theme theme_text w-full lg:h-[calc(100vh-3.5rem)] gap-4 flex flex-col md:flex-row py-6 px-6 lg:px-28">
        {/* left */}
        <div className="flex flex-col gap-4 md:w-7/12 lg:w-2/3 ">
          <div className="theme_container shadow-sm theme_color flex justify-center items-center p-4">
            {" "}
            Zencart {`(${cartItems.length})`}
          </div>
          <div className="theme_container text-sm theme_text justify-between p-2 ">
            <div className="p-2">
              <div className="flex gap-2 font-semibold items-center">
                <span>Deliver to:</span>
                <span>{address.name},</span>
                <span>{address.pincode}</span>
                <span className="font-semibold text-xs text-white theme_bg rounded-sm p-1 h-fit w-fit">
                  {address.addressType ? address.addressType : "HOME"}
                </span>
              </div>
              <p className="py-2 text-xs">{address.address}</p>
              <p className="text-xs">
                {address.city}, {address.state}
              </p>
            </div>
          </div>
          <div className="theme_container relative min-h-[calc(100vh-17.5rem)]">
            <div className="h-[85%] md:overflow-y-auto">
              {cartItems.length ? (
                cartItems.map((product: any) => {
                  const loading = loadingStates[product.productId] || false;
                  return (
                    <div
                      key={product?.productId}
                      className="border-b-[1px] flex flex-col lg:flex-row gap-4 p-4 theme_border lg:items-center justify-between "
                    >
                      <div className="flex  gap-4 ">
                        <img
                          src={product?.productImage}
                          className="w-15 h-20"
                        />
                        <div className=" flex flex-col gap-3">
                          <span className="text-md">
                            {product?.productName}
                          </span>
                          <div className="text-sm flex gap-4">
                            <span>
                              {formatPrice(
                                product?.quantity * product?.productPrice
                              )}
                            </span>
                            <span className="font-semibold line-through text-gray-400">
                              {" "}
                              {formatPrice(
                                product.productPrice +
                                  find30percent(product.productPrice)
                              )}{" "}
                            </span>
                            <span className="font-semibold text-green-600">
                              {formatPrice(
                                find30percent(product?.productPrice)
                              )}{" "}
                              off
                            </span>
                            <span className="bg-green-600 text-white w-fit rounded-sm px-[2px] flex gap-2 justify-center items-center">
                              1 offer
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border-[1px] h-fit w-fit  rounded-md theme_border flex">
                        <button
                          title="Decrease by 1"
                          type="button"
                          className="px-4 py-2 theme_color theme_border border-r-[1px]"
                          onClick={(e) => handleMinusBtn(e, product)}
                          disabled={loading ? true : false}
                        >
                          <BiMinus />
                        </button>
                        <span className="px-4 py-2 theme_text w-10 h-10">
                          {loading ? (
                            <Loading width={20} height={20} color="red" />
                          ) : (
                            product?.quantity
                          )}
                        </span>
                        <button
                          type="button"
                          title="Increase by 1"
                          className="px-4 py-2 theme_color theme_border border-l-[1px]"
                          disabled={loading ? true : false}
                          onClick={(e) => handlePlusBtn(e, product)}
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-full justify-center items-center">
                  {loading ? <Loading /> : "No items in your cart"}
                </div>
              )}
            </div>
            <div className="theme_container theme_border border-[1px] pr-4 h-[15%] hidden bottom-0 absolute w-full md:flex items-center justify-end shadow-sm ">
              {" "}
              <button
                title="ADD TO CART"
                className={`bg-orange-400 py-2 px-4  text-white font-semibold`}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
        {/* right */}
        <div className=" md:w-5/12 lg:w-1/3 h-fit text-md theme_container shadow-sm rounded-sm flex flex-col">
          {loading ? (
            <div className="flex justify-center p-4 lg:h-[42vh] items-center">
              <Loading width={30} height={30} />
            </div>
          ) : (
            <>
              {" "}
              <h1 className="text-gray-500 font-semibold theme_border p-4 border-b-[1px]">
                PRICE DETAILS
              </h1>
              <div className="space-y-4 p-4">
                <div className="flex justify-between items-center">
                  <h3>MRP {`(${cartItems.length}  items)`}</h3>
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
                You will save {formatPrice(find30percent(totalPrice))} on this
                order
              </span>
            </>
          )}
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
