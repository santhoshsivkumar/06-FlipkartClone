import { useState } from "react";
import { initialUserState } from "../../static/initialStates";
import Loading from "../Loading";
import { formatRelativeTime } from "../../static/Functions";
import PasswordConfirmationModal from "./PasswordConfirmationModal";

const UserTable = ({
  users,
  onDeleteClick,
}: {
  users: (typeof initialUserState)[];
  onDeleteClick: (id: string) => void;
}) => {
  const [visibleRows, setVisibleRows] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const headers = [
    "User ID",
    "Image",
    "Name",
    "Email",
    "Mobile",
    "Gender",
    "Created",
    "View",
    "Delete",
  ];

  const toggleVisibility = (id: string) => {
    if (visibleRows.has(id)) {
      // If already visible, remove from visible set
      setVisibleRows((prevVisibleRows) => {
        const newVisibleRows = new Set(prevVisibleRows);
        newVisibleRows.delete(id);
        return newVisibleRows;
      });
    } else {
      // If not visible, open modal for confirmation
      setModalOpen(true);
      setCurrentUserId(id);
    }
  };

  const confirmVisibility = () => {
    if (currentUserId) {
      setVisibleRows((prevVisibleRows) => {
        const newVisibleRows = new Set(prevVisibleRows);
        newVisibleRows.add(currentUserId);
        return newVisibleRows;
      });
    }
    setModalOpen(false);
  };

  const renderRows = () => {
    if (!users || users.length === 0) {
      return (
        <tr>
          <td colSpan={headers.length} className="p-4 text-center">
            <Loading />
          </td>
        </tr>
      );
    }

    return users.map((user, index) => (
      <tr key={index} className="border-b theme_border text-center">
        <td className="p-4">{user._id}</td>
        <td className="p-4">
          <img
            src={
              user.image ||
              "https://firebasestorage.googleapis.com/v0/b/chat-app-ed074.appspot.com/o/Flipcart%20clone%2Fprofile-pic-male_4811a1.svg?alt=media&token=e17b4c7a-73de-401f-a54d-da1ab00f1e13"
            }
            alt="User"
            className="rounded-md border-[1px] p-1 theme_border"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              width: "auto",
              height: "100px",
            }}
          />
        </td>
        <td className="p-4">{user.name}</td>
        <td className="p-4">{user.email || "Not provided"}</td>
        <td className="p-4">
          {visibleRows.has(user._id) ? user.mobile || "Not provided" : "******"}
        </td>
        <td className="p-4">{user.gender || "Not provided"}</td>
        <td className="p-4">
          {formatRelativeTime(user.createdAt) || "Not provided"}
        </td>
        <td className="p-4 space-x-2">
          <button
            title="View"
            onClick={() => toggleVisibility(user._id)}
            className="text-blue-600"
          >
            <i
              className={`fas ${
                visibleRows.has(user._id) ? "fa-eye-slash" : "fa-eye"
              } mr-1`}
            ></i>
          </button>
        </td>
        <td className="p-4">
          <button
            title="Delete"
            onClick={() => onDeleteClick(user._id)}
            className="text-red-600"
          >
            <i className="fas fa-trash-alt mr-1"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table-auto w-full theme_container theme_text shadow-md rounded-md overflow-hidden">
        <thead className="theme_bg text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      <PasswordConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmVisibility}
      />
    </>
  );
};

export default UserTable;
