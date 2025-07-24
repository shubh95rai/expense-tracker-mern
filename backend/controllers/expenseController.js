import Expense from "../models/Expense.js";
import { logAudit } from "../utils/logAudit.js";

// Create expense
export async function createExpense(req, res) {
  try {
    const { amount, category, date, notes } = req.body;

    if (!amount || !category || !date) {
      return res
        .status(400)
        .json({ message: "Amount, category and date are required" });
    }

    const expense = await Expense.create({
      amount,
      category,
      date,
      notes,
      createdBy: req.user._id,
    });

    await logAudit({
      action: "Created Expense",
      userId: req.user._id,
      metadata: { expenseId: expense._id },
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error in createExpense controller:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

// Get expenses (employee: own, admin: all)
export async function getExpenses(req, res) {
  try {
    const { status } = req.query;

    const query = req.user.role === "admin" ? {} : { createdBy: req.user._id };

    if (status) {
      query.status = status;
    }

    const expenses = await Expense.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error in getExpenses controller:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

// Update expense status (admin)
export async function updateExpenseStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const expense = await Expense.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.status = status;
    await expense.save();

    await logAudit({
      action: "Updated Expense Status",
      userId: req.user._id,
      metadata: { expenseId: expense._id, newStatus: expense.status },
    });

    res.status(200).json({ message: "Status updated", expense });
  } catch (error) {
    console.error("Error in updateExpenseStatus controller:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

// Get admin chart stats
export async function getAdminExpenseStats(req, res) {
  try {
    const expenses = await Expense.find();

    // 1. Total per category
    const categoryMap = {};
    const monthlyMap = {};

    for (const exp of expenses) {
      // Category totals
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;

      // Monthly breakdown (YYYY-MM)
      const month = new Date(exp.date).toISOString().slice(0, 7);
      monthlyMap[month] = (monthlyMap[month] || 0) + exp.amount;
    }

    res.status(200).json({
      categoryTotals: categoryMap,
      monthlyTotals: monthlyMap,
    });
  } catch (error) {
    console.error("Error in getAdminExpenseStats controller:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

export async function getDashboardStats(req, res) {
  try {
    const query = req.user.role === "admin" ? {} : { createdBy: req.user._id };

    const expenses = await Expense.find(query);

    const total = expenses.reduce((acc, e) => acc + e.amount, 0);
    const pending = expenses.filter((e) => e.status === "pending").length;
    const approved = expenses.filter((e) => e.status === "approved").length;
    const rejected = expenses.filter((e) => e.status === "rejected").length;

    res.status(200).json({ total, pending, approved, rejected });
  } catch (error) {
    console.error("Error in getDashboardStats controller:", error.message);

    res.status(500).json({ message: "Server Error" });
  }
}
