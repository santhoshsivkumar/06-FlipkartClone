import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import {
  MdDarkMode,
  MdLightMode,
  MdLogin,
  MdShoppingCart,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLockOpen } from "react-icons/bi";
import axios from "axios";
import { siteURL } from "../../static/Data";

const Navbar = () => {
  const isAuthenticated =
    !!localStorage.getItem("token") && !!localStorage.getItem("userId");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleOnChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    setError("");
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `${siteURL}/products/suggestions?query=${searchTerm}`,
          { signal }
        );
        if (response.data.length) setSuggestions(response.data);
        else setError("No items found");
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching product suggestions", error);
        }
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 10);

    return () => {
      clearTimeout(debounceFetch);
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <>
      <nav className="nav h-[3.5rem] z-[5] md:z-50 shadow-sm justify-between flex fixed gap-4 top-0 w-full py-2 px-4 items-center font-semibold theme_bg">
        <div
          className={`${
            isAuthenticated ? "justify-end" : "justify-center"
          } flex-grow flex  md:pr-6 items-center gap-6`}
        >
          <a href="/" className="text-xl md:text-2xl cursor-pointer text-white">
            Flipkart
          </a>
          <div className="relative w-full max-w-[40rem]">
            <input
              type="search"
              name="search"
              placeholder="Search for products, brands and more"
              className="theme_searchDiv shadow-3xl theme_text font-normal py-2 px-4 w-full outline-none rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              className={`${
                suggestions?.length > 0 ? "block" : "hidden"
              }  absolute top-full left-0 right-0 border theme_border theme_container shadow-lg z-10`}
            >
              {suggestions?.length > 0
                ? suggestions?.map((product: any, index: number) => (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      className="px-4 py-2 theme_searchDiv flex items-center gap-4"
                      onClick={() => {
                        setSuggestions([]);
                        setSearchTerm("");
                      }}
                    >
                      <img
                        src={product.productImage}
                        alt="Product Preview"
                        className=""
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                      <div className="flex flex-col">
                        {" "}
                        <span className="text-xs theme_text">
                          {product.productName}
                        </span>
                        {index === 0 || index === 1 ? (
                          <span className="text-xs theme_color">
                            in {product.category}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </Link>
                  ))
                : error && (
                    <span className="flex items-center justify-center p-2 text-sm text-red-600">
                      No items found
                    </span>
                  )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                className={`nav_btn p-2 theme_border md:flex items-center gap-2 border-2 cursor-pointer rounded-md hidden sm:flex ${
                  location.pathname === "/myprofile" ? "active-link" : ""
                }`}
                to={"/myprofile"}
              >
                <CgProfile />
                <span className="hidden lg:block">Account</span>
              </Link>
              <Link
                className={`nav_btn p-2 theme_border md:flex items-center gap-2 border-2 cursor-pointer rounded-md hidden sm:flex ${
                  location.pathname === "/admin" ? "active-link" : ""
                }`}
                to={"/admin"}
              >
                <BiLockOpen />
                <span className="hidden lg:block">Admin</span>
              </Link>
              <Link
                className={`nav_btn p-2 theme_border md:flex items-center gap-2 border-2 cursor-pointer rounded-md ${
                  location.pathname === "/mycart" ? "active-link" : ""
                }`}
                to={"/mycart"}
              >
                <MdShoppingCart />
                <span className="hidden lg:block">MyCart</span>
              </Link>
            </>
          ) : (
            <Link
              className={`nav_btn p-2 theme_border md:flex items-center gap-2 border-2 cursor-pointer rounded-md hidden sm:flex ${
                location.pathname === "/login" ? "active-link" : ""
              }`}
              to={"/login"}
            >
              <CgProfile />
              <span className="hidden lg:block">Login</span>
            </Link>
          )}
          <button
            title="Switch Theme"
            className="nav_btn p-2 theme_border border-2 cursor-pointer rounded-3xl"
            onClick={handleOnChange}
          >
            {theme !== "dark" ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <div className="relative group sm:hidden">
            <button
              className="nav_btn p-1 rounded-sm border-2"
              title="Menu"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            {isMenuVisible && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 theme_container border-[1px] theme_border rounded-md shadow-lg"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/myprofile"
                      className={`flex px-4 py-2 theme_text gap-2 items-center nav_btn ${
                        location.pathname === "/myprofile" ? "active-link" : ""
                      }`}
                      onClick={() => setIsMenuVisible(!isMenuVisible)}
                    >
                      <CgProfile className="theme_color" />
                      Account
                    </Link>
                    <Link
                      to="/admin"
                      className={`flex px-4 py-2 theme_text gap-2 items-center nav_btn ${
                        location.pathname === "/admin" ? "active-link" : ""
                      }`}
                      onClick={() => setIsMenuVisible(!isMenuVisible)}
                    >
                      <BiLockOpen className="theme_color" />
                      Admin
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className={`flex px-4 py-2 theme_text gap-2 items-center nav_btn ${
                      location.pathname === "/login" ? "active-link" : ""
                    }`}
                    onClick={() => setIsMenuVisible(!isMenuVisible)}
                  >
                    <CgProfile className="theme_color" />
                    Login
                  </Link>
                )}
                <Link
                  to="/mycart"
                  className={`flex px-4 py-2 theme_text gap-2 items-center nav_btn ${
                    location.pathname === "/mycart" ? "active-link" : ""
                  }`}
                  onClick={() => setIsMenuVisible(!isMenuVisible)}
                >
                  <MdShoppingCart className="theme_color" />
                  MyCart
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/"
                    className="flex px-4 py-2 theme_text gap-2 items-center nav_btn"
                    onClick={() => {
                      setIsMenuVisible(!isMenuVisible);
                      handleLogout();
                    }}
                  >
                    <MdLogin className="theme_color" />
                    Logout
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
