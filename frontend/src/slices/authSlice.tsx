import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../static/initialStates";

export interface AuthState {
  userData: any;
}

const initialState: AuthState = {
  userData: initialUserState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
