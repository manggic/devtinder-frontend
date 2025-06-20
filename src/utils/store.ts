import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

import feedReducer from "./feedSlice";

import toastReducer from "./toastSlice";

import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requests";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    toast: toastReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
