import { useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import { siteURL } from "../static/Data";
import Loading from "../components/Loading"; // Assuming you have this component
import { useNavigate } from "react-router-dom";
import StyledInputField from "../components/StyledInputField";

const initialState = {
  name: "",
  user_Id: "",
  password: "",
  confirmpassword: "",
};

const LoginPage = () => {
  const [newUser, setNewUser] = useState<boolean>(false);
  const [errors, setErrors] = useState({ ...initialState, matched: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (newUser && !input.name) {
      newErrors.name = "Please enter a valid name";
      isValid = false;
    }

    if (!input.user_Id) {
      newErrors.user_Id = "Please enter a valid email id or mobile number";
      isValid = false;
    } else {
      // Regular expressions for email and mobile number validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[0-9]{10}$/;

      if (!emailRegex.test(input.user_Id) && !mobileRegex.test(input.user_Id)) {
        newErrors.user_Id = "Please enter a valid email id or mobile number";
        isValid = false;
      }
    }

    if (!input.password) {
      newErrors.password = "Please enter a valid password";
      isValid = false;
    }

    if (newUser && !input.confirmpassword) {
      newErrors.confirmpassword = "Please enter a valid confirm password";
      isValid = false;
    }

    if (newUser && input.password && input.confirmpassword) {
      if (input.password !== input.confirmpassword) {
        newErrors.matched = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }
    if (newUser) {
      setLoading(true);
      axios
        .post(`${siteURL}/users/register`, input)
        .then((response) => {
          setLoading(false);
          alert(response.data.data.message);
        })
        .catch((error) => {
          setLoading(false);

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            const { message } = error.response.data;
            if (message === "Existing user. Please login.") {
              setErrors((prev) => ({
                ...prev,
                confirmpassword: message,
              }));
            } else {
              console.log(error.response.data.data);
              setErrors((prev) => ({
                ...prev,
                confirmpassword: message,
              }));
            }
          }
        });
    } else {
      setLoading(true);
      axios
        .post(`${siteURL}/users/login`, input)
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("token", token);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          navigate(-1);
          setInput(initialState);
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            const { message } = error.response.data;
            if (message === "No user found. Please register.") {
              setErrors((prev) => ({
                ...prev,
                password: message,
              }));
            } else if (message === "Password mismatch") {
              setErrors((prev) => ({
                ...prev,
                password: message,
              }));
            } else {
              setErrors((prev) => ({
                ...prev,
                password: message,
              }));
            }
          }
        });
    }
  };

  const handleCreateAccount = () => {
    setLoading(true);
    setErrors({ ...initialState, matched: "" });
    setTimeout(() => {
      setLoading(false);
      setNewUser(!newUser);
      setInput(initialState);
    }, 500);
  };

  return (
    <>
      <div className="theme gap-2 flex flex-col min-h-[calc(100vh-3.5rem)] items-center justify-center">
        <div
          className="theme_color w-[65%] text-right"
          onClick={() => navigate(-1)}
        >
          <i className="theme_container fas fa-times cursor-pointer py-[10px] px-[12px] rounded-full"></i>
        </div>
        <div className="theme_container flex flex-col lg:flex-row shadow-lg rounded-sm w-[60%] h-[80%] min-h-[70vh]">
          <div className="theme_bg lg:w-[40%] space-y-4 rounded-sm p-8">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <p className="text-lg text-gray-300">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="lg:w-[60%] flex flex-col items-center gap-4 relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                <Loading />
              </div>
            )}
            <form
              onSubmit={handleOnSubmit}
              className="w-full h-[80%] gap-4 flex flex-col items-center px-8 pt-10"
            >
              {newUser && (
                <StyledInputField
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={handleOnChange}
                  error={errors.name}
                />
              )}
              <StyledInputField
                name="user_Id"
                value={input.user_Id}
                placeholder={
                  !newUser ? "Email / Mobile Number" : "Mobile Number"
                }
                onChange={handleOnChange}
                error={errors.user_Id}
              />
              <StyledInputField
                name="password"
                type="password"
                placeholder="Password"
                value={input.password}
                onChange={handleOnChange}
                error={errors.password}
              />
              {newUser && (
                <StyledInputField
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={input.confirmpassword}
                  onChange={handleOnChange}
                  error={errors.confirmpassword || errors.matched}
                />
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 mt-2 text-white theme_btn"
              >
                {newUser ? "CONTINUE" : "LOGIN"}
              </button>
            </form>
            <div className="flex flex-col w-full h-[20%] text-md font-semibold items-center gap-4 p-4">
              <p
                className="theme_color cursor-pointer"
                onClick={handleCreateAccount}
              >
                {newUser
                  ? "Existing User? Log in"
                  : "New to Site? Create new account"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
