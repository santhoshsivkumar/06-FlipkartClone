import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ handleShowLogin }: any) => {
  const [input, setInput] = useState({
    mobile: "",
    password: "",
  });
  const { darkMode } = useSelector((state: any) => state.products);
  const navigate = useNavigate();
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    navigate("/products/create");
  };
  return (
    <>
      <div
        className={`bg-black bg-opacity-75 z-50 w-full min-h-[91.5vh] mt-16 opacity-1 gap-2 flex flex-col items-center justify-center absolute`}
      >
        <div
          className="text-red-600 w-[65%] text-right"
          onClick={() => handleShowLogin(false)}
        >
          <i
            className={`${
              darkMode
                ? "bg-[#2d2d2d] hover:bg-[#212121]"
                : "bg-[white] hover:bg-gray-300"
            } fas fa-times cursor-pointer py-[10px] px-[12px] rounded-full`}
          ></i>
        </div>
        <div
          className={`${
            darkMode ? "bg-[#2d2d2d]" : "bg-[white]"
          } flex shadow-lg rounded-sm w-[60%] h-[80%] min-h-[70vh] `}
        >
          <div
            className={`${
              darkMode ? "bg-[#1d57b4]" : "bg-[#2774f1]"
            } w-[40%]  space-y-4 rounded-sm p-8`}
          >
            <h1 className="text-3xl font-bold  text-white">Login</h1>
            <p className="text-lg text-gray-300">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="w-[60%] flex flex-col  items-center gap-4">
            <form
              onSubmit={handleOnSubmit}
              className="w-full h-full gap-4 flex flex-col items-center px-8 pt-14"
            >
              <input
                type="text"
                name="mobile"
                value={input.mobile}
                placeholder="Enter Email / Mobile number"
                className="w-full py-2 px-4 outline-none border-b-[1px] border-gray-500"
                onChange={(e) => setInput({ ...input, mobile: e.target.value })}
              />{" "}
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
                className="w-full py-2 px-4 outline-none border-b-[1px] border-gray-500"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-green-500 hover:bg-blue-700"
              >
                Login
              </button>
            </form>
            <div className="flex flex-col w-full  text-md font-semibold items-center gap-4 p-4">
              <p className="text-blue-600">New to Site? Create new account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
