import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const useAuditLogsStore = create((set) => ({
  logs: [],
  isLoading: false,

  getAuditLogs: async () => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get("/audit-logs");
      set({ logs: res.data });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in getAuditLogs:", message);

      toast.error("Failed to load audit logs");

      set({ logs: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
