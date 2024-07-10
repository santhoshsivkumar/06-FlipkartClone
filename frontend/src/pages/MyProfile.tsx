import ProfileImg from "../assets/profile-pic-male_4811a1.svg";
import { useEffect, useState } from "react";
import {
  AccountSettingsItems,
  MyStuffItems,
  PaymentsItems,
  siteURL,
} from "../static/Data";
import UtilityComponent from "../components/MyProfilePage/UtilityComponent";
import ProfileInformation from "../components/MyProfilePage/ProfileInformation";
import { logout, setUserData } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../static/interface";
import { initialUserState } from "../static/initialStates";
import DeleteComponent from "../components/DeleteComponent";
import ManageAddress from "../components/MyProfilePage/ManageAddress";
import ComingSoon from "../components/MyProfilePage/ComingSoon";

const MyProfile = () => {
  const userId = localStorage.getItem("userId");
  const [active, setActive] = useState("Profile Information");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // state for managing sidebar visibility on small screens
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("mobile");
  const { userData } = useSelector((state: any) => state.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errors, setErrors] = useState(initialUserState);
  const [disableSection1, setDisableSection1] = useState(true);
  const [disableSection2, setDisableSection2] = useState(true);
  const [disableSection3, setDisableSection3] = useState(true);

  useEffect(() => {
    axios
      .get(`${siteURL}/users/details/${userId}`)
      .then((response: any) => {
        dispatch(setUserData({ ...initialUserState, ...response.data }));
        if (response.data.email) setLoginId("email");
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  const onSave = async (updatedUserInfo: User) => {
    try {
      const response = await axios.put(
        `${siteURL}/users/update/${userId}`,
        updatedUserInfo
      );
      dispatch(setUserData(response.data.User)); // assuming response contains the updated user data
      setErrors(initialUserState); // Reset errors on successful save
    } catch (error: any) {
      const field = Object.keys(updatedUserInfo);
      console.log(field);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const { message } = error.response.data;

        if (field.length > 1) {
          setErrors((prev) => ({
            ...prev,
            //@ts-ignore
            [field[0]]: message,
          }));
          setErrors((prev) => ({
            ...prev,
            //@ts-ignore
            [field[1]]: message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            //@ts-ignore
            [field]: message,
          }));
        }
        //@ts-ignore
        turnOffEditMode(field[0], false);
      }
    }
  };

  const turnOffEditMode = (section: string, payload: boolean = true) => {
    if (section === "name") setDisableSection1(payload);
    if (section === "email") setDisableSection2(payload);
    if (section === "mobile") setDisableSection3(payload);
  };

  const handleDeleteAccount = async () => {
    setIsDeleteModalOpen(false);
    try {
      await axios.delete(`${siteURL}/users/delete/${userId}`).then(() => {
        // alert(response.data.message);
        handleLogout();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [active]);
  return (
    <>
      <div className="flex w-full h-fit theme_text theme lg:px-20 gap-4 p-0 md:p-4">
        {/* left */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-0 bg-gray-800 bg-opacity-50 z-10 md:hidden`}
          onClick={toggleSidebar}
        ></div>
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-y-0 left-0 theme_container  h-full w-64 z-30 md:flex md:relative md:w-4/12 lg:w-[25%] min-h-[100vh] overflow-y-scroll flex-col gap-2 shadow-md`}
        >
          <div className="h-[11.5%] flex gap-4 items-center rounded-sm border-b-[1px] theme_border p-3 theme_container">
            <img
              src={ProfileImg}
              alt="Default Profile Image"
              className="w-[3.5rem] h-[3.3rem]"
            />
            <div className="flex flex-col gap-[2px]">
              <span className="text-xs">Hello,</span>
              <span className="font-semibold text-md">{userData.name}</span>
            </div>
          </div>
          <div className="h-full md:h-[85%] rounded-sm theme_border theme_container">
            {/* 2nd */}
            <div className="flex items-center gap-4 theme_border border-b-[1px] p-4">
              <i
                className="fa fa-cart-arrow-down theme_color"
                aria-hidden="true"
              ></i>
              <a className="flex justify-between w-full items-center theme_hover cursor-pointer">
                <h2 className="font-semibold">MY ORDERS</h2>
                <i
                  className="fa fa-chevron-right theme_text"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
            {/* 3rd */}
            <UtilityComponent
              title="ACCOUNT SETTINGS"
              items={AccountSettingsItems}
              active={active}
              setActive={setActive}
            />
            <UtilityComponent
              title="PAYMENTS"
              items={PaymentsItems}
              active={active}
              setActive={setActive}
            />
            <UtilityComponent
              title="MY STUFF"
              items={MyStuffItems}
              active={active}
              setActive={setActive}
            />
            <div className="flex flex-col">
              <a
                className="flex flex-row gap-4 p-4 w-full items-center theme_hover cursor-pointer"
                onClick={handleLogout}
              >
                <i
                  className="fa fa-power-off theme_color"
                  aria-hidden="true"
                ></i>
                <h2 className="font-semibold">Logout</h2>
              </a>
            </div>
          </div>
        </div>
        <div className="flex absolute pl-1 rounded-r-2xl md:hidden justify-end">
          <button onClick={toggleSidebar} className="">
            <i
              className="fa fa-chevron-right mt-2 theme_color nav_btn p-2 theme_border border-2 cursor-pointer rounded-2xl"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {/* right */}
        <div className="lg:w-[75%] md:w-8/12  pt-8 md:pt-0 md:p-4 shadow-md rounded-sm theme_border theme_container">
          {active === "Profile Information" ? (
            <ProfileInformation
              loginId={loginId}
              onSave={onSave}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              errors={errors}
              setErrors={setErrors}
              disableSection1={disableSection1}
              setDisableSection1={setDisableSection1}
              disableSection2={disableSection2}
              setDisableSection2={setDisableSection2}
              disableSection3={disableSection3}
              setDisableSection3={setDisableSection3}
              turnOffEditMode={turnOffEditMode}
            />
          ) : active === "Manage Address" ? (
            <ManageAddress />
          ) : (
            <ComingSoon />
          )}
        </div>
      </div>
      <DeleteComponent
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteAccount}
        confirmationPhrase={userData.name}
      />
    </>
  );
};

export default MyProfile;
