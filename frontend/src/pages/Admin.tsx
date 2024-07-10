import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { siteURL } from "../static/Data";
import DynamicTable from "../components/AdminPage/DynamicTable";
import DeleteComponent from "../components/DeleteComponent";
import { useDispatch } from "react-redux";
import { setProducts } from "../slices/productSlice";

const Admin = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState<any>([]);
  const [route, setRoute] = useState("products");
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${siteURL}/${route}`);
      const data = response.data.data;
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        setHeaders(headers);
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
    try {
      await axios
        .delete(`${siteURL}/${route}/delete/${deleteItemId}`)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-[100vh] p-4 theme">
        <h1 className="text-4xl font-bold theme_color p-4">Admin View</h1>
        <div className="flex justify-end w-[92.5%] gap-4">
          <button
            title="Get Products Data"
            className="py-2 px-4 theme_btn text-white rounded-md mb-4 transition duration-300"
            onClick={() => setRoute("products")}
          >
            Get Products Data
          </button>
          <button
            title="Get Users Data"
            className="py-2 px-4 theme_btn text-white rounded-md mb-4 transition duration-300"
            onClick={() => setRoute("users")}
          >
            Get Users Data
          </button>
          <Link
            to={`/products/create`}
            className="py-2 px-4 theme_btn text-white rounded-md mb-4 transition duration-300"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add Item
          </Link>
        </div>
        <div className="w-full ">
          {data.length > 0 ? (
            <DynamicTable
              headers={headers}
              data={data}
              route={route}
              onDeleteClick={handleDeleteClick}
            />
          ) : (
            !loading && (
              <p className="text-2xl text-red-400 p-4 text-center">
                No data found
              </p>
            )
          )}
        </div>
      </div>

      <DeleteComponent
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteItem}
      />
    </>
  );
};

export default Admin;
