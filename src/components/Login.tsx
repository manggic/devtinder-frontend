import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import Alert from "./Alert";
import { updateToast } from "../utils/toastSlice";
import { RootState } from "../utils/store";

function Login() {
  const [email, setEmail] = useState("ms@dev.com");
  const [password, setPassword] = useState("Ms_dhoni2025");

  const toast = useSelector((state: RootState) => state.toast);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToast = (message, timer, cb) => {
    dispatch(updateToast({ showToast: true, toastMessage: message }));

    setTimeout(() => {
      dispatch(updateToast({ showToast: false, toastMessage: "" }));
      cb();
    }, timer);
  };

  async function callLoginApi() {
    try {
      const data = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 🔥 important!
      });

      const dataJson = await data.json();

      dispatch(addUser({ userData: dataJson.data }));

      if (dataJson.success) {
        handleToast("Login Successful", 2000, () => navigate("/"));
      } else {
        handleToast(dataJson.message, 3000, () =>
          console.log("Error Msg :", dataJson.message)
        );
      }
    } catch (error) {
      handleToast("Login Fail", 3000, () =>
        console.log("Error Msg :", error.message)
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please provide all inputs");
      return;
    }

    let validateEmail = validator.isEmail(email);
    if (!validateEmail) {
      alert("Email is not valid");
      return;
    }

    callLoginApi();
  };

  return (
    <>
      <div className="flex justify-center pt-10">
        <div className="card bg-base-300 w-96 shadow-sm ">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="card-body">
              <h2 className="pb-3 text-center text-slate-100  text-2xl">
                Login
              </h2>
              <label className="text-slate-100">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                value={email}
                className="input mb-3 w-full focus:outline-hidden"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="text-slate-100">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter Password"
                className="input w-full focus:outline-hidden"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="card-actions justify-end mt-5">
                <a href={"/signup"} className="btn bg-slate-500 text-white">
                  Register User
                </a>
                <button type="submit" className="btn  bg-slate-500 text-white">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {toast?.showToast ? <Alert message={toast?.toastMessage} /> : ""}
    </>
  );
}

export default Login;
