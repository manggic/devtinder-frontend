import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
