import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";

const FinalPage = () => {
  const [redirectTimer, setRedirectTimer] = useState(5); // Redirect timer in seconds
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Set a timeout for the loading state
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      // Start the redirect timer once loading is done
      const timer = setInterval(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timer);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (redirectTimer <= 0) {
    // If not authenticated and timer has expired, redirect to login
    return <Navigate to="/myprofile" replace={true} />;
  }

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col items-center theme justify-center min-h-[95vh]">
          <div className="max-w-sm theme_text p-6 theme_container rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-500">
              Your order has been placed successfully.
            </h3>{" "}
            <p className="mb-4">Happy Shopping 🎉</p>
            <p className=" mb-4">Redirecting in {redirectTimer} seconds...</p>
            <button
              title="Login Now"
              className="theme_bg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setRedirectTimer(0)}
            >
              Go to my orders
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalPage;
