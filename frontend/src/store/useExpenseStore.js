import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  stats: {},
  isLoading: false,

  getExpenses: async (filters = {}) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get("/expenses/all", {
        params: filters,
      });
      set({ expenses: res.data });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in getExpenses:", message);

      toast.error("Failed to load expenses");
    } finally {
      set({ isLoading: false });
    }
  },

  addExpense: async (formData) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.post("/expenses/create", formData);
      set({ expenses: [...get().expenses, res.data] });

      toast.success("Expense added");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in addExpense:", message);

      toast.error("Failed to add expense");
    } finally {
      set({ isLoading: false });
    }
  },

  updateExpenseStatus: async (expenseId, newStatus) => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.patch(`/expenses/${expenseId}/status`, {
        status: newStatus,
      });

      // Replace the updated expense in the store
      const expenses = get().expenses.map((exp) => {
        if (exp._id === expenseId) {
          return res.data.expense;
        }
        return exp;
      });

      set({ expenses });

      toast.success("Status updated");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in updateExpenseStatus:", message);

      toast.error("Failed to update status");
    } finally {
      set({ isLoading: false });
    }
  },

  getAdminChartStats: async () => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get("/expenses/admin/stats");

      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in getExpenseStats:", message);

      toast.error("Failed to load expense stats");

      return {
        categoryTotals: {},
        monthlyTotals: {},
      };
    } finally {
      set({ isLoading: false });
    }
  },

  getDashboardStats: async () => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get("/expenses/stats");

      set({ stats: res.data });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in getDashboardStats:", message);

      toast.error("Failed to load stats");

      set({ stats: {} });
    } finally {
      set({ isLoading: false });
    }
  },
}));
