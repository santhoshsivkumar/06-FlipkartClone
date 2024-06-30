import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5555/products/delete/${id}`)
      .then((response) => {
        console.log("deleted successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col justify-center items-center my-6">
      <h1 className="text-2xl ">Are you sure?</h1>
      <div className="gap-4 flex p-4">
        <button
          onClick={handleDelete}
          className="text-white bg-red-500 rounded-md py-2 px-4 "
        >
          {" "}
          Yes
        </button>
        <Link
          to={`/`}
          className="text-white bg-green-500 rounded-md py-2 px-4 "
        >
          No
        </Link>
      </div>
    </div>
  );
};

export default DeleteProduct;
