import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { handleToast } from "../utils/helper";
import { RootState } from "../utils/store";

function Base() {
  const dispatch = useDispatch();

  const user = useSelector((store:RootState) => store.user);

  async function fetchUser() {
    try {
      const user = await fetch(`${BASE_URL}/profile/view`, {
        credentials: "include",
      });

      const userJson = await user.json();

      if (userJson.success) {
        dispatch(addUser({ userData: userJson.data, loading: false }));
      }
    } catch (error) {

      handleToast({toastMessage:error.message, dispatch})
      // errorHandler(error, "fetch user fail");
    } finally {
      dispatch(addUser({ loading: false }));
    }
  }

  useEffect(() => {
    if (!user.userData) {
      dispatch(addUser({ loading: true }));
      fetchUser();
    }else{
      dispatch(addUser({loading: false}))
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Base;
