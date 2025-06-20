import { createSlice } from "@reduxjs/toolkit";

type feedType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  about: string;
  skills: Array<string>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  age: number;
  gender: string;
  image: string;
};

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeeds: (state, action) => action.payload,
    removedUserFromFeed: (state, action) => {
      const newFeeds = state.filter(
        (feed: feedType) => feed._id !== action.payload
      );

      return newFeeds;
    },
  },
});

export const { addFeeds, removedUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
