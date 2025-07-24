import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "../store/useExpenseStore.js";

export default function AdminExpensePage() {
  const expenses = useExpenseStore((state) => state.expenses);
  const isLoading = useExpenseStore((state) => state.isLoading);
  const getExpenses = useExpenseStore((state) => state.getExpenses);
  const updateExpenseStatus = useExpenseStore(
    (state) => state.updateExpenseStatus
  );

  const [statusFilter, setStatusFilter] = useState("");

  async function handleStatusChange(expenseId, newStatus) {
    await updateExpenseStatus(expenseId, newStatus);
    getExpenses({ status: statusFilter });
  }

  useEffect(() => {
    getExpenses({ status: statusFilter === "all" ? "" : statusFilter });
  }, [statusFilter]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Expenses</h2>
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select onValueChange={setStatusFilter} defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* No data */}
      {!isLoading && expenses.length === 0 && (
        <p className="text-gray-500">No expenses found.</p>
      )}

      {/* Expenses List */}
      {!isLoading && expenses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {expenses.map((exp) => (
            <Card key={exp._id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{exp.category}</h3>
                  <Badge
                    className="text-foreground"
                    variant={
                      exp.status === "approved"
                        ? "default"
                        : exp.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {exp.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  ₹ {exp.amount}
                </p>
                <p className="text-sm mb-1">
                  By: {exp.createdBy?.name} ({exp.createdBy?.email})
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(exp.date).toLocaleDateString()}
                </p>

                {/* Admin Status Controls */}
                <div className="flex gap-2">
                  {["approved", "rejected", "pending"]
                    .filter((status) => status !== exp.status)
                    .map((status) => (
                      <Button
                        key={status}
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(exp._id, status)}
                      >
                        Mark {status}
                      </Button>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
