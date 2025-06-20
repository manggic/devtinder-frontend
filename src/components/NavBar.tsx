import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import { BASE_URL, default_profile } from "../utils/constants";
import { RootState } from "../utils/store";

function NavBar() {
  const user = useSelector((store: RootState) => store?.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { image = default_profile, firstName = "" } = user.userData || {};

  async function logoutUser() {
    try {
      let user = await fetch(`${BASE_URL}/logout`, {
        credentials: "include",
      });

      let userJson = await user.json();

      dispatch(removeUser());
      if (userJson.success) {
        navigate("/login");
      }
    } catch (error) {
      // errorHandler(error, "logout user fail");
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-sm  text-slate-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      {user.userData && (
        <div className="flex gap-2 mr-4">
          <div className="dropdown dropdown-end">
            <div className="flex text-sm justify-center items-center gap-1">
              <p>Welcome {firstName}</p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={image} />
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 text-xs  z-1 mt-3 w-52 p-2 shadow"
            >
              <Link to="/profile" className="justify-between py-1 ml-2">
                Profile
              </Link>
              <Link to="/connections" className="justify-between py-1 ml-2">
                Connections
              </Link>
              <Link to="/requests" className="justify-between py-1 ml-2">
                Pending Request
              </Link>
               <Link to="/sent-requests" className="justify-between py-1 ml-2">
                Sent Request
              </Link>
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
