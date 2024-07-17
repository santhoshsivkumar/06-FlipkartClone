import axios from "axios";
import { useEffect, useState } from "react";
import { siteURL } from "../../static/Data";
import { initialOrderState } from "../../static/initialStates";
import Loading from "../Loading";
import FilterBar from "../FilterBar";
import { BiSearch } from "react-icons/bi";
import { formatRelativeTime } from "../../static/Functions";

const MyOrders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([initialOrderState]);
  const [filteredOrders, setFilteredOrders] = useState([initialOrderState]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${siteURL}/users/details/${userId}`)
      .then((response: any) => {
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
        if (!response.data.orders.length) {
          setError("No order placed yet");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [userId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter((order) =>
      order.orderName.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="theme w-full theme_text min-h-[100vh]">
      <FilterBar />
      <div className="flex min-h-[88vh] h-full w-full gap-4 p-0 md:p-4 md:pt-8">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden`}
          onClick={toggleSidebar}
        ></div>
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-y-0 left-0 h-full md:h-fit theme_container w-64 z-30 md:flex md:relative md:w-3/12 lg:w-[20%] gap-1 flex-col shadow-md`}
        >
          <h3 className="font-semibold mb-2 px-4 py-2 text-2xl border-b-[1px] theme_border">
            Filters
          </h3>
          <div className="p-4 pt-0">
            <div className="mb-4 text-md space-y-2">
              <h3 className="font-semibold mb-2 text-md theme_color">
                ORDER STATUS
              </h3>
              <div className="pl-2 space-y-2">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> On the way
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Delivered
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Cancelled
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Returned
                </label>
              </div>
            </div>
            <div className="mb-4 text-md space-y-2">
              <h3 className="font-semibold mb-2 text-md theme_color">
                ORDER TIME
              </h3>
              <div className="pl-2 space-y-2">
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Last 30 days
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> 2023
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> 2022
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> 2021
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> 2020
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Older
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex z-5 absolute pl-1 rounded-r-2xl md:hidden justify-end">
          <button onClick={toggleSidebar}>
            <i
              className="fa fa-chevron-right mt-2 theme_color nav_btn p-2 theme_border border-2 cursor-pointer rounded-2xl"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <div className="lg:w-[80.8%] items-center md:items-start w-full md:w-9/12 md:relative flex flex-col gap-4 p-4 md:p-0 pt-12 md:pt-0">
          <div className="hover:scale-[1.009] flex h-10 justify-between hover:shadow-md rounded-l-[5px] w-[90%]">
            <input
              type="text"
              placeholder="search your orders here"
              className="px-4 py-2 outline-none theme_container border-[1px] theme_border w-full flex-1 theme_text rounded-l-[5px]"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="flex px-4 gap-2 theme_bg items-center text-white rounded-r-[5px]">
              <BiSearch />
              Search orders
            </button>
          </div>
          {loading ? (
            <div className="flex h-full justify-center p-4 w-full items-center text-red-500">
              <Loading width={40} height={40} />
            </div>
          ) : error ? (
            <div className="theme_container items-center justify-center text-red-500 flex gap-8 rounded-[5px] p-4 h-28 w-full border-[1px] theme_border">
              {error}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                //@ts-ignore
                key={order._id}
                className="hover:scale-[1.004] hover:shadow-sm theme_container flex gap-6 rounded-[5px] p-4 h-28 w-full border-[1px] theme_border"
              >
                <div className="w-2/12 lg:w-1/12">
                  <img src={order.orderImage} alt="" className="size-20" />
                </div>
                <div className="w-10/12 lg:w-11/12 flex flex-col md:flex-row gap-0 md:gap-4 justify-between pr-0 lg:pr-4">
                  <div className="flex w-[20rem] flex-col gap-1">
                    <h3 className="hidden md:block font-semibold text-sm">
                      Orders {order.orderName}
                    </h3>
                    <h3 className="md:hidden block font-semibold text-xs">
                      Orders{" "}
                      {order?.orderName.length > 30
                        ? order.orderName.substring(0, 20) + "..."
                        : order.orderName}
                    </h3>
                    <p className="text-[12px] text-gray-500 font-semibold">
                      Delivered
                    </p>
                  </div>
                  <div className="flex justify-start">
                    <h3 className="font-semibold hidden md:block text-sm">
                      {order.totalPrice}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-600 text-[10px] md:text-sm">
                      Delivered on{" "}
                      {order.updatedAt && formatRelativeTime(order.updatedAt)}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
