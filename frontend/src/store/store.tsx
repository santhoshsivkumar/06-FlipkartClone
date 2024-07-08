import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../slices/authSlice";
import productReducer from "../slices/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export type RootState = {
  auth: AuthState; // Using AuthState here
};

export type AppDispatch = typeof store.dispatch;

export default store;
