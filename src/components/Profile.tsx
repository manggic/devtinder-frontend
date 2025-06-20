import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import reducer, { initialState } from "../reducer";
import { BASE_URL, skillsOptions } from "../utils/constants";
import UserCard from "./UserCard";
import Alert from "./Alert";
import { validateSignup } from "../utils/validatorFunction";
import { handleToast } from "../utils/helper";
import { useNavigate } from "react-router";
import { addUser } from "../utils/userSlice";
import { RootState } from "../utils/store";

export default function Profile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((store: RootState) => store.user);
  const toast = useSelector((store: RootState) => store.toast);

  const [imagePreview, setImagePreview] = useState(null);

  const storeDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { firstName, lastName, age, gender, skills, about, image } =
    state || {};

  const updateUser = (key, value) => {
    dispatch({ type: "updateUser", payload: { key, value } });
  };

  useEffect(() => {
    if (user) {
      dispatch({ type: "resetUser", payload: user.userData });
    }
  }, [user]);

  const saveProfile = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    if (!validateSignup(state, storeDispatch)) {
      return;
    }

    let dataToSent = {};
    Object.keys(state).forEach((key) => {
      if (state[key] && key !== "__v") {
        dataToSent[key] = state[key];
      }
    });

    try {
      const profile = await fetch(`${BASE_URL}/profile/edit`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSent),
        credentials: "include",
      });

      const profileJson = await profile.json();
      if (profileJson.success) {
        storeDispatch(addUser({ userData: dataToSent }));
        handleToast({
          toastMessage: "Profile updated successfully",
          dispatch: storeDispatch,
          toastTimer: 1000,
        });
      } else {
        handleToast({
          toastMessage: profileJson.message,
          toastTimer: 4000,
          dispatch: storeDispatch,
        });
      }
    } catch (error) {
      handleToast({
        toastMessage: error?.message,
        toastTimer: 4000,
        dispatch: storeDispatch,
      });
    }
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      updateUser("skills", [...skills, value]);
    } else {
      let newSkills = skills.filter((skill) => skill !== value);
      updateUser("skills", newSkills);
    }

    return "retutn false";
  };
  return (
    <div className="flex justify-center pt-3 gap-[50px]">
      <div className="card bg-base-200 w-[450px] shadow-sm ">
        <div className="card-body">
          <h2 className="pb-5 text-center  text-slate-100 text-2xl">
            {editMode && "Edit"} Profile
          </h2>
          <div className="flex gap-2">
            <div className="w-full">
              <p className="text-slate-100 pb-1">First Name</p>
              <input
                id="firstName"
                type="text"
                placeholder="Enter Firstname"
                value={firstName}
                className="input h-8 mb-3 w-full focus:outline-hidden border-none bg-slate-700"
                onChange={(e) => updateUser("firstName", e.target.value)}
                readOnly={!editMode}
              />
            </div>

            <div className="w-full">
              <p className="text-slate-100 pb-1">Last Name</p>
              <input
                id="lastName"
                type="text"
                placeholder="Enter Lastname"
                value={lastName}
                className="input h-8 mb-3 w-full focus:outline-hidden border-none bg-slate-700"
                onChange={(e) => updateUser("lastName", e.target.value)}
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <p className="text-slate-100 pb-1">Age</p>
              <input
                id="age"
                type="number"
                placeholder="Enter Age"
                value={age ?? ""}
                className="input h-8 mb-3 w-full focus:outline-hidden border-none bg-slate-700"
                onChange={(e) =>
                  updateUser(
                    "age",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                readOnly={!editMode}
              />
            </div>

            <div className="w-full">
              <p className="text-slate-100 pb-1">Gender</p>
              <select
                name="gender"
                className=" h-8 bg-base-100 rounded-lg w-full px-[4px] focus:outline-hidden bg-slate-700 "
                onChange={(e) => updateUser("gender", e.target.value)}
                value={gender}
                disabled={!editMode}
              >
                <option value="">select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <p className="text-slate-100 pb-1">Image</p>
            <input
              id="image"
              type="text"
              placeholder="Enter Image"
              value={image}
              className="input h-8 mb-3 w-full focus:outline-hidden border-none bg-slate-700"
              onChange={(e) => updateUser("image", e.target.value)}
              readOnly={!editMode}
            />
          </div>

          <div className="w-full">
            <p className="text-slate-100 pb-1">About</p>
            <textarea
              id="about"
              value={about}
              placeholder="Enter about"
              className="input h-8 mb-3 w-full focus:outline-hidden border-none bg-slate-700"
              onChange={(e) => updateUser("about", e.target.value)}
              readOnly={!editMode}
            />
          </div>

          <p className="text-slate-100 pb-1">Skills</p>
          <div>
            {skillsOptions.map((skill) => (
              <label key={skill} style={{ marginRight: "8px" }}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={skills.includes(skill)}
                  onChange={handleSkillsChange}
                  className="mr-1"
                  disabled={!editMode}
                />
                {skill}
              </label>
            ))}
          </div>

          <div className="card-actions justify-end mt-3 items-end">
            <button
              className="btn bg-slate-500 text-white"
              onClick={saveProfile}
            >
              {!editMode ? "Edit" : "Save"} Profile
            </button>
          </div>
        </div>
      </div>

      <UserCard user={state} showButtons={false} />

      {toast?.showToast ? <Alert message={toast?.toastMessage} /> : ""}
    </div>
  );
}
