import { updateToast } from "./toastSlice";

export const handleToast = ({
  toastMessage = "",
  toastTimer = 3000,
  dispatch,
  cb = () => {},
}) => {
  dispatch(updateToast({ showToast: true, toastMessage }));

  setTimeout(() => {
    dispatch(updateToast({ showToast: false, toastMessage: "" }));
    cb();
  }, toastTimer);
};
