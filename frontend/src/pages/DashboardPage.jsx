import { useAuthStore } from "../store/useAuthStore.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useExpenseStore } from "../store/useExpenseStore.js";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const authUser = useAuthStore((state) => state.authUser);

  const stats = useExpenseStore((state) => state.stats);
  const getDashboardStats = useExpenseStore((state) => state.getDashboardStats);
  const isLoading = useExpenseStore((state) => state.isLoading);

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">
            Welcome back,{" "}
            <span className="capitalize">{authUser.name || "User"} 👋</span>
          </h2>
          {authUser.role === "admin" && (
            <Badge variant="destructive">Admin</Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Here’s a quick overview of your expenses.
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className=" space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Overview Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{stats.total || 0}</p>
              <p className="text-sm text-muted-foreground">
                Total amount spent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.pending || 0}</p>
              <p className="text-sm text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.approved || 0}</p>
              <p className="text-sm text-muted-foreground">Accepted expenses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.rejected || 0}</p>
              <p className="text-sm text-muted-foreground">Declined by admin</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-6">
        <Link to="/expenses/add">
          <Button>+ Add New Expense</Button>
        </Link>
      </div>
    </div>
  );
}
