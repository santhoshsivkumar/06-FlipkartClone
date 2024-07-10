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
};
export const initialUserState = {
  image: "",
  name: "",
  email: "",
  mobile: "",
  addressData: [initialAddressState],
  gender: "",
  cart: [initialOrderState],
};
