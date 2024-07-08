import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  MdDarkMode,
  MdLightMode,
  MdLogin,
  MdShoppingCart,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLockOpen } from "react-icons/bi";

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleOnChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <nav className="nav h-[3.5rem] z-20 shadow-sm justify-around flex fixed gap-4 top-0 w-full py-2 px-4 items-center font-semibold">
        <a
          href="/"
          className="absolute  bg-re pl-4 lg:pl-[17.5rem] left-0 text-right text-lg cursor-pointer text-white"
        >
          Zencart
        </a>
        <div className="absolute lg:w-[50%] lg:left-[400px] w-[55%] left-[115px] items-center">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className={`theme_search py-2 px-4 w-[80%] outline-none rounded-sm`}
          />
        </div>
        <div className=" absolute right-0 text-sm flex gap-2 justify-end px-4 items-center font-semibold">
          {isAuthenticated ? (
            <>
              <Link
                className={`nav_btn p-2 theme_border flex items-center gap-2 border-2 cursor-pointer  md:rounded-md rounded-3xl`}
                to={"/myprofile"}
              >
                <CgProfile />
                <span className="hidden lg:block "> Account</span>
              </Link>
              <Link
                className={`nav_btn p-2 theme_border flex items-center gap-2 border-2 cursor-pointer md:rounded-md rounded-3xl `}
                to={"/admin view"}
              >
                <BiLockOpen />
                <span className="hidden lg:block "> Admin</span>
              </Link>
              <Link
                to={"/mycart"}
                className={`nav_btn p-2 theme_border flex items-center gap-2 border-2 cursor-pointer  md:rounded-md rounded-3xl `}
              >
                <MdShoppingCart />
                <span className="hidden lg:block ">MyCart</span>
              </Link>
            </>
          ) : (
            <Link
              className={`nav_btn p-2 theme_border border-2 cursor-pointer  md:rounded-md rounded-3xl `}
              to={"/login"}
            >
              <MdLogin />
              <span className="hidden lg:block "> Login</span>
            </Link>
          )}
          <button
            className={`nav_btn p-2 theme_border border-2 cursor-pointer rounded-3xl `}
            onClick={handleOnChange}
          >
            {theme !== "dark" ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <button className="nav_btn px-2 rounded-sm py-2">
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
