import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");

      set({ authUser: res.data });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in checkAuth:", message);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (formdata) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", formdata);

      set({ authUser: res.data });

      toast.success("Logged in successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in login:", message);

      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  register: async (formdata) => {
    set({ isRegistering: true });

    try {
      const res = await axiosInstance.post("/auth/register", formdata);

      set({ authUser: res.data });

      toast.success("Registered successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in register:", message);

      toast.error(message);
    } finally {
      set({ isRegistering: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in logout:", message);

      toast.error(message);
    }
  },
}));
