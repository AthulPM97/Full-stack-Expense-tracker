import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || "";
const isPremium = JSON.parse(localStorage.getItem("isPremium")) || false;

const initialAuthState = {
  isLoggedIn: !!token,
  token: token,
  isPremium: isPremium,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isPremium", action.payload.isPremium);
      state.token = action.payload.token;
      state.isPremium = action.payload.isPremium;
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
