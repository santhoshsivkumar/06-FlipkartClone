import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link
      to="/admin"
      className="bg-blue-600 text-white rounded-md py-2 px-4 inline-block mt-4 mb-2 hover:bg-blue-700"
    >
      Back to Home
    </Link>
  );
};

export default BackButton;
