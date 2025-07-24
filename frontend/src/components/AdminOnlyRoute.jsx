import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

export default function AdminOnlyRoute() {
  const authUser = useAuthStore((state) => state.authUser);

  return authUser && authUser.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
