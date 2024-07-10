import { useState } from "react";

const DeleteComponent = ({
  isOpen,
  onClose,
  onDelete,
  confirmationPhrase = "confirm",
}: any) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = () => {
    if (inputValue.trim().toLowerCase() === confirmationPhrase.toLowerCase()) {
      onDelete();
    } else {
      alert("Incorrect confirmation phrase. Deletion not confirmed.");
      setInputValue("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center theme_text justify-center bg-black bg-opacity-70 z-50">
      <div className="theme_container rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Are you sure?</h1>
        <p className="text-center mb-4">This action cannot be undone.</p>
        <input
          type="text"
          placeholder={`Type "${confirmationPhrase}" to confirm`}
          value={inputValue}
          onChange={handleInputChange}
          className="border theme_border theme_text theme_search outline-none rounded-md px-3 py-2 w-full mb-4"
        />
        <div className="flex justify-center gap-4">
          <button
            title="Confirm"
            onClick={handleConfirm}
            className={`text-white rounded-md py-2 px-4 ${
              inputValue.trim().toLowerCase() ===
              confirmationPhrase.toLowerCase()
                ? "bg-red-500 hover:bg-red-600 transition duration-300"
                : "bg-red-300 cursor-not-allowed"
            }`}
            disabled={
              inputValue.trim().toLowerCase() !==
              confirmationPhrase.toLowerCase()
            }
          >
            Confirm
          </button>
          <button
            title="Cancel"
            onClick={onClose}
            className="text-white bg-green-500 rounded-md py-2 px-4 hover:bg-green-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComponent;
