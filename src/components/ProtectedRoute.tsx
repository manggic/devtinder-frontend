import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

import { RootState } from "../utils/store";

function ProtectedRoute() {
  const user = useSelector((store: RootState) => store.user);

  if (user.loading) {
    return <div>Loading....</div>;
  }
  if (!user.userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
