import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Navbar = () => {
  const navigate = useNavigate();
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
      <nav className="nav h-[3.5rem] z-20 shadow-sm flex fixed gap-4 top-0 left-0 w-full p-2 items-center font-semibold">
        <a
          href="/"
          className="w-3/12 text-right text-lg cursor-pointer text-white"
        >
          Zencart
        </a>
        <div className="flex gap-4 pl-4 w-6/12 justify-between items-center">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className={`theme_search w-[85%] py-2 px-4 outline-none rounded-sm`}
          />
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/myprofile");
              }}
              className={`nav_btn text-sm w-[15%] py-1 h-9 px-4 rounded-sm`}
            >
              My Profile
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className={`nav_btn py-1 h-9 px-4 rounded-sm`}
            >
              Login
            </button>
          )}
        </div>
        <div className="w-3/12 text-sm flex gap-2 justify-end pr-4 items-center font-semibold">
          <button
            className={`nav_btn py-1 cursor-pointer px-4 rounded-3xl hidden lg:block`}
            onClick={handleOnChange}
          >
            <i
              className={` ${
                theme === "dark" ? "fa fa-toggle-off" : "fa fa-toggle-on"
              }`}
              aria-hidden="true"
            ></i>
          </button>
          {isAuthenticated && (
            <>
              <Link
                className={`nav_btn py-2 cursor-pointer hidden lg:block px-4 rounded-sm`}
                to={"/admin view"}
              >
                Admin View
              </Link>
              <button
                className={`nav_btn py-2 cursor-pointer px-4 text-sm rounded-sm`}
              >
                MyCart
              </button>
            </>
          )}
          <button className="nav_btn px-2 rounded-sm py-2">
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
