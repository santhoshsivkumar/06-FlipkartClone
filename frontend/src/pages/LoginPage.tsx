import { useState } from "react";
import "../styles/styles.css";
import axios from "axios";
import { domainURL } from "../static";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  mobile: "",
  password: "",
};
const LoginPage = () => {
  const [newUser, setNewUser] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prev: any) => ({ ...prev, [name]: value }));
    setError("");
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (newUser) {
      if (input.name !== "" && input.password !== "" && input.mobile !== "") {
        axios
          .post(`${domainURL}/user/register`, input, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setLoading(false);
            navigate(-1);
            setInput(initialState);
          })
          .catch((error) => {
            setError(error.response);
            setTimeout(() => {
              setError("");
              setInput(initialState);
            }, 1000);
          });
      } else {
        setError("Please fill all the fields");
      }
    } else {
      if (input.password !== "" && input.mobile !== "") {
        const { name, mobile }: any = {
          input,
        };
        axios
          .post(
            `${domainURL}/user/login`,
            { name, mobile },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() => {
            setLoading(false);
            navigate(-1);
            setInput(initialState);
          })
          .catch((error) => {
            setError(error.response.data.message);
            setTimeout(() => {
              setError("");
              setInput(initialState);
            }, 1000);
          });
      } else {
        setError("Please fill all the fields");
      }
    }
  };

  const handleCreateAccount = () => {
    setNewUser(!newUser);
  };
  return (
    <>
      <div
        className={` theme gap-2 flex flex-col h-[calc(100vh-3.5rem)] items-center justify-center`}
      >
        <div
          className="theme_color w-[65%] text-right"
          onClick={() => navigate(-1)}
        >
          <i
            className={`theme_container fas fa-times cursor-pointer py-[10px] px-[12px] rounded-full`}
          ></i>
        </div>
        <div
          className={`theme_container flex flex-col lg:flex-row shadow-lg rounded-sm w-[60%] h-[80%] min-h-[70vh] `}
        >
          <div className={`theme_bg lg:w-[40%]  space-y-4 rounded-sm p-8`}>
            <h1 className="text-3xl font-bold  text-white">Login</h1>
            <p className="text-lg text-gray-300">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="lg:w-[60%] flex flex-col  items-center gap-4">
            <form
              onSubmit={handleOnSubmit}
              className="w-full h-[80%] gap-4 flex flex-col items-center px-8 pt-10"
            >
              {newUser && (
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  placeholder="Name"
                  className="w-full py-2 px-4 outline-none border-b-[1px] border-gray-500"
                  onChange={handleOnChange}
                />
              )}
              <input
                type={!newUser ? "text" : "number"}
                name="mobile"
                value={input.mobile}
                placeholder={
                  !newUser ? "Email / Mobile number" : "Mobile number"
                }
                className="w-full py-2 px-4 outline-none border-b-[1px] border-gray-500"
                onChange={handleOnChange}
              />{" "}
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={input.password}
                onChange={handleOnChange}
                className="w-full py-2 px-4 outline-none border-b-[1px] border-gray-500"
              />
              {<p className="text-red-500 w-full">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 text-white theme_btn"
              >
                {!loading ? newUser ? "CONTINUE" : "LOGIN" : <Loading />}
              </button>
            </form>
            <div className="flex flex-col w-full h-[20%]  text-md font-semibold items-center gap-4 p-4">
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
