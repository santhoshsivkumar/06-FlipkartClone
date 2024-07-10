import { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/profile-pic-male_4811a1.svg"; // Import default image

// Utility function to truncate text
const truncateText = (text: any, maxLength: number) => {
  const str = String(text); // Ensure text is a string
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + "...";
};

const renderCellContent = (data: any) => {
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data); // or handle it in a custom way if needed
  }
  return truncateText(data, 100); // Adjust the maxLength as needed
};

const DynamicTable = ({ headers, data, route, onDeleteClick }: any) => {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const toggleViewMode = (mode: "table" | "card") => {
    setViewMode(mode);
  };

  const renderRows = () => {
    return data.map((item: any) => (
      <div
        key={item._id}
        className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md overflow-hidden mb-4"
      >
        <div className="md:flex items-center">
          <div className="md:flex-shrink-0">
            <img
              src={item.productImage || defaultImage}
              alt="Product Preview"
              className=" size-12 object-cover"
            />
          </div>
          <div className="p-4 flex flex-col justify-between">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {item.name}
              </div>
              <Link
                to={`/${route}/${item._id}`}
                className="block text-lg leading-tight font-semibold text-gray-900 hover:underline"
              >
                {item.productName}
              </Link>
              <p className="mt-2 text-gray-600">
                {truncateText(item.productDescription, 100)}
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/${route}/edit/${item._id}`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </Link>
              <button
                title="Delete"
                onClick={() => onDeleteClick(item._id)}
                className="ml-4 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button
            className={`px-4 py-2 rounded-md mr-2 ${
              viewMode === "table"
                ? "bg-blue-500 text-white"
                : "text-blue-500 bg-white border border-blue-500"
            }`}
            onClick={() => toggleViewMode("table")}
          >
            Table View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              viewMode === "card"
                ? "bg-blue-500 text-white"
                : "text-blue-500 bg-white border border-blue-500"
            }`}
            onClick={() => toggleViewMode("card")}
          >
            Card View
          </button>
        </div>
        {/* <Link
          to={`/${route}/create`}
          className="py-2 px-4 theme_btn text-white rounded-md transition duration-300"
        >
          <i className="fas fa-plus-circle mr-2"></i>
          Add Item
        </Link> */}
      </div>

      {viewMode === "table" ? (
        <table className="table-auto w-full theme_container theme_text shadow-md rounded-md overflow-hidden">
          <thead className="theme_bg text-white">
            <tr>
              {headers.map((header: string) => (
                <th key={header} className="p-4">
                  {header.replace(/([A-Z])/g, " $1").toUpperCase()}
                </th>
              ))}
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item._id} className="border-b theme_border text-center">
                {headers.map((header: string) => (
                  <td key={header} className="p-4">
                    {header === "productImage" ? (
                      <img
                        src={item[header]}
                        alt="Product Preview"
                        className="h-20 w-auto object-cover"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                      />
                    ) : (
                      renderCellContent(item[header])
                    )}
                  </td>
                ))}
                <td className="p-4">
                  <Link to={`/${route}/${item._id}`} className="text-blue-600">
                    <i className="fas fa-eye mr-1"></i> View
                  </Link>
                </td>
                <td className="p-4">
                  <Link
                    to={`/${route}/edit/${item._id}`}
                    className="text-blue-600"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </Link>
                </td>
                <td className="p-4">
                  <button
                    title="Delete"
                    onClick={() => onDeleteClick(item._id)}
                    className="text-red-600"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {renderRows()}
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
