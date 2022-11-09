import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginOrder: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    updateStart: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    updateOrder: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginOrder,
  loginFailure,
  logout,
  updateStart,
  updateOrder,
  updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
