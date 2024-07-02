import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setDarkMode } from "../slices/productSlice";

const Navbar = ({ handleShowLogin }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: any) => state.products);
  return (
    <>
      <nav className="h-16 flex fixed top-0 left-0 w-full p-2 items-center text-white bg-red-600 font-semibold scale-[1.019] z-60">
        <a href="/" className="w-3/12 text-right text-lg cursor-pointer ">
          ECommerce
        </a>
        <div className="flex gap-4 pl-4 w-6/12 justify-between items-center ">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className={`${
              darkMode
                ? "bg-[#000] hover:bg-[#212121]"
                : "bg-[white] hover:bg-gray-300"
            } w-[100%] py-2 px-4 text-red-600 outline-none rounded-sm`}
          />
          <button
            onClick={() => {
              navigate("/");
              handleShowLogin(true);
            }}
            className={`${
              darkMode
                ? "bg-[#2d2d2d] hover:bg-[#212121]"
                : "bg-[white] hover:bg-gray-300"
            } text-red-600 h-9 py-1 px-4 rounded-sm`}
          >
            Login
          </button>
        </div>
        <div className="w-3/12 text-sm text-red-600 flex gap-4 justify-end pr-4 items-center font-semibold">
          <a
            className={`${
              darkMode
                ? "bg-[#2d2d2d] hover:bg-[#212121]"
                : "bg-[white] hover:bg-gray-300"
            } py-2 cursor-pointer px-4 rounded-sm `}
          >
            MyCart{" "}
          </a>
          <Link
            className={`${
              darkMode
                ? "bg-[#2d2d2d] hover:bg-[#212121]"
                : "bg-[white] hover:bg-gray-300"
            } py-2 cursor-pointer hidden lg:block px-4 rounded-sm `}
            to={"/admin view"}
          >
            Admin View{" "}
          </Link>
          <a
            className={`${
              darkMode
                ? "bg-[#2d2d2d]  hover:bg-[#212121]"
                : "bg-[white] hover:bg-gray-300"
            } py-1 text-red-600 cursor-pointer px-4 rounded-3xl hidden lg:block `}
            onClick={() => dispatch(setDarkMode())}
          >
            {!darkMode ? (
              <i className="fa fa-toggle-off" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-toggle-on" aria-hidden="true"></i>
            )}
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
