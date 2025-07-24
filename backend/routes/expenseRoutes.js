import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/authMiddleware.js";
import {
  createExpense,
  getAdminExpenseStats,
  getDashboardStats,
  getExpenses,
  updateExpenseStatus,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/create", protect, createExpense);
expenseRouter.get("/all", protect, getExpenses);
expenseRouter.patch("/:id/status", protect, adminOnly, updateExpenseStatus);

expenseRouter.get("/admin/stats", protect, adminOnly, getAdminExpenseStats);

expenseRouter.get("/stats", protect, getDashboardStats);

export default expenseRouter;
