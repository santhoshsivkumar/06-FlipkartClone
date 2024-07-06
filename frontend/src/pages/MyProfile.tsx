import FilterBar from "../components/FilterBar";
import ProfileImg from "../assets/profile-pic-male_4811a1.svg";
import { useState } from "react";
import {
  AccountSettingsItems,
  MyStuffItems,
  PaymentsItems,
} from "../static/Data";
import UtilityComponent from "../components/MyProfilePage/UtilityComponent";

const MyProfile = () => {
  const [active, setActive] = useState("Profile Information");
  return (
    <>
      <FilterBar />
      <div className="flex w-full min-h-[87vh] theme_text theme px-20 gap-4 p-4 ">
        {/* left */}
        <div className="lg:w-[25%] h-full flex flex-col gap-2 ">
          <div className="h-[11.5%] flex gap-4 shadow-md  items-center rounded-sm theme_border p-3 theme_container">
            <img
              src={ProfileImg}
              alt="Default Profile Image"
              className="w-[3.5rem] h-[3.3rem]"
            />
            <div className="flex flex-col gap-[2px]">
              <span className="text-xs">Hello,</span>
              <span className="font-semibold text-md ">Santhosh Sivakumar</span>
            </div>
          </div>
          <div className="h-[85%] shadow-md rounded-sm theme_border theme_container">
            {/* 2nd */}
            <div className="flex items-center gap-4 theme_border border-b-[1px] p-4">
              <i
                className="fa fa-cart-arrow-down theme_color"
                aria-hidden="true"
              ></i>
              <a className="flex justify-between w-full items-center theme_hover cursor-pointer">
                <h2 className="font-semibold ">MY ORDERS</h2>
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
          </div>
        </div>
        <div className="lg:w-[75%] shadow-md rounded-sm theme_border p-4 theme_container">
          3
        </div>
      </div>
    </>
  );
};

export default MyProfile;
