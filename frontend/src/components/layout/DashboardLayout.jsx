import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "../../store/useAuthStore.js";
import { ModeToggle } from "../ModeToggle.jsx";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout() {
  const { authUser, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setIsSidebarOpen(false), [location.pathname]);

  const commonLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/expenses", label: "My Expenses" },
    { to: "/expenses/add", label: "Add Expense" },
  ];

  const adminLinks = [
    { to: "/admin/expenses", label: "Admin Panel" },
    { to: "/admin/charts", label: "Charts" },
    { to: "/admin/audit-logs", label: "Audit Logs" },
  ];

  const SidebarContent = () => (
    <ScrollArea className="h-full p-4">
      <h2 className="text-lg font-bold mb-4 pl-4">Navigation</h2>
      <div className="space-y-1">
        {commonLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            <Button variant="ghost" className="w-full justify-start">
              {link.label}
            </Button>
          </Link>
        ))}

        {authUser?.role === "admin" && <Separator className="my-2" />}
        {authUser?.role === "admin" &&
          adminLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button variant="ghost" className="w-full justify-start">
                {link.label}
              </Button>
            </Link>
          ))}
      </div>
    </ScrollArea>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block w-64 border-r bg-muted">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-background border-b px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            {/* Mobile sidebar using Sheet */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden  top-4 left-4 z-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-muted p-0">
                <SidebarContent />

                {/* For avoiding screen reader warnings */}
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">Expense Tracker</h1>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="destructive" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
