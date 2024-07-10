import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import StyledInputField from "../components/StyledInputField";
import Loading from "../components/Loading";
import { siteURL } from "../static/Data";

const initialState = {
  name: "",
  user_Id: "",
  password: "",
  confirmpassword: "",
};

const LoginPage = () => {
  const [newUser, setNewUser] = useState(false);
  const [errors, setErrors] = useState({ ...initialState });
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newUser && showSuccessMessage) {
      const timer = setTimeout(() => {
        setNewUser(false);
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newUser, showSuccessMessage]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (newUser && !input.name)
      (newErrors.name = "Please enter a valid name"), (isValid = false);
    if (!input.user_Id)
      (newErrors.user_Id = "Please enter a valid email id or mobile number"),
        (isValid = false);
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[0-9]{10}$/;
      if (!emailRegex.test(input.user_Id) && !mobileRegex.test(input.user_Id)) {
        (newErrors.user_Id = "Please enter a valid email id or mobile number"),
          (isValid = false);
      }
    }
    if (!input.password)
      (newErrors.password = "Please enter a valid password"), (isValid = false);
    if (input.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
      isValid = false;
    }
    if (newUser && !input.confirmpassword)
      (newErrors.confirmpassword = "Please enter a valid confirm password"),
        (isValid = false);
    if (newUser && input.password !== input.confirmpassword)
      (newErrors.confirmpassword = "Passwords do not match"), (isValid = false);

    setErrors(newErrors);
    return isValid;
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;
    setLoading(true);

    const request = newUser
      ? axios.post(`${siteURL}/users/register`, input)
      : axios.post(`${siteURL}/users/login`, input);
    request
      .then((response) => {
        setLoading(false);
        if (newUser) {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setNewUser(false);
            setShowSuccessMessage(false);
            setInput(initialState);
            navigate("/login");
          }, 3000);
        } else {
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", user._id);
          dispatch(login());
          navigate(-1);
          setInput(initialState);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.data?.message) {
          setErrors(() => ({
            ...initialState,
            confirmpassword: error.response.data.message,
          }));
        } else console.log(error);
      });
  };

  const handleCreateAccount = () => {
    setLoading(true);
    setErrors({ ...initialState });
    setTimeout(() => {
      setLoading(false);
      setNewUser(!newUser);
      setInput(initialState);
    }, 500);
  };

  return (
    <div className="theme gap-2 flex flex-col min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <div
        className="theme_color w-[92%] lg:w-[65%] text-right mt-[-150px] lg:mt-0"
        onClick={() => navigate("/")}
      >
        <i className="theme_container fas fa-times cursor-pointer py-[10px] px-[12px] rounded-full"></i>
      </div>
      <div className="theme_container flex flex-col lg:flex-row shadow-lg rounded-sm w-[90%] lg:w-[60%] h-[80%] min-h-[60vh] lg:min-h-[70vh]">
        <div className="theme_bg lg:w-[40%] space-y-4 rounded-sm p-8">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-lg text-gray-300">
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>
        <div className="lg:w-[60%] flex flex-col items-center gap-4 relative">
          {loading && (
            <div className="absolute inset-0 flex gap-2 flex-col items-center justify-center theme_container z-10">
              {showSuccessMessage && (
                <div className="theme_text py-2">
                  Registration Successful! Redirecting to Login...
                </div>
              )}
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
              placeholder={!newUser ? "Email / Mobile Number" : "Mobile Number"}
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
                error={errors.confirmpassword}
              />
            )}
            <button
              title="Submit"
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
  );
};

export default LoginPage;
