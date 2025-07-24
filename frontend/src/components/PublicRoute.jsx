import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

export default function PublicRoute() {
  const authUser = useAuthStore((state) => state.authUser);

  return authUser ? <Navigate to="/" /> : <Outlet />;
}
