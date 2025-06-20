import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: { showToast: false, toastMessage: "", toastTimer: 3000 },
  reducers: {
    updateToast: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateToast } = toastSlice.actions;

export default toastSlice.reducer;
