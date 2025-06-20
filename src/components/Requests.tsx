import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requests";
import { handleToast } from "../utils/helper";
import { useNavigate } from "react-router";
import Alert from "./Alert";
import { RootState } from "../utils/store";

type requestType = {
  _id: string;
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fromUserId: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
    about: string;
  };
};
function Requests() {
  const toast = useSelector((store: RootState) => store.toast);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const requests = useSelector((store: RootState) => store.requests);

  async function callApi() {
    try {
      const data = await fetch(`${BASE_URL}/user/requests/pending`, {
        credentials: "include",
      });
      const dataJson = await data.json();

      console.log({ dataJson });

      dispatch(addRequests(dataJson.data));
    } catch (error) {
      dispatch(addRequests([]));
    }
  }

  useEffect(() => {
    callApi();
  }, []);

  const handleReviewRequest = async (requestStatus, _id) => {
    try {
      const data = await fetch(
        `${BASE_URL}/request/review/${requestStatus}/${_id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const dataJson = await data.json();

      if (dataJson.success) {
        handleToast({
          toastMessage: dataJson.message,
          dispatch,
          cb: () => navigate("/connections"),
        });
      } else {
        handleToast({ toastMessage: dataJson.message, dispatch });
      }
    } catch (error) {
      handleToast({ toastMessage: error.message, dispatch });
    }
  };

  return (
    <div className="mt-4 flex justify-center flex-col items-center">
      {requests.length ? (
        <>
          <h1 className="text-xl  text-slate-100">Pending Requests</h1>
          <div className="mt-5">
            {requests?.map((request: requestType, index) => {
              const { firstName, lastName, about, image } =
                request?.fromUserId || {};

              return (
                <div
                  key={index}
                  className="flex mb-3 gap-3 text-slate-200 rounded-lg bg-gray-700 p-5 justify-between"
                >
                  <div className="flex gap-3">
                    <div className="">
                    <img
                      src={image}
                      className="rounded-[50%] w-[50px] h-[50px]"
                      alt=""
                      width={"50px"}
                      height={"50px"}
                    />
                  </div>

                  <div className="justify-end flex flex-col">
                    <div className="capitalize text-sm font-bold">
                      {firstName} {lastName}
                    </div>
                    <p className="text-xs">{about}</p>
                  </div>
                  </div>
                  
                  <div className="">
                    <button
                      onClick={() =>
                        handleReviewRequest("rejected", request?._id)
                      }
                      className="btn  btn-secondary mr-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        handleReviewRequest("accepted", request?._id)
                      }
                      className="btn  btn-primary"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-xl  text-gray-100">No Pending Requests</div>
      )}

      {toast.toastMessage && <Alert message={toast.toastMessage} />}
    </div>
  );
}

export default Requests;
