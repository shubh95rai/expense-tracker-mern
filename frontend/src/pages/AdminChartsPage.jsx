import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExpenseStore } from "../store/useExpenseStore.js";
import moment from "moment";

export default function AdminChartsPage() {
  const getAdminChartStats = useExpenseStore(
    (state) => state.getAdminChartStats
  );
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const stats = await getAdminChartStats();

      // Convert category totals object to array
      const catData = Object.keys(stats.categoryTotals).map((category) => ({
        category,
        amount: stats.categoryTotals[category],
      }));

      // Convert and sort monthly totals
      const monData = Object.keys(stats.monthlyTotals)
        .sort() // YYYY-MM sorts naturally
        .map((month) => ({
          month: moment(month).format("MMM YYYY"), // Converts "2024-07" → "Jul 2024"
          amount: stats.monthlyTotals[month],
        }));

      setCategoryData(catData);
      setMonthlyData(monData);
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold">Expense Insights</h2>

      {/* Bar Chart: Category Totals */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Total Expenses per Category
        </h3>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Monthly Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
