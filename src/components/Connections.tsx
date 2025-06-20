import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { RootState } from "../utils/store";

function Connections() {
  const dispatch = useDispatch();

  const connections = useSelector((store: RootState) => store.connections);

  async function callApi() {
    try {
      const data = await fetch(`${BASE_URL}/user/connections`, {
        credentials: "include",
      });
      const dataJson = await data.json();

      dispatch(addConnections(dataJson.data));
    } catch (error) {
      dispatch(addConnections([]));
    }
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="mt-4 flex justify-center flex-col items-center">
      {connections?.length ? (
        <>
          <h1 className="text-xl  text-slate-100">Connections</h1>
          <div className="mt-5 flex gap-5 flex-wrap justify-center">
            {connections?.map((connection, index) => {
              const { firstName, lastName, about, image } = connection || {};

              return (
                <div
                  key={index}
                  className="flex mb-3 w-[350px] gap-5 rounded-lg bg-gray-700 p-5 text-slate-300"
                >
                  <div className="">
                    <img
                      src={image}
                      className="rounded-[50%] w-[50px] h-[50px]"
                      alt=""
                      width={"50px"}
                      height={"50px"}
                    />
                  </div>

                  <div className="justify-end flex w-[70%] flex-col">
                    <div className="capitalize text-sm font-bold text-slate-200">
                      {firstName} {lastName}
                    </div>
                    <p className="text-xs ">{about}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-xl  text-slate-100">No Connections</div>
      )}
    </div>
  );
}

export default Connections;
