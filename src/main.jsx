import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home.js";
import Base from "./components/Base.js";
import Profile from "./components/Profile.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import Play from "./components/Play.js";
import { Provider } from "react-redux";
import { store } from "./utils/store.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import SentRequests from "./components/SentRequests.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Base />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path="/play" element={<Play />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/sent-requests" element={<SentRequests />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
