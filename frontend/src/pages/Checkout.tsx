import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import axios from "axios";
import { siteURL } from "../static/Data";
import { initialUserState } from "../static/initialStates";
import { MdDone } from "react-icons/md";
import axisSvg from "../assets/axis-78501b36.svg";
import { Link } from "react-router-dom";
import { GoLinkExternal } from "react-icons/go";
import ErrorModal from "../components/ErrorModal"; // Import your ErrorModal component
import FinalPage from "./FinalPage";

const Checkout = () => {
  const { order } = useSelector((state: any) => state.products);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(initialUserState);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false); // State to control modal visibility
  const [showFinalPage, setShowFinalPage] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${siteURL}/users/details/${userId}`)
      .then((response: any) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handlePlaceOrder = async () => {
    try {
      await axios
        .post(`${siteURL}/users/orders/${userId}`, order)
        .then(() => setShowFinalPage(true))
        .catch((error) => {
          setError(error.response.data.message);
          setShowErrorModal(true);
        });
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
        setShowErrorModal(true); // Show error modal
      } else {
        setError("Something went wrong. Please try again later.");
        setShowErrorModal(true); // Show error modal
      }
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false); // Close error modal
    setError(""); // Clear error message
  };

  return (
    <>
      {" "}
      {showFinalPage ? (
        <FinalPage />
      ) : (
        <div className="theme theme_text w-full min-h-[100vh] lg:min-h-[calc(100vh-3.5rem)] gap-4 flex flex-col md:flex-row py-6 px-[5px] md:px-6 lg:px-28">
          {/* left */}
          <div className="flex flex-col gap-4 md:w-7/12 lg:w-2/3 ">
            {/* 1 */}
            <div className="theme_container shadow-sm w-full flex flex-col p-4">
              <div className=" flex items-center font-semibold pb-2">
                <span className="theme_color p-[2px] theme px-2 rounded-sm text-xs">
                  1
                </span>
                <span className="pl-4 text-md text-gray-500">LOGIN</span>
                <span className="pl-2 theme_color">
                  <MdDone />
                </span>
              </div>{" "}
              {loading ? (
                <div className="flex justify-center items-center text-red-500">
                  <Loading width={20} height={20} />
                </div>
              ) : (
                <div className="theme_text pl-[38px] text-sm font-semibold">
                  {user.name}
                  {user.mobile ? `, ${user.mobile}` : ""}
                </div>
              )}
            </div>
            {/* 2 */}
            <div className="theme_container shadow-sm w-full flex flex-col p-4">
              <div className=" flex items-center font-semibold pb-2">
                <span className="theme_color p-[2px] theme px-2 rounded-sm text-xs">
                  2
                </span>
                <span className="pl-4 text-md text-gray-500">
                  DELIVERY ADDRESS
                </span>
                <span className="pl-2 theme_color">
                  <MdDone />
                </span>
              </div>
              {loading ? (
                <div className="flex h-[8vh] justify-center items-center text-red-500">
                  <Loading width={20} height={20} />
                </div>
              ) : user.addressData[0] ? (
                <div className="theme_text pl-[38px] text-sm ">
                  <span>
                    <span className="font-semibold">
                      {user.addressData[0].name}
                    </span>
                    , {user.addressData[0].address},{" "}
                    <span className="font-semibold">
                      {user.addressData[0].pincode}
                    </span>
                  </span>
                  <p className="text-xs text-gray-400 pt-1">
                    {user.addressData[0].city}, {user.addressData[0].state}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 items-center justify-center">
                  <span className="text-red-500">
                    {" "}
                    Please add delivery address to continue{" "}
                  </span>
                  <Link
                    to={"/myprofile"}
                    className="flex justify-center gap-1 items-center text-blue-500"
                  >
                    Add Address
                    <GoLinkExternal size={12} className="" />
                  </Link>
                </div>
              )}
            </div>
            {/* 3 */}
            <div className="theme_container shadow-sm w-full flex flex-col p-4">
              <div className=" flex items-center font-semibold pb-2">
                <span className="theme_color p-[2px] theme px-2 rounded-sm text-xs">
                  3
                </span>
                <span className="pl-4 text-md text-gray-500">
                  ORDER SUMMARY
                </span>
                <span className="pl-2 theme_color">
                  <MdDone />
                </span>
              </div>
              {loading ? (
                <div className="flex h-[11vh] justify-center items-center text-red-500">
                  <Loading width={20} height={20} />
                </div>
              ) : (
                <div className="theme_text flex-row gap-4 flex pl-[38px] text-sm font-semibold">
                  <img
                    src={order.orderImage}
                    alt=""
                    className="w-20 h-20 p-1 border theme_border rounded-sm"
                  />

                  <div className="flex flex-col gap-2 w-full ">
                    <div className="flex items-center justify-between">
                      <h3 className="block md:hidden">
                        {order.orderName?.substring(0, 20)}
                      </h3>
                      <span className="hidden md:block">{order.orderName}</span>
                      <span className="pr-4">
                        Delivery In 2 days |{" "}
                        <span className="text-green-600">Free</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{order.totalPrice}</span>
                      <span className="text-gray-600 line-through">
                        {order.price30Percent}
                      </span>
                      <span className="text-green-600">{order.savedPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 4 */}
            <div className="theme_container shadow-sm w-full flex flex-col p-4">
              <div className=" flex items-center font-semibold pb-2">
                <span className="theme_color p-[2px] theme px-2 rounded-sm text-xs">
                  4
                </span>
                <span className="pl-4 text-md text-gray-500">
                  PAYMENT OPTIONS
                </span>
                <span className="pl-2 theme_color">
                  <MdDone />
                </span>
              </div>
              {loading ? (
                <div className="flex h-[8vh] justify-center items-center text-red-500">
                  <Loading width={20} height={20} />
                </div>
              ) : (
                <div className="theme_text flex-row items-center gap-4 flex pt-2 pl-[38px] text-sm font-semibold">
                  <input type="radio" defaultChecked={true} />
                  <img
                    src={axisSvg}
                    alt=""
                    className="w-10 h-10 shadow-sm border rounded-sm theme_border p-1"
                  />

                  <div className="flex flex-col gap-2 w-full ">
                    <div className="flex items-center gap-2">
                      <span>Zencart Axis Bank Credit Card</span>
                      <span className="pr-4 text-gray-400">
                        xxxx xxxx xxxx 0000
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="space-x-2">
                        <input
                          type="text"
                          value={123}
                          disabled={true}
                          className="py-2 px-6 rounded-sm theme_border border w-20"
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 5 */}
            <div className="hidden w-full md:flex items-center justify-end">
              {" "}
              <button
                title="ADD TO CART"
                className={`${
                  user.addressData[0] ? "bg-orange-500 " : "bg-gray-400"
                } py-3 px-12  text-white font-semibold`}
                disabled={user.addressData[0] ? false : true}
                onClick={handlePlaceOrder}
              >
                PLACE ORDER
              </button>{" "}
            </div>
          </div>
          {/* right */}
          <div className=" md:w-5/12 lg:w-1/3 h-fit text-md theme_container shadow-sm rounded-sm flex flex-col">
            {loading ? (
              <div className="flex h-[38vh] justify-center p-4  items-center text-red-500">
                <Loading width={20} height={20} />
              </div>
            ) : (
              <>
                {" "}
                <h1 className="text-gray-500 font-semibold theme_border p-4 border-b-[1px]">
                  PRICE DETAILS
                </h1>
                <div className="space-y-4 p-4">
                  <div className="flex justify-between items-center">
                    <h3>MRP </h3>
                    <h3 className="font-semibold">{order.totalPrice}</h3>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3>Delivery Fee </h3>
                    <h3 className="text-green-600 font-semibold">Free</h3>
                  </div>
                </div>
                <div className="flex justify-between border-dashed theme_border border-y-[1px] p-4 items-center">
                  <h3 className="theme_text font-bold text-lg">
                    Total Payable
                  </h3>
                  <h3 className=" font-bold">{order.totalPrice}</h3>
                </div>
                <span className="p-4 text-green-600 font-semibold">
                  You will save {order.savedPrice} on this order
                </span>
              </>
            )}
          </div>

          {/* 5 hidden on sm */}
          <div className="flex w-full md:hidden items-center justify-end">
            {" "}
            <button
              title="ADD TO CART"
              className={`${
                user.addressData[0] ? "bg-orange-500 " : "bg-gray-400"
              } py-3 px-12  text-white font-semibold`}
              disabled={user.addressData[0] ? false : true}
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          </div>

          {/* Error Modal */}
          {showErrorModal && (
            <ErrorModal message={error} onClose={closeErrorModal} />
          )}
        </div>
      )}
    </>
  );
};

export default Checkout;
