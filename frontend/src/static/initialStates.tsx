export const initialAddressState = {
  name: "",
  pincode: "",
  city: "",
  state: "",
  mobile: "",
  locality: "",
  landmark: "",
  address: "",
  alternatePhone: "",
  addressType: "",
};
export const initialOrderState = {
  orderName: "",
  totalPrice: "",
  orderImage: "",
  savedPrice: "",
  price30Percent: "",
  updatedAt: "",
};
export const initialUserState = {
  _id: "",
  updatedAt: "",
  image: "",
  name: "",
  email: "",
  password: "",
  mobile: "",
  addressData: [initialAddressState],
  gender: "",
  cart: [initialOrderState],
};
