import { useEffect } from "react";
import { useAuditLogsStore } from "../store/useAuditLogsStore.js";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function AdminAuditLogsPage() {
  const logs = useAuditLogsStore((state) => state.logs);
  const isLoading = useAuditLogsStore((state) => state.isLoading);
  const getAuditLogs = useAuditLogsStore((state) => state.getAuditLogs);

  useEffect(() => {
    getAuditLogs();
  }, []);

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Audit Logs</h2>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        )}

        {/* No data */}
        {!isLoading && logs.length === 0 && <p>No logs found.</p>}

        {/* Audit Logs Table */}
        {!isLoading && logs.length > 0 && (
          <div className="overflow-auto max-h-[calc(100dvh-250px)] rounded-md border ">
            <Table className="min-w-[800px]">
              <TableHeader className="sticky top-0 bg-accent z-10">
                <TableRow>
                  <TableHead className="pl-4">User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Expense ID</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell className="pl-4">{log.user?.email}</TableCell>
                    <TableCell className="capitalize">
                      {log.action === "Updated Expense Status"
                        ? `Updated Status (${log.metadata.newStatus})`
                        : log.action}
                    </TableCell>
                    <TableCell>{log.metadata.expenseId}</TableCell>
                    <TableCell>
                      {new Date(log.createdAt).toLocaleString("en-GB", {
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
