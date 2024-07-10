import { useEffect, useState } from "react";
import InputField from "../InputField";
import { useDispatch, useSelector } from "react-redux";
import { initialAddressState } from "../../static/initialStates";
import axios from "axios";
import { siteURL } from "../../static/Data";
import { setUserData } from "../../slices/authSlice";
import DeleteModel from "../DeleteModel";

const radioOptions = [
  { value: "Home", label: "Home" },
  { value: "Work", label: "Work" },
];

const ManageAddress = () => {
  const [formHidden, setFormHidden] = useState(true);
  const { userData } = useSelector((state: any) => state.auth);
  const [address, setAddress] = useState(initialAddressState);
  const [errors, setErrors] = useState(initialAddressState);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setAddresses(userData.addressData || []);
  }, [userData]);

  const handleOnchange = (e: any) => {
    const { value, name } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "", // Clearing error when user starts typing
    }));
  };

  const handleEdit = (address: any) => {
    setAddress(address);
    setEditingAddressId(address._id);
    setFormHidden(false);
    setErrors(initialAddressState);
  };

  const handleDelete = async (addressId: any) => {
    try {
      await axios
        .delete(`${siteURL}/users/deleteAddress/${userData._id}/${addressId}`)
        .then(() => {
          setAddresses((prevAddresses) =>
            prevAddresses.filter((address: any) => address._id !== addressId)
          );
          window.scrollTo(0, 0);
          setIsDeleteModalOpen(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    try {
      if (editingAddressId) {
        await axios
          .put(
            `${siteURL}/users/updateAddress/${userData._id}/${editingAddressId}`,
            address
          )
          .then((res) => {
            setAddress(initialAddressState);
            setFormHidden(true);
            dispatch(setUserData(res.data.user));
            setEditingAddressId(null);
            window.scrollTo(0, 0);
          })
          .catch((error) => console.log(error));
      } else {
        await axios
          .post(`${siteURL}/users/addAddress/${userData._id}`, address)
          .then((res) => {
            setAddress(initialAddressState);
            setFormHidden(true);
            console.log(res);
            dispatch(setUserData(res.data.user));
            setEditingAddressId(null);
            window.scrollTo(0, 0);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  const validateFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    const mobileRegex = /^\d{10}$/; // Ensuring the mobile number is exactly 10 digits

    // Validate each field
    if (!address.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!address.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(address.mobile)) {
      newErrors.mobile = "Invalid Mobile Number. It should be 10 digits.";
      isValid = false;
    }
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    }
    if (!address.locality.trim()) {
      newErrors.locality = "Locality is required";
      isValid = false;
    }
    if (!address.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!address.city.trim()) {
      newErrors.city = "City/District/Town is required";
      isValid = false;
    }
    if (!address.state.trim()) {
      newErrors.state = "State is required";
      isValid = false;
    }
    if (
      address.alternatePhone.trim() &&
      !/^\d{10}$/.test(address.alternatePhone)
    ) {
      newErrors.alternatePhone =
        "Invalid Alternate Phone Number. It should be 10 digits.";
      isValid = false;
    }
    if (!address.addressType) {
      newErrors.addressType = "Address Type is required";
      isValid = false;
    }

    setErrors(newErrors); // Update errors state
    return isValid;
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Manage Addresses</h1>
      <div className="theme_text border theme_border p-4 font-semibold items-center">
        <div
          onClick={() => {
            if (!formHidden) return;
            setFormHidden(false);
            setErrors(initialAddressState);
            setEditingAddressId(null);
            setAddress(initialAddressState);
          }}
          className={`flex items-center text-sm theme_color ${
            formHidden ? " cursor-pointer" : ""
          }`}
        >
          {formHidden && <i className="fas fa-plus mr-2"></i>}
          <h3>ADD A NEW ADDRESS</h3>
        </div>
        {!formHidden && (
          <>
            <form
              className="grid grid-cols-1 font-normal pt-4 md:grid-cols-2 gap-2"
              onSubmit={handleSubmit}
            >
              {/* Input Fields */}
              <InputField
                name="name"
                value={address?.name}
                onChange={handleOnchange}
                placeholder="Name"
                fixHeight={true}
                error={errors.name}
              />
              <InputField
                name="mobile"
                value={address?.mobile}
                onChange={handleOnchange}
                placeholder="10-digit mobile number"
                fixHeight={true}
                type="number"
                error={errors.mobile}
              />
              <InputField
                name="pincode"
                value={address?.pincode}
                onChange={handleOnchange}
                placeholder="Pincode"
                type="number"
                fixHeight={true}
                error={errors.pincode}
              />
              <InputField
                name="locality"
                placeholder="Locality"
                value={address?.locality}
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.locality}
              />
              <InputField
                name="address"
                placeholder="Address (Area and Street)"
                value={address?.address}
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.address}
                isTextarea={true}
                fixHeightForTextArea={true}
                fullSpan={true}
              />
              <InputField
                name="city"
                placeholder="City/District/Town"
                value={address?.city}
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.city}
              />
              <InputField
                name="state"
                value={address?.state}
                placeholder="State"
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.state}
              />
              <InputField
                name="landmark"
                placeholder="Landmark (Optional)"
                value={address?.landmark}
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.landmark}
              />
              <InputField
                name="alternatePhone"
                placeholder="Alternate Phone (Optional)"
                type="number"
                value={address?.alternatePhone}
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.alternatePhone}
              />
              <InputField
                label="Address Type"
                name="addressType"
                value={address?.addressType}
                onChange={handleOnchange}
                fixHeight={true}
                error={errors.addressType}
                options={radioOptions}
              />
            </form>

            <div className="flex items-center gap-4 pt-4">
              <button
                title="Submit"
                type="submit"
                className="theme_bg text-white rounded-md py-2 px-4"
                onClick={handleSubmit}
              >
                {editingAddressId ? "Update" : "Save"}
              </button>
              <button
                title="Cancel"
                type="button"
                className="theme_bg text-white rounded-md py-2 px-4"
                onClick={() => {
                  setFormHidden(true);
                  setEditingAddressId(null);
                  setAddress(initialAddressState);
                  window.scrollTo(0, 0);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
      <div className="pt-8">
        {addresses.map((address: any) => (
          <div
            key={address._id}
            className="text-sm theme_text justify-between p-2 theme_border border-[1px] "
          >
            <div className="text-sm  pl-4 pt-4">
              <p className="font-semibold text-xs theme_bg rounded-sm p-[2px] text-white w-fit">
                {address.addressType ? address.addressType : "HOME"}
              </p>
              <p className="text-lg flex gap-6 font-semibold pt-2">
                <span> {address.name}</span>
                <span>{address.mobile}</span>
              </p>
              <p className="pt-2">{address.address}</p>
              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  title="Edit"
                  className="text-blue-500"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </button>
                <button
                  title="Delete"
                  className="text-red-500"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete
                </button>
                <DeleteModel
                  isOpen={isDeleteModalOpen}
                  onDelete={() => handleDelete(address._id)}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAddress;
