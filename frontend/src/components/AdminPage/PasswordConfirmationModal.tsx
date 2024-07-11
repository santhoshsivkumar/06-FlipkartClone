import { useState } from "react";

const PasswordConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  requiredPassword = import.meta.env.VITE_ADMIN_PASSWORD,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requiredPassword?: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = () => {
    if (inputValue.trim() === requiredPassword) {
      onConfirm();
      setInputValue("");
    } else {
      alert("Incorrect password. Access not granted.");
      setInputValue("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="theme_container rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl text-red-500 font-bold mb-4 text-center">
          You don't have access.
        </h1>
        <p className="text-center mb-4 theme_text">
          Please provide the admin password to proceed:
        </p>
        <input
          type="password"
          placeholder="Enter password"
          value={inputValue}
          onChange={handleInputChange}
          className="border theme_search theme_border theme_text outline-none rounded-md px-3 py-2 w-full mb-4"
        />
        <div className="flex justify-center gap-4">
          <button
            title="Confirm"
            onClick={handleConfirm}
            className={`text-white rounded-md py-2 px-4 ${
              inputValue.trim() === requiredPassword
                ? "bg-blue-500 hover:bg-blue-600 transition duration-300"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            disabled={inputValue.trim() !== requiredPassword}
          >
            Confirm
          </button>
          <button
            title="Cancel"
            onClick={() => {
              onClose();
              setInputValue("");
            }}
            className="text-white bg-gray-500 rounded-md py-2 px-4 hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmationModal;
