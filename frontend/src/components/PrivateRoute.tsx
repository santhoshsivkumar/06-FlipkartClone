import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  const [redirectTimer, setRedirectTimer] = useState(5); // Redirect timer in seconds

  useEffect(() => {
    let timer = setInterval(() => {
      setRedirectTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isAuthenticated && redirectTimer <= 0) {
    // If not authenticated and timer has expired, redirect to login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return isAuthenticated ? (
    element
  ) : (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          You are not authenticated.
        </h3>
        <p className="text-gray-700 mb-4">Please log in to continue.</p>
        <p className="text-gray-700 mb-4">
          Redirecting in {redirectTimer} seconds...
        </p>
        <button
          title="Login Now"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setRedirectTimer(0)}
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default PrivateRoute;
