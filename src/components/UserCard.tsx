import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import { handleToast } from "../utils/helper";
import { BASE_URL } from "../utils/constants";
import { removedUserFromFeed } from "../utils/feedSlice";

import { RootState } from "../utils/store";

function UserCard({ user, showButtons = true }) {
  const {
    firstName,
    lastName,
    about,
    skills = [],
    image,
    age,
    gender,
    _id,
  } = user || {};

  const toast = useSelector((store: RootState) => store.toast);

  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      const data = await fetch(`${BASE_URL}/request/send/${status}/${_id}`, {
        method: "POST",
        credentials: "include",
      });

      const dataJson = await data.json();

      if (dataJson.success) {
        dispatch(removedUserFromFeed(_id));
      }

      handleToast({ toastMessage: dataJson.message, dispatch });
    } catch (error) {
      handleToast({ toastMessage: error.message, dispatch });
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-[350px] shadow-sm">
        {image ? (
          <figure className="mt-10">
            <img src={image} alt="Shoes" height={'280px'} width={'280px'} className="w-[280px] h-[280px]" />
          </figure>
        ) : (
          ""
        )}

        <div className="card-body text-center text-slate-300">
          <h2 className="text-xl pb-2  text-slate-100 capitalize">{`${firstName} ${lastName}`}</h2>
          <p>{about}</p>
          <p>
            {gender ? `${gender} - ` : ""}
            {age}
          </p>
          {skills.length ? (
            <p className="">Skills: {skills?.map((skill) => skill + " ")}</p>
          ) : (
            ""
          )}
          {showButtons ? (
            <div className="card-actions justify-between">
              <button
                className="btn btn-secondary text-black"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {toast?.toastMessage && <Alert message={toast?.toastMessage} />}
    </div>
  );
}

export default UserCard;
