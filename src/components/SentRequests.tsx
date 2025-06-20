import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

function SentRequests() {
  const [sentRequests, setSentRequests] = useState([]);

  async function callApi() {
    try {
      const data = await fetch(`${BASE_URL}/sent/requests`, {
        credentials: "include",
      });
      const dataJson = await data.json();


      // console.log({dataJson});
      
      setSentRequests(dataJson.data);
    } catch (error) {}
  }

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div className="mt-4 flex justify-center flex-col items-center">
      {sentRequests?.length ? (
        <>
          <h1 className="text-xl  text-slate-100">Sent Requests</h1>
          <div className="mt-5 flex gap-5 flex-wrap justify-center">
            {sentRequests?.map((request, index) => {
              const { firstName, lastName, about, image } = request.toUserId || {};

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
        <div className="text-xl  text-slate-100">No Requests Found</div>
      )}
    </div>
  );
}

export default SentRequests;
