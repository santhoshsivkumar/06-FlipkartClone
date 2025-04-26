import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { siteURL } from "../static/Data";
import { useDispatch } from "react-redux";
import { setProducts } from "../slices/productSlice";
import ProductTable from "../components/AdminPage/ProductTable";
import { PiPlus } from "react-icons/pi";
import UserTable from "../components/AdminPage/UserTable";
import Loading from "../components/Loading";
import PasswordConfirmationModal from "../components/AdminPage/PasswordConfirmationModal";
import ProductCard from "../components/AdminPage/ProductCard";
import UserCard from "../components/AdminPage/UserCard";

const Admin = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // state for view mode

  const [route, setRoute] = useState("products");
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${siteURL}/${route}`);
      const data = response.data.data;
      if (data.length > 0) {
        setData(data);
      }
      if (route === "products") {
        dispatch(setProducts(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, route]);

  useEffect(() => {
    fetchData();
  }, [fetchData, route]);

  const handleDeleteClick = (id: any) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteItem = async () => {
    setIsDeleteModalOpen(false);
    try {
      await axios
        .delete(`${siteURL}/${route}/delete/${deleteItemId}`)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoute(event.target.value);
  };

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setViewMode(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 min-h-[100vh] p-4 theme">
        <h1 className="text-4xl font-bold theme_text p-4">Admin View</h1>
        <div className="flex justify-between w-full gap-4">
          <div>
            <button
              title="Get Products Data"
              className="nav_btn p-[3px] px-2 md:p-2 theme_border md:text-md h-fit md:flex theme_color font-semibold items-center gap-2 border-2 cursor-pointer rounded-md"
            >
              <span className="hidden lg:block">
                Total {route === "users" ? "Registered Users" : "Products"}:
              </span>
              {data.length}
            </button>
          </div>
          <div className="flex gap-4">
            <select
              title="Select Data Type"
              className="nav_btn p-2 theme_border h-fit md:flex theme_color font-semibold items-center gap-2 border-2 cursor-pointer rounded-md"
              value={route}
              onChange={handleRouteChange}
            >
              <option value="products">Products Data</option>
              <option value="users">Users Data</option>
            </select>
            <select
              title="Select View Mode"
              className="nav_btn p-2 theme_border h-fit md:flex theme_color font-semibold items-center gap-2 border-2 cursor-pointer rounded-md"
              value={viewMode}
              onChange={handleViewModeChange}
            >
              <option value="table">Table View</option>
              <option value="card">Card View</option>
            </select>
          </div>
          <Link
            className={`nav_btn p-2 theme_border h-fit md:flex theme_color font-semibold items-center gap-2 border-2 cursor-pointer rounded-md`}
            to={`/products/create`}
          >
            <PiPlus />
            <span className="hidden lg:block">Add Item</span>
          </Link>
        </div>
        <div className="w-full">
          {data.length > 0 ? (
            loading ? (
              <div className="flex h-[70vh] justify-center p-4 items-center text-red-500">
                <Loading width={40} height={40} />
              </div>
            ) : viewMode === "table" ? (
              route === "users" ? (
                <UserTable users={data} onDeleteClick={handleDeleteClick} />
              ) : (
                <ProductTable
                  products={data}
                  onDeleteClick={handleDeleteClick}
                />
              )
            ) : route === "users" ? (
              <UserCard users={data} onDeleteClick={handleDeleteClick} />
            ) : (
              <ProductCard products={data} onDeleteClick={handleDeleteClick} />
            )
          ) : loading ? (
            <div className="flex h-[70vh] justify-center p-4 items-center text-red-500">
              <Loading width={40} height={40} />
            </div>
          ) : (
            <p className="text-2xl text-red-400 p-4 text-center">
              No data found
            </p>
          )}
        </div>
      </div>
      <PasswordConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteItem}
      />
    </>
  );
};

export default Admin;
