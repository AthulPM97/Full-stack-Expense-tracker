import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalItems: 0,
  },
  reducers: {
    fetchExpenses(state,action) {
        state.expenses = action.payload.data;
        state.totalItems = action.payload.totalItems;
    },
    setExpenses(state, action) {
      state.expenses = [...action.payload];
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;