import { createSlice } from "@reduxjs/toolkit";
import { initialOrderState } from "../static/initialStates";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    order: [initialOrderState],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setProducts, setOrder } = productSlice.actions;

export default productSlice.reducer;
