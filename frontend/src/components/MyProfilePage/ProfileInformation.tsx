import { useEffect, useState } from "react";
import InputField from "../InputField";
import { initialUserState } from "../../static/initialStates";
import { useSelector } from "react-redux";
import { User } from "../../static/interface";

const radioOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const ProfileInformation = ({
  loginId,
  onSave,
  setIsDeleteModalOpen,
  errors,
  setErrors,
  disableSection1,
  disableSection2,
  disableSection3,
  setDisableSection1,
  setDisableSection2,
  setDisableSection3,
  turnOffEditMode,
}: any) => {
  const { userData } = useSelector((state: any) => state.auth);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    setName(userData?.name || "");
    setGender(userData?.gender || "");
    setEmail(userData?.email || "");
    setMobile(userData?.mobile || "");
  }, [userData]);

  const handleOnchange = (e: any, setState: any) => {
    const { value, name } = e.target;
    setState(value);
    setErrors((prevState: User) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/; // Ensuring the mobile number is exactly 10 digits

    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (loginId === "mobile") {
      if (!mobile) {
        newErrors.mobile =
          "A mobile number is required if no email id is provided.";
        isValid = false;
      }
    } else {
      if (!email) {
        newErrors.email =
          "An email id is required if no mobile number is provided.";
        isValid = false;
      }
    }
    if (mobile && !mobileRegex.test(mobile)) {
      newErrors.mobile = "Invalid Mobile Number. It should be 10 digits.";
      isValid = false;
    }
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid Email Id.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveBtnClick = (fields: object) => {
    if (!validateFields()) {
      return;
    }
    onSave(fields);
    turnOffEditMode(Object.keys(fields)[0]);
    setErrors(initialUserState); // Pass the first key to turn off edit mode
  };

  const handleCancel = (section: string) => {
    setName(userData?.name || "");
    setGender(userData?.gender || "");
    setEmail(userData?.email || "");
    setMobile(userData?.mobile || "");
    turnOffEditMode(section);
    setErrors(initialUserState);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4">
      {/* 1st */}
      <div className="flex gap-3 items-center">
        <h1 className="text-xl font-semibold">Profile Information</h1>
        {disableSection1 ? (
          <span
            className="text-sm theme_color mt-1 cursor-pointer"
            onClick={() => setDisableSection1(false)}
          >
            Edit
          </span>
        ) : (
          <span
            className="text-sm theme_color mt-1 cursor-pointer"
            onClick={() => handleCancel("name")}
          >
            Cancel
          </span>
        )}
      </div>
      <div className="lg:flex gap-4">
        <div className="flex flex-col gap-4 pt-4 lg:w-7/12">
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => handleOnchange(e, setName)}
            disabled={disableSection1}
            error={errors.name}
          />
          <InputField
            label="Your Gender"
            name="gender"
            value={gender}
            onChange={(e) => handleOnchange(e, setGender)}
            options={radioOptions}
            disabled={disableSection1}
            fixHeight={true}
          />
        </div>
        <div className="flex flex-col gap-4 pt-4 lg:w-5/12">
          {!disableSection1 && (
            <button
              title="Save"
              className="w-fit  py-2 px-4 text-sm rounded-sm text-white theme_bg font-semibold"
              onClick={() => handleSaveBtnClick({ name, gender })}
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* 2nd */}
      <div>
        <div className="flex gap-3 items-center py-4">
          <h1 className="text-lg font-semibold">Email Address</h1>
          {disableSection2 ? (
            <span
              className="text-sm theme_color mt-1 cursor-pointer"
              onClick={() => setDisableSection2(false)}
            >
              Edit
            </span>
          ) : (
            <span
              className="text-sm theme_color mt-1 cursor-pointer"
              onClick={() => handleCancel("email")}
            >
              Cancel
            </span>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-7/12">
            <InputField
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => handleOnchange(e, setEmail)}
              disabled={disableSection2}
              error={errors.email}
              fixHeight={true}
            />
          </div>
          <div className="lg:w-5/12">
            {!disableSection2 && (
              <button
                title="Save"
                className=" w-fit  py-2 px-4 text-sm rounded-sm text-white theme_bg font-semibold"
                onClick={() => handleSaveBtnClick({ email })}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3rd */}
      <div>
        <div className="flex gap-3 items-center py-4">
          <h1 className="text-lg font-semibold">Mobile Number</h1>
          {disableSection3 ? (
            <span
              className="text-sm theme_color mt-1 cursor-pointer"
              onClick={() => setDisableSection3(false)}
            >
              Edit
            </span>
          ) : (
            <span
              className="text-sm theme_color mt-1 cursor-pointer"
              onClick={() => handleCancel("mobile")}
            >
              Cancel
            </span>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-4 lg:w-7/12">
            <InputField
              placeholder="Mobile Number"
              name="mobile"
              type="number"
              value={mobile}
              onChange={(e) => handleOnchange(e, setMobile)}
              disabled={disableSection3}
              error={errors.mobile}
              fixHeight={true}
            />
          </div>
          <div className="flex flex-col gap-4 lg:w-5/12">
            {!disableSection3 && (
              <button
                title="Save"
                className="w-fit py-2 px-4 text-sm rounded-sm text-white theme_bg font-semibold"
                onClick={() => handleSaveBtnClick({ mobile })}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4th */}
      <div>
        <div className="py-4  ">
          <h1 className="text-lg font-semibold">FAQs</h1>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <h3 className="font-semibold">
            What happens when I update my email address (or mobile number)?
          </h3>
          <p>
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account related communication on your updated email
            address (or mobile number).
          </p>
          <h3 className="font-semibold">
            When will my Zencart account be updated with the new email address
            (or mobile number)?
          </h3>
          <p>
            It happens as soon as you confirm the verification code sent to your
            email (or mobile) and save the changes.
          </p>
          <h3 className="font-semibold">
            What happens to my existing Zencart account when I update my email
            address (or mobile number)?
          </h3>
          <p>
            Updating your email address (or mobile number) doesn't invalidate
            your account. Your account remains fully functional. You'll continue
            seeing your Order history, saved information and personal details.
          </p>
          <h3 className="font-semibold">
            Does my Seller account get affected when I update my email address?
          </h3>
          <p>
            Zencart has a 'single sign-on' policy. Any changes will reflect in
            your Seller account also.
          </p>
        </div>
      </div>
      <div>
        {" "}
        <div className="flex gap-3 items-center mt-8 theme_border border-t-[1px]">
          <h1
            className="text-md font-semibold text-red-500 p-4 pl-0 cursor-pointer"
            onClick={handleDeleteClick}
          >
            Delete Account
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
