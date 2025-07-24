import { useExpenseStore } from "../store/useExpenseStore.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { DatePicker } from "../components/DataePicker.jsx";
import { Loader2 } from "lucide-react";

export default function AddExpensePage() {
  const addExpense = useExpenseStore((state) => state.addExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);

  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  function validateForm() {
    if (!formData.amount) return toast.error("Amount is required");

    if (!formData.date) return toast.error("Date is required");

    if (!formData.category.trim()) return toast.error("Category is required");

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm() === true) addExpense(formData);
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Add New Expense</h2>
        <p className="text-muted-foreground">
          Track a new spending entry below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="Enter amount"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="e.g. Food, Travel, Bills"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          {/* <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          /> */}
          <DatePicker
            formData={formData}
            date={formData.date}
            setDate={setFormData}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Any notes about this expense..."
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Expense"
          )}
        </Button>
      </form>
    </div>
  );
}
