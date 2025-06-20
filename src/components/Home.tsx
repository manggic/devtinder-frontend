import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeeds } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { RootState } from "../utils/store";

function Home() {
  const feeds = useSelector((store:RootState) => store.feed);
  const dispatch = useDispatch();

  async function getFeeds() {
    try {
      const res = await fetch(`${BASE_URL}/user/feeds`, {
        credentials: "include",
      });
      const resJson = await res.json();

      dispatch(addFeeds(resJson.data || []));
    } catch (error) {}
  }

  useEffect(() => {
    if (!feeds?.length) {
      getFeeds();
    }
  }, []);

  return (
    <div className="flex justify-center items-center mt-4">
      {!feeds.length ? (
        <div className="text-xl  text-gray-100">No Records Present</div>
      ) : (
        <UserCard user={feeds?.[0]} />
      )}
    </div>
  );
}

export default Home;
