export interface Product {
  _id?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  category?: string;
  company?: string;
  seller?: string;
  productImage?: string;
}

export interface User {
  image?: string;
  name?: string;
  email?: string;
  mobile?: string;
  addressData?: Object;
  gender?: string;
}
export interface Address {
  name?: string;
  pincode?: string;
  city?: string;
  state?: string;
  mobile?: string;
  locality?: string;
  landmark?: string;
  address?: string;
  alternatePhone?: string;
  addressType?: string;
}
