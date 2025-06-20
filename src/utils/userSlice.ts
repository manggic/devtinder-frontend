import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null, loading: true, error: "" },
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUser: (state) => {
      return { ...state, userData: null };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
