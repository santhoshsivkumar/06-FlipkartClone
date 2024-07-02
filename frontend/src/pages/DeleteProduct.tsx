const DeleteProduct = ({ isOpen, onClose, onDelete }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Are you sure?</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={onDelete}
            className="text-white bg-red-500 rounded-md py-2 px-4 hover:bg-red-600 transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="text-white bg-green-500 rounded-md py-2 px-4 hover:bg-green-600 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
