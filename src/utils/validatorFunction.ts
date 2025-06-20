import validator from "validator";
import { handleToast } from "./helper";
export const validateSignup = (signUpData, dispatch) => {
  const {
    email,
    password,
    age,
    gender,
    image,
    skills = [],
    about,
    firstName,
    lastName,
  } = signUpData;

  if (!email || !password || !firstName || !lastName) {
    handleToast({
      toastMessage: "Please enter all necessary details",
      dispatch,
    });
    return 0;
  }

  if (!validator.isEmail(email)) {
    handleToast({ toastMessage: "Please enter valid email", dispatch });
    return 0;
  }

  if (!validator.isStrongPassword(password)) {
    handleToast({ toastMessage: "Please enter strong password", dispatch });
    return 0;
  }

  if (firstName.length < 4) {
    handleToast({
      toastMessage: "FirstName must have atleast 4 char",
      dispatch,
    });
    return 0;
  }

  if (lastName.length < 3) {
    handleToast({
      toastMessage: "LastName must have atleast 3 char",
      dispatch,
    });
    return 0;
  }

  if (age && (age < 0 || age > 100)) {
    handleToast({ toastMessage: "Age must be between 1 and 100", dispatch });
    return 0;
  }

  if (gender && !["male", "female", "other"].includes(gender)) {
    handleToast({ toastMessage: "Gender must be valid", dispatch });
    return 0;
  }

  return 1;
};
