import { useReducer } from "react";
import reducer, { initialState } from "../reducer";
import { BASE_URL, skillsOptions } from "../utils/constants";
import { validateSignup } from "../utils/validatorFunction";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import { handleToast } from "../utils/helper";
import { RootState } from "../utils/store";

type bodyDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age?: string;
  gender?: string;
  skills?: string;
  about?: string;
  image?: string;
};

function Signup() {
  const storeDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useSelector((store: RootState) => store.toast);

  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    skills,
    about,
    image,
  } = state || {};

  async function callSignupApi() {
    try {
      let bodyData = { email, password, firstName, lastName } as bodyDataType;

      if (age) {
        bodyData = { ...bodyData, age };
      }

      if (gender) {
        bodyData = { ...bodyData, gender };
      }
      if (skills.length) {
        bodyData = { ...bodyData, skills };
      }

      if (about) {
        bodyData = { ...bodyData, about };
      }
      if (image) {
        bodyData = { ...bodyData, image };
      }

      const data = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        credentials: "include", // 🔥 important!
      });

      const dataJson = await data.json();

      if (dataJson) {
        handleToast({
          toastMessage: dataJson?.message,
          dispatch: storeDispatch,
        });
        // alert(dataJson?.message);
      }
    } catch (error) {
      handleToast({ toastMessage: error?.message, dispatch: storeDispatch });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateSignup(state, storeDispatch)) {
      return;
    }

    callSignupApi();
  };

  const updateUser = (key, value) => {
    dispatch({ type: "updateUser", payload: { key, value } });
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      updateUser("skills", [...skills, value]);
    } else {
      let newSkills = skills.filter((skill) => skill !== value);
      updateUser("skills", newSkills);
    }
  };
  return (
    <div className="flex justify-center pt-5 text">
      <div className="card bg-base-200 w-[450px] shadow-sm ">
        <form onSubmit={handleSubmit} className="card-body text-slate-300">
          <h2 className="pb-5 text-center text-2xl text-slate-100">
            Create Account
          </h2>
          <div className="flex gap-2">
            <div className="flex gap-1 relative w-full">
              <span className="text-green-200 text-lg absolute left-[-12px]">*</span>
              <input
                id="firstName"
                type="text"
                placeholder="Enter Firstname"
                value={firstName}
                className="input mb-3  w-[95%] focus:outline-hidden border-none bg-slate-700"
                onChange={(e) => updateUser("firstName", e.target.value)}
                required
              />
            </div>

            <div className="flex gap-1 relative w-full">
              <span className="text-green-200 text-lg absolute left-[-12px] ">*</span>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Lastname"
                value={lastName}
                className="input mb-3  focus:outline-hidden border-none bg-slate-700"
                onChange={(e) => updateUser("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-1 relative">
            <span className="text-green-200 text-lg absolute left-[-12px]">*</span>
            <input
              id="email"
              type="text"
              placeholder="Enter Email"
              value={email}
              className="input mb-3 w-full focus:outline-hidden border-none bg-slate-700"
              onChange={(e) => updateUser("email", e.target.value)}
              required
            />
          </div>

          <div className="flex gap-1 relative">
            <span className="text-green-200 text-lg absolute left-[-12px]">*</span>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter Password"
              className="input w-full mb-3 focus:outline-hidden border-none bg-slate-700"
              onChange={(e) => updateUser("password", e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <input
              id="age"
              type="number"
              placeholder="Enter Age"
              value={age ?? ""}
              className="input mb-3 w-full focus:outline-hidden border-none bg-slate-700"
              onChange={(e) =>
                updateUser(
                  "age",
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />

            <select
              name="gender"
              className="bg-base-100 h-[40px] rounded-lg w-full px-[4px] focus:outline-hidden border-none bg-slate-700"
              onChange={(e) => updateUser("gender", e.target.value)}
            >
              <option value="">select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div className="flex">
            <input
              type="text"
              onChange={(e) => updateUser("image", e.target.value)}
              value={image}
              placeholder="Enter image URL"
              className="input w-full mb-3 focus:outline-hidden border-none bg-slate-700"
            />
          </div>

          <textarea
            id="about"
            value={about}
            placeholder="Enter about"
            className="input mb-3 w-full focus:outline-hidden border-none bg-slate-700"
            onChange={(e) => updateUser("about", e.target.value)}
          />

          <p className="text-blue-50 pb-1">Skills</p>
          <div>
            {skillsOptions.map((skill) => (
              <label key={skill} style={{ marginRight: "8px" }}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={handleSkillsChange}
                  className="mr-1 "
                />
                {skill}
              </label>
            ))}
          </div>

          <div className="card-actions justify-end mt-3 items-end">
            <div className="flex justify-center items-center gap-2">
              Already Registered{" "}
              <a href={"/login"} className="underline  text-emerald-500">
                login
              </a>
            </div>
            <button
              type='submit'
              className="btn bg-slate-500 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {toast?.showToast ? <Alert message={toast?.toastMessage} /> : ""}
    </div>
  );
}

export default Signup;
