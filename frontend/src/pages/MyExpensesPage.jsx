import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useExpenseStore } from "../store/useExpenseStore.js";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyExpensesPage() {
  const expenses = useExpenseStore((state) => state.expenses);
  const isLoading = useExpenseStore((state) => state.isLoading);
  const getExpenses = useExpenseStore((state) => state.getExpenses);

  useEffect(() => {
    getExpenses(); // Fetch on page load
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Expenses</h2>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid gap-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {/* No data */}
      {!isLoading && expenses.length === 0 && (
        <p className="text-muted-foreground text-center">No expenses found.</p>
      )}

      {/* Expenses list */}
      {!isLoading && expenses.length > 0 && (
        <div className="grid gap-4">
          {expenses.map((expense) => (
            <Card key={expense._id}>
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between font-medium">
                  <span>₹ {expense.amount}</span>
                  <span className="text-sm text-muted-foreground">
                    {expense.category}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {expense.notes || "No notes"}
                </div>
                <div className="text-xs text-right text-gray-500">
                  {new Date(expense.date).toDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
