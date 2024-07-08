import { createSlice } from "@reduxjs/toolkit";
import { User } from "../static/interface";
import { initialUserState } from "../static/initialStates";

export interface AuthState {
  // Exporting AuthState
  isAuthenticated: boolean;
  userData: User;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  userData: initialUserState,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
