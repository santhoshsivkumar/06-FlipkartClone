import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    darkMode: true,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setProducts, setLoading, setDarkMode } = productSlice.actions;

export default productSlice.reducer;
