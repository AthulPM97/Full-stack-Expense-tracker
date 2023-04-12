import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
  name: "premium",
  initialState: {
    leaders: [],
  },
  reducers: {
    setLeaders(state, action) {
      state.leaders = [...action.payload];
    },
  },
});

export const premiumActions = premiumSlice.actions;

export default premiumSlice.reducer;
